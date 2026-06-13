---
title: SaaS 订阅制用户表结构设计
date: 2026-06-13
categories:
  - 商业化与支付闭环
tags:
  - SaaS
  - 订阅
  - 数据库设计
---

# SaaS 订阅制用户表结构设计

## 1. 订阅制模型的核心实体

一个 SaaS 订阅系统至少要有：

```txt
User：用户
Plan：套餐
Subscription：订阅状态
PaymentEvent：支付事件日志
Entitlement：权益或配额
```

不要只在 user 表上放一个 `isVip`。

原因：

- 无法表达取消、过期、欠费、试用。
- 无法追踪历史订阅。
- 无法处理 Webhook 重试和补偿。
- 无法支持不同套餐权益。

## 2. Prisma 数据模型

```prisma
model User {
  id            String         @id @default(cuid())
  email         String         @unique
  name          String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  subscriptions Subscription[]
  entitlements  Entitlement[]
}

model Plan {
  id            String         @id @default(cuid())
  code          String         @unique
  name          String
  priceCents    Int
  currency      String         @default("usd")
  interval      String
  stripePriceId String         @unique
  active        Boolean        @default(true)
  createdAt     DateTime       @default(now())
  subscriptions Subscription[]
}

model Subscription {
  id                   String   @id @default(cuid())
  userId               String
  planId               String
  provider             String   @default("stripe")
  providerCustomerId   String
  providerSubscriptionId String @unique
  status               String
  currentPeriodStart   DateTime?
  currentPeriodEnd     DateTime?
  cancelAtPeriodEnd    Boolean  @default(false)
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  plan Plan @relation(fields: [planId], references: [id], onDelete: Restrict)

  @@index([userId])
  @@index([planId])
  @@index([status])
  @@index([providerCustomerId])
}

model Entitlement {
  id        String   @id @default(cuid())
  userId    String
  key       String
  value     Int
  expiresAt DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, key])
  @@index([expiresAt])
}

model PaymentEvent {
  id          String   @id @default(cuid())
  provider    String
  eventId     String   @unique
  type        String
  payload     Json
  processedAt DateTime?
  createdAt   DateTime @default(now())

  @@index([type])
  @@index([processedAt])
}
```

## 3. 套餐和权益的关系

可以在代码中维护套餐权益，也可以建表。

中小项目可以先用代码配置：

```ts
// config/plans.ts
export type PlanCode = 'free' | 'pro' | 'team'

export type PlanConfig = {
  code: PlanCode
  name: string
  monthlyLimit: number
  seats: number
}

export const plans: Record<PlanCode, PlanConfig> = {
  free: { code: 'free', name: 'Free', monthlyLimit: 100, seats: 1 },
  pro: { code: 'pro', name: 'Pro', monthlyLimit: 5000, seats: 1 },
  team: { code: 'team', name: 'Team', monthlyLimit: 50000, seats: 10 },
}

export function getPlanConfig(code: string): PlanConfig | null {
  return code in plans ? plans[code as PlanCode] : null
}
```

## 4. 服务端查询当前订阅

```ts
// lib/billing.ts
import { prisma } from '@/lib/prisma'

export type CurrentSubscription = {
  status: string
  planCode: string
  currentPeriodEnd: Date | null
  cancelAtPeriodEnd: boolean
}

const activeStatuses = new Set(['active', 'trialing'])

export async function getCurrentSubscription(userId: string): Promise<CurrentSubscription | null> {
  if (!userId) return null

  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: { in: Array.from(activeStatuses) },
      },
      orderBy: { updatedAt: 'desc' },
      include: { plan: true },
    })

    if (!subscription) return null

    return {
      status: subscription.status,
      planCode: subscription.plan.code,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
    }
  } catch (error) {
    console.error('[getCurrentSubscription]', error)
    return null
  }
}
```

## 5. 前端展示订阅状态

```tsx
// app/billing/BillingStatus.tsx
'use client'

import { useEffect, useState } from 'react'

type BillingResponse = {
  subscription: {
    status: string
    planCode: string
    currentPeriodEnd: string | null
    cancelAtPeriodEnd: boolean
  } | null
}

export function BillingStatus() {
  const [data, setData] = useState<BillingResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const res = await fetch('/api/billing/current', { signal: controller.signal })
        const json = await res.json().catch(() => null) as BillingResponse | { error?: string } | null

        if (!res.ok) throw new Error((json as { error?: string } | null)?.error || '获取订阅失败')
        setData(json as BillingResponse)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        console.error('[BillingStatus]', error)
        setError(error instanceof Error ? error.message : '加载失败')
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [])

  if (loading) return <p>加载订阅状态中...</p>
  if (error) return <p role="alert">{error}</p>
  if (!data?.subscription) return <p>当前为免费套餐</p>

  return (
    <section>
      <p>套餐：{data.subscription.planCode}</p>
      <p>状态：{data.subscription.status}</p>
      {data.subscription.currentPeriodEnd && <p>到期时间：{data.subscription.currentPeriodEnd}</p>}
      {data.subscription.cancelAtPeriodEnd && <p>将在周期结束后取消</p>}
    </section>
  )
}
```

```ts
// app/api/billing/current/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentSubscription } from '@/lib/billing'

function getUserId(request: NextRequest): string | null {
  const userId = request.cookies.get('user_id')?.value
  return userId && userId.length < 100 ? userId : null
}

export async function GET(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: '未登录' }, { status: 401 })

  try {
    const subscription = await getCurrentSubscription(userId)

    return NextResponse.json({
      subscription: subscription && {
        ...subscription,
        currentPeriodEnd: subscription.currentPeriodEnd?.toISOString() ?? null,
      },
    })
  } catch (error) {
    console.error('[GET /api/billing/current]', error)
    return NextResponse.json({ error: '服务暂时不可用' }, { status: 500 })
  }
}
```

## 6. 权益判断

```ts
// lib/entitlements.ts
import { prisma } from '@/lib/prisma'

export async function hasEntitlement(userId: string, key: string): Promise<boolean> {
  if (!userId || !key) return false

  try {
    const entitlement = await prisma.entitlement.findUnique({
      where: { userId_key: { userId, key } },
    })

    if (!entitlement) return false
    if (entitlement.expiresAt && entitlement.expiresAt.getTime() < Date.now()) return false

    return entitlement.value > 0
  } catch (error) {
    console.error('[hasEntitlement]', error)
    return false
  }
}
```

## 7. 订阅状态不要只靠前端控制

前端隐藏按钮只是体验优化，不是安全。

后端接口必须检查权益：

```ts
// app/api/export/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { hasEntitlement } from '@/lib/entitlements'

export async function POST(request: NextRequest) {
  const userId = request.cookies.get('user_id')?.value

  if (!userId) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  try {
    const allowed = await hasEntitlement(userId, 'export')

    if (!allowed) {
      return NextResponse.json({ error: '当前套餐不支持导出' }, { status: 403 })
    }

    return NextResponse.json({ ok: true, url: '/exports/demo.csv' })
  } catch (error) {
    console.error('[POST /api/export]', error)
    return NextResponse.json({ error: '导出失败' }, { status: 500 })
  }
}
```

## 8. 真实业务坑点

### 8.1 用 `isVip` 代替订阅表

短期快，长期很难维护取消、退款、欠费、套餐升级。

### 8.2 只处理支付成功，不处理取消和失败

至少要处理：

- checkout.session.completed
- customer.subscription.updated
- customer.subscription.deleted
- invoice.payment_failed

### 8.3 用户权益直接和支付页面同步

支付成功页不可信。用户可以直接访问 success URL。

真正发放权益必须基于 Webhook。

### 8.4 没有事件日志

Webhook 失败后无法追踪，也无法补偿。

## 9. 生产建议

1. `Plan` 表描述套餐。
2. `Subscription` 表描述订阅状态。
3. `Entitlement` 表描述实际可用权益。
4. `PaymentEvent` 表记录所有支付事件。
5. 权益发放只相信 Webhook，不相信前端跳转。
6. 所有付费能力后端都要二次校验。
