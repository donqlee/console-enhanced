/**
 * Enhanced console logging with smart features
 */

export function smartLog(...args: any[]): void {
  // 현재 시간
  const now = new Date();
  const timestamp = now.toLocaleTimeString("ko-KR");

  // 일단 기본 출력 (업그레이드 예정)
  console.log(`🕐 ${timestamp}`, ...args);
}

// 기본 export도 추가
export default { smartLog };
