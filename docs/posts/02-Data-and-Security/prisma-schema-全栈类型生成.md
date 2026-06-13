---
title: Prisma Schema 全栈类型生成
date: 2026-06-13
categories:
  - 现代数据流与安全
tags:
  - Prisma
  - Drizzle
  - TypeScript
---

# Prisma Schema 全栈类型生成

## 1. 为什么 ORM 类型安全很重要

全栈项目最常见的问题之一是：

```txt
数据库字段改了
后端类型没改
前端表单还在提交旧字段
线上运行时才报错
```

Prisma / Drizzle 的价值是把数据库结构变成 TypeScript 类型来源，让字段变化能在开发阶段暴露。

## 2. Prisma Schema 示例

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  USER
  ADMIN
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  PAST_DUE
  INCOMPLETE
}

model User {
  id            String         @id @default(cuid())
  email         String         @unique
  name          String?
  role          UserRole       @default(USER)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  subscriptions Subscription[]
}

model Plan {
  id            String         @id @default(cuid())
  name          String
  stripePriceId String         @unique
  priceCents    Int
  active        Boolean        @default(true)
  createdAt     DateTime       @default(now())
  subscriptions Subscription[]
}

model Subscription {
  id                   String             @id @default(cuid())
  userId               String
  planId               String
  stripeSubscriptionId String             @unique
  status               SubscriptionStatus
  currentPeriodEnd     DateTime
  createdAt            DateTime           @default(now())
  updatedAt            DateTime           @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  plan Plan @relation(fields: [planId], references: [id], onDelete: Restrict)

  @@index([userId])
  @@index([planId])
  @@index([status])
}
```

## 3. 生成类型

```bash
npx prisma generate
npx prisma migrate dev --name init
```

生成后可直接在服务端使用类型：

```ts
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

## 4. 服务端查询：类型安全返回

```ts
// lib/users.ts
import { prisma } from './prisma'
import type { User } from '@prisma/client'

export type PublicUser = Pick<User, 'id' | 'email' | 'name' | 'role'>

export async function getPublicUser(userId: string): Promise<PublicUser | null> {
  if (!userId) return null

  try {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })
  } catch (error) {
    console.error('[getPublicUser]', error)
    return null
  }
}
```

## 5. Route Handler 返回给前端

```ts
// app/api/me/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPublicUser } from '@/lib/users'

function getUserIdFromRequest(request: NextRequest): string | null {
  const userId = request.cookies.get('user_id')?.value
  return userId && userId.length < 100 ? userId : null
}

export async function GET(request: NextRequest) {
  const userId = getUserIdFromRequest(request)

  if (!userId) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  try {
    const user = await getPublicUser(userId)

    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('[GET /api/me]', error)
    return NextResponse.json({ error: '服务暂时不可用' }, { status: 500 })
  }
}
```

## 6. 前端消费类型

生产项目建议把 API 返回类型抽到共享文件。

```ts
// types/api.ts
export type ApiError = {
  error: string
}

export type MeResponse = {
  user: {
    id: string
    email: string
    name: string | null
    role: 'USER' | 'ADMIN'
  }
}
```

```tsx
// app/profile/ProfileClient.tsx
'use client'

import { useEffect, useState } from 'react'
import type { ApiError, MeResponse } from '@/types/api'

export function ProfileClient() {
  const [data, setData] = useState<MeResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProfile() {
      try {
        const res = await fetch('/api/me', { signal: controller.signal })
        const json = await res.json().catch(() => null) as MeResponse | ApiError | null

        if (!res.ok) {
          throw new Error((json as ApiError | null)?.error || '获取用户信息失败')
        }

        if (!json || !('user' in json)) {
          throw new Error('响应格式错误')
        }

        setData(json)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        console.error('[ProfileClient]', error)
        setError(error instanceof Error ? error.message : '加载失败')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
    return () => controller.abort()
  }, [])

  if (loading) return <p>加载中...</p>
  if (error) return <p role="alert">{error}</p>
  if (!data) return <p>暂无数据</p>

  return (
    <section>
      <h2>个人资料</h2>
      <p>{data.user.email}</p>
      <p>{data.user.role}</p>
    </section>
  )
}
```

## 7. Drizzle Schema 示例

Drizzle 更接近 SQL，类型推导也很强。

```ts
// db/schema.ts
import { pgEnum, pgTable, text, timestamp, integer, boolean, index } from 'drizzle-orm/pg-core'

export const userRole = pgEnum('user_role', ['USER', 'ADMIN'])

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  role: userRole('role').notNull().default('USER'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const plans = pgTable('plans', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  stripePriceId: text('stripe_price_id').notNull().unique(),
  priceCents: integer('price_cents').notNull(),
  active: boolean('active').notNull().default(true),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
```

```ts
// db/users.ts
import { eq } from 'drizzle-orm'
import { db } from './client'
import { users, type User } from './schema'

export type PublicUser = Pick<User, 'id' | 'email' | 'name' | 'role'>

export async function findPublicUser(id: string): Promise<PublicUser | null> {
  if (!id) return null

  try {
    const rows = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1)

    return rows[0] ?? null
  } catch (error) {
    console.error('[findPublicUser]', error)
    return null
  }
}
```

## 8. Migration 标准流程

不要在生产控制台直接改字段。

标准流程：

```txt
1. 本地修改 schema
2. 生成 migration 文件
3. 本地跑测试库验证
4. 提交 schema + migration
5. CI 执行类型检查和测试
6. 预览环境执行 migration
7. 生产环境发布前或发布中执行 migration
8. 验证日志和关键链路
```

Prisma：

```bash
npx prisma migrate dev --name add_subscription_status
npx prisma migrate deploy
```

Drizzle：

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

## 9. 生产迁移的坑点

### 9.1 直接删除字段

危险做法：

```txt
删除字段 -> 老代码还在读写 -> 线上报错
```

安全做法：

```txt
第一版：新增字段，代码同时兼容新旧字段
第二版：后台回填数据
第三版：代码只读新字段
第四版：确认无旧字段访问后删除旧字段
```

### 9.2 给大表加非空字段

如果表很大，直接加 `NOT NULL` 可能锁表。

安全流程：

```txt
1. 先加 nullable 字段
2. 分批回填
3. 确认无 null
4. 再加 NOT NULL 约束
```

### 9.3 本地 schema 和生产数据库不一致

必须以 migration 文件为准，不要靠口头记忆。

## 10. 取舍

| 方案 | 优点 | 缺点 |
| --- | --- | --- |
| Prisma | 开发体验好，类型友好，生态成熟 | SQL 灵活度较低，复杂查询有时绕 |
| Drizzle | 接近 SQL，类型推导强，轻量 | 团队需要更懂 SQL |
| 手写 SQL | 极致灵活 | 类型闭环弱，维护成本高 |

建议：

- 初学和中小项目：Prisma 更容易上手。
- 对 SQL 控制要求高：Drizzle 更适合。
- 复杂报表：ORM + 手写 SQL 混合使用。
