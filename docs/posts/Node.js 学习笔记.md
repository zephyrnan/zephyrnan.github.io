---
title: Node.js 学习笔记
date: 2025-11-20
categories:
  - 后端开发
tags:
  - Node.js
---

# Node.js 学习笔记

[Node.js 官方文档](https://nodejs.org/zh-cn/docs/)

## 一、Node.js 简介

### 1. Node.js 是什么

- **Node.js** 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境
- Node.js 使用事件驱动、非阻塞 I/O 模型，使其轻量又高效
- Node.js 让 JavaScript 可以在服务器端运行，实现了前后端统一的开发语言

> 💡 **理解要点**：
> - **运行时环境**：Node.js 不是一门语言，也不是框架，而是 JavaScript 的运行时环境
> - **V8 引擎**：与 Chrome 浏览器使用相同的 JavaScript 引擎，性能强大
> - **事件驱动**：通过事件循环机制处理并发请求
> - **非阻塞 I/O**：异步处理 I/O 操作，不会阻塞代码执行
> - **单线程**：主线程是单线程的，但可以通过 Worker Threads 实现多线程

### 2. Node.js 的组成

**Node.js = V8 引擎 + 内置模块 + 第三方模块**

- **V8 引擎**：执行 JavaScript 代码的核心
  - 将 JavaScript 代码编译成机器码
  - 提供垃圾回收、内存管理等功能

- **内置模块**：Node.js 提供的核心 API
  - fs（文件系统）、http（网络服务）、path（路径处理）等
  - 无需安装，直接通过 require 引入使用

- **第三方模块**：通过 npm 安装的外部包
  - Express、Koa、Socket.io 等流行框架
  - 丰富的生态系统，满足各种开发需求

### 3. Node.js 的特点

- **异步 I/O**：非阻塞式 I/O，提高程序性能
- **事件驱动**：基于事件循环机制处理并发
- **单线程**：避免了多线程的上下文切换开销
- **跨平台**：支持 Windows、Linux、macOS
- **高性能**：V8 引擎的即时编译技术
- **NPM 生态**：世界上最大的开源库生态系统

### 4. Node.js 的应用场景

**适合的场景**

- I/O 密集型应用（文件操作、数据库操作）
- 实时应用（聊天室、在线游戏）
- RESTful API 服务
- 前端构建工具（Webpack、Vite）
- 服务器端渲染（SSR）
- 微服务架构

**不适合的场景**

- CPU 密集型应用（复杂计算、图像处理）
  - 单线程会导致阻塞
  - 可以考虑使用 Worker Threads 或其他语言

### 5. 安装和使用

**安装 Node.js**

1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 LTS（长期支持）版本
3. 安装完成后验证：

```bash
node -v      # 查看 Node.js 版本
npm -v       # 查看 npm 版本
```

**运行 Node.js 程序**

```bash
# 交互式模式（REPL）
node

# 执行 JavaScript 文件
node app.js

# 执行代码
node -e "console.log('Hello Node.js')"
```

## 二、模块系统

### 1. 模块的概念

> 💡 **模块化的重要性**：
> - **代码复用**：将常用功能封装成模块，避免重复编写
> - **命名空间**：每个模块有独立的作用域，避免命名冲突
> - **依赖管理**：明确模块之间的依赖关系
> - **可维护性**：模块化使代码结构更清晰，易于维护

Node.js 中的模块分为三类：

- **内置模块**：Node.js 官方提供的模块（如 fs、http、path）
- **自定义模块**：用户自己创建的模块
- **第三方模块**：通过 npm 安装的模块

### 2. CommonJS 规范

Node.js 使用 CommonJS 模块规范

**导出模块**

```js
// math.js

// 方式1：exports 导出
exports.add = function(a, b) {  // exports是module.exports的引用,通过点语法添加属性
    return a + b;  // 导出的函数可以在其他模块中通过require引入使用
};

exports.subtract = function(a, b) {  // 可以多次使用exports添加多个导出
    return a - b;
};

// 方式2：module.exports 导出（推荐）
module.exports = {  // 直接给module.exports赋值一个对象
    add: (a, b) => a + b,  // 使用ES6箭头函数简写
    subtract: (a, b) => a - b,  // 所有属性都会被导出
    multiply: (a, b) => a * b  // 这种方式更清晰,一次性导出所有接口
};

// 导出单个函数
module.exports = function(a, b) {  // 直接导出一个函数,而不是对象
    return a + b;  // 导入时得到的就是这个函数本身
};

// 导出类
module.exports = class Calculator {  // 导出一个类定义
    add(a, b) {  // 类的方法
        return a + b;  // 导入后可以new这个类来创建实例
    }
};
```

> 📊 **运行效果**:
> ```javascript
> // 方式1的导出结果
> // module.exports = { add: [Function], subtract: [Function] }
>
> // 方式2的导出结果
> // module.exports = { add: [Function], subtract: [Function], multiply: [Function] }
>
> // 导出单个函数的结果
> // module.exports = [Function]
>
> // 导出类的结果
> // module.exports = [class Calculator]
> ```
>
> ⚠️ **注意事项**:
> - **方式选择**: 推荐使用`module.exports = {}`统一导出,避免混用exports和module.exports
> - **覆盖问题**: `module.exports = xxx`会覆盖之前所有的导出,包括exports添加的属性
> - **引用断开**: 直接给exports赋值(`exports = {}`)会断开与module.exports的引用,导出失败
> - **单次导出**: 一个模块中多次使用`module.exports = xxx`会相互覆盖,只有最后一次生效
> - **导出时机**: 导出语句的执行顺序很重要,后面的赋值会覆盖前面的
>
> ```javascript
> // 常见错误:混用exports和module.exports
> exports.add = () => {};
> module.exports = { subtract: () => {} };  // ❌ add丢失,只导出subtract
>
> // 正确做法:统一使用module.exports
> module.exports = {
>   add: () => {},
>   subtract: () => {}
> };  // ✅ 两个函数都被导出
>
> // 常见错误:给exports直接赋值
> exports = { add: () => {} };  // ❌ 断开引用,导出失败
>
> // 正确做法:使用点语法或module.exports
> exports.add = () => {};  // ✅ 正确
> module.exports = { add: () => {} };  // ✅ 正确
>
> // 常见错误:多次覆盖导出
> module.exports = { add: () => {} };
> module.exports = { subtract: () => {} };  // ❌ add丢失
>
> // 正确做法:一次性导出所有内容
> module.exports = {
>   add: () => {},
>   subtract: () => {}
> };  // ✅ 所有函数都导出
> ```
>
> 🎯 **实际应用场景**:
> ```javascript
> // 场景1:工具函数库导出
> // utils/format.js
> module.exports = {
>   formatDate: (date) => date.toISOString().split('T')[0],
>   formatCurrency: (amount) => `¥${amount.toFixed(2)}`,
>   formatPhone: (phone) => phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
> };
>
> // 使用
> const { formatDate, formatCurrency } = require('./utils/format');
> console.log(formatDate(new Date()));  // "2025-07-23"
> console.log(formatCurrency(99.99));   // "¥99.99"
>
> // 场景2:配置文件导出
> // config/database.js
> module.exports = {
>   development: {
>     host: 'localhost',
>     port: 3306,
>     database: 'dev_db'
>   },
>   production: {
>     host: process.env.DB_HOST,
>     port: process.env.DB_PORT,
>     database: process.env.DB_NAME
>   }
> };
>
> // 使用
> const dbConfig = require('./config/database');
> const config = dbConfig[process.env.NODE_ENV || 'development'];
>
> // 场景3:中间件导出(Express)
> // middlewares/auth.js
> module.exports = function(req, res, next) {
>   const token = req.headers.authorization;
>   if (!token) {
>     return res.status(401).json({ error: 'No token provided' });
>   }
>   // 验证token...
>   next();
> };
>
> // 使用
> const auth = require('./middlewares/auth');
> app.use('/api', auth);
>
> // 场景4:类导出(数据模型)
> // models/User.js
> module.exports = class User {
>   constructor(name, email) {
>     this.name = name;
>     this.email = email;
>     this.createdAt = new Date();
>   }
>
>   save() {
>     // 保存到数据库...
>   }
>
>   static findById(id) {
>     // 从数据库查询...
>   }
> };
>
> // 使用
> const User = require('./models/User');
> const user = new User('张三', 'zhangsan@example.com');
> user.save();
>
> // 场景5:单例模式导出(数据库连接)
> // db/connection.js
> const mysql = require('mysql');
> const pool = mysql.createPool({
>   host: 'localhost',
>   user: 'root',
>   password: 'password',
>   database: 'mydb'
> });
>
> module.exports = pool;  // 导出连接池实例
>
> // 使用(多处require得到同一个实例)
> const db = require('./db/connection');
> db.query('SELECT * FROM users', (err, results) => {
>   // 处理结果...
> });
> ```

**导入模块**

```js
// app.js

// 导入内置模块
const fs = require('fs');  // require返回模块导出的内容,内置模块无需路径
const path = require('path');  // Node.js会自动从核心模块中查找

// 导入自定义模块
const math = require('./math');  // 相对路径,./表示当前目录,require会自动添加.js扩展名
const utils = require('./utils/index');  // 可以省略 index.js,Node.js会自动查找index.js

// 导入第三方模块
const express = require('express');  // 从node_modules目录查找,无需路径前缀
const axios = require('axios');  // 第三方模块需要先通过npm install安装

// 使用模块
console.log(math.add(1, 2));  // 3,调用导入模块的方法
```

> 📊 **运行效果**:
> ```javascript
> // 内置模块导入
> // fs = { readFile: [Function], writeFile: [Function], ... }
> // path = { join: [Function], resolve: [Function], ... }
>
> // 自定义模块导入
> // math = { add: [Function], subtract: [Function], multiply: [Function] }
>
> // 第三方模块导入
> // express = [Function: createApplication]
> // axios = { get: [Function], post: [Function], ... }
>
> // 调用结果
> // 输出: 3
> ```
>
> ⚠️ **注意事项**:
> - **路径前缀**: 自定义模块必须使用`./`或`../`开头,否则会被当作第三方模块查找
> - **扩展名省略**: require会按`.js` → `.json` → `.node`顺序自动查找扩展名
> - **模块缓存**: require的模块会被缓存,多次require同一模块只执行一次
> - **同步加载**: require是同步的,会阻塞代码执行,直到模块加载完成
> - **循环依赖**: 两个模块相互引用会导致循环依赖,需要重构代码避免
> - **路径解析**: require会从当前目录开始查找,逐级向上查找node_modules目录
>
> ```javascript
> // 常见错误:忘记路径前缀
> const math = require('math');  // ❌ 会从node_modules查找,找不到
>
> // 正确做法:添加相对路径
> const math = require('./math');  // ✅ 从当前目录查找
>
> // 常见错误:路径写错
> const utils = require('./util');  // ❌ 如果文件名是utils.js会找不到
>
> // 正确做法:确认文件名
> const utils = require('./utils');  // ✅ 文件名必须匹配
>
> // 常见错误:第三方模块未安装
> const express = require('express');  // ❌ 如果未npm install会报错
>
> // 正确做法:先安装再使用
> // npm install express
> const express = require('express');  // ✅ 安装后可以导入
>
> // 解构导入
> const { readFile, writeFile } = require('fs');  // ✅ 只导入需要的方法
>
> // 导入并重命名
> const myMath = require('./math');  // ✅ 可以自定义变量名
>
> // 条件导入(动态require)
> let db;
> if (process.env.NODE_ENV === 'production') {
>   db = require('./db-prod');  // ✅ 根据环境加载不同模块
> } else {
>   db = require('./db-dev');
> }
> ```
>
> 🎯 **实际应用场景**:
> ```javascript
> // 场景1:Express应用入口文件
> // app.js
> const express = require('express');  // Web框架
> const bodyParser = require('body-parser');  // 请求体解析
> const cors = require('cors');  // 跨域中间件
> const routes = require('./routes');  // 自定义路由模块
> const config = require('./config');  // 配置文件
>
> const app = express();
> app.use(bodyParser.json());
> app.use(cors());
> app.use('/api', routes);
>
> app.listen(config.port, () => {
>   console.log(`Server running on port ${config.port}`);
> });
>
> // 场景2:工具函数按需导入
> // controller.js
> const { formatDate, formatCurrency } = require('./utils/format');
> const { validateEmail, validatePhone } = require('./utils/validation');
>
> function createUser(req, res) {
>   const { name, email, phone } = req.body;
>
>   if (!validateEmail(email)) {
>     return res.status(400).json({ error: 'Invalid email' });
>   }
>
>   if (!validatePhone(phone)) {
>     return res.status(400).json({ error: 'Invalid phone' });
>   }
>
>   // 创建用户...
> }
>
> // 场景3:数据库连接模块
> // services/userService.js
> const db = require('../db/connection');  // 向上查找目录
> const User = require('../models/User');  // 用户模型
>
> class UserService {
>   async findAll() {
>     return await db.query('SELECT * FROM users');
>   }
>
>   async create(userData) {
>     const user = new User(userData);
>     return await user.save();
>   }
> }
>
> module.exports = new UserService();
>
> // 场景4:环境配置动态加载
> // config/index.js
> const env = process.env.NODE_ENV || 'development';
> const config = require(`./${env}`);  // 动态路径拼接
>
> module.exports = config;
>
> // config/development.js
> module.exports = {
>   port: 3000,
>   database: 'mongodb://localhost:27017/dev'
> };
>
> // config/production.js
> module.exports = {
>   port: process.env.PORT,
>   database: process.env.DATABASE_URL
> };
>
> // 场景5:路由模块化
> // routes/index.js
> const express = require('express');
> const router = express.Router();
>
> const userRoutes = require('./users');  // 用户路由
> const postRoutes = require('./posts');  // 文章路由
> const authRoutes = require('./auth');   // 认证路由
>
> router.use('/users', userRoutes);
> router.use('/posts', postRoutes);
> router.use('/auth', authRoutes);
>
> module.exports = router;
>
> // app.js中使用
> const routes = require('./routes');
> app.use('/api', routes);
> ```

**exports 和 module.exports 的区别**

```js
// exports 是 module.exports 的引用
console.log(exports === module.exports);  // true

// exports 只能通过点语法添加属性
exports.name = '张三';  // ✓

// 不能直接给 exports 赋值（会断开引用）
exports = { name: '张三' };  // ✗ 无效

// module.exports 可以直接赋值
module.exports = { name: '张三' };  // ✓

// 最终导出的是 module.exports
```

### 3. ES Module（ESM）

Node.js 从 v12 开始支持 ES Module

**启用 ES Module**

```json
// package.json
{
    "type": "module"
}
```

**导出模块**

```js
// math.mjs 或在 package.json 中设置 "type": "module"

// 具名导出
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// 批量导出
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
export { multiply, divide };

// 默认导出
export default class Calculator {
    add(a, b) {
        return a + b;
    }
}
```

**导入模块**

```js
// 导入具名导出
import { add, subtract } from './math.mjs';

// 导入全部
import * as math from './math.mjs';

// 导入默认导出
import Calculator from './math.mjs';

// 混合导入
import Calculator, { add, subtract } from './math.mjs';
```

**CommonJS vs ES Module**

| 特性 | CommonJS | ES Module |
|------|----------|-----------|
| 语法 | require/module.exports | import/export |
| 加载方式 | 同步加载 | 异步加载 |
| 加载时机 | 运行时加载 | 编译时加载 |
| 值拷贝 | 是（值的拷贝） | 否（值的引用） |
| 动态导入 | 支持 | 支持（import()） |
| 顶层 this | 指向当前模块 | undefined |
| 浏览器支持 | 不支持 | 原生支持 |

### 4. 模块加载机制

```js
// Node.js 模块加载优先级：
// 1. 缓存的模块
// 2. 内置模块
// 3. 文件模块（相对/绝对路径）
// 4. 第三方模块（node_modules）

// 模块会被缓存
const math1 = require('./math');
const math2 = require('./math');
console.log(math1 === math2);  // true（同一个对象）

// 查看模块缓存
console.log(require.cache);

// 清除缓存
delete require.cache[require.resolve('./math')];
```

## 三、核心内置模块

### 1. path 模块（路径处理）

```js
const path = require('path');

// 路径拼接（推荐使用，自动处理分隔符）
path.join('/foo', 'bar', 'baz');          // '/foo/bar/baz'
path.join('/foo', './bar', 'baz');        // '/foo/bar/baz'
path.join('/foo', '../bar', 'baz');       // '/bar/baz'

// 路径解析（解析为绝对路径）
path.resolve('foo', 'bar');               // '/当前目录/foo/bar'
path.resolve('/foo', 'bar');              // '/foo/bar'
path.resolve('/foo', '/bar');             // '/bar'（后面的绝对路径会覆盖）

// 获取文件名
path.basename('/foo/bar/file.txt');       // 'file.txt'
path.basename('/foo/bar/file.txt', '.txt');  // 'file'

// 获取目录名
path.dirname('/foo/bar/baz.txt');         // '/foo/bar'

// 获取扩展名
path.extname('index.html');               // '.html'
path.extname('index.');                   // '.'
path.extname('index');                    // ''

// 格式化路径
path.format({
    dir: '/home/user',
    base: 'file.txt'
});  // '/home/user/file.txt'

// 解析路径
path.parse('/home/user/file.txt');
// {
//     root: '/',
//     dir: '/home/user',
//     base: 'file.txt',
//     ext: '.txt',
//     name: 'file'
// }

// 路径分隔符
console.log(path.sep);        // Windows: '\', POSIX: '/'
console.log(path.delimiter);  // Windows: ';', POSIX: ':'

// 常用全局变量
console.log(__filename);  // 当前文件的绝对路径
console.log(__dirname);   // 当前文件所在目录的绝对路径
```

### 2. fs 模块（文件系统）

> 💡 **同步 vs 异步**：
> - **异步方法**：不会阻塞代码执行，推荐在生产环境使用
> - **同步方法**：会阻塞代码执行，方法名以 `Sync` 结尾
> - **Promise 方法**：返回 Promise，可以使用 async/await

**读取文件**

```js
const fs = require('fs');

// 异步读取（回调方式）
fs.readFile('./file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('读取失败:', err);
        return;
    }
    console.log(data);
});

// 同步读取
try {
    const data = fs.readFileSync('./file.txt', 'utf8');
    console.log(data);
} catch (err) {
    console.error('读取失败:', err);
}

// Promise 方式（Node.js 10+）
const fsPromises = require('fs').promises;

fsPromises.readFile('./file.txt', 'utf8')
    .then(data => console.log(data))
    .catch(err => console.error(err));

// async/await 方式
async function readFile() {
    try {
        const data = await fsPromises.readFile('./file.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}
```

**写入文件**

```js
// 写入文件（覆盖）
fs.writeFile('./file.txt', 'Hello World', 'utf8', (err) => {
    if (err) throw err;
    console.log('写入成功');
});

// 同步写入
fs.writeFileSync('./file.txt', 'Hello World', 'utf8');

// 追加内容
fs.appendFile('./file.txt', '\n新内容', (err) => {
    if (err) throw err;
    console.log('追加成功');
});

// 流式写入（大文件）
const writeStream = fs.createWriteStream('./file.txt');
writeStream.write('第一行\n');
writeStream.write('第二行\n');
writeStream.end('最后一行\n');
```

**文件/目录操作**

```js
// 检查文件是否存在
fs.existsSync('./file.txt');  // true/false

// 获取文件信息
fs.stat('./file.txt', (err, stats) => {
    console.log(stats.isFile());       // 是否是文件
    console.log(stats.isDirectory());  // 是否是目录
    console.log(stats.size);           // 文件大小（字节）
    console.log(stats.mtime);          // 修改时间
});

// 重命名/移动文件
fs.rename('./old.txt', './new.txt', (err) => {
    if (err) throw err;
    console.log('重命名成功');
});

// 删除文件
fs.unlink('./file.txt', (err) => {
    if (err) throw err;
    console.log('删除成功');
});

// 创建目录
fs.mkdir('./mydir', { recursive: true }, (err) => {
    if (err) throw err;
    console.log('目录创建成功');
});

// 读取目录
fs.readdir('./', (err, files) => {
    if (err) throw err;
    console.log(files);  // 文件名数组
});

// 删除目录
fs.rmdir('./mydir', { recursive: true }, (err) => {
    if (err) throw err;
    console.log('目录删除成功');
});
```

**文件流**

```js
// 读取流（适合大文件）
const readStream = fs.createReadStream('./large-file.txt', {
    encoding: 'utf8',
    highWaterMark: 64 * 1024  // 缓冲区大小 64KB
});

readStream.on('data', (chunk) => {
    console.log('读取到数据块:', chunk.length);
});

readStream.on('end', () => {
    console.log('读取完成');
});

readStream.on('error', (err) => {
    console.error('读取错误:', err);
});

// 管道（pipe）- 复制文件
const readStream = fs.createReadStream('./source.txt');
const writeStream = fs.createWriteStream('./dest.txt');
readStream.pipe(writeStream);

writeStream.on('finish', () => {
    console.log('复制完成');
});
```

### 3. http 模块（网络服务）

**创建 HTTP 服务器**

```js
const http = require('http');

// 创建服务器
const server = http.createServer((req, res) => {
    // req: 请求对象
    // res: 响应对象

    // 设置响应头
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // 发送响应
    res.write('<h1>Hello Node.js</h1>');
    res.end();  // 结束响应
});

// 监听端口
server.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000/');
});
```

**处理请求**

```js
const server = http.createServer((req, res) => {
    // 请求方法
    console.log(req.method);  // GET, POST, PUT, DELETE...

    // 请求 URL
    console.log(req.url);  // /path?query=value

    // 请求头
    console.log(req.headers);

    // 解析 URL
    const url = require('url');
    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl.pathname);  // 路径
    console.log(parsedUrl.query);     // 查询参数对象

    // 根据 URL 路由
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>首页</h1>');
    } else if (req.url === '/api/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ users: ['张三', '李四'] }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});
```

**处理 POST 请求**

```js
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';

        // 接收数据
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        // 接收完成
        req.on('end', () => {
            console.log('请求体:', body);

            // 解析 JSON
            try {
                const data = JSON.parse(body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, data }));
            } catch (err) {
                res.writeHead(400);
                res.end('Invalid JSON');
            }
        });
    }
});
```

**发送 HTTP 请求**

```js
const http = require('http');

// GET 请求
const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/users/github',
    method: 'GET',
    headers: {
        'User-Agent': 'Node.js'
    }
};

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(JSON.parse(data));
    });
});

req.on('error', (err) => {
    console.error(err);
});

req.end();

// 简单的 GET 请求
http.get('http://api.example.com/data', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(data));
});
```

### 4. events 模块（事件）

```js
const EventEmitter = require('events');

// 创建事件发射器
const emitter = new EventEmitter();

// 监听事件
emitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

// 监听一次性事件
emitter.once('login', (user) => {
    console.log(`${user} 已登录`);
});

// 触发事件
emitter.emit('greet', '张三');  // "Hello, 张三!"
emitter.emit('login', '李四');  // "李四 已登录"
emitter.emit('login', '王五');  // 不会触发（once）

// 移除监听器
const handler = () => console.log('事件处理');
emitter.on('test', handler);
emitter.removeListener('test', handler);

// 移除所有监听器
emitter.removeAllListeners('greet');

// 自定义事件类
class MyEmitter extends EventEmitter {
    constructor() {
        super();
    }

    doSomething() {
        console.log('做一些事情...');
        this.emit('done', { status: 'success' });
    }
}

const myEmitter = new MyEmitter();
myEmitter.on('done', (data) => {
    console.log('完成:', data);
});
myEmitter.doSomething();
```

### 5. url 模块（URL 处理）

```js
const url = require('url');

// 解析 URL（旧 API）
const myURL = url.parse('https://example.com:8080/path?query=value#hash', true);
console.log(myURL.protocol);   // 'https:'
console.log(myURL.host);       // 'example.com:8080'
console.log(myURL.pathname);   // '/path'
console.log(myURL.query);      // { query: 'value' }
console.log(myURL.hash);       // '#hash'

// URL 类（新 API，推荐）
const myURL = new URL('https://example.com:8080/path?query=value#hash');
console.log(myURL.protocol);   // 'https:'
console.log(myURL.hostname);   // 'example.com'
console.log(myURL.port);       // '8080'
console.log(myURL.pathname);   // '/path'
console.log(myURL.search);     // '?query=value'
console.log(myURL.hash);       // '#hash'

// 查询参数
console.log(myURL.searchParams.get('query'));  // 'value'
myURL.searchParams.append('page', '1');
myURL.searchParams.set('query', 'newvalue');
myURL.searchParams.delete('page');

// 格式化 URL
const myURL = new URL('https://example.com');
myURL.pathname = '/path';
myURL.search = '?key=value';
console.log(myURL.href);  // 'https://example.com/path?key=value'
```

### 6. querystring 模块（查询字符串）

```js
const querystring = require('querystring');

// 解析查询字符串
const parsed = querystring.parse('name=张三&age=18&hobby=reading&hobby=coding');
console.log(parsed);
// { name: '张三', age: '18', hobby: ['reading', 'coding'] }

// 序列化为查询字符串
const str = querystring.stringify({ name: '张三', age: 18 });
console.log(str);  // 'name=张三&age=18'

// 编码/解码
querystring.escape('hello world');    // 'hello%20world'
querystring.unescape('hello%20world'); // 'hello world'
```

### 7. buffer 模块（缓冲区）

> 💡 **Buffer 的作用**：
> - Buffer 是用于处理二进制数据的类，类似于数组
> - 在 Node.js 中处理文件、网络数据时经常使用
> - Buffer 的大小在创建时确定，不能调整

```js
// 创建 Buffer
const buf1 = Buffer.alloc(10);           // 创建 10 字节的 Buffer（已初始化为 0）
const buf2 = Buffer.allocUnsafe(10);     // 创建 10 字节的 Buffer（未初始化，更快但不安全）
const buf3 = Buffer.from([1, 2, 3]);     // 从数组创建
const buf4 = Buffer.from('Hello', 'utf8'); // 从字符串创建

// Buffer 和字符串互转
const buf = Buffer.from('Hello Node.js', 'utf8');
console.log(buf.toString());           // 'Hello Node.js'
console.log(buf.toString('hex'));      // 十六进制
console.log(buf.toString('base64'));   // base64

// Buffer 操作
const buf = Buffer.from('Hello');
console.log(buf.length);    // 5
console.log(buf[0]);        // 72（'H' 的 ASCII 码）
buf[0] = 104;               // 修改为 'h'
console.log(buf.toString()); // 'hello'

// Buffer 拼接
const buf1 = Buffer.from('Hello ');
const buf2 = Buffer.from('World');
const buf3 = Buffer.concat([buf1, buf2]);
console.log(buf3.toString());  // 'Hello World'

// Buffer 切片
const buf = Buffer.from('Hello World');
const slice = buf.slice(0, 5);
console.log(slice.toString());  // 'Hello'
```

### 8. stream 模块（流）

> 💡 **流的优势**：
> - **内存效率**：不需要一次性将数据全部加载到内存
> - **时间效率**：可以边读边写，不需要等待全部数据
> - **管道**：可以将多个流连接起来处理数据

```js
const fs = require('fs');
const stream = require('stream');

// 可读流
const readStream = fs.createReadStream('./input.txt');

readStream.on('data', (chunk) => {
    console.log('读取数据:', chunk.toString());
});

readStream.on('end', () => {
    console.log('读取完成');
});

readStream.on('error', (err) => {
    console.error('错误:', err);
});

// 可写流
const writeStream = fs.createWriteStream('./output.txt');

writeStream.write('第一行\n');
writeStream.write('第二行\n');
writeStream.end('最后一行\n');

writeStream.on('finish', () => {
    console.log('写入完成');
});

// 管道（pipe）
const readStream = fs.createReadStream('./input.txt');
const writeStream = fs.createWriteStream('./output.txt');

readStream.pipe(writeStream);

// 链式管道
const zlib = require('zlib');
fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.txt.gz'));

// 自定义转换流
const { Transform } = require('stream');

const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

process.stdin
    .pipe(upperCaseTransform)
    .pipe(process.stdout);
```

### 9. process 模块（进程）

```js
// 进程信息
console.log(process.pid);        // 进程 ID
console.log(process.version);    // Node.js 版本
console.log(process.platform);   // 平台（win32, linux, darwin）
console.log(process.arch);       // CPU 架构（x64, arm）
console.log(process.cwd());      // 当前工作目录
console.log(process.execPath);   // Node.js 执行路径

// 命令行参数
// node app.js --port 3000
console.log(process.argv);
// [ '/usr/local/bin/node', '/path/to/app.js', '--port', '3000' ]

// 环境变量
console.log(process.env.NODE_ENV);  // 'development', 'production'
console.log(process.env.PATH);

// 标准输入输出
process.stdout.write('输出内容\n');
process.stderr.write('错误信息\n');

process.stdin.on('data', (data) => {
    console.log('输入:', data.toString());
});

// 退出进程
process.exit(0);  // 0 表示成功，非 0 表示失败

// 监听退出事件
process.on('exit', (code) => {
    console.log(`进程退出，退出码: ${code}`);
});

// 监听未捕获的异常
process.on('uncaughtException', (err) => {
    console.error('未捕获的异常:', err);
    process.exit(1);
});

// 监听未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
    console.error('未处理的 Promise 拒绝:', reason);
});

// 进程信号
process.on('SIGINT', () => {
    console.log('收到 SIGINT 信号（Ctrl+C）');
    process.exit(0);
});
```

## 四、NPM 包管理

### 1. package.json

> 💡 **package.json 的作用**：
> - 项目的清单文件，包含项目的元信息
> - 记录项目的依赖包及版本
> - 定义项目的脚本命令
> - 发布到 npm 时的配置信息

**创建 package.json**

```bash
# 交互式创建
npm init

# 使用默认值快速创建
npm init -y
```

**package.json 结构**

```json
{
    "name": "my-project",
    "version": "1.0.0",
    "description": "项目描述",
    "main": "index.js",
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        "test": "jest",
        "build": "webpack"
    },
    "keywords": ["node", "express"],
    "author": "Your Name",
    "license": "MIT",
    "dependencies": {
        "express": "^4.18.2"
    },
    "devDependencies": {
        "nodemon": "^2.0.20"
    }
}
```

### 2. npm 常用命令

```bash
# 安装依赖
npm install express              # 安装并添加到 dependencies
npm install -D nodemon           # 安装并添加到 devDependencies
npm install express@4.17.1       # 安装指定版本
npm install                      # 安装 package.json 中的所有依赖

# 卸载包
npm uninstall express

# 更新包
npm update express               # 更新指定包
npm update                       # 更新所有包

# 查看信息
npm list                         # 查看已安装的包
npm list --depth=0               # 只显示顶层包
npm outdated                     # 查看过时的包
npm view express                 # 查看包的信息
npm view express versions        # 查看包的所有版本

# 全局安装
npm install -g nodemon           # 全局安装
npm list -g --depth=0            # 查看全局包
npm uninstall -g nodemon         # 卸载全局包

# 运行脚本
npm run dev                      # 运行自定义脚本
npm start                        # 运行 start 脚本
npm test                         # 运行 test 脚本

# 发布包
npm login                        # 登录 npm
npm publish                      # 发布包
npm unpublish package@version    # 取消发布

# 其他
npm cache clean --force          # 清除缓存
npm config list                  # 查看配置
npm config set registry <url>    # 设置镜像源
```

### 3. 版本号规则

**语义化版本（Semantic Versioning）**

版本号格式：`主版本号.次版本号.修订号` (major.minor.patch)

- **主版本号**：不兼容的 API 修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

```json
{
    "dependencies": {
        "express": "4.18.2",      // 精确版本
        "express": "^4.18.2",     // 兼容补丁和次版本号（推荐）
        "express": "~4.18.2",     // 兼容补丁版本号
        "express": "*",           // 任意版本（不推荐）
        "express": ">=4.0.0",     // 大于等于某版本
        "express": "<5.0.0"       // 小于某版本
    }
}
```

**版本符号说明**

- `^4.18.2`：安装 4.x.x 的最新版本（>=4.18.2 <5.0.0）
- `~4.18.2`：安装 4.18.x 的最新版本（>=4.18.2 <4.19.0）
- `4.18.2`：只安装 4.18.2 版本

### 4. 常用的 npm 包

```bash
# Web 框架
npm install express              # Express 框架
npm install koa                  # Koa 框架
npm install fastify              # Fastify 框架

# 数据库
npm install mysql2               # MySQL
npm install mongodb              # MongoDB
npm install pg                   # PostgreSQL
npm install redis                # Redis

# ORM/ODM
npm install sequelize            # SQL ORM
npm install mongoose             # MongoDB ODM
npm install typeorm              # TypeScript ORM

# 工具库
npm install lodash               # 工具函数库
npm install moment               # 日期处理
npm install dayjs                # 轻量级日期库
npm install axios                # HTTP 客户端
npm install dotenv               # 环境变量

# 开发工具
npm install -D nodemon           # 自动重启
npm install -D eslint            # 代码检查
npm install -D prettier          # 代码格式化
npm install -D jest              # 测试框架
```

### 5. npx 命令

```bash
# npx 可以直接运行 npm 包，无需全局安装

# 运行本地包
npx nodemon index.js

# 运行远程包（无需安装）
npx create-react-app my-app
npx cowsay hello

# 指定版本运行
npx node@14 -v
```

### 6. package-lock.json

> 💡 **package-lock.json 的作用**：
> - 锁定依赖包的确切版本
> - 记录依赖树的完整结构
> - 确保团队成员安装相同版本的依赖
> - 应该提交到版本控制系统

## 五、异步编程

### 1. 回调函数（Callback）

```js
const fs = require('fs');

// 回调函数
fs.readFile('./file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('读取失败:', err);
        return;
    }
    console.log('文件内容:', data);
});

// 回调地狱（Callback Hell）
fs.readFile('./file1.txt', 'utf8', (err, data1) => {
    if (err) throw err;

    fs.readFile('./file2.txt', 'utf8', (err, data2) => {
        if (err) throw err;

        fs.readFile('./file3.txt', 'utf8', (err, data3) => {
            if (err) throw err;

            console.log(data1, data2, data3);
        });
    });
});
```

### 2. Promise

```js
const fs = require('fs').promises;

// 使用 Promise
fs.readFile('./file.txt', 'utf8')
    .then(data => {
        console.log('文件内容:', data);
        return fs.readFile('./file2.txt', 'utf8');
    })
    .then(data => {
        console.log('文件2内容:', data);
    })
    .catch(err => {
        console.error('错误:', err);
    });

// Promise.all - 并发执行
Promise.all([
    fs.readFile('./file1.txt', 'utf8'),
    fs.readFile('./file2.txt', 'utf8'),
    fs.readFile('./file3.txt', 'utf8')
])
    .then(([data1, data2, data3]) => {
        console.log(data1, data2, data3);
    })
    .catch(err => {
        console.error(err);
    });

// 手动创建 Promise
function readFilePromise(path) {
    return new Promise((resolve, reject) => {
        require('fs').readFile(path, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

readFilePromise('./file.txt')
    .then(data => console.log(data))
    .catch(err => console.error(err));
```

### 3. async/await

```js
const fs = require('fs').promises;

// async 函数
async function readFiles() {
    try {
        const data1 = await fs.readFile('./file1.txt', 'utf8');
        const data2 = await fs.readFile('./file2.txt', 'utf8');
        const data3 = await fs.readFile('./file3.txt', 'utf8');

        console.log(data1, data2, data3);
    } catch (err) {
        console.error('错误:', err);
    }
}

readFiles();

// 并发执行
async function readFilesConcurrent() {
    try {
        const [data1, data2, data3] = await Promise.all([
            fs.readFile('./file1.txt', 'utf8'),
            fs.readFile('./file2.txt', 'utf8'),
            fs.readFile('./file3.txt', 'utf8')
        ]);

        console.log(data1, data2, data3);
    } catch (err) {
        console.error('错误:', err);
    }
}
```

### 4. util.promisify（回调转 Promise）

```js
const util = require('util');
const fs = require('fs');

// 将回调函数转为 Promise
const readFilePromise = util.promisify(fs.readFile);

readFilePromise('./file.txt', 'utf8')
    .then(data => console.log(data))
    .catch(err => console.error(err));

// 或使用 async/await
async function readFile() {
    try {
        const data = await readFilePromise('./file.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}
```

### 5. 事件循环（Event Loop）

> 💡 **事件循环的理解**：
> - Node.js 是单线程的，通过事件循环实现异步非阻塞
> - **执行顺序**（从上到下）：
>   1. **timers**：执行 setTimeout、setInterval 的回调
>   2. **pending callbacks**：执行延迟到下一个循环迭代的 I/O 回调
>   3. **idle, prepare**：内部使用
>   4. **poll**：检索新的 I/O 事件，执行 I/O 相关回调
>   5. **check**：执行 setImmediate 的回调
>   6. **close callbacks**：执行关闭回调（如 socket.on('close')）
> - **微任务**（Microtasks）：在每个阶段结束后执行
>   - process.nextTick（优先级最高）
>   - Promise.then/catch/finally

```js
// 执行顺序示例
console.log('1. 同步代码');

setTimeout(() => {
    console.log('2. setTimeout');
}, 0);

setImmediate(() => {
    console.log('3. setImmediate');
});

process.nextTick(() => {
    console.log('4. nextTick');
});

Promise.resolve().then(() => {
    console.log('5. Promise');
});

console.log('6. 同步代码');

// 输出顺序：
// 1. 同步代码
// 6. 同步代码
// 4. nextTick
// 5. Promise
// 2. setTimeout
// 3. setImmediate
```

## 六、Express 框架

### 1. Express 简介

Express 是 Node.js 最流行的 Web 应用框架

**安装 Express**

```bash
npm install express
```

**创建基本服务器**

```js
const express = require('express');
const app = express();

// 路由
app.get('/', (req, res) => {
    res.send('Hello Express!');
});

// 启动服务器
app.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000/');
});
```

### 2. 路由

```js
const express = require('express');
const app = express();

// GET 请求
app.get('/', (req, res) => {
    res.send('GET 请求');
});

// POST 请求
app.post('/users', (req, res) => {
    res.send('POST 请求');
});

// PUT 请求
app.put('/users/:id', (req, res) => {
    res.send(`PUT 请求: ${req.params.id}`);
});

// DELETE 请求
app.delete('/users/:id', (req, res) => {
    res.send(`DELETE 请求: ${req.params.id}`);
});

// 所有方法
app.all('/api/*', (req, res) => {
    res.send('匹配所有方法');
});

// 路由参数
app.get('/users/:id', (req, res) => {
    console.log(req.params.id);  // 路径参数
    res.send(`用户 ID: ${req.params.id}`);
});

// 多个路由参数
app.get('/posts/:year/:month', (req, res) => {
    const { year, month } = req.params;
    res.send(`年份: ${year}, 月份: ${month}`);
});

// 查询参数
app.get('/search', (req, res) => {
    console.log(req.query);  // ?keyword=node&page=1
    const { keyword, page } = req.query;
    res.send(`搜索: ${keyword}, 页码: ${page}`);
});
```

### 3. 中间件

> 💡 **中间件的理解**：
> - 中间件是一个函数，可以访问请求对象（req）、响应对象（res）和下一个中间件（next）
> - 中间件可以：
>   - 执行任何代码
>   - 修改请求和响应对象
>   - 结束请求-响应循环
>   - 调用下一个中间件
> - 中间件按照定义顺序执行

```js
const express = require('express');
const app = express();

// 应用级中间件
app.use((req, res, next) => {
    console.log('时间:', Date.now());
    next();  // 传递给下一个中间件
});

// 路由级中间件
app.use('/admin', (req, res, next) => {
    console.log('访问后台');
    next();
});

// 内置中间件
app.use(express.json());                          // 解析 JSON
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码
app.use(express.static('public'));                // 静态文件服务

// 第三方中间件
const morgan = require('morgan');
app.use(morgan('dev'));  // 日志记录

const cors = require('cors');
app.use(cors());  // 跨域

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('服务器错误!');
});

// 自定义中间件
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

app.use(logger);

// 路由级中间件（多个）
function checkAuth(req, res, next) {
    if (req.headers.authorization) {
        next();
    } else {
        res.status(401).send('未授权');
    }
}

function checkAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('权限不足');
    }
}

app.get('/admin/users', checkAuth, checkAdmin, (req, res) => {
    res.send('管理员页面');
});
```

### 4. 请求和响应

**请求对象（req）**

```js
app.get('/demo', (req, res) => {
    // 请求信息
    console.log(req.method);       // 请求方法
    console.log(req.url);          // 请求 URL
    console.log(req.path);         // 路径
    console.log(req.params);       // 路径参数
    console.log(req.query);        // 查询参数
    console.log(req.body);         // 请求体（需要中间件解析）
    console.log(req.headers);      // 请求头
    console.log(req.get('User-Agent'));  // 获取特定请求头
    console.log(req.cookies);      // Cookie（需要 cookie-parser）
    console.log(req.ip);           // 客户端 IP

    res.send('OK');
});
```

**响应对象（res）**

```js
app.get('/demo', (req, res) => {
    // 发送响应
    res.send('文本响应');
    res.send({ message: 'JSON 响应' });
    res.send([1, 2, 3]);

    // 发送 JSON
    res.json({ success: true, data: {} });

    // 发送文件
    res.sendFile('/path/to/file.pdf');

    // 下载文件
    res.download('/path/to/file.pdf');

    // 重定向
    res.redirect('/new-url');
    res.redirect(301, '/new-url');

    // 设置状态码
    res.status(404).send('Not Found');
    res.sendStatus(200);  // 等价于 res.status(200).send('OK')

    // 设置响应头
    res.set('Content-Type', 'text/html');
    res.type('json');

    // 设置 Cookie
    res.cookie('name', 'value', { maxAge: 900000, httpOnly: true });
    res.clearCookie('name');

    // 渲染模板
    res.render('index', { title: '首页' });
});
```

### 5. 路由模块化

```js
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('用户列表');
});

router.get('/:id', (req, res) => {
    res.send(`用户详情: ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('创建用户');
});

module.exports = router;

// app.js
const express = require('express');
const app = express();
const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(3000);
```

### 6. 模板引擎

**使用 EJS**

```bash
npm install ejs
```

```js
const express = require('express');
const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');
app.set('views', './views');

// 渲染模板
app.get('/', (req, res) => {
    res.render('index', {
        title: '首页',
        users: ['张三', '李四', '王五']
    });
});
```

```html
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
    <ul>
        <% users.forEach(user => { %>
            <li><%= user %></li>
        <% }); %>
    </ul>
</body>
</html>
```

### 7. 文件上传

```bash
npm install multer
```

```js
const express = require('express');
const multer = require('multer');
const app = express();

// 配置存储
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// 单文件上传
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send('文件上传成功');
});

// 多文件上传
app.post('/uploads', upload.array('files', 10), (req, res) => {
    console.log(req.files);
    res.send('文件上传成功');
});
```

### 8. 完整示例

```js
const express = require('express');
const app = express();

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 路由
app.get('/', (req, res) => {
    res.send('首页');
});

app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: '张三' },
        { id: 2, name: '李四' }
    ]);
});

app.post('/api/users', (req, res) => {
    const user = req.body;
    res.status(201).json({ success: true, data: user });
});

// 404 处理
app.use((req, res) => {
    res.status(404).send('页面未找到');
});

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('服务器错误');
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}/`);
});
```

## 七、数据库操作

### 1. MySQL

**安装驱动**

```bash
npm install mysql2
```

**连接数据库**

```js
const mysql = require('mysql2');

// 创建连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
});

// 连接数据库
connection.connect((err) => {
    if (err) {
        console.error('连接失败:', err);
        return;
    }
    console.log('数据库连接成功');
});

// 查询
connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    console.log(results);
});

// 插入
const user = { name: '张三', age: 18 };
connection.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) throw err;
    console.log('插入 ID:', result.insertId);
});

// 更新
connection.query(
    'UPDATE users SET age = ? WHERE id = ?',
    [20, 1],
    (err, result) => {
        if (err) throw err;
        console.log('影响行数:', result.affectedRows);
    }
);

// 删除
connection.query('DELETE FROM users WHERE id = ?', [1], (err) => {
    if (err) throw err;
    console.log('删除成功');
});

// 关闭连接
connection.end();
```

**连接池**

```js
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 使用连接池
pool.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    console.log(results);
});

// Promise 方式
const promisePool = pool.promise();

async function getUsers() {
    try {
        const [rows] = await promisePool.query('SELECT * FROM users');
        console.log(rows);
    } catch (err) {
        console.error(err);
    }
}
```

### 2. MongoDB

**安装驱动**

```bash
npm install mongodb
```

**连接数据库**

```js
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function main() {
    try {
        await client.connect();
        console.log('MongoDB 连接成功');

        const db = client.db('test');
        const collection = db.collection('users');

        // 插入
        await collection.insertOne({ name: '张三', age: 18 });
        await collection.insertMany([
            { name: '李四', age: 20 },
            { name: '王五', age: 22 }
        ]);

        // 查询
        const users = await collection.find({}).toArray();
        console.log(users);

        const user = await collection.findOne({ name: '张三' });
        console.log(user);

        // 更新
        await collection.updateOne(
            { name: '张三' },
            { $set: { age: 19 } }
        );

        await collection.updateMany(
            { age: { $gte: 20 } },
            { $set: { status: 'active' } }
        );

        // 删除
        await collection.deleteOne({ name: '张三' });
        await collection.deleteMany({ age: { $lt: 18 } });

    } finally {
        await client.close();
    }
}

main().catch(console.error);
```

### 3. Mongoose（MongoDB ODM）

**安装 Mongoose**

```bash
npm install mongoose
```

**连接数据库**

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log('MongoDB 连接成功'))
    .catch(err => console.error('连接失败:', err));

// 定义 Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        min: 0,
        max: 150
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// 创建 Model
const User = mongoose.model('User', userSchema);

// 创建文档
const user = new User({
    name: '张三',
    age: 18,
    email: 'zhangsan@example.com'
});

user.save()
    .then(doc => console.log('保存成功:', doc))
    .catch(err => console.error(err));

// 或使用 create
User.create({ name: '李四', age: 20 })
    .then(doc => console.log(doc))
    .catch(err => console.error(err));

// 查询
User.find({})
    .then(users => console.log(users))
    .catch(err => console.error(err));

User.findOne({ name: '张三' })
    .then(user => console.log(user))
    .catch(err => console.error(err));

User.findById('507f1f77bcf86cd799439011')
    .then(user => console.log(user))
    .catch(err => console.error(err));

// 更新
User.updateOne({ name: '张三' }, { age: 19 })
    .then(result => console.log(result))
    .catch(err => console.error(err));

User.findByIdAndUpdate('507f1f77bcf86cd799439011', { age: 20 }, { new: true })
    .then(user => console.log(user))
    .catch(err => console.error(err));

// 删除
User.deleteOne({ name: '张三' })
    .then(result => console.log(result))
    .catch(err => console.error(err));

User.findByIdAndDelete('507f1f77bcf86cd799439011')
    .then(user => console.log(user))
    .catch(err => console.error(err));

// 使用 async/await
async function getUsers() {
    try {
        const users = await User.find({ age: { $gte: 18 } });
        console.log(users);
    } catch (err) {
        console.error(err);
    }
}
```

## 八、实用工具和中间件

### 1. 环境变量（dotenv）

```bash
npm install dotenv
```

```
# .env 文件
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
NODE_ENV=development
```

```js
// 加载环境变量
require('dotenv').config();

console.log(process.env.PORT);      // 3000
console.log(process.env.DB_HOST);   // localhost
console.log(process.env.NODE_ENV);  // development

// 在代码中使用
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`服务器运行在端口 ${port}`);
});
```

### 2. 日志（morgan）

```bash
npm install morgan
```

```js
const express = require('express');
const morgan = require('morgan');
const app = express();

// 使用预定义格式
app.use(morgan('dev'));        // 开发环境
app.use(morgan('combined'));   // 生产环境

// 自定义格式
app.use(morgan(':method :url :status :response-time ms'));

// 写入文件
const fs = require('fs');
const path = require('path');

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));
```

### 3. 跨域（cors）

```bash
npm install cors
```

```js
const express = require('express');
const cors = require('cors');
const app = express();

// 允许所有来源
app.use(cors());

// 自定义配置
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true,
    maxAge: 86400
}));

// 动态配置
const corsOptions = {
    origin: (origin, callback) => {
        const whitelist = ['http://localhost:8080', 'http://example.com'];
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

// 单个路由启用 CORS
app.get('/api/data', cors(), (req, res) => {
    res.json({ message: 'CORS enabled' });
});
```

### 4. 身份验证（jsonwebtoken）

```bash
npm install jsonwebtoken
```

```js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key';

// 生成 Token
const token = jwt.sign(
    { userId: 1, username: 'zhangsan' },
    SECRET_KEY,
    { expiresIn: '24h' }
);

console.log(token);

// 验证 Token
try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);  // { userId: 1, username: 'zhangsan', iat: ..., exp: ... }
} catch (err) {
    console.error('Token 无效:', err.message);
}

// Express 中间件
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: '未提供 Token' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token 无效' });
        }
        req.user = user;
        next();
    });
}

// 使用中间件
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: '受保护的资源', user: req.user });
});
```

### 5. 密码加密（bcrypt）

```bash
npm install bcrypt
```

```js
const bcrypt = require('bcrypt');

// 加密密码
async function hashPassword(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

// 验证密码
async function verifyPassword(password, hash) {
    const match = await bcrypt.compare(password, hash);
    return match;
}

// 使用示例
(async () => {
    const password = 'mypassword123';

    // 加密
    const hashed = await hashPassword(password);
    console.log('加密后:', hashed);

    // 验证
    const isValid = await verifyPassword(password, hashed);
    console.log('密码正确:', isValid);  // true

    const isInvalid = await verifyPassword('wrongpassword', hashed);
    console.log('密码错误:', isInvalid);  // false
})();
```

### 6. 输入验证（express-validator）

```bash
npm install express-validator
```

```js
const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();

app.use(express.json());

app.post('/register',
    // 验证规则
    body('email').isEmail().withMessage('邮箱格式不正确'),
    body('password')
        .isLength({ min: 6 }).withMessage('密码至少 6 位')
        .matches(/\d/).withMessage('密码必须包含数字'),
    body('age').isInt({ min: 0, max: 150 }).withMessage('年龄无效'),

    (req, res) => {
        // 检查验证结果
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        res.json({ message: '注册成功' });
    }
);
```

### 7. Session（express-session）

```bash
npm install express-session
```

```js
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,  // 1 天
        httpOnly: true,
        secure: false  // HTTPS 时设为 true
    }
}));

// 设置 session
app.post('/login', (req, res) => {
    req.session.userId = 1;
    req.session.username = 'zhangsan';
    res.json({ message: '登录成功' });
});

// 读取 session
app.get('/profile', (req, res) => {
    if (req.session.userId) {
        res.json({ username: req.session.username });
    } else {
        res.status(401).json({ message: '未登录' });
    }
});

// 销毁 session
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: '退出失败' });
        }
        res.json({ message: '退出成功' });
    });
});
```

### 8. Cookie（cookie-parser）

```bash
npm install cookie-parser
```

```js
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser('your-secret-key'));

// 设置 Cookie
app.get('/set-cookie', (req, res) => {
    res.cookie('name', 'zhangsan', { maxAge: 900000, httpOnly: true });
    res.cookie('age', 18);
    res.send('Cookie 已设置');
});

// 读取 Cookie
app.get('/get-cookie', (req, res) => {
    console.log(req.cookies);  // { name: 'zhangsan', age: '18' }
    res.send(req.cookies);
});

// 删除 Cookie
app.get('/delete-cookie', (req, res) => {
    res.clearCookie('name');
    res.send('Cookie 已删除');
});

// 签名 Cookie
app.get('/set-signed-cookie', (req, res) => {
    res.cookie('user', 'zhangsan', { signed: true });
    res.send('签名 Cookie 已设置');
});

app.get('/get-signed-cookie', (req, res) => {
    console.log(req.signedCookies);
    res.send(req.signedCookies);
});
```

## 九、项目实战技巧

### 1. 项目结构

```
my-project/
├── src/
│   ├── controllers/      # 控制器
│   ├── models/           # 数据模型
│   ├── routes/           # 路由
│   ├── middlewares/      # 中间件
│   ├── utils/            # 工具函数
│   ├── config/           # 配置文件
│   └── app.js            # 应用入口
├── public/               # 静态资源
├── views/                # 模板文件
├── tests/                # 测试文件
├── .env                  # 环境变量
├── .gitignore
├── package.json
└── README.md
```

### 2. 错误处理

```js
// 自定义错误类
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// 异步错误处理包装器
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

// 使用
app.get('/users/:id', catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new AppError('用户不存在', 404));
    }

    res.json(user);
}));

// 全局错误处理中间件
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err
        });
    } else {
        // 生产环境
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        } else {
            console.error('ERROR 💥', err);
            res.status(500).json({
                status: 'error',
                message: '服务器错误'
            });
        }
    }
});
```

### 3. RESTful API 设计

```js
const express = require('express');
const router = express.Router();

// GET /api/users - 获取所有用户
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json({
        status: 'success',
        results: users.length,
        data: { users }
    });
});

// GET /api/users/:id - 获取单个用户
router.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json({
        status: 'success',
        data: { user }
    });
});

// POST /api/users - 创建用户
router.post('/users', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json({
        status: 'success',
        data: { user }
    });
});

// PUT /api/users/:id - 更新用户（完整更新）
router.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.json({
        status: 'success',
        data: { user }
    });
});

// PATCH /api/users/:id - 更新用户（部分更新）
router.patch('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.json({
        status: 'success',
        data: { user }
    });
});

// DELETE /api/users/:id - 删除用户
router.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    });
});

module.exports = router;
```

### 4. 分页、排序、筛选

```js
class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        // 1. 筛选
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 2. 高级筛选 (gte, gt, lte, lt)
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

// 使用
app.get('/api/users', async (req, res) => {
    const features = new APIFeatures(User.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const users = await features.query;

    res.json({
        status: 'success',
        results: users.length,
        data: { users }
    });
});

// 请求示例：
// GET /api/users?age[gte]=18&sort=-createdAt&fields=name,email&page=2&limit=10
```

### 5. 性能优化

```js
// 1. 使用压缩中间件
const compression = require('compression');
app.use(compression());

// 2. 使用缓存
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

app.get('/api/users', (req, res) => {
    const cacheKey = 'users';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return res.json(cachedData);
    }

    // 查询数据库
    User.find().then(users => {
        cache.set(cacheKey, users);
        res.json(users);
    });
});

// 3. 数据库索引
userSchema.index({ email: 1 });
userSchema.index({ name: 1, age: -1 });

// 4. 限流
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 分钟
    max: 100,  // 最多 100 次请求
    message: '请求过于频繁，请稍后再试'
});

app.use('/api', limiter);

// 5. Helmet（安全相关的 HTTP 头）
const helmet = require('helmet');
app.use(helmet());
```

---

> **学习建议**
>
> 1. **循序渐进**：从基础的模块系统开始，逐步学习核心模块和框架
> 2. **多做项目**：通过实际项目巩固所学知识，如博客系统、API 服务等
> 3. **阅读文档**：Node.js 官方文档和 npm 包的文档是最好的学习资料
> 4. **理解异步**：深入理解异步编程模型，这是 Node.js 的核心
> 5. **关注性能**：学习如何优化 Node.js 应用的性能
> 6. **最佳实践**：遵循社区的最佳实践，编写可维护的代码
>
> 🔗 **推荐资源**
> - [Node.js 官方文档](https://nodejs.org/zh-cn/docs/)
> - [Express 官方文档](https://expressjs.com/)
> - [NPM 官网](https://www.npmjs.com/)
> - [Node.js 最佳实践](https://github.com/goldbergyoni/nodebestpractices)
