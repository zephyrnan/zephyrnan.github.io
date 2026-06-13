---
title: Windows + WSL + Docker 踩坑与通关指南
date: 2025-12-05
categories:
   - 开发工具
tags:
   - WSL
   - Docker
---

# Windows + WSL + Docker 踩坑与通关指南

## 🛑 核心误区回顾（最重要的坑）

**问题现象**：

在寻找 Docker 设置时，你发现在“设置”里根本找不到 `Resources` -> `WSL integration` 菜单，甚至截图发来了 Windows 自带的 WSL 设置窗口。

**真相复盘**：
我们混淆了 **“系统功能”** 和 **“应用软件”**。

- **WSL** 只是 Windows 的一个底层功能（地基）。
- **Docker Desktop 码头工人的桌面** 是一个独立的软件（房子）。
- **结论**：菜单找不到，是因为电脑上根本还没下载安装 Docker Desktop 这个软件。装好软件，菜单自然就有了。

------

## 🛠️ 完整搭建流程（正确路线）

### 1. WSL 系统准备 (F 盘安家)

我们没有使用默认的 C 盘安装，而是把系统搬到了 F 盘。

- **状态**：Ubuntu 运行在 `F:\WSL\Ubuntu`。
- **注意**：搬家（`wsl --export` 导出、`wsl --import` 到新位置）后，导入的实例会默认用 root 登录，需要修改 `/etc/wsl.conf` 找回默认用户 (`hhn`)，否则每次进终端都是 root 权限。

`/etc/wsl.conf` 配置示例（用 `sudo nano /etc/wsl.conf` 编辑）：

```ini
[user]
# 设置默认登录用户，替换成你自己的用户名
default=hhn
```

改完后在 Windows 的 PowerShell 里执行 `wsl --shutdown`，再重新打开 Ubuntu 即可生效。

### 2. 软件安装顺序

1. 先装 Docker Desktop：

   [https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe](https://desktop.docker.com/win/main/amd64/Docker Desktop Installer.exe)

   - 下载 Windows 版安装包。
   - 安装时勾选 `Use WSL 2 instead of Hyper-V`。

2. 配置 WSL 关联：

   - 打开 Docker Desktop 设置 -> Resources -> WSL Integration。
   - 打开 `Ubuntu` 的开关。
   - *（这一步打通了 Windows Docker 和 Linux 终端的连接）*

### 3. 解决网络问题 (配置镜像源)

**报错现象**：
`failed to fetch oauth token: Post "https://auth.docker.io/token": dial tcp ... i/o timeout`
**解决方案**：
在 Docker Engine 中填入国内镜像加速配置（如 `docker.m.daocloud.io` 等）。

### 4. 前端项目实战

**报错现象**：
`MIME type of "text/css"` 或 `404 Not Found`。
**原因**：
试图把没编译的 `.vue` / `.js` 源码直接给 Nginx 跑。
**解决方案**：
先 `npm run build` 生成 `dist` 目录，再 COPY 进容器。

------

## 💣 踩坑合集（遇到报错看这里）

这是我们在聊天中遇到过的所有报错，对应的解决方案如下：

### 坑位 1：在错误的地方输入命令

- **报错**：PowerShell 提示 `docker : 无法将“docker”项识别为 cmdlet...`
- **原因**：你在 Windows 的 PowerShell 里，也没配环境变量。
- **解法**：**永远在 WSL (Ubuntu) 终端里操作**，或者在 VS Code 左下角看到 `WSL: Ubuntu` 时操作。

### 坑位 2：听信了 Linux 的“鬼话”

- **报错**：输入 docker 时提示 `Command 'docker' not found, but can be installed with: sudo apt install docker.io`
- **原因**：Ubuntu 以为你没装 Docker，推荐你去下它的老版本。
- **解法**：**绝对不要执行 `sudo apt install docker`**。应该去 Docker Desktop 的设置里把 `WSL Integration` 开关打开，直接复用 Windows 的引擎。

### 坑位 3：找不到 Resources 菜单

- **原因**：Docker Desktop 的 `General` 设置里，`Use the WSL 2 based engine` 总开关没开，或者软件没启动。
- **解法**：确保 General 里的 WSL 2 勾选 -> Apply & Restart -> 菜单出现。

### 坑位 4：WSL 版本是 1，Docker 用不了

- **报错**：Docker Desktop 提示 `WSL 2 is not installed` 或集成开关点不动。
- **原因**：发行版当前跑在 WSL 1 上，Docker Desktop 只支持 WSL 2。
- **解法**：在 PowerShell 里检查并升级。

```powershell
# 查看每个发行版的 WSL 版本
wsl -l -v

# 把 Ubuntu 升级到 WSL 2
wsl --set-version Ubuntu 2

# （可选）把以后新装的发行版默认设为 WSL 2
wsl --set-default-version 2
```

### 坑位 5：磁盘空间被 WSL 吃光 / 改了文件 Docker 没反应

- **现象**：C 盘越来越满，或者 `localhost:8080` 打不开。
- **排查**：
  - C 盘满：WSL 的虚拟磁盘 `ext4.vhdx` 只增不减，可在 PowerShell 用 `wsl --shutdown` 后用 `diskpart` 的 `compact vdisk` 压缩。
  - 端口打不开：先 `docker ps` 看容器是否在运行；注意要在 **WSL 终端**里访问项目文件（路径在 `/home/...` 下），不要把项目放在 `/mnt/c/...`，那样文件读写会非常慢。

------

## 📜 最终成功的配置代码

### 1. Docker Engine 配置 (解决网络卡顿)

位置：Docker Desktop -> Settings -> Docker Engine

```json
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://huecker.io",
    "https://dockerhub.timeweb.cloud",
    "https://noohub.ru"
  ]
}
```

> 💡 提示：改完镜像源后，记得点右下角 `Apply & Restart` 重启 Docker，配置才会生效。

### 2. 标准前端 Dockerfile

位置：项目根目录

```dockerfile
# 使用 Nginx 作为静态服务器（alpine 体积小）
FROM nginx:alpine

# 关键点：只复制打包后的 dist 目录到 Nginx 默认网站目录
COPY dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 容器启动时以前台方式运行 Nginx（Docker 要求主进程不退出）
CMD ["nginx", "-g", "daemon off;"]
```

> 💡 提示：建议在项目根目录再建一个 `.dockerignore` 文件，写入 `node_modules` 和 `dist`，避免把多余文件打进镜像、拖慢构建。

### 3. 启动命令

```bash
# 1. 先打包源码，生成 dist 目录
npm run build

# 2. 构建镜像（-t 给镜像起名字，末尾的 . 表示用当前目录的 Dockerfile）
docker build -t my-site-prod .

# 3. 启动容器（-d 后台运行，-p 把宿主机 8080 映射到容器 80 端口）
docker run -d -p 8080:80 my-site-prod

# 4. 查看正在运行的容器
docker ps

# 浏览器访问 http://localhost:8080 即可看到页面
```

------

# 🔗 附录：常用资源与下载链接

### 1. Docker Desktop (Windows)

这是我们“找不到菜单”时缺少的那个核心软件。

- **官方下载页**：https://www.docker.com/products/docker-desktop/
- **直接下载链接 (Windows x64)**：[Docker Desktop Installer.exe](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)

### 2. nvm (Node 版本管理)

用于在 Linux (WSL) 里安装并切换 Node.js 版本。

- **GitHub 原版**（国外）：[https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
- **Gitee 镜像版**（国内推荐，解决网络卡顿）：[https://gitee.com/RubyMetric/nvm-cn](https://gitee.com/RubyMetric/nvm-cn)
  - *安装命令*：`bash -c "$(curl -fsSL https://gitee.com/RubyMetric/nvm-cn/raw/main/install.sh)"`
  - *安装完成后常用命令*：

```bash
# 重新加载配置（或重开终端）
source ~/.bashrc

# 安装最新 LTS 版 Node
nvm install --lts

# 查看已安装版本
nvm ls

# 切换版本
nvm use 20
```

### 3. Docker 镜像加速地址 (国内)

用于解决 `i/o timeout` 和拉取镜像慢的问题。配置在 Docker Engine 中。

- **道客云 (DaoCloud)**: `https://docker.m.daocloud.io`
- **Huecker**: `https://huecker.io`
- **Noohub**: `https://noohub.ru`

### 4. VS Code 插件

- **WSL 插件 (Microsoft)**：在 VS Code 扩展商店搜索 `WSL` 安装。装好后，在 WSL 里进入项目目录执行 `code .`，即可用 Windows 的 VS Code 直接编辑 Linux 里的文件。
  - *链接*：https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl

### 5. 参考文档

- **微软官方 WSL 安装指南**：https://learn.microsoft.com/zh-cn/windows/wsl/install
- **Vite 官方文档**：https://cn.vitejs.dev/guide/

**结语**：

你已经成功在 F 盘的 Linux 子系统里，连接了 Windows 的 Docker 引擎，并成功部署了一个 Vite 项目。这套环境非常稳健，以后开发项目直接 `code .` 启动即可！