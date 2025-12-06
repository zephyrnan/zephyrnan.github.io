---
title: Node.js 模块化设计
date: 2025-11-20
categories:
  - Node.js 深入学习
tags:
  - Node.js
---

# Node.js 模块化设计

## 1. 概述

模块化是 Node.js 的核心特性之一，它允许开发者将代码分割成独立、可重用的模块，提高代码的可维护性和可测试性。

### 1.1 模块化的优势

- **代码复用**: 避免重复编写相同功能
- **命名空间隔离**: 防止全局变量污染
- **依赖管理**: 明确模块间的依赖关系
- **按需加载**: 只加载需要的模块
- **团队协作**: 多人可并行开发不同模块

## 2. Node.js 模块系统

### 2.1 CommonJS 规范

Node.js 默认使用 CommonJS 模块规范。

#### 核心特性

- 每个文件就是一个模块
- 模块内的变量和函数都是私有的
- 使用 `module.exports` 或 `exports` 导出
- 使用 `require()` 导入

#### 基本用法

```javascript
// math.js - 导出模块
function add(a, b) {
  return a + b;  // 加法运算
}

function subtract(a, b) {
  return a - b;  // 减法运算
}

// 方式 1: 逐个导出
exports.add = add;          // 将add函数挂载到exports对象
exports.subtract = subtract;  // 将subtract函数挂载到exports对象

// 方式 2: 整体导出
module.exports = {
  add,          // ES6简写,等同于 add: add
  subtract      // ES6简写,等同于 subtract: subtract
};
```

```javascript
// app.js - 导入模块
const math = require('./math');  // 相对路径导入,返回导出的对象

console.log(math.add(5, 3));      // 输出: 8
console.log(math.subtract(10, 4)); // 输出: 6

// 解构导入
const { add, subtract } = require('./math');  // ES6解构语法
console.log(add(2, 3));           // 输出: 5
```

> ⚠️ **注意事项**:
> - **相对路径必须**: 自定义模块必须使用`./`或`../`开头
> - **扩展名可省略**: require会自动按.js → .json → .node顺序查找
> - **单次执行**: 模块代码只在首次require时执行,后续使用缓存
> - **同步加载**: require是同步的,会阻塞代码执行
> - **方式1和2不能混用**: 使用module.exports会覆盖exports上的属性
>
> ```javascript
> // 常见错误:路径问题
> const math = require('math');      // ❌ 缺少./会被当作npm包
> const math = require('./math');    // ✅ 正确
>
> // 常见错误:混用导出方式
> exports.add = () => {};
> module.exports = { subtract: () => {} };  // ❌ add丢失
>
> // 正确做法:统一使用一种方式
> module.exports = {
>   add: () => {},
>   subtract: () => {}
> };  // ✅
>
> // 循环依赖问题
> // a.js
> const b = require('./b');
> exports.valueA = 1;
> exports.getB = () => b.valueB;  // ❌ 可能拿到undefined
> ```
>
> 🎯 **实际应用场景**:
> ```javascript
> // 场景1:工具函数模块
> // utils/format.js
> exports.formatDate = (date) => {
>   return date.toISOString().split('T')[0];
> };
> exports.formatCurrency = (amount) => {
>   return `¥${amount.toFixed(2)}`;
> };
>
> // 使用
> const { formatDate, formatCurrency } = require('./utils/format');
> console.log(formatDate(new Date()));  // "2025-07-23"
> console.log(formatCurrency(99.99));   // "¥99.99"
>
> // 场景2:配置文件
> // config.js
> module.exports = {
>   database: {
>     host: 'localhost',
>     port: 5432,
>     user: 'admin'
>   },
>   server: {
>     port: 3000
>   }
> };
>
> // 使用
> const config = require('./config');
> console.log(config.database.host);  // "localhost"
>
> // 场景3:单例模式
> // database.js
> class Database {
>   constructor() {
>     this.connected = false;
>   }
>   connect() {
>     this.connected = true;
>     console.log('数据库已连接');
>   }
> }
>
> module.exports = new Database();  // 导出实例
>
> // 使用(多处require拿到同一个实例)
> const db1 = require('./database');
> const db2 = require('./database');
> db1.connect();
> console.log(db2.connected);  // true (同一实例)
>
> // 场景4:Express路由模块
> // routes/users.js
> const express = require('express');
> const router = express.Router();
>
> router.get('/', (req, res) => {
>   res.json({ users: [] });
> });
>
> router.post('/', (req, res) => {
>   // 创建用户
> });
>
> module.exports = router;
>
> // app.js
> const userRoutes = require('./routes/users');
> app.use('/api/users', userRoutes);
> ```

### 2.2 ES6 模块 (ESM)

从 Node.js 12+ 开始，原生支持 ES6 模块语法。

#### 启用 ES6 模块

**方式 1**: 在 `package.json` 中添加

```json
{
  "type": "module"
}
```

**方式 2**: 使用 `.mjs` 文件扩展名

#### 基本用法

```javascript
// math.mjs - 导出模块
export function add(a, b) {
  return a + b;  // 命名导出:可以导出多个
}

export function subtract(a, b) {
  return a - b;  // 每个export都是一个独立的导出
}

// 默认导出:每个模块只能有一个default导出
export default function multiply(a, b) {
  return a * b;  // 默认导出可以在导入时自定义名称
}
```

```javascript
// app.mjs - 导入模块
import multiply, { add, subtract } from './math.mjs';
// multiply是默认导出(可任意命名), {add, subtract}是命名导出(必须匹配)

console.log(add(5, 3));        // 输出: 8
console.log(subtract(10, 4));  // 输出: 6
console.log(multiply(3, 4));   // 输出: 12

// 导入所有命名导出为一个对象
import * as math from './math.mjs';  // math是包含所有命名导出的对象
console.log(math.add(1, 2));   // 输出: 3
console.log(math.default(2, 3));  // 输出: 6 (访问默认导出需要用.default)
```

> ⚠️ **注意事项**:
> - **文件扩展名**: ES6模块必须使用`.mjs`扩展名或在package.json中设置`"type": "module"`
> - **import路径**: 必须包含完整的文件扩展名,不能省略`.mjs`
> - **默认导出限制**: 每个模块只能有一个`export default`,但可以有多个命名导出
> - **命名导出匹配**: 导入命名导出时,名称必须与导出时的名称一致(可用as重命名)
> - **静态导入**: import语句必须在模块顶层,不能在函数或条件语句内
> - **只读绑定**: 导入的值是只读的引用,不是拷贝
> - **循环依赖**: ES6模块天然支持循环依赖,但需要注意初始化顺序
>
> ```javascript
> // 常见错误:缺少文件扩展名
> import { add } from './math';  // ❌ Node.js中必须包含.mjs
> import { add } from './math.mjs';  // ✅ 正确
>
> // 常见错误:默认导出和命名导出混淆
> export default function add() {}
> export default function sub() {}  // ❌ 只能有一个default
>
> export default function add() {}
> export function sub() {}  // ✅ 一个default + 多个命名导出
>
> // 常见错误:动态导入位置错误
> if (condition) {
>   import { add } from './math.mjs';  // ❌ import不能在代码块中
> }
>
> // 正确:使用动态import()
> if (condition) {
>   const { add } = await import('./math.mjs');  // ✅ 使用import()函数
> }
>
> // 只读绑定示例
> import { count } from './counter.mjs';
> count = 10;  // ❌ TypeError: Assignment to constant variable
> ```
>
> 🎯 **实际应用场景**:
> ```javascript
> // 场景1:前端工具函数库
> // utils/format.mjs
> export function formatDate(date) {
>   return new Intl.DateTimeFormat('zh-CN').format(date);
> }
>
> export function formatCurrency(amount) {
>   return new Intl.NumberFormat('zh-CN', {
>     style: 'currency',
>     currency: 'CNY'
>   }).format(amount);
> }
>
> // 使用
> import { formatDate, formatCurrency } from './utils/format.mjs';
> console.log(formatDate(new Date()));  // "2025/7/23"
> console.log(formatCurrency(99.99));   // "¥99.99"
>
> // 场景2:Vue3组件导出
> // components/Button.vue
> export default {
>   name: 'MyButton',
>   props: ['text', 'type'],
>   template: '<button :class="type">{{ text }}</button>'
> }
>
> // 使用
> import MyButton from './components/Button.vue';
> app.component('MyButton', MyButton);
>
> // 场景3:React组件库
> // components/index.mjs
> export { default as Button } from './Button.jsx';
> export { default as Input } from './Input.jsx';
> export { default as Modal } from './Modal.jsx';
>
> // 使用:按需导入
> import { Button, Modal } from './components/index.mjs';
>
> // 场景4:配置文件(支持类型检查)
> // config/api.mjs
> export const API_BASE_URL = 'https://api.example.com';
> export const API_TIMEOUT = 5000;
>
> export default {
>   baseURL: API_BASE_URL,
>   timeout: API_TIMEOUT,
>   headers: {
>     'Content-Type': 'application/json'
>   }
> };
>
> // 使用
> import apiConfig, { API_BASE_URL } from './config/api.mjs';
> axios.create(apiConfig);
>
> // 场景5:动态导入(代码分割)
> // router.mjs
> const routes = [
>   {
>     path: '/home',
>     component: () => import('./views/Home.vue')  // 懒加载
>   },
>   {
>     path: '/about',
>     component: () => import('./views/About.vue')
>   }
> ];
> ```

### 2.3 CommonJS vs ES6 模块

| 特性 | CommonJS | ES6 模块 |
|------|----------|---------|
| 语法 | `require()`/`module.exports` | `import`/`export` |
| 加载时机 | 运行时加载 | 编译时加载 |
| 加载方式 | 同步加载 | 异步加载 |
| 值拷贝 | 是（输出值的拷贝） | 否（输出值的引用） |
| 动态导入 | 支持 | 需要 `import()` |
| 文件扩展名 | `.js` | `.mjs` 或配置 `type: "module"` |
| 使用场景 | Node.js 传统项目 | 现代项目、浏览器兼容 |

## 3. 模块导出详解

### 3.1 CommonJS 导出方式

#### exports 对象

```javascript
// user.js
exports.name = 'John';
exports.age = 30;

exports.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};
```

#### module.exports 对象

```javascript
// calculator.js

// 导出对象
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  PI: 3.14159
};

// 导出函数
module.exports = function(name) {
  return `Hello, ${name}!`;
};

// 导出类
module.exports = class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};
```

#### exports 与 module.exports 的关系

```javascript
// 初始状态
console.log(exports === module.exports); // true

// 错误用法：不要给 exports 重新赋值
exports = { foo: 'bar' }; // ❌ 不会生效

// 正确用法
module.exports = { foo: 'bar' }; // ✅ 正确

// 或者
exports.foo = 'bar'; // ✅ 正确
```

### 3.2 ES6 导出方式

#### 命名导出

```javascript
// utils.js

// 方式 1: 声明时导出
export const PI = 3.14159;

export function square(x) {
  return x * x;
}

export class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

// 方式 2: 统一导出
const E = 2.71828;
function cube(x) {
  return x * x * x;
}

export { E, cube };

// 方式 3: 重命名导出
const privateFunction = () => 'secret';
export { privateFunction as publicFunction };
```

#### 默认导出

```javascript
// logger.js

// 默认导出函数
export default function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

// 或导出类
export default class Logger {
  log(message) {
    console.log(message);
  }
}

// 或导出对象
export default {
  info: (msg) => console.log('[INFO]', msg),
  error: (msg) => console.error('[ERROR]', msg)
};
```

#### 混合导出

```javascript
// api.js
export const API_URL = 'https://api.example.com';

export function request(endpoint) {
  return fetch(`${API_URL}${endpoint}`);
}

// 默认导出
export default class ApiClient {
  constructor(apiUrl) {
    this.apiUrl = apiUrl || API_URL;
  }

  get(endpoint) {
    return fetch(`${this.apiUrl}${endpoint}`);
  }
}
```

## 4. 模块导入详解

### 4.1 CommonJS 导入

```javascript
// 导入整个模块
const fs = require('fs');
const myModule = require('./myModule');

// 导入并解构
const { readFile, writeFile } = require('fs');

// 导入 JSON 文件
const config = require('./config.json');

// 条件导入
let dbModule;
if (process.env.NODE_ENV === 'production') {
  dbModule = require('./db-prod');
} else {
  dbModule = require('./db-dev');
}
```

### 4.2 ES6 导入

```javascript
// 导入默认导出
import Logger from './logger.js';

// 导入命名导出
import { add, subtract } from './math.js';

// 导入所有命名导出
import * as MathUtils from './math.js';

// 混合导入
import ApiClient, { API_URL, request } from './api.js';

// 重命名导入
import { veryLongFunctionName as shortName } from './utils.js';

// 仅执行模块（不导入任何内容）
import './init.js';

// 动态导入（返回 Promise）
const module = await import('./dynamic-module.js');

// 或者
import('./dynamic-module.js')
  .then(module => {
    module.doSomething();
  });
```

## 5. 模块类型

### 5.1 核心模块（内置模块）

Node.js 自带的模块，无需安装即可使用。

```javascript
const fs = require('fs');        // 文件系统
const http = require('http');    // HTTP 服务器
const path = require('path');    // 路径处理
const os = require('os');        // 操作系统信息
const crypto = require('crypto'); // 加密
const events = require('events'); // 事件
const stream = require('stream'); // 流
const util = require('util');    // 实用工具
```

### 5.2 文件模块（自定义模块）

开发者自己编写的模块。

```javascript
// 相对路径
const myModule = require('./myModule');
const utils = require('../utils/helpers');

// 绝对路径
const config = require('/home/user/project/config');

// 省略扩展名（按顺序查找）
const mod = require('./module'); // 查找 module.js -> module.json -> module.node
```

### 5.3 第三方模块（npm 包）

通过 npm 安装的外部模块。

```javascript
const express = require('express');
const axios = require('axios');
const lodash = require('lodash');
const moment = require('moment');
```

## 6. 模块加载机制

### 6.1 模块缓存

模块在第一次加载后会被缓存，后续加载直接从缓存读取。

```javascript
// counter.js
let count = 0;

exports.increment = function() {
  count++;
};

exports.getCount = function() {
  return count;
};
```

```javascript
// app.js
const counter1 = require('./counter');
const counter2 = require('./counter');

counter1.increment();
counter1.increment();

console.log(counter1.getCount()); // 2
console.log(counter2.getCount()); // 2 (同一个实例)

// 查看缓存
console.log(require.cache);

// 删除缓存（慎用）
delete require.cache[require.resolve('./counter')];
```

### 6.2 模块查找规则

当调用 `require('module')` 时：

1. **核心模块**: 优先查找核心模块
2. **路径模块**: 如果以 `./`、`../`、`/` 开头，按路径查找
3. **node_modules**: 从当前目录的 `node_modules` 开始，逐级向上查找

```javascript
// 查找顺序示例
require('express');

/*
查找顺序:
1. 核心模块（无）
2. ./node_modules/express
3. ../node_modules/express
4. ../../node_modules/express
...直到根目录
*/
```

### 6.3 文件查找顺序

```javascript
require('./module');

/*
查找顺序:
1. ./module.js
2. ./module.json
3. ./module.node
4. ./module/package.json (main 字段)
5. ./module/index.js
6. ./module/index.json
7. ./module/index.node
*/
```

## 7. 实战案例

### 案例 1: 数据库连接模块

```javascript
// db/connection.js
const mysql = require('mysql2/promise');

class Database {
  constructor() {
    this.pool = null;
  }

  async connect(config) {
    this.pool = mysql.createPool({
      host: config.host || 'localhost',
      user: config.user,
      password: config.password,
      database: config.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    console.log('数据库连接池已创建');
  }

  async query(sql, params) {
    if (!this.pool) {
      throw new Error('数据库未连接');
    }
    const [rows] = await this.pool.execute(sql, params);
    return rows;
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
      console.log('数据库连接已关闭');
    }
  }
}

// 单例模式
module.exports = new Database();
```

```javascript
// db/userModel.js
const db = require('./connection');

class UserModel {
  async findAll() {
    return await db.query('SELECT * FROM users');
  }

  async findById(id) {
    const rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  async create(userData) {
    const { name, email, password } = userData;
    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return result.insertId;
  }

  async update(id, userData) {
    const { name, email } = userData;
    await db.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
  }

  async delete(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = new UserModel();
```

```javascript
// app.js
const db = require('./db/connection');
const userModel = require('./db/userModel');

async function main() {
  // 连接数据库
  await db.connect({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myapp'
  });

  // 使用模型
  const users = await userModel.findAll();
  console.log('所有用户:', users);

  const newUserId = await userModel.create({
    name: 'Alice',
    email: 'alice@example.com',
    password: 'hashed_password'
  });
  console.log('新用户 ID:', newUserId);

  // 关闭连接
  await db.close();
}

main().catch(console.error);
```

### 案例 2: 配置管理模块

```javascript
// config/index.js
const fs = require('fs');
const path = require('path');

class Config {
  constructor() {
    this.config = {};
    this.env = process.env.NODE_ENV || 'development';
    this.load();
  }

  load() {
    // 加载默认配置
    const defaultConfig = this.loadFile('default.json');

    // 加载环境配置
    const envConfig = this.loadFile(`${this.env}.json`);

    // 合并配置
    this.config = { ...defaultConfig, ...envConfig };

    // 环境变量覆盖
    this.applyEnvOverrides();
  }

  loadFile(filename) {
    const filePath = path.join(__dirname, filename);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    return {};
  }

  applyEnvOverrides() {
    // 从环境变量中读取覆盖配置
    if (process.env.PORT) {
      this.config.port = parseInt(process.env.PORT);
    }
    if (process.env.DATABASE_URL) {
      this.config.databaseUrl = process.env.DATABASE_URL;
    }
  }

  get(key, defaultValue = null) {
    const keys = key.split('.');
    let value = this.config;

    for (const k of keys) {
      if (value[k] === undefined) {
        return defaultValue;
      }
      value = value[k];
    }

    return value;
  }

  set(key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    let obj = this.config;

    for (const k of keys) {
      if (!obj[k]) obj[k] = {};
      obj = obj[k];
    }

    obj[lastKey] = value;
  }
}

module.exports = new Config();
```

```javascript
// config/default.json
{
  "app": {
    "name": "My Application",
    "port": 3000
  },
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "myapp_dev"
  },
  "logging": {
    "level": "info"
  }
}
```

```javascript
// config/production.json
{
  "app": {
    "port": 8080
  },
  "database": {
    "host": "prod-db-server",
    "name": "myapp_prod"
  },
  "logging": {
    "level": "error"
  }
}
```

```javascript
// 使用配置
const config = require('./config');

console.log(config.get('app.name'));        // "My Application"
console.log(config.get('app.port'));        // 3000 或 8080（取决于环境）
console.log(config.get('database.host'));   // "localhost" 或 "prod-db-server"
console.log(config.get('api.key', 'none')); // "none"（默认值）
```

### 案例 3: 工具函数模块

```javascript
// utils/string.js
exports.capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

exports.truncate = function(str, length = 50) {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

exports.slugify = function(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
```

```javascript
// utils/array.js
exports.chunk = function(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

exports.unique = function(array) {
  return [...new Set(array)];
};

exports.shuffle = function(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
```

```javascript
// utils/index.js
const string = require('./string');
const array = require('./array');

module.exports = {
  string,
  array,

  // 也可以展开导出
  ...string,
  ...array
};
```

```javascript
// 使用工具函数
const utils = require('./utils');

console.log(utils.string.capitalize('hello')); // "Hello"
console.log(utils.array.unique([1, 2, 2, 3])); // [1, 2, 3]

// 或者
const { capitalize, unique } = require('./utils');
console.log(capitalize('world'));  // "World"
console.log(unique([1, 1, 2, 3])); // [1, 2, 3]
```

### 案例 4: 中间件模块（Express）

```javascript
// middlewares/auth.js
const jwt = require('jsonwebtoken');
const config = require('../config');

// 身份验证中间件
exports.authenticate = function(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '未提供认证令牌' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwt.secret'));
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: '无效的令牌' });
  }
};

// 角色检查中间件
exports.requireRole = function(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: '未认证' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: '权限不足' });
    }

    next();
  };
};
```

```javascript
// middlewares/logger.js
const fs = require('fs');
const path = require('path');

class RequestLogger {
  constructor(logDir = './logs') {
    this.logDir = logDir;
    this.ensureLogDir();
  }

  ensureLogDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  middleware() {
    return (req, res, next) => {
      const start = Date.now();

      // 响应结束时记录
      res.on('finish', () => {
        const duration = Date.now() - start;
        const log = {
          timestamp: new Date().toISOString(),
          method: req.method,
          url: req.url,
          status: res.statusCode,
          duration: `${duration}ms`,
          userAgent: req.get('user-agent')
        };

        this.writeLog(log);
      });

      next();
    };
  }

  writeLog(log) {
    const logFile = path.join(
      this.logDir,
      `${new Date().toISOString().split('T')[0]}.log`
    );

    const logLine = JSON.stringify(log) + '\n';
    fs.appendFile(logFile, logLine, (err) => {
      if (err) console.error('写入日志失败:', err);
    });
  }
}

module.exports = new RequestLogger();
```

```javascript
// middlewares/index.js
const auth = require('./auth');
const logger = require('./logger');

module.exports = {
  auth,
  logger: logger.middleware()
};
```

```javascript
// 使用中间件
const express = require('express');
const middlewares = require('./middlewares');

const app = express();

// 全局中间件
app.use(middlewares.logger);

// 路由中间件
app.get('/public', (req, res) => {
  res.json({ message: '公开接口' });
});

app.get('/protected',
  middlewares.auth.authenticate,
  (req, res) => {
    res.json({ message: '受保护的接口', user: req.user });
  }
);

app.get('/admin',
  middlewares.auth.authenticate,
  middlewares.auth.requireRole('admin'),
  (req, res) => {
    res.json({ message: '管理员接口' });
  }
);

app.listen(3000);
```

### 案例 5: 插件系统

```javascript
// plugin-system/PluginManager.js
const fs = require('fs');
const path = require('path');

class PluginManager {
  constructor(pluginDir) {
    this.pluginDir = pluginDir;
    this.plugins = new Map();
  }

  loadPlugins() {
    if (!fs.existsSync(this.pluginDir)) {
      console.log('插件目录不存在');
      return;
    }

    const files = fs.readdirSync(this.pluginDir);

    for (const file of files) {
      if (file.endsWith('.js')) {
        this.loadPlugin(file);
      }
    }

    console.log(`已加载 ${this.plugins.size} 个插件`);
  }

  loadPlugin(filename) {
    const pluginPath = path.join(this.pluginDir, filename);
    const pluginName = path.basename(filename, '.js');

    try {
      const plugin = require(pluginPath);

      // 验证插件接口
      if (typeof plugin.init !== 'function') {
        throw new Error('插件必须导出 init 方法');
      }

      this.plugins.set(pluginName, plugin);
      console.log(`插件 "${pluginName}" 已加载`);
    } catch (err) {
      console.error(`加载插件 "${pluginName}" 失败:`, err.message);
    }
  }

  initPlugins(app) {
    for (const [name, plugin] of this.plugins) {
      try {
        plugin.init(app);
        console.log(`插件 "${name}" 已初始化`);
      } catch (err) {
        console.error(`初始化插件 "${name}" 失败:`, err.message);
      }
    }
  }

  getPlugin(name) {
    return this.plugins.get(name);
  }

  hasPlugin(name) {
    return this.plugins.has(name);
  }
}

module.exports = PluginManager;
```

```javascript
// plugins/hello-plugin.js
exports.name = 'Hello Plugin';
exports.version = '1.0.0';

exports.init = function(app) {
  console.log('Hello Plugin 初始化中...');

  // 添加路由
  app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from plugin!' });
  });

  // 添加中间件
  app.use((req, res, next) => {
    console.log(`[Hello Plugin] ${req.method} ${req.url}`);
    next();
  });
};

exports.cleanup = function() {
  console.log('Hello Plugin 清理中...');
};
```

```javascript
// plugins/analytics-plugin.js
const analytics = {
  requests: 0,
  errors: 0
};

exports.init = function(app) {
  // 请求统计中间件
  app.use((req, res, next) => {
    analytics.requests++;
    next();
  });

  // 错误统计
  app.use((err, req, res, next) => {
    analytics.errors++;
    next(err);
  });

  // 统计接口
  app.get('/analytics', (req, res) => {
    res.json(analytics);
  });
};
```

```javascript
// app.js
const express = require('express');
const PluginManager = require('./plugin-system/PluginManager');

const app = express();

// 创建插件管理器
const pluginManager = new PluginManager('./plugins');

// 加载和初始化插件
pluginManager.loadPlugins();
pluginManager.initPlugins(app);

app.listen(3000, () => {
  console.log('服务器已启动在端口 3000');
});
```

## 8. 模块设计最佳实践

### 8.1 单一职责原则

每个模块只负责一个功能领域。

```javascript
// ❌ 不好：一个模块做太多事情
// userModule.js
exports.createUser = () => { /*...*/ };
exports.sendEmail = () => { /*...*/ };
exports.uploadFile = () => { /*...*/ };

// ✅ 好：分离职责
// users.js
exports.createUser = () => { /*...*/ };

// email.js
exports.sendEmail = () => { /*...*/ };

// fileUpload.js
exports.uploadFile = () => { /*...*/ };
```

### 8.2 避免循环依赖

```javascript
// ❌ 不好：循环依赖
// a.js
const b = require('./b');
exports.doA = () => b.doB();

// b.js
const a = require('./a');
exports.doB = () => a.doA();

// ✅ 好：提取共享逻辑到第三个模块
// shared.js
exports.sharedLogic = () => { /*...*/ };

// a.js
const shared = require('./shared');
exports.doA = () => shared.sharedLogic();

// b.js
const shared = require('./shared');
exports.doB = () => shared.sharedLogic();
```

### 8.3 使用索引文件

```javascript
// utils/index.js
module.exports = {
  string: require('./string'),
  array: require('./array'),
  date: require('./date'),
  validation: require('./validation')
};

// 使用时更简洁
const { string, array } = require('./utils');
```

### 8.4 文档化模块接口

```javascript
/**
 * 用户服务模块
 * @module services/userService
 */

/**
 * 创建新用户
 * @param {Object} userData - 用户数据
 * @param {string} userData.name - 用户名
 * @param {string} userData.email - 邮箱
 * @returns {Promise<Object>} 创建的用户对象
 */
exports.createUser = async function(userData) {
  // 实现...
};

/**
 * 根据 ID 获取用户
 * @param {number} id - 用户 ID
 * @returns {Promise<Object|null>} 用户对象或 null
 */
exports.getUserById = async function(id) {
  // 实现...
};
```

### 8.5 使用命名空间

```javascript
// database/index.js
const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');

module.exports = {
  users,
  posts,
  comments
};

// 使用
const db = require('./database');
db.users.findAll();
db.posts.findByUser(userId);
```

## 9. 总结

### 核心要点

1. **模块化是 Node.js 的基石**: 每个文件都是一个模块
2. **两种模块系统**: CommonJS (传统) 和 ES6 Modules (现代)
3. **模块类型**: 核心模块、文件模块、第三方模块
4. **模块缓存**: 模块只在首次加载时执行，后续从缓存读取
5. **设计原则**: 单一职责、避免循环依赖、清晰的接口

### 选择建议

- **新项目**: 优先使用 ES6 模块
- **库开发**: 考虑兼容性，可能需要支持 CommonJS
- **Node.js 项目**: CommonJS 依然是主流
- **现代化项目**: ES6 模块 + TypeScript

### 进阶学习

- 模块打包工具: Webpack, Rollup, esbuild
- TypeScript 模块系统
- 微前端模块联邦
- 动态模块加载和代码分割
