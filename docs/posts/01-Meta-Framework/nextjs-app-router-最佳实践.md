---
title: Next.js App Router 最佳实践
date: 2026-06-13
categories:
  - 元框架与全栈路由
tags:
  - Next.js
  - App Router
  - SSR
---

# Next.js App Router 最佳实践

## 1. App Router 的核心思路

Next.js App Router 使用 `app/` 目录组织页面，每个目录天然对应一个路由段。

```txt
app/
  layout.tsx
  page.tsx
  pricing/
    page.tsx
  dashboard/
    page.tsx
  api/
    health/
      route.ts
```

它的重点不是“换一种写路由”，而是把页面拆成：

- **Server Component**：默认运行在服务端，适合数据获取、权限校验、静态内容渲染。
- **Client Component**：显式写 `'use client'`，适合交互、状态、浏览器 API。
- **Route Handler**：写后端接口。
- **Server Action**：直接在服务端处理表单或业务动作。

真实项目建议：

```txt
页面壳、数据读取、鉴权：Server Component
按钮、弹窗、表单状态：Client Component
第三方回调、开放接口：Route Handler
表单提交、后台动作：Server Action
```

## 2. SSR、SSG、CSR 的业务选择

| 模式 | 生成时机 | 适合场景 | SEO | 主要坑点 |
| --- | --- | --- | --- | --- |
| SSR | 每次请求时 | 用户中心、订单详情、搜索页 | 好 | 服务端压力和缓存复杂 |
| SSG | 构建时 | 博客、文档、营销页 | 很好 | 数据更新慢 |
| ISR / Revalidation | 构建后按需或定时更新 | 商品详情、新闻页 | 很好 | 需要设计失效策略 |
| CSR | 浏览器运行 JS 后渲染 | 后台系统、强交互页面 | 弱 | 首屏慢、依赖 JS |

## 3. 页面级示例：SSG + 定时再验证

适合博客、商品详情、公开内容页。

```tsx
// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'

type Post = {
  slug: string
  title: string
  content: string
  updatedAt: string
}

type PageProps = {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<Post | null> {
  if (!slug || slug.length > 120) return null

  try {
    const res = await fetch(`${process.env.CONTENT_API_URL}/posts/${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    })

    if (res.status === 404) return null
    if (!res.ok) throw new Error(`Content API failed: ${res.status}`)

    return await res.json() as Post
  } catch (error) {
    console.error('[getPost]', error)
    return null
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  return (
    <main>
      <h1>{post.title}</h1>
      <article>{post.content}</article>
      <p>最后更新：{post.updatedAt}</p>
    </main>
  )
}
```

### 取舍

- `revalidate: 300` 可以减少服务端压力。
- 不适合强实时数据，比如支付状态、订单状态。
- 公开页面优先考虑 SSG/ISR，有 SEO 和性能优势。

## 4. 页面级示例：SSR 动态页面

适合登录后页面、个性化页面。

```tsx
// app/dashboard/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type Profile = {
  id: string
  email: string
  plan: 'free' | 'pro' | 'team'
}

async function getProfile(token: string): Promise<Profile | null> {
  try {
    const res = await fetch(`${process.env.INTERNAL_API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })

    if (res.status === 401) return null
    if (!res.ok) throw new Error(`Profile API failed: ${res.status}`)

    return await res.json() as Profile
  } catch (error) {
    console.error('[getProfile]', error)
    return null
  }
}

export default async function DashboardPage() {
  const token = (await cookies()).get('session')?.value
  if (!token) redirect('/login')

  const profile = await getProfile(token)
  if (!profile) redirect('/login')

  return (
    <main>
      <h1>控制台</h1>
      <p>账号：{profile.email}</p>
      <p>套餐：{profile.plan}</p>
    </main>
  )
}
```

### 取舍

- `cache: 'no-store'` 保证每次请求都读取最新登录态。
- 代价是不能复用静态缓存，访问量大时需要后端和数据库扛住压力。
- 登录态页面不要用 SSG。

## 5. CSR 的边界：只把交互下沉到客户端

```tsx
// app/pricing/SubscribeButton.tsx
'use client'

import { useState } from 'react'

type Props = {
  planId: string
}

export function SubscribeButton({ planId }: Props) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleClick() {
    if (!planId || loading) return

    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      })

      const data = await res.json().catch(() => null) as { url?: string; error?: string } | null

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || '创建支付会话失败')
      }

      window.location.href = data.url
    } catch (error) {
      console.error('[SubscribeButton]', error)
      setMessage(error instanceof Error ? error.message : '操作失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? '处理中...' : '立即订阅'}
      </button>
      {message && <p role="alert">{message}</p>}
    </div>
  )
}
```

### 真实业务坑点

1. 不要为了一个按钮把整页改成 Client Component。
2. Client Component 里不要放密钥、数据库连接和服务端 SDK。
3. 需要 SEO 的页面不要完全 CSR。
4. 后台系统可以 CSR，但公开营销页、文章页、商品页更适合 SSR/SSG/ISR。

## 6. Server Actions 处理表单提交

```tsx
// app/contact/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export type ContactActionState = {
  ok: boolean
  message: string
}

export async function submitContact(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const email = String(formData.get('email') || '').trim()
  const content = String(formData.get('content') || '').trim()

  if (!email.includes('@')) {
    return { ok: false, message: '请输入正确的邮箱' }
  }

  if (content.length < 5 || content.length > 1000) {
    return { ok: false, message: '留言内容需在 5 到 1000 字之间' }
  }

  try {
    const res = await fetch(`${process.env.INTERNAL_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.INTERNAL_API_TOKEN}`,
      },
      body: JSON.stringify({ email, content }),
      cache: 'no-store',
    })

    if (!res.ok) throw new Error(`Contact API failed: ${res.status}`)

    revalidatePath('/contact')
    return { ok: true, message: '提交成功' }
  } catch (error) {
    console.error('[submitContact]', error)
    return { ok: false, message: '服务暂时不可用，请稍后重试' }
  }
}
```

```tsx
// app/contact/ContactForm.tsx
'use client'

import { useActionState } from 'react'
import { submitContact, type ContactActionState } from './actions'

const initialState: ContactActionState = { ok: false, message: '' }

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState)

  return (
    <form action={action}>
      <input name="email" type="email" required placeholder="邮箱" />
      <textarea name="content" required minLength={5} maxLength={1000} placeholder="留言" />
      <button disabled={pending}>{pending ? '提交中...' : '提交'}</button>
      {state.message && <p role="status">{state.message}</p>}
    </form>
  )
}
```

## 7. Server Actions 的取舍

优点：

- 少写一个 `/api/*` 接口。
- 表单提交体验自然。
- 服务端逻辑和页面更近。

坑点：

- 第三方系统回调仍然应该用 Route Handler。
- 复杂业务不要全部塞进 action，应该调用 service 层。
- 表单参数必须在服务端重新校验，不能相信前端校验。
- action 返回给前端的信息不能包含敏感异常。

## 8. 生产建议

1. 公开内容页优先 SSG/ISR。
2. 登录态页面优先 SSR 或动态 Server Component。
3. 强交互区域局部使用 Client Component。
4. 表单提交可以使用 Server Actions。
5. Webhook、移动端 API、第三方开放接口使用 Route Handler。
6. 所有服务端入口都要做参数校验、异常捕获、日志记录和权限校验。
