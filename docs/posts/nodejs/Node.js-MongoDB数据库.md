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

# Node.js + MongoDB 生产级最佳实践指南

## 1. MongoDB 简介与核心概念

MongoDB 是一个基于分布式文件存储的数据库，核心优势在于灵活的文档模型（JSON-like）和横向扩展能力。

### 核心映射关系

| SQL 概念    | MongoDB 概念        | 关键差异                                 |
| :---------- | :------------------ | :--------------------------------------- |
| Database    | Database            | 数据库                                   |
| Table       | **Collection 集合** | 集合（无强制模式，但在应用层通常有模式） |
| Row 行      | **Document 文档**   | 文档（BSON 格式，最大 16MB）             |
| Column 列   | **Field 场**        | 字段                                     |
| Primary Key | **_id**             | 默认主键（ObjectId，自动生成，带时间戳） |

------

## 2. 数据库连接：单例模式 (这是重点)

在 Web 应用（Express/Koa/NestJS）中，**切勿**在 API 路由中连接数据库。应该在应用启动时连接一次，并在整个生命周期复用。

### 2.1 推荐目录结构

```text
src/
├── config/
│   └── db.js        <-- 数据库连接模块
├── models/          <-- Mongoose 模型定义
├── app.js           <-- 入口文件
```

### 2.2 配置文件 (config/db.js)

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Mongoose 6+ 不需要 useNewUrlParser 等废弃选项
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // 生产环境建议配置连接池
      maxPoolSize: 10, 
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // 连接失败则终止进程
  }
};

module.exports = connectDB;
```

### 2.3 入口文件 (app.js)

```javascript
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// 1. 先连接数据库
connectDB();

// 2. 再启动服务器
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

------

## 3. Mongoose 模式设计 (Schema)

### 3.1 标准 Schema 定义

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '用户名为必填项'],
    unique: true, // 注意：unique 不是验证器，而是构建唯一索引的指令
    trim: true,
    index: true   // 常用查询字段建议加索引
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, '邮箱格式不正确']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  // 嵌套对象
  profile: {
    age: { type: Number, min: 0 },
    bio: String
  },
  // 引用其他集合 (关联关系)
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  timestamps: true, // 自动管理 createdAt 和 updatedAt
  toJSON: { virtuals: true }, // 输出 JSON 时包含虚拟属性
  toObject: { virtuals: true }
});

// 虚拟属性 (不会存入数据库，但能像字段一样访问)
userSchema.virtual('isAdult').get(function() {
  return this.profile.age >= 18;
});

module.exports = mongoose.model('User', userSchema);
```

------

## 4. CRUD 操作与性能优化

### 4.1 🚀 性能优化的黄金法则：`.lean()`

Mongoose 默认返回的是 "Mongoose Document" 对象（包含 `save`, `toObject` 等几百个方法），非常消耗内存和性能。
**如果在只读场景（不需要修改数据），务必使用 `.lean()`，性能提升可达 5-10 倍。**

### 4.2 读取操作 (Read)

```javascript
// ❌ 慢：返回复杂对象
const users = await User.find({ role: 'user' });

// ✅ 快：返回纯 JS 对象 (POJO)
const users = await User.find({ role: 'user' })
  .select('username email') // 只取需要的字段 (Projection)
  .lean(); 

// 通过 ID 查询
// 注意：Mongoose 会自动将字符串转为 ObjectId，无需手动转换
const user = await User.findById(req.params.id).lean();
```

### 4.3 写入与更新 (Create / Update)

```javascript
// 创建
const user = await User.create({
  username: 'john_doe',
  email: 'john@example.com'
});

// 更新 (推荐 findByIdAndUpdate 而不是 find -> modify -> save，除非需要触发 hook)
const updatedUser = await User.findByIdAndUpdate(
  id, 
  { $set: { 'profile.bio': 'New Bio' } }, // 使用 $set 避免覆盖整个对象
  { 
    new: true,          // 返回更新后的文档
    runValidators: true // 更新时也执行 Schema 验证
  }
);
```

------

## 5. 进阶特性：事务 (Transactions)

MongoDB 4.0+ 支持多文档 ACID 事务。这在涉及资金、库存等强一致性场景下是必须的。

```javascript
const mongoose = require('mongoose');
const User = require('./models/User');
const Wallet = require('./models/Wallet');

async function transferMoney(fromUserId, toUserId, amount) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };

    // 1. 扣款
    const sender = await Wallet.findOneAndUpdate(
      { userId: fromUserId },
      { $inc: { balance: -amount } },
      opts
    );

    if (sender.balance < 0) {
      throw new Error('余额不足');
      // 抛出错误会自动触发 catch 中的 abortTransaction
    }

    // 2. 加款
    await Wallet.findOneAndUpdate(
      { userId: toUserId },
      { $inc: { balance: amount } },
      opts
    );

    // 3. 提交事务
    await session.commitTransaction();
    console.log('转账成功');
  } catch (error) {
    // 4. 回滚事务
    await session.abortTransaction();
    console.error('转账失败，已回滚:', error.message);
  } finally {
    session.endSession();
  }
}
```

------

## 6. 常见坑点与解决方案

### 6.1 ObjectId 的陷阱

- **原生驱动 (Native Driver)**: 必须手动转换字符串 ID。

  ```javascript
  const { ObjectId } = require('mongodb');
  // 必须这样写，否则查不到
  db.collection('users').findOne({ _id: new ObjectId('64bf...') });
  ```

- **Mongoose**: 自动处理，无需手动转换

  ```javascript
  User.findById('64bf...'); // 自动处理
  ```

### 6.2 数组查询

- `{ tags: "js" }`: 数组中**包含** "js" 即匹配（最常用）。
- `{ tags: ["js", "node"] }`: 数组**严格等于** `["js", "node"]`（顺序和数量都必须一致）。
- `{ tags: { $all: ["js", "node"] } }`: 数组**包含** "js" 和 "node"（顺序无关）。

### 6.3 唯一索引 (Unique Index)

如果在 Schema 中添加了 `unique: true` 但不生效，通常是因为集合中已经存在重复数据。你需要先清理脏数据，然后手动重建索引：

```javascript
await User.syncIndexes();
```

------

## 7. 现代化开发：TypeScript 支持

如果你在使用 TypeScript（强烈推荐），Mongoose 现在提供了很好的类型推断。

```typescript
import mongoose, { Schema, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: Number
});

// 自动从 Schema 推断 TS 类型，无需手动定义 interface
type UserType = InferSchemaType<typeof userSchema>;

const User = mongoose.model('User', userSchema);

async function getUser() {
  // user 变量会自动获得类型提示
  const user = await User.findOne({ name: 'Alice' });
  if (user) {
    console.log(user.email); // TS 知道这里有 email 字段
  }
}
```

## 8. 安全性检查清单

1. **不要将 MongoDB 暴露在公网**：在 `mongod.conf` 中设置 `bindIp: 127.0.0.1` 或使用防火墙。
2. **启用认证**：始终开启 Authentication，创建 root 用户和业务数据库的专属用户。
3. **防止 NoSQL 注入**：
   - 如果是使用 `express`，不要直接将 `req.body` 传入查询条件。
   - 恶意用户可能发送 `{ "username": { "$gt": "" } }` 来绕过登录。
   - **解决**：使用 `express-mongo-sanitize` 中间件。

```bash
npm install express-mongo-sanitize
```

```javascript
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize()); // 移除 req.body 中的 $ 符号
```

---

## 总结

在生产环境中使用 MongoDB + Node.js，需要特别注意：

1. **连接管理**：使用单例模式，在应用启动时连接一次
2. **性能优化**：充分利用 `.lean()` 和索引来提升查询性能
3. **数据安全**：启用认证，防止 NoSQL 注入
4. **事务支持**：在需要强一致性的场景使用事务
5. **类型安全**：推荐使用 TypeScript 提升开发体验

遵循这些最佳实践，可以构建出高性能、安全可靠的 MongoDB 应用。

---

> 💡 **相关资源**：
> - [MongoDB 官方文档](https://www.mongodb.com/docs/)
> - [Mongoose 官方文档](https://mongoosejs.com/docs/)
> - [MongoDB 常用命令速查表](./MongoDB数据库基础使用.md)

<comment-section />

<style>
.comment-section {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 2px solid #e0e0e0;
}
</style>

---

**如果你有任何问题或想分享你的 MongoDB 使用经验，欢迎在评论区交流！**