---
title: Node.js NPM 包管理
date: 2025-11-20
categories:
  - Node.js 深入学习
tags:
  - Node.js
  - NPM
---

# Node.js NPM 包管理

## 1. NPM 简介

NPM (Node Package Manager) 是 Node.js 的包管理工具，也是世界上最大的软件注册表。

### 1.1 核心功能

- **包管理**: 安装、更新、删除第三方包
- **依赖管理**: 自动处理包之间的依赖关系
- **脚本执行**: 运行自定义脚本命令
- **版本控制**: 管理包的版本
- **发布包**: 将自己的包发布到 npm 仓库

### 1.2 检查安装

```bash
# 查看 npm 版本
npm -v
npm --version

# 查看 Node.js 版本
node -v

# 查看 npm 配置
npm config list

# 查看全局安装路径
npm root -g
```

## 2. package.json 文件

`package.json` 是项目的核心配置文件，包含项目元数据和依赖信息。

### 2.1 创建 package.json

```bash
# 交互式创建
npm init

# 使用默认值快速创建
npm init -y
npm init --yes
```

### 2.2 package.json 结构

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
  "keywords": ["node", "javascript"],
  "author": "Your Name <you@example.com>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20",
    "jest": "^29.5.0"
  },
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}
```

> ⚠️ **注意事项**:
> - **name规则**: 必须小写、无空格、可用连字符或下划线
> - **版本号格式**: 遵循semver(语义化版本),格式为 major.minor.patch
> - **dependencies vs devDependencies**:
>   - dependencies: 生产环境需要的包
>   - devDependencies: 仅开发时需要的包(测试工具、构建工具等)
> - **版本符号含义**:
>   - `^4.18.2`: 兼容4.x.x的最新版本
>   - `~4.18.2`: 兼容4.18.x的最新版本
>   - `4.18.2`: 精确版本
>   - `*`: 最新版本(不推荐)
> - **scripts执行**: 使用`npm run <script-name>`执行
>
> ```json
> // 常见错误示例
> {
>   "name": "My Project",  // ❌ 不能有空格和大写
>   "name": "my-project",  // ✅ 正确
>
>   "version": "1.0",      // ❌ 版本号必须是三位
>   "version": "1.0.0",    // ✅ 正确
>
>   // ❌ 错误的依赖分类
>   "dependencies": {
>     "jest": "^29.0.0"    // 测试工具应该放在devDependencies
>   },
>
>   // ✅ 正确的依赖分类
>   "dependencies": {
>     "express": "^4.18.2"  // 生产环境需要
>   },
>   "devDependencies": {
>     "jest": "^29.0.0"     // 仅开发时需要
>   }
> }
> ```

> 🎯 **实际应用场景**:
> ```json
> // 场景1:完整的Web项目package.json
> {
>   "name": "my-web-app",
>   "version": "1.0.0",
>   "description": "My awesome web application",
>   "main": "server.js",
>   "scripts": {
>     "start": "node server.js",
>     "dev": "nodemon server.js",
>     "test": "jest --coverage",
>     "test:watch": "jest --watch",
>     "lint": "eslint .",
>     "lint:fix": "eslint . --fix",
>     "build": "webpack --mode production",
>     "deploy": "npm run build && pm2 restart app"
>   },
>   "dependencies": {
>     "express": "^4.18.2",
>     "mongoose": "^7.0.0",
>     "dotenv": "^16.0.3",
>     "bcryptjs": "^2.4.3",
>     "jsonwebtoken": "^9.0.0"
>   },
>   "devDependencies": {
>     "nodemon": "^2.0.20",
>     "jest": "^29.5.0",
>     "eslint": "^8.36.0",
>     "webpack": "^5.76.0"
>   },
>   "engines": {
>     "node": ">=14.0.0"
>   }
> }
>
> // 场景2:前端React项目
> {
>   "name": "react-app",
>   "version": "0.1.0",
>   "private": true,
>   "scripts": {
>     "start": "react-scripts start",
>     "build": "react-scripts build",
>     "test": "react-scripts test",
>     "eject": "react-scripts eject"
>   },
>   "dependencies": {
>     "react": "^18.2.0",
>     "react-dom": "^18.2.0",
>     "react-router-dom": "^6.8.0",
>     "axios": "^1.3.4"
>   },
>   "devDependencies": {
>     "react-scripts": "5.0.1"
>   },
>   "browserslist": {
>     "production": [">0.2%", "not dead"],
>     "development": ["last 1 chrome version"]
>   }
> }
>
> // 场景3:NPM包发布配置
> {
>   "name": "@myorg/my-package",
>   "version": "1.0.0",
>   "description": "A useful package",
>   "main": "dist/index.js",
>   "types": "dist/index.d.ts",
>   "files": ["dist"],
>   "scripts": {
>     "build": "tsc",
>     "prepublishOnly": "npm run build",
>     "test": "jest"
>   },
>   "repository": {
>     "type": "git",
>     "url": "https://github.com/myorg/my-package"
>   },
>   "keywords": ["utility", "helper"],
>   "author": "Your Name",
>   "license": "MIT",
>   "peerDependencies": {
>     "react": ">=16.8.0"
>   }
> }
> ```

### 2.3 字段说明

| 字段 | 说明 | 必填 |
|------|------|------|
| name | 包名称（小写、无空格） | ✅ |
| version | 版本号（遵循语义化版本） | ✅ |
| description | 项目描述 | ❌ |
| main | 入口文件 | ❌ |
| scripts | 脚本命令 | ❌ |
| keywords | 关键词数组 | ❌ |
| author | 作者信息 | ❌ |
| license | 许可证 | ❌ |
| dependencies | 生产依赖 | ❌ |
| devDependencies | 开发依赖 | ❌ |
| peerDependencies | 对等依赖 | ❌ |
| engines | Node/npm 版本要求 | ❌ |

## 3. 包的安装

### 3.1 本地安装

```bash
# 安装包并添加到 dependencies
npm install express
npm install express axios mongoose
npm i express  # 简写

# 安装指定版本
npm install express@4.17.1

# 安装开发依赖
npm install --save-dev nodemon
npm install -D jest eslint  # 简写

# 从 package.json 安装所有依赖
npm install

# 仅安装生产依赖（不安装 devDependencies）
npm install --omit=dev
# 旧写法（仍可用，但 --only=prod 已废弃，推荐用 --omit=dev）
npm install --production
```

### 3.2 全局安装

```bash
# 全局安装（命令行工具）
npm install -g nodemon
npm install --global typescript

# 查看全局安装的包
npm list -g --depth=0

# 查看全局安装路径
npm root -g

# 更新全局包
npm update -g nodemon

# 卸载全局包
npm uninstall -g nodemon
```

### 3.3 从不同源安装

```bash
# 从 GitHub 安装
npm install user/repo
npm install https://github.com/user/repo

# 从本地路径安装
npm install ../local-package
npm install /absolute/path/to/package

# 从 tarball 安装
npm install https://example.com/package.tgz
```

## 4. 版本管理

### 4.1 语义化版本 (SemVer)

版本格式: `主版本号.次版本号.修订号` (MAJOR.MINOR.PATCH)

- **MAJOR**: 不兼容的 API 修改
- **MINOR**: 向下兼容的功能新增
- **PATCH**: 向下兼容的问题修正

```
示例:
1.0.0 - 初始版本
1.0.1 - 修复 bug
1.1.0 - 新增功能
2.0.0 - 重大变更（不兼容）
```

### 4.2 版本范围符号

```json
{
  "dependencies": {
    "package1": "1.2.3",        // 精确版本
    "package2": "^1.2.3",       // 兼容版本（默认）
    "package3": "~1.2.3",       // 近似版本
    "package4": ">=1.2.3",      // 大于等于
    "package5": "1.2.x",        // 通配符
    "package6": "*",            // 任意版本（不推荐）
    "package7": "latest"        // 最新版本（不推荐）
  }
}
```

#### 符号说明

```bash
^1.2.3  # 允许 1.x.x (不改变主版本号)
        # 1.2.3, 1.2.4, 1.3.0 ✅
        # 2.0.0 ❌

~1.2.3  # 允许 1.2.x (不改变次版本号)
        # 1.2.3, 1.2.4 ✅
        # 1.3.0 ❌

# ⚠️ 易踩坑：当主版本号为 0 时，^ 的行为不同
^0.2.3  # 只允许 0.2.x，不会升到 0.3.0（0.x 版本视为不稳定）
^0.0.3  # 只允许 0.0.3，连补丁号都锁死

>=1.2.3 # 大于等于 1.2.3
<1.2.3  # 小于 1.2.3
1.2.3 - 1.3.0  # 范围

1.2.x   # 1.2.0, 1.2.1, 1.2.2 等
*       # 任意版本
```

### 4.3 查看包版本

```bash
# 查看包的所有版本
npm view express versions

# 查看包的最新版本
npm view express version

# 查看已安装包的版本
npm list express
npm ls express

# 查看所有已安装包
npm list
npm list --depth=0  # 仅顶层

# 查看过时的包
npm outdated
```

### 4.4 更新包

```bash
# 更新单个包
npm update express

# 更新所有包（遵循 package.json 版本范围）
npm update

# 更新到最新版本（忽略版本范围）
npm install express@latest

# 检查可更新的包
npm outdated
```

## 5. package-lock.json

### 5.1 作用

- **锁定版本**: 确保团队成员安装相同版本的依赖
- **提高性能**: 跳过版本解析，直接安装
- **记录依赖树**: 完整记录所有依赖关系

### 5.2 示例

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "name": "my-project",
      "version": "1.0.0",
      "dependencies": {
        "express": "^4.18.2"
      }
    },
    "node_modules/express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
      "integrity": "sha512-...",
      "dependencies": {
        "accepts": "~1.3.8",
        "body-parser": "1.20.1"
      }
    }
  }
}
```

### 5.3 最佳实践

```bash
# ✅ 提交到版本控制
git add package-lock.json

# ✅ 使用 npm ci 在 CI/CD 中
npm ci  # 根据 lock 文件安装，更快更可靠

# ❌ 不要手动编辑
# ❌ 不要删除（除非解决冲突）
```

## 6. NPM 脚本

### 6.1 定义脚本

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "build": "webpack --mode production",
    "lint": "eslint .",
    "format": "prettier --write .",
    "clean": "rm -rf dist"
  }
}
```

### 6.2 运行脚本

```bash
# 运行脚本
npm run dev
npm run build
npm run test

# 特殊脚本可省略 run
npm start     # npm run start
npm test      # npm run test
npm stop      # npm run stop
npm restart   # npm run restart
```

### 6.3 脚本钩子

```json
{
  "scripts": {
    "prebuild": "npm run clean",
    "build": "webpack",
    "postbuild": "npm run test",

    "pretest": "npm run lint",
    "test": "jest",
    "posttest": "echo 'Tests completed'"
  }
}
```

执行顺序: `prebuild` → `build` → `postbuild`

### 6.4 传递参数

```bash
# 使用 -- 传递参数
npm run test -- --watch
npm run build -- --mode=production

# 在脚本中使用
npm run dev -- --port=8080
```

```json
{
  "scripts": {
    "dev": "node server.js"
  }
}
```

### 6.5 并行/串行执行

```bash
# 串行执行（使用 &&）
npm run lint && npm run test && npm run build

# 并行执行（使用 &）
npm run watch:js & npm run watch:css
```

使用 npm-run-all 包:

```json
{
  "scripts": {
    "build": "npm-run-all clean build:*",
    "build:js": "webpack",
    "build:css": "sass styles.scss styles.css",

    "watch": "npm-run-all --parallel watch:*",
    "watch:js": "webpack --watch",
    "watch:css": "sass --watch styles.scss:styles.css"
  }
}
```

### 6.6 环境变量

```json
{
  "scripts": {
    "dev": "NODE_ENV=development node server.js",
    "prod": "NODE_ENV=production node server.js"
  }
}
```

跨平台解决方案（使用 cross-env）:

```bash
npm install --save-dev cross-env
```

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development node server.js",
    "prod": "cross-env NODE_ENV=production node server.js"
  }
}
```

## 7. 依赖管理

### 7.1 依赖类型

#### dependencies - 生产依赖

```bash
npm install express
```

运行时必需的包（部署到生产环境）。

#### devDependencies - 开发依赖

```bash
npm install --save-dev jest
npm install -D eslint nodemon
```

仅开发时使用的包（测试、构建工具等）。

#### peerDependencies - 对等依赖

```json
{
  "peerDependencies": {
    "react": "^18.0.0"
  }
}
```

要求使用者安装特定版本的包（常用于插件）。

#### optionalDependencies - 可选依赖

```json
{
  "optionalDependencies": {
    "fsevents": "^2.3.2"
  }
}
```

安装失败不影响整体安装。

### 7.2 卸载包

```bash
# 卸载本地包
npm uninstall express
npm remove express
npm rm express  # 简写

# 卸载并从 package.json 移除
npm uninstall express

# 卸载全局包
npm uninstall -g nodemon
```

### 7.3 清理未使用的包

```bash
# 移除未在 package.json 中声明的包
npm prune

# 移除 devDependencies（生产环境）
npm prune --production
```

## 8. NPM 配置

### 8.1 查看配置

```bash
# 查看所有配置
npm config list
npm config ls

# 查看详细配置
npm config list -l

# 查看特定配置
npm config get registry
npm config get prefix
```

### 8.2 修改配置

```bash
# 设置配置
npm config set key value

# 删除配置
npm config delete key

# 编辑配置文件
npm config edit
```

### 8.3 常用配置

```bash
# 设置镜像源
npm config set registry https://registry.npmmirror.com

# 恢复官方源
npm config set registry https://registry.npmjs.org

# 设置代理
npm config set proxy http://proxy.example.com:8080
npm config set https-proxy http://proxy.example.com:8080

# 设置全局安装路径
npm config set prefix "C:\Program Files\nodejs"

# 设置缓存路径
npm config set cache "C:\npm-cache"
```

### 8.4 配置文件位置

```bash
# 项目配置: .npmrc (项目根目录)
registry=https://registry.npmmirror.com

# 用户配置: ~/.npmrc
# 全局配置: /etc/npmrc (Linux) 或 %ProgramData%\npm\etc\npmrc (Windows)
```

## 9. NPM 镜像源

### 9.1 常用镜像

```bash
# 淘宝镜像（推荐）
npm config set registry https://registry.npmmirror.com

# 官方源
npm config set registry https://registry.npmjs.org

# 腾讯云镜像
npm config set registry http://mirrors.cloud.tencent.com/npm/

# 华为云镜像
npm config set registry https://repo.huaweicloud.com/repository/npm/
```

### 9.2 使用 nrm 管理源

```bash
# 安装 nrm
npm install -g nrm

# 查看所有源
nrm ls

# 切换源
nrm use taobao
nrm use npm

# 测试源速度
nrm test

# 添加自定义源
nrm add custom https://registry.example.com
```

### 9.3 临时使用镜像

```bash
# 临时使用淘宝镜像安装
npm install express --registry=https://registry.npmmirror.com

# 注意：旧的 registry.npm.taobao.org 域名已于 2022 年停止解析，
# 请统一使用新域名 registry.npmmirror.com
```

## 10. 发布 NPM 包

### 10.1 注册 NPM 账号

```bash
# 在 npmjs.com 注册账号

# 登录
npm login
# 输入用户名、密码、邮箱

# 查看登录状态
npm whoami
```

### 10.2 准备发布

```json
{
  "name": "my-awesome-package",
  "version": "1.0.0",
  "description": "An awesome package",
  "main": "index.js",
  "keywords": ["awesome", "package"],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/repo.git"
  },
  "bugs": {
    "url": "https://github.com/username/repo/issues"
  },
  "homepage": "https://github.com/username/repo#readme"
}
```

创建 `.npmignore` 文件:

```
# .npmignore
tests/
.git/
.vscode/
*.test.js
.env
node_modules/
```

### 10.3 发布包

```bash
# 确保使用官方源
npm config set registry https://registry.npmjs.org

# 发布
npm publish

# 发布 beta 版本
npm publish --tag beta

# 更新版本
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# 发布新版本
npm publish
```

### 10.4 包的维护

```bash
# 撤销发布（72小时内）
npm unpublish package-name --force

# 废弃某个版本
npm deprecate package-name@version "原因"

# 更新包信息
npm publish
```

## 11. 实战案例

### 案例 1: 创建 CLI 工具包

```javascript
// bin/cli.js
#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');

program
  .version('1.0.0')
  .description('我的 CLI 工具');

program
  .command('init <name>')
  .description('初始化一个新项目')
  .action(async (name) => {
    console.log(chalk.blue(`创建项目: ${name}`));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: '选择模板:',
        choices: ['basic', 'advanced', 'full']
      }
    ]);

    console.log(chalk.green(`✓ 项目创建成功!`));
  });

program.parse(process.argv);
```

```json
{
  "name": "my-cli-tool",
  "version": "1.0.0",
  "bin": {
    "my-tool": "./bin/cli.js"
  },
  "dependencies": {
    "commander": "^10.0.0",
    "chalk": "^4.1.2",
    "inquirer": "^8.2.5"
  }
}
```

```bash
# 本地测试
npm link

# 使用
my-tool init my-project

# 发布
npm publish
```

### 案例 2: 项目脚本自动化

```json
{
  "name": "web-app",
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server",
    "build": "npm-run-all clean build:*",
    "build:js": "webpack --mode production",
    "build:css": "sass src/styles:dist/styles --style compressed",
    "clean": "rimraf dist",

    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "test:ci": "jest --ci --coverage --maxWorkers=2",

    "lint": "npm-run-all lint:*",
    "lint:js": "eslint src/**/*.js",
    "lint:css": "stylelint src/**/*.css",
    "lint:fix": "eslint src/**/*.js --fix",

    "format": "prettier --write \"src/**/*.{js,jsx,json,css,md}\"",

    "prepare": "husky install",
    "prepublishOnly": "npm run build && npm run test",

    "release": "npm version patch && git push --follow-tags"
  },
  "devDependencies": {
    "cross-env": "^7.0.3",
    "npm-run-all": "^4.1.5",
    "rimraf": "^4.4.1",
    "webpack": "^5.76.0",
    "webpack-dev-server": "^4.13.1",
    "sass": "^1.60.0",
    "jest": "^29.5.0",
    "eslint": "^8.38.0",
    "stylelint": "^15.4.0",
    "prettier": "^2.8.7",
    "husky": "^8.0.3"
  }
}
```

### 案例 3: Monorepo 工作空间

```json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces",
    "lint": "npm run lint --workspaces"
  }
}
```

项目结构:

```
my-monorepo/
├── package.json
├── packages/
│   ├── package-a/
│   │   └── package.json
│   ├── package-b/
│   │   └── package.json
│   └── package-c/
│       └── package.json
```

```bash
# 安装所有工作空间依赖
npm install

# 为特定工作空间安装包
npm install lodash --workspace=packages/package-a

# 在所有工作空间运行脚本
npm run build --workspaces

# 在特定工作空间运行
npm run test --workspace=packages/package-a
```

### 案例 4: 包版本管理

```javascript
// scripts/check-deps.js
const { execSync } = require('child_process');
const chalk = require('chalk');

console.log(chalk.blue('检查过时的依赖...\n'));

try {
  const output = execSync('npm outdated --json', { encoding: 'utf8' });
  const outdated = JSON.parse(output);

  if (Object.keys(outdated).length === 0) {
    console.log(chalk.green('✓ 所有依赖都是最新的!'));
    process.exit(0);
  }

  console.log(chalk.yellow('发现过时的依赖:\n'));

  for (const [name, info] of Object.entries(outdated)) {
    console.log(`${chalk.cyan(name)}`);
    console.log(`  当前版本: ${chalk.red(info.current)}`);
    console.log(`  需要版本: ${chalk.yellow(info.wanted)}`);
    console.log(`  最新版本: ${chalk.green(info.latest)}\n`);
  }

  console.log(chalk.blue('运行 npm update 来更新依赖'));
  process.exit(1);
} catch (error) {
  console.log(chalk.green('✓ 所有依赖都是最新的!'));
}
```

```json
{
  "scripts": {
    "check-deps": "node scripts/check-deps.js",
    "update-deps": "npm update && npm audit fix"
  }
}
```

## 12. 最佳实践

### 12.1 版本控制

```bash
✅ 提交 package.json 和 package-lock.json
✅ 不提交 node_modules/
✅ 使用 .gitignore 排除不必要的文件
```

### 12.2 依赖管理

```bash
✅ 明确区分 dependencies 和 devDependencies
✅ 定期更新依赖 (npm outdated, npm update)
✅ 审计安全漏洞 (npm audit)
✅ 锁定关键依赖版本
❌ 避免使用 * 或 latest
```

### 12.3 脚本规范

```bash
✅ 使用有意义的脚本名称
✅ 添加脚本注释说明
✅ 使用 pre/post 钩子
✅ 跨平台兼容（使用 cross-env, rimraf 等）
```

### 12.4 安全性

```bash
# 审计漏洞
npm audit

# 自动修复
npm audit fix

# 查看详细报告
npm audit --json

# 检查包的许可证
npx license-checker
```

## 13. 常用命令速查

```bash
# 安装
npm install                    # 安装所有依赖
npm install <package>          # 安装包
npm install -D <package>       # 安装开发依赖
npm install -g <package>       # 全局安装

# 卸载
npm uninstall <package>        # 卸载包
npm uninstall -g <package>     # 全局卸载

# 更新
npm update                     # 更新所有包
npm update <package>           # 更新特定包

# 查看
npm list                       # 查看已安装包
npm list -g --depth=0          # 查看全局包
npm outdated                   # 查看过时的包
npm view <package> versions    # 查看包的所有版本

# 脚本
npm run <script>               # 运行脚本
npm start                      # 运行 start 脚本
npm test                       # 运行 test 脚本

# 发布
npm login                      # 登录
npm publish                    # 发布包
npm version <type>             # 更新版本

# 配置
npm config list                # 查看配置
npm config set <key> <value>   # 设置配置

# 其他
npm init                       # 初始化项目
npm ci                         # CI 环境安装
npm audit                      # 安全审计
npm cache clean --force        # 清除缓存
```

## 14. 总结

NPM 是 Node.js 生态系统的核心，掌握 NPM 对于 Node.js 开发至关重要。

### 关键要点

1. **package.json**: 项目的核心配置文件
2. **版本管理**: 理解语义化版本和版本范围
3. **依赖分类**: 正确区分不同类型的依赖
4. **脚本自动化**: 使用 npm scripts 提高开发效率
5. **安全性**: 定期审计和更新依赖

### 常见面试问法

> 💡 **面试高频问题**：
> - **`dependencies` 和 `devDependencies` 有什么区别？** 前者是生产运行时必需的依赖（如 express）；后者只在开发阶段用（如 jest、eslint、nodemon）。生产部署时用 `npm install --omit=dev` 可跳过 devDependencies。
> - **`package.json` 和 `package-lock.json` 的区别？** 前者声明依赖的版本**范围**（如 `^4.18.2`）；后者锁定整棵依赖树的**精确版本**和下载地址，保证团队和 CI 装出完全一致的依赖。两者都要提交到 Git。
> - **`npm install` 和 `npm ci` 的区别？** `npm install` 会按版本范围解析、可能更新 lock 文件；`npm ci` 严格按 lock 文件安装，会先删掉 node_modules，更快更稳定，专用于 CI/CD。
> - **`^` 和 `~` 的区别？** `^` 锁主版本号（`^4.18.2` 允许 `<5.0.0`）；`~` 锁到次版本号（`~4.18.2` 允许 `<4.19.0`）。注意主版本号为 0 时 `^` 行为特殊（见上文）。
> - **`npx` 是做什么的？** 临时下载并执行一个包而无需全局安装，常用于脚手架（如 `npx create-react-app`），用完即弃，避免污染全局环境。

### 替代工具

- **Yarn**: 更快的包管理器，早期凭 lock 文件和并行安装流行
- **pnpm**: 用硬链接 + 内容寻址存储，节省磁盘空间、安装更快（推荐）
- **Bun**: 新一代 JavaScript 运行时，内置极快的包管理器
