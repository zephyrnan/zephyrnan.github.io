---
title: Stripe Webhook 接入避坑指南
date: 2026-06-13
categories:
  - 商业化与支付闭环
tags:
  - Stripe
  - Webhook
  - 支付
---

# Stripe Webhook 接入避坑指南

## 1. 为什么必须用 Webhook 发放权益

支付流程中，用户会从 Stripe 跳回你的 `success_url`，但这个页面不能作为支付成功依据。

原因：

- 用户可以伪造或直接访问成功页。
- 支付可能延迟确认。
- 订阅取消、扣款失败都发生在异步事件里。

生产原则：

> 会员权益只能由 Stripe Webhook 事件驱动发放或取消。

## 2. 安装依赖

```bash
npm install stripe
```

## 3. 创建 Checkout Session

```ts
// app/api/billing/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

const priceMap: Record<string, string> = {
  pro: process.env.STRIPE_PRO_PRICE_ID || '',
  team: process.env.STRIPE_TEAM_PRICE_ID || '',
}

function getUserId(request: NextRequest): string | null {
  const userId = request.cookies.get('user_id')?.value
  return userId && userId.length < 100 ? userId : null
}

export async function POST(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: '未登录' }, { status: 401 })

  try {
    const body = await request.json().catch(() => null) as { plan?: string } | null
    const plan = body?.plan

    if (!plan || !(plan in priceMap) || !priceMap[plan]) {
      return NextResponse.json({ error: '套餐不存在' }, { status: 400 })
    }

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL
    if (!origin) return NextResponse.json({ error: '站点地址未配置' }, { status: 500 })

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceMap[plan], quantity: 1 }],
      success_url: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      client_reference_id: userId,
      metadata: { userId, plan },
    })

    if (!session.url) {
      return NextResponse.json({ error: '支付链接创建失败' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[POST /api/billing/checkout]', error)
    return NextResponse.json({ error: '创建支付会话失败' }, { status: 500 })
  }
}
```

## 4. 前端调用 Checkout

```tsx
// app/pricing/CheckoutButton.tsx
'use client'

import { useState } from 'react'

type Props = {
  plan: 'pro' | 'team'
}

export function CheckoutButton({ plan }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    if (loading) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      const data = await res.json().catch(() => null) as { url?: string; error?: string } | null

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || '无法创建支付链接')
      }

      window.location.assign(data.url)
    } catch (error) {
      console.error('[CheckoutButton]', error)
      setError(error instanceof Error ? error.message : '操作失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? '跳转中...' : '立即购买'}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  )
}
```

## 5. Webhook 签名验证

Next.js App Router 里要读取原始 body。

```ts
// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    console.error('[stripe webhook] missing secret')
    return NextResponse.json({ error: 'Webhook secret missing' }, { status: 500 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    const rawBody = await request.text()
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (error) {
    console.error('[stripe webhook verify]', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    const existing = await prisma.paymentEvent.findUnique({
      where: { eventId: event.id },
    })

    if (existing?.processedAt) {
      return NextResponse.json({ received: true, duplicated: true })
    }

    await prisma.paymentEvent.upsert({
      where: { eventId: event.id },
      create: {
        provider: 'stripe',
        eventId: event.id,
        type: event.type,
        payload: event as unknown as object,
      },
      update: {
        type: event.type,
        payload: event as unknown as object,
      },
    })

    await handleStripeEvent(event)

    await prisma.paymentEvent.update({
      where: { eventId: event.id },
      data: { processedAt: new Date() },
    })

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[stripe webhook handle]', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleStripeEvent(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
      return
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      await handleSubscriptionChanged(event.data.object as Stripe.Subscription)
      return
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object as Stripe.Invoice)
      return
    default:
      return
  }
}
```

## 6. 处理支付成功

```ts
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId || session.client_reference_id
  const subscriptionId = typeof session.subscription === 'string' ? session.subscription : null

  if (!userId || !subscriptionId) {
    console.warn('[checkout.completed] missing userId or subscriptionId', session.id)
    return
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  await upsertSubscriptionFromStripe(userId, subscription)
}
```

## 7. 处理订阅变化

```ts
async function handleSubscriptionChanged(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.userId

  if (!userId) {
    console.warn('[subscription.changed] missing userId', subscription.id)
    return
  }

  await upsertSubscriptionFromStripe(userId, subscription)
}
```

## 8. 更新订阅和权益

```ts
async function upsertSubscriptionFromStripe(userId: string, subscription: Stripe.Subscription) {
  const priceId = subscription.items.data[0]?.price.id

  if (!priceId) {
    console.warn('[upsertSubscriptionFromStripe] missing priceId', subscription.id)
    return
  }

  const plan = await prisma.plan.findUnique({ where: { stripePriceId: priceId } })
  if (!plan) {
    console.warn('[upsertSubscriptionFromStripe] unknown priceId', priceId)
    return
  }

  const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id

  await prisma.$transaction(async tx => {
    await tx.subscription.upsert({
      where: { providerSubscriptionId: subscription.id },
      create: {
        userId,
        planId: plan.id,
        provider: 'stripe',
        providerCustomerId: customerId,
        providerSubscriptionId: subscription.id,
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      update: {
        planId: plan.id,
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    })

    const active = subscription.status === 'active' || subscription.status === 'trialing'

    await tx.entitlement.upsert({
      where: { userId_key: { userId, key: 'export' } },
      create: {
        userId,
        key: 'export',
        value: active ? 1 : 0,
        expiresAt: active ? new Date(subscription.current_period_end * 1000) : new Date(),
      },
      update: {
        value: active ? 1 : 0,
        expiresAt: active ? new Date(subscription.current_period_end * 1000) : new Date(),
      },
    })
  })
}
```

## 9. 处理扣款失败

```ts
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = typeof invoice.subscription === 'string' ? invoice.subscription : null

  if (!subscriptionId) {
    console.warn('[invoice.payment_failed] missing subscription', invoice.id)
    return
  }

  try {
    await prisma.subscription.update({
      where: { providerSubscriptionId: subscriptionId },
      data: { status: 'past_due' },
    })
  } catch (error) {
    console.error('[handlePaymentFailed]', error)
  }
}
```

## 10. 幂等性设计

Webhook 可能重复发送。必须保证重复事件不会重复发权益。

关键点：

1. `PaymentEvent.eventId` 唯一。
2. 每个事件先落库。
3. 已处理事件直接返回成功。
4. 权益更新使用 upsert。
5. 订阅表使用 Stripe subscription id 做唯一键。

## 11. 真实业务坑点

### 11.1 用 `request.json()` 验证签名

Stripe 签名必须使用原始 body，不能先 JSON 解析。

### 11.2 没记录事件日志

Webhook 失败后无法排查，也无法补偿。

### 11.3 只处理 checkout.session.completed

订阅系统一定要处理订阅更新和取消。

### 11.4 Webhook 返回非 2xx

Stripe 会重试。如果你的逻辑不是幂等的，可能重复发权益。

### 11.5 前端 success 页面直接开会员

这是严重安全漏洞。

## 12. 生产建议

1. Webhook 签名验证必须放第一步。
2. 用数据库唯一约束保证幂等。
3. 所有权益发放放在事务里。
4. 支付成功页只展示提示，不发权益。
5. 定期对账 Stripe 订阅状态和本地数据库。
6. Webhook 失败要告警，不能只 console。
