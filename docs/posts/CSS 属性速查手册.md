---
title: CSS 属性速查手册
date: 2025-11-20
categories:
  - 前端开发
tags:
  - CSS
---

# CSS 属性速查手册

本手册按功能分类，列出所有常用的 CSS 属性及其用处，方便快速查找。

---

## 一、文本样式属性

### 1. 颜色相关

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `color` | 设置文字颜色 | `red`, `#ff0000`, `rgb(255,0,0)` |
| `opacity` | 设置元素透明度（0-1） | `0.5`, `1` |

### 2. 字体相关

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `font-family` | 设置字体系列 | `Arial`, `"Microsoft YaHei"`, `sans-serif` |
| `font-size` | 设置字体大小 | `16px`, `1.5em`, `2rem`, `100%` |
| `font-weight` | 设置字体粗细 | `normal`, `bold`, `100-900` |
| `font-style` | 设置字体样式（斜体等） | `normal`, `italic`, `oblique` |
| `font-variant` | 设置字体变体 | `normal`, `small-caps` |
| `font` | 字体复合属性（简写） | `italic bold 16px/1.5 Arial` |
| `line-height` | 设置行高 | `1.5`, `24px`, `150%` |

### 3. 文本格式化

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `text-align` | 设置文本水平对齐 | `left`, `right`, `center`, `justify` |
| `text-align-last` | 设置最后一行对齐方式 | `left`, `right`, `center`, `justify` |
| `vertical-align` | 设置垂直对齐（行内/表格元素） | `baseline`, `top`, `middle`, `bottom` |
| `text-decoration` | 设置文本装饰线 | `none`, `underline`, `overline`, `line-through` |
| `text-decoration-line` | 装饰线位置 | `underline`, `overline`, `line-through` |
| `text-decoration-color` | 装饰线颜色 | `red`, `#ff0000` |
| `text-decoration-style` | 装饰线样式 | `solid`, `dashed`, `dotted`, `wavy` |
| `text-decoration-thickness` | 装饰线粗细 | `2px`, `auto` |
| `text-transform` | 设置文本大小写转换 | `none`, `capitalize`, `uppercase`, `lowercase` |
| `text-indent` | 设置首行缩进 | `2em`, `32px` |
| `text-shadow` | 设置文字阴影 | `2px 2px 4px rgba(0,0,0,0.5)` |
| `text-overflow` | 设置文本溢出处理 | `clip`, `ellipsis` |
| `text-wrap` | 设置文本换行方式 | `wrap`, `nowrap`, `balance` |

### 4. 字符和单词

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `letter-spacing` | 设置字符间距 | `2px`, `0.1em`, `normal` |
| `word-spacing` | 设置单词间距 | `5px`, `normal` |
| `word-break` | 设置单词换行规则 | `normal`, `break-all`, `keep-all` |
| `word-wrap` | 设置长单词换行（同 overflow-wrap） | `normal`, `break-word` |
| `overflow-wrap` | 设置长单词换行 | `normal`, `break-word`, `anywhere` |
| `white-space` | 设置空白符处理方式 | `normal`, `nowrap`, `pre`, `pre-wrap`, `pre-line` |
| `tab-size` | 设置制表符宽度 | `4`, `8` |
| `hyphens` | 设置连字符 | `none`, `manual`, `auto` |

### 5. 书写模式

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `writing-mode` | 设置书写方向 | `horizontal-tb`, `vertical-rl`, `vertical-lr` |
| `direction` | 设置文本方向 | `ltr`, `rtl` |
| `unicode-bidi` | 设置 Unicode 双向算法 | `normal`, `embed`, `bidi-override` |

---

## 二、盒模型属性

### 1. 尺寸

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `width` | 设置元素宽度 | `300px`, `50%`, `auto` |
| `height` | 设置元素高度 | `200px`, `50vh`, `auto` |
| `min-width` | 设置最小宽度 | `200px`, `50%` |
| `max-width` | 设置最大宽度 | `1200px`, `100%` |
| `min-height` | 设置最小高度 | `100px`, `50vh` |
| `max-height` | 设置最大高度 | `500px`, `80vh` |
| `box-sizing` | 设置盒模型计算方式 | `content-box`, `border-box` |

> 💡 **box-sizing 详解**:
> ```css
> /* content-box（默认值）*/
> .box1 {
>   box-sizing: content-box;
>   width: 300px;           /* 仅内容宽度 */
>   padding: 20px;
>   border: 1px solid #000;
>   /* 实际总宽度 = 300 + 20*2 + 1*2 = 342px */
> }
>
> /* border-box（推荐）*/
> .box2 {
>   box-sizing: border-box;
>   width: 300px;           /* 包含padding和border的总宽度 */
>   padding: 20px;
>   border: 1px solid #000;
>   /* 实际总宽度 = 300px */
>   /* 内容宽度 = 300 - 20*2 - 1*2 = 258px */
> }
> ```
>
> ⚠️ **注意事项**:
> - **默认值问题**: 浏览器默认使用content-box,布局计算复杂
> - **全局设置**: 推荐在项目开始时全局设置为border-box
> - **继承性**: box-sizing不继承,需要显式设置
> - **兼容性**: 所有现代浏览器(含IE8+)均原生支持,无需加任何前缀
> - **百分比宽度**: border-box配合百分比宽度更容易控制布局
>
> ```css
> /* 常见错误示例 */
> .wrong {
>   width: 100%;        /* ❌ 会超出父容器 */
>   padding: 20px;
>   border: 1px solid #000;
> }
>
> /* 正确做法 */
> .correct {
>   box-sizing: border-box;
>   width: 100%;        /* ✅ 正好填满父容器 */
>   padding: 20px;
>   border: 1px solid #000;
> }
>
> /* 全局推荐设置 */
> *, *::before, *::after {
>   box-sizing: border-box;
> }
> ```
>
> 🎯 **实际应用场景**:
> ```css
> /* 场景1:响应式网格布局 */
> .grid-item {
>   box-sizing: border-box;
>   width: 33.333%;  /* 三列布局 */
>   padding: 15px;   /* 不影响宽度 */
>   border: 1px solid #ddd;
>   float: left;
> }
>
> /* 场景2:表单元素统一大小 */
> input, textarea, button {
>   box-sizing: border-box;
>   width: 100%;
>   padding: 10px;
>   border: 2px solid #ccc;
>   /* 所有元素宽度一致 */
> }
>
> /* 场景3:卡片组件 */
> .card {
>   box-sizing: border-box;
>   width: 300px;
>   padding: 20px;
>   border: 1px solid #e0e0e0;
>   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
>   /* 固定宽度,内边距和边框不影响布局 */
> }
>
> /* 场景4:Flexbox容器 */
> .flex-container {
>   display: flex;
>   gap: 20px;
> }
>
> .flex-item {
>   box-sizing: border-box;
>   flex: 1;         /* 平分空间 */
>   padding: 15px;   /* padding不破坏等分 */
>   border: 2px solid #333;
> }
> ```

### 2. 内边距（Padding）

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `padding` | 设置内边距（四边简写） | `20px`, `10px 20px`, `10px 20px 30px 40px` |
| `padding-top` | 设置上内边距 | `10px`, `1em` |
| `padding-right` | 设置右内边距 | `10px`, `1em` |
| `padding-bottom` | 设置下内边距 | `10px`, `1em` |
| `padding-left` | 设置左内边距 | `10px`, `1em` |

### 3. 外边距（Margin）

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `margin` | 设置外边距（四边简写） | `20px`, `10px 20px`, `0 auto` |
| `margin-top` | 设置上外边距 | `10px`, `1em` |
| `margin-right` | 设置右外边距 | `10px`, `auto` |
| `margin-bottom` | 设置下外边距 | `10px`, `1em` |
| `margin-left` | 设置左外边距 | `10px`, `auto` |

### 4. 边框（Border）

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `border` | 设置边框（简写） | `1px solid #000` |
| `border-width` | 设置边框宽度 | `1px`, `thin`, `medium`, `thick` |
| `border-style` | 设置边框样式 | `solid`, `dashed`, `dotted`, `double`, `none` |
| `border-color` | 设置边框颜色 | `red`, `#ff0000` |
| `border-top` | 设置上边框 | `1px solid #000` |
| `border-right` | 设置右边框 | `1px solid #000` |
| `border-bottom` | 设置下边框 | `1px solid #000` |
| `border-left` | 设置左边框 | `1px solid #000` |
| `border-top-width` | 设置上边框宽度 | `2px` |
| `border-top-style` | 设置上边框样式 | `solid` |
| `border-top-color` | 设置上边框颜色 | `red` |
| `border-radius` | 设置圆角 | `10px`, `50%`, `10px 20px` |
| `border-top-left-radius` | 设置左上圆角 | `10px` |
| `border-top-right-radius` | 设置右上圆角 | `10px` |
| `border-bottom-left-radius` | 设置左下圆角 | `10px` |
| `border-bottom-right-radius` | 设置右下圆角 | `10px` |
| `border-image` | 设置边框图片 | `url(border.png) 30 round` |
| `border-image-source` | 边框图片源 | `url(border.png)` |
| `border-image-slice` | 边框图片切片 | `30` |
| `border-image-width` | 边框图片宽度 | `10px` |
| `border-image-repeat` | 边框图片重复方式 | `stretch`, `repeat`, `round` |

### 5. 轮廓（Outline）

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `outline` | 设置轮廓（不占空间）| `2px solid red` |
| `outline-width` | 设置轮廓宽度 | `2px`, `thin`, `medium`, `thick` |
| `outline-style` | 设置轮廓样式 | `solid`, `dashed`, `dotted`, `none` |
| `outline-color` | 设置轮廓颜色 | `red`, `invert` |
| `outline-offset` | 设置轮廓偏移 | `5px`, `-5px` |

---

## 三、背景属性

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `background` | 背景复合属性（简写） | `red url(bg.jpg) no-repeat center/cover` |
| `background-color` | 设置背景颜色 | `red`, `#ff0000`, `transparent` |
| `background-image` | 设置背景图片 | `url(image.jpg)`, `linear-gradient(red, blue)` |
| `background-repeat` | 设置背景重复方式 | `repeat`, `no-repeat`, `repeat-x`, `repeat-y` |
| `background-position` | 设置背景位置 | `center`, `top left`, `50% 50%`, `10px 20px` |
| `background-size` | 设置背景大小 | `auto`, `cover`, `contain`, `100px 200px`, `50%` |
| `background-attachment` | 设置背景固定方式 | `scroll`, `fixed`, `local` |
| `background-origin` | 设置背景定位区域 | `padding-box`, `border-box`, `content-box` |
| `background-clip` | 设置背景裁剪区域 | `border-box`, `padding-box`, `content-box`, `text` |
| `background-blend-mode` | 设置背景混合模式 | `normal`, `multiply`, `screen`, `overlay` |

---

## 四、显示与可见性

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `display` | 设置元素显示类型 | `block`, `inline`, `inline-block`, `flex`, `grid`, `none` |
| `visibility` | 设置元素可见性（占空间） | `visible`, `hidden`, `collapse` |
| `opacity` | 设置元素透明度 | `0` 到 `1` |
| `overflow` | 设置溢出处理方式 | `visible`, `hidden`, `scroll`, `auto` |
| `overflow-x` | 设置水平溢出处理 | `visible`, `hidden`, `scroll`, `auto` |
| `overflow-y` | 设置垂直溢出处理 | `visible`, `hidden`, `scroll`, `auto` |
| `overflow-wrap` | 设置长单词换行 | `normal`, `break-word` |
| `clip` | 裁剪绝对定位元素（已废弃，请用 clip-path） | `rect(0, 100px, 100px, 0)` |
| `clip-path` | 设置裁剪路径 | `circle(50%)`, `polygon(...)` |

---

## 五、定位属性

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `position` | 设置定位方式 | `static`, `relative`, `absolute`, `fixed`, `sticky` |
| `top` | 设置距顶部距离（已定位元素） | `10px`, `50%`, `auto` |
| `right` | 设置距右边距离 | `10px`, `50%`, `auto` |
| `bottom` | 设置距底部距离 | `10px`, `50%`, `auto` |
| `left` | 设置距左边距离 | `10px`, `50%`, `auto` |
| `inset` | 设置四边距离（简写） | `10px`, `0 10px`, `10px 20px 30px 40px` |
| `z-index` | 设置层叠顺序 | `1`, `100`, `-1`, `auto` |
| `float` | 设置浮动 | `left`, `right`, `none` |
| `clear` | 清除浮动 | `left`, `right`, `both`, `none` |

> 💡 **position 定位详解**:
> ```css
> /* static - 静态定位(默认) */
> .static {
>   position: static;
>   /* top/right/bottom/left无效 */
>   /* 按照正常文档流排列 */
> }
>
> /* relative - 相对定位 */
> .relative {
>   position: relative;
>   top: 20px;     /* 相对原位置向下偏移20px */
>   left: 30px;    /* 相对原位置向右偏移30px */
>   /* 元素仍占据原来的空间 */
>   /* 常用作absolute的定位参照 */
> }
>
> /* absolute - 绝对定位 */
> .absolute {
>   position: absolute;
>   top: 0;        /* 相对最近的已定位祖先元素 */
>   right: 0;
>   /* 脱离文档流,不占空间 */
>   /* 如果没有已定位祖先,相对body定位 */
> }
>
> /* fixed - 固定定位 */
> .fixed {
>   position: fixed;
>   bottom: 20px;  /* 相对浏览器视口 */
>   right: 20px;
>   /* 脱离文档流 */
>   /* 滚动页面时保持固定位置 */
> }
>
> /* sticky - 粘性定位 */
> .sticky {
>   position: sticky;
>   top: 0;        /* 滚动到阈值时固定 */
>   /* 平时是relative,滚动到阈值后变fixed */
>   /* 不脱离文档流 */
> }
> ```
>
> ⚠️ **注意事项**:
> - **定位参照**: absolute相对最近的已定位(非static)祖先元素
> - **z-index**: 只对已定位元素(非static)有效
> - **性能影响**: fixed和absolute会触发重绘,慎用大量定位元素
> - **sticky兼容性**: IE不支持sticky,需要fallback方案
> - **脱离文档流**: absolute和fixed会导致父元素高度塌陷
> - **百分比定位**: 百分比值相对于包含块的尺寸
>
> ```css
> /* 常见错误:父元素没有定位 */
> .parent {
>   /* ❌ 没有设置position */
> }
> .child {
>   position: absolute;
>   top: 0;
>   /* 会相对body定位,而不是.parent */
> }
>
> /* 正确做法 */
> .parent {
>   position: relative;  /* ✅ 设置为定位参照 */
> }
> .child {
>   position: absolute;
>   top: 0;              /* 现在相对.parent定位 */
> }
>
> /* sticky需要指定阈值 */
> .sticky-wrong {
>   position: sticky;  /* ❌ 没有top/bottom值 */
> }
> .sticky-correct {
>   position: sticky;
>   top: 0;            /* ✅ 指定粘性阈值 */
> }
> ```
>
> 🎯 **实际应用场景**:
> ```css
> /* 场景1:固定导航栏 */
> .navbar {
>   position: fixed;
>   top: 0;
>   left: 0;
>   width: 100%;
>   background: #333;
>   z-index: 1000;
>   /* 页面滚动时始终显示 */
> }
> body {
>   padding-top: 60px;  /* 避免内容被导航栏遮挡 */
> }
>
> /* 场景2:模态框/弹窗居中 */
> .modal-overlay {
>   position: fixed;
>   top: 0;
>   left: 0;
>   width: 100%;
>   height: 100%;
>   background: rgba(0,0,0,0.5);
>   display: flex;
>   align-items: center;
>   justify-content: center;
>   z-index: 9999;
> }
> .modal-content {
>   position: relative;
>   background: white;
>   padding: 20px;
>   border-radius: 8px;
> }
>
> /* 场景3:角标/徽章 */
> .icon-container {
>   position: relative;
>   display: inline-block;
> }
> .badge {
>   position: absolute;
>   top: -5px;
>   right: -5px;
>   background: red;
>   color: white;
>   border-radius: 50%;
>   padding: 2px 6px;
>   font-size: 12px;
> }
>
> /* 场景4:粘性表头 */
> .table-header {
>   position: sticky;
>   top: 0;
>   background: white;
>   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
>   z-index: 10;
>   /* 滚动表格时表头保持可见 */
> }
>
> /* 场景5:回到顶部按钮 */
> .back-to-top {
>   position: fixed;
>   bottom: 20px;
>   right: 20px;
>   width: 50px;
>   height: 50px;
>   background: #007bff;
>   color: white;
>   border-radius: 50%;
>   cursor: pointer;
>   z-index: 999;
> }
> ```

---

## 六、Flexbox 布局属性

### 1. 容器属性

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `display: flex` | 启用 Flex 布局 | `flex`, `inline-flex` |
| `flex-direction` | 设置主轴方向 | `row`, `row-reverse`, `column`, `column-reverse` |
| `flex-wrap` | 设置换行方式 | `nowrap`, `wrap`, `wrap-reverse` |
| `flex-flow` | flex-direction 和 flex-wrap 简写 | `row wrap` |
| `justify-content` | 设置主轴对齐方式 | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` |
| `align-items` | 设置交叉轴对齐方式 | `flex-start`, `flex-end`, `center`, `baseline`, `stretch` |
| `align-content` | 设置多行对齐方式 | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `stretch` |
| `gap` | 设置项目间距 | `20px`, `1rem` |
| `row-gap` | 设置行间距 | `10px` |
| `column-gap` | 设置列间距 | `20px` |

### 2. 项目属性

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `order` | 设置项目排序 | `0`, `1`, `-1` |
| `flex-grow` | 设置放大比例 | `0`, `1`, `2` |
| `flex-shrink` | 设置缩小比例 | `1`, `0` |
| `flex-basis` | 设置基础大小 | `auto`, `200px`, `50%` |
| `flex` | flex-grow、flex-shrink、flex-basis 简写 | `1`, `0 1 auto`, `1 1 200px` |
| `align-self` | 设置单个项目对齐方式 | `auto`, `flex-start`, `flex-end`, `center`, `baseline`, `stretch` |

---

## 七、Grid 布局属性

### 1. 容器属性

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `display: grid` | 启用 Grid 布局 | `grid`, `inline-grid` |
| `grid-template-columns` | 定义列 | `100px 200px`, `1fr 2fr`, `repeat(3, 1fr)` |
| `grid-template-rows` | 定义行 | `100px 200px`, `auto 1fr auto` |
| `grid-template-areas` | 定义网格区域 | `"header header" "nav main"` |
| `grid-template` | grid-template-rows、columns、areas 简写 | 复杂值 |
| `grid-column-gap` | 设置列间距（旧语法） | `20px` |
| `grid-row-gap` | 设置行间距（旧语法） | `10px` |
| `grid-gap` | 设置行列间距（旧语法） | `10px 20px` |
| `gap` | 设置行列间距（新语法） | `20px`, `10px 20px` |
| `row-gap` | 设置行间距 | `10px` |
| `column-gap` | 设置列间距 | `20px` |
| `justify-items` | 设置项目水平对齐 | `start`, `end`, `center`, `stretch` |
| `align-items` | 设置项目垂直对齐 | `start`, `end`, `center`, `stretch` |
| `place-items` | justify-items 和 align-items 简写 | `center`, `start end` |
| `justify-content` | 设置网格水平对齐 | `start`, `end`, `center`, `space-between`, `space-around`, `space-evenly` |
| `align-content` | 设置网格垂直对齐 | `start`, `end`, `center`, `space-between`, `space-around`, `space-evenly` |
| `place-content` | justify-content 和 align-content 简写 | `center`, `start end` |
| `grid-auto-columns` | 设置自动列宽 | `100px`, `1fr` |
| `grid-auto-rows` | 设置自动行高 | `100px`, `minmax(100px, auto)` |
| `grid-auto-flow` | 设置自动放置方向 | `row`, `column`, `dense` |
| `grid` | Grid 所有属性简写 | 复杂值 |

### 2. 项目属性

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `grid-column-start` | 设置列起始线 | `1`, `2`, `span 2` |
| `grid-column-end` | 设置列结束线 | `3`, `span 2` |
| `grid-column` | grid-column-start 和 end 简写 | `1 / 3`, `span 2` |
| `grid-row-start` | 设置行起始线 | `1`, `2`, `span 2` |
| `grid-row-end` | 设置行结束线 | `3`, `span 2` |
| `grid-row` | grid-row-start 和 end 简写 | `1 / 3`, `span 2` |
| `grid-area` | 设置网格区域或位置 | `header`, `1 / 1 / 2 / 3` |
| `justify-self` | 设置单个项目水平对齐 | `start`, `end`, `center`, `stretch` |
| `align-self` | 设置单个项目垂直对齐 | `start`, `end`, `center`, `stretch` |
| `place-self` | justify-self 和 align-self 简写 | `center`, `start end` |

---

## 八、变换属性（Transform）

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `transform` | 设置 2D/3D 变换 | `rotate(45deg)`, `scale(1.5)`, `translate(10px, 20px)` |
| `transform-origin` | 设置变换原点 | `center`, `top left`, `50% 50%` |
| `transform-style` | 设置 3D 变换样式 | `flat`, `preserve-3d` |
| `perspective` | 设置透视距离 | `1000px` |
| `perspective-origin` | 设置透视原点 | `50% 50%`, `center` |
| `backface-visibility` | 设置背面可见性 | `visible`, `hidden` |

**transform 函数值**

| 函数 | 用处 | 示例 |
|------|------|------|
| `translate(x, y)` | 2D 平移 | `translate(50px, 100px)` |
| `translateX(x)` | X 轴平移 | `translateX(50px)` |
| `translateY(y)` | Y 轴平移 | `translateY(50px)` |
| `translateZ(z)` | Z 轴平移 | `translateZ(50px)` |
| `translate3d(x,y,z)` | 3D 平移 | `translate3d(50px, 100px, 50px)` |
| `scale(x, y)` | 2D 缩放 | `scale(1.5)`, `scale(1.5, 2)` |
| `scaleX(x)` | X 轴缩放 | `scaleX(1.5)` |
| `scaleY(y)` | Y 轴缩放 | `scaleY(1.5)` |
| `scaleZ(z)` | Z 轴缩放 | `scaleZ(2)` |
| `scale3d(x,y,z)` | 3D 缩放 | `scale3d(1.5, 1.5, 2)` |
| `rotate(angle)` | 2D 旋转 | `rotate(45deg)` |
| `rotateX(angle)` | 绕 X 轴旋转 | `rotateX(45deg)` |
| `rotateY(angle)` | 绕 Y 轴旋转 | `rotateY(45deg)` |
| `rotateZ(angle)` | 绕 Z 轴旋转 | `rotateZ(45deg)` |
| `rotate3d(x,y,z,a)` | 3D 旋转 | `rotate3d(1, 1, 1, 45deg)` |
| `skew(x, y)` | 2D 倾斜 | `skew(20deg, 10deg)` |
| `skewX(angle)` | X 轴倾斜 | `skewX(20deg)` |
| `skewY(angle)` | Y 轴倾斜 | `skewY(20deg)` |
| `matrix(...)` | 2D 矩阵变换 | `matrix(1, 0, 0, 1, 0, 0)` |
| `matrix3d(...)` | 3D 矩阵变换 | 16个参数 |

---

## 九、过渡属性（Transition）

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `transition` | 过渡复合属性（简写） | `all 0.3s ease` |
| `transition-property` | 设置过渡属性 | `all`, `width`, `opacity` |
| `transition-duration` | 设置过渡时长 | `0.3s`, `300ms` |
| `transition-timing-function` | 设置过渡时间函数 | `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier(...)` |
| `transition-delay` | 设置过渡延迟 | `0.1s`, `100ms` |

---

## 十、动画属性（Animation）

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `animation` | 动画复合属性（简写） | `slide 1s ease infinite` |
| `animation-name` | 设置动画名称 | `slide`, `fade` |
| `animation-duration` | 设置动画时长 | `1s`, `1000ms` |
| `animation-timing-function` | 设置动画时间函数 | `ease`, `linear`, `ease-in`, `ease-out`, `steps(4)` |
| `animation-delay` | 设置动画延迟 | `0.5s`, `500ms` |
| `animation-iteration-count` | 设置动画重复次数 | `1`, `3`, `infinite` |
| `animation-direction` | 设置动画方向 | `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `animation-fill-mode` | 设置动画填充模式 | `none`, `forwards`, `backwards`, `both` |
| `animation-play-state` | 设置动画播放状态 | `running`, `paused` |

---

## 十一、滤镜与特效

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `filter` | 设置图形滤镜效果 | `blur(5px)`, `brightness(1.5)`, `grayscale(100%)` |
| `backdrop-filter` | 设置背景滤镜效果 | `blur(10px)` |
| `mix-blend-mode` | 设置元素混合模式 | `normal`, `multiply`, `screen`, `overlay` |
| `background-blend-mode` | 设置背景混合模式 | `normal`, `multiply`, `screen`, `overlay` |
| `isolation` | 设置混合隔离 | `auto`, `isolate` |

**filter 函数值**

| 函数 | 用处 | 示例 |
|------|------|------|
| `blur(px)` | 模糊 | `blur(5px)` |
| `brightness(%)` | 亮度 | `brightness(150%)` |
| `contrast(%)` | 对比度 | `contrast(200%)` |
| `grayscale(%)` | 灰度 | `grayscale(100%)` |
| `hue-rotate(deg)` | 色相旋转 | `hue-rotate(90deg)` |
| `invert(%)` | 反转 | `invert(100%)` |
| `opacity(%)` | 不透明度 | `opacity(50%)` |
| `saturate(%)` | 饱和度 | `saturate(200%)` |
| `sepia(%)` | 褐色 | `sepia(100%)` |
| `drop-shadow(...)` | 阴影 | `drop-shadow(2px 2px 5px rgba(0,0,0,0.5))` |

---

## 十二、阴影效果

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `box-shadow` | 设置盒子阴影 | `2px 2px 5px rgba(0,0,0,0.3)` |
| `text-shadow` | 设置文字阴影 | `2px 2px 4px rgba(0,0,0,0.5)` |

---

## 十三、列表属性

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `list-style` | 列表样式（简写） | `circle inside` |
| `list-style-type` | 设置列表标记类型 | `none`, `disc`, `circle`, `square`, `decimal`, `upper-alpha` |
| `list-style-position` | 设置列表标记位置 | `inside`, `outside` |
| `list-style-image` | 设置列表标记图片 | `url(marker.png)`, `none` |

---

## 十四、表格属性

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `border-collapse` | 设置表格边框合并 | `separate`, `collapse` |
| `border-spacing` | 设置单元格间距 | `10px`, `5px 10px` |
| `caption-side` | 设置表格标题位置 | `top`, `bottom` |
| `empty-cells` | 设置空单元格显示 | `show`, `hide` |
| `table-layout` | 设置表格布局算法 | `auto`, `fixed` |

---

## 十五、多列布局

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `columns` | 多列布局（简写） | `3`, `200px 3` |
| `column-count` | 设置列数 | `3`, `auto` |
| `column-width` | 设置列宽 | `200px`, `auto` |
| `column-gap` | 设置列间距 | `20px`, `normal` |
| `column-rule` | 设置列边框（简写） | `1px solid #ccc` |
| `column-rule-width` | 列边框宽度 | `1px` |
| `column-rule-style` | 列边框样式 | `solid`, `dashed`, `dotted` |
| `column-rule-color` | 列边框颜色 | `#ccc` |
| `column-span` | 设置跨列 | `none`, `all` |
| `column-fill` | 设置列填充方式 | `auto`, `balance` |
| `break-before` | 设置元素前断点 | `auto`, `avoid`, `column`, `page` |
| `break-after` | 设置元素后断点 | `auto`, `avoid`, `column`, `page` |
| `break-inside` | 设置元素内断点 | `auto`, `avoid`, `avoid-column`, `avoid-page` |

---

## 十六、用户界面属性

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `cursor` | 设置鼠标指针样式 | `auto`, `pointer`, `text`, `move`, `not-allowed`, `url(cursor.cur)` |
| `user-select` | 设置文本选择 | `auto`, `none`, `text`, `all` |
| `pointer-events` | 设置元素是否响应指针事件 | `auto`, `none` |
| `resize` | 设置元素可调整大小 | `none`, `both`, `horizontal`, `vertical` |
| `caret-color` | 设置插入光标颜色 | `red`, `auto` |
| `accent-color` | 设置强调色（表单控件） | `red`, `auto` |
| `appearance` | 设置元素外观 | `none`, `auto` |
| `scroll-behavior` | 设置滚动行为 | `auto`, `smooth` |
| `scroll-snap-type` | 设置滚动捕捉类型 | `none`, `x mandatory`, `y proximity` |
| `scroll-snap-align` | 设置滚动捕捉对齐 | `none`, `start`, `end`, `center` |
| `scroll-margin` | 设置滚动外边距 | `20px` |
| `scroll-padding` | 设置滚动内边距 | `20px` |
| `scrollbar-width` | 设置滚动条宽度（Firefox） | `auto`, `thin`, `none` |
| `scrollbar-color` | 设置滚动条颜色（Firefox） | `red blue` |

---

## 十七、内容生成

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `content` | 设置伪元素内容 | `"文本"`, `attr(data-text)`, `counter(name)` |
| `quotes` | 设置引号样式 | `""" """ "'" "'"` |
| `counter-reset` | 重置计数器 | `section 0` |
| `counter-increment` | 增加计数器 | `section 1` |
| `counter-set` | 设置计数器 | `section 5` |

---

## 十八、打印属性

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `page-break-before` | 设置元素前分页 | `auto`, `always`, `avoid`, `left`, `right` |
| `page-break-after` | 设置元素后分页 | `auto`, `always`, `avoid`, `left`, `right` |
| `page-break-inside` | 设置元素内分页 | `auto`, `avoid` |
| `orphans` | 设置孤行数 | `2` |
| `widows` | 设置寡行数 | `2` |

---

## 十九、CSS 变量（自定义属性）

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `--custom-property` | 定义 CSS 变量 | `--primary-color: #3498db;` |
| `var()` | 使用 CSS 变量 | `color: var(--primary-color);` |

---

## 二十、其他属性

| 属性名 | 用处 | 示例值 |
|--------|------|--------|
| `all` | 重置所有属性 | `initial`, `inherit`, `unset`, `revert` |
| `contain` | 设置元素包含 | `none`, `layout`, `paint`, `size`, `strict`, `content` |
| `content-visibility` | 设置内容可见性（性能优化） | `visible`, `auto`, `hidden` |
| `will-change` | 提示浏览器元素将变化 | `auto`, `transform`, `opacity` |
| `aspect-ratio` | 设置宽高比 | `16/9`, `1`, `4/3` |
| `object-fit` | 设置替换元素适配方式 | `fill`, `contain`, `cover`, `none`, `scale-down` |
| `object-position` | 设置替换元素位置 | `center`, `top left`, `50% 50%` |
| `image-rendering` | 设置图片渲染方式 | `auto`, `crisp-edges`, `pixelated` |
| `touch-action` | 设置触摸行为 | `auto`, `none`, `pan-x`, `pan-y`, `manipulation` |
| `overscroll-behavior` | 设置过度滚动行为 | `auto`, `contain`, `none` |

---

## 二十一、逻辑属性（Logical Properties）

逻辑属性根据书写模式自动调整方向，支持国际化。

### 尺寸相关

| 属性名 | 对应物理属性 | 用处 |
|--------|-------------|------|
| `inline-size` | `width` | 设置内联尺寸 |
| `block-size` | `height` | 设置块级尺寸 |
| `min-inline-size` | `min-width` | 最小内联尺寸 |
| `max-inline-size` | `max-width` | 最大内联尺寸 |
| `min-block-size` | `min-height` | 最小块级尺寸 |
| `max-block-size` | `max-height` | 最大块级尺寸 |

### 边距相关

| 属性名 | 对应物理属性 | 用处 |
|--------|-------------|------|
| `margin-inline` | `margin-left/right` | 内联外边距 |
| `margin-block` | `margin-top/bottom` | 块级外边距 |
| `margin-inline-start` | `margin-left` | 内联起始外边距 |
| `margin-inline-end` | `margin-right` | 内联结束外边距 |
| `margin-block-start` | `margin-top` | 块级起始外边距 |
| `margin-block-end` | `margin-bottom` | 块级结束外边距 |
| `padding-inline` | `padding-left/right` | 内联内边距 |
| `padding-block` | `padding-top/bottom` | 块级内边距 |
| `padding-inline-start` | `padding-left` | 内联起始内边距 |
| `padding-inline-end` | `padding-right` | 内联结束内边距 |
| `padding-block-start` | `padding-top` | 块级起始内边距 |
| `padding-block-end` | `padding-bottom` | 块级结束内边距 |

### 边框相关

| 属性名 | 对应物理属性 | 用处 |
|--------|-------------|------|
| `border-inline` | `border-left/right` | 内联边框 |
| `border-block` | `border-top/bottom` | 块级边框 |
| `border-inline-start` | `border-left` | 内联起始边框 |
| `border-inline-end` | `border-right` | 内联结束边框 |
| `border-block-start` | `border-top` | 块级起始边框 |
| `border-block-end` | `border-bottom` | 块级结束边框 |

### 定位相关

| 属性名 | 对应物理属性 | 用处 |
|--------|-------------|------|
| `inset-inline` | `left/right` | 内联偏移 |
| `inset-block` | `top/bottom` | 块级偏移 |
| `inset-inline-start` | `left` | 内联起始偏移 |
| `inset-inline-end` | `right` | 内联结束偏移 |
| `inset-block-start` | `top` | 块级起始偏移 |
| `inset-block-end` | `bottom` | 块级结束偏移 |

---

## 二十二、CSS 函数

| 函数名 | 用处 | 示例 |
|--------|------|------|
| `calc()` | 计算值 | `width: calc(100% - 50px);` |
| `min()` | 取最小值 | `width: min(500px, 100%);` |
| `max()` | 取最大值 | `width: max(300px, 50%);` |
| `clamp()` | 限制范围 | `font-size: clamp(1rem, 2vw, 3rem);` |
| `var()` | 使用 CSS 变量 | `color: var(--primary-color);` |
| `attr()` | 获取属性值 | `content: attr(data-text);` |
| `url()` | 指定 URL | `background: url(image.jpg);` |
| `rgb()` | RGB 颜色 | `color: rgb(255, 0, 0);` |
| `rgba()` | RGBA 颜色 | `color: rgba(255, 0, 0, 0.5);` |
| `hsl()` | HSL 颜色 | `color: hsl(0, 100%, 50%);` |
| `hsla()` | HSLA 颜色 | `color: hsla(0, 100%, 50%, 0.5);` |
| `linear-gradient()` | 线性渐变 | `background: linear-gradient(red, blue);` |
| `radial-gradient()` | 径向渐变 | `background: radial-gradient(circle, red, blue);` |
| `conic-gradient()` | 圆锥渐变 | `background: conic-gradient(red, yellow, blue);` |
| `repeating-linear-gradient()` | 重复线性渐变 | `background: repeating-linear-gradient(red, blue 20px);` |
| `repeating-radial-gradient()` | 重复径向渐变 | `background: repeating-radial-gradient(red, blue 20px);` |
| `repeating-conic-gradient()` | 重复圆锥渐变 | `background: repeating-conic-gradient(red 0deg 10deg, blue 10deg 20deg);` |

---

## 二十三、选择器优先级

虽然不是属性，但了解选择器优先级对使用 CSS 至关重要。

| 选择器类型 | 权重 | 示例 |
|-----------|------|------|
| `!important` | 最高 | `color: red !important;` |
| 内联样式 | 1000 | `<div style="color: red;">` |
| ID 选择器 | 100 | `#header` |
| 类选择器 | 10 | `.button` |
| 属性选择器 | 10 | `[type="text"]` |
| 伪类选择器 | 10 | `:hover`, `:first-child` |
| 标签选择器 | 1 | `div`, `p` |
| 伪元素选择器 | 1 | `::before`, `::after` |
| 通配符选择器 | 0 | `*` |

---

## 二十四、常用单位

| 单位类型 | 单位 | 说明 | 示例 |
|---------|------|------|------|
| **绝对单位** | `px` | 像素 | `16px` |
| | `pt` | 点（1pt = 1/72英寸） | `12pt` |
| | `cm` | 厘米 | `2cm` |
| | `mm` | 毫米 | `10mm` |
| | `in` | 英寸 | `1in` |
| | `pc` | 派卡（1pc = 12pt） | `2pc` |
| **相对单位** | `em` | 相对父元素字体大小 | `1.5em` |
| | `rem` | 相对根元素字体大小 | `2rem` |
| | `%` | 百分比（相对父元素） | `50%` |
| | `vw` | 视口宽度的 1% | `50vw` |
| | `vh` | 视口高度的 1% | `100vh` |
| | `vmin` | 视口较小尺寸的 1% | `50vmin` |
| | `vmax` | 视口较大尺寸的 1% | `50vmax` |
| | `ch` | 字符 "0" 的宽度 | `40ch` |
| | `ex` | 小写字母 "x" 的高度 | `2ex` |
| | `lh` | 元素行高 | `2lh` |
| **角度单位** | `deg` | 度（0-360） | `45deg` |
| | `rad` | 弧度 | `1.57rad` |
| | `grad` | 百分度 | `50grad` |
| | `turn` | 圈数 | `0.5turn` |
| **时间单位** | `s` | 秒 | `2s` |
| | `ms` | 毫秒 | `500ms` |
| **频率单位** | `Hz` | 赫兹 | `440Hz` |
| | `kHz` | 千赫兹 | `2.5kHz` |
| **分辨率单位** | `dpi` | 每英寸点数 | `96dpi` |
| | `dpcm` | 每厘米点数 | `38dpcm` |
| | `dppx` | 每像素点数 | `2dppx` |

---

## 二十五、关键字值

这些关键字可用于多个属性：

| 关键字 | 说明 | 适用场景 |
|--------|------|---------|
| `auto` | 自动计算 | 宽高、外边距等 |
| `inherit` | 继承父元素的值 | 所有属性 |
| `initial` | 使用初始值 | 所有属性 |
| `unset` | 可继承则继承，否则初始值 | 所有属性 |
| `revert` | 恢复浏览器默认样式 | 所有属性 |
| `currentColor` | 当前 color 值 | 颜色相关属性 |
| `transparent` | 透明 | 颜色相关属性 |

---

## 使用建议

1. **常用优先**：先掌握最常用的属性（盒模型、文本、定位、Flexbox）
2. **分类记忆**：按功能分类记忆，而不是逐个死记
3. **实践为主**：通过实际项目练习，加深理解
4. **查阅习惯**：不确定时查阅 MDN 或本手册
5. **浏览器兼容**：使用新特性时检查 Can I Use

## 快速查找技巧

- **Ctrl+F** 搜索关键字
- 查看目录快速定位分类
- 收藏本文档方便随时查阅

---

**持续更新中...** 如有遗漏或错误，欢迎补充！
