---
title: Node.js 文件系统模块
date: 2025-11-20
categories:
  - 后端开发
tags:
  - Node.js
  - File System
---

# Node.js 文件系统模块 (fs)

## 1. 概述

Node.js 的 `fs` 模块提供了文件系统操作的 API，可以进行文件的读取、写入、删除、重命名等操作。

### 1.1 导入方式

```javascript
// CommonJS 方式
const fs = require('fs');

// ES6 模块方式
import fs from 'fs';

// 使用 Promise API
const fs = require('fs').promises;
// 或
import fs from 'fs/promises';
```

## 2. 核心��念

### 2.1 同步 vs 异步

- **异步方法**: 非阻塞，使用回调函数或 Promise
- **同步方法**: 阻塞式，方法名后缀为 `Sync`
- **Promise API**: 返回 Promise 对象，支持 async/await

```javascript
// 异步（回调）
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// 同步
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);

// Promise
fs.promises.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// async/await
async function readFileAsync() {
  try {
    const data = await fs.promises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

> ⚠️ **注意事项**:
> - **异步方法优先**: 同步方法会阻塞事件循环,影响性能
> - **同步方法仅限启动阶段**: 只在应用启动时(如读取配置)使用同步方法
> - **错误处理必须**: 异步回调必须处理err,同步方法用try-catch
> - **Promise API需要Node.js 10+**: 旧版本使用util.promisify转换
> - **回调地狱**: 多个异步操作建议使用Promise或async/await
>
> ```javascript
> // 错误示例:在请求处理中使用同步方法
> app.get('/data', (req, res) => {
>   const data = fs.readFileSync('data.json');  // ❌ 阻塞所有请求
>   res.send(data);
> });
>
> // 正确做法:使用异步
> app.get('/data', async (req, res) => {
>   const data = await fs.promises.readFile('data.json', 'utf8');
>   res.send(data);
> });
>
> // 回调地狱问题
> fs.readFile('file1.txt', (err, data1) => {
>   fs.readFile('file2.txt', (err, data2) => {
>     fs.readFile('file3.txt', (err, data3) => {
>       // 嵌套太深 ❌
>     });
>   });
> });
>
> // 使用async/await解决
> async function readFiles() {
>   const data1 = await fs.promises.readFile('file1.txt', 'utf8');
>   const data2 = await fs.promises.readFile('file2.txt', 'utf8');
>   const data3 = await fs.promises.readFile('file3.txt', 'utf8');
>   return { data1, data2, data3 };
> }
> ```

> 🎯 **实际应用场景**:
> ```javascript
> // 场景1:应用启动时加载配置(可用同步)
> const fs = require('fs');
> const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
> console.log('配置加载完成:', config);
>
> // 场景2:API请求中读取文件(必须异步)
> const express = require('express');
> const app = express();
>
> app.get('/users', async (req, res) => {
>   try {
>     const data = await fs.promises.readFile('./users.json', 'utf8');
>     res.json(JSON.parse(data));
>   } catch (err) {
>     res.status(500).json({ error: err.message });
>   }
> });
>
> // 场景3:批量读取多个文件(并行)
> async function readMultipleFiles(files) {
>   const promises = files.map(file =>
>     fs.promises.readFile(file, 'utf8')
>   );
>   return await Promise.all(promises);
> }
>
> readMultipleFiles(['a.txt', 'b.txt', 'c.txt'])
>   .then(contents => console.log('所有文件:', contents));
>
> // 场景4:错误处理最佳实践
> async function safeReadFile(path) {
>   try {
>     return await fs.promises.readFile(path, 'utf8');
>   } catch (err) {
>     if (err.code === 'ENOENT') {
>       console.log('文件不存在');
>       return null;
>     }
>     throw err;  // 其他错误继续抛出
>   }
> }
> ```

## 3. 常用方法

### 3.1 文件读取

#### readFile - 读取整个文件

```javascript
const fs = require('fs');

// 读取文本文件
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('读取文件失败:', err);
    return;
  }
  console.log('文件内容:', data);
});

// 读取二进制文件
fs.readFile('image.png', (err, data) => {
  if (err) throw err;
  console.log('Buffer:', data);
});
```

#### createReadStream - 流式读取

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024 // 64KB 缓冲区
});

readStream.on('data', (chunk) => {
  console.log('读取到数据块:', chunk.length, '字节');
});

readStream.on('end', () => {
  console.log('文件读取完成');
});

readStream.on('error', (err) => {
  console.error('读取错误:', err);
});
```

> ⚠️ **注意事项**:
> - **适用于大文件**: 流式读取不会一次性加载整个文件到内存
> - **highWaterMark**: 控制每次读取的数据块大小,默认64KB
> - **暂停和恢复**: 可以用pause()和resume()控制流
> - **背压处理**: 处理速度慢于读取速度时需要暂停
> - **编码设置**: 不设置encoding会返回Buffer对象
>
> ```javascript
> // 处理背压问题
> const readStream = fs.createReadStream('large.txt');
> const writeStream = fs.createWriteStream('copy.txt');
>
> readStream.on('data', (chunk) => {
>   const canWrite = writeStream.write(chunk);
>   if (!canWrite) {
>     readStream.pause();  // 写入缓冲区满,暂停读取
>   }
> });
>
> writeStream.on('drain', () => {
>   readStream.resume();  // 缓冲区排空,继续读取
> });
>
> // 更简单的方式:使用pipe自动处理背压
> readStream.pipe(writeStream);
> ```

> 🎯 **实际应用场景**:
> ```javascript
> // 场景1:读取大文件并统计行数
> const fs = require('fs');
> const readline = require('readline');
>
> async function countLines(filePath) {
>   const fileStream = fs.createReadStream(filePath);
>   const rl = readline.createInterface({
>     input: fileStream,
>     crlfDelay: Infinity
>   });
>
>   let lineCount = 0;
>   for await (const line of rl) {
>     lineCount++;
>   }
>   return lineCount;
> }
>
> // 场景2:流式上传大文件
> const express = require('express');
> const app = express();
>
> app.post('/upload', (req, res) => {
>   const writeStream = fs.createWriteStream('uploaded.file');
>
>   req.pipe(writeStream);
>
>   writeStream.on('finish', () => {
>     res.send('上传成功');
>   });
>
>   writeStream.on('error', (err) => {
>     res.status(500).send('上传失败');
>   });
> });
>
> // 场景3:实时日志监控(tail -f效果)
> const fs = require('fs');
>
> function watchLog(filePath) {
>   const watcher = fs.watch(filePath, (eventType) => {
>     if (eventType === 'change') {
>       const stream = fs.createReadStream(filePath, {
>         encoding: 'utf8',
>         start: lastPosition
>       });
>
>       stream.on('data', (chunk) => {
>         console.log('新日志:', chunk);
>         lastPosition += chunk.length;
>       });
>     }
>   });
> }
>
> // 场景4:CSV文件逐行处理
> const fs = require('fs');
> const csv = require('csv-parser');
>
> fs.createReadStream('data.csv')
>   .pipe(csv())
>   .on('data', (row) => {
>     // 逐行处理,不占用大量内存
>     processRow(row);
>   })
>   .on('end', () => {
>     console.log('CSV处理完成');
>   });
> ```

### 3.2 文件写入

#### writeFile - 写入文件（覆盖）

```javascript
const fs = require('fs');

const content = '这是要写入的内容';

fs.writeFile('output.txt', content, 'utf8', (err) => {
  if (err) {
    console.error('写入失败:', err);
    return;
  }
  console.log('文件写入成功');
});
```

#### appendFile - 追加内容

```javascript
fs.appendFile('log.txt', '新的日志记录\n', 'utf8', (err) => {
  if (err) throw err;
  console.log('内容已追加');
});
```

#### createWriteStream - 流式写入

```javascript
const writeStream = fs.createWriteStream('output.txt', {
  encoding: 'utf8'
});

writeStream.write('第一行\n');
writeStream.write('第二行\n');
writeStream.end('最后一行\n');

writeStream.on('finish', () => {
  console.log('写入完成');
});
```

### 3.3 文件操作

#### unlink - 删除文件

```javascript
fs.unlink('file-to-delete.txt', (err) => {
  if (err) {
    console.error('删除失败:', err);
    return;
  }
  console.log('文件已删除');
});
```

#### rename - 重命名/移动文件

```javascript
fs.rename('old-name.txt', 'new-name.txt', (err) => {
  if (err) throw err;
  console.log('文件已重命名');
});

// 也可用于移动文件
fs.rename('file.txt', './backup/file.txt', (err) => {
  if (err) throw err;
  console.log('文件已移动');
});
```

#### copyFile - 复制文件

```javascript
fs.copyFile('source.txt', 'destination.txt', (err) => {
  if (err) throw err;
  console.log('文件已复制');
});

// 使用标志防止覆盖
fs.copyFile('source.txt', 'dest.txt', fs.constants.COPYFILE_EXCL, (err) => {
  if (err) {
    console.log('目标文件已存在');
    return;
  }
  console.log('复制成功');
});
```

#### stat - 获取文件信息

```javascript
fs.stat('file.txt', (err, stats) => {
  if (err) throw err;

  console.log('是否为文件:', stats.isFile());
  console.log('是否为目录:', stats.isDirectory());
  console.log('文件大小:', stats.size, '字节');
  console.log('创建时间:', stats.birthtime);
  console.log('修改时间:', stats.mtime);
});
```

### 3.4 目录操作

#### mkdir - 创建目录

```javascript
// 创建单个目录
fs.mkdir('new-folder', (err) => {
  if (err) throw err;
  console.log('目录已创建');
});

// 递归创建嵌套目录
fs.mkdir('path/to/nested/folder', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('嵌套目录已创建');
});
```

#### readdir - 读取目录

```javascript
fs.readdir('./my-folder', (err, files) => {
  if (err) throw err;
  console.log('目录内容:', files);
  // ['file1.txt', 'file2.js', 'subfolder']
});

// 获取详细信息
fs.readdir('./my-folder', { withFileTypes: true }, (err, entries) => {
  if (err) throw err;

  entries.forEach(entry => {
    console.log(entry.name, entry.isDirectory() ? '(目录)' : '(文件)');
  });
});
```

#### rmdir - 删除目录

```javascript
// 删除空目录
fs.rmdir('empty-folder', (err) => {
  if (err) throw err;
  console.log('目录已删除');
});

// 递归删除非空目录（Node.js 14.14+）
fs.rm('folder-with-files', { recursive: true, force: true }, (err) => {
  if (err) throw err;
  console.log('目录及其内容已删除');
});
```

### 3.5 文件监听

#### watch - 监听文件变化

```javascript
fs.watch('config.json', (eventType, filename) => {
  console.log('事件类型:', eventType); // 'rename' 或 'change'
  console.log('文件名:', filename);

  if (eventType === 'change') {
    console.log('文件已修改');
  }
});
```

#### watchFile - 轮询监听

```javascript
fs.watchFile('data.txt', { interval: 1000 }, (curr, prev) => {
  console.log('当前修改时间:', curr.mtime);
  console.log('之前修改时间:', prev.mtime);

  if (curr.mtime !== prev.mtime) {
    console.log('文件已更新');
  }
});
```

## 4. 实战案例

### 案例 1: 文件复制工具

```javascript
const fs = require('fs');
const path = require('path');

function copyFile(source, destination) {
  const readStream = fs.createReadStream(source);
  const writeStream = fs.createWriteStream(destination);

  readStream.on('error', (err) => {
    console.error('读取错误:', err);
  });

  writeStream.on('error', (err) => {
    console.error('写入错误:', err);
  });

  writeStream.on('finish', () => {
    console.log(`文件已从 ${source} 复制到 ${destination}`);
  });

  readStream.pipe(writeStream);
}

// 使用示例
copyFile('large-video.mp4', 'backup-video.mp4');
```

### 案例 2: 递归读取目录树

```javascript
const fs = require('fs').promises;
const path = require('path');

async function readDirRecursive(dirPath, indent = '') {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        console.log(`${indent}📁 ${entry.name}/`);
        await readDirRecursive(fullPath, indent + '  ');
      } else {
        const stats = await fs.stat(fullPath);
        console.log(`${indent}📄 ${entry.name} (${stats.size} bytes)`);
      }
    }
  } catch (err) {
    console.error('错误:', err);
  }
}

// 使用示例
readDirRecursive('./my-project');
```

### 案例 3: 简单的日志系统

```javascript
const fs = require('fs');
const path = require('path');

class Logger {
  constructor(logDir = './logs') {
    this.logDir = logDir;
    this.ensureLogDir();
  }

  ensureLogDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  getLogFilePath() {
    const date = new Date().toISOString().split('T')[0];
    return path.join(this.logDir, `${date}.log`);
  }

  log(level, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;

    fs.appendFile(this.getLogFilePath(), logEntry, (err) => {
      if (err) {
        console.error('写入日志失败:', err);
      }
    });

    console.log(logEntry.trim());
  }

  info(message) {
    this.log('INFO', message);
  }

  error(message) {
    this.log('ERROR', message);
  }

  warn(message) {
    this.log('WARN', message);
  }
}

// 使用示例
const logger = new Logger('./logs');
logger.info('应用程序启动');
logger.warn('这是一个警告');
logger.error('发生了一个错误');
```

### 案例 4: 文件批量重命名

```javascript
const fs = require('fs').promises;
const path = require('path');

async function batchRename(dirPath, pattern, replacement) {
  try {
    const files = await fs.readdir(dirPath);
    const regex = new RegExp(pattern);
    let count = 0;

    for (const file of files) {
      if (regex.test(file)) {
        const oldPath = path.join(dirPath, file);
        const newName = file.replace(regex, replacement);
        const newPath = path.join(dirPath, newName);

        await fs.rename(oldPath, newPath);
        console.log(`重命名: ${file} -> ${newName}`);
        count++;
      }
    }

    console.log(`\n总共重命名了 ${count} 个文件`);
  } catch (err) {
    console.error('批量重命名失败:', err);
  }
}

// 使用示例: 将所有 .txt 文件重命名为 .md
batchRename('./docs', '\\.txt$', '.md');
```

### 案例 5: JSON 配置文件管理

```javascript
const fs = require('fs').promises;
const path = require('path');

class ConfigManager {
  constructor(configPath) {
    this.configPath = configPath;
    this.config = {};
  }

  async load() {
    try {
      const data = await fs.readFile(this.configPath, 'utf8');
      this.config = JSON.parse(data);
      console.log('配置加载成功');
      return this.config;
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('配置文件不存在，创建默认配置');
        await this.save();
      } else {
        throw err;
      }
    }
  }

  async save() {
    try {
      const data = JSON.stringify(this.config, null, 2);
      await fs.writeFile(this.configPath, data, 'utf8');
      console.log('配置保存成功');
    } catch (err) {
      console.error('保存配置失败:', err);
    }
  }

  get(key) {
    return this.config[key];
  }

  set(key, value) {
    this.config[key] = value;
  }

  async update(key, value) {
    this.set(key, value);
    await this.save();
  }
}

// 使用示例
async function main() {
  const config = new ConfigManager('./config.json');
  await config.load();

  config.set('appName', 'My App');
  config.set('version', '1.0.0');
  config.set('port', 3000);

  await config.save();

  console.log('应用名称:', config.get('appName'));
  console.log('端口:', config.get('port'));
}

main();
```

## 5. 最佳实践

### 5.1 错误处理

```javascript
const fs = require('fs').promises;

async function safeReadFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return { success: true, data };
  } catch (err) {
    if (err.code === 'ENOENT') {
      return { success: false, error: '文件不存在' };
    } else if (err.code === 'EACCES') {
      return { success: false, error: '没有权限' };
    } else {
      return { success: false, error: err.message };
    }
  }
}
```

### 5.2 使用 Promise API

```javascript
const fs = require('fs').promises;

// 链式调用
fs.readFile('input.txt', 'utf8')
  .then(data => data.toUpperCase())
  .then(upperData => fs.writeFile('output.txt', upperData))
  .then(() => console.log('处理完成'))
  .catch(err => console.error(err));

// async/await (推荐)
async function processFile() {
  try {
    const data = await fs.readFile('input.txt', 'utf8');
    const processed = data.toUpperCase();
    await fs.writeFile('output.txt', processed);
    console.log('处理完成');
  } catch (err) {
    console.error(err);
  }
}
```

### 5.3 使用流处理大文件

```javascript
const fs = require('fs');

// 不好的做法：读取大文件到内存
// const data = fs.readFileSync('huge-file.txt'); // 可能内存溢出

// 好的做法：使用流
const readStream = fs.createReadStream('huge-file.txt');
const writeStream = fs.createWriteStream('processed.txt');

readStream.pipe(writeStream);
```

### 5.4 路径处理

```javascript
const path = require('path');
const fs = require('fs');

// 使用 path.join 构建路径
const filePath = path.join(__dirname, 'data', 'config.json');

// 获取文件扩展名
const ext = path.extname('file.txt'); // '.txt'

// 获取文件名
const basename = path.basename('/path/to/file.txt'); // 'file.txt'

// 获取目录名
const dirname = path.dirname('/path/to/file.txt'); // '/path/to'
```

## 6. 常见错误代码

| 错误代码 | 说明 |
|---------|------|
| ENOENT | 文件或目录不存在 |
| EACCES | 权限不足 |
| EEXIST | 文件已存在 |
| EISDIR | 期望文件但是是目录 |
| ENOTDIR | 期望目录但是是文件 |
| EMFILE | 打开的文件太多 |

## 7. 性能建议

1. **大文件使用流**: 避免一次性读取大文件到内存
2. **批量操作**: 使用 `Promise.all()` 并行处理多个文件
3. **缓存文件信息**: 避免重复调用 `stat()`
4. **使用异步方法**: 避免阻塞事件循环
5. **合理使用缓冲区大小**: 在流操作中设置适当的 `highWaterMark`

```javascript
// 并行读取多个文件
const fs = require('fs').promises;

async function readMultipleFiles(filePaths) {
  const promises = filePaths.map(path => fs.readFile(path, 'utf8'));
  const results = await Promise.all(promises);
  return results;
}

// 使用
readMultipleFiles(['file1.txt', 'file2.txt', 'file3.txt'])
  .then(contents => console.log(contents));
```

## 8. 总结

- `fs` 模块是 Node.js 核心模块，无需安装
- 优先使用异步方法，避免阻塞
- Promise API 配合 async/await 是最现代的方式
- 大文件使用流式处理
- 注意错误处理和路径规范化
- 了解常见错误代码，提供友好的错误信息
