---
title: Sentry 前端异常捕获与报警
date: 2026-06-13
categories:
  - 增长、监控与运营
tags:
  - Sentry
  - 监控
  - PostHog
---

# Sentry 前端异常捕获与报警

## 1. 为什么需要异常监控

线上代码是混淆压缩的，用户报错你看不到堆栈。没有监控时：

```txt
用户：你的网站点不动了
你：哪个页面？什么操作？什么浏览器？
用户：不记得了
```

Sentry 帮你：

- 自动捕获前后端异常
- 还原源码堆栈（Source Map）
- 记录用户操作路径（Breadcrumbs）
- 区分严重错误和普通波动
- 异常激增时报警

## 2. 安装

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

向导会生成配置文件并接入构建。

## 3. 配置文件

```ts
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // 采样率：生产不要 100%，按量控制成本
  tracesSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.0,
  environment: process.env.NEXT_PUBLIC_ENV || 'production',
  // 过滤噪声错误
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
    'Network request failed',
  ],
  beforeSend(event) {
    // 过滤掉无堆栈的低价值错误
    if (!event.exception?.values?.[0]?.stacktrace) {
      return null
    }
    return event
  },
})
```

```ts
// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
})
```

## 4. Source Map 配置

要还原线上堆栈，必须上传 Source Map，但不要把它暴露给公众。

```js
// next.config.mjs
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig = {
  productionBrowserSourceMaps: false,
}

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // 上传后删除产物中的 source map，避免公开泄露
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
  silent: true,
})
```

坑点：

- `SENTRY_AUTH_TOKEN` 是私钥，只放 CI 环境变量。
- 上传后删除 Source Map，否则别人能还原你的源码。

## 5. 前端错误边界

```tsx
// app/error.tsx
'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <div role="alert">
      <h2>页面出错了</h2>
      <p>我们已记录该问题，请稍后重试。</p>
      <button onClick={reset}>重试</button>
    </div>
  )
}
```

## 6. 主动捕获业务异常

不是所有异常都会自动抛出。关键业务失败要主动上报，并附带上下文。

```tsx
// app/checkout/CheckoutClient.tsx
'use client'

import { useState } from 'react'
import * as Sentry from '@sentry/nextjs'

export function CheckoutClient({ userId }: { userId: string }) {
  const [error, setError] = useState<string | null>(null)

  async function handlePay() {
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'pro' }),
      })

      const data = await res.json().catch(() => null) as { url?: string; error?: string } | null

      if (!res.ok || !data?.url) {
        // 支付失败是高价值业务事件，附带上下文上报
        Sentry.captureMessage('Checkout failed', {
          level: 'error',
          tags: { feature: 'billing' },
          extra: { userId, status: res.status, serverError: data?.error },
        })
        throw new Error(data?.error || '支付创建失败')
      }

      window.location.assign(data.url)
    } catch (error) {
      console.error('[CheckoutClient]', error)
      setError(error instanceof Error ? error.message : '支付失败')
    }
  }

  return (
    <div>
      <button onClick={handlePay}>支付</button>
      {error && <p role="alert">{error}</p>}
    </div>
  )
}
```

## 7. 服务端异常上报

```ts
// app/api/billing/checkout/route.ts 片段
import * as Sentry from '@sentry/nextjs'

export async function POST(request: Request) {
  try {
    // ...业务逻辑
    return Response.json({ ok: true })
  } catch (error) {
    Sentry.captureException(error, {
      tags: { route: 'billing/checkout' },
    })
    console.error('[checkout]', error)
    return Response.json({ error: '创建支付会话失败' }, { status: 500 })
  }
}
```

## 8. 区分严重 Bug 和普通波动

不是所有红色都需要半夜爬起来。用 level 和 tag 分级。

```txt
fatal / error：核心链路失败（支付、登录、数据写入）-> 立即告警
warning：可降级、可重试的问题（第三方超时、限流）-> 汇总观察
info：普通业务事件 -> 仅记录
```

常见处理：

- 网络抖动、用户主动取消：归为 warning 或直接 `ignoreErrors`。
- 支付、鉴权、数据库写失败：归为 error，配置告警规则。

告警规则示例（在 Sentry 后台配置）：

```txt
当 tag feature=billing 且 level=error
在 5 分钟内出现超过 5 次
-> 推送到 Slack / 邮件
```

## 9. 前端埋点与漏斗分析

监控异常之外，还要追踪转化漏斗。以 PostHog 为例。

```ts
// lib/analytics.ts
import posthog from 'posthog-js'

let initialized = false

export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    capture_pageview: true,
  })
  initialized = true
}

export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !initialized) return
  try {
    posthog.capture(event, props)
  } catch (error) {
    console.error('[track]', error)
  }
}
```

追踪核心漏斗：

```tsx
// app/pricing/PricingTracker.tsx
'use client'

import { useEffect } from 'react'
import { track } from '@/lib/analytics'

export function PricingTracker() {
  useEffect(() => {
    track('pricing_viewed')
  }, [])

  return null
}
```

```ts
// 关键节点埋点
track('checkout_clicked', { plan: 'pro' })
track('payment_succeeded', { plan: 'pro', amount: 2900 })
```

这样可以在分析平台看到漏斗：

```txt
到达定价页(pricing_viewed)
  -> 点击购买(checkout_clicked)
  -> 支付成功(payment_succeeded)
```

## 10. 真实业务坑点

### 10.1 采样率 100%

高流量站点会瞬间打满 Sentry 配额并产生高费用。生产用 0.1 左右，按需调整。

### 10.2 不过滤噪声错误

`ResizeObserver loop limit exceeded`、浏览器插件报错会淹没真正的问题。用 `ignoreErrors` 和 `beforeSend` 过滤。

### 10.3 Source Map 公开泄露

如果不删除产物里的 map 文件，源码可被还原。上传后必须删除。

### 10.4 Auth Token 进了前端

`SENTRY_AUTH_TOKEN` 只能在 CI/服务端，不能是 `NEXT_PUBLIC_`。

### 10.5 埋点阻塞主流程

分析 SDK 报错不能影响业务。所有 track 调用都包 try-catch，且异步非阻塞。

### 10.6 所有错误一个级别

不分级会导致告警疲劳，真正严重的问题被淹没。

## 11. 生产建议

1. 前后端都接入 Sentry。
2. 采样率按流量和预算设定。
3. Source Map 上传后删除，Auth Token 保密。
4. 用 level + tag 给错误分级，配置告警规则。
5. 过滤噪声错误，减少干扰。
6. 漏斗埋点用独立分析工具，调用包容错。
7. 监控 + 埋点结合，既看稳定性也看转化。
