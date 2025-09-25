# console-enhanced

[![npm version](https://img.shields.io/npm/v/console-enhanced.svg?style=flat-square)](https://www.npmjs.com/package/console-enhanced)
[![npm downloads](https://img.shields.io/npm/dw/console-enhanced.svg?style=flat-square)](https://www.npmjs.com/package/console-enhanced)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> 📝 Drop-in replacement for `console.log` that automatically shows **variable names, file/line, timestamps, and execution time**.  
> Works in Node.js and the browser, with zero dependencies and built-in TypeScript types.

## Installation

```bash
npm install console-enhanced
```

## Quick Start

```javascript
import { smartLog } from "console-enhanced";

const user = "Alice";
const age = 25;

smartLog(user, age);
// 📝 app.js:8 | user: "Alice", age: 25 | 🕐 14:30:45
```

### Before

```javascript
console.log(user, age);
// Alice 25
```

### After

```javascript
smartLog(user, age);
// 📝 app.js:8 | user: "Alice", age: 25 | 🕐 14:30:45
```

## Features

- 📝 **Automatic variable name extraction** (Node.js only)
- 📍 **File name and line number display** (Node.js only)
- 🕐 **Timestamps** for every log
- ⏱️ **Performance measurement** (time, timeEnd, measure, measureAsync)
- 🎨 **Smart formatting** for different data types
- 🌍 **Cross-platform** (Node.js & Browser)

## Performance Measurement

```javascript
import { smartLog } from "console-enhanced";

// time / timeEnd
smartLog.time("fetchUsers");
await fetch("/api/users");
smartLog.timeEnd("fetchUsers");
// 📝 app.js:15 | ⏱️ fetchUsers: 245.23ms | 🕐 14:30:45

// measure (sync)
const result = smartLog.measure(() => heavyComputation());
// 📝 app.js:18 | ⏱️ Function execution: 1.25s | 🕐 14:30:45

// measureAsync (promise/async)
const users = await smartLog.measureAsync(fetch("/api/users"), "fetchUsers");
// 📝 app.js:21 | ⏱️ fetchUsers: 342.67ms | 🕐 14:30:45
```

## Browser Usage

```javascript
import { smartLog } from "console-enhanced";

smartLog("Hello", "World");
// 🕐 14:30:45 Hello World

smartLog.measure(() => doSomething());
// 🕐 14:30:45 ⏱️ Function execution: 15.67ms
```

| Feature            | Node.js | Browser |
| ------------------ | ------- | ------- |
| Timestamp          | ✅      | ✅      |
| File name & line   | ✅      | ❌\*    |
| Variable names     | ✅      | ❌\*    |
| Performance timing | ✅      | ✅      |

\*Browser limitations: variable names and callsite are not available due to security restrictions. Browser DevTools provide file/line info instead.

## API Reference

### `smartLog(...args: any[])`

Logs variables with names, values, file/line and timestamp (Node).  
Falls back to console-style logging in the browser.

---

### `smartLog.time(label?: string)`

Starts a performance timer.  
`label` is optional.

---

### `smartLog.timeEnd(label?: string)`

Ends a timer and logs elapsed time.

---

### `smartLog.measure(fn: () => T, label?: string): T`

Measures synchronous function execution time and logs result.  
Returns the original function result.

---

### `smartLog.measureAsync(promise: Promise<T>, label?: string): Promise<T>`

Measures asynchronous function or promise execution time.  
Returns the resolved value.

---

## Why console-enhanced?

- **Zero dependencies** → minimal install size
- **ESM + TypeScript support** → modern projects ready
- **Readable logs** → stop guessing what `console.log` output means
- **Built-in performance profiling** → time your code with zero setup

## License

MIT
