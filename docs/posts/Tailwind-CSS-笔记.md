---
title: Tailwind CSS 完整笔记
date: 2025-11-20
categories:
  - 前端开发
tags:
  - CSS
  - Tailwind
---

# Tailwind CSS 完整笔记

## 目录
1. [基础概念](#基础概念)
2. [安装与配置](#安装与配置)
3. [核心概念](#核心概念)
4. [布局系统](#布局系统)
5. [间距系统](#间距系统)
6. [尺寸](#尺寸)
7. [颜色系统](#颜色系统)
8. [排版](#排版)
9. [边框与圆角](#边框与圆角)
10. [效果与滤镜](#效果与滤镜)
11. [Flexbox](#flexbox)
12. [Grid](#grid)
13. [响应式设计](#响应式设计)
14. [伪类与伪元素](#伪类与伪元素)
15. [动画与过渡](#动画与过渡)
16. [自定义配置](#自定义配置)
17. [最佳实践](#最佳实践)

---

## 基础概念

Tailwind CSS 是一个功能类优先（Utility-First）的 CSS 框架，通过组合小的、单一用途的类来构建复杂的用户界面。

### 核心理念
- **功能类优先**: 使用预定义的工具类而非自定义 CSS
- **组件化思维**: 通过组合类来创建可复用的组件
- **响应式设计**: 内置响应式修饰符
- **可定制性**: 通过配置文件完全自定义

---

## 安装与配置

### 1. 通过 npm 安装
```bash
npm install -D tailwindcss
npx tailwindcss init
```

### 2. 配置 tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./pages/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. 在 CSS 中引入
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. 构建流程
```bash
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

---

## 核心概念

### 1. 命名规范
Tailwind 的类名遵循一致的模式：
- `property-value`: 如 `text-center`, `bg-blue-500`
- `property-variant-value`: 如 `text-lg`, `p-4`

### 2. 任意值语法
当预设值不够用时，使用方括号语法：
```html
<div class="w-[137px] bg-[#1da1f2] top-[117px]">
  自定义值
</div>
```

### 3. 重要修饰符
使用 `!` 前缀添加 `!important`：
```html
<div class="!text-red-500">
  强制红色文本
</div>
```

---

## 布局系统

### Display
```html
<!-- 常用 display 属性 -->
<div class="block">块级元素</div>
<div class="inline-block">行内块</div>
<div class="inline">行内元素</div>
<div class="flex">弹性盒子</div>
<div class="inline-flex">行内弹性盒子</div>
<div class="grid">网格</div>
<div class="inline-grid">行内网格</div>
<div class="hidden">隐藏</div>
```

### Position
```html
<!-- 定位 -->
<div class="static">静态定位（默认）</div>
<div class="relative">相对定位</div>
<div class="absolute">绝对定位</div>
<div class="fixed">固定定位</div>
<div class="sticky">粘性定位</div>

<!-- 位置偏移 -->
<div class="top-0 right-0 bottom-0 left-0">各方向为0</div>
<div class="top-4 left-4">距顶部和左侧 1rem</div>
<div class="inset-0">所有方向为0</div>
<div class="inset-x-0">水平方向为0</div>
<div class="inset-y-0">垂直方向为0</div>
```

### Z-Index
```html
<div class="z-0">z-index: 0</div>
<div class="z-10">z-index: 10</div>
<div class="z-20">z-index: 20</div>
<div class="z-30">z-index: 30</div>
<div class="z-40">z-index: 40</div>
<div class="z-50">z-index: 50</div>
<div class="z-auto">z-index: auto</div>
```

### Overflow
```html
<div class="overflow-auto">自动滚动</div>
<div class="overflow-hidden">隐藏溢出</div>
<div class="overflow-visible">显示溢出</div>
<div class="overflow-scroll">始终显示滚动条</div>
<div class="overflow-x-auto">横向自动滚动</div>
<div class="overflow-y-auto">纵向自动滚动</div>
```

---

## 间距系统

Tailwind 使用统一的间距比例：0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64...

### Padding (内边距)
```html
<!-- 所有方向 -->
<div class="p-4">padding: 1rem</div>
<div class="p-0">padding: 0</div>

<!-- 单个方向 -->
<div class="pt-4">padding-top: 1rem</div>
<div class="pr-4">padding-right: 1rem</div>
<div class="pb-4">padding-bottom: 1rem</div>
<div class="pl-4">padding-left: 1rem</div>

<!-- 水平/垂直 -->
<div class="px-4">水平内边距: 1rem</div>
<div class="py-4">垂直内边距: 1rem</div>

<!-- 间距值参考 -->
p-0   = 0px
p-0.5 = 0.125rem (2px)
p-1   = 0.25rem (4px)
p-2   = 0.5rem (8px)
p-3   = 0.75rem (12px)
p-4   = 1rem (16px)
p-5   = 1.25rem (20px)
p-6   = 1.5rem (24px)
p-8   = 2rem (32px)
p-10  = 2.5rem (40px)
p-12  = 3rem (48px)
p-16  = 4rem (64px)
p-20  = 5rem (80px)
```

### Margin (外边距)
```html
<!-- 所有方向 -->
<div class="m-4">margin: 1rem</div>

<!-- 单个方向 -->
<div class="mt-4 mr-4 mb-4 ml-4">各方向外边距</div>

<!-- 水平/垂直 -->
<div class="mx-4">水平外边距</div>
<div class="my-4">垂直外边距</div>

<!-- 负边距 -->
<div class="-mt-4">负上边距</div>
<div class="-mx-2">负水平边距</div>

<!-- 自动居中 -->
<div class="mx-auto">水平居中</div>
```

### Space Between (子元素间距)
```html
<!-- 水平间距 -->
<div class="flex space-x-4">
  <div>项目1</div>
  <div>项目2</div>
  <div>项目3</div>
</div>

<!-- 垂直间距 -->
<div class="flex flex-col space-y-4">
  <div>项目1</div>
  <div>项目2</div>
  <div>项目3</div>
</div>

<!-- 反向间距 -->
<div class="flex flex-row-reverse space-x-reverse space-x-4">
  <div>项目1</div>
  <div>项目2</div>
</div>
```

---

## 尺寸

### Width (宽度)
```html
<!-- 固定宽度 -->
<div class="w-0">width: 0px</div>
<div class="w-px">width: 1px</div>
<div class="w-0.5">width: 0.125rem</div>
<div class="w-1">width: 0.25rem</div>
<div class="w-64">width: 16rem</div>

<!-- 分数宽度 -->
<div class="w-1/2">width: 50%</div>
<div class="w-1/3">width: 33.333333%</div>
<div class="w-2/3">width: 66.666667%</div>
<div class="w-1/4">width: 25%</div>
<div class="w-3/4">width: 75%</div>
<div class="w-1/5">width: 20%</div>

<!-- 特殊宽度 -->
<div class="w-full">width: 100%</div>
<div class="w-screen">width: 100vw</div>
<div class="w-min">width: min-content</div>
<div class="w-max">width: max-content</div>
<div class="w-fit">width: fit-content</div>
<div class="w-auto">width: auto</div>
```

### Height (高度)
```html
<!-- 固定高度 -->
<div class="h-0">height: 0px</div>
<div class="h-64">height: 16rem</div>

<!-- 分数高度 -->
<div class="h-1/2">height: 50%</div>
<div class="h-full">height: 100%</div>
<div class="h-screen">height: 100vh</div>

<!-- 最小/最大高度 -->
<div class="min-h-0">min-height: 0px</div>
<div class="min-h-full">min-height: 100%</div>
<div class="min-h-screen">min-height: 100vh</div>
<div class="max-h-full">max-height: 100%</div>
<div class="max-h-screen">max-height: 100vh</div>
```

### Max/Min Width
```html
<div class="max-w-xs">max-width: 20rem (320px)</div>
<div class="max-w-sm">max-width: 24rem (384px)</div>
<div class="max-w-md">max-width: 28rem (448px)</div>
<div class="max-w-lg">max-width: 32rem (512px)</div>
<div class="max-w-xl">max-width: 36rem (576px)</div>
<div class="max-w-2xl">max-width: 42rem (672px)</div>
<div class="max-w-3xl">max-width: 48rem (768px)</div>
<div class="max-w-4xl">max-width: 56rem (896px)</div>
<div class="max-w-5xl">max-width: 64rem (1024px)</div>
<div class="max-w-6xl">max-width: 72rem (1152px)</div>
<div class="max-w-7xl">max-width: 80rem (1280px)</div>
<div class="max-w-full">max-width: 100%</div>
<div class="max-w-screen-sm">max-width: 640px</div>
<div class="max-w-screen-md">max-width: 768px</div>
<div class="max-w-screen-lg">max-width: 1024px</div>
<div class="max-w-screen-xl">max-width: 1280px</div>
<div class="max-w-screen-2xl">max-width: 1536px</div>
```

---

## 颜色系统

Tailwind 提供了一套完整的颜色系统，每种颜色有从 50 到 900 的不同深度。

### 基础颜色
- `slate`: 石板灰
- `gray`: 灰色
- `zinc`: 锌灰
- `neutral`: 中性灰
- `stone`: 石头灰
- `red`: 红色
- `orange`: 橙色
- `amber`: 琥珀色
- `yellow`: 黄色
- `lime`: 青柠色
- `green`: 绿色
- `emerald`: 祖母绿
- `teal`: 蓝绿色
- `cyan`: 青色
- `sky`: 天蓝色
- `blue`: 蓝色
- `indigo`: 靛蓝色
- `violet`: 紫罗兰
- `purple`: 紫色
- `fuchsia`: 紫红色
- `pink`: 粉色
- `rose`: 玫瑰色

### 文本颜色
```html
<p class="text-red-500">红色文本</p>
<p class="text-blue-600">蓝色文本</p>
<p class="text-gray-900">深灰文本</p>
<p class="text-white">白色文本</p>
<p class="text-black">黑色文本</p>
<p class="text-transparent">透明文本</p>
<p class="text-current">继承当前颜色</p>

<!-- 透明度修饰符 -->
<p class="text-blue-500/50">50% 透明度蓝色</p>
<p class="text-blue-500/75">75% 透明度蓝色</p>
<p class="text-blue-500/100">100% 透明度蓝色</p>
```

### 背景颜色
```html
<div class="bg-red-500">红色背景</div>
<div class="bg-blue-600">蓝色背景</div>
<div class="bg-gray-100">浅灰背景</div>
<div class="bg-white">白色背景</div>
<div class="bg-transparent">透明背景</div>

<!-- 带透明度 -->
<div class="bg-blue-500/50">50% 透明度蓝色背景</div>
```

### 边框颜色
```html
<div class="border border-red-500">红色边框</div>
<div class="border-t-2 border-blue-500">蓝色上边框</div>
```

### 渐变色
```html
<div class="bg-gradient-to-r from-cyan-500 to-blue-500">
  从青色到蓝色的渐变
</div>

<div class="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500">
  三色渐变
</div>

<!-- 渐变方向 -->
bg-gradient-to-t    <!-- 向上 -->
bg-gradient-to-tr   <!-- 向右上 -->
bg-gradient-to-r    <!-- 向右 -->
bg-gradient-to-br   <!-- 向右下 -->
bg-gradient-to-b    <!-- 向下 -->
bg-gradient-to-bl   <!-- 向左下 -->
bg-gradient-to-l    <!-- 向左 -->
bg-gradient-to-tl   <!-- 向左上 -->
```

---

## 排版

### 字体系列
```html
<p class="font-sans">无衬线字体</p>
<p class="font-serif">衬线字体</p>
<p class="font-mono">等宽字体</p>
```

### 字体大小
```html
<p class="text-xs">0.75rem (12px)</p>
<p class="text-sm">0.875rem (14px)</p>
<p class="text-base">1rem (16px)</p>
<p class="text-lg">1.125rem (18px)</p>
<p class="text-xl">1.25rem (20px)</p>
<p class="text-2xl">1.5rem (24px)</p>
<p class="text-3xl">1.875rem (30px)</p>
<p class="text-4xl">2.25rem (36px)</p>
<p class="text-5xl">3rem (48px)</p>
<p class="text-6xl">3.75rem (60px)</p>
<p class="text-7xl">4.5rem (72px)</p>
<p class="text-8xl">6rem (96px)</p>
<p class="text-9xl">8rem (128px)</p>
```

### 字重
```html
<p class="font-thin">font-weight: 100</p>
<p class="font-extralight">font-weight: 200</p>
<p class="font-light">font-weight: 300</p>
<p class="font-normal">font-weight: 400</p>
<p class="font-medium">font-weight: 500</p>
<p class="font-semibold">font-weight: 600</p>
<p class="font-bold">font-weight: 700</p>
<p class="font-extrabold">font-weight: 800</p>
<p class="font-black">font-weight: 900</p>
```

### 文本对齐
```html
<p class="text-left">左对齐</p>
<p class="text-center">居中对齐</p>
<p class="text-right">右对齐</p>
<p class="text-justify">两端对齐</p>
<p class="text-start">起始对齐</p>
<p class="text-end">结束对齐</p>
```

### 行高
```html
<p class="leading-none">line-height: 1</p>
<p class="leading-tight">line-height: 1.25</p>
<p class="leading-snug">line-height: 1.375</p>
<p class="leading-normal">line-height: 1.5</p>
<p class="leading-relaxed">line-height: 1.625</p>
<p class="leading-loose">line-height: 2</p>
<p class="leading-3">line-height: .75rem</p>
<p class="leading-10">line-height: 2.5rem</p>
```

### 字母间距
```html
<p class="tracking-tighter">letter-spacing: -0.05em</p>
<p class="tracking-tight">letter-spacing: -0.025em</p>
<p class="tracking-normal">letter-spacing: 0em</p>
<p class="tracking-wide">letter-spacing: 0.025em</p>
<p class="tracking-wider">letter-spacing: 0.05em</p>
<p class="tracking-widest">letter-spacing: 0.1em</p>
```

### 文本装饰
```html
<p class="underline">下划线</p>
<p class="overline">上划线</p>
<p class="line-through">删除线</p>
<p class="no-underline">无装饰线</p>

<!-- 装饰线样式 -->
<p class="underline decoration-solid">实线</p>
<p class="underline decoration-double">双线</p>
<p class="underline decoration-dotted">点线</p>
<p class="underline decoration-dashed">虚线</p>
<p class="underline decoration-wavy">波浪线</p>

<!-- 装饰线粗细 -->
<p class="underline decoration-1">1px</p>
<p class="underline decoration-2">2px</p>
<p class="underline decoration-4">4px</p>

<!-- 装饰线颜色 -->
<p class="underline decoration-red-500">红色下划线</p>
```

### 文本转换
```html
<p class="uppercase">大写</p>
<p class="lowercase">小写</p>
<p class="capitalize">首字母大写</p>
<p class="normal-case">正常</p>
```

### 文本溢出
```html
<p class="truncate">文本截断，显示省略号</p>
<p class="text-ellipsis overflow-hidden">省略号</p>
<p class="text-clip overflow-hidden">裁剪</p>

<!-- 多行截断 -->
<p class="line-clamp-1">单行截断</p>
<p class="line-clamp-2">两行截断</p>
<p class="line-clamp-3">三行截断</p>
<p class="line-clamp-none">取消截断</p>
```

### 文本缩进
```html
<p class="indent-0">无缩进</p>
<p class="indent-4">缩进 1rem</p>
<p class="indent-8">缩进 2rem</p>
```

---

## 边框与圆角

### 边框宽度
```html
<div class="border">border-width: 1px (所有边)</div>
<div class="border-0">border-width: 0px</div>
<div class="border-2">border-width: 2px</div>
<div class="border-4">border-width: 4px</div>
<div class="border-8">border-width: 8px</div>

<!-- 单边边框 -->
<div class="border-t">上边框</div>
<div class="border-r">右边框</div>
<div class="border-b">下边框</div>
<div class="border-l">左边框</div>

<!-- 水平/垂直 -->
<div class="border-x">水平边框</div>
<div class="border-y">垂直边框</div>
```

### 边框样式
```html
<div class="border border-solid">实线边框</div>
<div class="border border-dashed">虚线边框</div>
<div class="border border-dotted">点线边框</div>
<div class="border border-double">双线边框</div>
<div class="border-none">无边框</div>
```

### 圆角
```html
<!-- 所有角 -->
<div class="rounded-none">border-radius: 0px</div>
<div class="rounded-sm">border-radius: 0.125rem</div>
<div class="rounded">border-radius: 0.25rem</div>
<div class="rounded-md">border-radius: 0.375rem</div>
<div class="rounded-lg">border-radius: 0.5rem</div>
<div class="rounded-xl">border-radius: 0.75rem</div>
<div class="rounded-2xl">border-radius: 1rem</div>
<div class="rounded-3xl">border-radius: 1.5rem</div>
<div class="rounded-full">border-radius: 9999px (圆形)</div>

<!-- 单个角 -->
<div class="rounded-tl-lg">左上角</div>
<div class="rounded-tr-lg">右上角</div>
<div class="rounded-br-lg">右下角</div>
<div class="rounded-bl-lg">左下角</div>

<!-- 边 -->
<div class="rounded-t-lg">上边</div>
<div class="rounded-r-lg">右边</div>
<div class="rounded-b-lg">下边</div>
<div class="rounded-l-lg">左边</div>
```

### 轮廓
```html
<button class="outline outline-2 outline-blue-500">轮廓样式</button>
<button class="outline-dashed">虚线轮廓</button>
<button class="outline-offset-2">轮廓偏移</button>
```

### 分割线
```html
<div class="divide-y divide-gray-200">
  <div>项目1</div>
  <div>项目2</div>
  <div>项目3</div>
</div>

<div class="divide-x divide-blue-500">
  <span>A</span>
  <span>B</span>
  <span>C</span>
</div>
```

---

## 效果与滤镜

### 阴影
```html
<div class="shadow-sm">小阴影</div>
<div class="shadow">默认阴影</div>
<div class="shadow-md">中等阴影</div>
<div class="shadow-lg">大阴影</div>
<div class="shadow-xl">超大阴影</div>
<div class="shadow-2xl">特大阴影</div>
<div class="shadow-inner">内阴影</div>
<div class="shadow-none">无阴影</div>

<!-- 自定义阴影颜色 -->
<div class="shadow-lg shadow-blue-500/50">蓝色阴影</div>
```

### 透明度
```html
<div class="opacity-0">完全透明</div>
<div class="opacity-25">25% 不透明</div>
<div class="opacity-50">50% 不透明</div>
<div class="opacity-75">75% 不透明</div>
<div class="opacity-100">完全不透明</div>
```

### 混合模式
```html
<div class="mix-blend-normal">正常</div>
<div class="mix-blend-multiply">正片叠底</div>
<div class="mix-blend-screen">滤色</div>
<div class="mix-blend-overlay">叠加</div>
<div class="mix-blend-darken">变暗</div>
<div class="mix-blend-lighten">变亮</div>
<div class="mix-blend-difference">差值</div>

<div class="bg-blend-multiply">背景混合模式</div>
```

### 滤镜
```html
<!-- 模糊 -->
<div class="blur-none">blur(0)</div>
<div class="blur-sm">blur(4px)</div>
<div class="blur">blur(8px)</div>
<div class="blur-md">blur(12px)</div>
<div class="blur-lg">blur(16px)</div>
<div class="blur-xl">blur(24px)</div>

<!-- 亮度 -->
<div class="brightness-0">brightness(0)</div>
<div class="brightness-50">brightness(.5)</div>
<div class="brightness-100">brightness(1)</div>
<div class="brightness-150">brightness(1.5)</div>

<!-- 对比度 -->
<div class="contrast-0">contrast(0)</div>
<div class="contrast-50">contrast(.5)</div>
<div class="contrast-100">contrast(1)</div>

<!-- 灰度 -->
<div class="grayscale-0">grayscale(0)</div>
<div class="grayscale">grayscale(100%)</div>

<!-- 色相旋转 -->
<div class="hue-rotate-0">hue-rotate(0deg)</div>
<div class="hue-rotate-15">hue-rotate(15deg)</div>
<div class="hue-rotate-90">hue-rotate(90deg)</div>

<!-- 反转 -->
<div class="invert-0">invert(0)</div>
<div class="invert">invert(100%)</div>

<!-- 饱和度 -->
<div class="saturate-0">saturate(0)</div>
<div class="saturate-50">saturate(.5)</div>
<div class="saturate-100">saturate(1)</div>

<!-- 褐色 -->
<div class="sepia-0">sepia(0)</div>
<div class="sepia">sepia(100%)</div>

<!-- 背景模糊 -->
<div class="backdrop-blur-sm">backdrop-filter: blur(4px)</div>
<div class="backdrop-brightness-50">backdrop-filter: brightness(.5)</div>
```

---

## Flexbox

### 容器属性
```html
<!-- 启用 flex -->
<div class="flex">display: flex</div>
<div class="inline-flex">display: inline-flex</div>

<!-- 方向 -->
<div class="flex-row">从左到右（默认）</div>
<div class="flex-row-reverse">从右到左</div>
<div class="flex-col">从上到下</div>
<div class="flex-col-reverse">从下到上</div>

<!-- 换行 -->
<div class="flex-wrap">允许换行</div>
<div class="flex-wrap-reverse">反向换行</div>
<div class="flex-nowrap">不换行（默认）</div>

<!-- 主轴对齐 (justify-content) -->
<div class="justify-start">起始对齐（默认）</div>
<div class="justify-end">结束对齐</div>
<div class="justify-center">居中对齐</div>
<div class="justify-between">两端对齐</div>
<div class="justify-around">环绕对齐</div>
<div class="justify-evenly">均匀对齐</div>

<!-- 交叉轴对齐 (align-items) -->
<div class="items-start">起始对齐</div>
<div class="items-end">结束对齐</div>
<div class="items-center">居中对齐</div>
<div class="items-baseline">基线对齐</div>
<div class="items-stretch">拉伸对齐（默认）</div>

<!-- 多行对齐 (align-content) -->
<div class="content-start">起始对齐</div>
<div class="content-end">结束对齐</div>
<div class="content-center">居中对齐</div>
<div class="content-between">两端对齐</div>
<div class="content-around">环绕对齐</div>
<div class="content-evenly">均匀对齐</div>
```

### 项目属性
```html
<!-- 弹性增长 (flex-grow) -->
<div class="flex-1">flex: 1 1 0%</div>
<div class="flex-auto">flex: 1 1 auto</div>
<div class="flex-initial">flex: 0 1 auto（默认）</div>
<div class="flex-none">flex: none</div>

<!-- 弹性收缩 (flex-shrink) -->
<div class="shrink">flex-shrink: 1（默认）</div>
<div class="shrink-0">flex-shrink: 0</div>

<!-- 弹性增长 (flex-grow) -->
<div class="grow">flex-grow: 1</div>
<div class="grow-0">flex-grow: 0（默认）</div>

<!-- 基准大小 (flex-basis) -->
<div class="basis-0">flex-basis: 0</div>
<div class="basis-auto">flex-basis: auto</div>
<div class="basis-1/2">flex-basis: 50%</div>
<div class="basis-full">flex-basis: 100%</div>

<!-- 单个项目对齐 (align-self) -->
<div class="self-auto">align-self: auto（默认）</div>
<div class="self-start">align-self: flex-start</div>
<div class="self-end">align-self: flex-end</div>
<div class="self-center">align-self: center</div>
<div class="self-stretch">align-self: stretch</div>

<!-- 顺序 -->
<div class="order-1">order: 1</div>
<div class="order-2">order: 2</div>
<div class="order-first">order: -9999</div>
<div class="order-last">order: 9999</div>
<div class="order-none">order: 0</div>
```

### Flex 常见布局示例
```html
<!-- 水平居中 -->
<div class="flex justify-center">
  <div>居中内容</div>
</div>

<!-- 垂直居中 -->
<div class="flex items-center">
  <div>居中内容</div>
</div>

<!-- 水平垂直居中 -->
<div class="flex justify-center items-center h-screen">
  <div>完全居中</div>
</div>

<!-- 两端对齐 -->
<div class="flex justify-between">
  <div>左侧</div>
  <div>右侧</div>
</div>

<!-- 等间距布局 -->
<div class="flex gap-4">
  <div>项目1</div>
  <div>项目2</div>
  <div>项目3</div>
</div>

<!-- 响应式 flex -->
<div class="flex flex-col md:flex-row">
  <div>移动端垂直，桌面端水平</div>
</div>
```

---

## Grid

### 容器属性
```html
<!-- 启用 grid -->
<div class="grid">display: grid</div>
<div class="inline-grid">display: inline-grid</div>

<!-- 列数 (grid-template-columns) -->
<div class="grid-cols-1">1列</div>
<div class="grid-cols-2">2列</div>
<div class="grid-cols-3">3列</div>
<div class="grid-cols-4">4列</div>
<div class="grid-cols-5">5列</div>
<div class="grid-cols-6">6列</div>
<div class="grid-cols-12">12列</div>
<div class="grid-cols-none">grid-template-columns: none</div>

<!-- 行数 (grid-template-rows) -->
<div class="grid-rows-1">1行</div>
<div class="grid-rows-2">2行</div>
<div class="grid-rows-3">3行</div>
<div class="grid-rows-6">6行</div>

<!-- 列间距 -->
<div class="gap-0">gap: 0px</div>
<div class="gap-4">gap: 1rem</div>
<div class="gap-x-4">column-gap: 1rem</div>
<div class="gap-y-4">row-gap: 1rem</div>

<!-- 自动列 (grid-auto-columns) -->
<div class="auto-cols-auto">grid-auto-columns: auto</div>
<div class="auto-cols-min">grid-auto-columns: min-content</div>
<div class="auto-cols-max">grid-auto-columns: max-content</div>
<div class="auto-cols-fr">grid-auto-columns: minmax(0, 1fr)</div>

<!-- 自动行 (grid-auto-rows) -->
<div class="auto-rows-auto">grid-auto-rows: auto</div>
<div class="auto-rows-min">grid-auto-rows: min-content</div>
<div class="auto-rows-max">grid-auto-rows: max-content</div>
<div class="auto-rows-fr">grid-auto-rows: minmax(0, 1fr)</div>

<!-- 自动流向 (grid-auto-flow) -->
<div class="grid-flow-row">按行填充（默认）</div>
<div class="grid-flow-col">按列填充</div>
<div class="grid-flow-dense">密集填充</div>
<div class="grid-flow-row-dense">按行密集填充</div>
<div class="grid-flow-col-dense">按列密集填充</div>
```

### 项目属性
```html
<!-- 列跨度 (grid-column) -->
<div class="col-auto">grid-column: auto</div>
<div class="col-span-1">grid-column: span 1 / span 1</div>
<div class="col-span-2">grid-column: span 2 / span 2</div>
<div class="col-span-6">grid-column: span 6 / span 6</div>
<div class="col-span-full">grid-column: 1 / -1</div>

<!-- 列起始 -->
<div class="col-start-1">grid-column-start: 1</div>
<div class="col-start-2">grid-column-start: 2</div>
<div class="col-start-auto">grid-column-start: auto</div>

<!-- 列结束 -->
<div class="col-end-1">grid-column-end: 1</div>
<div class="col-end-7">grid-column-end: 7</div>
<div class="col-end-auto">grid-column-end: auto</div>

<!-- 行跨度 (grid-row) -->
<div class="row-auto">grid-row: auto</div>
<div class="row-span-1">grid-row: span 1 / span 1</div>
<div class="row-span-2">grid-row: span 2 / span 2</div>
<div class="row-span-full">grid-row: 1 / -1</div>

<!-- 行起始 -->
<div class="row-start-1">grid-row-start: 1</div>
<div class="row-start-auto">grid-row-start: auto</div>

<!-- 行结束 -->
<div class="row-end-1">grid-row-end: 1</div>
<div class="row-end-auto">grid-row-end: auto</div>

<!-- 对齐 -->
<div class="justify-items-start">justify-items: start</div>
<div class="justify-items-center">justify-items: center</div>
<div class="justify-self-start">justify-self: start</div>
<div class="justify-self-center">justify-self: center</div>
<div class="place-items-center">place-items: center</div>
<div class="place-self-center">place-self: center</div>
```

### Grid 常见布局示例
```html
<!-- 等宽三列 -->
<div class="grid grid-cols-3 gap-4">
  <div>列1</div>
  <div>列2</div>
  <div>列3</div>
</div>

<!-- 响应式网格 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>项目1</div>
  <div>项目2</div>
  <div>项目3</div>
</div>

<!-- 项目跨多列 -->
<div class="grid grid-cols-3 gap-4">
  <div class="col-span-2">跨2列</div>
  <div>1列</div>
  <div>1列</div>
  <div class="col-span-2">跨2列</div>
</div>

<!-- 12列网格系统 -->
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-8">主内容区</div>
  <div class="col-span-4">侧边栏</div>
</div>

<!-- 自动填充 -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
  <div>自动适应</div>
  <div>自动适应</div>
  <div>自动适应</div>
</div>
```

---

## 响应式设计

Tailwind 使用移动优先的断点系统。

### 断点
```
sm:  640px  @media (min-width: 640px)
md:  768px  @media (min-width: 768px)
lg:  1024px @media (min-width: 1024px)
xl:  1280px @media (min-width: 1280px)
2xl: 1536px @media (min-width: 1536px)
```

### 使用方式
```html
<!-- 默认移动端样式，从 md 开始应用不同样式 -->
<div class="text-sm md:text-base lg:text-lg xl:text-xl">
  响应式文本
</div>

<!-- 响应式布局 -->
<div class="flex flex-col md:flex-row">
  <div class="w-full md:w-1/2">左侧</div>
  <div class="w-full md:w-1/2">右侧</div>
</div>

<!-- 响应式显示/隐藏 -->
<div class="hidden md:block">桌面端显示</div>
<div class="block md:hidden">移动端显示</div>

<!-- 响应式间距 -->
<div class="p-4 md:p-6 lg:p-8">
  响应式内边距
</div>

<!-- 响应式网格 -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <div>项目</div>
  <div>项目</div>
  <div>项目</div>
  <div>项目</div>
</div>
```

### 容器
```html
<!-- 响应式容器 -->
<div class="container mx-auto">
  自动适应断点的容器
</div>

<!-- 容器在各断点的宽度 -->
默认: width: 100%
sm:   max-width: 640px
md:   max-width: 768px
lg:   max-width: 1024px
xl:   max-width: 1280px
2xl:  max-width: 1536px
```

---

## 伪类与伪元素

### 交互状态
```html
<!-- hover -->
<button class="bg-blue-500 hover:bg-blue-700">悬停变色</button>

<!-- focus -->
<input class="border focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />

<!-- active -->
<button class="bg-blue-500 active:bg-blue-800">按下时变色</button>

<!-- disabled -->
<button class="bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed" disabled>
  禁用状态
</button>

<!-- visited -->
<a href="#" class="text-blue-500 visited:text-purple-600">访问过的链接</a>

<!-- focus-within -->
<div class="border focus-within:border-blue-500">
  <input type="text" />
</div>

<!-- focus-visible -->
<button class="focus-visible:ring-2 focus-visible:ring-blue-500">
  键盘焦点可见
</button>
```

### 表单状态
```html
<!-- required -->
<input class="border required:border-red-500" required />

<!-- invalid -->
<input class="border invalid:border-red-500" type="email" />

<!-- valid -->
<input class="border valid:border-green-500" type="email" />

<!-- placeholder -->
<input class="placeholder:text-gray-400" placeholder="请输入..." />

<!-- checked -->
<input type="checkbox" class="checked:bg-blue-500" />

<!-- indeterminate -->
<input type="checkbox" class="indeterminate:bg-gray-500" />

<!-- read-only -->
<input class="read-only:bg-gray-100" readonly value="只读" />
```

### 位置伪类
```html
<!-- first -->
<ul>
  <li class="first:font-bold">第一项加粗</li>
  <li>第二项</li>
</ul>

<!-- last -->
<ul>
  <li>第一项</li>
  <li class="last:font-bold">最后一项加粗</li>
</ul>

<!-- odd -->
<ul>
  <li class="odd:bg-gray-100">项目1</li>
  <li class="odd:bg-gray-100">项目2</li>
  <li class="odd:bg-gray-100">项目3</li>
</ul>

<!-- even -->
<ul>
  <li class="even:bg-blue-100">项目1</li>
  <li class="even:bg-blue-100">项目2</li>
  <li class="even:bg-blue-100">项目3</li>
</ul>

<!-- only -->
<div>
  <p class="only:text-center">唯一子元素时居中</p>
</div>

<!-- first-of-type, last-of-type -->
<div>
  <p class="first-of-type:font-bold">第一个 p 元素</p>
  <span>其他元素</span>
  <p class="last-of-type:italic">最后一个 p 元素</p>
</div>
```

### 伪元素
```html
<!-- before -->
<div class="before:content-['★'] before:mr-2">
  前面有星号
</div>

<!-- after -->
<div class="after:content-['→'] after:ml-2">
  后面有箭头
</div>

<!-- first-letter -->
<p class="first-letter:text-4xl first-letter:font-bold first-letter:text-red-500">
  首字母特殊样式
</p>

<!-- first-line -->
<p class="first-line:font-bold first-line:text-blue-500">
  第一行特殊样式
</p>

<!-- selection -->
<p class="selection:bg-yellow-200 selection:text-black">
  选中文本时的样式
</p>

<!-- marker (列表标记) -->
<ul>
  <li class="marker:text-red-500">红色标记</li>
  <li class="marker:text-blue-500">蓝色标记</li>
</ul>
```

### 分组与兄弟
```html
<!-- group -->
<div class="group">
  <img class="group-hover:scale-110" src="image.jpg" />
  <p class="group-hover:text-blue-500">悬停卡片时改变</p>
</div>

<!-- peer -->
<div>
  <input type="checkbox" class="peer" id="check" />
  <label for="check" class="peer-checked:text-blue-500">
    选中时变蓝
  </label>
</div>
```

---

## 动画与过渡

### 过渡
```html
<!-- 过渡属性 -->
<div class="transition">transition: all</div>
<div class="transition-none">无过渡</div>
<div class="transition-all">过渡所有属性</div>
<div class="transition-colors">过渡颜色</div>
<div class="transition-opacity">过渡透明度</div>
<div class="transition-shadow">过渡阴影</div>
<div class="transition-transform">过渡变换</div>

<!-- 过渡时长 -->
<div class="duration-75">75ms</div>
<div class="duration-100">100ms</div>
<div class="duration-150">150ms</div>
<div class="duration-200">200ms</div>
<div class="duration-300">300ms</div>
<div class="duration-500">500ms</div>
<div class="duration-700">700ms</div>
<div class="duration-1000">1000ms</div>

<!-- 缓动函数 -->
<div class="ease-linear">linear</div>
<div class="ease-in">ease-in</div>
<div class="ease-out">ease-out</div>
<div class="ease-in-out">ease-in-out</div>

<!-- 延迟 -->
<div class="delay-75">75ms</div>
<div class="delay-100">100ms</div>
<div class="delay-150">150ms</div>
<div class="delay-200">200ms</div>

<!-- 实用示例 -->
<button class="bg-blue-500 hover:bg-blue-700 transition-colors duration-300">
  颜色过渡按钮
</button>

<div class="transform hover:scale-110 transition-transform duration-200">
  悬停放大
</div>
```

### 动画
```html
<!-- 预设动画 -->
<div class="animate-none">无动画</div>
<div class="animate-spin">旋转动画（loading）</div>
<div class="animate-ping">脉冲动画</div>
<div class="animate-pulse">呼吸动画</div>
<div class="animate-bounce">弹跳动画</div>

<!-- 实用示例 -->
<div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent">
  加载中...
</div>

<span class="relative inline-flex">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
  <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
</span>
```

### 变换 (Transform)
```html
<!-- scale -->
<div class="scale-0">transform: scale(0)</div>
<div class="scale-50">transform: scale(.5)</div>
<div class="scale-75">transform: scale(.75)</div>
<div class="scale-90">transform: scale(.9)</div>
<div class="scale-95">transform: scale(.95)</div>
<div class="scale-100">transform: scale(1)</div>
<div class="scale-105">transform: scale(1.05)</div>
<div class="scale-110">transform: scale(1.1)</div>
<div class="scale-125">transform: scale(1.25)</div>
<div class="scale-150">transform: scale(1.5)</div>

<!-- rotate -->
<div class="rotate-0">transform: rotate(0deg)</div>
<div class="rotate-1">transform: rotate(1deg)</div>
<div class="rotate-45">transform: rotate(45deg)</div>
<div class="rotate-90">transform: rotate(90deg)</div>
<div class="rotate-180">transform: rotate(180deg)</div>
<div class="-rotate-45">transform: rotate(-45deg)</div>

<!-- translate -->
<div class="translate-x-0">translateX(0)</div>
<div class="translate-x-4">translateX(1rem)</div>
<div class="translate-y-4">translateY(1rem)</div>
<div class="-translate-x-4">translateX(-1rem)</div>
<div class="translate-x-1/2">translateX(50%)</div>

<!-- skew -->
<div class="skew-x-0">skewX(0deg)</div>
<div class="skew-x-3">skewX(3deg)</div>
<div class="skew-y-3">skewY(3deg)</div>
<div class="-skew-x-12">skewX(-12deg)</div>

<!-- transform origin -->
<div class="origin-center">transform-origin: center</div>
<div class="origin-top">transform-origin: top</div>
<div class="origin-top-right">transform-origin: top right</div>
<div class="origin-right">transform-origin: right</div>
<div class="origin-bottom-right">transform-origin: bottom right</div>
<div class="origin-bottom">transform-origin: bottom</div>
<div class="origin-bottom-left">transform-origin: bottom left</div>
<div class="origin-left">transform-origin: left</div>
<div class="origin-top-left">transform-origin: top left</div>

<!-- 组合变换 -->
<div class="transform hover:scale-110 hover:rotate-3 transition-transform">
  悬停时放大并旋转
</div>
```

---

## 自定义配置

### tailwind.config.js 完整示例

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  // 内容路径
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue}",
    "./pages/**/*.{html,js,jsx,ts,tsx,vue}",
    "./components/**/*.{html,js,jsx,ts,tsx,vue}",
    "./app/**/*.{html,js,jsx,ts,tsx,vue}",
  ],

  // 暗黑模式
  darkMode: 'class', // 或 'media'

  // 主题配置
  theme: {
    // 完全替换默认值
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },

    // 扩展默认值
    extend: {
      // 自定义颜色
      colors: {
        'brand-blue': '#1DA1F2',
        'brand-gray': '#657786',
        'custom': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },

      // 自定义间距
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },

      // 自定义字体
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
        'mono': ['Menlo', 'monospace'],
        'custom': ['MyFont', 'sans-serif'],
      },

      // 自定义字体大小
      fontSize: {
        'xxs': '0.625rem',
        '10xl': '10rem',
      },

      // 自定义断点
      screens: {
        '3xl': '1920px',
        'tall': { 'raw': '(min-height: 800px)' },
      },

      // 自定义边框圆角
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '4xl': '2rem',
      },

      // 自定义阴影
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'custom-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },

      // 自定义动画
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },

      // 自定义关键帧
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      // 自定义 z-index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },

  // 插件
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],

  // 禁用某些功能类
  corePlugins: {
    // float: false,
  },

  // 前缀
  // prefix: 'tw-',

  // 重要性
  // important: true,

  // 分隔符
  // separator: ':',
}
```

### 添加自定义工具类

在 CSS 文件中：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-4xl font-bold;
  }
  h2 {
    @apply text-3xl font-semibold;
  }
  a {
    @apply text-blue-600 hover:text-blue-800;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 rounded font-semibold transition-colors;
  }
  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-700;
  }
  .btn-secondary {
    @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
  }
  .card {
    @apply p-6 rounded-lg shadow-md bg-white;
  }
}

@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

---

## 最佳实践

### 1. 组件化开发

将重复的类组合提取为组件：

```html
<!-- ❌ 不好的做法 -->
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">按钮1</button>
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">按钮2</button>

<!-- ✅ 好的做法：提取为组件 -->
<!-- Button.jsx -->
<button className="btn-primary">{children}</button>

<!-- 或使用 @apply -->
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700;
}
```

### 2. 响应式优先

始终从移动端开始设计：

```html
<!-- ✅ 移动优先 -->
<div class="text-sm md:text-base lg:text-lg">
  响应式文本
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
  网格布局
</div>
```

### 3. 使用配置文件统一设计系统

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
}
```

### 4. 使用 @layer 指令

```css
@layer components {
  .custom-input {
    @apply border rounded px-3 py-2 focus:outline-none focus:ring-2;
  }
}
```

### 5. 避免过度使用 @apply

```html
<!-- ❌ 过度使用 @apply -->
.my-component {
  @apply w-full h-full bg-blue-500 text-white p-4 rounded shadow-lg;
}

<!-- ✅ 直接使用工具类或真正的 CSS -->
<div class="w-full h-full bg-blue-500 text-white p-4 rounded shadow-lg">
  <!-- 简单情况直接用类 -->
</div>

.my-component {
  /* 复杂样式用原生 CSS */
  background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
}
```

### 6. 优化生产构建

```bash
# 确保配置了正确的 content 路径
# tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
}

# 使用 PostCSS 压缩
npm install -D cssnano
```

### 7. 使用编辑器插件

- **Tailwind CSS IntelliSense**: VS Code 官方插件，提供自动补全、语法高亮、linting
- 配置 `.vscode/settings.json`:

```json
{
  "tailwindCSS.experimental.classRegex": [
    ["class:\\s*?[\"'`]([^\"'`]*).*?[\"'`]", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### 8. 暗黑模式

```html
<!-- 配置 -->
// tailwind.config.js
module.exports = {
  darkMode: 'class', // 或 'media'
}

<!-- 使用 -->
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  支持暗黑模式
</div>

<!-- 切换暗黑模式 -->
<script>
  // 添加或移除 'dark' 类到 html 元素
  document.documentElement.classList.toggle('dark')
</script>
```

### 9. 常用模式

```html
<!-- 居中容器 -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  内容
</div>

<!-- 卡片 -->
<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  卡片内容
</div>

<!-- 按钮组 -->
<div class="flex gap-2">
  <button class="btn-primary">主要</button>
  <button class="btn-secondary">次要</button>
</div>

<!-- 响应式导航 -->
<nav class="flex flex-col md:flex-row gap-4">
  <a href="#">链接1</a>
  <a href="#">链接2</a>
</nav>

<!-- 栅格布局 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>项目1</div>
  <div>项目2</div>
  <div>项目3</div>
</div>

<!-- 固定定位 -->
<header class="fixed top-0 left-0 right-0 z-50 bg-white shadow">
  头部
</header>

<!-- 粘性定位 -->
<div class="sticky top-0 z-10 bg-white">
  粘性头部
</div>

<!-- 覆盖层 -->
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white p-6 rounded-lg max-w-md">
    模态框内容
  </div>
</div>
```

### 10. 性能优化

```html
<!-- 使用 will-change 优化动画 -->
<div class="will-change-transform hover:scale-110">
  动画元素
</div>

<!-- 使用 contain 优化渲染 -->
<div class="contain-layout contain-paint">
  独立渲染区域
</div>
```

---

## 常用速查

### 布局
- `flex`, `grid`, `block`, `inline-block`, `hidden`
- `flex-row`, `flex-col`, `justify-center`, `items-center`
- `grid-cols-3`, `gap-4`

### 间距
- `p-4`, `px-4`, `py-4`, `pt-4`, `pr-4`, `pb-4`, `pl-4`
- `m-4`, `mx-auto`, `my-4`, `-mt-4`
- `space-x-4`, `space-y-4`

### 尺寸
- `w-full`, `w-1/2`, `w-screen`, `w-64`
- `h-full`, `h-screen`, `h-64`
- `max-w-md`, `min-h-screen`

### 颜色
- `text-blue-500`, `bg-red-500`, `border-gray-300`
- `text-blue-500/50` (带透明度)

### 排版
- `text-sm`, `text-base`, `text-lg`, `text-xl`
- `font-normal`, `font-bold`
- `text-center`, `text-left`, `text-right`
- `leading-normal`, `tracking-wide`

### 边框
- `border`, `border-2`, `border-t`, `rounded`, `rounded-lg`, `rounded-full`

### 效果
- `shadow-md`, `opacity-50`, `blur-sm`

### 响应式
- `md:flex`, `lg:grid-cols-4`, `xl:text-2xl`

### 伪类
- `hover:bg-blue-700`, `focus:ring-2`, `active:scale-95`
- `first:font-bold`, `last:border-0`, `odd:bg-gray-100`

### 过渡动画
- `transition`, `duration-300`, `ease-in-out`
- `animate-spin`, `animate-pulse`
- `hover:scale-110`, `hover:rotate-3`

---

## 资源链接

- **官方文档**: https://tailwindcss.com/docs
- **组件库**:
  - Tailwind UI: https://tailwindui.com
  - Headless UI: https://headlessui.com
  - daisyUI: https://daisyui.com
  - Flowbite: https://flowbite.com
- **工具**:
  - Tailwind CSS IntelliSense (VS Code 插件)
  - Tailwind Play: https://play.tailwindcss.com (在线编辑器)
  - Tailwind Cheat Sheet: https://nerdcave.com/tailwind-cheat-sheet

---

## 总结

Tailwind CSS 的核心优势：
1. **快速开发**: 无需离开 HTML 即可快速构建界面
2. **一致性**: 预定义的设计系统确保 UI 一致性
3. **响应式**: 内置响应式修饰符，轻松实现适配
4. **可定制**: 通过配置文件完全控制设计系统
5. **体积小**: 生产构建自动移除未使用的 CSS
6. **维护性**: 工具类命名直观，易于理解和维护

学习建议：
1. 从常用工具类开始（布局、间距、颜色）
2. 掌握 Flexbox 和 Grid 布局
3. 熟悉响应式设计模式
4. 学会使用配置文件自定义
5. 实践中逐步积累经验

**记住**：Tailwind 的理念是"约束带来自由"，通过有限的工具类组合，可以创造无限可能！
