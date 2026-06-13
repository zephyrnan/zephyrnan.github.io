---
title: Vercel 自动化部署与环境变量
date: 2026-06-13
categories:
  - 零运维与边缘计算
tags:
  - Vercel
  - CI/CD
  - Edge
---

# Vercel 自动化部署与环境变量

## 1. GitHub + Vercel 的基本流程

```txt
本地开发 -> push 到 GitHub
         -> Vercel 自动构建 Preview
         -> 合并到 main
         -> Vercel 自动发布 Production
```

常见环境：

| 环境 | 来源 | 用途 |
| --- | --- | --- |
| Development | 本地 `.env.local` | 本地开发 |
| Preview | PR / 非生产分支 | 预览测试 |
| Production | main 分支 | 线上生产 |

## 2. 环境变量分层

```txt
NEXT_PUBLIC_SITE_URL        可以暴露给浏览器
DATABASE_URL                只能服务端使用
STRIPE_SECRET_KEY           只能服务端使用
STRIPE_WEBHOOK_SECRET       只能服务端使用
OPENAI_API_KEY              只能服务端使用
```

规则：

- `NEXT_PUBLIC_` 会打进前端 bundle。
- 私钥永远不要加 `NEXT_PUBLIC_`。
- Preview 和 Production 要用不同数据库、不同支付测试环境。

## 3. 本地环境变量校验

```ts
// lib/env.ts
function required(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return value
}

export const serverEnv = {
  databaseUrl: required('DATABASE_URL'),
  stripeSecretKey: required('STRIPE_SECRET_KEY'),
  stripeWebhookSecret: required('STRIPE_WEBHOOK_SECRET'),
}

export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
}
```

## 4. 在 Route Handler 中使用环境变量

```ts
// app/api/health/route.ts
import { NextResponse } from 'next/server'
import { serverEnv } from '@/lib/env'

export async function GET() {
  try {
    const configured = Boolean(serverEnv.databaseUrl)

    return NextResponse.json({
      ok: true,
      configured,
      runtime: process.env.NEXT_RUNTIME || 'nodejs',
    })
  } catch (error) {
    console.error('[GET /api/health]', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
```

## 5. 前端读取公开配置

```tsx
// app/components/SiteLink.tsx
'use client'

export function SiteLink() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

  if (!siteUrl) return null

  return (
    <a href={siteUrl} target="_blank" rel="noreferrer">
      打开站点
    </a>
  )
}
```

注意：前端只能读取构建时注入的 `NEXT_PUBLIC_*`。

## 6. Edge Runtime 和 Node.js Runtime

Edge Runtime：

- 启动快，靠近用户。
- 适合鉴权、重定向、轻量 A/B 测试。
- 不支持完整 Node.js API。
- 不适合 Prisma、Stripe SDK 某些 Node 特性、文件系统。

Node.js Runtime：

- 兼容 Node 生态。
- 适合数据库、支付、AI SDK、复杂业务。
- 冷启动可能更慢。

## 7. Edge Middleware 鉴权示例

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const protectedPrefixes = ['/dashboard', '/billing']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const needsAuth = protectedPrefixes.some(prefix => pathname.startsWith(prefix))

  if (!needsAuth) return NextResponse.next()

  try {
    const session = request.cookies.get('session')?.value

    if (!session) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  } catch (error) {
    console.error('[middleware]', error)
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/billing/:path*'],
}
```

## 8. 地域重定向示例

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { geolocation } from '@vercel/functions'

export function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname
    if (pathname !== '/') return NextResponse.next()

    // Next.js 15+ 已移除 request.geo / request.ip，
    // 改用 @vercel/functions 的 geolocation()，并兜底读取请求头
    const { country } = geolocation(request)
    const resolvedCountry = country || request.headers.get('x-vercel-ip-country')

    if (resolvedCountry === 'CN') {
      const url = request.nextUrl.clone()
      url.pathname = '/zh-CN'
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  } catch (error) {
    console.error('[geo middleware]', error)
    return NextResponse.next()
  }
}
```

> 依赖安装：`npm install @vercel/functions`。本地开发时 `geolocation()` 可能返回空值，需保留请求头兜底或默认分支。

## 9. CI/CD 发布流程建议

```txt
1. feature 分支开发
2. push 后生成 Preview URL
3. 在 Preview 环境验证页面、接口、支付测试模式
4. 合并到 main
5. Production 自动构建
6. 发布后检查 Sentry、日志、核心路径
```

如果有数据库迁移：

```txt
1. 先备份生产数据库
2. 在预览/测试库执行 migration
3. 生产执行 migration
4. 再发布依赖新字段的代码
```

## 10. 真实业务坑点

### 10.1 Preview 连接生产数据库

这是高风险行为。Preview 分支可能有未完成代码，会污染生产数据。

### 10.2 在 Edge 里使用 Node SDK

例如 Prisma、部分 Stripe 操作不适合 Edge。

解决：

- Middleware 只做轻量判断。
- 复杂业务放 Node.js Route Handler。

### 10.3 环境变量修改后不重新部署

Vercel 中修改环境变量后，已部署版本不会自动生效，需要重新部署。

### 10.4 把私钥传给前端

任何 `NEXT_PUBLIC_*` 都会暴露。

## 11. 生产建议

1. Development / Preview / Production 使用不同密钥。
2. 私钥只放服务端环境变量。
3. Edge 只做轻逻辑，不连数据库。
4. 发布前跑构建、类型检查和关键路径测试。
5. 数据库迁移和应用发布要有顺序。
6. 生产发布后检查日志和监控。
