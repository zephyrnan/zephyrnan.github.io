---
title: AJAX 学习笔记
date: 2025-11-20
categories:
  - 前端开发
tags:
  - JavaScript
  - AJAX
---

# AJAX 学习笔记

## 前言

AJAX（Asynchronous JavaScript and XML）是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。通过 AJAX，可以在后台与服务器进行异步通信，实现动态更新页面内容，提升用户体验。

> 💡 **核心概念**：
> - AJAX 不是一种新的编程语言，而是一种使用现有标准的新方法
> - 核心对象是 **XMLHttpRequest**
> - 可以在不重新加载页面的情况下与服务器交换数据
> - 实现页面的局部更新

## 一、AJAX 简介

### 1. 什么是 AJAX？

**AJAX** = Asynchronous JavaScript and XML（异步 JavaScript 和 XML）

- **异步**：可以在不重新加载整个页面的情况下，与服务器交换数据并更新部分网页内容
- **JavaScript**：用于创建动态页面的脚本语言
- **XML**：一种数据传输格式（现在更多使用 JSON）

### 2. AJAX 的工作原理

```
浏览器                                服务器
  │                                    │
  │  1. 用户触发事件                  │
  │     (点击按钮等)                  │
  │                                    │
  │  2. 创建 XMLHttpRequest 对象      │
  │                                    │
  │  3. 发送 HTTP 请求 ──────────────>│
  │                                    │
  │                         4. 处理请求│
  │                            返回数据│
  │  5. 接收响应数据 <────────────────│
  │                                    │
  │  6. 使用 JavaScript 更新页面       │
  │     (无需刷新)                     │
```

### 3. AJAX 的优缺点

**优点**：

- **无需刷新页面**：更新页面内容，提升用户体验
- **异步通信**：不阻塞用户操作
- **减少服务器负担**：按需请求数据，减少数据传输量
- **提高响应速度**：只更新需要的部分

**缺点**：

- **浏览器兼容性**：不同浏览器对 XMLHttpRequest 的支持程度不同
- **不支持浏览器的后退按钮**：破坏了浏览器的前进后退机制
- **SEO 不友好**：搜索引擎无法抓取异步加载的内容
- **安全问题**：可能遭受跨站脚本攻击（XSS）

## 二、XMLHttpRequest 对象

### 1. 创建 XMLHttpRequest 对象

```js
// 现代浏览器
const xhr = new XMLHttpRequest();

// 兼容旧版本 IE（IE5、IE6）
const xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP");
```

### 2. XMLHttpRequest 对象的属性

| 属性 | 描述 |
|------|------|
| `readyState` | 请求的状态（0-4） |
| `status` | HTTP 状态码（200、404、500 等） |
| `statusText` | HTTP 状态文本（"OK"、"Not Found" 等） |
| `response` | 响应数据 |
| `responseText` | 响应数据（字符串形式） |
| `responseXML` | 响应数据（XML 形式） |
| `responseType` | 响应数据类型 |
| `timeout` | 超时时间（毫秒） |

#### 2.1 readyState 状态值

| 值 | 状态 | 描述 |
|----|------|------|
| 0 | UNSENT | 未初始化，尚未调用 open() |
| 1 | OPENED | 已调用 open()，但未调用 send() |
| 2 | HEADERS_RECEIVED | 已调用 send()，接收到响应头 |
| 3 | LOADING | 正在接收响应体 |
| 4 | DONE | 请求完成，响应已就绪 |

```js
const xhr = new XMLHttpRequest();

console.log(xhr.readyState);  // 0

xhr.open('GET', '/api/data');
console.log(xhr.readyState);  // 1

xhr.send();
// readyState 会变为 2、3、4
```

#### 2.2 status 常见状态码

| 状态码 | 描述 |
|--------|------|
| 200 | OK - 请求成功 |
| 201 | Created - 已创建 |
| 204 | No Content - 无内容 |
| 301 | Moved Permanently - 永久重定向 |
| 302 | Found - 临时重定向 |
| 304 | Not Modified - 未修改（缓存） |
| 400 | Bad Request - 错误请求 |
| 401 | Unauthorized - 未授权 |
| 403 | Forbidden - 禁止访问 |
| 404 | Not Found - 未找到 |
| 500 | Internal Server Error - 服务器内部错误 |
| 503 | Service Unavailable - 服务不可用 |

### 3. XMLHttpRequest 对象的方法

| 方法 | 描述 |
|------|------|
| `open(method, url, async)` | 初始化请求 |
| `send(data)` | 发送请求 |
| `setRequestHeader(header, value)` | 设置请求头 |
| `getResponseHeader(header)` | 获取响应头 |
| `getAllResponseHeaders()` | 获取所有响应头 |
| `abort()` | 取消当前请求 |

#### 3.1 open() 方法

```js
xhr.open(method, url, async, user, password)
```

**参数**：

- `method`：请求方法（GET、POST、PUT、DELETE 等）
- `url`：请求地址
- `async`：是否异步（true 为异步，false 为同步，默认 true）
- `user`：可选，用户名
- `password`：可选，密码

```js
// GET 请求
xhr.open('GET', '/api/users', true);

// POST 请求
xhr.open('POST', '/api/users', true);

// 同步请求（不推荐）
xhr.open('GET', '/api/users', false);
```

#### 3.2 send() 方法

```js
xhr.send(data)
```

**参数**：

- `data`：请求体数据（GET 请求传 null，POST 请求传数据）

```js
// GET 请求
xhr.send(null);

// POST 请求（JSON 数据）
xhr.send(JSON.stringify({ name: '张三', age: 18 }));

// POST 请求（表单数据）
const formData = new FormData();
formData.append('name', '张三');
formData.append('age', 18);
xhr.send(formData);
```

#### 3.3 setRequestHeader() 方法

```js
xhr.setRequestHeader(header, value)
```

**注意**：必须在 `open()` 之后、`send()` 之前调用

```js
xhr.open('POST', '/api/users');

// 设置内容类型
xhr.setRequestHeader('Content-Type', 'application/json');

// 设置自定义请求头
xhr.setRequestHeader('Authorization', 'Bearer token123');

xhr.send(JSON.stringify({ name: '张三' }));
```

**常见的 Content-Type**：

| 值 | 描述 |
|----|------|
| `application/json` | JSON 数据 |
| `application/x-www-form-urlencoded` | 表单数据（默认） |
| `multipart/form-data` | 文件上传 |
| `text/plain` | 纯文本 |
| `text/html` | HTML |

### 4. XMLHttpRequest 对象的事件

| 事件 | 描述 |
|------|------|
| `onreadystatechange` | readyState 改变时触发 |
| `onload` | 请求成功完成时触发 |
| `onerror` | 请求失败时触发 |
| `onprogress` | 接收数据时触发 |
| `onabort` | 请求被取消时触发 |
| `ontimeout` | 请求超时时触发 |
| `onloadstart` | 请求开始时触发 |
| `onloadend` | 请求结束时触发（无论成功或失败） |

```js
const xhr = new XMLHttpRequest();

// 监听状态变化
xhr.onreadystatechange = function() {
    console.log('readyState:', xhr.readyState);
};

// 请求成功
xhr.onload = function() {
    console.log('请求成功:', xhr.responseText);
};

// 请求失败
xhr.onerror = function() {
    console.log('请求失败');
};

// 请求超时
xhr.ontimeout = function() {
    console.log('请求超时');
};

// 进度
xhr.onprogress = function(event) {
    if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        console.log('下载进度:', percent + '%');
    }
};
```

## 三、AJAX 基本使用

### 1. GET 请求

#### 1.1 基本的 GET 请求

```js
// 1. 创建 XMLHttpRequest 对象
const xhr = new XMLHttpRequest();

// 2. 初始化请求
xhr.open('GET', '/api/users', true);

// 3. 处理响应（注意：应在 send() 之前注册回调，避免漏掉状态变化）
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log('响应数据:', xhr.responseText);
        } else {
            console.error('请求失败:', xhr.status);
        }
    }
};

// 4. 发送请求
xhr.send();
```

> ⚠️ **注意事项**:
> - **readyState 为 4** 表示请求完成,但不代表成功,还需检查 status
> - **status 200-299** 表示成功,常见的是 200(OK)
> - **onreadystatechange** 会触发多次(0→1→2→3→4),需要判断 readyState === 4
> - **同步请求会阻塞**浏览器,必须使用异步(async = true)
> - GET 请求的参数应该放在 URL 中,不要放在 send() 中
>
> ```js
> // 错误示例:onreadystatechange触发多次
> xhr.onreadystatechange = function() {
>     console.log(xhr.status);  // 会输出多次: 0, 0, 200, 200, 200
> };
>
> // 正确做法
> xhr.onreadystatechange = function() {
>     if (xhr.readyState === 4 && xhr.status === 200) {
>         console.log(xhr.responseText);
>     }
> };
>
> // GET请求带参数的正确方式
> xhr.open('GET', '/api/users?page=1&size=10', true);
> xhr.send(null);  // GET请求send()传null
> ```

> 🎯 **实际应用场景**:
> ```js
> // 场景1:获取用户列表
> function getUserList(page = 1, pageSize = 10) {
>     const xhr = new XMLHttpRequest();
>     xhr.open('GET', `/api/users?page=${page}&pageSize=${pageSize}`);
>
>     xhr.onreadystatechange = function() {
>         if (xhr.readyState === 4) {
>             if (xhr.status === 200) {
>                 const users = JSON.parse(xhr.responseText);
>                 renderUserList(users);
>             } else {
>                 showError('获取用户列表失败');
>             }
>         }
>     };
>
>     xhr.send();
> }
>
> // 场景2:搜索功能(带防抖)
> let searchTimer;
> function searchUsers(keyword) {
>     clearTimeout(searchTimer);
>     searchTimer = setTimeout(() => {
>         const xhr = new XMLHttpRequest();
>         xhr.open('GET', `/api/search?q=${encodeURIComponent(keyword)}`);
>         xhr.onload = function() {
>             if (xhr.status === 200) {
>                 displaySearchResults(JSON.parse(xhr.responseText));
>             }
>         };
>         xhr.send();
>     }, 300);
> }
>
> // 场景3:加载更多(无限滚动)
> let currentPage = 1;
> function loadMore() {
>     const xhr = new XMLHttpRequest();
>     xhr.open('GET', `/api/posts?page=${currentPage}`);
>
>     xhr.onload = function() {
>         if (xhr.status === 200) {
>             const posts = JSON.parse(xhr.responseText);
>             appendPosts(posts);
>             currentPage++;
>         }
>     };
>
>     xhr.send();
> }
>
> window.addEventListener('scroll', () => {
>     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
>         loadMore();
>     }
> });
> ```

#### 1.2 GET 请求（使用 onload）

```js
const xhr = new XMLHttpRequest();

xhr.open('GET', '/api/users');

xhr.onload = function() {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log('用户列表:', data);
    } else {
        console.error('请求失败:', xhr.status);
    }
};

xhr.onerror = function() {
    console.error('网络错误');
};

xhr.send();
```

#### 1.3 GET 请求（带查询参数）

```js
// 方式一：手动拼接
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/users?page=1&limit=10');
xhr.send();

// 方式二：使用 URLSearchParams
const params = new URLSearchParams({
    page: 1,
    limit: 10,
    keyword: '张三'
});

const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/users?' + params.toString());
xhr.send();

// URL: /api/users?page=1&limit=10&keyword=%E5%BC%A0%E4%B8%89
```

### 2. POST 请求

#### 2.1 发送 JSON 数据

```js
const xhr = new XMLHttpRequest();

xhr.open('POST', '/api/users');

// 设置请求头
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onload = function() {
    if (xhr.status === 201) {
        const data = JSON.parse(xhr.responseText);
        console.log('创建成功:', data);
    }
};

// 发送 JSON 数据
const user = {
    name: '张三',
    age: 18,
    email: 'zhangsan@example.com'
};

xhr.send(JSON.stringify(user));
```

#### 2.2 发送表单数据（application/x-www-form-urlencoded）

```js
const xhr = new XMLHttpRequest();

xhr.open('POST', '/api/login');

// 设置请求头
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

xhr.onload = function() {
    if (xhr.status === 200) {
        console.log('登录成功:', xhr.responseText);
    }
};

// 发送表单数据
const formData = 'username=zhangsan&password=123456';
xhr.send(formData);
```

#### 2.3 发送 FormData 对象

```js
const xhr = new XMLHttpRequest();

xhr.open('POST', '/api/users');

xhr.onload = function() {
    if (xhr.status === 201) {
        console.log('创建成功:', xhr.responseText);
    }
};

// 创建 FormData 对象
const formData = new FormData();
formData.append('name', '张三');
formData.append('age', 18);
formData.append('email', 'zhangsan@example.com');

// 发送（无需设置 Content-Type，浏览器会自动设置）
xhr.send(formData);
```

#### 2.4 文件上传

```js
const xhr = new XMLHttpRequest();

xhr.open('POST', '/api/upload');

// 监听上传进度
xhr.upload.onprogress = function(event) {
    if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        console.log('上传进度:', percent.toFixed(2) + '%');
    }
};

xhr.onload = function() {
    if (xhr.status === 200) {
        console.log('上传成功:', xhr.responseText);
    }
};

// 获取文件
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];

// 创建 FormData
const formData = new FormData();
formData.append('file', file);
formData.append('description', '图片描述');

xhr.send(formData);
```

**完整的文件上传示例**：

```html
<!DOCTYPE html>
<html>
<head>
    <title>文件上传</title>
</head>
<body>
    <input type="file" id="fileInput">
    <button onclick="uploadFile()">上传</button>
    <div id="progress"></div>

    <script>
        function uploadFile() {
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];

            if (!file) {
                alert('请选择文件');
                return;
            }

            const xhr = new XMLHttpRequest();

            // 监听上传进度
            xhr.upload.onprogress = function(event) {
                if (event.lengthComputable) {
                    const percent = (event.loaded / event.total) * 100;
                    document.getElementById('progress').textContent =
                        '上传进度: ' + percent.toFixed(2) + '%';
                }
            };

            // 上传完成
            xhr.onload = function() {
                if (xhr.status === 200) {
                    alert('上传成功');
                } else {
                    alert('上传失败');
                }
            };

            // 上传失败
            xhr.onerror = function() {
                alert('网络错误');
            };

            // 发送请求
            xhr.open('POST', '/api/upload');

            const formData = new FormData();
            formData.append('file', file);

            xhr.send(formData);
        }
    </script>
</body>
</html>
```

### 3. 其他 HTTP 方法

#### 3.1 PUT 请求（更新资源）

```js
const xhr = new XMLHttpRequest();

xhr.open('PUT', '/api/users/1');

xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onload = function() {
    if (xhr.status === 200) {
        console.log('更新成功:', xhr.responseText);
    }
};

const updatedUser = {
    name: '李四',
    age: 20
};

xhr.send(JSON.stringify(updatedUser));
```

#### 3.2 DELETE 请求（删除资源）

```js
const xhr = new XMLHttpRequest();

xhr.open('DELETE', '/api/users/1');

xhr.onload = function() {
    if (xhr.status === 204) {
        console.log('删除成功');
    }
};

xhr.send();
```

#### 3.3 PATCH 请求（部分更新）

```js
const xhr = new XMLHttpRequest();

xhr.open('PATCH', '/api/users/1');

xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onload = function() {
    if (xhr.status === 200) {
        console.log('更新成功:', xhr.responseText);
    }
};

// 只更新部分字段
const updates = {
    age: 21
};

xhr.send(JSON.stringify(updates));
```

## 四、响应数据处理

### 1. 解析 JSON 数据

```js
const xhr = new XMLHttpRequest();

xhr.open('GET', '/api/users');

xhr.onload = function() {
    if (xhr.status === 200) {
        // 方式一：手动解析
        const data = JSON.parse(xhr.responseText);
        console.log(data);

        // 方式二：使用 responseType
        // xhr.responseType = 'json';
        // console.log(xhr.response);  // 自动解析为对象
    }
};

xhr.send();
```

### 2. 设置响应类型

```js
const xhr = new XMLHttpRequest();

xhr.open('GET', '/api/data');

// 设置响应类型
xhr.responseType = 'json';  // 自动解析为 JSON

xhr.onload = function() {
    if (xhr.status === 200) {
        console.log(xhr.response);  // 已经是对象，无需手动解析
    }
};

xhr.send();
```

**responseType 的可选值**：

| 值 | 描述 |
|----|------|
| `""` | 字符串（默认） |
| `"text"` | 字符串 |
| `"json"` | JSON 对象 |
| `"document"` | HTML 或 XML 文档 |
| `"blob"` | Blob 对象 |
| `"arraybuffer"` | ArrayBuffer 对象 |

### 3. 下载文件

```js
const xhr = new XMLHttpRequest();

xhr.open('GET', '/api/download/file.pdf');

// 设置响应类型为 blob
xhr.responseType = 'blob';

xhr.onload = function() {
    if (xhr.status === 200) {
        // 创建 Blob URL
        const blob = xhr.response;
        const url = URL.createObjectURL(blob);

        // 创建下载链接
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file.pdf';
        a.click();

        // 释放 URL
        URL.revokeObjectURL(url);
    }
};

xhr.send();
```

## 五、AJAX 高级功能

### 1. 超时设置

```js
const xhr = new XMLHttpRequest();

xhr.open('GET', '/api/data');

// 设置超时时间（毫秒）
xhr.timeout = 5000;  // 5 秒

// 超时回调
xhr.ontimeout = function() {
    console.error('请求超时');
    alert('请求超时，请稍后重试');
};

xhr.onload = function() {
    if (xhr.status === 200) {
        console.log(xhr.responseText);
    }
};

xhr.send();
```

### 2. 取消请求

```js
const xhr = new XMLHttpRequest();

xhr.open('GET', '/api/data');

xhr.send();

// 取消请求
setTimeout(() => {
    xhr.abort();
    console.log('请求已取消');
}, 1000);

// 监听取消事件
xhr.onabort = function() {
    console.log('请求被取消');
};
```

### 3. 设置请求头和获取响应头

```js
const xhr = new XMLHttpRequest();

xhr.open('GET', '/api/users');

// 设置请求头
xhr.setRequestHeader('Authorization', 'Bearer token123');
xhr.setRequestHeader('X-Custom-Header', 'custom-value');

xhr.onload = function() {
    if (xhr.status === 200) {
        // 获取特定响应头
        const contentType = xhr.getResponseHeader('Content-Type');
        console.log('Content-Type:', contentType);

        // 获取所有响应头
        const allHeaders = xhr.getAllResponseHeaders();
        console.log('所有响应头:', allHeaders);
    }
};

xhr.send();
```

### 4. 携带凭证（Cookie）

```js
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.example.com/data');

// 允许携带凭证（跨域请求时）
xhr.withCredentials = true;

xhr.onload = function() {
    if (xhr.status === 200) {
        console.log(xhr.responseText);
    }
};

xhr.send();
```

> 💡 **注意**：
> - 同域请求默认会携带 Cookie
> - 跨域请求需要设置 `withCredentials = true`
> - 服务器也需要设置相应的 CORS 头：`Access-Control-Allow-Credentials: true`

## 六、封装 AJAX 函数

### 1. 基础封装

```js
/**
 * 发送 AJAX 请求
 * @param {Object} options - 请求配置
 * @param {string} options.method - 请求方法
 * @param {string} options.url - 请求地址
 * @param {Object} options.data - 请求数据
 * @param {Function} options.success - 成功回调
 * @param {Function} options.error - 失败回调
 */
function ajax(options) {
    const xhr = new XMLHttpRequest();

    // 处理 GET 请求的查询参数
    let url = options.url;
    if (options.method === 'GET' && options.data) {
        const params = new URLSearchParams(options.data);
        url += '?' + params.toString();
    }

    xhr.open(options.method, url);

    // 设置请求头
    if (options.headers) {
        for (let key in options.headers) {
            xhr.setRequestHeader(key, options.headers[key]);
        }
    }

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            let response = xhr.responseText;

            // 尝试解析 JSON
            try {
                response = JSON.parse(response);
            } catch (e) {}

            options.success && options.success(response);
        } else {
            options.error && options.error(xhr.status, xhr.statusText);
        }
    };

    xhr.onerror = function() {
        options.error && options.error(0, '网络错误');
    };

    // 发送请求
    let body = null;
    if (options.method !== 'GET' && options.data) {
        if (options.headers && options.headers['Content-Type'] === 'application/json') {
            body = JSON.stringify(options.data);
        } else {
            body = options.data;
        }
    }

    xhr.send(body);
}

// 使用示例
ajax({
    method: 'GET',
    url: '/api/users',
    data: { page: 1, limit: 10 },
    success: function(data) {
        console.log('成功:', data);
    },
    error: function(status, message) {
        console.error('失败:', status, message);
    }
});

ajax({
    method: 'POST',
    url: '/api/users',
    headers: {
        'Content-Type': 'application/json'
    },
    data: { name: '张三', age: 18 },
    success: function(data) {
        console.log('创建成功:', data);
    },
    error: function(status, message) {
        console.error('创建失败:', status, message);
    }
});
```

### 2. Promise 封装

```js
/**
 * 发送 AJAX 请求（Promise 版本）
 * @param {Object} options - 请求配置
 * @returns {Promise}
 */
function ajax(options) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // 处理 GET 请求参数
        let url = options.url;
        if (options.method === 'GET' && options.data) {
            const params = new URLSearchParams(options.data);
            url += '?' + params.toString();
        }

        xhr.open(options.method, url);

        // 设置请求头
        if (options.headers) {
            for (let key in options.headers) {
                xhr.setRequestHeader(key, options.headers[key]);
            }
        }

        // 设置超时
        if (options.timeout) {
            xhr.timeout = options.timeout;
        }

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                let response = xhr.responseText;

                // 自动解析 JSON
                try {
                    response = JSON.parse(response);
                } catch (e) {}

                resolve(response);
            } else {
                reject(new Error(`请求失败: ${xhr.status} ${xhr.statusText}`));
            }
        };

        xhr.onerror = function() {
            reject(new Error('网络错误'));
        };

        xhr.ontimeout = function() {
            reject(new Error('请求超时'));
        };

        // 发送请求
        let body = null;
        if (options.method !== 'GET' && options.data) {
            if (options.headers && options.headers['Content-Type'] === 'application/json') {
                body = JSON.stringify(options.data);
            } else if (options.data instanceof FormData) {
                body = options.data;
            } else {
                body = new URLSearchParams(options.data).toString();
            }
        }

        xhr.send(body);
    });
}

// 使用示例
ajax({
    method: 'GET',
    url: '/api/users',
    data: { page: 1, limit: 10 },
    timeout: 5000
})
    .then(data => {
        console.log('成功:', data);
    })
    .catch(error => {
        console.error('失败:', error.message);
    });

// 使用 async/await
async function getUsers() {
    try {
        const users = await ajax({
            method: 'GET',
            url: '/api/users'
        });
        console.log('用户列表:', users);
    } catch (error) {
        console.error('获取失败:', error.message);
    }
}
```

### 3. 完整的 AJAX 工具类

```js
class Ajax {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
        this.defaultHeaders = {};
    }

    // 设置默认请求头
    setDefaultHeader(key, value) {
        this.defaultHeaders[key] = value;
    }

    // 核心请求方法
    request(options) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            // 处理 URL
            let url = this.baseURL + options.url;
            if (options.method === 'GET' && options.data) {
                const params = new URLSearchParams(options.data);
                url += '?' + params.toString();
            }

            xhr.open(options.method, url);

            // 设置默认请求头
            for (let key in this.defaultHeaders) {
                xhr.setRequestHeader(key, this.defaultHeaders[key]);
            }

            // 设置自定义请求头
            if (options.headers) {
                for (let key in options.headers) {
                    xhr.setRequestHeader(key, options.headers[key]);
                }
            }

            // 设置超时
            xhr.timeout = options.timeout || 30000;

            // 设置响应类型
            if (options.responseType) {
                xhr.responseType = options.responseType;
            }

            // 监听进度
            if (options.onProgress) {
                xhr.onprogress = options.onProgress;
            }

            // 监听上传进度
            if (options.onUploadProgress) {
                xhr.upload.onprogress = options.onUploadProgress;
            }

            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let response = xhr.response || xhr.responseText;

                    // 自动解析 JSON
                    if (typeof response === 'string') {
                        try {
                            response = JSON.parse(response);
                        } catch (e) {}
                    }

                    resolve({
                        data: response,
                        status: xhr.status,
                        statusText: xhr.statusText,
                        headers: xhr.getAllResponseHeaders()
                    });
                } else {
                    reject(new Error(`请求失败: ${xhr.status} ${xhr.statusText}`));
                }
            };

            xhr.onerror = () => reject(new Error('网络错误'));
            xhr.ontimeout = () => reject(new Error('请求超时'));

            // 发送请求
            let body = null;
            if (options.method !== 'GET' && options.data) {
                if (options.data instanceof FormData) {
                    body = options.data;
                } else if (options.headers && options.headers['Content-Type'] === 'application/json') {
                    body = JSON.stringify(options.data);
                } else {
                    body = new URLSearchParams(options.data).toString();
                }
            }

            xhr.send(body);
        });
    }

    // GET 请求
    get(url, params, options = {}) {
        return this.request({
            method: 'GET',
            url,
            data: params,
            ...options
        });
    }

    // POST 请求
    post(url, data, options = {}) {
        return this.request({
            method: 'POST',
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
    }

    // PUT 请求
    put(url, data, options = {}) {
        return this.request({
            method: 'PUT',
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
    }

    // DELETE 请求
    delete(url, options = {}) {
        return this.request({
            method: 'DELETE',
            url,
            ...options
        });
    }
}

// 使用示例
const api = new Ajax('https://api.example.com');

// 设置默认请求头
api.setDefaultHeader('Authorization', 'Bearer token123');

// GET 请求
api.get('/users', { page: 1, limit: 10 })
    .then(response => {
        console.log('用户列表:', response.data);
    })
    .catch(error => {
        console.error('获取失败:', error.message);
    });

// POST 请求
api.post('/users', { name: '张三', age: 18 })
    .then(response => {
        console.log('创建成功:', response.data);
    })
    .catch(error => {
        console.error('创建失败:', error.message);
    });

// 文件上传
const formData = new FormData();
formData.append('file', file);

api.post('/upload', formData, {
    headers: {},  // 不设置 Content-Type，让浏览器自动设置
    onUploadProgress: (event) => {
        const percent = (event.loaded / event.total) * 100;
        console.log('上传进度:', percent.toFixed(2) + '%');
    }
})
    .then(response => {
        console.log('上传成功:', response.data);
    })
    .catch(error => {
        console.error('上传失败:', error.message);
    });
```

## 七、跨域问题

### 1. 什么是跨域？

**同源策略**：浏览器的一种安全机制，限制了从一个源加载的文档或脚本如何与另一个源的资源进行交互。

**同源**的定义：协议、域名、端口都相同

```
http://www.example.com:80/index.html

协议: http://
域名: www.example.com
端口: 80
```

**跨域示例**：

| URL | 是否跨域 | 原因 |
|-----|---------|------|
| `http://www.example.com/api` | 否 | 同源 |
| `https://www.example.com/api` | 是 | 协议不同 |
| `http://api.example.com/data` | 是 | 域名不同 |
| `http://www.example.com:8080/api` | 是 | 端口不同 |

### 2. 跨域解决方案

#### 2.1 CORS（跨域资源共享）

**服务器端设置响应头**：

```js
// Node.js Express 示例
app.use((req, res, next) => {
    // 允许的源
    res.setHeader('Access-Control-Allow-Origin', '*');  // 或指定域名

    // 允许的方法
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // 允许的请求头
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 允许携带凭证
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
});
```

**前端设置**：

```js
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.example.com/data');

// 允许携带凭证
xhr.withCredentials = true;

xhr.send();
```

#### 2.2 JSONP（只支持 GET 请求）

```js
function jsonp(url, callback) {
    const script = document.createElement('script');
    const callbackName = 'jsonp_' + Date.now();

    // 定义全局回调函数
    window[callbackName] = function(data) {
        callback(data);
        // 清理
        document.body.removeChild(script);
        delete window[callbackName];
    };

    // 设置 script src
    script.src = url + (url.includes('?') ? '&' : '?') + 'callback=' + callbackName;

    document.body.appendChild(script);
}

// 使用
jsonp('https://api.example.com/data', function(data) {
    console.log('数据:', data);
});
```

#### 2.3 代理服务器

在开发环境中，可以使用代理服务器转发请求。

```js
// webpack 配置示例
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.example.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};
```

## 八、最佳实践

### 1. 错误处理

```js
function ajax(options) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(options.method, options.url);

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } catch (error) {
                    reject(new Error('解析响应数据失败'));
                }
            } else {
                // 根据状态码返回不同错误
                let message;
                switch (xhr.status) {
                    case 400:
                        message = '请求参数错误';
                        break;
                    case 401:
                        message = '未授权，请登录';
                        break;
                    case 403:
                        message = '拒绝访问';
                        break;
                    case 404:
                        message = '请求的资源不存在';
                        break;
                    case 500:
                        message = '服务器内部错误';
                        break;
                    default:
                        message = '请求失败';
                }
                reject(new Error(message));
            }
        };

        xhr.onerror = () => reject(new Error('网络连接失败'));
        xhr.ontimeout = () => reject(new Error('请求超时'));

        xhr.send(options.data);
    });
}
```

### 2. 请求拦截和响应拦截

```js
class Ajax {
    constructor() {
        this.requestInterceptors = [];
        this.responseInterceptors = [];
    }

    // 添加请求拦截器
    useRequestInterceptor(fn) {
        this.requestInterceptors.push(fn);
    }

    // 添加响应拦截器
    useResponseInterceptor(fn) {
        this.responseInterceptors.push(fn);
    }

    request(options) {
        // 执行请求拦截器
        for (let interceptor of this.requestInterceptors) {
            options = interceptor(options);
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(options.method, options.url);

            // ... 其他代码

            // 用箭头函数保证 this 仍指向 Ajax 实例（普通函数中 this 会指向 xhr）
            xhr.onload = () => {
                let response = {
                    data: xhr.responseText,
                    status: xhr.status,
                    statusText: xhr.statusText
                };

                // 执行响应拦截器
                for (let interceptor of this.responseInterceptors) {
                    response = interceptor(response);
                }

                resolve(response);
            };

            xhr.send(options.data);
        });
    }
}

// 使用
const api = new Ajax();

// 请求拦截器：添加 token
api.useRequestInterceptor(options => {
    const token = localStorage.getItem('token');
    if (token) {
        options.headers = options.headers || {};
        options.headers['Authorization'] = 'Bearer ' + token;
    }
    return options;
});

// 响应拦截器：处理响应数据
api.useResponseInterceptor(response => {
    try {
        response.data = JSON.parse(response.data);
    } catch (e) {}
    return response;
});
```

### 3. 请求取消和防抖

```js
class Ajax {
    constructor() {
        this.pendingRequests = new Map();
    }

    // 生成请求标识
    getRequestKey(options) {
        return `${options.method}:${options.url}`;
    }

    request(options) {
        const key = this.getRequestKey(options);

        // 取消之前的相同请求
        if (this.pendingRequests.has(key)) {
            this.pendingRequests.get(key).abort();
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            // 保存请求
            this.pendingRequests.set(key, xhr);

            xhr.open(options.method, options.url);

            xhr.onload = function() {
                // 请求完成，移除
                this.pendingRequests.delete(key);

                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject(new Error('请求失败'));
                }
            }.bind(this);

            xhr.onerror = xhr.ontimeout = function() {
                this.pendingRequests.delete(key);
                reject(new Error('请求失败'));
            }.bind(this);

            xhr.onabort = function() {
                this.pendingRequests.delete(key);
                reject(new Error('请求被取消'));
            }.bind(this);

            xhr.send(options.data);
        });
    }

    // 取消所有请求
    cancelAllRequests() {
        for (let xhr of this.pendingRequests.values()) {
            xhr.abort();
        }
        this.pendingRequests.clear();
    }
}
```

## 九、总结

### AJAX 核心要点

1. **XMLHttpRequest 对象**
   - 核心对象，提供异步通信能力
   - 理解 readyState 和 status
   - 掌握常用方法和事件

2. **请求流程**
   - 创建对象 → 初始化 → 发送 → 处理响应
   - GET 和 POST 的区别
   - 请求头和响应头的设置

3. **异步处理**
   - 使用回调函数
   - 使用 Promise
   - 使用 async/await

4. **跨域问题**
   - 理解同源策略
   - CORS 解决方案
   - JSONP、代理等其他方案

5. **最佳实践**
   - 错误处理
   - 请求拦截
   - 请求取消
   - 防抖优化

### 现代替代方案

虽然 AJAX 仍然重要，但现代开发更推荐使用：

- **Fetch API**：浏览器原生 API，更简洁
- **Axios**：功能强大的第三方库
- **其他库**：如 jQuery.ajax、Superagent 等

---

> **学习建议**
>
> 1. **掌握基础**：理解 XMLHttpRequest 的工作原理
> 2. **实践为主**：通过实际项目巩固知识
> 3. **学习封装**：尝试封装自己的 AJAX 函数
> 4. **了解替代**：学习 Fetch API 和 Axios
> 5. **注意安全**：处理好跨域和数据验证
>
> 🔗 **推荐资源**
> - [MDN - XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)
> - [MDN - 使用 Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
> - [AJAX 教程 - W3School](https://www.w3school.com.cn/ajax/index.asp)
