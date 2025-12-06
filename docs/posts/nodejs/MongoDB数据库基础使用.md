---
title: MongoDB 常用命令速查表
date: 2025-11-22
categories:
  - Node.js 深入学习
tags:
  - MongoDB
  - 数据库
  - Node.js
---

# MongoDB 常用命令速查表

## 1. 终端与服务管理 (CLI)

### 服务控制

| 平台 | 启动服务 | 停止服务 |
| :--- | :--- | :--- |
| **Windows** | `net start MongoDB` | `net stop MongoDB` |
| **Mac (Brew)** | `brew services start mongodb-community` | `brew services stop mongodb-community` |
| **Linux** | `sudo systemctl start mongod` | `sudo systemctl stop mongod` |

### 常用工具命令

\`\`\`bash
# 指定数据目录启动 (调试用)
mongod --dbpath "E:\data\db"

# 连接数据库 Shell
mongosh      # 新版 (推荐)
mongo        # 旧版

# 备份数据库
mongodump --db myapp --out ./backup

# 恢复数据库
mongorestore --db myapp ./backup/myapp

# Docker 快速启动
docker run -d --name mongodb -p 27017:27017 mongo
docker exec -it mongodb mongosh
\`\`\`

---

## 2. Shell 交互命令 (mongosh)

### 数据库与集合

\`\`\`javascript
show dbs                  // 查看所有数据库
use my_database           // 切换/创建数据库
db                        // 查看当前数据库名
show collections          // 查看当前库所有集合
db.stats()                // 查看数据库状态
db.dropDatabase()         // ⚠️ 删除当前数据库
db.users.drop()           // ⚠️ 删除 users 集合
\`\`\`

### 增 (Create)

\`\`\`javascript
// 插入单条
db.users.insertOne({ name: "Alice", age: 25 })

// 插入多条
db.users.insertMany([
  { name: "Bob", age: 22 },
  { name: "Charlie", age: 30 }
])
\`\`\`

### 查 (Read)

\`\`\`javascript
// 基础查询
db.users.find()                     // 查所有
db.users.find().pretty()            // 格式化输出
db.users.findOne({ name: "Alice" }) // 查一条

// 条件与投影
db.users.find({ age: { \$gt: 18 } }, { name: 1, email: 1, _id: 0 })

// 排序、分页
db.users.find()
  .sort({ age: -1 })  // -1 降序, 1 升序
  .skip(10)           // 跳过前10条
  .limit(5)           // 取5条

// 统计数量
db.users.countDocuments({ age: { \$gte: 18 } })
\`\`\`

### 改 (Update)

\`\`\`javascript
// 更新单条
db.users.updateOne(
  { name: "Alice" },
  { \$set: { age: 26 } }
)

// 自增/自减
db.users.updateOne(
  { name: "Alice" },
  { \$inc: { views: 1 } }
)

// 数组操作
db.users.updateOne(
  { name: "Alice" },
  { \$push: { tags: "admin" } }
)

// Upsert
db.users.updateOne(
  { name: "David" },
  { \$set: { age: 20 } },
  { upsert: true }
)
\`\`\`

### 删 (Delete)

\`\`\`javascript
db.users.deleteOne({ name: "Alice" })
db.users.deleteMany({ status: "inactive" })
\`\`\`

---

## 3. 查询操作符 (Operators)

| 类别 | 符号 | 含义 | 示例 |
| :--- | :--- | :--- | :--- |
| **比较** | `\$eq` / `\$ne` | 等于 / 不等于 | `{ age: { \$ne: 18 } }` |
| | `\$gt` / `\$gte` | 大于 / 大于等于 | `{ age: { \$gte: 18 } }` |
| | `\$lt` / `\$lte` | 小于 / 小于等于 | `{ price: { \$lt: 100 } }` |
| | `\$in` / `\$nin` | 在数组中 / 不在 | `{ role: { \$in: ["admin", "mod"] } }` |
| **逻辑** | `\$or` | 或 | `{ \$or: [{ age: 18 }, { vip: true }] }` |
| | `\$and` | 与 | (通常省略) |
| | `\$not` | 非 | `{ age: { \$not: { \$lt: 18 } } }` |
| **元素** | `\$exists` | 字段是否存在 | `{ email: { \$exists: true } }` |
| | `\$type` | 字段类型 | `{ age: { \$type: "number" } }` |
| **数组** | `\$all` | 包含所有 | `{ tags: { \$all: ["js", "node"] } }` |
| | `\$elemMatch` | 匹配数组内对象 | `{ comments: { \$elemMatch: { user: "A" } } }` |

---

## 4. Mongoose 常用方法 (Node.js)

\`\`\`javascript
const User = require('./models/User');

// 链式查询
const users = await User.find({ isActive: true })
  .select('name email -_id')
  .sort('-createdAt')
  .limit(10)
  .populate('profile')
  .lean();

// 创建
const user = await User.create({ name: 'Alice' });

// 查找并更新
const updated = await User.findByIdAndUpdate(
  id,
  { \$set: req.body },
  { new: true, runValidators: true }
);

// 聚合
const stats = await User.aggregate([
  { \$match: { age: { \$gte: 18 } } },
  { \$group: { _id: "\$role", count: { \$sum: 1 } } }
]);
\`\`\`

---

## 5. 索引与性能 (Index)

\`\`\`javascript
// 查看索引
db.users.getIndexes()

// 创建索引
db.users.createIndex({ username: 1 })
db.users.createIndex({ email: 1 }, { unique: true })

// 复合索引
db.users.createIndex({ role: 1, createdAt: -1 })

// 查询分析
db.users.find({ username: "Alice" }).explain("executionStats")

// 删除索引
db.users.dropIndex("email_1")
```

---

## 快速参考

**常用命令清单：**
- `mongosh` - 连接数据库
- `show dbs` - 查看所有数据库
- `use dbname` - 切换数据库
- `show collections` - 查看集合
- `db.collection.find()` - 查询数据
- `db.collection.insertOne()` - 插入数据
- `db.collection.updateOne()` - 更新数据
- `db.collection.deleteOne()` - 删除数据

**性能优化建议：**
- 为常用查询字段创建索引
- 使用投影减少返回字段
- 在 Mongoose 中使用 `.lean()` 提升查询性能
- 合理使用分页避免一次性加载大量数据

---

> 💡 **提示**：本速查表涵盖了MongoDB最常用的命令和操作。建议收藏此页面，在日常开发中随时查阅。

<comment-section />

<style>
.comment-section {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 2px solid #e0e0e0;
}
</style>

---

**欢迎在评论区分享你的MongoDB使用经验或提问！**