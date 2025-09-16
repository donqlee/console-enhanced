# console-enhanced

Enhanced console logging with automatic variable names, file locations, and timestamps.

## Features

- 📝 **Automatic variable name extraction** (Node.js)
- 📍 **File name and line number display** (Node.js)
- 🕐 **Timestamp logging**
- 🎨 **Smart formatting** for different data types
- 🌍 **Cross-platform support** (Node.js & Browser)

## Installation

```bash
npm install console-enhanced
```

## Usage

### Node.js (Full Features)

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

### Browser (Timestamp Only)

```javascript
import { smartLog } from "console-enhanced";

smartLog("Hello", "World");
// Output: 🕐 오후 2:30:45 Hello World
```

## Examples

```javascript
// Variables with mixed types
const user = { name: "John", id: 123 };
const count = 5;
smartLog(user, count, "items");
// Output: 📝 app.js:12 | user: {"name":"John","id":123}, count: 5, items | 🕐 오후 2:30:45

// String literals and objects
smartLog("Processing", { status: "complete" });
// Output: 📝 app.js:15 | Processing {"status":"complete"} | 🕐 오후 2:30:45
```

## Why console-enhanced?

Stop guessing what your console.log outputs mean:

**Before:**

```
홍길동 25 true
{ name: "John" } 5 "items"
```

**After:**

```
📝 app.js:8 | userName: "홍길동", age: 25, isActive: true | 🕐 오후 2:30:45
📝 app.js:12 | user: {"name":"John"}, count: 5, items | 🕐 오후 2:30:45
```

## Platform Support

| Feature          | Node.js | Browser |
| ---------------- | ------- | ------- |
| Timestamp        | ✅      | ✅      |
| File name & line | ✅      | ❌\*    |
| Variable names   | ✅      | ❌\*    |

\*Browser limitations due to security restrictions. File info is provided by browser dev tools.

## License

MIT
