import { smartLog } from "./index.js";

console.log("=== console-enhanced 테스트 시작 ===\n");

// 1. 기존 기능 테스트
console.log("1. 기존 smartLog 테스트:");
const userName = "홍길동";
const age = 25;
const isActive = true;
smartLog(userName, age, isActive);

console.log("\n2. 객체 테스트:");
const user = { name: "John", id: 123 };
const count = 5;
smartLog(user, count, "items");

console.log("\n=== 새로운 성능 측정 기능 테스트 ===\n");

// 3. 기본 time/timeEnd 테스트
console.log("3. 기본 time/timeEnd 테스트:");
const apiCall = "fetchUsers";
smartLog.time(apiCall);

// 시뮬레이션: 100ms 대기
setTimeout(() => {
  smartLog.timeEnd(apiCall);

  console.log("\n4. 다른 변수명으로 테스트:");
  const dbQuery = "getUserById";
  smartLog.time(dbQuery);

  // 시뮬레이션: 50ms 대기
  setTimeout(() => {
    smartLog.timeEnd(dbQuery);

    console.log("\n5. 동시에 여러 타이머 테스트:");
    const task1 = "parallelTask1";
    const task2 = "parallelTask2";

    smartLog.time(task1);
    smartLog.time(task2);

    setTimeout(() => {
      smartLog.timeEnd(task1);
    }, 80);

    setTimeout(() => {
      smartLog.timeEnd(task2);

      console.log("\n6. 에러 케이스 테스트 (매칭되지 않는 타이머):");
      const nonExistent = "neverStarted";
      smartLog.timeEnd(nonExistent);

      console.log("\n7. 긴 시간 포맷 테스트:");
      const longTask = "longRunningTask";
      smartLog.time(longTask);

      // 시뮬레이션: 2초 대기
      setTimeout(() => {
        smartLog.timeEnd(longTask);

        console.log("\n=== 새로운 measure 기능 테스트 ===\n");

        console.log("8. measure 함수 테스트 (동기):");
        const syncTask = smartLog.measure(() => {
          // 동기 작업 시뮬레이션
          let sum = 0;
          for (let i = 0; i < 1000000; i++) {
            sum += i;
          }
          return sum;
        });
        console.log(`결과: ${syncTask}`);

        console.log("\n9. measure 함수 테스트 (커스텀 라벨):");
        const customResult = smartLog.measure(() => {
          return Math.random() * 100;
        }, "randomGeneration");
        console.log(`결과: ${customResult}`);

        console.log("\n10. measureAsync 테스트:");
        // Promise 테스트
        const asyncTask = smartLog.measureAsync(
          new Promise((resolve) => {
            setTimeout(() => resolve("async result"), 300);
          })
        );

        asyncTask.then((result: any) => {
          console.log(`비동기 결과: ${result}`);

          console.log("\n11. measureAsync 실제 API 시뮬레이션:");
          const fakeApiCall = smartLog.measureAsync(
            new Promise((resolve) => {
              setTimeout(() => resolve({ users: [1, 2, 3] }), 150);
            }),
            "fetchUsers"
          );

          fakeApiCall.then((apiResult: any) => {
            console.log(`API 결과:`, apiResult);
            console.log("\n=== 모든 테스트 완료 ===");
          });
        });
      }, 2000);
    }, 120);
  }, 50);
}, 100);
