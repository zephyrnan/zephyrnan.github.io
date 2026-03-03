---
title: jQuery 学习笔记
date: 2026-03-03
categories:
  - 前端开发
tags:
  - jQuery
  - JavaScript
---

# jQuery 学习笔记

[jQuery 官方文档](https://jquery.com/) | [jQuery API 中文文档](https://www.jquery123.com/)

## 一、jQuery 简介

### 1. jQuery 是什么

- **jQuery** 是一个快速、小巧、功能丰富的 **JavaScript 库**
- 由 John Resig 于 2006 年发布，其核心理念是 **"Write Less, Do More"**（写得更少，做得更多）
- jQuery 极大地简化了 DOM 操作、事件处理、动画效果和 Ajax 交互

> 💡 **理解要点**：
> - **库 vs 框架**：jQuery 是一个"库"，它不会改变你的代码组织方式，只是提供了一组更便捷的工具函数
> - **封装原生 JS**：jQuery 本质上是对原生 JavaScript DOM API 的封装和增强，底层仍然是 JS
> - **历史地位**：jQuery 曾是前端开发的事实标准（2006-2015），在浏览器兼容性混乱的年代解决了巨大的痛点。如今虽然现代框架（React/Vue）已成为主流，但大量老项目仍在使用 jQuery，了解它依然有价值
> - **现状**：新项目一般不再选择 jQuery，但在维护老项目、使用 Bootstrap 4 及以下版本、WordPress 开发等场景中仍然会遇到

### 2. jQuery 的优势

- **简洁的语法**：用 `$` 选择器代替冗长的 `document.getElementById()` 等
- **强大的选择器**：支持 CSS 选择器、伪类选择器等丰富的元素选取方式
- **链式调用**：大多数方法返回 jQuery 对象本身，支持 `.method1().method2().method3()` 连续调用
- **跨浏览器兼容**：自动处理 IE、Firefox、Chrome 等浏览器之间的差异
- **丰富的插件生态**：海量的第三方插件可以快速实现轮播图、弹窗、表单验证等功能
- **隐式迭代**：对一组匹配的元素自动遍历执行操作，不需要手动写循环

### 3. 引入 jQuery

**CDN 引入（推荐快速使用）**

```html
<!-- 生产环境（压缩版） -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>

<!-- 开发环境（未压缩，可调试） -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.js"></script>
```

**本地引入**

```html
<!-- 下载后放到项目中 -->
<script src="./js/jquery.min.js"></script>
```

**npm 安装**

```bash
npm install jquery
```

```js
// 模块化项目中引入
import $ from 'jquery';
```

### 4. 入口函数

```js
// 方式一：完整写法
$(document).ready(function () {
    // DOM 加载完成后执行
    console.log('DOM 准备就绪');
});

// 方式二：简写形式（推荐）
$(function () {
    // DOM 加载完成后执行
    console.log('DOM 准备就绪');
});
```

> 💡 **jQuery 入口函数 vs window.onload**：
>
> | 特性         | `$(function() {})` | `window.onload`     |
> | ------------ | -------------------- | ------------------- |
> | 执行时机     | DOM 结构加载完成即执行 | 所有资源（图片等）加载完成后执行 |
> | 执行速度     | 更快                 | 较慢                |
> | 可绑定多个   | 可以                 | 后面的会覆盖前面的  |

### 5. $ 符号的本质

```js
// $ 是 jQuery 的别名，两者完全等价
console.log($ === jQuery);  // true

// $ 是一个函数，接收不同类型的参数
$(function () {});           // 传入函数 → 入口函数
$('#box');                   // 传入选择器字符串 → 获取元素
$('<div>新元素</div>');      // 传入 HTML 字符串 → 创建元素
$(document);                 // 传入 DOM 对象 → 转为 jQuery 对象
```

> 💡 **避免 $ 冲突**：如果项目中有其他库也使用了 `$`，可以使用 `jQuery.noConflict()` 释放 `$`，之后用 `jQuery` 代替 `$`。

## 二、选择器

jQuery 的选择器语法与 CSS 选择器一致，这是 jQuery 最强大的特性之一。

### 1. 基础选择器

```js
$('#id')           // ID 选择器：选取 id="id" 的元素
$('.class')        // 类选择器：选取所有 class="class" 的元素
$('div')           // 标签选择器：选取所有 <div> 元素
$('*')             // 通配选择器：选取所有元素
$('div, p, span')  // 并集选择器：选取所有 div、p、span
```

### 2. 层级选择器

```js
$('ul li')         // 后代选择器：ul 内所有的 li（包含孙子辈）
$('ul > li')       // 子代选择器：ul 的直接子元素 li
$('.box + p')      // 相邻兄弟：紧接在 .box 后面的第一个 p
$('.box ~ p')      // 通用兄弟：.box 后面所有的同级 p
```

### 3. 过滤选择器

```js
// 基本过滤
$('li:first')         // 第一个 li
$('li:last')          // 最后一个 li
$('li:eq(2)')         // 索引为 2 的 li（从 0 开始）
$('li:odd')           // 奇数索引的 li（1, 3, 5...）
$('li:even')          // 偶数索引的 li（0, 2, 4...）
$('li:gt(2)')         // 索引大于 2 的 li
$('li:lt(2)')         // 索引小于 2 的 li
$(':not(.active)')    // 不含 active 类的元素

// 内容过滤
$('div:contains("Hello")')  // 包含文本 "Hello" 的 div
$('div:empty')               // 没有子元素的 div
$('div:has(p)')              // 包含 p 元素的 div

// 可见性过滤
$('div:visible')     // 可见的 div
$('div:hidden')      // 隐藏的 div

// 表单过滤
$(':input')          // 所有表单元素（input、textarea、select、button）
$(':text')           // type="text" 的 input
$(':password')       // type="password" 的 input
$(':checked')        // 选中的复选框/单选框
$(':selected')       // 选中的 option
$(':disabled')       // 禁用的表单元素
$(':enabled')        // 启用的表单元素
```

### 4. 属性选择器

```js
$('input[name]')           // 有 name 属性的 input
$('input[name="user"]')    // name="user" 的 input
$('input[name^="pre"]')    // name 以 "pre" 开头的 input
$('input[name$="fix"]')    // name 以 "fix" 结尾的 input
$('input[name*="mid"]')    // name 包含 "mid" 的 input
$('input[name!="user"]')   // name 不等于 "user" 的 input（jQuery 扩展）
```

### 5. jQuery 对象与 DOM 对象的互转

```js
// DOM 对象 → jQuery 对象：用 $() 包裹
const div = document.getElementById('box');
const $div = $(div);       // 现在可以使用 jQuery 方法了
$div.hide();

// jQuery 对象 → DOM 对象：用索引或 get() 方法
const $lis = $('li');
const li1 = $lis[0];      // 方式一：下标取出
const li2 = $lis.get(0);  // 方式二：get() 方法
li1.style.color = 'red';  // 使用原生 DOM API
```

> 💡 **核心概念**：
> - **jQuery 对象**是一个**类数组对象**，内部包含一组匹配到的 DOM 元素
> - jQuery 对象只能使用 jQuery 方法，DOM 对象只能使用原生方法，两者**不能混用**
> - 习惯上给 jQuery 对象变量名加 `$` 前缀，如 `$box`，以便和 DOM 对象区分

## 三、DOM 操作

### 1. 获取和设置内容

```js
// html() — 获取/设置 HTML 内容（相当于 innerHTML）
$('#box').html();                         // 获取内容
$('#box').html('<h1>新标题</h1>');         // 设置内容（会解析 HTML 标签）

// text() — 获取/设置纯文本（相当于 innerText）
$('#box').text();                         // 获取纯文本
$('#box').text('纯文本内容');              // 设置纯文本（标签会被转义）

// val() — 获取/设置表单元素的值（相当于 value）
$('input').val();                         // 获取输入框的值
$('input').val('新的值');                  // 设置输入框的值
```

**html() vs text() 对比**

| 方法      | 读取内容     | 设置内容             | 等价原生属性   |
| --------- | ------------ | -------------------- | -------------- |
| `html()`  | 含 HTML 标签 | 会解析 HTML 标签     | `innerHTML`    |
| `text()`  | 仅纯文本     | 不会解析 HTML 标签   | `innerText`    |

### 2. 属性操作

```js
// attr() — 获取/设置 HTML 属性（操作的是标签上的属性）
$('img').attr('src');                      // 获取 src 属性
$('img').attr('src', 'new.jpg');           // 设置单个属性
$('img').attr({                            // 设置多个属性
    src: 'new.jpg',
    alt: '新图片',
    title: '图片标题'
});
$('img').removeAttr('title');              // 移除属性

// prop() — 获取/设置 DOM 属性（操作的是 DOM 对象的属性）
$(':checkbox').prop('checked');             // 获取选中状态（返回 true/false）
$(':checkbox').prop('checked', true);       // 设置为选中
$(':checkbox').prop('disabled', true);      // 设置为禁用
```

> 💡 **attr() vs prop()**：
> - `attr()` 操作的是 **HTML 标签属性**（写在标签上的），返回字符串
> - `prop()` 操作的是 **DOM 对象属性**（JavaScript 对象的属性），返回对应类型
> - **经验法则**：对于 `checked`、`disabled`、`selected` 等**布尔属性**，用 `prop()`；对于 `src`、`href`、`class`、自定义属性等，用 `attr()`
> - 如果用 `attr()` 获取 `checked`，可能返回 `"checked"` 或 `undefined`，而不是 `true/false`

### 3. data() — 自定义数据

```js
// 存储数据（不会写到 HTML 标签上，存在 jQuery 内部缓存中）
$('#box').data('index', 5);
$('#box').data('info', { name: '张三', age: 18 });

// 读取数据
$('#box').data('index');     // 5
$('#box').data('info');      // { name: '张三', age: 18 }

// 也可以读取 HTML5 的 data-* 属性
// <div id="box" data-color="red" data-user-name="张三"></div>
$('#box').data('color');     // 'red'
$('#box').data('userName');  // '张三'（自动转为驼峰命名）

// 移除数据
$('#box').removeData('index');
```

### 4. 样式操作

```js
// css() — 获取/设置样式
$('#box').css('color');                       // 获取样式值
$('#box').css('color', 'red');                // 设置单个样式
$('#box').css({                               // 设置多个样式
    color: 'red',
    fontSize: '20px',                         // 驼峰写法
    'background-color': '#f0f0f0',            // 或用引号包裹的 CSS 原始写法
    width: 200                                // 数值类型自动加 px
});

// 类名操作
$('#box').addClass('active');                 // 添加类名
$('#box').addClass('active highlight');       // 添加多个类名
$('#box').removeClass('active');              // 移除类名
$('#box').removeClass();                      // 移除所有类名
$('#box').toggleClass('active');              // 切换类名（有则移除，无则添加）
$('#box').hasClass('active');                 // 判断是否有某个类名（返回布尔值）
```

**与原生 classList 的对比**

| jQuery 方法         | 原生 DOM classList       | 作用         |
| ------------------- | ------------------------ | ------------ |
| `.addClass()`       | `.classList.add()`       | 添加类名     |
| `.removeClass()`    | `.classList.remove()`    | 移除类名     |
| `.toggleClass()`    | `.classList.toggle()`    | 切换类名     |
| `.hasClass()`       | `.classList.contains()`  | 判断类名     |

### 5. 尺寸和位置

```js
// 尺寸方法
$('#box').width();           // 内容宽度（不含 padding、border）
$('#box').height();          // 内容高度
$('#box').innerWidth();      // 内容 + padding
$('#box').innerHeight();
$('#box').outerWidth();      // 内容 + padding + border
$('#box').outerHeight();
$('#box').outerWidth(true);  // 内容 + padding + border + margin

// 设置尺寸
$('#box').width(300);        // 设置宽度（数值自动加 px）
$('#box').height('50%');     // 也可以传字符串

// 位置方法
$('#box').offset();          // 相对于文档的偏移 { top: 100, left: 50 }
$('#box').offset({ top: 200, left: 100 });  // 设置偏移
$('#box').position();        // 相对于定位父元素的偏移（只读）
$(window).scrollTop();       // 获取页面滚动距离
$(window).scrollTop(0);      // 滚动到顶部
```

> 💡 **尺寸方法图解**：
> ```
> ┌─────── outerWidth(true) ────────┐
> │ margin                          │
> │ ┌──── outerWidth() ──────┐      │
> │ │ border                 │      │
> │ │ ┌── innerWidth() ──┐   │      │
> │ │ │ padding           │   │      │
> │ │ │ ┌─ width() ──┐   │   │      │
> │ │ │ │  content    │   │   │      │
> │ │ │ └─────────────┘   │   │      │
> │ │ └───────────────────┘   │      │
> │ └─────────────────────────┘      │
> └──────────────────────────────────┘
> ```

## 四、DOM 节点操作

### 1. 创建节点

```js
// 创建元素
const $newDiv = $('<div class="item">新元素</div>');
const $newLi = $('<li>').text('列表项').addClass('active');
```

### 2. 插入节点

```js
// 内部插入（作为子元素）
$('#list').append('<li>末尾追加</li>');       // 在内部末尾追加
$('#list').prepend('<li>开头插入</li>');      // 在内部开头插入
$('<li>末尾追加</li>').appendTo('#list');     // 反向写法，效果同 append
$('<li>开头插入</li>').prependTo('#list');    // 反向写法，效果同 prepend

// 外部插入（作为兄弟元素）
$('#box').after('<p>后面插入</p>');           // 在元素后面插入
$('#box').before('<p>前面插入</p>');          // 在元素前面插入
$('<p>后面插入</p>').insertAfter('#box');     // 反向写法
$('<p>前面插入</p>').insertBefore('#box');    // 反向写法
```

**插入方法对比**

| 方法            | 位置         | 方向       | 说明                   |
| --------------- | ------------ | ---------- | ---------------------- |
| `append()`      | 内部末尾     | 父 → 子   | `A.append(B)` B 加到 A 内部末尾 |
| `appendTo()`    | 内部末尾     | 子 → 父   | `B.appendTo(A)` 同上   |
| `prepend()`     | 内部开头     | 父 → 子   | `A.prepend(B)` B 加到 A 内部开头 |
| `prependTo()`   | 内部开头     | 子 → 父   | `B.prependTo(A)` 同上  |
| `after()`       | 外部后面     | 参考 → 新 | `A.after(B)` B 加到 A 后面 |
| `before()`      | 外部前面     | 参考 → 新 | `A.before(B)` B 加到 A 前面 |

### 3. 删除和替换节点

```js
// 删除
$('#box').remove();      // 删除元素本身（包括事件和数据，彻底销毁）
$('#box').detach();      // 删除元素但保留事件和数据（可以重新插入）
$('#box').empty();       // 清空元素的所有子节点（元素本身保留）

// 替换
$('#old').replaceWith('<div>新元素</div>');
$('<div>新元素</div>').replaceAll('#old');      // 反向写法

// 克隆
$('#box').clone();        // 浅拷贝（不复制事件）
$('#box').clone(true);    // 深拷贝（同时复制事件处理函数）
```

> 💡 **remove() vs detach() vs empty()**：
> - `remove()`：彻底删除元素，事件和数据**一并清除**，适合永久删除
> - `detach()`：从 DOM 中移除但**保留事件和数据**，适合临时移除后重新插入
> - `empty()`：只清空**子元素**，元素本身保留在 DOM 中

### 4. 包裹节点

```js
// wrap() — 给每个元素单独包裹一层
$('p').wrap('<div class="wrapper"></div>');
// 结果：每个 p 都被各自的 div 包裹

// wrapAll() — 所有匹配元素用一个元素包裹
$('p').wrapAll('<div class="wrapper"></div>');
// 结果：所有 p 被同一个 div 包裹

// wrapInner() — 包裹元素的内容
$('p').wrapInner('<strong></strong>');
// <p>文本</p> → <p><strong>文本</strong></p>

// unwrap() — 移除父元素（保留自身）
$('p').unwrap();
```

## 五、事件处理

### 1. 事件绑定

```js
// on() — 推荐的事件绑定方式
$('#btn').on('click', function () {
    console.log('按钮被点击了');
});

// 绑定多个事件
$('#box').on({
    mouseenter: function () {
        $(this).addClass('hover');
    },
    mouseleave: function () {
        $(this).removeClass('hover');
    },
    click: function () {
        console.log('点击了');
    }
});

// 同一处理函数绑定多个事件（空格分隔）
$('#box').on('mouseenter mouseleave', function () {
    $(this).toggleClass('hover');
});
```

### 2. 事件委托

利用事件冒泡机制，将事件绑定到父元素上，处理子元素的事件。特别适用于**动态添加的元素**。

```js
// 事件委托：on() 的第二个参数为子元素选择器
$('#list').on('click', 'li', function () {
    // this 指向触发事件的 li，而不是 #list
    $(this).toggleClass('active');
});

// 动态添加的 li 也能响应事件
$('#list').append('<li>新添加的项</li>');  // ✅ 点击同样有效

// ❌ 直接绑定：动态添加的元素无法响应
// $('li').on('click', function () { ... });  // 只对已存在的 li 有效
```

> 💡 **事件委托的优势**：
> - **动态元素**：后续添加的子元素自动拥有事件处理能力
> - **性能优化**：100 个 li 只需绑定 1 个事件到 ul 上，而不是 100 个
> - **原理**：事件冒泡 — 子元素的事件会冒泡到父元素，jQuery 通过 `event.target` 判断实际触发源

### 3. 事件解绑与一次性事件

```js
// off() — 解绑事件
$('#btn').off('click');           // 解绑所有 click 事件
$('#btn').off();                  // 解绑所有事件

// 解绑特定函数
function handleClick() {
    console.log('clicked');
}
$('#btn').on('click', handleClick);
$('#btn').off('click', handleClick);

// one() — 事件只触发一次
$('#btn').one('click', function () {
    console.log('只会执行一次');
});
```

### 4. 事件触发

```js
// trigger() — 自动触发事件（会触发冒泡和默认行为）
$('#btn').trigger('click');
$('#btn').click();               // 简写形式

// triggerHandler() — 不触发冒泡和默认行为
$('#form').triggerHandler('submit');
```

### 5. 常用事件方法

```js
// 鼠标事件
$('#box').click(fn)          // 单击
$('#box').dblclick(fn)       // 双击
$('#box').mouseenter(fn)     // 鼠标进入（不会冒泡）
$('#box').mouseleave(fn)     // 鼠标离开（不会冒泡）
$('#box').mouseover(fn)      // 鼠标经过（会冒泡）
$('#box').mouseout(fn)       // 鼠标离开（会冒泡）
$('#box').mousemove(fn)      // 鼠标移动
$('#box').hover(enterFn, leaveFn)  // mouseenter + mouseleave 的合写

// 键盘事件
$(document).keydown(fn)      // 按键按下
$(document).keyup(fn)        // 按键松开
$(document).keypress(fn)     // 按键按住（字符键）

// 表单事件
$('input').focus(fn)         // 获得焦点
$('input').blur(fn)          // 失去焦点
$('input').change(fn)        // 值发生变化
$('form').submit(fn)         // 表单提交
$('input').input(fn)         // 实时输入（需用 on 绑定）

// 窗口事件
$(window).scroll(fn)         // 滚动
$(window).resize(fn)         // 窗口大小变化
```

> 💡 **mouseenter/mouseleave vs mouseover/mouseout**：
> - `mouseenter/mouseleave`：**不冒泡**，鼠标移入/移出元素本身时触发，移到子元素上不会触发
> - `mouseover/mouseout`：**会冒泡**，鼠标移入/移出子元素时也会触发
> - 大多数场景推荐用 `mouseenter/mouseleave` 或 `hover()`，行为更符合预期

### 6. 事件对象

```js
$('#box').on('click', function (e) {
    // 事件对象属性
    e.type;                // 事件类型 'click'
    e.target;              // 触发事件的原始 DOM 元素
    e.currentTarget;       // 绑定事件的 DOM 元素（等价于 this）
    e.pageX;               // 鼠标相对于文档的 X 坐标
    e.pageY;               // 鼠标相对于文档的 Y 坐标
    e.which;               // 按键代码（鼠标或键盘）
    e.data;                // on() 中传递的附加数据
    e.timeStamp;           // 事件触发的时间戳

    // 事件对象方法
    e.preventDefault();    // 阻止默认行为（如阻止链接跳转、表单提交）
    e.stopPropagation();   // 阻止事件冒泡
    return false;          // jQuery 中等价于同时调用上面两个方法
});
```

## 六、动画与效果

### 1. 显示和隐藏

```js
// show() / hide() / toggle()
$('#box').hide();              // 立即隐藏
$('#box').show();              // 立即显示
$('#box').toggle();            // 切换显示/隐藏

// 带动画效果（参数：时长, 缓动, 回调函数）
$('#box').hide(1000);                    // 1000ms 内隐藏
$('#box').show('slow');                  // 'slow'(600ms) / 'normal'(400ms) / 'fast'(200ms)
$('#box').toggle(500, function () {      // 动画完成后的回调
    console.log('动画结束');
});
```

### 2. 淡入和淡出

```js
$('#box').fadeIn(500);          // 淡入（透明度 0 → 1）
$('#box').fadeOut(500);         // 淡出（透明度 1 → 0）
$('#box').fadeToggle(500);      // 切换淡入/淡出
$('#box').fadeTo(500, 0.5);    // 渐变到指定透明度（0~1）
```

### 3. 滑动

```js
$('#box').slideDown(500);       // 向下展开
$('#box').slideUp(500);         // 向上收起
$('#box').slideToggle(500);     // 切换展开/收起
```

### 4. 自定义动画

```js
// animate(目标属性, 时长, 缓动, 回调)
$('#box').animate({
    width: 300,
    height: 200,
    opacity: 0.5,
    left: '+=50',            // 在当前值上增加 50
    fontSize: 24
}, 1000, 'swing', function () {
    console.log('动画完成');
});

// 链式调用：依次执行多个动画（排队）
$('#box')
    .animate({ width: 300 }, 500)
    .animate({ height: 200 }, 500)
    .animate({ opacity: 0.5 }, 500);
```

> 💡 **animate() 注意事项**：
> - 只能对**数值属性**进行动画（如 width、height、opacity、left、margin 等）
> - **不能对颜色**属性进行动画（需要 jQuery UI 或 jQuery Color 插件）
> - **不能对 transform** 进行动画（需要插件，或建议用 CSS transition/animation 代替）
> - 缓动函数默认只有 `swing`（先慢后快再慢）和 `linear`（匀速），更多需要引入 jQuery UI

### 5. 停止动画

```js
// stop() — 停止当前动画
$('#box').stop();              // 停止当前动画，后续动画队列继续
$('#box').stop(true);          // 清空动画队列，停在当前位置
$('#box').stop(true, true);    // 清空队列，直接跳到当前动画的终点

// finish() — 立即完成所有排队中的动画
$('#box').finish();

// delay() — 动画延迟
$('#box')
    .fadeOut(500)
    .delay(1000)               // 延迟 1 秒
    .fadeIn(500);
```

> 💡 **防止动画积累**：当用户快速重复触发动画时（如快速 hover），动画会排队堆积。解决方法是在触发动画前调用 `stop()`：
> ```js
> $('#box').hover(
>     function () { $(this).stop().slideDown(300); },
>     function () { $(this).stop().slideUp(300); }
> );
> ```

## 七、Ajax

jQuery 对 Ajax 进行了深度封装，使异步请求变得极其简单。

### 1. $.ajax() — 完整写法

```js
$.ajax({
    url: '/api/users',           // 请求地址
    type: 'GET',                 // 请求方式：GET / POST / PUT / DELETE
    data: { page: 1, size: 10 }, // 发送的数据
    dataType: 'json',            // 预期返回的数据类型
    timeout: 5000,               // 超时时间（毫秒）
    headers: {                   // 自定义请求头
        'Authorization': 'Bearer xxx'
    },
    beforeSend: function () {
        // 请求发送前执行（可用于显示 loading）
        console.log('正在请求...');
    },
    success: function (data) {
        // 请求成功的回调
        console.log('数据：', data);
    },
    error: function (xhr, status, error) {
        // 请求失败的回调
        console.log('错误：', error);
    },
    complete: function () {
        // 请求完成的回调（无论成功还是失败）
        console.log('请求完成');
    }
});
```

### 2. $.get() / $.post() — 简写方法

```js
// $.get(url, data, callback, dataType)
$.get('/api/users', { page: 1 }, function (data) {
    console.log(data);
}, 'json');

// $.post(url, data, callback, dataType)
$.post('/api/login', {
    username: 'admin',
    password: '123456'
}, function (data) {
    console.log(data);
}, 'json');

// $.getJSON() — 专门获取 JSON 数据
$.getJSON('/api/users', function (data) {
    console.log(data);
});
```

### 3. 发送 JSON 数据

```js
// POST 发送 JSON 格式的请求体
$.ajax({
    url: '/api/users',
    type: 'POST',
    contentType: 'application/json',       // 设置请求体格式为 JSON
    data: JSON.stringify({                 // 必须手动序列化
        name: '张三',
        age: 18
    }),
    dataType: 'json',
    success: function (data) {
        console.log(data);
    }
});
```

### 4. 表单序列化

```js
// serialize() — 将表单数据序列化为 URL 编码字符串
// 结果："username=admin&password=123456"
const formData = $('form').serialize();

$.post('/api/login', formData, function (data) {
    console.log(data);
});

// serializeArray() — 序列化为对象数组
// 结果：[{ name: "username", value: "admin" }, { name: "password", value: "123456" }]
const formArray = $('form').serializeArray();
```

### 5. 全局 Ajax 事件

```js
// 所有 Ajax 请求的全局钩子（适合做统一的 loading 效果）
$(document)
    .ajaxStart(function () {
        // 任何 Ajax 请求开始时触发
        $('#loading').show();
    })
    .ajaxStop(function () {
        // 所有 Ajax 请求完成时触发
        $('#loading').hide();
    })
    .ajaxError(function (event, xhr, settings, error) {
        // 任何 Ajax 请求失败时触发
        console.error('请求失败：', settings.url, error);
    });
```

> 💡 **jQuery Ajax vs Fetch vs Axios**：
>
> | 特性          | jQuery Ajax      | Fetch API         | Axios            |
> | ------------- | ---------------- | ----------------- | ---------------- |
> | 类型          | jQuery 内置方法  | 浏览器原生 API    | 第三方库         |
> | Promise 支持  | 支持（Deferred） | 原生 Promise      | 原生 Promise     |
> | 请求/响应拦截 | 全局事件         | 不支持            | 支持             |
> | 自动 JSON 解析| 需指定 dataType  | 需手动 `.json()`  | 自动             |
> | 错误处理      | error 回调       | 只拒绝网络错误    | HTTP 错误也拒绝  |
> | 适用场景      | jQuery 项目      | 现代轻量级项目    | 中大型项目（推荐）|

## 八、遍历与查找

### 1. 遍历方法

```js
// each() — 遍历 jQuery 对象中的每个元素
$('li').each(function (index, element) {
    // index：当前索引
    // element：当前 DOM 元素（不是 jQuery 对象）
    console.log(index, $(element).text());

    // this 也指向当前 DOM 元素
    $(this).css('color', 'red');

    // return false 可以终止遍历（相当于 break）
    // return true 跳过当前项（相当于 continue）
});

// $.each() — 遍历数组或对象（工具方法）
$.each([10, 20, 30], function (index, value) {
    console.log(index, value);  // 0 10, 1 20, 2 30
});

$.each({ name: '张三', age: 18 }, function (key, value) {
    console.log(key, value);    // name 张三, age 18
});

// map() — 遍历并返回新的 jQuery 对象
const texts = $('li').map(function (index, element) {
    return $(element).text();
}).get();  // .get() 转为普通数组
```

### 2. 筛选方法

```js
$('li').first();               // 第一个元素
$('li').last();                // 最后一个元素
$('li').eq(2);                 // 索引为 2 的元素（返回 jQuery 对象）
$('li').filter('.active');     // 过滤出匹配选择器的元素
$('li').not('.active');        // 排除匹配选择器的元素
$('li').has('span');           // 保留包含指定后代的元素
$('li').slice(1, 4);          // 截取索引 1 到 3 的元素
```

### 3. 查找方法（关系查找）

```js
// 祖先 / 父级
$('#box').parent();                // 直接父元素
$('#box').parents();               // 所有祖先元素
$('#box').parents('.container');    // 匹配选择器的祖先
$('#box').closest('.container');    // 最近的匹配祖先（从自身开始向上找）
$('#box').parentsUntil('.wrapper'); // 向上查找直到匹配为止（不含匹配元素）

// 子级 / 后代
$('#box').children();              // 所有直接子元素
$('#box').children('.item');       // 匹配的直接子元素
$('#box').find('span');            // 所有匹配的后代元素（必须传参数）
$('#box').contents();              // 所有子节点（包括文本节点）

// 兄弟
$('#box').siblings();              // 所有兄弟元素
$('#box').siblings('.active');     // 匹配的兄弟元素
$('#box').next();                  // 下一个兄弟
$('#box').nextAll();               // 后面所有兄弟
$('#box').nextUntil('.end');       // 后面直到匹配为止
$('#box').prev();                  // 上一个兄弟
$('#box').prevAll();               // 前面所有兄弟
$('#box').prevUntil('.start');     // 前面直到匹配为止
```

> 💡 **parent() vs parents() vs closest()**：
> - `parent()`：只找直接父元素（一层）
> - `parents()`：找所有祖先元素（一直到 `<html>`），返回多个
> - `closest()`：从自身开始向上找，返回**第一个**匹配的祖先（只返回一个），最常用

### 4. 链式调用

jQuery 大多数方法都返回 jQuery 对象本身，因此可以链式调用：

```js
$('#box')
    .css('color', 'red')
    .addClass('active')
    .slideDown(500)
    .find('p')
    .text('Hello')
    .end()                // 回到上一个 jQuery 对象（即 #box）
    .attr('title', '标题');
```

> 💡 **end() 方法**：在链式调用中，`find()`、`children()`、`filter()` 等方法会改变当前操作的 jQuery 对象。调用 `end()` 可以回退到上一步的 jQuery 对象，继续操作原来的元素。

## 九、常用工具方法

### 1. 类型判断

```js
$.type(123);                  // 'number'
$.type('hello');              // 'string'
$.type([1, 2]);               // 'array'
$.type({});                   // 'object'
$.type(null);                 // 'null'
$.type(undefined);            // 'undefined'

$.isArray([1, 2, 3]);         // true
$.isFunction(function () {}); // true
$.isEmptyObject({});          // true
$.isPlainObject({});          // true（纯粹的对象，非 DOM/jQuery 等）
$.isNumeric('123');           // true
$.isNumeric('abc');           // false
```

> ⚠️ **注意**：`$.type()`、`$.isArray()`、`$.isFunction()`、`$.isNumeric()` 等方法在 jQuery 3.3+ 中已被标记为**废弃**（deprecated），推荐使用原生方法：`typeof`、`Array.isArray()`、`typeof fn === 'function'`、`!isNaN()` 等。

### 2. 其他工具方法

```js
// $.trim() — 去除字符串首尾空格（jQuery 3.5+ 废弃，用原生 String.trim()）
$.trim('  hello  ');          // 'hello'

// $.extend() — 合并对象
const defaults = { color: 'red', size: 12 };
const options = { color: 'blue', weight: 'bold' };

// 浅合并（修改 defaults）
$.extend(defaults, options);
// defaults → { color: 'blue', size: 12, weight: 'bold' }

// 不修改原对象的写法
const result = $.extend({}, defaults, options);

// 深拷贝合并（第一个参数传 true）
$.extend(true, target, obj1, obj2);

// $.proxy() — 改变函数的 this 指向（类似 Function.bind）
const obj = {
    name: '张三',
    sayHi: function () {
        console.log(this.name);
    }
};
$('#btn').on('click', $.proxy(obj.sayHi, obj));  // this 指向 obj
```

## 十、jQuery 插件机制

### 1. 使用插件的基本流程

```html
<!-- 1. 先引入 jQuery -->
<script src="jquery.min.js"></script>

<!-- 2. 再引入插件文件 -->
<script src="jquery.plugin.min.js"></script>
<link rel="stylesheet" href="jquery.plugin.css" />

<!-- 3. 按照插件文档初始化 -->
<script>
    $(function () {
        $('#element').pluginName({
            option1: value1,
            option2: value2
        });
    });
</script>
```

### 2. 自定义插件

```js
// 方式一：$.fn 扩展实例方法（最常用）
$.fn.highlight = function (color) {
    // this 是调用插件的 jQuery 对象
    return this.each(function () {
        $(this).css({
            backgroundColor: color || 'yellow',
            transition: 'background-color 0.3s'
        });
    });
    // 返回 this 以支持链式调用
};

// 使用
$('p').highlight('lightblue').addClass('highlighted');

// 方式二：带默认选项的插件
$.fn.tooltip = function (options) {
    // 合并默认值和用户传入的选项
    const settings = $.extend({
        position: 'top',
        delay: 200,
        bgColor: '#333'
    }, options);

    return this.each(function () {
        const $el = $(this);
        // 插件逻辑...
    });
};

// 使用
$('.tip').tooltip({ position: 'bottom', delay: 500 });
```

> 💡 **插件开发规范**：
> - 始终返回 `this`（或 `this.each(...)` 的结果）以支持**链式调用**
> - 使用 `$.extend()` 合并默认选项，方便用户自定义
> - 使用 **IIFE**（立即执行函数）避免污染全局：`(function($) { ... })(jQuery);`

## 十一、jQuery 与原生 JS 对照表

在学习 jQuery 的同时，了解对应的原生 JS 写法有助于深入理解：

| 操作             | jQuery                               | 原生 JavaScript                                        |
| ---------------- | ------------------------------------ | ------------------------------------------------------ |
| 获取元素         | `$('#id')`                           | `document.getElementById('id')`                        |
| 获取元素         | `$('.class')`                        | `document.querySelectorAll('.class')`                  |
| 获取元素         | `$('div')`                           | `document.querySelectorAll('div')`                     |
| 获取第一个       | `$('div').first()`                   | `document.querySelector('div')`                        |
| 修改文本         | `$('#el').text('hello')`             | `el.textContent = 'hello'`                             |
| 修改 HTML        | `$('#el').html('<b>hi</b>')`         | `el.innerHTML = '<b>hi</b>'`                           |
| 修改样式         | `$('#el').css('color', 'red')`       | `el.style.color = 'red'`                               |
| 添加类名         | `$('#el').addClass('active')`        | `el.classList.add('active')`                           |
| 移除类名         | `$('#el').removeClass('active')`     | `el.classList.remove('active')`                        |
| 绑定事件         | `$('#el').on('click', fn)`           | `el.addEventListener('click', fn)`                     |
| 解绑事件         | `$('#el').off('click', fn)`          | `el.removeEventListener('click', fn)`                  |
| 创建元素         | `$('<div>')`                         | `document.createElement('div')`                        |
| 追加子元素       | `$('#el').append(child)`             | `el.appendChild(child)`                                |
| 删除元素         | `$('#el').remove()`                  | `el.remove()`                                          |
| 显示/隐藏        | `$('#el').show()` / `.hide()`        | `el.style.display = 'block'` / `'none'`                |
| 获取属性         | `$('#el').attr('href')`              | `el.getAttribute('href')`                              |
| 遍历             | `$('li').each(fn)`                   | `document.querySelectorAll('li').forEach(fn)`          |
| Ajax             | `$.ajax({ url, success })`           | `fetch(url).then(r => r.json())`                       |
| DOM 加载         | `$(function() {})`                   | `document.addEventListener('DOMContentLoaded', fn)`    |

> 💡 **学习建议**：
> - 如果你正在**维护老项目**或使用依赖 jQuery 的库（如 Bootstrap 4、WordPress），jQuery 是必备技能
> - 如果你在**开发新项目**，推荐使用原生 JS（ES6+）或现代框架（React/Vue），它们在性能、架构和生态上都更具优势
> - 理解 jQuery 的设计思想（链式调用、隐式迭代、选择器引擎）对学习其他库和框架也有帮助
