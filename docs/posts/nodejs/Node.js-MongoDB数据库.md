---
title: Node.js + MongoDB 生产级最佳实践指南
date: 2025-11-22
categories:
  - Node.js 深入学习
tags:
  - Node.js
  - MongoDB
  - 数据库
  - Mongoose
---

# Node.js MongoDB 数据库

## 1. MongoDB 简介

MongoDB 是一个基于文档的 NoSQL 数据库，使用 JSON 格式存储数据，与 Node.js 配合使用非常方便。

### 1.1 特点

- **文档型数据库**: 使用 BSON (Binary JSON) 格式存储
- **无模式 (Schema-less)**: 灵活的数据结构
- **高性能**: 支持索引和查询优化
- **可扩展**: 支持水平扩展（分片）
- **丰富的查询**: 支持复杂查询、聚合等

### 1.2 核心概念

| MongoDB | 关系型数据库 | 说明 |
|---------|------------|------|
| Database | Database | 数据库 |
| Collection | Table | 集合/表 |
| Document | Row | 文档/行 |
| Field | Column | 字段/列 |
| Index | Index | 索引 |

### 1.3 安装 MongoDB

```bash
# Windows
# 从官网下载安装: https://www.mongodb.com/try/download/community

# macOS (使用 Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Linux (Ubuntu)
sudo apt-get install mongodb

# 启动 MongoDB
mongod

# 连接 MongoDB Shell
mongo
```

## 2. 使用 MongoDB 驱动

### 2.1 安装

```bash
# 安装官方 MongoDB 驱动
npm install mongodb

# 或使用 Mongoose (推荐)
npm install mongoose
```

### 2.2 连接数据库 (原生驱动)

```javascript
const { MongoClient } = require('mongodb');  // 导入MongoDB客户端

// 连接 URL (格式: mongodb://主机:端口)
const url = 'mongodb://localhost:27017';  // 本地MongoDB服务器,默认端口27017
const dbName = 'myapp';  // 要连接的数据库名称

// 创建客户端实例
const client = new MongoClient(url);

async function main() {
  try {
    // 连接到服务器(异步操作,返回Promise)
    await client.connect();
    console.log('成功连接到 MongoDB');  // 输出: 成功连接到 MongoDB

    const db = client.db(dbName);  // 获取数据库实例
    const collection = db.collection('users');  // 获取集合(类似关系型数据库的表)

    // 执行操作...
    // 在这里可以执行插入、查询、更新、删除等操作

  } catch (err) {
    console.error('连接错误:', err);  // 捕获并输出连接错误
  } finally {
    // 关闭连接(释放资源,避免内存泄漏)
    await client.close();
  }
}

main();  // 执行主函数
```

> ⚠️ **注意事项**:
> - **连接池**: MongoClient会自动创建连接池,不需要每次操作都创建新客户端
> - **关闭连接**: 应在应用退出时关闭连接,不要每次操作后都关闭
> - **错误处理**: 必须使用try-catch捕获异步操作的错误
> - **URL格式**: 完整格式为 `mongodb://[username:password@]host:port/[database][?options]`
> - **数据库自动创建**: 如果指定的数据库不存在,MongoDB会在首次插入数据时自动创建
> - **集合自动创建**: 如果集合不存在,在首次插入文档时会自动创建
>
> ```javascript
> // 常见错误:每次操作都创建新连接
> async function badExample() {
>   const client = new MongoClient(url);
>   await client.connect();
>   await client.db('test').collection('users').findOne();
>   await client.close();  // ❌ 频繁连接和关闭,性能差
> }
>
> // 正确做法:复用连接
> const client = new MongoClient(url);
> await client.connect();  // 应用启动时连接一次
>
> async function goodExample() {
>   const users = await client.db('test').collection('users').find().toArray();
>   // ✅ 复用已建立的连接
> }
>
> // 应用退出时关闭
> process.on('SIGINT', async () => {
>   await client.close();
>   process.exit(0);
> });
>
> // 带认证的连接URL
> const authUrl = 'mongodb://admin:password@localhost:27017/myapp?authSource=admin';
>
> // 连接MongoDB Atlas(云服务)
> const atlasUrl = 'mongodb+srv://username:password@cluster0.mongodb.net/myapp?retryWrites=true&w=majority';
> ```
>
> 🎯 **实际应用场景**:
> ```javascript
> // 场景1:Express应用中复用连接
> // db.js
> const { MongoClient } = require('mongodb');
> const url = 'mongodb://localhost:27017';
> let db = null;
>
> async function connectDB() {
>   if (db) return db;  // 已连接则返回现有实例
>
>   const client = new MongoClient(url);
>   await client.connect();
>   db = client.db('myapp');
>   console.log('数据库已连接');
>   return db;
> }
>
> module.exports = { connectDB };
>
> // app.js
> const express = require('express');
> const { connectDB } = require('./db');
> const app = express();
>
> app.get('/users', async (req, res) => {
>   const db = await connectDB();
>   const users = await db.collection('users').find().toArray();
>   res.json(users);
> });
>
> // 场景2:环境配置管理
> const config = {
>   development: {
>     url: 'mongodb://localhost:27017',
>     dbName: 'myapp_dev'
>   },
>   production: {
>     url: process.env.MONGODB_URI,
>     dbName: 'myapp_prod'
>   }
> };
>
> const env = process.env.NODE_ENV || 'development';
> const { url, dbName } = config[env];
>
> // 场景3:连接池配置
> const client = new MongoClient(url, {
>   maxPoolSize: 50,           // 最大连接数
>   minPoolSize: 10,           // 最小连接数
>   maxIdleTimeMS: 30000,      // 连接最大空闲时间
>   serverSelectionTimeoutMS: 5000,  // 服务器选择超时
>   socketTimeoutMS: 45000     // Socket超时时间
> });
>
> // 场景4:健康检查
> async function checkDBHealth() {
>   try {
>     await client.db('admin').command({ ping: 1 });
>     console.log('数据库连接正常');
>     return true;
>   } catch (err) {
>     console.error('数据库连接异常:', err);
>     return false;
>   }
> }
>
> // 场景5:优雅关闭
> const gracefulShutdown = async (signal) => {
>   console.log(`\n收到${signal}信号,正在关闭数据库连接...`);
>   await client.close();
>   console.log('数据库连接已关闭');
>   process.exit(0);
> };
>
> process.on('SIGINT', () => gracefulShutdown('SIGINT'));
> process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
> ```

### 2.3 CRUD 操作 (原生驱动)

```javascript
const { MongoClient, ObjectId } = require('mongodb');  // ObjectId用于操作MongoDB的_id字段

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function crudOperations() {
  try {
    await client.connect();
    const db = client.db('myapp');
    const users = db.collection('users');  // 获取users集合的引用

    // ========== CREATE 创建 ==========

    // 插入单个文档
    const insertResult = await users.insertOne({
      name: 'Alice',
      email: 'alice@example.com',
      age: 25,
      createdAt: new Date()  // 自动添加创建时间
    });
    console.log('插入的文档 ID:', insertResult.insertedId);
    // 输出: 插入的文档 ID: 507f1f77bcf86cd799439011 (自动生成的ObjectId)

    // 插入多个文档
    const insertManyResult = await users.insertMany([
      { name: 'Bob', email: 'bob@example.com', age: 30 },
      { name: 'Charlie', email: 'charlie@example.com', age: 35 }
    ]);
    console.log('插入的文档数:', insertManyResult.insertedCount);
    // 输出: 插入的文档数: 2

    // ========== READ 读取 ==========

    // 查找所有文档
    const allUsers = await users.find({}).toArray();  // find({})表示无条件查询,toArray()将游标转为数组
    console.log('所有用户:', allUsers);
    // 输出: 所有用户: [{_id: ..., name: 'Alice', ...}, {_id: ..., name: 'Bob', ...}]

    // 查找单个文档
    const user = await users.findOne({ name: 'Alice' });  // findOne返回第一个匹配的文档
    console.log('找到的用户:', user);
    // 输出: 找到的用户: {_id: ..., name: 'Alice', email: 'alice@example.com', age: 25}

    // 条件查询
    const adults = await users.find({ age: { $gte: 18 } }).toArray();  // $gte表示大于等于
    console.log('成年用户:', adults);
    // 输出: 成年用户: [{name: 'Alice', age: 25}, {name: 'Bob', age: 30}, ...]

    // 查询并排序
    const sortedUsers = await users
      .find({})
      .sort({ age: -1 })  // -1 降序(从大到小), 1 升序(从小到大)
      .toArray();
    // 输出结果按age降序排列

    // 查询并限制数量
    const limitedUsers = await users
      .find({})
      .limit(10)    // 最多返回10条
      .skip(0)      // 跳过前0个(用于分页)
      .toArray();
    // 分页示例: skip(20).limit(10) 表示跳过前20条,取第21-30条

    // 查询特定字段（投影）
    const userNames = await users
      .find({}, { projection: { name: 1, email: 1, _id: 0 } })  // 1表示包含,0表示排除
      .toArray();
    // 输出: [{name: 'Alice', email: 'alice@example.com'}, ...] (不包含_id字段)

    // ========== UPDATE 更新 ==========

    // 更新单个文档
    const updateResult = await users.updateOne(
      { name: 'Alice' },           // 查询条件
      { $set: { age: 26, updatedAt: new Date() } }  // $set操作符用于设置字段值
    );
    console.log('修改的文档数:', updateResult.modifiedCount);
    // 输出: 修改的文档数: 1

    // 更新多个文档
    const updateManyResult = await users.updateMany(
      { age: { $lt: 30 } },        // 年龄小于30的所有文档
      { $set: { category: 'young' } }  // 添加category字段
    );
    console.log('修改的文档数:', updateManyResult.modifiedCount);
    // 输出: 修改的文档数: 2 (假设有2个文档age<30)

    // 替换文档
    const replaceResult = await users.replaceOne(
      { name: 'Bob' },  // 查询条件
      { name: 'Bob Smith', email: 'bob.smith@example.com', age: 31 }  // 完全替换(不保留原有字段)
    );
    // ⚠️ replaceOne会替换整个文档,除了_id字段

    // ========== DELETE 删除 ==========

    // 删除单个文档
    const deleteResult = await users.deleteOne({ name: 'Charlie' });  // 删除第一个匹配的文档
    console.log('删除的文档数:', deleteResult.deletedCount);
    // 输出: 删除的文档数: 1

    // 删除多个文档
    const deleteManyResult = await users.deleteMany({ age: { $lt: 25 } });  // 删除所有age<25的文档
    console.log('删除的文档数:', deleteManyResult.deletedCount);
    // 输出: 删除的文档数: 0 (如果没有age<25的文档)

  } finally {
    await client.close();
  }
}

crudOperations();
```

> ⚠️ **注意事项**:
> - **异步操作**: 所有MongoDB操作都返回Promise,必须使用await或.then()
> - **查询游标**: find()返回游标,需要.toArray()转换为数组
> - **_id字段**: MongoDB自动为每个文档生成唯一的_id字段(ObjectId类型)
> - **更新操作符**: 必须使用$set、$inc等操作符,直接传对象会报错
> - **投影字段**: projection中1表示包含,0表示排除,不能混用(除了_id可以单独排除)
> - **删除操作**: deleteOne/deleteMany是永久删除,无法恢复,慎用
> - **性能考虑**: 大量数据查询时使用skip()会影响性能,建议使用基于_id的分页
>
> ```javascript
> // 常见错误:更新时忘记使用$set
> await users.updateOne(
>   { name: 'Alice' },
>   { age: 26 }  // ❌ 错误:会替换整个文档
> );
>
> await users.updateOne(
>   { name: 'Alice' },
>   { $set: { age: 26 } }  // ✅ 正确:使用$set操作符
> );
>
> // 常见错误:投影字段混用包含和排除
> const users = await collection.find({}, {
>   projection: { name: 1, age: 0 }  // ❌ 错误:不能混用1和0
> }).toArray();
>
> const users = await collection.find({}, {
>   projection: { name: 1, email: 1, _id: 0 }  // ✅ 正确:_id可以单独排除
> }).toArray();
>
> // 常见错误:忘记toArray()
> const users = await collection.find({});  // ❌ 返回游标对象,不是数组
> console.log(users);  // Cursor {...}
>
> const users = await collection.find({}).toArray();  // ✅ 转换为数组
> console.log(users);  // [{...}, {...}, ...]
>
> // 性能问题:大数据量分页使用skip()
> const page = 1000;
> const pageSize = 10;
> const users = await collection
>   .find({})
>   .skip(page * pageSize)  // ❌ 跳过10000条,性能差
>   .limit(pageSize)
>   .toArray();
>
> // ✅ 基于_id的分页(更高效)
> const lastId = '507f1f77bcf86cd799439011';  // 上一页最后一个文档的_id
> const users = await collection
>   .find({ _id: { $gt: new ObjectId(lastId) } })
>   .limit(pageSize)
>   .toArray();
> ```
>
> 🎯 **实际应用场景**:
> ```javascript
> // 场景1:用户注册功能
> async function registerUser(userData) {
>   const db = await connectDB();
>   const users = db.collection('users');
>
>   // 检查邮箱是否已存在
>   const existing = await users.findOne({ email: userData.email });
>   if (existing) {
>     throw new Error('邮箱已被注册');
>   }
>
>   // 插入新用户
>   const result = await users.insertOne({
>     ...userData,
>     password: await hashPassword(userData.password),  // 密码加密
>     createdAt: new Date(),
>     status: 'active'
>   });
>
>   return result.insertedId;
> }
>
> // 场景2:博客文章列表分页
> async function getArticles(page = 1, pageSize = 10) {
>   const db = await connectDB();
>   const articles = db.collection('articles');
>
>   // 计算总数
>   const total = await articles.countDocuments({ published: true });
>
>   // 分页查询
>   const list = await articles
>     .find({ published: true })
>     .sort({ createdAt: -1 })  // 最新文章在前
>     .skip((page - 1) * pageSize)
>     .limit(pageSize)
>     .project({ title: 1, summary: 1, author: 1, createdAt: 1 })  // 只返回需要的字段
>     .toArray();
>
>   return {
>     list,
>     total,
>     page,
>     pageSize,
>     totalPages: Math.ceil(total / pageSize)
>   };
> }
>
> // 场景3:文章浏览量增加
> async function incrementViews(articleId) {
>   const db = await connectDB();
>   const articles = db.collection('articles');
>
>   // 使用$inc操作符原子性地增加浏览量
>   const result = await articles.updateOne(
>     { _id: new ObjectId(articleId) },
>     {
>       $inc: { views: 1 },  // 浏览量+1
>       $set: { lastViewedAt: new Date() }  // 记录最后浏览时间
>     }
>   );
>
>   return result.modifiedCount > 0;
> }
>
> // 场景4:批量更新文章状态
> async function publishArticles(articleIds) {
>   const db = await connectDB();
>   const articles = db.collection('articles');
>
>   // 批量更新多个文档
>   const result = await articles.updateMany(
>     { _id: { $in: articleIds.map(id => new ObjectId(id)) } },  // 匹配多个_id
>     {
>       $set: {
>         published: true,
>         publishedAt: new Date()
>       }
>     }
>   );
>
>   return result.modifiedCount;
> }
>
> // 场景5:搜索功能(多条件查询)
> async function searchProducts(filters) {
>   const db = await connectDB();
>   const products = db.collection('products');
>
>   // 构建查询条件
>   const query = {};
>
>   if (filters.keyword) {
>     query.$or = [  // 多字段模糊搜索
>       { name: { $regex: filters.keyword, $options: 'i' } },  // 不区分大小写
>       { description: { $regex: filters.keyword, $options: 'i' } }
>     ];
>   }
>
>   if (filters.category) {
>     query.category = filters.category;
>   }
>
>   if (filters.minPrice || filters.maxPrice) {
>     query.price = {};
>     if (filters.minPrice) query.price.$gte = filters.minPrice;
>     if (filters.maxPrice) query.price.$lte = filters.maxPrice;
>   }
>
>   if (filters.inStock) {
>     query.stock = { $gt: 0 };
>   }
>
>   // 执行查询
>   const products = await products
>     .find(query)
>     .sort({ [filters.sortBy || 'createdAt']: filters.sortOrder === 'asc' ? 1 : -1 })
>     .limit(filters.limit || 20)
>     .toArray();
>
>   return products;
> }
> ```


## 3. Mongoose ODM

Mongoose 是 MongoDB 的对象数据模型 (ODM)，提供了模式定义、验证、类型转换等功能。

### 3.1 连接数据库

```javascript
const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 监听连接事件
const db = mongoose.connection;

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', () => {
  console.log('已连接到 MongoDB');
});

// 优雅关闭
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB 连接已关闭');
  process.exit(0);
});
```

### 3.2 定义模式 (Schema)

```javascript
const mongoose = require('mongoose');

// 定义用户模式
const userSchema = new mongoose.Schema({
  // 基本类型
  name: {
    type: String,
    required: [true, '姓名是必需的'],
    trim: true,
    minlength: [2, '姓名至少2个字符'],
    maxlength: [50, '姓名最多50个字符']
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, '请输入有效的邮箱']
  },

  age: {
    type: Number,
    min: [0, '年龄不能为负数'],
    max: [150, '年龄不能超过150']
  },

  // 枚举
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },

  // 布尔值
  isActive: {
    type: Boolean,
    default: true
  },

  // 数组
  tags: [String],

  hobbies: [{
    type: String,
    trim: true
  }],

  // 嵌套对象
  address: {
    street: String,
    city: String,
    zipCode: String,
    country: {
      type: String,
      default: 'USA'
    }
  },

  // 引用其他文档
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],

  // 日期
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: Date

}, {
  // Schema 选项
  timestamps: true, // 自动添加 createdAt 和 updatedAt
  collection: 'users' // 指定集合名称
});

// 创建模型
const User = mongoose.model('User', userSchema);

module.exports = User;
```

### 3.3 模式类型

```javascript
const schema = new mongoose.Schema({
  // 字符串
  name: String,

  // 数字
  age: Number,

  // 布尔值
  isActive: Boolean,

  // 日期
  birthday: Date,

  // Buffer
  data: Buffer,

  // ObjectId
  userId: mongoose.Schema.Types.ObjectId,

  // Mixed (任意类型)
  metadata: mongoose.Schema.Types.Mixed,

  // 数组
  tags: [String],
  numbers: [Number],

  // Decimal128 (高精度数字)
  price: mongoose.Schema.Types.Decimal128,

  // Map
  socialProfiles: {
    type: Map,
    of: String
  }
});
```

### 3.4 CRUD 操作 (Mongoose)

```javascript
const mongoose = require('mongoose');
const User = require('./models/User');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/myapp');

async function mongooseOperations() {
  try {
    // ========== CREATE 创建 ==========

    // 方式 1: 使用 new 和 save()
    const user1 = new User({
      name: 'Alice',
      email: 'alice@example.com',
      age: 25,
      role: 'user',
      tags: ['javascript', 'mongodb']
    });
    await user1.save();
    console.log('用户已保存:', user1);

    // 方式 2: 使用 create()
    const user2 = await User.create({
      name: 'Bob',
      email: 'bob@example.com',
      age: 30
    });
    console.log('用户已创建:', user2);

    // 批量创建
    const users = await User.insertMany([
      { name: 'Charlie', email: 'charlie@example.com', age: 35 },
      { name: 'David', email: 'david@example.com', age: 28 }
    ]);
    console.log('批量创建:', users.length, '个用户');

    // ========== READ 读取 ==========

    // 查找所有
    const allUsers = await User.find();
    console.log('所有用户:', allUsers);

    // 条件查询
    const activeUsers = await User.find({ isActive: true });

    // 查询单个
    const user = await User.findOne({ email: 'alice@example.com' });
    console.log('找到的用户:', user);

    // 通过 ID 查询
    const userById = await User.findById('507f1f77bcf86cd799439011');

    // 链式查询
    const results = await User
      .find({ age: { $gte: 18 } })
      .where('isActive').equals(true)
      .select('name email age') // 选择字段
      .sort({ age: -1 })        // 排序
      .limit(10)                // 限制数量
      .skip(0)                  // 跳过
      .exec();

    // 计数
    const count = await User.countDocuments({ role: 'admin' });

    // 是否存在
    const exists = await User.exists({ email: 'test@example.com' });

    // ========== UPDATE 更新 ==========

    // 查找并更新
    const updated1 = await User.findOneAndUpdate(
      { email: 'alice@example.com' },
      { $set: { age: 26 } },
      { new: true } // 返回更新后的文档
    );

    // 通过 ID 更新
    const updated2 = await User.findByIdAndUpdate(
      user1._id,
      { $set: { age: 27 } },
      { new: true, runValidators: true } // 运行验证器
    );

    // 更新多个
    const updateResult = await User.updateMany(
      { age: { $lt: 30 } },
      { $set: { category: 'young' } }
    );
    console.log('修改了', updateResult.modifiedCount, '个文档');

    // 使用 save() 更新
    user1.age = 28;
    user1.tags.push('express');
    await user1.save();

    // ========== DELETE 删除 ==========

    // 查找并删除
    const deleted1 = await User.findOneAndDelete({ name: 'Charlie' });

    // 通过 ID 删除
    const deleted2 = await User.findByIdAndDelete(user2._id);

    // 删除多个
    const deleteResult = await User.deleteMany({ isActive: false });
    console.log('删除了', deleteResult.deletedCount, '个文档');

  } catch (err) {
    console.error('操作错误:', err);
  } finally {
    await mongoose.connection.close();
  }
}

mongooseOperations();
```

### 3.5 查询操作符

```javascript
// 比较操作符
User.find({ age: { $eq: 25 } });      // 等于
User.find({ age: { $ne: 25 } });      // 不等于
User.find({ age: { $gt: 25 } });      // 大于
User.find({ age: { $gte: 25 } });     // 大于等于
User.find({ age: { $lt: 30 } });      // 小于
User.find({ age: { $lte: 30 } });     // 小于等于
User.find({ age: { $in: [20, 25, 30] } }); // 在数组中
User.find({ age: { $nin: [20, 25] } }); // 不在数组中

// 逻辑操作符
User.find({ $and: [{ age: { $gte: 18 } }, { isActive: true }] });
User.find({ $or: [{ role: 'admin' }, { role: 'moderator' }] });
User.find({ $nor: [{ age: { $lt: 18 } }, { isActive: false }] });
User.find({ age: { $not: { $lt: 18 } } });

// 元素操作符
User.find({ address: { $exists: true } }); // 字段存在
User.find({ age: { $type: 'number' } });   // 类型检查

// 数组操作符
User.find({ tags: { $all: ['javascript', 'mongodb'] } }); // 包含所有
User.find({ tags: 'javascript' });                        // 包含元素
User.find({ tags: { $size: 3 } });                        // 数组大小

// 正则表达式
User.find({ name: /^A/i });                // 以 A 开头（不区分大小写）
User.find({ email: { $regex: '@gmail.com$' } }); // 邮箱结尾

// 文本搜索（需要创建文本索引）
User.find({ $text: { $search: 'alice bob' } });
```

### 3.6 实例方法和静态方法

```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// ========== 实例方法 ==========
// 在文档实例上调用

userSchema.methods.getFullInfo = function() {
  return `${this.name} (${this.email})`;
};

userSchema.methods.isAdult = function() {
  return this.age >= 18;
};

// ========== 静态方法 ==========
// 在模型上调用

userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

userSchema.statics.findAdults = function() {
  return this.find({ age: { $gte: 18 } });
};

const User = mongoose.model('User', userSchema);

// 使用
async function example() {
  const user = await User.findOne({ name: 'Alice' });

  // 调用实例方法
  console.log(user.getFullInfo());
  console.log('是成年人?', user.isAdult());

  // 调用静态方法
  const userByEmail = await User.findByEmail('alice@example.com');
  const adults = await User.findAdults();
}
```

### 3.7 虚拟属性

```javascript
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
});

// 定义虚拟属性（不存储在数据库中）
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual('fullName').set(function(name) {
  const parts = name.split(' ');
  this.firstName = parts[0];
  this.lastName = parts[1];
});

// 在 JSON 输出中包含虚拟属性
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = mongoose.model('User', userSchema);

// 使用
const user = new User({
  firstName: 'John',
  lastName: 'Doe'
});

console.log(user.fullName); // "John Doe"

user.fullName = 'Jane Smith';
console.log(user.firstName); // "Jane"
console.log(user.lastName);  // "Smith"
```

### 3.8 中间件 (Hooks)

```javascript
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date
});

// ========== Pre Hook (前置钩子) ==========

// 保存前执行
userSchema.pre('save', function(next) {
  console.log('准备保存文档...');

  // 更新时间戳
  this.updatedAt = Date.now();

  if (this.isNew) {
    this.createdAt = Date.now();
  }

  next();
});

// 异步钩子
userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    const bcrypt = require('bcrypt');
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// 查询前执行
userSchema.pre('find', function() {
  console.log('准备查询...');
  this.where({ isActive: true }); // 自动添加条件
});

// ========== Post Hook (后置钩子) ==========

// 保存后执行
userSchema.post('save', function(doc) {
  console.log('文档已保存:', doc._id);
});

// 删除后执行
userSchema.post('remove', function(doc) {
  console.log('文档已删除:', doc._id);
  // 可以在这里清理相关数据
});

// 错误处理钩子
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('邮箱已存在'));
  } else {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);
```

## 4. 关系和引用

### 4.1 嵌入式文档

```javascript
// 适用于一对少量的关系
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  addresses: [{
    street: String,
    city: String,
    zipCode: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }]
});

const User = mongoose.model('User', userSchema);

// 使用
const user = new User({
  name: 'Alice',
  email: 'alice@example.com',
  addresses: [
    { street: '123 Main St', city: 'Boston', zipCode: '02101', isPrimary: true },
    { street: '456 Oak Ave', city: 'Cambridge', zipCode: '02139' }
  ]
});

await user.save();

// 添加地址
user.addresses.push({ street: '789 Elm St', city: 'Somerville', zipCode: '02144' });
await user.save();
```

### 4.2 引用 (Population)

```javascript
// User 模型
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

// Post 模型
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // 引用 User 模型
    required: true
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema);

// 创建数据
async function createData() {
  const user = await User.create({
    name: 'Alice',
    email: 'alice@example.com'
  });

  const post = await Post.create({
    title: '我的第一篇博客',
    content: '这是内容...',
    author: user._id
  });
}

// 填充引用（Population）
async function getPosts() {
  // 基本填充
  const posts = await Post.find().populate('author');
  console.log(posts[0].author.name); // 'Alice'

  // 选择字段
  const posts2 = await Post.find()
    .populate('author', 'name email -_id');

  // 多层填充
  const posts3 = await Post.find()
    .populate({
      path: 'author',
      select: 'name email'
    })
    .populate({
      path: 'comments.user',
      select: 'name'
    });

  // 条件填充
  const posts4 = await Post.find()
    .populate({
      path: 'author',
      match: { isActive: true },
      select: 'name email'
    });
}
```

## 5. 索引

### 5.1 创建索引

```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,      // 唯一索引
    index: true        // 普通索引
  },

  username: {
    type: String,
    unique: true,
    sparse: true       // 稀疏索引（允许null）
  },

  firstName: String,
  lastName: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'  // 地理空间索引
    }
  }
});

// 复合索引
userSchema.index({ firstName: 1, lastName: 1 });

// 文本索引
userSchema.index({ firstName: 'text', lastName: 'text' });

// TTL 索引（自动删除过期文档）
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const User = mongoose.model('User', userSchema);

// 手动创建索引
User.createIndexes();
```

### 5.2 查看和管理索引

```javascript
// 获取所有索引
const indexes = await User.collection.getIndexes();
console.log(indexes);

// 删除索引
await User.collection.dropIndex('email_1');

// 删除所有索引（除了 _id）
await User.collection.dropIndexes();

// 重建索引
await User.syncIndexes();
```

## 6. 聚合 (Aggregation)

```javascript
const Order = mongoose.model('Order', new mongoose.Schema({
  product: String,
  quantity: Number,
  price: Number,
  customer: String,
  createdAt: { type: Date, default: Date.now }
}));

async function aggregationExamples() {
  // 基本聚合
  const results = await Order.aggregate([
    // $match - 过滤文档
    { $match: { quantity: { $gte: 10 } } },

    // $group - 分组
    {
      $group: {
        _id: '$product',
        totalQuantity: { $sum: '$quantity' },
        totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
        avgPrice: { $avg: '$price' },
        count: { $sum: 1 }
      }
    },

    // $sort - 排序
    { $sort: { totalRevenue: -1 } },

    // $limit - 限制结果
    { $limit: 10 },

    // $project - 选择/重命名字段
    {
      $project: {
        product: '$_id',
        totalQuantity: 1,
        totalRevenue: 1,
        avgPrice: { $round: ['$avgPrice', 2] },
        _id: 0
      }
    }
  ]);

  console.log(results);

  // 更复杂的聚合
  const salesByMonth = await Order.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        totalSales: { $sum: { $multiply: ['$quantity', '$price'] } },
        orderCount: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.year': -1, '_id.month': -1 }
    },
    {
      $project: {
        date: {
          $concat: [
            { $toString: '$_id.year' },
            '-',
            { $toString: '$_id.month' }
          ]
        },
        totalSales: 1,
        orderCount: 1,
        avgOrderValue: { $divide: ['$totalSales', '$orderCount'] }
      }
    }
  ]);

  // $lookup - 关联查询（类似 SQL JOIN）
  const ordersWithCustomers = await Order.aggregate([
    {
      $lookup: {
        from: 'customers',
        localField: 'customer',
        foreignField: '_id',
        as: 'customerInfo'
      }
    },
    {
      $unwind: '$customerInfo' // 展开数组
    }
  ]);
}
```

## 7. 实战案例

### 案例 1: 完整的用户系统

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 用户模式
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    bio: String,
    dateOfBirth: Date
  },

  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },

  isActive: {
    type: Boolean,
    default: true
  },

  lastLogin: Date,

  refreshTokens: [String]

}, {
  timestamps: true
});

// 密码加密（保存前）
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 验证密码
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// 生成访问令牌
userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
};

// 生成刷新令牌
userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

// 获取公开信息
userSchema.methods.toPublicJSON = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    profile: this.profile,
    role: this.role,
    createdAt: this.createdAt
  };
};

// 静态方法：通过邮箱查找
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
```

```javascript
// 使用用户模型
const User = require('./models/User');

// 注册用户
async function registerUser(userData) {
  try {
    const user = new User(userData);
    await user.save();

    return {
      success: true,
      user: user.toPublicJSON()
    };
  } catch (err) {
    if (err.code === 11000) {
      return { success: false, error: '用户名或邮箱已存在' };
    }
    return { success: false, error: err.message };
  }
}

// 登录
async function loginUser(email, password) {
  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return { success: false, error: '用户不存在' };
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return { success: false, error: '密码错误' };
    }

    // 更新最后登录时间
    user.lastLogin = new Date();
    await user.save();

    // 生成令牌
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // 保存刷新令牌
    user.refreshTokens.push(refreshToken);
    await user.save();

    return {
      success: true,
      accessToken,
      refreshToken,
      user: user.toPublicJSON()
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// 使用示例
async function example() {
  // 注册
  const result = await registerUser({
    username: 'alice',
    email: 'alice@example.com',
    password: 'password123',
    profile: {
      firstName: 'Alice',
      lastName: 'Smith'
    }
  });

  console.log(result);

  // 登录
  const loginResult = await loginUser('alice@example.com', 'password123');
  console.log(loginResult);
}
```

### 案例 2: 博客系统

```javascript
// models/Post.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 500
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100
  },

  slug: {
    type: String,
    unique: true,
    lowercase: true
  },

  content: {
    type: String,
    required: true
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],

  category: {
    type: String,
    enum: ['tech', 'lifestyle', 'travel', 'food', 'other'],
    default: 'other'
  },

  coverImage: String,

  published: {
    type: Boolean,
    default: false
  },

  publishedAt: Date,

  views: {
    type: Number,
    default: 0
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  comments: [commentSchema],

  featured: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

// 索引
postSchema.index({ title: 'text', content: 'text' });
postSchema.index({ slug: 1 });
postSchema.index({ tags: 1 });
postSchema.index({ createdAt: -1 });

// 生成 slug
postSchema.pre('validate', function(next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

// 发布博客
postSchema.methods.publish = function() {
  this.published = true;
  this.publishedAt = new Date();
  return this.save();
};

// 增加浏览量
postSchema.methods.incrementViews = function() {
  this.views++;
  return this.save();
};

// 切换点赞
postSchema.methods.toggleLike = function(userId) {
  const index = this.likes.indexOf(userId);

  if (index === -1) {
    this.likes.push(userId);
  } else {
    this.likes.splice(index, 1);
  }

  return this.save();
};

// 添加评论
postSchema.methods.addComment = function(userId, content) {
  this.comments.push({
    author: userId,
    content
  });
  return this.save();
};

// 静态方法：获取热门文章
postSchema.statics.getPopular = function(limit = 10) {
  return this.find({ published: true })
    .sort({ views: -1, likes: -1 })
    .limit(limit)
    .populate('author', 'username profile.avatar');
};

// 静态方法：搜索文章
postSchema.statics.search = function(query) {
  return this.find({
    $text: { $search: query },
    published: true
  }).select({ score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } });
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
```

## 8. 性能优化

### 8.1 使用精简查询

```javascript
// ❌ 不好：查询所有字段
const users = await User.find();

// ✅ 好：只查询需要的字段
const users = await User.find().select('name email -_id');

// ✅ 使用 lean() 返回普通 JavaScript 对象
const users = await User.find().lean();
```

### 8.2 批量操作

```javascript
// ❌ 不好：循环插入
for (const user of users) {
  await User.create(user);
}

// ✅ 好：批量插入
await User.insertMany(users);

// 批量更新
await User.bulkWrite([
  {
    updateOne: {
      filter: { _id: id1 },
      update: { $set: { status: 'active' } }
    }
  },
  {
    deleteOne: {
      filter: { _id: id2 }
    }
  }
]);
```

### 8.3 连接池配置

```javascript
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,          // 连接池大小
  socketTimeoutMS: 45000,
  family: 4              // 使用 IPv4
});
```

## 9. 最佳实践

### 9.1 错误处理

```javascript
// 全局错误处理
mongoose.connection.on('error', (err) => {
  console.error('MongoDB 连接错误:', err);
});

// 查询错误处理
try {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('用户不存在');
  }
} catch (err) {
  if (err.name === 'CastError') {
    console.error('无效的 ID 格式');
  } else {
    console.error('查询错误:', err);
  }
}
```

### 9.2 数据验证

```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, '邮箱是必需的'],
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: props => `${props.value} 不是有效的邮箱地址`
    }
  },

  age: {
    type: Number,
    min: [0, '年龄不能为负数'],
    max: [150, '年龄过大'],
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} 不是整数'
    }
  }
});
```

### 9.3 环境配置

```javascript
// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log(`MongoDB 已连接: ${conn.connection.host}`);

    // 开发环境启用调试
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }

  } catch (err) {
    console.error('MongoDB 连接失败:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## 10. 总结

### 核心要点

1. **MongoDB 是文档型数据库**: 使用 JSON 格式，无固定模式
2. **Mongoose 提供 ODM**: 模式定义、验证、类型转换
3. **灵活的查询**: 丰富的查询操作符和聚合功能
4. **关系处理**: 支持嵌入和引用两种方式
5. **性能优化**: 索引、精简查询、批量操作

### 常用命令

```javascript
// 连接
mongoose.connect(url, options)

// CRUD
Model.create(data)
Model.find(query)
Model.findOne(query)
Model.findById(id)
Model.updateOne(filter, update)
Model.deleteOne(filter)

// 高级
Model.aggregate(pipeline)
Model.populate(path)
Model.countDocuments(filter)
```

### 进阶学习

- 事务处理 (Transactions)
- 分片 (Sharding)
- 复制集 (Replica Sets)
- 地理空间查询
- GridFS 文件存储
- Change Streams
