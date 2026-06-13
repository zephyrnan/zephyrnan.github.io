---
title: GitHub 新手完全指南
date: 2025-11-20
categories:
  - 开发工具
tags:
  - Git
  - GitHub
---

# GitHub 新手完全指南

## 目录
1. [前置准备](#前置准备)
2. [核心概念](#核心概念)
3. [基础命令详解](#基础命令详解)
4. [完整工作流程](#完整工作流程)
5. [常见错误与解决方案](#常见错误与解决方案)
6. [实战案例](#实战案例)
7. [进阶技巧](#进阶技巧)

---

## 前置准备

### 1. 安装 Git

**Windows 用户**
- 访问 [https://git-scm.com/download/win](https://git-scm.com/download/win) 下载安装包
- 安装时建议勾选 "Git Bash Here"
- 验证安装：打开命令行输入 `git --version`

**macOS 用户**
```bash
# 使用 Homebrew 安装
brew install git
```

**Linux 用户**
```bash
# Ubuntu/Debian
sudo apt-get install git

# CentOS/RHEL
sudo yum install git
```

### 2. 注册 GitHub 账号

访问 [https://github.com](https://github.com) 注册账号

### 3. 配置 Git 用户信息

```bash
# 设置全局用户名
git config --global user.name "你的用户名"

# 设置全局邮箱（建议与 GitHub 注册邮箱一致）
git config --global user.email "your_email@example.com"

# 查看配置
git config --list
```

> ⚠️ **注意事项**:
> - **--global vs --local**:
>   - `--global`: 全局配置,对所有Git仓库生效
>   - `--local`: 仅对当前仓库生效(省略--global即为本地)
> - **邮箱要匹配**: 邮箱最好与GitHub注册邮箱一致,否则贡献记录可能不显示
> - **中文用户名**: 支持中文,但建议使用英文避免兼容性问题
> - **查看特定配置**: `git config user.name` 或 `git config user.email`
> - **配置文件位置**:
>   - 全局: `~/.gitconfig` (Windows: `C:\Users\用户名\.gitconfig`)
>   - 本地: `.git/config`
>
> ```bash
> # 常见错误:邮箱设置错误
> git config --global user.email "email@example"  # ❌ 无效邮箱格式
> git config --global user.email "email@example.com"  # ✅ 正确
>
> # 为单个项目设置不同的用户信息
> cd my-work-project
> git config --local user.email "work@company.com"  # 工作邮箱
>
> cd ../my-personal-project
> git config --local user.email "personal@gmail.com"  # 个人邮箱
>
> # 查看生效的配置
> git config --list --show-origin  # 显示每个配置的来源
> ```

> 🎯 **实际应用场景**:
> ```bash
> # 场景1:初次安装Git后的全局配置
> git config --global user.name "Zhang San"
> git config --global user.email "zhangsan@example.com"
> git config --global core.editor "code --wait"  # 设置默认编辑器为VSCode
> git config --global init.defaultBranch main  # 设置默认分支名为main
>
> # 场景2:工作电脑配置多个Git账户
> # 全局使用工作账户
> git config --global user.name "Work Name"
> git config --global user.email "work@company.com"
>
> # 个人项目使用个人账户
> cd ~/personal-projects/my-blog
> git config --local user.name "Personal Name"
> git config --local user.email "personal@gmail.com"
>
> # 场景3:配置Git常用别名
> git config --global alias.st status  # git st = git status
> git config --global alias.co checkout  # git co = git checkout
> git config --global alias.br branch  # git br = git branch
> git config --global alias.cm "commit -m"  # git cm "msg"
> git config --global alias.last "log -1 HEAD"  # 查看最后一次提交
>
> # 场景4:配置中文文件名显示
> git config --global core.quotepath false  # 显示中文文件名而不是转义字符
>
> # 场景5:配置Windows/Linux换行符处理
> # Windows用户
> git config --global core.autocrlf true
> # Linux/macOS用户
> git config --global core.autocrlf input
> ```

### 4. 配置 SSH 密钥（推荐）

**为什么需要 SSH？**
使用 SSH 可以避免每次推送代码时输入用户名和密码。

**生成 SSH 密钥**
```bash
# 生成密钥（推荐 ed25519 算法，更短更安全；邮箱替换为你的 GitHub 邮箱）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 一路按回车，使用默认设置
# 密钥保存在 ~/.ssh/id_ed25519.pub（公钥）和 ~/.ssh/id_ed25519（私钥）
# 注意：公钥(.pub)可以分享，私钥绝对不能泄露给任何人

# 如果系统较老不支持 ed25519，再退回用 RSA：
# ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

**添加公钥到 GitHub**
1. 复制公钥内容：
   ```bash
   # Windows (Git Bash)
   cat ~/.ssh/id_ed25519.pub | clip

   # macOS
   cat ~/.ssh/id_ed25519.pub | pbcopy

   # Linux
   cat ~/.ssh/id_ed25519.pub
   ```

2. 登录 GitHub → 点击头像 → Settings → SSH and GPG keys → New SSH key
3. 粘贴公钥内容，设置标题（如 "My Laptop"），点击 Add SSH key

**测试连接**
```bash
ssh -T git@github.com
# 成功会显示：Hi username! You've successfully authenticated...
```

---

## 核心概念

### Git 与 GitHub 的区别
- **Git**: 分布式版本控制系统（软件工具）
- **GitHub**: 基于 Git 的代码托管平台（网站服务）

### 三个重要区域
```
工作区 (Working Directory)  →  暂存区 (Staging Area)  →  本地仓库 (Repository)  →  远程仓库 (Remote)
   |                              |                         |                           |
你编辑的文件                    git add                   git commit               git push
```

### 分支（Branch）
- **main/master**: 主分支，生产环境代码
- **develop**: 开发分支
- **feature/xxx**: 功能分支
- **hotfix/xxx**: 紧急修复分支

---

## 基础命令详解

### 1. `git init` - 初始化仓库

**作用**
在当前目录创建一个新的 Git 仓库，生成隐藏的 `.git` 文件夹。

**用法**
```bash
cd my-project
git init
```

**注意事项**
- 只在项目首次纳入 Git 管理时使用
- 重复执行不会有副作用，但会提示 "Reinitialized existing Git repository"
- 不要在用户根目录（如 `~` 或 `C:\Users\Username`）执行

---

### 2. `git clone` - 克隆远程仓库

**作用**
将远程仓库复制到本地。

**用法**
```bash
# HTTPS 方式（无需配置 SSH）
git clone https://github.com/username/repo.git

# SSH 方式（需配置 SSH 密钥）
git clone git@github.com:username/repo.git

# 克隆到指定目录
git clone git@github.com:username/repo.git my-folder
```

**常见错误**
```bash
# ❌ 错误：Permission denied (publickey)
# 原因：SSH 密钥未配置或未添加到 GitHub
# 解决：重新配置 SSH 密钥（参考前置准备第4步）
```

---

### 3. `git status` - 查看状态

**作用**
查看当前工作区和暂存区的状态。

**用法**
```bash
git status
```

**输出示例**
```
On branch main
Changes not staged for commit:
  modified:   README.md          # 已修改但未暂存

Untracked files:
  new-file.txt                   # 新文件，未追踪
```

**技巧**
```bash
# 简洁输出
git status -s
```

---

### 4. `git add` - 添加到暂存区

**作用**
将文件的修改添加到暂存区，准备提交。

**用法**
```bash
# 添加所有文件
git add .

# 添加指定文件
git add README.md

# 添加多个文件
git add file1.txt file2.txt

# 添加某个目录下所有文件
git add src/
```

**常见错误**
```bash
# ❌ 错误：添加了不该提交的文件（如 node_modules、.env）
# 解决：创建 .gitignore 文件
```

**.gitignore 示例**
```
# 依赖目录
node_modules/
vendor/

# 环境配置文件
.env
.env.local

# 编译产物
dist/
build/
*.pyc

# IDE 配置
.vscode/
.idea/

# 系统文件
.DS_Store
Thumbs.db
```

---

### 5. `git commit` - 提交到本地仓库

**作用**
将暂存区的内容提交到本地仓库，并附上提交说明。

**用法**
```bash
# 提交并添加说明
git commit -m "feat: 添加用户登录功能"

# 提交所有已追踪文件的修改（跳过 git add）
git commit -am "fix: 修复登录按钮样式"

# 修改上一次提交（未推送到远程时）
git commit --amend -m "新的提交信息"
```

**提交信息规范（推荐）**
```
feat: 新功能
fix: 修复 Bug
docs: 文档更新
style: 代码格式调整
refactor: 重构代码
test: 测试相关
chore: 构建/工具链更新

# 示例
git commit -m "feat: 添加文章评论功能"
git commit -m "fix: 修复评论时间显示错误"
```

**常见错误**
```bash
# ❌ 错误：Please tell me who you are.
# 原因：未配置用户信息
# 解决：
git config --global user.name "你的用户名"
git config --global user.email "your_email@example.com"
```

---

### 6. `git log` - 查看提交历史

**用法**
```bash
# 查看完整历史
git log

# 单行显示
git log --oneline

# 图形化显示分支历史
git log --graph --oneline --all

# 查看最近 3 次提交
git log -3
```

---

### 7. `git remote` - 管理远程仓库

**作用**
管理与远程仓库的关联。

**用法**
```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin git@github.com:username/repo.git

# 修改远程仓库地址
git remote set-url origin git@github.com:username/new-repo.git

# 删除远程仓库关联
git remote remove origin
```

**常见错误**
```bash
# ❌ 错误：remote origin already exists
# 原因：已存在名为 origin 的远程仓库
# 解决：
git remote remove origin
git remote add origin git@github.com:username/repo.git

# 或者使用不同的名称
git remote add upstream git@github.com:username/repo.git
```

---

### 8. `git push` - 推送到远程仓库

**作用**
将本地提交推送到远程仓库。

**用法**
```bash
# 首次推送（设置上游分支）
git push -u origin main

# 后续推送
git push

# 推送所有分支
git push --all

# 删除远程分支
git push origin --delete feature-branch
```

**强制推送（谨慎使用）**
```bash
# ⚠️ 危险操作：覆盖远程历史
git push --force

# ✅ 更安全的强制推送（检测远程是否有新提交）
git push --force-with-lease
```

**常见错误**
```bash
# ❌ 错误：Updates were rejected because the tip of your current branch is behind
# 原因：远程仓库有新的提交，本地落后
# 解决：
git pull origin main
# 解决冲突后再推送
git push

# ❌ 错误：failed to push some refs
# 原因：未设置上游分支
# 解决：
git push -u origin main
```

---

### 9. `git pull` - 拉取远程更新

**作用**
从远程仓库拉取最新代码并合并到本地。

**用法**
```bash
# 拉取当前分支
git pull

# 拉取指定分支
git pull origin main

# 拉取并使用 rebase 模式
git pull --rebase
```

**pull 与 fetch 的区别**
```bash
# git pull = git fetch + git merge
git pull

# 仅下载远程更新，不合并
git fetch
git merge origin/main
```

**解决冲突**
```bash
# 当拉取时出现冲突
# 1. 手动编辑冲突文件，查找 <<<<<<<, =======, >>>>>>> 标记
# 2. 保留需要的内容，删除标记
# 3. 添加并提交
git add .
git commit -m "resolve merge conflict"
```

---

### 10. `git branch` - 分支管理

**用法**
```bash
# 查看所有本地分支
git branch

# 查看所有分支（包括远程）
git branch -a

# 创建新分支
git branch feature-login

# 切换分支
git checkout feature-login

# 创建并切换到新分支（推荐）
git checkout -b feature-login

# 删除本地分支
git branch -d feature-login

# 强制删除未合并的分支
git branch -D feature-login

# 重命名分支
git branch -m old-name new-name
```

---

### 11. `git merge` - 合并分支

**用法**
```bash
# 将 feature 分支合并到当前分支
git merge feature-login

# 使用 --no-ff 保留分支历史
git merge --no-ff feature-login
```

**冲突解决流程**
```bash
# 1. 合并时出现冲突
git merge feature-login
# Auto-merging file.txt
# CONFLICT (content): Merge conflict in file.txt

# 2. 查看冲突文件
git status

# 3. 手动编辑冲突文件
# <<<<<<< HEAD
# 当前分支的内容
# =======
# 被合并分支的内容
# >>>>>>> feature-login

# 4. 保留需要的内容，删除标记

# 5. 标记为已解决
git add file.txt

# 6. 完成合并
git commit -m "merge: 合并登录功能分支"
```

---

## 完整工作流程

### 场景一：创建新项目并上传到 GitHub

```bash
# 1. 在本地创建项目目录
mkdir my-project
cd my-project

# 2. 初始化 Git 仓库
git init

# 3. 创建文件
echo "# My Project" > README.md

# 4. 添加到暂存区
git add .

# 5. 提交到本地仓库
git commit -m "feat: 初始化项目"

# 6. 在 GitHub 创建新仓库（通过网页操作）

# 7. 关联远程仓库
git remote add origin git@github.com:username/my-project.git

# 8. 设置主分支名为 main
git branch -M main

# 9. 推送到远程仓库
git push -u origin main
```

**常见问题**
```bash
# ❌ 如果 GitHub 自动创建了 README.md，会报错
# 解决方法：
git pull --rebase origin main
git push -u origin main
```

---

### 场景二：参与开源项目协作

```bash
# 1. Fork 目标仓库（通过 GitHub 网页）

# 2. 克隆你 Fork 的仓库
git clone git@github.com:yourusername/open-source-project.git
cd open-source-project

# 3. 添加上游仓库
git remote add upstream git@github.com:original-owner/open-source-project.git

# 4. 创建功能分支
git checkout -b feature-new-function

# 5. 修改代码并提交
git add .
git commit -m "feat: 添加新功能"

# 6. 推送到你的 Fork 仓库
git push origin feature-new-function

# 7. 在 GitHub 创建 Pull Request（通过网页）

# 8. 保持你的分支与上游同步
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

### 场景三：日常开发流程

```bash
# 1. 每天开始工作前，拉取最新代码
git checkout main
git pull origin main

# 2. 创建功能分支
git checkout -b feature-user-profile

# 3. 开发并提交
git add .
git commit -m "feat: 完成用户资料页面"

# 4. 推送到远程
git push origin feature-user-profile

# 5. 创建 Pull Request 进行代码审查

# 6. 合并到主分支后，删除功能分支
git checkout main
git pull origin main
git branch -d feature-user-profile
git push origin --delete feature-user-profile
```

---

## 常见错误与解决方案

### 错误 1：提交了敏感信息

**场景**
不小心将包含密码的 `.env` 文件提交到仓库。

**解决方案**
```bash
# ❌ 错误做法：直接删除文件再提交（历史记录仍存在）

# ✅ 正确做法：从所有历史记录中彻底移除文件

# 方法一（官方推荐）：git filter-repo（需先安装：pip install git-filter-repo）
# git filter-branch 已被官方标记为不推荐，filter-repo 更快更安全
git filter-repo --invert-paths --path .env

# 重新关联远程并强制推送（filter-repo 会清掉 origin，需要重新添加）
git remote add origin git@github.com:username/repo.git
git push --force --all

# 方法二：使用 BFG Repo-Cleaner（更快，需要 Java 环境）
# 下载 https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --delete-files .env
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force --all
```

> ⚠️ **重要**：只要密钥/密码被推送到过远程仓库，就应视为已泄露。清理历史后，务必去对应平台**重置（rotate）**这些密码、Token、API Key，否则别人可能已经从历史记录里拿到了它们。

**预防措施**
```bash
# 1. 创建 .gitignore
echo ".env" >> .gitignore

# 2. 使用 git-secrets 工具
git secrets --install
git secrets --register-aws
```

---

### 错误 2：提交信息写错了

**场景**
提交后发现 commit message 写错了。

**解决方案**
```bash
# 情况一：仅修改最后一次提交信息（未推送）
git commit --amend -m "正确的提交信息"

# 情况二：已经推送到远程
# 不推荐修改，会导致其他人冲突
# 如果必须修改：
git commit --amend -m "正确的提交信息"
git push --force-with-lease
```

---

### 错误 3：忘记切换分支就开始开发

**场景**
应该在 `feature` 分支开发，却在 `main` 分支修改了代码。

**解决方案**
```bash
# 如果还没有提交
# 1. 暂存当前修改
git stash

# 2. 切换到正确的分支
git checkout -b feature-branch

# 3. 恢复修改
git stash pop

# 如果已经提交但未推送
# 1. 创建新分支（保留当前提交）
git checkout -b feature-branch

# 2. 回退 main 分支
git checkout main
git reset --hard HEAD~1
```

---

### 错误 4：需要撤销某次提交

**场景**
某次提交引入了 Bug，需要撤销。

**解决方案**
```bash
# 方法一：revert（推荐，不修改历史）
git revert <commit-hash>
# 会创建一个新的提交来撤销指定提交的更改

# 方法二：reset（危险，修改历史）
# 软重置：保留修改，仅撤销 commit
git reset --soft HEAD~1

# 混合重置：撤销 commit 和 add
git reset --mixed HEAD~1

# 硬重置：彻底删除修改（慎用）
git reset --hard HEAD~1
```

---

### 错误 5：合并时产生大量冲突

**场景**
`git merge` 时出现几十个文件冲突。

**解决方案**
```bash
# 1. 取消当前合并
git merge --abort

# 2. 使用 rebase 代替 merge
git rebase main

# 3. 逐个解决冲突
# 编辑冲突文件 → git add . → git rebase --continue

# 4. 如果冲突太多，跳过某个提交
git rebase --skip

# 5. 完全放弃 rebase
git rebase --abort
```

---

### 错误 6：推送被拒绝

**错误信息**
```
! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'git@github.com:username/repo.git'
```

**原因**
远程仓库有新的提交，本地不是最新版本。

**解决方案**
```bash
# 1. 先拉取远程更新
git pull origin main

# 2. 如果出现冲突，手动解决

# 3. 再次推送
git push origin main

# 如果确定要覆盖远程（谨慎）
git push --force-with-lease
```

---

## 实战案例

### 案例 1：修复线上紧急 Bug

```bash
# 1. 从 main 创建 hotfix 分支
git checkout main
git pull origin main
git checkout -b hotfix-payment-error

# 2. 修复 Bug 并提交
git add src/payment.js
git commit -m "fix: 修复支付金额计算错误"

# 3. 合并到 main
git checkout main
git merge hotfix-payment-error

# 4. 推送到远程
git push origin main

# 5. 打标签
git tag -a v1.0.1 -m "修复支付 Bug"
git push origin v1.0.1

# 6. 同步到开发分支
git checkout develop
git merge hotfix-payment-error

# 7. 删除 hotfix 分支
git branch -d hotfix-payment-error
```

---

### 案例 2：多人协作冲突解决

**场景**
你和同事同时修改了 `config.js` 文件。

```bash
# 1. 你提交了代码
git add config.js
git commit -m "feat: 添加数据库配置"

# 2. 推送时发现冲突
git push origin main
# ! [rejected] main -> main (fetch first)

# 3. 拉取远程代码
git pull origin main
# CONFLICT (content): Merge conflict in config.js

# 4. 查看冲突
cat config.js
```

**冲突文件内容**
```javascript
// config.js
const config = {
<<<<<<< HEAD
  database: 'mysql',  // 你的修改
  port: 3306
=======
  database: 'postgresql',  // 同事的修改
  port: 5432
>>>>>>> origin/main
}
```

**解决冲突**
```javascript
// 保留两者的修改，根据实际需求调整
const config = {
  database: 'postgresql',  // 使用同事的数据库选择
  port: 5432,
  mysql: {  // 你的配置作为备用
    port: 3306
  }
}
```

```bash
# 5. 标记为已解决
git add config.js
git commit -m "merge: 解决数据库配置冲突"

# 6. 推送
git push origin main
```

---

## 进阶技巧

### 1. 使用别名简化命令

```bash
# 设置常用别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.lg "log --graph --oneline --all"

# 使用别名
git st
git co main
git lg
```

---

### 2. 交互式暂存

```bash
# 部分暂存文件
git add -p

# 会逐个显示修改块，选择：
# y - 暂存此块
# n - 不暂存
# s - 分割成更小的块
# q - 退出
```

---

### 3. 查看文件修改历史

```bash
# 查看文件的所有提交历史
git log --follow -- path/to/file

# 查看文件每一行的修改者
git blame file.txt

# 查看某次提交的详细内容
git show <commit-hash>
```

---

### 4. 使用 Git Hooks 自动化

**pre-commit hook 示例**（代码提交前检查）

创建 `.git/hooks/pre-commit` 文件：
```bash
#!/bin/sh
# 运行测试
npm test
if [ $? -ne 0 ]; then
  echo "测试未通过,提交已取消"
  exit 1
fi

# 检查代码规范
npm run lint
if [ $? -ne 0 ]; then
  echo "代码规范检查失败"
  exit 1
fi
```

```bash
# 设置可执行权限
chmod +x .git/hooks/pre-commit
```

---

### 5. 子模块管理

```bash
# 添加子模块
git submodule add https://github.com/user/repo.git lib/repo

# 克隆包含子模块的仓库
git clone --recurse-submodules https://github.com/user/main-repo.git

# 更新子模块
git submodule update --remote
```

---

### 6. 搜索历史提交

```bash
# 搜索包含特定内容的提交
git log -S "function_name"

# 搜索提交信息
git log --grep="关键词"

# 查找删除了某行代码的提交
git log -S "deleted_code" --all
```

---

## 常用资源

### 官方文档
- [Git 官方文档](https://git-scm.com/doc)
- [GitHub 官方文档](https://docs.github.com)

### 可视化工具
- **GitKraken**: 跨平台图形化界面
- **SourceTree**: 免费的 Git GUI
- **GitHub Desktop**: GitHub 官方客户端

### 学习资源
- [Learn Git Branching](https://learngitbranching.js.org/)（交互式教程）
- [Pro Git 中文版](https://git-scm.com/book/zh/v2)

### 速查表
```bash
# 查看帮助
git help <command>
git <command> --help

# 示例
git help commit
```

---

## 总结

### 最重要的命令（新手必会）

```bash
git clone    # 克隆仓库
git status   # 查看状态
git add      # 添加到暂存区
git commit   # 提交
git push     # 推送到远程
git pull     # 拉取远程更新
git branch   # 分支管理
git checkout # 切换分支
git merge    # 合并分支
```

### 黄金法则

1. **频繁提交**：小步快跑，每完成一个功能就提交
2. **写清楚提交信息**：让别人（和未来的自己）能看懂
3. **推送前先拉取**：避免冲突
4. **不要推送敏感信息**：使用 `.gitignore`
5. **谨慎使用 `--force`**：除非你知道自己在做什么
6. **善用分支**：不要在 main 分支直接开发
7. **代码审查**：使用 Pull Request 流程

---

**祝你使用 Git/GitHub 顺利！** 遇到问题时，记住：`git help` 是你的好朋友。
