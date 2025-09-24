import * as fs from "fs";

interface FileInfo {
  fileName: string;
  lineNumber: number;
}

interface VariableInfo {
  names: string[];
  values: any[];
}

// 타이머 관리용 맵
const timers = new Map<string, number>();

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
        fileName: `/${fullPath}`,
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

function extractVariableNames(
  filePath: string,
  lineNumber: number,
  functionName: string = "smartLog"
): string[] {
  try {
    if (isBrowser()) {
      return [];
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const lines = fileContent.split("\n");
    const targetLine = lines[lineNumber - 1];

    if (!targetLine) return [];

    const regex = new RegExp(`${functionName}\\s*\\(\\s*([^)]+)\\s*\\)`);
    const match = targetLine.match(regex);
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

function formatTime(ms: number): string {
  if (ms < 1000) {
    return `${ms.toFixed(2)}ms`;
  } else if (ms < 60000) {
    return `${(ms / 1000).toFixed(2)}s`;
  } else {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(2);
    return `${minutes}m ${seconds}s`;
  }
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

export function time(...args: any[]): void {
  const now = new Date();
  const timestamp = now.toLocaleTimeString("ko-KR");

  if (isBrowser()) {
    // 브라우저에서는 간단하게
    if (args.length > 0) {
      const label = String(args[0]);
      console.time(label);
      console.log(`🕐 ${timestamp} ⏱️ Timer started: ${label}`);
    }
  } else {
    const fileInfo = getCallerInfo();

    if (fileInfo) {
      // 변수명 추출
      const variableNames = extractVariableNames(
        fileInfo.fileName,
        fileInfo.lineNumber,
        "time"
      );

      // 타이머 레이블 결정
      let label: string;
      if (variableNames.length > 0 && variableNames[0]) {
        label = variableNames[0];
      } else if (args.length > 0) {
        label = String(args[0]);
      } else {
        label = "default";
      }

      // 타이머 시작
      timers.set(label, performance.now());

      const shortFileName =
        fileInfo.fileName.split("/").pop()?.split("\\").pop() || "unknown";

      console.log(
        `📝 ${shortFileName}:${fileInfo.lineNumber} | ⏱️ Timer started: ${label} | 🕐 ${timestamp}`
      );
    } else {
      const label = args.length > 0 ? String(args[0]) : "default";
      timers.set(label, performance.now());
      console.log(`🕐 ${timestamp} ⏱️ Timer started: ${label}`);
    }
  }
}

export function timeEnd(...args: any[]): void {
  const now = new Date();
  const timestamp = now.toLocaleTimeString("ko-KR");

  if (isBrowser()) {
    // 브라우저에서는 간단하게
    if (args.length > 0) {
      const label = String(args[0]);
      console.timeEnd(label);
      console.log(`🕐 ${timestamp} ⏱️ Timer ended: ${label}`);
    }
  } else {
    const fileInfo = getCallerInfo();

    if (fileInfo) {
      // 변수명 추출
      const variableNames = extractVariableNames(
        fileInfo.fileName,
        fileInfo.lineNumber,
        "timeEnd"
      );

      // 타이머 레이블 결정
      let label: string;
      if (variableNames.length > 0 && variableNames[0]) {
        label = variableNames[0];
      } else if (args.length > 0) {
        label = String(args[0]);
      } else {
        label = "default";
      }

      // 타이머 종료 및 시간 계산
      const startTime = timers.get(label);
      if (startTime !== undefined) {
        const elapsed = performance.now() - startTime;
        timers.delete(label);

        const shortFileName =
          fileInfo.fileName.split("/").pop()?.split("\\").pop() || "unknown";

        console.log(
          `📝 ${shortFileName}:${
            fileInfo.lineNumber
          } | ⏱️ ${label}: ${formatTime(elapsed)} | 🕐 ${timestamp}`
        );
      } else {
        const shortFileName =
          fileInfo.fileName.split("/").pop()?.split("\\").pop() || "unknown";

        console.log(
          `📝 ${shortFileName}:${fileInfo.lineNumber} | ⚠️ Timer '${label}' was not started | 🕐 ${timestamp}`
        );
      }
    } else {
      const label = args.length > 0 ? String(args[0]) : "default";
      const startTime = timers.get(label);
      if (startTime !== undefined) {
        const elapsed = performance.now() - startTime;
        timers.delete(label);
        console.log(`🕐 ${timestamp} ⏱️ ${label}: ${formatTime(elapsed)}`);
      } else {
        console.log(`🕐 ${timestamp} ⚠️ Timer '${label}' was not started`);
      }
    }
  }
}

// smartLog에 time, timeEnd 메서드 추가
smartLog.time = time;
smartLog.timeEnd = timeEnd;

export default { smartLog, time, timeEnd };
