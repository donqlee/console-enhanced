interface FileInfo {
  fileName: string;
  lineNumber: number;
}

function getCallerInfo(): FileInfo | null {
  try {
    const stack = new Error().stack;

    if (!stack) return null;

    const lines = stack.split("\n");
    const callerLine = lines[3];

    if (!callerLine) return null;

    const match =
      callerLine.match(/file:\/\/\/([^:]+):(\d+):\d+/) ||
      callerLine.match(/\(([^)]+):(\d+):\d+\)/) ||
      callerLine.match(/at ([^:]+):(\d+):\d+/);

    if (!match) return null;

    const [, fullPath, lineNumber] = match;

    const fileName = fullPath.split("/").pop()?.split("\\").pop() || "unknown";

    return {
      fileName,
      lineNumber: parseInt(lineNumber, 10),
    };
  } catch (error) {
    return null;
  }
}

export function smartLog(...args: any[]): void {
  const now = new Date();
  const timestamp = now.toLocaleTimeString("ko-KR");

  const fileInfo = getCallerInfo();

  const prefix = fileInfo
    ? `📝 ${fileInfo.fileName}:${fileInfo.lineNumber} | 🕐 ${timestamp}`
    : `🕐 ${timestamp}`;

  console.log(prefix, ...args);
}

export default { smartLog };
