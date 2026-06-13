---
title: Node.js Express 框架
date: 2025-11-20
categories:
  - Node.js 深入学习
tags:
  - Node.js
  - Express
---

# Node.js Express 框架

## 1. Express 简介

Express 是 Node.js 最流行的 Web 应用框架，提供了简洁而强大的 API 来构建 Web 应用和 API。

### 1.1 特点

- **轻量级**: 核心功能简洁，通过中间件扩展
- **路由系统**: 强大的路由管理
- **中间件**: 灵活的中间件架构
- **模板引擎**: 支持多种模板引擎
- **易于学习**: API 简单直观

### 1.2 安装

```bash
# 初始化项目
npm init -y

# 安装 Express
npm install express

# 安装开发依赖（可选）
npm install --save-dev nodemon
```

### 1.3 第一个 Express 应用

```javascript
const express = require('express');
const app = express();

// 定义路由
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}/`);
});
```

> ⚠️ **注意事项**:
> - **res.send()** 会自动设置Content-Type和状态码
> - **app.listen()** 返回一个http.Server实例
> - 端口号建议使用环境变量: `process.env.PORT || 3000`
> - 开发时推荐使用nodemon自动重启服务器
>
> ```javascript
> // 推荐的生产环境写法
> const express = require('express');
> const app = express();
>
> const PORT = process.env.PORT || 3000;
> const server = app.listen(PORT, () => {
>   console.log(`Server running on port ${PORT}`);
> });
>
> // 优雅关闭
> process.on('SIGTERM', () => {
>   server.close(() => {
>     console.log('Server closed');
>   });
> });
> ```

> 🎯 **实际应用场景**:
> ```javascript
> // 场景1:完整的Web应用启动
> const express = require('express');
> const app = express();
>
> // 中间件
> app.use(express.json());
> app.use(express.static('public'));
>
> // 路由
> app.get('/api/health', (req, res) => {
>   res.json({ status: 'ok', uptime: process.uptime() });
> });
>
> // 错误处理
> app.use((err, req, res, next) => {
>   console.error(err.stack);
>   res.status(500).json({ error: 'Internal Server Error' });
> });
>
> // 启动
> const PORT = process.env.PORT || 3000;
> app.listen(PORT, '0.0.0.0', () => {
>   console.log(`Server running on http://0.0.0.0:${PORT}`);
> });
>
> // 场景2:使用nodemon开发
> // package.json中添加:
> // {
> //   "scripts": {
> //     "dev": "nodemon app.js",
> //     "start": "node app.js"
> //   }
> // }
>
> // 场景3:Docker部署
> const app = express();
> const PORT = parseInt(process.env.PORT || '3000');
>
> app.get('/', (req, res) => {
>   res.send(`Hello from container on port ${PORT}`);
> });
>
> app.listen(PORT, '0.0.0.0');  // Docker需要监听0.0.0.0
> ```

## 2. 路由 (Routing)

### 2.1 基本路由

```javascript
const express = require('express');
const app = express();

// GET 请求
app.get('/', (req, res) => {
  res.send('GET 请求');
});

// POST 请求
app.post('/users', (req, res) => {
  res.send('创建用户');
});

// PUT 请求
app.put('/users/:id', (req, res) => {
  res.send(`更新用户 ${req.params.id}`);
});

// DELETE 请求
app.delete('/users/:id', (req, res) => {
  res.send(`删除用户 ${req.params.id}`);
});

// 多个 HTTP 方法
app.all('/secret', (req, res) => {
  res.send('访问秘密区域');
});

app.listen(3000);
```

### 2.2 路由参数

```javascript
// 路径参数
app.get('/users/:userId/books/:bookId', (req, res) => {
  console.log(req.params); // { userId: '123', bookId: '456' }
  res.send(`用户 ${req.params.userId} 的书籍 ${req.params.bookId}`);
});

// 可选参数
app.get('/flights/:from-:to?', (req, res) => {
  console.log(req.params); // { from: 'LAX', to: 'SFO' }
  res.send(req.params);
});

// 正则表达式
app.get('/user/:id(\\d+)', (req, res) => {
  res.send(`用户 ID: ${req.params.id}`);
});
```

### 2.3 查询参数

```javascript
// GET /search?q=keyword&page=2
app.get('/search', (req, res) => {
  console.log(req.query); // { q: 'keyword', page: '2' }
  const { q, page = 1 } = req.query;
  res.send(`搜索: ${q}, 页码: ${page}`);
});
```

### 2.4 路由路径模式

```javascript
// 字符串路径
app.get('/about', (req, res) => {
  res.send('关于页面');
});

// 字符串模式（通配符）
app.get('/ab?cd', (req, res) => {
  // 匹配 acd, abcd
  res.send('ab?cd');
});

app.get('/ab+cd', (req, res) => {
  // 匹配 abcd, abbcd, abbbcd 等
  res.send('ab+cd');
});

app.get('/ab*cd', (req, res) => {
  // 匹配 abcd, abxcd, abRANDOMcd 等
  res.send('ab*cd');
});

// 正则表达式
app.get(/.*fly$/, (req, res) => {
  // 匹配以 fly 结尾的路径
  res.send('/.*fly$/');
});
```

### 2.5 路由链

```javascript
app.route('/book')
  .get((req, res) => {
    res.send('获取书籍列表');
  })
  .post((req, res) => {
    res.send('添加书籍');
  })
  .put((req, res) => {
    res.send('更新书籍');
  });
```

### 2.6 模块化路由

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

// 中间件（仅对此路由生效）
router.use((req, res, next) => {
  console.log('时间:', Date.now());
  next();
});

// 定义路由
router.get('/', (req, res) => {
  res.send('用户列表');
});

router.get('/:id', (req, res) => {
  res.send(`用户 ${req.params.id}`);
});

router.post('/', (req, res) => {
  res.send('创建用户');
});

module.exports = router;
```

```javascript
// app.js
const express = require('express');
const usersRouter = require('./routes/users');

const app = express();

// 使用路由模块
app.use('/users', usersRouter);
// 现在可以访问: /users, /users/:id 等

app.listen(3000);
```

## 3. 中间件 (Middleware)

中间件是 Express 的核心概念，它是一个函数，可以访问请求对象 (req)、响应对象 (res) 和下一个中间件函数 (next)。

> 💡 **常见面试问法：Express 中间件的执行顺序是怎样的？**
> - 中间件按**注册顺序**（`app.use` / `app.METHOD` 书写的先后）自上而下执行，所以注册顺序很重要：解析请求体的 `express.json()`、日志、CORS 等要放在路由**之前**；404 处理和错误处理中间件要放在所有路由**之后**。
> - 每个中间件必须调用 `next()` 把控制权交给下一个，否则请求会一直挂起直到超时；一旦发送了响应（如 `res.send()`），就不要再调用 `next()`。
> - 错误处理中间件有**固定 4 个参数** `(err, req, res, next)`，Express 靠参数个数识别它，少一个参数都不会被当作错误处理器。
> - 异步中间件里 `await` 抛出的错误，需要 `try/catch` 后用 `next(err)` 手动传递（Express 4 不会自动捕获 Promise reject；Express 5 才支持）。

### 3.1 应用级中间件

```javascript
const express = require('express');
const app = express();

// 无挂载路径的中间件（每个请求都执行）
app.use((req, res, next) => {
  console.log('请求时间:', new Date().toISOString());
  next(); // 传递给下一个中间件
});

// 挂载在特定路径的中间件
app.use('/user/:id', (req, res, next) => {
  console.log('请求类型:', req.method);
  next();
});

// 路由和中间件链
app.get('/user/:id',
  (req, res, next) => {
    console.log('ID:', req.params.id);
    next();
  },
  (req, res, next) => {
    res.send('用户信息');
  }
);

app.listen(3000);
```

### 3.2 路由级中间件

```javascript
const express = require('express');
const router = express.Router();

// 路由级中间件
router.use((req, res, next) => {
  console.log('路由中间件');
  next();
});

router.get('/users', (req, res) => {
  res.send('用户列表');
});

module.exports = router;
```

### 3.3 错误处理中间件

```javascript
// 错误处理中间件（4 个参数）
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      message: err.message,
      status: 500
    }
  });
});

// 抛出错误示例
app.get('/error', (req, res, next) => {
  const error = new Error('发生了一个错误');
  error.status = 400;
  next(error); // 传递错误到错误处理中间件
});
```

### 3.4 内置中间件

```javascript
const express = require('express');
const app = express();

// 解析 JSON 请求体
app.use(express.json());

// 解析 URL 编码的请求体
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static('public'));

// 多个静态文件目录
app.use(express.static('public'));
app.use(express.static('files'));

// 虚拟路径前缀
app.use('/static', express.static('public'));
// 现在可以访问: /static/images/logo.png
```

### 3.5 第三方中间件

```bash
# 安装常用中间件
npm install morgan cookie-parser compression cors helmet
```

```javascript
const express = require('express');
const morgan = require('morgan');        // 日志
const cookieParser = require('cookie-parser'); // Cookie
const compression = require('compression');    // 压缩
const cors = require('cors');           // CORS
const helmet = require('helmet');       // 安全

const app = express();

// HTTP 请求日志
app.use(morgan('combined'));

// Cookie 解析
app.use(cookieParser());

// Gzip 压缩
app.use(compression());

// 启用 CORS
app.use(cors());

// 安全HTTP头
app.use(helmet());

app.listen(3000);
```

### 3.6 自定义中间件

```javascript
// 身份验证中间件
function requireAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: '未授权' });
  }

  // 验证 token（示例）
  if (token === 'valid-token') {
    req.user = { id: 1, name: 'John' };
    next();
  } else {
    return res.status(403).json({ error: '无效的令牌' });
  }
}

// 使用中间件
app.get('/profile', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// 日志中间件
function logger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });

  next();
}

app.use(logger);
```

## 4. 请求和响应

### 4.1 Request 对象

```javascript
app.get('/info', (req, res) => {
  // 路径参数
  console.log(req.params);

  // 查询参数
  console.log(req.query);

  // 请求体
  console.log(req.body);

  // 请求头
  console.log(req.headers);
  console.log(req.get('Content-Type'));

  // HTTP 方法
  console.log(req.method);

  // 请求路径
  console.log(req.path);       // /info
  console.log(req.originalUrl); // /info?page=1

  // 协议
  console.log(req.protocol);   // http 或 https

  // 主机名
  console.log(req.hostname);

  // IP 地址
  console.log(req.ip);

  // Cookie
  console.log(req.cookies);

  // 检查请求类型
  console.log(req.is('json'));  // true/false
  console.log(req.is('html'));

  res.send('信息已记录');
});
```

### 4.2 Response 对象

```javascript
app.get('/response-examples', (req, res) => {
  // 发送文本
  // res.send('Hello World');

  // 发送 JSON
  // res.json({ message: 'Success', data: [] });

  // 发送状态码
  // res.sendStatus(404); // 等同于 res.status(404).send('Not Found')

  // 设置状态码
  // res.status(201).json({ created: true });

  // 重定向
  // res.redirect('/new-location');
  // res.redirect(301, 'https://example.com');

  // 发送文件
  // res.sendFile('/path/to/file.pdf');

  // 下载文件
  // res.download('/path/to/file.pdf', 'custom-name.pdf');

  // 设置响应头
  // res.set('Content-Type', 'text/plain');
  // res.set({
  //   'Content-Type': 'text/plain',
  //   'X-Custom-Header': 'value'
  // });

  // Cookie
  // res.cookie('name', 'value', { maxAge: 900000, httpOnly: true });
  // res.clearCookie('name');

  // 结束响应
  res.end();
});
```

### 4.3 响应类型示例

```javascript
// JSON 响应
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
  });
});

// HTML 响应
app.get('/page', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>页面</title></head>
      <body><h1>Hello</h1></body>
    </html>
  `);
});

// 文件下载
app.get('/download', (req, res) => {
  const file = `${__dirname}/files/document.pdf`;
  res.download(file, 'my-document.pdf', (err) => {
    if (err) {
      console.error('下载失败:', err);
    }
  });
});

// 流式响应
app.get('/stream', (req, res) => {
  const fs = require('fs');
  const stream = fs.createReadStream('large-file.txt');
  stream.pipe(res);
});
```

## 5. 模板引擎

### 5.1 配置 EJS

```bash
npm install ejs
```

```javascript
const express = require('express');
const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');

// 设置模板目录（默认是 views）
app.set('views', './views');

// 渲染模板
app.get('/', (req, res) => {
  res.render('index', {
    title: '首页',
    message: 'Hello from EJS!',
    users: ['Alice', 'Bob', 'Charlie']
  });
});

app.listen(3000);
```

```ejs
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1><%= message %></h1>

  <ul>
    <% users.forEach(user => { %>
      <li><%= user %></li>
    <% }); %>
  </ul>
</body>
</html>
```

### 5.2 配置 Pug

```bash
npm install pug
```

```javascript
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Hey',
    message: 'Hello from Pug!'
  });
});
```

```pug
//- views/index.pug
html
  head
    title= title
  body
    h1= message
```

## 6. 实战案例

### 案例 1: RESTful API

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// 模拟数据库
let todos = [
  { id: 1, title: '学习 Express', completed: false },
  { id: 2, title: '构建 API', completed: false }
];

let nextId = 3;

// 获取所有待办事项
app.get('/api/todos', (req, res) => {
  res.json({ success: true, data: todos });
});

// 获取单个待办事项
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({ success: false, error: '未找到' });
  }

  res.json({ success: true, data: todo });
});

// 创建待办事项
app.post('/api/todos', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, error: '标题是必需的' });
  }

  const newTodo = {
    id: nextId++,
    title,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json({ success: true, data: newTodo });
});

// 更新待办事项
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({ success: false, error: '未找到' });
  }

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json({ success: true, data: todo });
});

// 删除待办事项
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, error: '未找到' });
  }

  todos.splice(index, 1);
  res.json({ success: true, message: '已删除' });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ success: false, error: '路由不存在' });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: '服务器错误' });
});

app.listen(3000, () => {
  console.log('API 服务器运行在 http://localhost:3000/');
});
```

### 案例 2: 用户认证系统

```bash
npm install bcrypt jsonwebtoken
```

```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'your-secret-key';
const users = []; // 模拟用户数据库

// 注册
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 验证输入
    if (!username || !password) {
      return res.status(400).json({ error: '用户名和密码是必需的' });
    }

    // 检查用户是否已存在
    if (users.find(u => u.username === username)) {
      return res.status(409).json({ error: '用户已存在' });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const user = {
      id: users.length + 1,
      username,
      password: hashedPassword
    };

    users.push(user);

    res.status(201).json({
      success: true,
      message: '注册成功',
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    res.status(500).json({ error: '服务器错误' });
  }
});

// 登录
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用户
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    // 验证密码
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    // 生成 JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    res.status(500).json({ error: '服务器错误' });
  }
});

// 认证中间件
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '未提供令牌' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: '无效的令牌' });
    }

    req.user = user;
    next();
  });
}

// 受保护的路由
app.get('/api/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ error: '用户不存在' });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username
    }
  });
});

app.listen(3000, () => {
  console.log('认证服务器运行在 http://localhost:3000/');
});
```

### 案例 3: 文件上传

```bash
npm install multer
```

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// 确保上传目录存在
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 配置存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 文件过滤
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('只允许上传图片和 PDF 文件'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// 上传表单页面
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>文件上传</title></head>
    <body>
      <h1>单文件上传</h1>
      <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="avatar" />
        <button type="submit">上传</button>
      </form>

      <h1>多文件上传</h1>
      <form action="/upload-multiple" method="POST" enctype="multipart/form-data">
        <input type="file" name="photos" multiple />
        <button type="submit">上传</button>
      </form>
    </body>
    </html>
  `);
});

// 单文件上传
app.post('/upload', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: '请选择文件' });
  }

  res.json({
    success: true,
    message: '文件上传成功',
    file: {
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      path: req.file.path
    }
  });
});

// 多文件上传
app.post('/upload-multiple', upload.array('photos', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: '请选择文件' });
  }

  const files = req.files.map(file => ({
    originalName: file.originalname,
    filename: file.filename,
    size: file.size
  }));

  res.json({
    success: true,
    message: `成功上传 ${req.files.length} 个文件`,
    files
  });
});

// 错误处理
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: '文件太大' });
    }
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log('文件上传服务器运行在 http://localhost:3000/');
});
```

### 案例 4: 完整的 MVC 应用

项目结构:

```
app/
├── config/
│   └── database.js
├── controllers/
│   └── userController.js
├── models/
│   └── User.js
├── routes/
│   └── users.js
├── middlewares/
│   └── auth.js
├── views/
│   └── users/
│       ├── index.ejs
│       └── show.ejs
├── public/
│   ├── css/
│   └── js/
├── app.js
└── package.json
```

```javascript
// app.js
const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users');

const app = express();

// 视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/users', usersRouter);

// 首页
app.get('/', (req, res) => {
  res.render('index', { title: 'Express MVC' });
});

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: '页面未找到' });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: '服务器错误',
    error: err.message
  });
});

module.exports = app;
```

```javascript
// models/User.js
class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
  }

  static findAll() {
    // 这里应该是数据库查询
    return [
      new User({ id: 1, name: 'Alice', email: 'alice@example.com' }),
      new User({ id: 2, name: 'Bob', email: 'bob@example.com' })
    ];
  }

  static findById(id) {
    const users = this.findAll();
    return users.find(u => u.id === parseInt(id));
  }

  save() {
    // 保存到数据库
    return this;
  }
}

module.exports = User;
```

```javascript
// controllers/userController.js
const User = require('../models/User');

// 获取所有用户
exports.index = (req, res) => {
  const users = User.findAll();
  res.render('users/index', { title: '用户列表', users });
};

// 显示单个用户
exports.show = (req, res) => {
  const user = User.findById(req.params.id);

  if (!user) {
    return res.status(404).render('404', { title: '用户未找到' });
  }

  res.render('users/show', { title: '用户详情', user });
};

// 创建用户
exports.create = (req, res) => {
  const user = new User(req.body);
  user.save();

  res.redirect('/users');
};
```

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.create);

module.exports = router;
```

## 7. 性能优化

### 7.1 启用压缩

```bash
npm install compression
```

```javascript
const compression = require('compression');

app.use(compression());
```

### 7.2 缓存

```javascript
// 设置静态文件缓存
app.use(express.static('public', {
  maxAge: '1d', // 1 天
  etag: true
}));

// 自定义缓存
app.get('/api/data', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300'); // 5 分钟
  res.json({ data: 'cached data' });
});
```

### 7.3 集群模式

```javascript
const cluster = require('cluster');
const os = require('os');
const express = require('express');

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;

  console.log(`主进程 ${process.pid} 正在运行`);
  console.log(`启动 ${cpuCount} 个工作进程`);

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
    cluster.fork(); // 重启工作进程
  });
} else {
  const app = express();

  app.get('/', (req, res) => {
    res.send(`由进程 ${process.pid} 处理`);
  });

  app.listen(3000, () => {
    console.log(`工作进程 ${process.pid} 已启动`);
  });
}
```

## 8. 安全最佳实践

```bash
npm install helmet express-rate-limit express-validator
```

```javascript
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const app = express();

// 安全HTTP头
app.use(helmet());

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 最多 100 个请求
  message: '请求过于频繁，请稍后再试'
});

app.use('/api/', limiter);

// 输入验证
app.post('/api/users',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 处理请求
    res.json({ message: '用户已创建' });
  }
);

app.listen(3000);
```

## 9. 总结

### 核心要点

1. **Express 是轻量级框架**: 核心简洁，通过中间件扩展功能
2. **中间件是核心**: 理解中间件的执行顺序和使用场景
3. **路由系统强大**: 支持参数、正则、模块化
4. **丰富的生态**: 大量第三方中间件可用
5. **易于扩展**: 可以构建从简单 API 到复杂应用

### 常用中间件

- `body-parser` / `express.json()`: 解析请求体
- `morgan`: HTTP 请求日志
- `helmet`: 安全HTTP头
- `cors`: 跨域资源共享
- `compression`: Gzip 压缩
- `multer`: 文件上传
- `express-validator`: 输入验证
- `express-session`: 会话管理
- `passport`: 认证

### 进阶学习

- GraphQL API (使用 express-graphql)
- WebSocket 集成 (使用 ws 或 socket.io)
- 微服务架构
- 服务器端渲染 (SSR)
- API 文档生成 (Swagger)
