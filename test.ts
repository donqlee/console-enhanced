import { smartLog } from "./src/index.js";

const userName = "돈큐리";
const age = 38;
const isActive = true;
const user = { name: "테스트" };
const count = 10;

console.log("=== 기존 방식 ===");
console.log(userName, age, isActive);
console.log(user, count, "완료");

console.log("=== smartLog 방식 ===");
smartLog(userName, age, isActive);
smartLog("Hello", "World");
smartLog({ name: "테스트", value: 123 });
smartLog(user, count, "완료");
