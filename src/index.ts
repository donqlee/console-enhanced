import * as fs from "fs";

interface FileInfo {
  fileName: string;
  lineNumber: number;
}

interface VariableInfo {
  names: string[];
  values: any[];
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function getCallerInfo(): FileInfo | null {
  if (isBrowser()) {
    return null;
  }

  try {
    const stack = new Error().stack;
    if (!stack) return null;

    const lines = stack.split("\n");
    const callerLine = lines[3];

    if (!callerLine) return null;

    // file:///경로 에서 정확히 추출
    const fileMatch = callerLine.match(/file:\/\/\/([^:]+):(\d+):\d+/);
    if (fileMatch) {
      const [, fullPath, lineNumber] = fileMatch;
      return {
        fileName: `/${fullPath}`, // 앞에 / 추가!
        lineNumber: parseInt(lineNumber, 10),
      };
    }

    // 기타 다른 형식들
    const match =
      callerLine.match(/\(([^)]+):(\d+):\d+\)/) ||
      callerLine.match(/at ([^:]+):(\d+):\d+/);

    if (!match) return null;

    const [, fullPath, lineNumber] = match;

    return {
      fileName: fullPath,
      lineNumber: parseInt(lineNumber, 10),
    };
  } catch (error) {
    return null;
  }
}

function extractVariableNames(filePath: string, lineNumber: number): string[] {
  try {
    if (isBrowser()) {
      return [];
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const lines = fileContent.split("\n");
    const targetLine = lines[lineNumber - 1];

    if (!targetLine) return [];

    const match = targetLine.match(/smartLog\s*\(\s*([^)]+)\s*\)/);
    if (!match) return [];

    const argsString = match[1];

    const variableNames = argsString
      .split(",")
      .map((arg) => arg.trim())
      .map((arg) => {
        return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(arg) ? arg : "";
      });

    return variableNames;
  } catch (error) {
    return [];
  }
}

function formatWithVariableNames(
  variableNames: string[],
  values: any[]
): string {
  if (variableNames.length === 0 || variableNames.length !== values.length) {
    return values
      .map((v) => (typeof v === "object" ? JSON.stringify(v) : String(v)))
      .join(" ");
  }

  return values
    .map((value, index) => {
      const varName = variableNames[index];
      if (!varName) {
        return typeof value === "object"
          ? JSON.stringify(value)
          : String(value);
      }

      const formattedValue =
        typeof value === "string"
          ? `"${value}"`
          : typeof value === "object"
          ? JSON.stringify(value)
          : String(value);
      return `${varName}: ${formattedValue}`;
    })
    .join(", ");
}
export function smartLog(...args: any[]): void {
  const now = new Date();
  const timestamp = now.toLocaleTimeString("ko-KR");

  if (isBrowser()) {
    console.log(`🕐 ${timestamp}`, ...args);
  } else {
    const fileInfo = getCallerInfo();

    if (fileInfo) {
      const variableNames = extractVariableNames(
        fileInfo.fileName,
        fileInfo.lineNumber
      );
      const formattedOutput = formatWithVariableNames(variableNames, args);

      // 표시용으로는 짧은 파일명 사용
      const shortFileName =
        fileInfo.fileName.split("/").pop()?.split("\\").pop() || "unknown";

      console.log(
        `📝 ${shortFileName}:${fileInfo.lineNumber} | ${formattedOutput} | 🕐 ${timestamp}`
      );
    } else {
      console.log(`🕐 ${timestamp}`, ...args);
    }
  }
}

export default { smartLog };
