---
title: Promise 学习笔记
date: 2025-11-20
categories:
  - 前端开发
tags:
  - JavaScript
  - Promise
---

# Promise 学习笔记

## 前言

Promise 是 JavaScript 异步编程的重要解决方案。它有三种状态：**pending**（等待中）、**fulfilled**（已成功）、**rejected**（已失败）。Promise 的状态一旦改变就不可逆，这是 Promise 的核心特性。

> 💡 **核心概念**：
> - Promise 解决了回调地狱问题，让异步代码更清晰
> - 状态只能从 pending 变为 fulfilled 或 rejected，且不可逆
> - 每个 Promise 都会有一个结果：成功的 value 或失败的 reason

## 一、Promise 的理解和使用

### 1. Promise 是什么？

#### 1.1 理解

**抽象表达**

- Promise 是一门新的技术（规范）
- Promise 是 JS 中进行异步编程的新解决方案
- 旧方案是单纯使用回调函数

**具体表达**

- **从语法上来说**：Promise 是一个构造函数
- **从功能上来说**：Promise 对象用来封装一个异步操作并可以获取其成功/失败的结果值
  - 成功的结果数据一般称为 **value**
  - 失败的结果数据一般称为 **reason**

#### 1.2 Promise 的状态改变

Promise 有三种状态：

1. **pending**（未定义/等待中）：初始状态
2. **fulfilled**（已成功/resolved）：操作成功完成
3. **rejected**（已失败）：操作失败

**状态改变（只有两种可能）**：

- `pending` → `fulfilled`（resolved）
- `pending` → `rejected`

> 💡 **重要特性**：
> - 一个 Promise 只能改变一次状态
> - 状态改变后就会固化，不会再变
> - 无论成功还是失败，都会有一个结果数据

#### 1.3 Promise 的基本流程

```
创建 Promise 对象
        ↓
执行异步操作
        ↓
    成功？
   ↙    ↘
 是      否
  ↓      ↓
resolve reject
  ↓      ↓
then的   then的
第一个   第二个
回调     回调
```

#### 1.4 Promise 的基本使用

**抽奖案例 - Promise 版本**

```js
const btn = document.getElementById("btn");

btn.addEventListener("click", function() {
    // 生成随机数
    let randomNumber = Math.ceil(Math.random() * 100);

    // 创建 Promise 对象
    const p = new Promise(function(resolve, reject) {
        setTimeout(() => {
            if (randomNumber < 30) {
                // 成功的状态
                resolve("中奖了！");
            } else {
                // 失败的状态
                reject("抱歉，很遗憾！");
            }
        }, 1000);
    });

    // 处理 Promise 结果
    p.then(
        value => {
            // pending → fulfilled
            alert(value);  // 成功
        },
        reason => {
            // pending → rejected
            alert(reason);  // 失败
        }
    );
});
```

#### 1.5 Promise 的实践案例

**案例一：封装基于定时器的异步**

```js
function timeDelay(time) {
    // 1. 创建 Promise 对象
    return new Promise((resolve, reject) => {
        // 2. 启动异步任务
        console.log('启动异步任务');

        setTimeout(() => {
            console.log('延迟任务开始执行...');
            const timestamp = Date.now();

            // 假设：时间为奇数代表成功，为偶数代表失败
            if (timestamp % 2 === 1) {
                // 3.1 成功时调用 resolve()
                resolve('成功的数据 ' + timestamp);
            } else {
                // 3.2 失败时调用 reject()
                reject('失败的数据 ' + timestamp);
            }
        }, time);
    });
}

// 使用
timeDelay(2000)
    .then(
        value => console.log('成功:', value),
        reason => console.log('失败:', reason)
    );
```

> ⚠️ **注意事项**:
> - Promise 构造函数中的代码是同步执行的,只有异步操作(setTimeout)是异步的
> - resolve/reject 只能调用一次,多次调用无效
> - Promise 一旦状态改变就不可逆转
>
> ```js
> // 错误示例:多次调用resolve
> new Promise((resolve, reject) => {
>     resolve('第一次');
>     resolve('第二次');  // 无效,被忽略
> }).then(value => console.log(value));  // 输出: '第一次'
> ```

> 🎯 **实际应用场景**:
> ```js
> // 场景1:延迟加载组件
> function loadComponentAfter(ms) {
>     return new Promise(resolve => {
>         setTimeout(() => {
>             import('./MyComponent.js').then(resolve);
>         }, ms);
>     });
> }
>
> // 场景2:模拟网络请求延迟
> async function mockAPI(data, delay = 1000) {
>     return new Promise(resolve => {
>         setTimeout(() => resolve(data), delay);
>     });
> }
>
> // 场景3:重试机制
> function retryWithDelay(fn, maxRetries = 3, delay = 1000) {
>     return new Promise((resolve, reject) => {
>         let retries = 0;
>         const attempt = () => {
>             fn().then(resolve).catch(err => {
>                 if (++retries >= maxRetries) {
>                     reject(err);
>                 } else {
>                     setTimeout(attempt, delay);
>                 }
>             });
>         };
>         attempt();
>     });
> }
> ```

**案例二：封装 AJAX 请求**

```js
// 可复用的发送 AJAX 请求的函数：xhr + Promise
function promiseAjax(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;

            const { status, response } = xhr;

            // 请求成功，调用 resolve(value)
            if (status >= 200 && status < 300) {
                resolve(JSON.parse(response));
            } else {
                // 请求失败，调用 reject(reason)
                reject(new Error('请求失败: status: ' + status));
            }
        };

        xhr.open("GET", url);
        xhr.send();
    });
}

// 使用
promiseAjax('https://api.example.com/data')
    .then(
        data => console.log('获取数据成功:', data),
        error => console.error('获取数据失败:', error)
    );
```

> ⚠️ **注意事项**:
> - 需要处理 JSON 解析可能的异常
> - 应该设置超时机制防止请求挂起
> - 建议添加请求头和错误详情
> - 现代项目推荐使用 fetch 或 axios 而非手写 XMLHttpRequest
>
> ```js
> // 改进版本:添加超时和错误处理
> function promiseAjaxImproved(url, timeout = 5000) {
>     return new Promise((resolve, reject) => {
>         const xhr = new XMLHttpRequest();
>         xhr.timeout = timeout;
>
>         xhr.ontimeout = () => reject(new Error('请求超时'));
>         xhr.onerror = () => reject(new Error('网络错误'));
>
>         xhr.onload = () => {
>             if (xhr.status >= 200 && xhr.status < 300) {
>                 try {
>                     resolve(JSON.parse(xhr.response));
>                 } catch (e) {
>                     reject(new Error('JSON解析失败'));
>                 }
>             } else {
>                 reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
>             }
>         };
>
>         xhr.open("GET", url);
>         xhr.send();
>     });
> }
> ```

> 🎯 **实际应用场景**:
> ```js
> // 场景1:封装统一的API请求函数
> function request(url, options = {}) {
>     return new Promise((resolve, reject) => {
>         const xhr = new XMLHttpRequest();
>         const method = options.method || 'GET';
>         const body = options.body;
>
>         xhr.open(method, url);
>
>         // 设置请求头
>         if (options.headers) {
>             Object.keys(options.headers).forEach(key => {
>                 xhr.setRequestHeader(key, options.headers[key]);
>             });
>         }
>
>         xhr.onload = () => {
>             if (xhr.status >= 200 && xhr.status < 300) {
>                 resolve(JSON.parse(xhr.response));
>             } else {
>                 reject({ status: xhr.status, message: xhr.statusText });
>             }
>         };
>
>         xhr.send(body ? JSON.stringify(body) : null);
>     });
> }
>
> // 场景2:链式调用处理多个请求
> promiseAjax('/api/user/123')
>     .then(user => promiseAjax(`/api/posts?userId=${user.id}`))
>     .then(posts => console.log('用户文章:', posts))
>     .catch(error => console.error('请求失败:', error));
>
> // 场景3:并行请求多个接口
> Promise.all([
>     promiseAjax('/api/users'),
>     promiseAjax('/api/posts'),
>     promiseAjax('/api/comments')
> ]).then(([users, posts, comments]) => {
>     console.log({ users, posts, comments });
> });
> ```

**案例三：封装 AJAX（完整版）**

```js
/**
 * 封装函数 sendAJAX 发送 GET AJAX 请求
 * @param {string} url - 请求地址
 * @returns {Promise} Promise 对象
 */
function sendAJAX(url) {
    return new Promise((resolve, reject) => {
        // 1. 创建对象
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        // 2. 初始化
        xhr.open("GET", url);

        // 3. 发送请求
        xhr.send();

        // 4. 处理响应结果
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                // 判断成功
                if (xhr.status >= 200 && xhr.status < 300) {
                    // 成功
                    resolve(xhr.response);
                } else {
                    // 失败
                    reject(xhr.status);
                }
            }
        };
    });
}

// 使用
sendAJAX('https://api.github.com/users/github')
    .then(
        value => console.log(value),
        reason => console.warn(reason)
    );
```

**案例四：封装 Node.js fs 模块**

```js
/**
 * 封装函数 readFile 读取文件内容
 * @param {string} path - 文件路径
 * @returns {Promise} Promise 对象
 */
function readFile(path) {
    return new Promise((resolve, reject) => {
        // 读取文件
        require('fs').readFile(path, (err, data) => {
            // 判断
            if (err) reject(err);
            // 成功
            resolve(data);
        });
    });
}

// 使用
readFile('./resource/content.txt')
    .then(
        value => console.log(value.toString()),
        reason => console.log(reason)
    );
```

**案例五：util.promisify 方法**

> 💡 **util.promisify 的作用**：
> - Node.js 提供的工具方法
> - 将遵循 Node.js 回调风格的函数转换为返回 Promise 的函数
> - 回调风格：第一个参数是 error，第二个参数是结果

```js
// 引入 util 模块
const util = require('util');
// 引入 fs 模块
const fs = require('fs');

// 将 fs.readFile 转换为返回 Promise 的函数
const readFilePromise = util.promisify(fs.readFile);

// 使用
readFilePromise('./resource/content.txt')
    .then(value => {
        console.log(value.toString());
    })
    .catch(err => {
        console.error(err);
    });
```

## 二、为什么要用 Promise？

### 1. 指定回调函数的方式更加灵活

**旧的方式**：

- 必须在启动异步任务前指定回调函数
- 回调函数作为参数传入

```js
// 旧方式
createAudioFileAsync(audioSettings, successCallback, failureCallback);
```

**Promise 方式**：

- 启动异步任务 → 返回 Promise 对象 → 给 Promise 对象绑定回调函数
- 甚至可以在任务结束后指定多个回调

```js
// Promise 方式
const promise = createAudioFileAsync(audioSettings);

// 可以稍后再指定回调
setTimeout(() => {
    promise.then(successCallback, failureCallback);
}, 3000);

// 可以指定多个回调
promise.then(callback1);
promise.then(callback2);
```

### 2. 支持链式调用，可以解决回调地狱问题

#### 什么是回调地狱？

**回调地狱**（Callback Hell）：回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调执行的条件

```js
// 回调地狱示例
doSomething(function(result) {
    doSomethingElse(result, function(newResult) {
        doThirdThing(newResult, function(finalResult) {
            console.log('最终结果: ' + finalResult);
        }, failureCallback);
    }, failureCallback);
}, failureCallback);
```

#### 回调地狱的缺点

- 不便于阅读
- 不便于异常处理
- 耦合性强，不便于维护

#### 解决方案

**Promise 链式调用**

```js
doSomething()
    .then(result => doSomethingElse(result))
    .then(newResult => doThirdThing(newResult))
    .then(finalResult => {
        console.log('最终结果: ' + finalResult);
    })
    .catch(failureCallback);
```

**async/await（终极解决方案）**

```js
async function request() {
    try {
        const result = await doSomething();
        const newResult = await doSomethingElse(result);
        const finalResult = await doThirdThing(newResult);
        console.log('最终结果: ' + finalResult);
    } catch (error) {
        failureCallback(error);
    }
}
```

## 三、Promise 的 API

### 1. Promise 构造函数

#### Promise(executor)

```js
new Promise((resolve, reject) => {
    // executor 函数：执行器
    // resolve 函数：内部定义成功时调用的函数
    // reject 函数：内部定义失败时调用的函数

    // 异步操作
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve(value);  // 成功
        } else {
            reject(reason);  // 失败
        }
    }, 1000);
});
```

> 💡 **重要提示**：
> - executor 会在 Promise 内部**立即同步调用**
> - 异步操作在执行器中执行
> - 不要在 executor 外部调用 resolve 或 reject

```js
console.log(1);

new Promise((resolve, reject) => {
    console.log(2);  // 立即执行（同步）
});

console.log(3);

// 输出顺序：1 2 3
```

### 2. Promise.prototype 方法

#### 2.1 Promise.prototype.then()

```js
promise.then(onFulfilled, onRejected)
```

**参数**：

- `onFulfilled`：成功的回调函数 `(value) => {}`
- `onRejected`：失败的回调函数 `(reason) => {}`

**返回值**：

- 返回一个新的 Promise 对象

**说明**：

- 指定用于得到成功 value 的成功回调
- 指定用于得到失败 reason 的失败回调

```js
const p = new Promise((resolve, reject) => {
    resolve('成功的数据');
});

p.then(
    value => {
        console.log('成功:', value);
    },
    reason => {
        console.log('失败:', reason);
    }
);
```

#### 2.2 Promise.prototype.catch()

```js
promise.catch(onRejected)
```

**参数**：

- `onRejected`：失败的回调函数 `(reason) => {}`

**说明**：

- `catch()` 是 `then()` 的语法糖
- 相当于：`then(undefined, onRejected)`

```js
const p = new Promise((resolve, reject) => {
    reject('失败的数据');
});

// 方式一：使用 then
p.then(undefined, reason => {
    console.log('失败:', reason);
});

// 方式二：使用 catch（推荐）
p.catch(reason => {
    console.log('失败:', reason);
});
```

### 3. Promise 的静态方法

#### 3.1 Promise.resolve()

```js
Promise.resolve(value)
```

**功能**：返回一个成功/失败的 Promise 对象

**规则**：

1. 如果参数是**非 Promise 类型的对象**，返回成功的 Promise 对象
2. 如果参数是 **Promise 对象**，参数的结果决定 `resolve` 的结果

```js
// 1. 参数为非 Promise 对象
let p1 = Promise.resolve(521);
console.log(p1);  // Promise {<fulfilled>: 521}

// 2. 参数为 Promise 对象（成功）
let p2 = Promise.resolve(
    new Promise((resolve, reject) => {
        resolve('OK');
    })
);
console.log(p2);  // Promise {<fulfilled>: 'OK'}

// 3. 参数为 Promise 对象（失败）
let p3 = Promise.resolve(
    new Promise((resolve, reject) => {
        reject('Error');
    })
);
console.log(p3);  // Promise {<rejected>: 'Error'}

// 需要处理失败情况，否则会报错
p3.catch(reason => {
    console.log(reason);
});
```

> 💡 **总结**：
> - 非 Promise 对象 → 返回成功的 Promise
> - Promise 对象 → 由该 Promise 的状态决定

#### 3.2 Promise.reject()

```js
Promise.reject(reason)
```

**功能**：返回一个失败的 Promise 对象

**规则**：无论传入什么参数，都返回失败的 Promise

```js
// 1. 参数为非 Promise 对象
let p1 = Promise.reject(521);
console.log(p1);  // Promise {<rejected>: 521}

// 2. 参数为字符串
let p2 = Promise.reject('Error');
console.log(p2);  // Promise {<rejected>: 'Error'}

// 3. 参数为 Promise 对象
let p3 = Promise.reject(
    new Promise((resolve, reject) => {
        resolve("OK");
    })
);
console.log(p3);  // Promise {<rejected>: Promise}
```

> 💡 **总结**：
> - 无论传入什么参数，`Promise.reject()` 始终返回失败的 Promise

#### 3.3 Promise.all()

```js
Promise.all(iterable)
```

**功能**：返回一个新的 Promise，只有所有的 Promise 都成功才成功，只要有一个失败就直接失败

**参数**：包含 n 个 Promise 的数组

**返回值**：

- **全部成功**：返回成功的 Promise，值为所有成功值组成的数组
- **有一个失败**：返回失败的 Promise，值为第一个失败的 reason

```js
let p1 = new Promise((resolve, reject) => {
    resolve("OK");
});

let p2 = Promise.resolve('Success');
let p3 = Promise.resolve("Oh Yeah");

// 所有都成功
const result = Promise.all([p1, p2, p3]);
console.log(result);
// Promise {<fulfilled>: ['OK', 'Success', 'Oh Yeah']}

result.then(
    value => console.log(value),  // ['OK', 'Success', 'Oh Yeah']
    reason => console.log(reason)
);
```

```js
// 有一个失败
let p1 = Promise.resolve("OK");
let p2 = Promise.reject('Error');  // 失败
let p3 = Promise.resolve("Oh Yeah");

const result = Promise.all([p1, p2, p3]);
console.log(result);
// Promise {<rejected>: 'Error'}

result.then(
    value => console.log(value),
    reason => console.log(reason)  // 'Error'
);
```

> 💡 **使用场景**：
> - 需要等待多个异步操作全部完成
> - 例如：同时请求多个接口，等所有接口都返回后再处理

#### 3.4 Promise.race()

```js
Promise.race(iterable)
```

**功能**：返回一个新的 Promise，第一个完成的 Promise 的结果就是最终结果

**参数**：包含 n 个 Promise 的数组

**返回值**：第一个完成的 Promise 的结果（成功或失败）

```js
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("OK");
    }, 1000);
});

let p2 = Promise.resolve("Success");  // 立即完成
let p3 = Promise.resolve("Oh Yeah");

// p2 最先完成
const result = Promise.race([p1, p2, p3]);
console.log(result);
// Promise {<fulfilled>: 'Success'}

result.then(
    value => console.log(value),  // 'Success'
    reason => console.log(reason)
);
```

> 💡 **使用场景**：
> - 请求超时控制：将请求和超时 Promise 竞速
> - 多个数据源，取最快返回的

```js
// 超时控制示例
function fetchWithTimeout(url, timeout = 5000) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('请求超时')), timeout)
        )
    ]);
}
```

#### 3.5 Promise.allSettled()（ES2020）

```js
Promise.allSettled(iterable)
```

**功能**：等待所有 Promise 都「敲定」（无论成功或失败），永远不会 reject。

**与 `Promise.all()` 的区别**：`Promise.all()` 是「一票否决」，只要有一个失败就立即整体失败；`Promise.allSettled()` 会等所有结果都出来，返回每个 Promise 的状态。这是高频面试考点。

**返回值**：一个对象数组，每个元素形如：

- 成功：`{ status: 'fulfilled', value: 值 }`
- 失败：`{ status: 'rejected', reason: 原因 }`

```js
let p1 = Promise.resolve('成功1');
let p2 = Promise.reject('失败了');
let p3 = Promise.resolve('成功3');

Promise.allSettled([p1, p2, p3]).then(results => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: '成功1' },
    //   { status: 'rejected', reason: '失败了' },
    //   { status: 'fulfilled', value: '成功3' }
    // ]
});
```

> 💡 **使用场景**：需要「尽力而为」地拿到所有结果，且不希望某一个失败导致全部拿不到数据。例如同时加载多个独立的板块，某个接口挂了其他板块照常渲染。

## 四、Promise 的关键问题

### 1. 如何改变 Promise 的状态？

改变 Promise 状态有三种方法：

```js
let p = new Promise((resolve, reject) => {
    // 方法1：调用 resolve() - pending → fulfilled
    resolve("ok");

    // 方法2：调用 reject() - pending → rejected
    // reject("error");

    // 方法3：抛出错误 - pending → rejected
    // throw "出问题了";
});
```

**总结**：

- `resolve(value)`：pending → fulfilled
- `reject(reason)`：pending → rejected
- `throw error`：pending → rejected

### 2. 一个 Promise 可以指定多个回调函数吗？

可以，当 Promise 状态改变时，所有回调都会被调用。

```js
let p = new Promise((resolve, reject) => {
    resolve("OK");
});

// 指定回调 1
p.then(value => {
    console.log('回调1:', value);
});

// 指定回调 2
p.then(value => {
    console.log('回调2:', value);
});

// 指定回调 3
p.then(value => {
    console.log('回调3:', value);
});

// 输出：
// 回调1: OK
// 回调2: OK
// 回调3: OK
```

> 💡 **注意**：
> - 如果不调用 `resolve()` 或 `reject()`，Promise 状态保持 pending
> - pending 状态的 Promise 不会调用任何回调

### 3. 改变 Promise 状态和指定回调函数谁先谁后？

**都有可能**，正常情况下是先指定回调再改变状态，但也可以先改状态再指定回调。

#### 如何先改状态再指定回调？

**方式一**：在执行器中直接调用 `resolve()` / `reject()`（同步调用）

```js
let p = new Promise((resolve, reject) => {
    resolve("OK");  // 直接调用，立即改变状态
});

// 此时状态已经改变，再指定回调
p.then(value => {
    console.log(value);
});
```

**方式二**：延迟更长时间才调用 `then()`

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("OK");  // 1 秒后改变状态
    }, 1000);
});

// 2 秒后指定回调（此时状态已经改变）
setTimeout(() => {
    p.then(value => {
        console.log(value);
    });
}, 2000);
```

#### 什么时候才能得到数据？

1. **先指定回调，后改变状态**：
   - 当状态改变时，回调函数就会调用，得到数据

2. **先改变状态，后指定回调**：
   - 当指定回调时，回调函数就会调用，得到数据

```js
let startTime = Date.now();
console.log("开始记时", startTime);

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("OK");
        let endTime = Date.now() - startTime;
        console.log("状态改变时间", endTime);
    }, 1000);
});

// 先指定回调（立即）
p.then(
    value => {
        let callbackTime = Date.now() - startTime;
        console.log("回调执行时间", callbackTime);
        console.log(value);
    },
    reason => {}
);

// 输出：
// 开始记时 ...
// 状态改变时间 1000
// 回调执行时间 1000
// OK
```

### 4. Promise.then() 返回的新 Promise 的结果由什么决定？

`then()` 方法返回的新 Promise 的状态由**回调函数的执行结果**决定。

**规则**：

1. **抛出错误**：返回 rejected 的 Promise
2. **返回非 Promise 对象**：返回 fulfilled 的 Promise，值为返回值
3. **返回 Promise 对象**：返回的 Promise 的状态决定新 Promise 的状态

```js
let p = new Promise((resolve, reject) => {
    resolve("ok");
});

let result = p.then(
    value => {
        // 情况1：抛出错误 → rejected
        // throw "出了问题";

        // 情况2：返回非 Promise 对象 → fulfilled
        // return 521;

        // 情况3：返回 Promise 对象
        return new Promise((resolve, reject) => {
            // resolve("success");  // → fulfilled
            reject("error");        // → rejected
        });
    },
    reason => {
        console.warn(reason);
    }
);

console.log(result);

// 处理 result（result 也是一个 Promise）
result.then(
    value => {
        console.log('成功:', value);
    },
    reason => {
        console.log('失败:', reason);
    }
);
```

**详细示例**：

```js
// 示例1：返回非 Promise 值
let p1 = Promise.resolve(1);
let r1 = p1.then(value => {
    return value + 1;  // 返回 2
});
r1.then(value => console.log(value));  // 2

// 示例2：抛出错误
let p2 = Promise.resolve(1);
let r2 = p2.then(value => {
    throw new Error('出错了');
});
r2.catch(err => console.log(err.message));  // '出错了'

// 示例3：返回 Promise
let p3 = Promise.resolve(1);
let r3 = p3.then(value => {
    return Promise.reject('失败');
});
r3.catch(err => console.log(err));  // '失败'
```

### 5. Promise 如何串联多个操作任务？

通过 `then()` 的**链式调用**来串联多个同步/异步任务。

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
    }, 1000);
});

p.then(value => {
    console.log(value);  // 'OK'
    // 返回新的 Promise
    return new Promise((resolve, reject) => {
        resolve("success");
    });
}).then(value => {
    console.log(value);  // 'success'
    return 'done';
}).then(value => {
    console.log(value);  // 'done'
    // 不返回任何值，默认返回 undefined
}).then(value => {
    console.log(value);  // undefined
});
```

**实际应用示例**：

```js
// 按顺序读取三个文件
readFile('./file1.txt')
    .then(data1 => {
        console.log('文件1:', data1);
        return readFile('./file2.txt');
    })
    .then(data2 => {
        console.log('文件2:', data2);
        return readFile('./file3.txt');
    })
    .then(data3 => {
        console.log('文件3:', data3);
    })
    .catch(err => {
        console.error('读取失败:', err);
    });
```

### 6. Promise 异常穿透

当使用 Promise 的 `then` 链式调用时，可以在**最后**指定失败的回调，前面任何操作出了异常，都会传到最后失败的回调中处理。

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
        // reject('Err');
    }, 1000);
});

p.then(value => {
    console.log(111);
    throw '失败啦!';  // 抛出错误
}).then(value => {
    console.log(222);  // 不会执行
}).then(value => {
    console.log(333);  // 不会执行
}).catch(reason => {
    // 捕获前面所有的错误
    console.warn(reason);  // '失败啦!'
});

// 输出：
// 111
// 失败啦!
```

**原理**：

当 `then()` 只传入成功回调时，失败回调默认为：

```js
reason => { throw reason }  // 将错误继续抛出
```

所以错误会一直向后传递，直到遇到 `catch()` 或 `then()` 的失败回调。

**等价写法**：

```js
p.then(value => {
    console.log(111);
    throw '失败啦!';
}).then(value => {
    console.log(222);
}, reason => {
    throw reason;  // 继续抛出
}).then(value => {
    console.log(333);
}, reason => {
    throw reason;  // 继续抛出
}).catch(reason => {
    console.warn(reason);
});
```

### 7. 如何中断 Promise 链？

当使用 Promise 的 `then` 链式调用时，在中间中断，不再调用后面的回调函数。

**方法**：在回调函数中返回一个 **pending 状态**的 Promise 对象

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
    }, 1000);
});

p.then(value => {
    console.log(111);

    // 有且只有这一种方式
    return new Promise(() => {});  // 返回 pending 状态的 Promise

}).then(value => {
    console.log(222);  // 不会执行
}).then(value => {
    console.log(333);  // 不会执行
}).catch(reason => {
    console.warn(reason);  // 不会执行
});

// 输出：
// 111
```

> 💡 **原理**：
> - 返回 pending 状态的 Promise，后续的 `then()` 永远不会执行
> - 因为 pending 状态不会调用成功或失败回调

**实际应用**：

```js
p.then(value => {
    // 某个条件下中断
    if (someCondition) {
        return new Promise(() => {});
    }
    return value;
}).then(value => {
    // 只有 someCondition 为 false 才会执行
    console.log(value);
});
```

## 五、async 和 await

> 💡 **async/await 的优势**：
> - ES2017（ES8）引入
> - 是 Promise 的语法糖，让异步代码看起来像同步代码
> - 比 Promise 链更简洁、更易读
> - 更好的错误处理（try...catch）

### 1. async 函数

`async` 函数的返回值是 **Promise 对象**，Promise 对象的结果由 `async` 函数执行的返回值决定。

**语法**：

```js
async function functionName() {
    // 函数体
}
```

**返回值规则**（与 `then()` 相同）：

1. **返回非 Promise 对象**：返回 fulfilled 的 Promise
2. **返回 Promise 对象**：由该 Promise 的状态决定
3. **抛出错误**：返回 rejected 的 Promise

```js
// 1. 返回非 Promise 对象
async function fn1() {
    return 521;  // 返回普通值
}
let result1 = fn1(); 
console.log(result1);  // Promise {<fulfilled>: 521}

// 2. 返回 Promise 对象
async function fn2() {
    return new Promise((resolve, reject) => {
        // resolve('OK');     // fulfilled
        reject("Error");      // rejected
    });
}
let result2 = fn2();
console.log(result2);  // Promise {<rejected>: 'Error'}

// 需要处理失败情况
result2.catch(reason => {
    console.log(reason);  // 'Error'
});

// 3. 抛出错误
async function fn3() {
    throw "Oh NO";
}
let result3 = fn3();
console.log(result3);  // Promise {<rejected>: 'Oh NO'}
```

**使用 then 处理结果**：

```js
async function getData() {
    return { name: '张三', age: 18 };
}

getData().then(data => {
    console.log(data);  // { name: '张三', age: 18 }
});
```

### 2. await 表达式

`await` 必须写在 `async` 函数中（顶层 await 除外）。

**语法**：

```js
await expression
```

**表达式规则**：

1. **await 右侧是 Promise 对象**：返回 Promise 成功的值
2. **await 右侧是其他值**：直接返回该值
3. **await 的 Promise 失败**：抛出异常，需要 try...catch 捕获

```js
async function main() {
    // 1. await 右侧为 Promise
    let p = new Promise((resolve, reject) => {
        resolve("OK");
    });
    let res1 = await p;
    console.log(res1);  // 'OK'

    // 2. await 右侧为其他类型
    let res2 = await 20;
    console.log(res2);  // 20

    // 3. await 的 Promise 失败
    let p2 = new Promise((resolve, reject) => {
        reject("Error");
    });

    try {
        let res3 = await p2;
    } catch (e) {
        console.log(e);  // 'Error'
    }
}

main();
```

### 3. async/await 完整示例

**读取文件**：

```js
const fs = require('fs').promises;

// 使用 Promise
function readFilesPromise() {
    return fs.readFile('./file1.txt', 'utf8')
        .then(data1 => {
            console.log(data1);
            return fs.readFile('./file2.txt', 'utf8');
        })
        .then(data2 => {
            console.log(data2);
            return fs.readFile('./file3.txt', 'utf8');
        })
        .then(data3 => {
            console.log(data3);
        })
        .catch(err => {
            console.error(err);
        });
}

// 使用 async/await（推荐）
async function readFilesAsync() {
    try {
        const data1 = await fs.readFile('./file1.txt', 'utf8');
        console.log(data1);

        const data2 = await fs.readFile('./file2.txt', 'utf8');
        console.log(data2);

        const data3 = await fs.readFile('./file3.txt', 'utf8');
        console.log(data3);
    } catch (err) {
        console.error(err);
    }
}

readFilesAsync();
```

**AJAX 请求**：

```js
// 封装 fetch
async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('请求失败:', error);
        throw error;
    }
}

// 使用
async function main() {
    try {
        const users = await getData('https://api.example.com/users');
        console.log(users);

        const posts = await getData('https://api.example.com/posts');
        console.log(posts);
    } catch (error) {
        console.error('获取数据失败:', error);
    }
}

main();
```

### 4. 注意事项

> 💡 **重要提示**：

**1. await 必须在 async 函数中**

```js
// ✗ 错误
function fn() {
    await somePromise();  // 语法错误
}

// ✓ 正确
async function fn() {
    await somePromise();
}
```

**2. async 函数中可以没有 await**

```js
async function fn() {
    console.log('Hello');
    return 'World';
}
```

**3. await 的 Promise 失败需要捕获**

```js
async function fn() {
    try {
        const result = await somePromise();
        console.log(result);
    } catch (error) {
        console.error('失败:', error);
    }
}
```

**4. 多个 await 顺序执行**

```js
// 顺序执行（耗时：3秒）
async function sequential() {
    const a = await delay(1000);  // 等待 1 秒
    const b = await delay(2000);  // 等待 2 秒
    return [a, b];
}

// 并发执行（耗时：2秒）
async function concurrent() {
    const promiseA = delay(1000);  // 不 await，立即启动
    const promiseB = delay(2000);  // 不 await，立即启动
    const [a, b] = await Promise.all([promiseA, promiseB]);
    return [a, b];
}
```

## 六、Promise 开发注意事项

### 注意事项 Ⅰ：并发请求优化

当需要同时请求多个接口时，应该使用 `Promise.all()` 而不是依次 `await`。

**❌ 不好的做法**（耗时：2秒）：

```js
async function fetchData() {
    const dataA = await fetch('https://api.example.com/a');  // 等待 1 秒
    const dataB = await fetch('https://api.example.com/b');  // 等待 1 秒

    return [dataA, dataB];
}
```

**✓ 好的做法**（耗时：1秒）：

```js
async function fetchData() {
    const promiseA = fetch('https://api.example.com/a');
    const promiseB = fetch('https://api.example.com/b');

    // 并发执行
    const [dataA, dataB] = await Promise.all([promiseA, promiseB]);

    return [dataA, dataB];
}
```

> 💡 **原理**：
> - `await` 会暂停函数执行，等待 Promise 完成
> - 依次 `await` 会串行执行，耗时累加
> - `Promise.all()` 并发执行，耗时取最长的

### 注意事项 Ⅱ：循环中的 async/await

在循环中使用 `async/await` 时，不能使用 `forEach`、`map` 等方法。

**❌ 错误做法**：

```js
async function processArray() {
    [1, 2, 3].forEach(async (item) => {
        await someAsyncTask(item);
        // forEach 不会等待 async 函数执行完
    });

    console.log('done');  // 立即输出，不会等待
}
```

**✓ 正确做法**：

```js
// 方法1：使用 for...of（串行执行）
async function processArray() {
    for (const item of [1, 2, 3]) {
        await someAsyncTask(item);
    }
    console.log('done');  // 等待所有任务完成后输出
}

// 方法2：使用 Promise.all（并行执行）
async function processArray() {
    const promises = [1, 2, 3].map(item => someAsyncTask(item));
    await Promise.all(promises);
    console.log('done');
}

// 方法3：for await...of（并发执行，依次处理结果）
async function processArray() {
    const promises = [
        someAsyncTask(1),
        someAsyncTask(2),
        someAsyncTask(3)
    ];

    for await (let result of promises) {
        console.log(result);
    }

    console.log('done');
}
```

**对比**：

| 方法 | 执行方式 | 适用场景 |
|------|---------|---------|
| for...of | 串行 | 任务有依赖关系 |
| Promise.all | 并行 | 任务独立，需要所有结果 |
| for await...of | 并发 | 任务独立，需要依次处理结果 |

### 注意事项 Ⅲ：await 后面不能是普通函数

**❌ 错误做法**：

```js
function normalFunction() {
    return 'result';
}

// 虽然语法正确，但没有意义
await normalFunction();
```

**✓ 正确做法**：

```js
async function asyncFunction() {
    return 'result';
}

// 方式1：直接调用 async 函数
await asyncFunction();

// 方式2：包装在 async 函数中
async function main() {
    const result = await asyncFunction();
    console.log(result);
}

main();
```

## 七、宏任务与微任务

> 💡 **事件循环机制**：
> - JavaScript 是单线程的，通过事件循环处理异步任务
> - 异步任务分为**宏任务**和**微任务**两种
> - 执行顺序：同步代码 → 微任务 → 宏任务

### 1. 宏任务与微任务的区别

**宏任务（Macrotask）**

- 由**宿主环境**（浏览器、Node.js）发起
- 包括：
  - `setTimeout`
  - `setInterval`
  - `setImmediate`（Node.js）
  - I/O 操作
  - UI 渲染（浏览器）

**微任务（Microtask）**

- 由 **JavaScript 引擎**发起
- 包括：
  - `Promise.then/catch/finally`
  - `async/await`
  - `process.nextTick`（Node.js）
  - `MutationObserver`（浏览器）
  - `queueMicrotask`

### 2. 执行顺序

**规则**：

1. 执行所有同步代码
2. 执行所有微任务（清空微任务队列）
3. 执行一个宏任务
4. 回到步骤 2

**示例**：

```js
console.log('1. 同步代码');

setTimeout(() => {
    console.log('2. setTimeout（宏任务）');
}, 0);

Promise.resolve().then(() => {
    console.log('3. Promise.then（微任务）');
});

console.log('4. 同步代码');

// 输出顺序：
// 1. 同步代码
// 4. 同步代码
// 3. Promise.then（微任务）
// 2. setTimeout（宏任务）
```

### 3. 微任务相关 API

#### 3.1 queueMicrotask

`queueMicrotask()` 方法将一个微任务加入队列。

**语法**：

```js
queueMicrotask(callback)
```

**示例**：

```js
console.log('start');

queueMicrotask(() => {
    console.log('microtask');
});

console.log('end');

// 输出：
// start
// end
// microtask
```

#### 3.2 MutationObserver

`MutationObserver` 接口提供了监视 DOM 变化的能力。

**语法**：

```js
const observer = new MutationObserver(callback);
observer.observe(target, options);
```

**示例**：

```js
const observer = new MutationObserver((mutations) => {
    console.log('DOM 发生变化', mutations);
});

const targetNode = document.getElementById('app');

observer.observe(targetNode, {
    attributes: true,      // 监听属性变化
    childList: true,       // 监听子节点变化
    subtree: true          // 监听所有后代节点
});

// 触发变化
targetNode.innerHTML = '<div>新内容</div>';
```

### 4. 经典练习题

**题目**：请说出下面代码的输出顺序

```js
console.log('1');

setTimeout(() => {
    console.log('2');
}, 0);

const p = new Promise((resolve, reject) => {
    console.log('3');
    resolve();
}).then(() => {
    console.log('4');
}).then(() => {
    console.log('5');
});

console.log('6');
```

**分析**：

1. `console.log('1')`：同步代码，立即执行
2. `setTimeout`：宏任务，放入宏任务队列
3. `new Promise`：Promise 构造函数是同步的，立即执行 `console.log('3')`
4. `.then()`：微任务，放入微任务队列
5. `console.log('6')`：同步代码，立即执行
6. 执行微任务队列：`console.log('4')`
7. 第一个 `.then()` 执行后，第二个 `.then()` 进入微任务队列
8. 继续执行微任务：`console.log('5')`
9. 微任务队列清空，执行宏任务：`console.log('2')`

**答 案**：

```
1
3
6
4
5
2
```

**复杂题目**：

```js
let a;
const b = new Promise((resolve, reject) => {
    console.log('promise1');
    resolve();
}).then(() => {
    console.log('promise2');
}).then(() => {
    console.log('promise3');
}).then(() => {
    console.log('promise4');
});

a = new Promise(async (resolve, reject) => {
    console.log(a);  // undefined（此时 a 还未赋值）
    await b;
    console.log(a);  // Promise 对象
    console.log('after1');
    await a;         // 等待自己，永远 pending
    resolve(true);
    console.log('after2');  // 不会执行
});

console.log('end');
```

**分析**：Promise 构造函数是同步执行的

 async 函数第一个 await 之前是同步的

1. 同步代码：`promise1`
2. `.then()` 进入微任务队列
3. `async` 函数立即执行（同步部分）：`console.log(a)` → `undefined`
4. `await b`：等待 Promise b    
5. 同步代码：`end`
6. 执行微任务：`promise2`
7. 继续微任务：`promise3`
8. 继续微任务：`promise4`
9. Promise b 完成，继续执行 `async` 函数
10. 输出：`Promise 对象`、`after1`
11. `await a`：等待自己，永远 pending，后面的代码不会执行

**答案**：

```
promise1
undefined
end
promise2
promise3
promise4
Promise { <pending> }
after1
```

## 八、总结

### Promise 核心要点

1. **Promise 是什么**
   - 异步编程的解决方案
   - 解决回调地狱问题
   - 三种状态：pending、fulfilled、rejected

2. **Promise 的优势**
   - 链式调用，代码更清晰
   - 更灵活的回调指定方式
   - 更好的错误处理

3. **Promise API**
   - 构造函数：`new Promise(executor)`
   - 实例方法：`then()`、`catch()`、`finally()`
   - 静态方法：`resolve()`、`reject()`、`all()`、`allSettled()`、`race()`

4. **async/await**
   - Promise 的语法糖
   - 让异步代码看起来像同步代码
   - 使用 try...catch 处理错误

5. **事件循环**
   - 同步代码 → 微任务 → 宏任务
   - Promise.then 是微任务
   - setTimeout 是宏任务

### 最佳实践

1. **优先使用 async/await**
   - 代码更简洁易读
   - 错误处理更方便

2. **注意并发优化**
   - 使用 `Promise.all()` 并发执行独立任务
   - 避免不必要的串行等待

3. **正确处理错误**
   - 始终添加错误处理（catch 或 try...catch）
   - 利用异常穿透特性

4. **避免常见陷阱**
   - 循环中使用 for...of 而不是 forEach
   - 理解宏任务和微任务的执行顺序

---

> **学习建议**
>
> 1. **理解原理**：深入理解 Promise 的状态机制和事件循环
> 2. **多写代码**：通过实际项目巩固 Promise 的使用
> 3. **掌握 async/await**：现代开发中优先使用 async/await
> 4. **注意性能**：合理使用并发，避免不必要的等待
> 5. **错误处理**：养成良好的错误处理习惯
>
> 🔗 **推荐资源**
> - [MDN - Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
> - [MDN - async function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)
> - [MDN - await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)
> - [Promise/A+ 规范](https://promisesaplus.com/)
