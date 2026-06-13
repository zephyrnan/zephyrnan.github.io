---
title: React Server Components（RSC）学习笔记
date: 2026-06-13
categories:
  - 前端开发
tags:
  - React
  - RSC
  - Next.js
---

# React Server Components（RSC）学习笔记

## 1. RSC 是什么？

RSC，全称是 **React Server Components**，中文可以理解为 **React 服务端组件**。

它是 React 提供的一种新的组件模型：

> 有些组件可以只在服务器上运行，不会把对应的 JavaScript 代码发送到浏览器。

传统 React 组件通常会被打包成 JS，发送到浏览器运行；而 RSC 允许一部分组件只在服务端执行，最后把渲染结果传给客户端。

简单理解：

```txt
普通 React 组件：
组件代码 -> 打包成 JS -> 浏览器执行 -> 渲染页面

React Server Component：
组件代码 -> 服务端执行 -> 生成结果 -> 发送给浏览器显示
```

## 2. 为什么需要 RSC？

前端项目变大以后，经常会遇到几个问题：

1. 首屏 JS 包太大
2. 浏览器需要下载、解析、执行大量 JS
3. 数据请求逻辑分散在客户端
4. 有些代码其实没必要发给浏览器，比如数据库查询、文件读取、后端 SDK 调用

RSC 的核心目标是：

> 把不需要在浏览器运行的代码留在服务器，减少客户端负担。

## 3. RSC 解决了什么问题？

### 3.1 减少客户端 JavaScript 体积

如果一个组件是 Server Component，它的组件代码不会进入客户端 JS bundle。

例如：

```tsx
async function ArticleList() {
  const articles = await getArticles()

  return (
    <ul>
      {articles.map(article => (
        <li key={article.id}>{article.title}</li>
      ))}
    </ul>
  )
}
```

如果这个组件只负责查询数据并渲染列表，不需要点击事件、状态、浏览器 API，那么它就适合做 Server Component。

### 3.2 更接近后端的数据获取方式

在 RSC 中，可以直接在组件里写异步数据获取：

```tsx
export default async function Page() {
  const user = await getUser()

  return <div>{user.name}</div>
}
```

这和传统客户端组件不一样。

传统客户端组件常见写法：

```tsx
useEffect(() => {
  fetch('/api/user')
    .then(res => res.json())
    .then(data => setUser(data))
}, [])
```

RSC 可以让数据在服务端提前准备好，再把结果传给页面。

### 3.3 可以安全使用服务端能力

Server Component 可以访问服务端资源，例如：

- 数据库
- 文件系统
- 后端环境变量
- 私有 API key
- 服务端 SDK

例如：

```tsx
import { db } from '@/lib/db'

export default async function ProductPage() {
  const products = await db.product.findMany()

  return (
    <div>
      {products.map(product => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  )
}
```

这类代码不应该放到浏览器中执行，因为数据库连接和私钥都不能暴露给前端。

## 4. RSC 和 SSR 的区别

RSC 很容易和 SSR 混淆。

### 4.1 SSR 是什么？

SSR，全称是 **Server Side Rendering**，服务端渲染。

SSR 的重点是：

> 在服务端生成 HTML，让浏览器更快看到页面内容。

流程大致是：

```txt
用户访问页面 -> 服务端运行 React -> 生成 HTML -> 浏览器显示 HTML -> 浏览器下载 JS -> hydrate 激活交互
```

### 4.2 RSC 是什么？

RSC 的重点是：

> 让一部分 React 组件只在服务端运行，不发送组件 JS 到浏览器。

RSC 不只是生成 HTML，它改变的是组件的运行位置和打包方式。

### 4.3 对比总结

| 对比项 | SSR | RSC |
| --- | --- | --- |
| 核心目标 | 服务端生成 HTML | 组件只在服务端运行 |
| 是否减少客户端组件 JS | 不一定 | 是 |
| 是否需要 hydration | 通常需要 | Server Component 本身不需要 |
| 关注点 | 页面首屏渲染 | 组件运行位置和数据获取 |
| 常见场景 | 提升首屏和 SEO | 减少 JS、服务端数据查询 |

一句话区分：

> SSR 关注“HTML 在哪里生成”，RSC 关注“组件代码在哪里运行”。

## 5. Server Component 和 Client Component

在支持 RSC 的框架中，组件通常分为两类：

1. Server Component
2. Client Component

## 5.1 Server Component

Server Component 运行在服务器上。

特点：

- 默认不发送 JS 到浏览器
- 可以直接访问数据库、文件系统、服务端环境变量
- 可以使用 async/await 获取数据
- 不能使用浏览器事件
- 不能使用 useState、useEffect 等客户端 Hook
- 不能访问 window、document、localStorage

适合场景：

- 页面主体结构
- 数据列表展示
- 文章详情
- 商品详情
- 静态内容
- 服务端数据查询

示例：

```tsx
export default async function ArticlePage() {
  const article = await getArticle()

  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </article>
  )
}
```

## 5.2 Client Component

Client Component 会发送到浏览器运行。

在 Next.js App Router 中，需要在文件顶部写：

```tsx
'use client'
```

示例：

```tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}
```

特点：

- 可以使用 useState、useEffect
- 可以绑定点击事件、输入事件
- 可以访问 window、document、localStorage
- 会增加客户端 JS 体积

适合场景：

- 按钮点击
- 表单交互
- 弹窗
- Tabs 切换
- 下拉菜单
- 拖拽
- 富文本编辑器
- 依赖浏览器 API 的功能

## 6. `'use client'` 的作用

`'use client'` 用来声明一个文件是 Client Component 的入口。

```tsx
'use client'

export default function SearchBox() {
  return <input placeholder="搜索" />
}
```

注意：

> 一旦某个文件写了 `'use client'`，它导入的子组件也会进入客户端组件树。

所以不要随便在很大的组件顶部写 `'use client'`。

推荐做法：

```txt
页面整体：Server Component
局部交互：Client Component
```

例如：

```tsx
// app/page.tsx，Server Component
import SearchBox from './SearchBox'

export default async function Page() {
  const articles = await getArticles()

  return (
    <main>
      <SearchBox />
      <ArticleList articles={articles} />
    </main>
  )
}
```

```tsx
// app/SearchBox.tsx，Client Component
'use client'

import { useState } from 'react'

export default function SearchBox() {
  const [keyword, setKeyword] = useState('')

  return (
    <input
      value={keyword}
      onChange={e => setKeyword(e.target.value)}
    />
  )
}
```

## 7. RSC 中的数据传递规则

Server Component 可以把数据传给 Client Component。

```tsx
// Server Component
export default async function Page() {
  const user = await getUser()

  return <UserCard user={user} />
}
```

```tsx
'use client'

export default function UserCard({ user }) {
  return <div>{user.name}</div>
}
```

但是传递的数据必须是可以序列化的。

可以传：

- string、number、boolean、null、undefined
- 普通对象、数组
- Date、Map、Set、BigInt、Promise（React 的 RSC 序列化支持这些）
- 用 `'use server'` 标记的服务端函数（Server Actions）

不能传：

- 普通函数（未标记 `'use server'` 的函数无法序列化）
- class 实例（带方法/原型的对象）
- 数据库连接、文件句柄等服务端专属对象
- Symbol

错误理解：

```tsx
<ClientButton onClick={() => console.log('click')} />
```

如果 `onClick` 是从 Server Component 传给 Client Component 的普通函数，这通常是不允许的。

因为函数不能从服务器序列化传到浏览器。

## 8. Server Component 能不能导入 Client Component？

可以。

常见结构就是：

```txt
Server Component
  ├── Client Component
  └── Server Component
```

例如：

```tsx
// Server Component
import LikeButton from './LikeButton'

export default async function ArticlePage() {
  const article = await getArticle()

  return (
    <article>
      <h1>{article.title}</h1>
      <LikeButton articleId={article.id} />
    </article>
  )
}
```

`LikeButton` 负责交互，所以它是 Client Component。

## 9. Client Component 能不能导入 Server Component？

一般不应该直接导入。

因为 Client Component 会在浏览器运行，如果它直接导入 Server Component，就可能把服务端逻辑带到客户端边界里。

推荐方式是：

> 在 Server Component 中组合好结构，把 Client Component 放进去。

例如：

```tsx
// Server Component
export default function Page() {
  return (
    <ClientLayout>
      <ServerContent />
    </ClientLayout>
  )
}
```

这种方式是服务端先组合好 children，再把可交互部分交给客户端。

## 10. RSC 和 Server Actions

Server Actions 是另一种服务端能力，常和 RSC 一起出现。

Server Action 可以让表单或事件触发服务端函数。

示例：

```tsx
async function createPost(formData: FormData) {
  'use server'

  const title = formData.get('title')
  await db.post.create({ data: { title } })
}

export default function Page() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">提交</button>
    </form>
  )
}
```

理解方式：

- RSC 主要解决组件在哪里运行
- Server Actions 主要解决用户操作如何触发服务端逻辑

## 11. RSC 和 Suspense / Streaming

RSC 经常和 Suspense、流式渲染一起使用。

传统页面可能要等所有数据都准备好，才返回完整页面。

流式渲染可以让页面分块返回：

```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <main>
      <Header />
      <Suspense fallback={<p>文章加载中...</p>}>
        <ArticleList />
      </Suspense>
    </main>
  )
}
```

用户可以先看到 Header，再等待 ArticleList 加载完成。

好处：

- 首屏感知速度更快
- 慢数据不会阻塞整个页面
- 用户体验更平滑

## 12. RSC 的优势

### 12.1 更少的客户端 JS

不需要交互的组件留在服务器，浏览器少下载很多代码。

### 12.2 数据获取更直接

可以在组件中直接 await 数据。

### 12.3 安全性更好

数据库查询、私钥、后端 SDK 不会暴露给客户端。

### 12.4 更适合内容型页面

例如：

- 博客
- 文档站
- 电商商品页
- 后台管理系统列表页
- 新闻资讯页面

## 13. RSC 的限制

### 13.1 不能使用浏览器 API

Server Component 中不能写：

```tsx
window.localStorage.getItem('token')
```

因为服务器没有 window。

### 13.2 不能使用客户端状态

Server Component 中不能使用：

```tsx
const [count, setCount] = useState(0)
```

需要交互状态时，要拆成 Client Component。

### 13.3 组件边界需要设计

如果随便把大组件都写成 Client Component，就失去了 RSC 的意义。

建议：

```txt
能放服务端就放服务端
只有需要交互的局部才放客户端
```

## 14. 常见开发思路

设计页面时，可以按下面的顺序思考：

1. 页面哪些内容只是展示？
2. 哪些内容需要点击、输入、拖拽、状态？
3. 数据是否可以在服务端获取？
4. 有没有敏感逻辑不能暴露给浏览器？
5. 把静态展示和数据查询放 Server Component
6. 把交互区域拆成 Client Component

例如商品详情页：

```txt
商品标题、价格、描述：Server Component
商品图片展示：Server Component 或 Client Component
加入购物车按钮：Client Component
评论列表：Server Component
评论输入框：Client Component
```

## 15. 面试常见问题

### 15.1 什么是 RSC？

RSC 是 React Server Components，允许 React 组件在服务器上运行，并且不把这部分组件代码发送到浏览器。它可以减少客户端 JS 体积，让数据获取更靠近服务端。

### 15.2 RSC 和 SSR 有什么区别？

SSR 关注的是服务端生成 HTML，帮助首屏更快展示；RSC 关注的是组件代码运行在服务端还是客户端。SSR 后通常还需要 hydration，而 Server Component 本身不需要在客户端 hydrate。

### 15.3 什么情况下应该使用 Client Component？

当组件需要浏览器交互或浏览器 API 时，需要使用 Client Component，比如 useState、useEffect、onClick、表单输入、localStorage、window、document 等。

### 15.4 Server Component 可以访问数据库吗？

可以。Server Component 运行在服务端，因此可以访问数据库、文件系统、服务端环境变量和后端 SDK。但这些能力不能暴露给客户端组件。

### 15.5 `'use client'` 是什么意思？

`'use client'` 表示当前文件是客户端组件入口。这个组件以及它依赖的子组件会被打包到客户端 JS 中，所以应该只在确实需要交互的组件上使用。

## 16. 学习路线

建议学习顺序：

1. 先理解 CSR、SSR、SSG 的区别
2. 学习 React 组件、props、state、effect
3. 学习 Next.js App Router 的基本目录结构
4. 理解 Server Component 和 Client Component 的区别
5. 练习在 Server Component 中获取数据
6. 练习把按钮、表单、弹窗拆成 Client Component
7. 学习 Suspense、Streaming、Server Actions
8. 做一个博客或商品列表项目巩固

## 17. 一句话总结

RSC 的核心思想是：

> 默认把组件放在服务器运行，只有真正需要交互的部分才交给浏览器。

这样可以减少客户端 JS、提升性能，并让 React 更适合构建现代全栈应用。
