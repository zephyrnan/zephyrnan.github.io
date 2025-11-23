---
title: HTML5 与 CSS 综合学习笔记
date: 2025-11-20
categories:
  - 前端开发
tags:
  - HTML5
  - CSS
---

# HTML5 与 CSS 综合学习笔记

## 前言

HTML 和 CSS 是前端开发的基石，两者相辅相成：
- **HTML**（HyperText Markup Language）负责网页的结构和内容
- **CSS**（Cascading Style Sheets）负责网页的样式和布局

本笔记将 HTML5 和 CSS 结合在一起学习，帮助你更好地理解它们之间的关系。

---

# 第一部分：HTML5 基础

## 一、HTML5 简介

### 1. 什么是 HTML5

- **HTML5** 是 HTML 的第五个版本，是构建 Web 内容的标准标记语言
- HTML5 于 2014 年 10 月由 W3C 正式发布
- HTML5 不仅仅是 HTML 的升级，还包含了 CSS3 和 JavaScript API

> 💡 **理解要点**：
> - **标记语言**：使用标签（Tag）来描述内容的结构和语义
> - **超文本**：可以包含链接、图片、音视频等多媒体内容
> - **跨平台**：可以在任何设备和浏览器上运行
> - **向后兼容**：HTML5 兼容旧版本的 HTML 标签

### 2. HTML5 的优势

- **语义化标签**：`<header>`、`<nav>`、`<article>`、`<footer>` 等，让代码更清晰
- **多媒体支持**：原生支持音频 `<audio>` 和视频 `<video>`，无需插件
- **图形绘制**：`<canvas>` 和 `<svg>` 支持 2D/3D 图形绘制
- **本地存储**：localStorage 和 sessionStorage 提供客户端存储
- **离线应用**：通过 Application Cache 支持离线访问
- **更好的表单**：新的 input 类型和表单验证功能
- **地理定位**：Geolocation API 获取用户位置
- **拖放功能**：原生支持拖放操作

### 3. HTML 文档基本结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 页面内容 -->
    <h1>欢迎学习 HTML5</h1>
    <p>这是一个段落。</p>

    <script src="script.js"></script>
</body>
</html>
```

> 💡 **各部分说明**：
> - `<!DOCTYPE html>`：告诉浏览器这是 HTML5 文档
> - `<html lang="zh-CN">`：根元素，lang 属性指定语言
> - `<head>`：包含文档的元数据（meta information）
> - `<meta charset="UTF-8">`：指定字符编码为 UTF-8
> - `<meta name="viewport">`：响应式设计必备，控制移动端视口
> - `<title>`：页面标题，显示在浏览器标签页
> - `<body>`：页面的可见内容
> - `<script>`：建议放在 body 底部，避免阻塞页面渲染

> ⚠️ **注意事项**:
> - **DOCTYPE必须位于第一行**: 否则浏览器可能进入怪异模式(Quirks Mode)
> - **UTF-8编码**: 避免中文乱码,必须设置charset
> - **viewport设置**: width=device-width确保移动端正常显示
> - **title很重要**: 影响SEO和浏览器标签显示
> - **script位置**: 放在body底部或使用defer/async属性
>
> ```html
> <!-- 常见错误:缺少DOCTYPE -->
> <html>  <!-- ❌ 缺少<!DOCTYPE html> -->
>   <head>...</head>
> </html>
>
> <!-- 常见错误:charset写错 -->
> <meta charset="utf8">  <!-- ❌ 应该是UTF-8 -->
> <meta charset="UTF-8"> <!-- ✅ 正确 -->
>
> <!-- script的三种加载方式 -->
> <script src="app.js"></script>           <!-- 阻塞渲染 -->
> <script src="app.js" defer></script>     <!-- 延迟执行,保持顺序 -->
> <script src="app.js" async></script>     <!-- 异步加载,不保证顺序 -->
> ```

> 🎯 **实际应用场景**:
> ```html
> <!-- 场景1:完整的现代HTML5模板 -->
> <!DOCTYPE html>
> <html lang="zh-CN">
> <head>
>     <meta charset="UTF-8">
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
>     <meta name="description" content="网站描述,用于SEO">
>     <meta name="keywords" content="关键词1,关键词2">
>     <meta name="author" content="作者名">
>
>     <!-- Open Graph for social media -->
>     <meta property="og:title" content="分享标题">
>     <meta property="og:description" content="分享描述">
>     <meta property="og:image" content="https://example.com/image.jpg">
>
>     <title>页面标题 - 网站名称</title>
>
>     <!-- Favicon -->
>     <link rel="icon" href="/favicon.ico">
>     <link rel="apple-touch-icon" href="/apple-touch-icon.png">
>
>     <!-- CSS -->
>     <link rel="stylesheet" href="css/style.css">
> </head>
> <body>
>     <header>...</header>
>     <main>...</main>
>     <footer>...</footer>
>
>     <!-- JavaScript -->
>     <script src="js/app.js" defer></script>
> </body>
> </html>
>
> <!-- 场景2:单页应用(SPA)结构 -->
> <!DOCTYPE html>
> <html lang="zh-CN">
> <head>
>     <meta charset="UTF-8">
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
>     <title>Vue/React 应用</title>
> </head>
> <body>
>     <div id="app"></div>
>     <script src="bundle.js"></script>
> </body>
> </html>
>
> <!-- 场景3:PWA应用配置 -->
> <!DOCTYPE html>
> <html lang="zh-CN">
> <head>
>     <meta charset="UTF-8">
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
>     <meta name="theme-color" content="#4285f4">
>     <link rel="manifest" href="/manifest.json">
>     <title>PWA 应用</title>
> </head>
> <body>
>     <div id="root"></div>
>     <script>
>       // 注册 Service Worker
>       if ('serviceWorker' in navigator) {
>         navigator.serviceWorker.register('/sw.js');
>       }
>     </script>
> </body>
> </html>
> ```

## 二、HTML5 常用标签

### 1. 文本标签

```html
<!-- 标题标签 -->
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>

<!-- 段落和换行 -->
<p>这是一个段落。</p>
<br>  <!-- 换行 -->
<hr>  <!-- 水平线 -->

<!-- 文本格式化 -->
<strong>粗体文本（语义：强调）</strong>
<b>粗体文本（样式）</b>
<em>斜体文本（语义：强调）</em>
<i>斜体文本（样式）</i>
<u>下划线文本</u>
<s>删除线文本</s>
<mark>高亮文本</mark>
<small>小号文本</small>
<sub>下标</sub>
<sup>上标</sup>

<!-- 代码和预格式化 -->
<code>代码片段</code>
<pre>预格式化文本（保留空格和换行）</pre>
<kbd>键盘输入</kbd>
<samp>计算机输出</samp>
<var>变量</var>

<!-- 引用 -->
<blockquote>块级引用</blockquote>
<q>行内引用</q>
<cite>引用来源</cite>

<!-- 其他 -->
<abbr title="HyperText Markup Language">HTML</abbr>  <!-- 缩写 -->
<address>联系信息</address>
<time datetime="2025-01-15">2025年1月15日</time>
```

### 2. 链接和图片

```html
<!-- 链接 -->
<a href="https://www.example.com">外部链接</a>
<a href="page.html">内部链接</a>
<a href="#section1">锚点链接</a>
<a href="mailto:email@example.com">邮箱链接</a>
<a href="tel:+8612345678900">电话链接</a>
<a href="file.pdf" download>下载链接</a>
<a href="https://www.example.com" target="_blank">新窗口打开</a>

<!-- 图片 -->
<img src="image.jpg" alt="图片描述" width="300" height="200">
<img src="image.jpg" alt="图片描述" loading="lazy">  <!-- 懒加载 -->

<!-- 图片与说明 -->
<figure>
    <img src="image.jpg" alt="图片描述">
    <figcaption>图片说明文字</figcaption>
</figure>

<!-- 响应式图片 -->
<picture>
    <source media="(min-width: 800px)" srcset="large.jpg">
    <source media="(min-width: 400px)" srcset="medium.jpg">
    <img src="small.jpg" alt="响应式图片">
</picture>
```

> 💡 **链接 target 属性**：
> - `_self`：默认值，在当前窗口打开
> - `_blank`：在新窗口打开
> - `_parent`：在父框架中打开
> - `_top`：在整个窗口打开

### 3. 列表

```html
<!-- 无序列表 -->
<ul>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
</ul>

<!-- 有序列表 -->
<ol>
    <li>第一项</li>
    <li>第二项</li>
    <li>第三项</li>
</ol>

<!-- 自定义列表 -->
<dl>
    <dt>术语 1</dt>
    <dd>术语 1 的描述</dd>
    <dt>术语 2</dt>
    <dd>术语 2 的描述</dd>
</dl>

<!-- 嵌套列表 -->
<ul>
    <li>一级列表
        <ul>
            <li>二级列表</li>
            <li>二级列表</li>
        </ul>
    </li>
    <li>一级列表</li>
</ul>
```

### 4. 表格

```html
<!-- 基本表格 -->
<table>
    <thead>
        <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>职业</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>张三</td>
            <td>25</td>
            <td>程序员</td>
        </tr>
        <tr>
            <td>李四</td>
            <td>30</td>
            <td>设计师</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3">共 2 人</td>
        </tr>
    </tfoot>
</table>

<!-- 合并单元格 -->
<table>
    <tr>
        <td rowspan="2">跨 2 行</td>
        <td>普通单元格</td>
    </tr>
    <tr>
        <td>普通单元格</td>
    </tr>
    <tr>
        <td colspan="2">跨 2 列</td>
    </tr>
</table>
```

> 💡 **表格标签说明**：
> - `<table>`：表格容器
> - `<thead>`：表头部分
> - `<tbody>`：表主体部分
> - `<tfoot>`：表尾部分
> - `<tr>`：表格行
> - `<th>`：表头单元格（粗体居中）
> - `<td>`：数据单元格
> - `colspan`：跨列
> - `rowspan`：跨行

### 5. 表单

```html
<!-- 基本表单 -->
<form action="/submit" method="post">
    <!-- 文本输入 -->
    <label for="username">用户名：</label>
    <input type="text" id="username" name="username" placeholder="请输入用户名" required>

    <!-- 密码输入 -->
    <label for="password">密码：</label>
    <input type="password" id="password" name="password" required>

    <!-- 邮箱输入 -->
    <label for="email">邮箱：</label>
    <input type="email" id="email" name="email" placeholder="example@email.com">

    <!-- 数字输入 -->
    <label for="age">年龄：</label>
    <input type="number" id="age" name="age" min="1" max="120" step="1">

    <!-- 日期选择 -->
    <label for="birthday">生日：</label>
    <input type="date" id="birthday" name="birthday">

    <!-- 颜色选择 -->
    <label for="color">喜欢的颜色：</label>
    <input type="color" id="color" name="color">

    <!-- 文件上传 -->
    <label for="avatar">头像：</label>
    <input type="file" id="avatar" name="avatar" accept="image/*">

    <!-- 单选按钮 -->
    <p>性别：</p>
    <input type="radio" id="male" name="gender" value="male">
    <label for="male">男</label>
    <input type="radio" id="female" name="gender" value="female">
    <label for="female">女</label>

    <!-- 复选框 -->
    <p>爱好：</p>
    <input type="checkbox" id="hobby1" name="hobbies" value="reading">
    <label for="hobby1">阅读</label>
    <input type="checkbox" id="hobby2" name="hobbies" value="music">
    <label for="hobby2">音乐</label>
    <input type="checkbox" id="hobby3" name="hobbies" value="sports">
    <label for="hobby3">运动</label>

    <!-- 下拉列表 -->
    <label for="city">城市：</label>
    <select id="city" name="city">
        <option value="">请选择</option>
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
        <option value="guangzhou">广州</option>
    </select>

    <!-- 多行文本 -->
    <label for="message">留言：</label>
    <textarea id="message" name="message" rows="4" cols="50"></textarea>

    <!-- 范围滑块 -->
    <label for="volume">音量：</label>
    <input type="range" id="volume" name="volume" min="0" max="100" value="50">

    <!-- 搜索框 -->
    <input type="search" name="search" placeholder="搜索...">

    <!-- 电话号码 -->
    <input type="tel" name="phone" placeholder="手机号码">

    <!-- URL -->
    <input type="url" name="website" placeholder="https://example.com">

    <!-- 提交按钮 -->
    <button type="submit">提交</button>
    <button type="reset">重置</button>
    <button type="button">普通按钮</button>
</form>
```

**HTML5 新增的 input 类型**

| 类型 | 说明 | 示例 |
|------|------|------|
| email | 邮箱地址 | `<input type="email">` |
| url | 网址 | `<input type="url">` |
| number | 数字 | `<input type="number" min="1" max="10">` |
| range | 滑块 | `<input type="range" min="0" max="100">` |
| date | 日期 | `<input type="date">` |
| time | 时间 | `<input type="time">` |
| datetime-local | 本地日期时间 | `<input type="datetime-local">` |
| month | 月份 | `<input type="month">` |
| week | 周 | `<input type="week">` |
| color | 颜色 | `<input type="color">` |
| search | 搜索框 | `<input type="search">` |
| tel | 电话号码 | `<input type="tel">` |

**表单验证属性**

```html
<!-- required：必填 -->
<input type="text" name="username" required>

<!-- pattern：正则表达式验证 -->
<input type="text" name="phone" pattern="[0-9]{11}" title="请输入11位手机号">

<!-- minlength/maxlength：最小/最大长度 -->
<input type="text" name="password" minlength="6" maxlength="20">

<!-- min/max：数字范围 -->
<input type="number" name="age" min="18" max="100">

<!-- step：步长 -->
<input type="number" name="price" step="0.01">

<!-- autocomplete：自动完成 -->
<input type="text" name="email" autocomplete="on">

<!-- autofocus：自动聚焦 -->
<input type="text" name="search" autofocus>

<!-- disabled：禁用 -->
<input type="text" name="readonly-field" disabled>

<!-- readonly：只读 -->
<input type="text" name="readonly-field" readonly>

<!-- placeholder：占位符 -->
<input type="text" name="username" placeholder="请输入用户名">
```

### 6. 多媒体标签

```html
<!-- 音频 -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    您的浏览器不支持 audio 标签。
</audio>

<!-- 音频属性 -->
<audio controls autoplay loop muted preload="auto">
    <source src="audio.mp3" type="audio/mpeg">
</audio>

<!-- 视频 -->
<video controls width="640" height="360">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    您的浏览器不支持 video 标签。
</video>

<!-- 视频属性 -->
<video controls autoplay loop muted poster="poster.jpg" preload="metadata">
    <source src="video.mp4" type="video/mp4">
    <track kind="subtitles" src="subtitles.vtt" srclang="zh" label="中文">
</video>
```

> 💡 **多媒体属性说明**：
> - `controls`：显示播放控件
> - `autoplay`：自动播放（注意：大多数浏览器需要配合 muted 使用）
> - `loop`：循环播放
> - `muted`：静音
> - `preload`：预加载方式（auto/metadata/none）
> - `poster`：视频封面图（仅视频）
> - `width/height`：宽度和高度

### 7. 容器和布局标签

```html
<!-- 通用容器 -->
<div>块级容器（独占一行）</div>
<span>行内容器（不换行）</span>

<!-- 语义化容器（HTML5 新增）-->
<header>页头</header>
<nav>导航栏</nav>
<main>主要内容</main>
<article>文章内容</article>
<section>区块</section>
<aside>侧边栏</aside>
<footer>页脚</footer>

<!-- 示例：典型网页布局 -->
<body>
    <header>
        <h1>网站标题</h1>
        <nav>
            <ul>
                <li><a href="#home">首页</a></li>
                <li><a href="#about">关于</a></li>
                <li><a href="#contact">联系</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h2>文章标题</h2>
            <p>文章内容...</p>
        </article>

        <section>
            <h2>相关内容</h2>
            <p>区块内容...</p>
        </section>
    </main>

    <aside>
        <h3>侧边栏</h3>
        <p>额外信息...</p>
    </aside>

    <footer>
        <p>&copy; 2025 版权信息</p>
    </footer>
</body>
```

> 💡 **语义化标签的优势**：
> - **可读性更好**：代码结构清晰，易于维护
> - **SEO 友好**：搜索引擎更容易理解页面结构
> - **无障碍访问**：屏幕阅读器能更好地解析页面
> - **代码简洁**：减少 div 嵌套

## 三、HTML5 高级特性

### 1. Canvas 画布

```html
<!-- Canvas 基础 -->
<canvas id="myCanvas" width="400" height="300"></canvas>

<script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // 绘制矩形
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, 100, 80);

    // 绘制圆形
    ctx.beginPath();
    ctx.arc(200, 100, 50, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();

    // 绘制线条
    ctx.beginPath();
    ctx.moveTo(50, 200);
    ctx.lineTo(300, 250);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 绘制文字
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Hello Canvas', 50, 280);
</script>
```

### 2. SVG 矢量图形

```html
<!-- 内联 SVG -->
<svg width="200" height="200">
    <!-- 矩形 -->
    <rect x="10" y="10" width="100" height="80" fill="red" />

    <!-- 圆形 -->
    <circle cx="150" cy="50" r="40" fill="blue" />

    <!-- 线条 -->
    <line x1="10" y1="150" x2="190" y2="150" stroke="green" stroke-width="3" />

    <!-- 文字 -->
    <text x="50" y="180" font-size="20" fill="black">SVG Text</text>

    <!-- 路径 -->
    <path d="M 10 200 L 50 180 L 90 200 Z" fill="orange" />
</svg>
```

> 💡 **Canvas vs SVG**：
> - **Canvas**：
>   - 基于像素的位图
>   - 适合游戏、动画、图表等需要频繁重绘的场景
>   - 性能更好，但放大会失真
>   - 使用 JavaScript 绘制
> - **SVG**：
>   - 基于 XML 的矢量图
>   - 适合图标、logo、静态图形
>   - 缩放不失真
>   - 可以用 CSS 和 JavaScript 操作

### 3. 本地存储

```html
<script>
    // localStorage（永久存储）
    localStorage.setItem('username', '张三');
    const username = localStorage.getItem('username');
    localStorage.removeItem('username');
    localStorage.clear();  // 清空所有

    // sessionStorage（会话存储，关闭浏览器后清除）
    sessionStorage.setItem('token', 'abc123');
    const token = sessionStorage.getItem('token');
    sessionStorage.removeItem('token');
    sessionStorage.clear();

    // 存储对象
    const user = { name: '张三', age: 25 };
    localStorage.setItem('user', JSON.stringify(user));
    const savedUser = JSON.parse(localStorage.getItem('user'));
</script>
```

**localStorage vs sessionStorage vs Cookie**

| 特性 | localStorage | sessionStorage | Cookie |
|------|-------------|----------------|--------|
| 生命周期 | 永久，除非手动删除 | 会话结束后清除 | 可设置过期时间 |
| 存储大小 | 约 5-10MB | 约 5-10MB | 约 4KB |
| 与服务器通信 | 否 | 否 | 是（每次请求都发送）|
| 作用域 | 同源窗口共享 | 仅当前标签页 | 同源共享 |
| API | 简单易用 | 简单易用 | 较复杂 |

### 4. 地理定位

```html
<script>
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // 成功回调
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                console.log(`纬度: ${lat}, 经度: ${lon}`);
            },
            // 失败回调
            function(error) {
                console.error('获取位置失败:', error.message);
            },
            // 选项
            {
                enableHighAccuracy: true,  // 高精度
                timeout: 5000,             // 超时时间
                maximumAge: 0              // 缓存时间
            }
        );
    } else {
        console.log('浏览器不支持地理定位');
    }
</script>
```

### 5. 拖放 API

```html
<style>
    #drag-item {
        width: 100px;
        height: 100px;
        background: red;
        cursor: move;
    }
    #drop-zone {
        width: 300px;
        height: 300px;
        border: 2px dashed #ccc;
        margin-top: 20px;
    }
    #drop-zone.drag-over {
        background: #f0f0f0;
        border-color: #000;
    }
</style>

<div id="drag-item" draggable="true">拖动我</div>
<div id="drop-zone">放置区域</div>

<script>
    const dragItem = document.getElementById('drag-item');
    const dropZone = document.getElementById('drop-zone');

    // 拖动开始
    dragItem.addEventListener('dragstart', function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    });

    // 拖动经过
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.classList.add('drag-over');
    });

    // 离开放置区域
    dropZone.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });

    // 放置
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        const data = e.dataTransfer.getData('text/html');
        this.innerHTML = data;
    });
</script>
```

### 6. Web Workers

```html
<!-- 主线程 -->
<script>
    // 创建 Worker
    const worker = new Worker('worker.js');

    // 发送消息给 Worker
    worker.postMessage({ value: 100 });

    // 接收 Worker 的消息
    worker.onmessage = function(e) {
        console.log('Worker 返回:', e.data);
    };

    // 错误处理
    worker.onerror = function(e) {
        console.error('Worker 错误:', e.message);
    };

    // 终止 Worker
    // worker.terminate();
</script>
```

```javascript
// worker.js（Worker 线程）
self.onmessage = function(e) {
    const value = e.data.value;

    // 执行耗时计算
    let result = 0;
    for (let i = 0; i < value; i++) {
        result += i;
    }

    // 发送结果回主线程
    self.postMessage(result);
};
```

---

# 第二部分：CSS 基础

## 四、CSS 简介

### 1. 什么是 CSS

- **CSS**（Cascading Style Sheets）层叠样式表，用于控制网页的样式和布局
- CSS 将内容（HTML）与表现（样式）分离，使代码更易维护
- CSS3 是 CSS 的最新版本，增加了许多新特性

> 💡 **理解"层叠"**：
> - **层叠**指样式可以从多个来源应用，并按优先级覆盖
> - 优先级顺序：内联样式 > ID 选择器 > 类选择器 > 标签选择器
> - 相同优先级时，后面的样式会覆盖前面的

### 2. CSS 的三种使用方式

```html
<!-- 1. 内联样式（不推荐）-->
<p style="color: red; font-size: 16px;">这是红色文字</p>

<!-- 2. 内部样式表 -->
<head>
    <style>
        p {
            color: blue;
            font-size: 16px;
        }
    </style>
</head>

<!-- 3. 外部样式表（推荐）-->
<head>
    <link rel="stylesheet" href="style.css">
</head>
```

**三种方式的对比**

| 方式 | 优点 | 缺点 | 使用场景 |
|------|------|------|----------|
| 内联样式 | 优先级最高 | 不能复用，难以维护 | 临时测试 |
| 内部样式表 | 方便测试 | 只能单页面使用 | 单页应用 |
| 外部样式表 | 可复用，易维护，可缓存 | 需要额外的 HTTP 请求 | 生产环境 |

### 3. CSS 语法

```css
/* 基本语法 */
selector {
    property: value;
}

/* 示例 */
p {
    color: red;           /* 文字颜色 */
    font-size: 16px;      /* 字体大小 */
    background: blue;     /* 背景颜色 */
}

/* 多个选择器 */
h1, h2, h3 {
    color: navy;
}

/* 注释 */
/* 这是一个注释 */
```

## 五、CSS 选择器

### 1. 基本选择器

```css
/* 1. 标签选择器 */
p {
    color: red;
}

/* 2. 类选择器 */
.classname {
    color: blue;
}

/* 3. ID 选择器 */
#id-name {
    color: green;
}

/* 4. 通配符选择器 */
* {
    margin: 0;
    padding: 0;
}

/* 5. 属性选择器 */
input[type="text"] {
    border: 1px solid #ccc;
}

[disabled] {
    opacity: 0.5;
}

[class^="btn-"] {  /* 以 btn- 开头 */
    padding: 10px;
}

[class$="-primary"] {  /* 以 -primary 结尾 */
    color: blue;
}

[class*="button"] {  /* 包含 button */
    cursor: pointer;
}
```

### 2. 组合选择器

```css
/* 1. 后代选择器（空格）- 选择所有后代 */
div p {
    color: red;
}

/* 2. 子选择器（>）- 只选择直接子元素 */
div > p {
    color: blue;
}

/* 3. 相邻兄弟选择器（+）- 选择紧接着的兄弟 */
h1 + p {
    color: green;
}

/* 4. 通用兄弟选择器（~）- 选择所有后面的兄弟 */
h1 ~ p {
    color: orange;
}

/* 5. 群组选择器（,）*/
h1, h2, h3 {
    font-family: Arial;
}
```

### 3. 伪类选择器

```css
/* 链接伪类 */
a:link { color: blue; }          /* 未访问的链接 */
a:visited { color: purple; }     /* 已访问的链接 */
a:hover { color: red; }          /* 鼠标悬停 */
a:active { color: yellow; }      /* 正在点击 */

/* 用户行为伪类 */
input:focus { border-color: blue; }       /* 获得焦点 */
button:hover { background: #ddd; }        /* 鼠标悬停 */
input:disabled { opacity: 0.5; }          /* 禁用状态 */
input:enabled { border: 1px solid #000; } /* 启用状态 */
input:checked { background: blue; }       /* 选中状态（单选框/复选框）*/

/* 结构伪类 */
p:first-child { color: red; }        /* 第一个子元素 */
p:last-child { color: blue; }        /* 最后一个子元素 */
p:nth-child(2) { color: green; }     /* 第 2 个子元素 */
p:nth-child(odd) { background: #f0f0f0; }   /* 奇数项 */
p:nth-child(even) { background: #fff; }     /* 偶数项 */
p:nth-child(3n) { color: red; }      /* 每 3 个 */
p:nth-child(3n+1) { color: blue; }   /* 3n+1 位置 */

p:first-of-type { font-weight: bold; }      /* 同类型第一个 */
p:last-of-type { font-style: italic; }      /* 同类型最后一个 */
p:nth-of-type(2) { color: green; }          /* 同类型第 2 个 */

p:only-child { color: red; }         /* 唯一子元素 */
p:only-of-type { color: blue; }      /* 唯一同类型元素 */
p:empty { display: none; }           /* 空元素 */

/* 否定伪类 */
p:not(.special) { color: black; }    /* 不包含 special 类 */

/* 目标伪类 */
:target { background: yellow; }      /* URL 中的锚点目标 */

/* 根元素伪类 */
:root { --main-color: blue; }        /* 文档根元素（html）*/
```

### 4. 伪元素选择器

```css
/* ::before 和 ::after - 在元素前后插入内容 */
p::before {
    content: "【";
    color: red;
}

p::after {
    content: "】";
    color: red;
}

/* 清除浮动 */
.clearfix::after {
    content: "";
    display: block;
    clear: both;
}

/* ::first-letter - 首字母 */
p::first-letter {
    font-size: 2em;
    font-weight: bold;
    color: red;
}

/* ::first-line - 首行 */
p::first-line {
    color: blue;
    font-variant: small-caps;
}

/* ::selection - 选中的文本 */
::selection {
    background: yellow;
    color: red;
}

/* ::placeholder - 输入框占位符 */
input::placeholder {
    color: #999;
    font-style: italic;
}
```

> 💡 **伪类 vs 伪元素**：
> - **伪类（:）**：选择元素的特定状态，如 `:hover`、`:first-child`
> - **伪元素（::）**：创建不存在于 DOM 中的元素，如 `::before`、`::after`
> - CSS3 规范中伪元素使用双冒号 `::`，但单冒号 `:` 也兼容

### 5. 选择器优先级

**优先级计算规则**

```
内联样式 = 1000
ID 选择器 = 100
类/伪类/属性选择器 = 10
标签/伪元素选择器 = 1
```

```css
/* 优先级示例 */
p { color: black; }                    /* 0,0,0,1 */
.text { color: blue; }                 /* 0,0,1,0 */
#title { color: red; }                 /* 0,1,0,0 */
div p { color: green; }                /* 0,0,0,2 */
.container .text { color: orange; }    /* 0,0,2,0 */
#header .nav li { color: purple; }     /* 0,1,1,1 */
```

**提升优先级的方法**

```css
/* 1. 使用 !important（不推荐）*/
p { color: red !important; }

/* 2. 增加选择器权重 */
.container .text { color: blue; }

/* 3. 使用 ID 选择器 */
#unique-id { color: green; }
```

> 💡 **最佳实践**：
> - 尽量不使用 `!important`，会破坏 CSS 的层叠规则
> - 优先使用类选择器，避免过度使用 ID 选择器
> - 保持选择器简洁，避免过深的嵌套

## 六、CSS 文本样式

### 1. 字体属性

```css
/* 字体系列 */
p {
    font-family: Arial, "Microsoft YaHei", sans-serif;
}

/* 常用字体栈 */
.serif { font-family: Georgia, "Times New Roman", serif; }
.sans-serif { font-family: Arial, Helvetica, sans-serif; }
.monospace { font-family: "Courier New", Courier, monospace; }
.chinese { font-family: "Microsoft YaHei", "SimHei", sans-serif; }

/* 字体大小 */
p {
    font-size: 16px;        /* 像素 */
    font-size: 1em;         /* 相对父元素 */
    font-size: 1.2rem;      /* 相对根元素 */
    font-size: 100%;        /* 百分比 */
}

/* 字体粗细 */
p {
    font-weight: normal;    /* 400 */
    font-weight: bold;      /* 700 */
    font-weight: 100;       /* 100-900 */
    font-weight: lighter;   /* 更细 */
    font-weight: bolder;    /* 更粗 */
}

/* 字体样式 */
p {
    font-style: normal;     /* 正常 */
    font-style: italic;     /* 斜体 */
    font-style: oblique;    /* 倾斜 */
}

/* 字体变体 */
p {
    font-variant: normal;   /* 正常 */
    font-variant: small-caps;  /* 小型大写字母 */
}

/* 字体复合属性 */
p {
    /* style variant weight size/line-height family */
    font: italic small-caps bold 16px/1.5 Arial, sans-serif;
}
```

### 2. 文本属性

```css
/* 文本颜色 */
p {
    color: red;                 /* 颜色名 */
    color: #ff0000;             /* 十六进制 */
    color: rgb(255, 0, 0);      /* RGB */
    color: rgba(255, 0, 0, 0.5); /* RGBA（带透明度）*/
    color: hsl(0, 100%, 50%);   /* HSL */
}

/* 文本对齐 */
p {
    text-align: left;       /* 左对齐 */
    text-align: right;      /* 右对齐 */
    text-align: center;     /* 居中 */
    text-align: justify;    /* 两端对齐 */
}

/* 文本装饰 */
p {
    text-decoration: none;           /* 无装饰 */
    text-decoration: underline;      /* 下划线 */
    text-decoration: overline;       /* 上划线 */
    text-decoration: line-through;   /* 删除线 */
    text-decoration: underline wavy red;  /* 红色波浪下划线 */
}

/* 文本转换 */
p {
    text-transform: none;           /* 无转换 */
    text-transform: capitalize;     /* 首字母大写 */
    text-transform: uppercase;      /* 全部大写 */
    text-transform: lowercase;      /* 全部小写 */
}

/* 文本缩进 */
p {
    text-indent: 2em;       /* 首行缩进 2 个字符 */
}

/* 行高 */
p {
    line-height: 1.5;       /* 字体大小的 1.5 倍 */
    line-height: 24px;      /* 固定行高 */
    line-height: 150%;      /* 百分比 */
}

/* 字母间距 */
p {
    letter-spacing: 2px;    /* 字母间距 */
    letter-spacing: normal; /* 默认间距 */
}

/* 单词间距 */
p {
    word-spacing: 5px;      /* 单词间距 */
}

/* 文本阴影 */
p {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    /* x偏移 y偏移 模糊半径 颜色 */

    /* 多重阴影 */
    text-shadow: 1px 1px 2px red, 0 0 10px blue;
}

/* 空白处理 */
p {
    white-space: normal;    /* 默认，合并空白 */
    white-space: nowrap;    /* 不换行 */
    white-space: pre;       /* 保留空白（类似 <pre>）*/
    white-space: pre-wrap;  /* 保留空白，但自动换行 */
    white-space: pre-line;  /* 合并空白，保留换行符 */
}

/* 文本溢出 */
p {
    overflow: hidden;
    text-overflow: clip;        /* 剪切 */
    text-overflow: ellipsis;    /* 省略号 */
}

/* 单行文本溢出省略 */
.single-line {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* 多行文本溢出省略（Webkit 内核）*/
.multi-line {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;  /* 显示 3 行 */
    overflow: hidden;
}

/* 换行 */
p {
    word-break: normal;         /* 默认换行规则 */
    word-break: break-all;      /* 允许在单词内换行 */
    word-break: keep-all;       /* 只能在空格或连字符处换行 */

    word-wrap: normal;          /* 默认 */
    word-wrap: break-word;      /* 长单词可以换行 */

    /* CSS3 新属性 */
    overflow-wrap: break-word;  /* 同 word-wrap */
}

/* 垂直对齐 */
img {
    vertical-align: baseline;   /* 基线对齐 */
    vertical-align: top;        /* 顶部对齐 */
    vertical-align: middle;     /* 中部对齐 */
    vertical-align: bottom;     /* 底部对齐 */
    vertical-align: text-top;   /* 文本顶部 */
    vertical-align: text-bottom;/* 文本底部 */
    vertical-align: 10px;       /* 相对基线上移 */
    vertical-align: -5px;       /* 相对基线下移 */
}
```

### 3. Web 字体

```css
/* 引入 Web 字体 */
@font-face {
    font-family: 'CustomFont';
    src: url('font.woff2') format('woff2'),
         url('font.woff') format('woff'),
         url('font.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

/* 使用 Web 字体 */
h1 {
    font-family: 'CustomFont', sans-serif;
}

/* 使用 Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
    font-family: 'Roboto', sans-serif;
}
```

## 七、CSS 盒模型

### 1. 盒模型基础

每个 HTML 元素都被视为一个矩形盒子，包含以下部分：

```
┌─────────────────────────────────┐
│          Margin（外边距）        │
│  ┌──────────────────────────┐  │
│  │   Border（边框）          │  │
│  │  ┌────────────────────┐  │  │
│  │  │ Padding（内边距）   │  │  │
│  │  │  ┌──────────────┐  │  │  │
│  │  │  │   Content    │  │  │  │
│  │  │  │   (内容)     │  │  │  │
│  │  │  └──────────────┘  │  │  │
│  │  └────────────────────┘  │  │
│  └──────────────────────────┘  │
└─────────────────────────────────┘
```

```css
.box {
    /* 内容宽高 */
    width: 300px;
    height: 200px;

    /* 内边距 */
    padding: 20px;                  /* 四边 */
    padding: 10px 20px;             /* 上下 左右 */
    padding: 10px 20px 30px;        /* 上 左右 下 */
    padding: 10px 20px 30px 40px;   /* 上 右 下 左（顺时针）*/

    /* 边框 */
    border: 1px solid #000;         /* 宽度 样式 颜色 */
    border-width: 2px;
    border-style: solid;            /* solid/dashed/dotted/double/none */
    border-color: red;

    /* 单边边框 */
    border-top: 1px solid #000;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    border-left: 1px solid #000;

    /* 外边距 */
    margin: 20px;                   /* 四边 */
    margin: 10px 20px;              /* 上下 左右 */
    margin: 10px 20px 30px;         /* 上 左右 下 */
    margin: 10px 20px 30px 40px;    /* 上 右 下 左 */

    /* 水平居中 */
    margin: 0 auto;
}
```

### 2. 盒模型类型

```css
/* 标准盒模型（content-box）*/
.standard-box {
    box-sizing: content-box;
    width: 300px;           /* 内容宽度 */
    padding: 20px;
    border: 1px solid #000;
    /* 实际宽度 = 300 + 20*2 + 1*2 = 342px */
}

/* IE 盒模型（border-box，推荐）*/
.border-box {
    box-sizing: border-box;
    width: 300px;           /* 总宽度 */
    padding: 20px;
    border: 1px solid #000;
    /* 实际宽度 = 300px */
    /* 内容宽度 = 300 - 20*2 - 1*2 = 258px */
}

/* 全局使用 border-box（推荐）*/
* {
    box-sizing: border-box;
}
```

> 💡 **box-sizing 说明**：
> - `content-box`（默认）：width/height 只包含内容区域
> - `border-box`（推荐）：width/height 包含 padding 和 border
> - 使用 `border-box` 更符合直觉，布局计算更简单

### 3. 外边距折叠

```css
/* 垂直外边距会发生折叠 */
.box1 {
    margin-bottom: 30px;
}

.box2 {
    margin-top: 20px;
}

/* 两个盒子之间的实际间距是 30px（取最大值），而不是 50px */

/* 防止外边距折叠的方法 */
.parent {
    overflow: hidden;       /* 创建 BFC */
    /* 或 */
    display: flow-root;     /* 创建 BFC（推荐）*/
    /* 或 */
    padding-top: 1px;       /* 阻止折叠 */
    /* 或 */
    border-top: 1px solid transparent;
}
```

### 4. 边框样式

```css
/* 圆角边框 */
.rounded {
    border-radius: 10px;                /* 四角 */
    border-radius: 10px 20px;           /* 左上右下 右上左下 */
    border-radius: 10px 20px 30px;      /* 左上 右上左下 右下 */
    border-radius: 10px 20px 30px 40px; /* 左上 右上 右下 左下 */

    /* 圆形 */
    border-radius: 50%;

    /* 椭圆 */
    border-radius: 50% / 25%;

    /* 单角 */
    border-top-left-radius: 10px;
}

/* 边框阴影 */
.shadow {
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    /* x偏移 y偏移 模糊半径 颜色 */

    /* 多重阴影 */
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3),
                -2px -2px 5px rgba(255,255,255,0.5);

    /* 内阴影 */
    box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
}

/* 边框图片 */
.border-image {
    border: 10px solid transparent;
    border-image: url('border.png') 30 round;
    /* 图片 切片 重复方式(stretch/repeat/round) */
}

/* 轮廓（不占空间）*/
.outline {
    outline: 2px solid red;
    outline-offset: 5px;    /* 与边框的距离 */
}
```

## 八、CSS 背景

```css
/* 背景颜色 */
.bg-color {
    background-color: red;
    background-color: #ff0000;
    background-color: rgb(255, 0, 0);
    background-color: rgba(255, 0, 0, 0.5);
    background-color: transparent;  /* 透明 */
}

/* 背景图片 */
.bg-image {
    background-image: url('image.jpg');

    /* 背景重复 */
    background-repeat: repeat;      /* 平铺（默认）*/
    background-repeat: no-repeat;   /* 不平铺 */
    background-repeat: repeat-x;    /* 水平平铺 */
    background-repeat: repeat-y;    /* 垂直平铺 */

    /* 背景位置 */
    background-position: left top;  /* 关键字 */
    background-position: center;    /* 居中 */
    background-position: 50% 50%;   /* 百分比 */
    background-position: 10px 20px; /* 像素 */

    /* 背景大小 */
    background-size: auto;          /* 默认 */
    background-size: cover;         /* 覆盖（可能裁切）*/
    background-size: contain;       /* 包含（可能留白）*/
    background-size: 100px 200px;   /* 指定宽高 */
    background-size: 50%;           /* 百分比 */

    /* 背景固定 */
    background-attachment: scroll;  /* 滚动（默认）*/
    background-attachment: fixed;   /* 固定 */
    background-attachment: local;   /* 跟随内容滚动 */

    /* 背景裁剪 */
    background-clip: border-box;    /* 包含边框（默认）*/
    background-clip: padding-box;   /* 包含内边距 */
    background-clip: content-box;   /* 仅内容区 */

    /* 背景原点 */
    background-origin: padding-box; /* 从内边距开始（默认）*/
    background-origin: border-box;  /* 从边框开始 */
    background-origin: content-box; /* 从内容区开始 */
}

/* 背景简写 */
.bg-shorthand {
    background: red url('bg.jpg') no-repeat center / cover;
    /* 颜色 图片 重复 位置 / 大小 */
}

/* 多重背景 */
.multi-bg {
    background:
        url('front.png') no-repeat center,
        url('back.jpg') no-repeat center / cover;
}

/* 线性渐变 */
.linear-gradient {
    background: linear-gradient(to right, red, blue);
    background: linear-gradient(45deg, red, blue);
    background: linear-gradient(to bottom, red 0%, blue 100%);
    background: linear-gradient(to right, red, yellow, green, blue);
}

/* 径向渐变 */
.radial-gradient {
    background: radial-gradient(circle, red, blue);
    background: radial-gradient(ellipse at center, red, blue);
    background: radial-gradient(circle at top left, red, blue);
}

/* 圆锥渐变 */
.conic-gradient {
    background: conic-gradient(red, yellow, green, blue, red);
    background: conic-gradient(from 90deg, red, blue);
}
```

## 九、CSS 显示与定位

### 1. 显示类型

```css
/* display 属性 */
.block {
    display: block;         /* 块级元素（独占一行）*/
}

.inline {
    display: inline;        /* 行内元素（不换行，不能设置宽高）*/
}

.inline-block {
    display: inline-block;  /* 行内块（不换行，可设置宽高）*/
}

.none {
    display: none;          /* 隐藏（不占空间）*/
}

.flex {
    display: flex;          /* 弹性盒子 */
}

.grid {
    display: grid;          /* 网格布局 */
}

.table {
    display: table;         /* 表格显示 */
}

/* visibility 属性 */
.visible {
    visibility: visible;    /* 可见（默认）*/
}

.hidden {
    visibility: hidden;     /* 隐藏（占空间）*/
}

/* opacity 属性 */
.transparent {
    opacity: 0;             /* 完全透明（占空间，可交互）*/
    opacity: 0.5;           /* 半透明 */
    opacity: 1;             /* 不透明（默认）*/
}
```

> 💡 **隐藏元素的三种方式对比**：
> - `display: none`：不占空间，无法交互，影响布局
> - `visibility: hidden`：占空间，无法交互，不影响布局
> - `opacity: 0`：占空间，可以交互，不影响布局

### 2. 定位（Position）

```css
/* 静态定位（默认）*/
.static {
    position: static;
    /* 不能使用 top/right/bottom/left */
}

/* 相对定位 */
.relative {
    position: relative;
    top: 10px;              /* 相对原位置偏移 */
    left: 20px;
    /* 元素仍然占据原来的空间 */
}

/* 绝对定位 */
.absolute {
    position: absolute;
    top: 0;
    right: 0;
    /* 相对最近的已定位祖先元素 */
    /* 脱离文档流，不占空间 */
}

/* 固定定位 */
.fixed {
    position: fixed;
    bottom: 20px;
    right: 20px;
    /* 相对浏览器视口 */
    /* 脱离文档流，不占空间 */
}

/* 粘性定位 */
.sticky {
    position: sticky;
    top: 0;
    /* 相对定位和固定定位的混合 */
    /* 滚动到阈值前是相对定位，之后是固定定位 */
}
```

**定位类型对比**

| 类型 | 参照物 | 是否脱离文档流 | 是否占空间 | 使用场景 |
|------|-------|--------------|-----------|---------|
| static | - | 否 | 是 | 默认定位 |
| relative | 自身原位置 | 否 | 是 | 微调位置、作为参照 |
| absolute | 已定位祖先 | 是 | 否 | 弹窗、图标定位 |
| fixed | 视口 | 是 | 否 | 固定导航、回到顶部 |
| sticky | 视口 | 否 | 是 | 粘性表头 |

### 3. 层叠顺序

```css
/* z-index：控制层叠顺序 */
.layer1 {
    position: relative;
    z-index: 1;         /* 较小值在下层 */
}

.layer2 {
    position: relative;
    z-index: 10;        /* 较大值在上层 */
}

/* 创建层叠上下文 */
.context {
    position: relative;
    z-index: 0;
    /* 或 */
    opacity: 0.9;
    /* 或 */
    transform: translateZ(0);
}
```

> 💡 **z-index 注意事项**：
> - 只对已定位元素有效（position 不为 static）
> - 父元素的 z-index 会影响子元素
> - 创建了层叠上下文的元素会成为独立的层叠环境

### 4. 浮动

```css
/* 浮动 */
.float-left {
    float: left;        /* 左浮动 */
}

.float-right {
    float: right;       /* 右浮动 */
}

.no-float {
    float: none;        /* 不浮动（默认）*/
}

/* 清除浮动 */
.clear {
    clear: both;        /* 清除两侧浮动 */
    clear: left;        /* 清除左浮动 */
    clear: right;       /* 清除右浮动 */
}

/* 清除浮动的方法 */

/* 1. 额外标签法 */
<div class="float-left"></div>
<div style="clear: both;"></div>

/* 2. 父元素添加 overflow */
.parent {
    overflow: hidden;
}

/* 3. 父元素添加伪元素（推荐）*/
.clearfix::after {
    content: "";
    display: block;
    clear: both;
}

/* 4. 使用 display: flow-root（推荐）*/
.parent {
    display: flow-root;
}
```

## 十、CSS Flexbox 布局

Flexbox（弹性盒子）是一种一维布局模型，适合处理行或列的布局。

### 1. Flex 容器属性

```css
/* 启用 Flex 布局 */
.container {
    display: flex;          /* 块级 flex 容器 */
    display: inline-flex;   /* 行内 flex 容器 */
}

/* 主轴方向 */
.container {
    flex-direction: row;            /* 水平方向（默认）*/
    flex-direction: row-reverse;    /* 水平反向 */
    flex-direction: column;         /* 垂直方向 */
    flex-direction: column-reverse; /* 垂直反向 */
}

/* 换行 */
.container {
    flex-wrap: nowrap;      /* 不换行（默认）*/
    flex-wrap: wrap;        /* 换行 */
    flex-wrap: wrap-reverse;/* 反向换行 */
}

/* 简写：flex-flow = flex-direction + flex-wrap */
.container {
    flex-flow: row wrap;
}

/* 主轴对齐 */
.container {
    justify-content: flex-start;    /* 起始对齐（默认）*/
    justify-content: flex-end;      /* 末尾对齐 */
    justify-content: center;        /* 居中 */
    justify-content: space-between; /* 两端对齐 */
    justify-content: space-around;  /* 分散对齐 */
    justify-content: space-evenly;  /* 均匀分散 */
}

/* 交叉轴对齐 */
.container {
    align-items: stretch;       /* 拉伸（默认）*/
    align-items: flex-start;    /* 起始对齐 */
    align-items: flex-end;      /* 末尾对齐 */
    align-items: center;        /* 居中 */
    align-items: baseline;      /* 基线对齐 */
}

/* 多行对齐 */
.container {
    align-content: stretch;         /* 拉伸（默认）*/
    align-content: flex-start;      /* 起始对齐 */
    align-content: flex-end;        /* 末尾对齐 */
    align-content: center;          /* 居中 */
    align-content: space-between;   /* 两端对齐 */
    align-content: space-around;    /* 分散对齐 */
}

/* 间距（CSS Gap）*/
.container {
    gap: 20px;              /* 行列间距 */
    row-gap: 10px;          /* 行间距 */
    column-gap: 20px;       /* 列间距 */
}
```

### 2. Flex 项目属性

```css
/* 排序 */
.item {
    order: 0;           /* 默认为 0，数值越小越靠前 */
}

/* 放大比例 */
.item {
    flex-grow: 0;       /* 默认不放大 */
    flex-grow: 1;       /* 放大比例 */
}

/* 缩小比例 */
.item {
    flex-shrink: 1;     /* 默认会缩小 */
    flex-shrink: 0;     /* 不缩小 */
}

/* 基础大小 */
.item {
    flex-basis: auto;   /* 默认 */
    flex-basis: 200px;  /* 固定大小 */
    flex-basis: 50%;    /* 百分比 */
}

/* 简写：flex = flex-grow + flex-shrink + flex-basis */
.item {
    flex: 1;            /* 等同于 flex: 1 1 0% */
    flex: auto;         /* 等同于 flex: 1 1 auto */
    flex: none;         /* 等同于 flex: 0 0 auto */
    flex: 0 1 200px;    /* 完整写法 */
}

/* 单独对齐 */
.item {
    align-self: auto;       /* 继承父容器（默认）*/
    align-self: flex-start; /* 起始对齐 */
    align-self: flex-end;   /* 末尾对齐 */
    align-self: center;     /* 居中 */
    align-self: stretch;    /* 拉伸 */
}
```

### 3. Flexbox 常见布局

```css
/* 水平居中 */
.center-horizontal {
    display: flex;
    justify-content: center;
}

/* 垂直居中 */
.center-vertical {
    display: flex;
    align-items: center;
}

/* 水平垂直居中 */
.center-both {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 等宽列 */
.equal-columns {
    display: flex;
}
.equal-columns > * {
    flex: 1;
}

/* 两端对齐 */
.space-between {
    display: flex;
    justify-content: space-between;
}

/* 响应式布局 */
.responsive {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.responsive > * {
    flex: 1 1 300px;  /* 最小宽度 300px */
}

/* 圣杯布局 */
.holy-grail {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}
.holy-grail-header,
.holy-grail-footer {
    flex: 0 0 auto;
}
.holy-grail-body {
    display: flex;
    flex: 1 1 auto;
}
.holy-grail-content {
    flex: 1 1 auto;
}
.holy-grail-nav,
.holy-grail-ads {
    flex: 0 0 200px;
}
```

## 十一、CSS Grid 布局

Grid（网格）是一种二维布局模型，可以同时处理行和列。

### 1. Grid 容器属性

```css
/* 启用 Grid 布局 */
.container {
    display: grid;          /* 块级 grid 容器 */
    display: inline-grid;   /* 行内 grid 容器 */
}

/* 定义列 */
.container {
    grid-template-columns: 100px 200px 100px;  /* 固定宽度 */
    grid-template-columns: 1fr 2fr 1fr;        /* 比例分配 */
    grid-template-columns: repeat(3, 1fr);     /* 重复 */
    grid-template-columns: repeat(auto-fill, 200px);  /* 自动填充 */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));  /* 响应式 */
    grid-template-columns: 100px auto 100px;   /* 自动宽度 */
}

/* 定义行 */
.container {
    grid-template-rows: 100px 200px;
    grid-template-rows: repeat(3, 100px);
    grid-template-rows: auto 1fr auto;
}

/* 定义区域 */
.container {
    grid-template-areas:
        "header header header"
        "nav    main   aside"
        "footer footer footer";
}

/* 间距 */
.container {
    gap: 20px;              /* 行列间距 */
    row-gap: 10px;          /* 行间距 */
    column-gap: 20px;       /* 列间距 */

    /* 旧语法 */
    grid-gap: 20px;
    grid-row-gap: 10px;
    grid-column-gap: 20px;
}

/* 对齐（整个网格）*/
.container {
    justify-items: start;   /* 水平对齐：start/end/center/stretch */
    align-items: start;     /* 垂直对齐：start/end/center/stretch */
    place-items: center;    /* 简写：align-items + justify-items */
}

/* 对齐（网格容器内）*/
.container {
    justify-content: start; /* 水平对齐：start/end/center/stretch/space-between/space-around/space-evenly */
    align-content: start;   /* 垂直对齐：start/end/center/stretch/space-between/space-around/space-evenly */
    place-content: center;  /* 简写：align-content + justify-content */
}

/* 自动行/列大小 */
.container {
    grid-auto-rows: 100px;      /* 自动行高 */
    grid-auto-columns: 100px;   /* 自动列宽 */
    grid-auto-flow: row;        /* 自动放置方向：row/column/dense */
}
```

### 2. Grid 项目属性

```css
/* 指定位置（线编号）*/
.item {
    grid-column-start: 1;   /* 列起始线 */
    grid-column-end: 3;     /* 列结束线 */
    grid-row-start: 1;      /* 行起始线 */
    grid-row-end: 2;        /* 行结束线 */
}

/* 简写 */
.item {
    grid-column: 1 / 3;     /* 列 起始/结束 */
    grid-row: 1 / 2;        /* 行 起始/结束 */
    grid-area: 1 / 1 / 2 / 3;  /* 行起/列起/行止/列止 */
}

/* 跨越 */
.item {
    grid-column: span 2;    /* 跨越 2 列 */
    grid-row: span 3;       /* 跨越 3 行 */
}

/* 命名区域 */
.item {
    grid-area: header;      /* 使用命名区域 */
}

/* 单独对齐 */
.item {
    justify-self: start;    /* 水平对齐：start/end/center/stretch */
    align-self: start;      /* 垂直对齐：start/end/center/stretch */
    place-self: center;     /* 简写：align-self + justify-self */
}
```

### 3. Grid 常见布局

```css
/* 固定列数的网格 */
.grid-fixed {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

/* 响应式网格 */
.grid-responsive {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
}

/* 圣杯布局 */
.grid-holy-grail {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header header header"
        "nav    main   aside"
        "footer footer footer";
    min-height: 100vh;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* 卡片布局 */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

/* 瀑布流布局 */
.masonry {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: 10px;
    gap: 10px;
}
.masonry-item {
    grid-row-end: span 20;  /* 根据内容调整 */
}
```

## 十二、CSS 过渡与动画

### 1. 过渡（Transition）

```css
/* 基本过渡 */
.box {
    width: 100px;
    height: 100px;
    background: red;
    transition: all 0.3s ease;
}

.box:hover {
    width: 200px;
    height: 200px;
    background: blue;
}

/* 完整语法 */
.transition {
    /* property duration timing-function delay */
    transition: width 0.5s ease-in-out 0.1s;
}

/* 多个属性过渡 */
.multi-transition {
    transition:
        width 0.3s ease,
        height 0.5s linear,
        background 0.2s ease-in;
}

/* 过渡属性 */
.properties {
    transition-property: width;         /* 过渡属性 */
    transition-duration: 0.3s;          /* 持续时间 */
    transition-timing-function: ease;   /* 时间函数 */
    transition-delay: 0.1s;             /* 延迟时间 */
}
```

**时间函数（Timing Function）**

| 值 | 说明 | 效果 |
|----|------|------|
| ease | 默认 | 慢-快-慢 |
| linear | 线性 | 匀速 |
| ease-in | 加速 | 慢-快 |
| ease-out | 减速 | 快-慢 |
| ease-in-out | 加速减速 | 慢-快-慢 |
| cubic-bezier(n,n,n,n) | 自定义贝塞尔曲线 | 自定义 |
| steps(n) | 步进 | 分步执行 |

```css
/* 自定义贝塞尔曲线 */
.custom {
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* 步进动画 */
.steps {
    transition: all 1s steps(4);
}
```

### 2. 动画（Animation）

```css
/* 定义关键帧 */
@keyframes slide {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100px);
    }
}

/* 百分比关键帧 */
@keyframes bounce {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-50px);
    }
    100% {
        transform: translateY(0);
    }
}

/* 应用动画 */
.animated {
    animation: slide 1s ease infinite;
    /* name duration timing-function iteration-count */
}

/* 完整语法 */
.animation {
    animation-name: slide;                  /* 动画名称 */
    animation-duration: 1s;                 /* 持续时间 */
    animation-timing-function: ease;        /* 时间函数 */
    animation-delay: 0.5s;                  /* 延迟时间 */
    animation-iteration-count: 3;           /* 重复次数（infinite 无限）*/
    animation-direction: normal;            /* 方向 */
    animation-fill-mode: forwards;          /* 填充模式 */
    animation-play-state: running;          /* 播放状态 */
}

/* 多个动画 */
.multi-animation {
    animation:
        slide 1s ease infinite,
        bounce 2s linear 3;
}
```

**animation-direction 值**

| 值 | 说明 |
|----|------|
| normal | 正常播放（默认）|
| reverse | 反向播放 |
| alternate | 交替播放（奇数次正向，偶数次反向）|
| alternate-reverse | 反向交替播放 |

**animation-fill-mode 值**

| 值 | 说明 |
|----|------|
| none | 默认，动画结束后回到初始状态 |
| forwards | 保持最后一帧的状态 |
| backwards | 在延迟期间应用第一帧的状态 |
| both | 同时应用 forwards 和 backwards |

### 3. 常见动画示例

```css
/* 淡入淡出 */
@keyframes fade {
    from { opacity: 0; }
    to { opacity: 1; }
}

.fade-in {
    animation: fade 0.5s ease;
}

/* 旋转 */
@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.spin {
    animation: rotate 2s linear infinite;
}

/* 缩放 */
@keyframes scale {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

.pulse {
    animation: scale 1s ease-in-out infinite;
}

/* 抖动 */
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.shake {
    animation: shake 0.5s;
}

/* 弹跳 */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

.bounce {
    animation: bounce 2s infinite;
}

/* 滑入 */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.slide-in {
    animation: slideIn 0.5s ease-out;
}

/* 加载动画 */
@keyframes loading {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: loading 1s linear infinite;
}
```

## 十三、CSS 变换（Transform）

### 1. 2D 变换

```css
/* 平移 */
.translate {
    transform: translateX(50px);        /* 水平平移 */
    transform: translateY(50px);        /* 垂直平移 */
    transform: translate(50px, 50px);   /* 水平和垂直平移 */
}

/* 缩放 */
.scale {
    transform: scaleX(1.5);             /* 水平缩放 */
    transform: scaleY(1.5);             /* 垂直缩放 */
    transform: scale(1.5);              /* 等比缩放 */
    transform: scale(1.5, 2);           /* 水平和垂直缩放 */
}

/* 旋转 */
.rotate {
    transform: rotate(45deg);           /* 顺时针旋转 */
    transform: rotate(-45deg);          /* 逆时针旋转 */
}

/* 倾斜 */
.skew {
    transform: skewX(20deg);            /* 水平倾斜 */
    transform: skewY(20deg);            /* 垂直倾斜 */
    transform: skew(20deg, 10deg);      /* 水平和垂直倾斜 */
}

/* 组合变换 */
.combined {
    transform: translate(50px, 50px) rotate(45deg) scale(1.5);
}

/* 变换原点 */
.origin {
    transform-origin: center;           /* 中心（默认）*/
    transform-origin: top left;         /* 左上角 */
    transform-origin: 50% 50%;          /* 百分比 */
    transform-origin: 100px 100px;      /* 像素 */
}
```

### 2. 3D 变换

```css
/* 3D 平移 */
.translate-3d {
    transform: translateZ(50px);                    /* Z 轴平移 */
    transform: translate3d(50px, 50px, 50px);       /* XYZ 平移 */
}

/* 3D 缩放 */
.scale-3d {
    transform: scaleZ(2);                           /* Z 轴缩放 */
    transform: scale3d(1.5, 1.5, 2);                /* XYZ 缩放 */
}

/* 3D 旋转 */
.rotate-3d {
    transform: rotateX(45deg);                      /* 绕 X 轴旋转 */
    transform: rotateY(45deg);                      /* 绕 Y 轴旋转 */
    transform: rotateZ(45deg);                      /* 绕 Z 轴旋转 */
    transform: rotate3d(1, 1, 1, 45deg);            /* 绕指定轴旋转 */
}

/* 透视 */
.perspective-container {
    perspective: 1000px;                            /* 设置透视距离 */
    perspective-origin: 50% 50%;                    /* 透视原点 */
}

.perspective-item {
    transform: rotateY(45deg);
}

/* 变换样式 */
.transform-style {
    transform-style: flat;                          /* 平面（默认）*/
    transform-style: preserve-3d;                   /* 保持 3D */
}

/* 背面可见性 */
.backface {
    backface-visibility: visible;                   /* 可见（默认）*/
    backface-visibility: hidden;                    /* 隐藏 */
}
```

### 3. 3D 示例

```css
/* 3D 卡片翻转 */
.card-container {
    perspective: 1000px;
}

.card {
    width: 300px;
    height: 200px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.card:hover {
    transform: rotateY(180deg);
}

.card-front,
.card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}

.card-back {
    transform: rotateY(180deg);
}

/* 3D 立方体 */
.cube-container {
    width: 200px;
    height: 200px;
    perspective: 1000px;
}

.cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: rotateCube 10s infinite linear;
}

.cube-face {
    position: absolute;
    width: 200px;
    height: 200px;
    border: 2px solid #000;
}

.cube-front  { transform: rotateY(  0deg) translateZ(100px); }
.cube-back   { transform: rotateY(180deg) translateZ(100px); }
.cube-right  { transform: rotateY( 90deg) translateZ(100px); }
.cube-left   { transform: rotateY(-90deg) translateZ(100px); }
.cube-top    { transform: rotateX( 90deg) translateZ(100px); }
.cube-bottom { transform: rotateX(-90deg) translateZ(100px); }

@keyframes rotateCube {
    from { transform: rotateX(0deg) rotateY(0deg); }
    to   { transform: rotateX(360deg) rotateY(360deg); }
}
```

## 十四、响应式设计

### 1. 媒体查询

```css
/* 基本语法 */
@media screen and (max-width: 768px) {
    /* 屏幕宽度小于等于 768px 时的样式 */
    .container {
        width: 100%;
    }
}

/* 常见断点 */
/* 移动设备 */
@media (max-width: 576px) {
    body { font-size: 14px; }
}

/* 平板设备 */
@media (min-width: 577px) and (max-width: 768px) {
    body { font-size: 16px; }
}

/* 桌面设备 */
@media (min-width: 769px) and (max-width: 992px) {
    body { font-size: 18px; }
}

/* 大屏设备 */
@media (min-width: 993px) {
    body { font-size: 20px; }
}

/* 设备方向 */
@media (orientation: portrait) {
    /* 竖屏 */
}

@media (orientation: landscape) {
    /* 横屏 */
}

/* 分辨率 */
@media (min-resolution: 192dpi) {
    /* 高分辨率屏幕（Retina）*/
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
    body {
        background: #000;
        color: #fff;
    }
}

/* 打印样式 */
@media print {
    .no-print {
        display: none;
    }
}

/* 组合条件 */
@media screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    /* 多个条件同时满足 */
}

/* 或条件 */
@media screen and (max-width: 768px), (orientation: portrait) {
    /* 满足任一条件 */
}
```

### 2. 响应式单位

```css
/* 相对单位 */
.responsive {
    /* em - 相对父元素字体大小 */
    font-size: 1.5em;

    /* rem - 相对根元素字体大小 */
    padding: 2rem;

    /* % - 相对父元素 */
    width: 50%;

    /* vw - 视口宽度的 1% */
    width: 50vw;

    /* vh - 视口高度的 1% */
    height: 100vh;

    /* vmin - 视口较小尺寸的 1% */
    width: 50vmin;

    /* vmax - 视口较大尺寸的 1% */
    width: 50vmax;

    /* ch - 字符 "0" 的宽度 */
    width: 40ch;

    /* ex - 小写字母 "x" 的高度 */
    height: 10ex;
}

/* 绝对单位 */
.absolute {
    width: 300px;       /* 像素 */
    width: 2in;         /* 英寸 */
    width: 5cm;         /* 厘米 */
    width: 50mm;        /* 毫米 */
    width: 20pt;        /* 点 */
    width: 1pc;         /* 派卡 */
}
```

### 3. 响应式布局技巧

```css
/* 流式布局 */
.fluid {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

/* 弹性图片 */
img {
    max-width: 100%;
    height: auto;
}

/* 响应式字体 */
html {
    font-size: 16px;
}

@media (max-width: 768px) {
    html { font-size: 14px; }
}

@media (min-width: 1200px) {
    html { font-size: 18px; }
}

/* 使用 clamp() 实现流式字体 */
.fluid-text {
    font-size: clamp(1rem, 2vw + 1rem, 3rem);
    /* 最小值 首选值 最大值 */
}

/* 容器查询（Container Queries）*/
.container {
    container-type: inline-size;
}

@container (min-width: 400px) {
    .card {
        display: flex;
    }
}

/* 响应式网格 */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}
```

### 4. 移动优先策略

```css
/* 移动优先（推荐）- 从小屏幕开始，逐渐增强 */

/* 基础样式（移动设备）*/
.container {
    width: 100%;
    padding: 10px;
}

/* 平板设备 */
@media (min-width: 768px) {
    .container {
        width: 750px;
        padding: 20px;
    }
}

/* 桌面设备 */
@media (min-width: 992px) {
    .container {
        width: 970px;
    }
}

/* 大屏设备 */
@media (min-width: 1200px) {
    .container {
        width: 1170px;
    }
}
```

## 十五、CSS 高级特性

### 1. CSS 变量（自定义属性）

```css
/* 定义变量 */
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --font-size: 16px;
    --spacing: 20px;
}

/* 使用变量 */
.button {
    background-color: var(--primary-color);
    font-size: var(--font-size);
    padding: var(--spacing);
}

/* 变量回退值 */
.text {
    color: var(--text-color, #333);
    /* 如果 --text-color 未定义，使用 #333 */
}

/* 局部变量 */
.dark-theme {
    --primary-color: #2c3e50;
    --bg-color: #000;
}

/* JavaScript 操作变量 */
<script>
    // 获取变量
    const root = document.documentElement;
    const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');

    // 设置变量
    root.style.setProperty('--primary-color', '#e74c3c');
</script>

/* 深色模式示例 */
:root {
    --bg-color: #fff;
    --text-color: #333;
}

@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #000;
        --text-color: #fff;
    }
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
}
```

### 2. CSS 函数

```css
/* calc() - 计算 */
.calc {
    width: calc(100% - 50px);
    height: calc(100vh - 80px);
    font-size: calc(1rem + 2vw);
}

/* min() - 最小值 */
.min {
    width: min(500px, 100%);
    /* 取 500px 和 100% 中的较小值 */
}

/* max() - 最大值 */
.max {
    width: max(300px, 50%);
    /* 取 300px 和 50% 中的较大值 */
}

/* clamp() - 限制范围 */
.clamp {
    width: clamp(300px, 50%, 800px);
    /* 最小值 首选值 最大值 */
    font-size: clamp(1rem, 2vw, 3rem);
}

/* var() - CSS 变量 */
.var {
    color: var(--primary-color);
}

/* attr() - 获取属性值 */
.attr::after {
    content: attr(data-text);
}

/* url() - URL */
.url {
    background-image: url('image.jpg');
}

/* rgb()/rgba() - 颜色 */
.color {
    color: rgb(255, 0, 0);
    background: rgba(0, 0, 255, 0.5);
}

/* hsl()/hsla() - HSL 颜色 */
.hsl {
    color: hsl(0, 100%, 50%);
    background: hsla(120, 100%, 50%, 0.5);
}
```

### 3. 滤镜（Filter）

```css
/* 单个滤镜 */
.filter {
    filter: blur(5px);              /* 模糊 */
    filter: brightness(1.5);        /* 亮度（0-无限）*/
    filter: contrast(1.5);          /* 对比度（0-无限）*/
    filter: grayscale(100%);        /* 灰度（0-100%）*/
    filter: hue-rotate(90deg);      /* 色相旋转（0-360deg）*/
    filter: invert(100%);           /* 反色（0-100%）*/
    filter: opacity(50%);           /* 不透明度（0-100%）*/
    filter: saturate(2);            /* 饱和度（0-无限）*/
    filter: sepia(100%);            /* 褐色（0-100%）*/
    filter: drop-shadow(2px 2px 5px rgba(0,0,0,0.5));  /* 阴影 */
}

/* 组合滤镜 */
.multi-filter {
    filter: brightness(1.2) contrast(1.1) saturate(1.3);
}

/* 背景滤镜 */
.backdrop-filter {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.8);
}
```

### 4. 混合模式（Blend Mode）

```css
/* 背景混合模式 */
.blend {
    background: linear-gradient(red, blue), url('image.jpg');
    background-blend-mode: multiply;
    /* normal/multiply/screen/overlay/darken/lighten/color-dodge/color-burn/hard-light/soft-light/difference/exclusion/hue/saturation/color/luminosity */
}

/* 元素混合模式 */
.mix-blend {
    mix-blend-mode: multiply;
}
```

### 5. 裁剪路径（Clip Path）

```css
/* 基本形状 */
.clip {
    clip-path: circle(50%);                 /* 圆形 */
    clip-path: ellipse(50% 25%);            /* 椭圆 */
    clip-path: inset(10px 20px 30px 40px);  /* 矩形 */
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);  /* 多边形 */
}

/* 三角形 */
.triangle {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

/* 星形 */
.star {
    clip-path: polygon(
        50% 0%, 61% 35%, 98% 35%, 68% 57%,
        79% 91%, 50% 70%, 21% 91%, 32% 57%,
        2% 35%, 39% 35%
    );
}

/* SVG 路径 */
.svg-clip {
    clip-path: url(#my-clip-path);
}
```

### 6. 对象适配（Object Fit）

```css
/* 图片/视频适配容器 */
img, video {
    width: 100%;
    height: 300px;
    object-fit: fill;       /* 拉伸填充（默认）*/
    object-fit: contain;    /* 包含（保持比例，可能留白）*/
    object-fit: cover;      /* 覆盖（保持比例，可能裁切）*/
    object-fit: none;       /* 原始大小 */
    object-fit: scale-down; /* contain 和 none 中较小的 */

    object-position: center;    /* 对象位置 */
    object-position: top left;
    object-position: 50% 50%;
}
```

### 7. 滚动行为

```css
/* 平滑滚动 */
html {
    scroll-behavior: smooth;
}

/* 滚动捕捉 */
.scroll-container {
    scroll-snap-type: y mandatory;      /* 垂直强制捕捉 */
    overflow-y: scroll;
}

.scroll-item {
    scroll-snap-align: start;           /* 对齐起点 */
    scroll-snap-stop: always;           /* 总是停止 */
}

/* 隐藏滚动条 */
.hide-scrollbar {
    scrollbar-width: none;              /* Firefox */
    -ms-overflow-style: none;           /* IE/Edge */
}

.hide-scrollbar::-webkit-scrollbar {
    display: none;                      /* Chrome/Safari */
}

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
    width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
}
```

## 十六、CSS 最佳实践

### 1. 命名规范

```css
/* BEM 命名法（Block Element Modifier）*/

/* Block（块）*/
.card { }

/* Element（元素）*/
.card__header { }
.card__body { }
.card__footer { }

/* Modifier（修饰符）*/
.card--primary { }
.card--large { }
.card__header--highlighted { }

/* 示例 */
<div class="card card--primary">
    <div class="card__header card__header--highlighted">标题</div>
    <div class="card__body">内容</div>
    <div class="card__footer">底部</div>
</div>
```

### 2. 性能优化

```css
/* 1. 避免过度嵌套 */
/* 不推荐 */
.header .nav ul li a { }

/* 推荐 */
.nav-link { }

/* 2. 使用高效选择器 */
/* 快 → 慢：ID > 类 > 标签 > 通配符 */

/* 3. 减少重绘和回流 */
/* 使用 transform 代替 position */
.move {
    transform: translateX(100px);    /* 推荐 */
    /* left: 100px; */                /* 不推荐 */
}

/* 4. 使用 will-change 提示浏览器 */
.optimized {
    will-change: transform, opacity;
}

/* 5. 避免使用 @import */
/* 不推荐 */
@import url('style.css');

/* 推荐 */
<link rel="stylesheet" href="style.css">
```

### 3. 代码组织

```css
/* 按功能模块组织 */

/* 1. 重置和基础样式 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 2. 变量定义 */
:root {
    --primary-color: #3498db;
}

/* 3. 布局 */
.container { }
.row { }
.col { }

/* 4. 组件 */
.button { }
.card { }
.modal { }

/* 5. 工具类 */
.text-center { text-align: center; }
.mt-1 { margin-top: 10px; }

/* 6. 响应式 */
@media (max-width: 768px) { }
```

### 4. 可维护性

```css
/* 1. 使用有意义的类名 */
/* 不推荐 */
.btn1 { }
.red-text { }

/* 推荐 */
.button-primary { }
.text-error { }

/* 2. 避免使用 !important */
/* 只在覆盖第三方库时使用 */

/* 3. 使用注释 */
/* ===== 导航栏 ===== */
.nav {
    /* 样式 */
}

/* 4. 保持一致性 */
/* 统一的缩进、空格、命名风格 */
```

## 十七、实战示例

### 示例1：响应式导航栏

```html
<nav class="navbar">
    <div class="navbar__logo">Logo</div>
    <ul class="navbar__menu">
        <li><a href="#home">首页</a></li>
        <li><a href="#about">关于</a></li>
        <li><a href="#services">服务</a></li>
        <li><a href="#contact">联系</a></li>
    </ul>
    <div class="navbar__toggle">
        <span></span>
        <span></span>
        <span></span>
    </div>
</nav>

<style>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #333;
    color: white;
}

.navbar__logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.navbar__menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.navbar__menu a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

.navbar__menu a:hover {
    color: #3498db;
}

.navbar__toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
}

.navbar__toggle span {
    width: 25px;
    height: 3px;
    background: white;
    transition: all 0.3s;
}

@media (max-width: 768px) {
    .navbar__menu {
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        background: #333;
        flex-direction: column;
        padding: 1rem;
        display: none;
    }

    .navbar__toggle {
        display: flex;
    }

    .navbar__menu.active {
        display: flex;
    }
}
</style>
```

### 示例2：卡片布局

```html
<div class="card">
    <img src="image.jpg" alt="Card image" class="card__image">
    <div class="card__content">
        <h3 class="card__title">卡片标题</h3>
        <p class="card__description">这是卡片的描述内容...</p>
        <button class="card__button">查看详情</button>
    </div>
</div>

<style>
.card {
    max-width: 350px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.card__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card__content {
    padding: 1.5rem;
}

.card__title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #333;
}

.card__description {
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.6;
}

.card__button {
    background: #3498db;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.card__button:hover {
    background: #2980b9;
}
</style>
```

### 示例3：模态框

```html
<div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__content">
        <button class="modal__close">&times;</button>
        <h2>模态框标题</h2>
        <p>这是模态框的内容...</p>
    </div>
</div>

<style>
.modal {
    position: fixed;
    inset: 0;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal.active {
    display: flex;
}

.modal__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(5px);
}

.modal__content {
    position: relative;
    background: white;
    padding: 2rem;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    animation: modalSlideIn 0.3s ease-out;
}

.modal__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #999;
    transition: color 0.3s;
}

.modal__close:hover {
    color: #333;
}

@keyframes modalSlideIn {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
```

---

## 总结

恭喜你！你已经学习了 HTML5 和 CSS 的核心知识。以下是学习路线建议：

### 学习路线

1. **HTML 基础** → 掌握标签、属性、语义化
2. **CSS 基础** → 选择器、盒模型、文本样式
3. **CSS 布局** → Flexbox、Grid、定位
4. **响应式设计** → 媒体查询、移动优先
5. **CSS 动画** → 过渡、动画、变换
6. **实战项目** → 制作个人网站、仿站练习

### 推荐资源

- **MDN Web Docs**：权威的 Web 技术文档
- **CSS-Tricks**：CSS 技巧和教程
- **Can I Use**：查看 CSS 属性的浏览器兼容性
- **CodePen**：在线代码编辑器，查看他人作品
- **GitHub**：查看开源项目，学习优秀代码

### 下一步

- 学习 **JavaScript**，实现网页交互
- 学习 **CSS 预处理器**（Sass/Less）
- 学习 **CSS 框架**（Bootstrap/Tailwind CSS）
- 学习 **前端框架**（Vue/React/Angular）

持续练习，不断实践，你一定能成为优秀的前端开发者！🚀
