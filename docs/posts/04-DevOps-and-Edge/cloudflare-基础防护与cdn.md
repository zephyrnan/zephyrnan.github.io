---
title: Cloudflare 基础防护与 CDN
date: 2026-06-13
categories:
  - 零运维与边缘计算
tags:
  - Cloudflare
  - CDN
  - WAF
---

# Cloudflare 基础防护与 CDN

## 1. Cloudflare 在架构里的位置

Cloudflare 处在用户和你的服务器之间，作为反向代理和 CDN。

```txt
用户浏览器
   ↓
Cloudflare（CDN + WAF + DNS）
   ↓
你的源站（Vercel / 服务器 / 对象存储）
```

它能做的事：

- DNS 解析
- 静态资源 CDN 缓存
- 隐藏源站 IP
- WAF 拦截恶意请求
- 限流（Rate Limiting）
- 基础 DDoS 防护
- Edge 运行 Workers

## 2. 基础接入流程

```txt
1. 在 Cloudflare 添加站点（域名）
2. 修改域名 NS 到 Cloudflare
3. 配置 DNS 记录，开启橙色云朵（代理模式）
4. 设置 SSL/TLS 模式为 Full (strict)
5. 开启 Always Use HTTPS
6. 配置缓存规则和防护规则
```

注意：

- 灰色云朵 = 仅 DNS，不走 Cloudflare 防护。
- 橙色云朵 = 走 Cloudflare 代理，才有 CDN 和 WAF。

## 3. SSL/TLS 模式选择

| 模式 | 含义 | 风险 |
| --- | --- | --- |
| Off | 不加密 | 危险，禁用 |
| Flexible | 浏览器到 CF 加密，CF 到源站不加密 | 源站可能明文，易被中间人 |
| Full | 全程加密，但不校验源站证书 | 可能被伪造证书 |
| Full (strict) | 全程加密且校验源站证书 | 推荐 |

生产建议使用 **Full (strict)**。

## 4. CDN 缓存策略

静态资源（图片、JS、CSS、字体）适合长期缓存。

源站设置响应头：

```ts
// app/api/static-config/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = { theme: 'light', version: '1.0.0' }

    return NextResponse.json(data, {
      headers: {
        // 公共缓存 1 小时，CDN 缓存 1 天，过期后后台再验证
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('[GET /api/static-config]', error)
    return NextResponse.json({ error: '加载失败' }, { status: 500 })
  }
}
```

含义：

- `max-age`：浏览器缓存秒数。
- `s-maxage`：CDN（共享缓存）缓存秒数。
- `stale-while-revalidate`：过期后先返回旧内容，后台再更新。

动态接口不要缓存：

```ts
return NextResponse.json(data, {
  headers: { 'Cache-Control': 'private, no-store' },
})
```

## 5. 区分可缓存与不可缓存

```txt
可缓存：
- 图片 / 字体 / 静态 JS、CSS
- 公开配置
- 文章、商品详情（可加短缓存）

不可缓存：
- 登录态接口
- 订单、余额、个人信息
- 支付相关接口
- 带 Set-Cookie 的响应
```

坑点：

> 如果给带 Cookie 的响应设置了公共缓存，可能把某个用户的数据缓存给所有人，造成严重越权。

## 6. WAF 基础规则

Cloudflare WAF 可以用规则拦截可疑请求。

常见自定义规则示例（在面板里配置表达式）：

```txt
拦截非常见请求方法：
(http.request.method in {"TRACE" "TRACK"})

拦截常见扫描路径：
(http.request.uri.path contains "/wp-admin") or
(http.request.uri.path contains "/.env") or
(http.request.uri.path contains "/phpmyadmin")

限制 admin 路径只允许公司 IP：
(http.request.uri.path contains "/admin" and ip.src ne 1.2.3.4)
```

动作可选：Block、Managed Challenge、JS Challenge。

## 7. Rate Limiting 限流

针对敏感接口（登录、注册、发送验证码、支付）设置限流。

```txt
规则示例：
路径：/api/auth/login
条件：同一 IP
阈值：每 1 分钟超过 10 次
动作：Block 60 秒
```

源站也要做一层限流兜底，不要只依赖 Cloudflare。

## 8. 源站侧的轻量限流

即使有 Cloudflare，源站也要防御。

```ts
// lib/rate-limit.ts
type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  if (!key) return false

  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (bucket.count >= limit) {
    return false
  }

  bucket.count += 1
  return true
}
```

```ts
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'

function getClientIp(request: NextRequest): string {
  // Cloudflare 会带 cf-connecting-ip
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  if (!rateLimit(`login:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: '请求过于频繁，请稍后再试' }, { status: 429 })
  }

  try {
    const body = await request.json().catch(() => null) as { email?: string; password?: string } | null

    if (!body?.email || !body?.password) {
      return NextResponse.json({ error: '参数错误' }, { status: 400 })
    }

    // 这里执行真实登录逻辑
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[POST /api/auth/login]', error)
    return NextResponse.json({ error: '登录失败' }, { status: 500 })
  }
}
```

注意：内存限流只在单实例有效。多实例生产环境应使用 Redis / Upstash 等共享存储。

## 9. 前端友好处理 429

```tsx
// app/login/LoginForm.tsx
'use client'

import { useState } from 'react'

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      })

      if (res.status === 429) {
        throw new Error('操作太频繁，请稍后再试')
      }

      const data = await res.json().catch(() => null) as { error?: string } | null
      if (!res.ok) throw new Error(data?.error || '登录失败')

      window.location.assign('/dashboard')
    } catch (error) {
      console.error('[LoginForm]', error)
      setError(error instanceof Error ? error.message : '登录失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={handleSubmit}>
      <input name="email" type="email" required placeholder="邮箱" />
      <input name="password" type="password" required placeholder="密码" />
      <button disabled={loading}>{loading ? '登录中...' : '登录'}</button>
      {error && <p role="alert">{error}</p>}
    </form>
  )
}
```

## 10. 真实业务坑点

### 10.1 缓存了带 Cookie 的私有响应

会导致用户 A 看到用户 B 的数据。务必给私有接口设置 `private, no-store`。

### 10.2 灰色云朵以为有防护

只有橙色云朵（代理模式）才走 WAF 和 CDN。

### 10.3 拿 `x-forwarded-for` 第一个 IP 不校验

在 Cloudflare 后面应优先用 `cf-connecting-ip`，否则容易被伪造头欺骗。

### 10.4 只依赖 Cloudflare，不做源站防护

如果源站 IP 泄露，攻击者可绕过 Cloudflare 直接打源站。建议源站防火墙只允许 Cloudflare IP 段访问。

### 10.5 把 SSL 设成 Flexible

CF 到源站明文传输，存在中间人风险。生产用 Full (strict)。

## 11. 生产建议

1. 域名走橙色云朵，开启代理。
2. SSL 用 Full (strict)。
3. 静态资源长缓存，私有接口禁止缓存。
4. 敏感接口在 CF 和源站都做限流。
5. 客户端真实 IP 用 `cf-connecting-ip`。
6. 源站只允许 Cloudflare 回源，隐藏真实 IP。
7. 多实例限流用 Redis，不要用内存。
