# console-enhanced

Enhanced console logging with automatic variable names, file locations, timestamps, and **performance measurement**.

## Features

- 📝 **Automatic variable name extraction** (Node.js)
- 📍 **File name and line number display** (Node.js)
- 🕐 **Timestamp logging**
- ⏱️ **Performance measurement suite** - NEW!
- 🎨 **Smart formatting** for different data types
- 🌍 **Cross-platform support** (Node.js & Browser)

## Installation

```bash
npm install console-enhanced
```

## Usage

### Basic Logging

```javascript
import { smartLog } from "console-enhanced";

const userName = "홍길동";
const age = 25;
const isActive = true;

// Basic usage
console.log(userName, age, isActive);
// Output: 홍길동 25 true

// Enhanced with console-enhanced
smartLog(userName, age, isActive);
// Output: 📝 app.js:8 | userName: "홍길동", age: 25, isActive: true | 🕐 오후 2:30:45
```

## Performance Measurement (NEW!)

### Time/TimeEnd Pattern

```javascript
const apiCall = "fetchUsers";
smartLog.time(apiCall);
// ... your code here
smartLog.timeEnd(apiCall);
// Output: 📝 app.js:15 | ⏱️ apiCall: 245.23ms | 🕐 오후 2:30:45
```

### Function Measurement

```javascript
const result = smartLog.measure(() => {
  // Heavy computation
  return processLargeData();
});
// Output: 📝 app.js:18 | ⏱️ Function execution: 1.25s | 🕐 오후 2:30:45
// Returns: original function result
```

### Promise/Async Measurement

```javascript
const data = await smartLog.measureAsync(fetch("/api/users"));
// Output: 📝 app.js:21 | ⏱️ Promise execution: 342.67ms | 🕐 오후 2:30:45
// Returns: original promise result
```

### Browser (Basic Features)

```javascript
import { smartLog } from "console-enhanced";

smartLog("Hello", "World");
// Output: 🕐 오후 2:30:45 Hello World

smartLog.measure(() => computation());
// Output: 🕐 오후 2:30:45 ⏱️ Function execution: 15.67ms
```

## Performance Examples

```javascript
// API performance tracking
const userAPI = "getUserData";
smartLog.time(userAPI);
const response = await fetch("/api/user/123");
smartLog.timeEnd(userAPI);

// Database query timing
const dbQuery = "findUserById";
smartLog.time(dbQuery);
const user = await db.users.findById(123);
smartLog.timeEnd(dbQuery);
// Output: 📝 app.js:12 | ⏱️ dbQuery: 89.32ms | 🕐 오후 2:30:45

// Algorithm comparison
const bubbleResult = smartLog.measure(() => bubbleSort(data));
const quickResult = smartLog.measure(() => quickSort(data));
```

## Why console-enhanced?

Stop guessing what your console.log outputs mean:

**Before:**

```
홍길동 25 true
245.23
{ users: [1, 2, 3] }
```

**After:**

```
📝 app.js:8 | userName: "홍길동", age: 25, isActive: true | 🕐 오후 2:30:45
📝 app.js:15 | ⏱️ apiCall: 245.23ms | 🕐 오후 2:30:45
📝 app.js:18 | ⏱️ fetchUsers: 1.25s | 🕐 오후 2:30:45
```

## Platform Support

| Feature            | Node.js | Browser |
| ------------------ | ------- | ------- |
| Timestamp          | ✅      | ✅      |
| File name & line   | ✅      | ❌\*    |
| Variable names     | ✅      | ❌\*    |
| Performance timing | ✅      | ✅      |

\*Browser limitations due to security restrictions. File info is provided by browser dev tools.

## License

MIT
