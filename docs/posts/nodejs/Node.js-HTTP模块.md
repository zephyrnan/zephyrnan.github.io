---
title: Node.js HTTP 模块
date: 2025-11-20
categories:
  - Node.js 深入学习
tags:
  - Node.js
  - HTTP
---

# Node.js HTTP 模块

## 1. HTTP 模块简介

Node.js 的 `http` 模块提供了创建 HTTP 服务器和客户端的功能，是构建 Web 应用的基础。

### 1.1 导入模块

```javascript
const http = require('http');
const https = require('https'); // HTTPS 模块
```

### 1.2 核心概念

- **Server**: HTTP 服务器，监听请求并返回响应
- **Request**: 客户端请求对象
- **Response**: 服务器响应对象
- **Client**: HTTP 客户端，用于发送请求

## 2. 创建 HTTP 服务器

### 2.1 基础服务器

```javascript
const http = require('http');

// 创建服务器
const server = http.createServer((req, res) => {
  // 设置响应头
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

  // 发送响应内容
  res.end('Hello World!\n你好，世界！');
});

// 监听端口
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}/`);
});
```

> ⚠️ **注意事项**:
> - **res.end()必须调用**: 不调用会导致请求挂起
> - **端口占用**: 确保端口未被占用,否则会报EADDRINUSE错误
> - **字符编码**: 中文内容需要设置charset=utf-8
> - **生产环境**: 建议使用环境变量设置端口
> - **单线程限制**: 一个进程只能监听一个端口
>
> ```javascript
> // 错误示例:忘记调用end()
> http.createServer((req, res) => {
>   res.writeHead(200, { 'Content-Type': 'text/plain' });
>   res.write('Hello');
>   // 忘记res.end() - 浏览器会一直等待
> });
>
> // 端口被占用错误处理
> server.on('error', (err) => {
>   if (err.code === 'EADDRINUSE') {
>     console.error(`端口 ${PORT} 已被占用`);
>     process.exit(1);
>   }
> });
>
> // 生产环境推荐写法
> const PORT = process.env.PORT || 3000;
> const HOST = process.env.HOST || '0.0.0.0';
>
> server.listen(PORT, HOST, () => {
>   console.log(`Server running at http://${HOST}:${PORT}/`);
> });
> ```

> 🎯 **实际应用场景**:
> ```javascript
> // 场景1:简单的RESTful API
> const http = require('http');
>
> const server = http.createServer((req, res) => {
>   const { method, url } = req;
>
>   res.setHeader('Content-Type', 'application/json');
>
>   if (method === 'GET' && url === '/api/users') {
>     res.end(JSON.stringify({ users: ['Alice', 'Bob'] }));
>   } else if (method === 'GET' && url === '/api/status') {
>     res.end(JSON.stringify({ status: 'ok' }));
>   } else {
>     res.writeHead(404);
>     res.end(JSON.stringify({ error: 'Not Found' }));
>   }
> });
>
> server.listen(3000);
>
> // 场景2:静态文件服务器
> const http = require('http');
> const fs = require('fs');
> const path = require('path');
>
> http.createServer((req, res) => {
>   const filePath = path.join(__dirname, 'public', req.url);
>
>   fs.readFile(filePath, (err, data) => {
>     if (err) {
>       res.writeHead(404);
>       res.end('File not found');
>     } else {
>       res.writeHead(200);
>       res.end(data);
>     }
>   });
> }).listen(8080);
>
> // 场景3:健康检查端点
> http.createServer((req, res) => {
>   if (req.url === '/health') {
>     res.writeHead(200, { 'Content-Type': 'application/json' });
>     res.end(JSON.stringify({
>       status: 'healthy',
>       uptime: process.uptime(),
>       timestamp: Date.now()
>     }));
>   } else {
>     res.writeHead(404);
>     res.end();
>   }
> }).listen(3000);
> ```

### 2.2 服务器事件

```javascript
const http = require('http');

const server = http.createServer();

// 监听请求事件
server.on('request', (req, res) => {
  console.log(`收到请求: ${req.method} ${req.url}`);
  res.end('请求已处理');
});

// 监听连接事件
server.on('connection', (socket) => {
  console.log('新的连接建立');
});

// 监听关闭事件
server.on('close', () => {
  console.log('服务器已关闭');
});

// 监听错误事件
server.on('error', (err) => {
  console.error('服务器错误:', err);
});

server.listen(3000);
```

### 2.3 优雅关闭

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('OK');
});

server.listen(3000);

// 处理进程信号
process.on('SIGTERM', () => {
  console.log('收到 SIGTERM 信号，正在关闭服务器...');

  server.close(() => {
    console.log('服务器已关闭');
    process.exit(0);
  });

  // 强制关闭超时
  setTimeout(() => {
    console.error('强制关闭服务器');
    process.exit(1);
  }, 10000);
});
```

## 3. 处理请求 (Request)

### 3.1 请求对象属性

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // HTTP 方法
  console.log('方法:', req.method); // GET, POST, PUT, DELETE 等

  // 请求 URL
  console.log('URL:', req.url); // /path?query=value

  // HTTP 版本
  console.log('HTTP 版本:', req.httpVersion); // 1.1

  // 请求头
  console.log('请求头:', req.headers);
  console.log('User-Agent:', req.headers['user-agent']);
  console.log('Content-Type:', req.headers['content-type']);

  // 主机名
  console.log('主机:', req.headers.host);

  res.end('请求信息已记录');
});

server.listen(3000);
```

### 3.2 解析 URL

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // 解析 URL
  const parsedUrl = url.parse(req.url, true);

  console.log('路径:', parsedUrl.pathname); // /api/users
  console.log('查询参数:', parsedUrl.query); // { id: '123', name: 'John' }

  // 使用 URL 类（推荐）
  const myUrl = new URL(req.url, `http://${req.headers.host}`);
  console.log('路径名:', myUrl.pathname);
  console.log('搜索参数:', myUrl.searchParams.get('id'));

  res.end('URL 已解析');
});

server.listen(3000);
```

### 3.3 处理不同的请求方法

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>欢迎</h1>');
  }
  else if (method === 'GET' && url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: ['Alice', 'Bob'] }));
  }
  else if (method === 'POST' && url === '/api/users') {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: '用户已创建' }));
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000);
```

### 3.4 接收 POST 数据

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    // 监听数据事件
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // 数据接收完成
    req.on('end', () => {
      console.log('接收到的数据:', body);

      // 解析 JSON
      try {
        const data = JSON.parse(body);
        console.log('解析后的数据:', data);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          message: '数据已接收',
          data
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('无效的 JSON 数据');
      }
    });

    // 错误处理
    req.on('error', (err) => {
      console.error('请求错误:', err);
      res.writeHead(500);
      res.end('服务器错误');
    });
  } else {
    res.writeHead(405);
    res.end('Method Not Allowed');
  }
});

server.listen(3000);
```

### 3.5 处理文件上传

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    const uploadPath = path.join(__dirname, 'uploads', 'uploaded-file');

    // 确保上传目录存在
    if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
      fs.mkdirSync(path.join(__dirname, 'uploads'));
    }

    // 创建写入流
    const writeStream = fs.createWriteStream(uploadPath);

    // 将请求数据写入文件
    req.pipe(writeStream);

    writeStream.on('finish', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: '文件上传成功' }));
    });

    writeStream.on('error', (err) => {
      console.error('写入错误:', err);
      res.writeHead(500);
      res.end('文件上传失败');
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000);
```

## 4. 发送响应 (Response)

### 4.1 响应对象方法

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // 设置状态码和响应头
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'X-Custom-Header': 'CustomValue'
  });

  // 或单独设置
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Powered-By', 'Node.js');

  // 写入响应内容
  res.write('<h1>Hello</h1>');
  res.write('<p>This is a paragraph.</p>');

  // 结束响应
  res.end('<p>Goodbye!</p>');
});

server.listen(3000);
```

### 4.2 常见响应类型

#### 文本响应

```javascript
res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
res.end('纯文本响应');
```

#### HTML 响应

```javascript
res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
res.end(`
  <!DOCTYPE html>
  <html>
    <head><title>示例页面</title></head>
    <body>
      <h1>欢迎</h1>
      <p>这是一个 HTML 页面</p>
    </body>
  </html>
`);
```

#### JSON 响应

```javascript
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({
  status: 'success',
  data: {
    name: 'John',
    age: 30
  }
}));
```

#### 重定向

```javascript
res.writeHead(302, { 'Location': '/new-page' });
res.end();

// 或
res.statusCode = 301; // 永久重定向
res.setHeader('Location', 'https://example.com');
res.end();
```

### 4.3 发送文件

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');

  // 检查文件是否存在
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    // 读取文件并发送
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  });
});

server.listen(3000);
```

### 4.4 流式发送文件

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'large-file.mp4');

  // 获取文件信息
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'video/mp4',
      'Content-Length': stats.size
    });

    // 创建读取流并传输
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);

    readStream.on('error', (err) => {
      console.error('读取错误:', err);
      res.end();
    });
  });
});

server.listen(3000);
```

### 4.5 设置响应头

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 缓存控制
  res.setHeader('Cache-Control', 'public, max-age=3600');

  // 安全头
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Cookie
  res.setHeader('Set-Cookie', 'sessionId=abc123; HttpOnly; Secure');

  res.end('响应头已设置');
});

server.listen(3000);
```

## 5. HTTP 客户端

### 5.1 发送 GET 请求

```javascript
const http = require('http');

const options = {
  hostname: 'api.example.com',
  port: 80,
  path: '/api/users',
  method: 'GET',
  headers: {
    'User-Agent': 'Node.js HTTP Client'
  }
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头:`, res.headers);

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('响应内容:', data);
    try {
      const json = JSON.parse(data);
      console.log('解析后的数据:', json);
    } catch (err) {
      console.error('解析失败:', err);
    }
  });
});

req.on('error', (err) => {
  console.error('请求错误:', err);
});

req.end();
```

### 5.2 发送 POST 请求

```javascript
const http = require('http');

const postData = JSON.stringify({
  name: 'John Doe',
  email: 'john@example.com'
});

const options = {
  hostname: 'api.example.com',
  port: 80,
  path: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('响应:', data);
  });
});

req.on('error', (err) => {
  console.error('请求错误:', err);
});

// 发送数据
req.write(postData);
req.end();
```

### 5.3 使用 http.get() 简化

```javascript
const http = require('http');

http.get('http://api.example.com/api/users', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('数据:', data);
  });
}).on('error', (err) => {
  console.error('错误:', err);
});
```

## 6. 实战案例

### 案例 1: RESTful API 服务器

```javascript
const http = require('http');
const url = require('url');

// 模拟数据库
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

let nextId = 3;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // GET /api/users - 获取所有用户
  if (method === 'GET' && pathname === '/api/users') {
    res.writeHead(200);
    res.end(JSON.stringify({ success: true, data: users }));
  }

  // GET /api/users/:id - 获取单个用户
  else if (method === 'GET' && pathname.startsWith('/api/users/')) {
    const id = parseInt(pathname.split('/')[3]);
    const user = users.find(u => u.id === id);

    if (user) {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: user }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ success: false, error: '用户不存在' }));
    }
  }

  // POST /api/users - 创建用户
  else if (method === 'POST' && pathname === '/api/users') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const userData = JSON.parse(body);
        const newUser = {
          id: nextId++,
          name: userData.name,
          email: userData.email
        };
        users.push(newUser);

        res.writeHead(201);
        res.end(JSON.stringify({ success: true, data: newUser }));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ success: false, error: '无效的数据' }));
      }
    });
  }

  // PUT /api/users/:id - 更新用户
  else if (method === 'PUT' && pathname.startsWith('/api/users/')) {
    const id = parseInt(pathname.split('/')[3]);
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const userData = JSON.parse(body);
        const index = users.findIndex(u => u.id === id);

        if (index !== -1) {
          users[index] = { ...users[index], ...userData };
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, data: users[index] }));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ success: false, error: '用户不存在' }));
        }
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ success: false, error: '无效的数据' }));
      }
    });
  }

  // DELETE /api/users/:id - 删除用户
  else if (method === 'DELETE' && pathname.startsWith('/api/users/')) {
    const id = parseInt(pathname.split('/')[3]);
    const index = users.findIndex(u => u.id === id);

    if (index !== -1) {
      users.splice(index, 1);
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, message: '用户已删除' }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ success: false, error: '用户不存在' }));
    }
  }

  // 404 Not Found
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ success: false, error: '路由不存在' }));
  }
});

server.listen(3000, () => {
  console.log('API 服务器运行在 http://localhost:3000/');
});
```

### 案例 2: 静态文件服务器

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME 类型映射
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  // 安全性：防止目录遍历攻击
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  filePath = path.normalize(filePath);

  // 确保文件在 public 目录下
  const publicDir = path.join(__dirname, 'public');
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // 获取文件扩展名
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  // 检查文件是否存在
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
      return;
    }

    // 读取并发送文件
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

server.listen(8080, () => {
  console.log('静态文件服务器运行在 http://localhost:8080/');
});
```

### 案例 3: 代理服务器

```javascript
const http = require('http');
const url = require('url');

const proxy = http.createServer((req, res) => {
  // 解析目标 URL
  const targetUrl = url.parse(req.url.slice(1)); // 移除开头的 /

  if (!targetUrl.hostname) {
    res.writeHead(400);
    res.end('Bad Request: 请提供完整的 URL');
    return;
  }

  console.log(`代理请求: ${req.method} ${targetUrl.href}`);

  // 创建代理请求
  const proxyReq = http.request({
    hostname: targetUrl.hostname,
    port: targetUrl.port || 80,
    path: targetUrl.path,
    method: req.method,
    headers: req.headers
  }, (proxyRes) => {
    // 转发响应头
    res.writeHead(proxyRes.statusCode, proxyRes.headers);

    // 转发响应内容
    proxyRes.pipe(res);
  });

  // 转发请求内容
  req.pipe(proxyReq);

  proxyReq.on('error', (err) => {
    console.error('代理错误:', err);
    res.writeHead(500);
    res.end('Proxy Error');
  });
});

proxy.listen(8080, () => {
  console.log('代理服务器运行在 http://localhost:8080/');
  console.log('使用方式: http://localhost:8080/http://example.com');
});
```

### 案例 4: SSE (Server-Sent Events) 服务器

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    // 设置 SSE 响应头
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    // 发送初始消息
    res.write('data: 连接已建立\n\n');

    // 每秒发送时间戳
    const interval = setInterval(() => {
      const data = {
        timestamp: new Date().toISOString(),
        message: 'Hello from server'
      };

      res.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 1000);

    // 客户端断开连接时清理
    req.on('close', () => {
      clearInterval(interval);
      console.log('客户端断开连接');
    });
  }
  else if (req.url === '/') {
    // 提供 HTML 客户端
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head><title>SSE 示例</title></head>
        <body>
          <h1>Server-Sent Events</h1>
          <div id="messages"></div>
          <script>
            const eventSource = new EventSource('/events');
            const messagesDiv = document.getElementById('messages');

            eventSource.onmessage = (event) => {
              const p = document.createElement('p');
              p.textContent = event.data;
              messagesDiv.appendChild(p);
            };

            eventSource.onerror = (error) => {
              console.error('SSE 错误:', error);
            };
          </script>
        </body>
      </html>
    `);
  }
  else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('SSE 服务器运行在 http://localhost:3000/');
});
```

### 案例 5: 简单的路由系统

```javascript
const http = require('http');
const url = require('url');

class Router {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
      DELETE: {}
    };
  }

  get(path, handler) {
    this.routes.GET[path] = handler;
  }

  post(path, handler) {
    this.routes.POST[path] = handler;
  }

  put(path, handler) {
    this.routes.PUT[path] = handler;
  }

  delete(path, handler) {
    this.routes.DELETE[path] = handler;
  }

  handle(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    const handler = this.routes[method]?.[pathname];

    if (handler) {
      // 添加辅助方法
      res.json = (data) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      };

      res.send = (data) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      };

      req.query = parsedUrl.query;

      handler(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }
}

// 使用路由
const router = new Router();

router.get('/', (req, res) => {
  res.send('欢迎使用简单路由系统');
});

router.get('/api/users', (req, res) => {
  res.json({ users: ['Alice', 'Bob', 'Charlie'] });
});

router.get('/api/info', (req, res) => {
  res.json({
    name: req.query.name || 'Guest',
    timestamp: new Date().toISOString()
  });
});

router.post('/api/users', (req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      res.json({ message: '用户已创建', data });
    } catch (err) {
      res.writeHead(400);
      res.end('Invalid JSON');
    }
  });
});

// 创建服务器
const server = http.createServer((req, res) => {
  router.handle(req, res);
});

server.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000/');
});
```

## 7. HTTPS 服务器

### 7.1 创建 HTTPS 服务器

```javascript
const https = require('https');
const fs = require('fs');

// 读取证书文件
const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('HTTPS 服务器');
});

server.listen(443, () => {
  console.log('HTTPS 服务器运行在 https://localhost/');
});
```

### 7.2 生成自签名证书（开发环境）

```bash
# 使用 OpenSSL 生成
openssl req -nodes -new -x509 -keyout private-key.pem -out certificate.pem -days 365
```

## 8. 性能优化

### 8.1 启用压缩

```javascript
const http = require('http');
const zlib = require('zlib');

const server = http.createServer((req, res) => {
  const acceptEncoding = req.headers['accept-encoding'] || '';

  const data = 'A'.repeat(10000); // 大量数据

  if (acceptEncoding.includes('gzip')) {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Content-Encoding': 'gzip'
    });
    zlib.gzip(data, (err, compressed) => {
      if (err) {
        res.end(data);
      } else {
        res.end(compressed);
      }
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(data);
  }
});

server.listen(3000);
```

### 8.2 设置连接超时

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('OK');
});

// 设置服务器超时
server.timeout = 120000; // 2 分钟

// 设置请求超时
server.on('connection', (socket) => {
  socket.setTimeout(60000); // 1 分钟

  socket.on('timeout', () => {
    console.log('连接超时');
    socket.end();
  });
});

server.listen(3000);
```

### 8.3 Keep-Alive

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Keep-Alive', 'timeout=5, max=100');
  res.end('OK');
});

server.keepAliveTimeout = 5000; // 5 秒

server.listen(3000);
```

## 9. 最佳实践

### 9.1 错误处理

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  try {
    // 业务逻辑
    res.end('OK');
  } catch (err) {
    console.error('处理错误:', err);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

// 捕获未处理的错误
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('端口已被占用');
  } else {
    console.error('服务器错误:', err);
  }
});

server.listen(3000);
```

### 9.2 安全性

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // 设置安全响应头
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');

  // 限制请求体大小
  let body = '';
  const maxSize = 1048576; // 1MB

  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > maxSize) {
      res.writeHead(413, { 'Content-Type': 'text/plain' });
      res.end('Request Entity Too Large');
      req.destroy(); // req.connection 已废弃，直接用 req.destroy() 或 req.socket.destroy()
    }
  });

  res.end('OK');
});

server.listen(3000);
```

## 10. 总结

### 核心要点

1. **HTTP 模块是基础**: 理解 HTTP 协议和 Node.js 的实现
2. **请求响应模型**: 掌握 Request 和 Response 对象的使用
3. **流式处理**: 大文件和数据传输使用流
4. **路由设计**: 合理组织路由和业务逻辑
5. **错误处理**: 完善的错误捕获和处理机制
6. **安全性**: 设置安全响应头，防止常见攻击

### 进阶学习

- 使用 Express.js 简化开发
- HTTP/2 和 HTTP/3
- WebSocket 实时通信
- 微服务架构
- 负载均衡和集群
