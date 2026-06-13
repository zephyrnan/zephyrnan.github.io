---
title: Vercel AI SDK 流式输出实战
date: 2026-06-13
categories:
  - AI 赋能与集成
tags:
  - AI
  - Vercel AI SDK
  - Streaming
---

# Vercel AI SDK 流式输出实战

## 1. 为什么需要流式输出

大模型生成内容耗时较长。如果等全部生成完再返回：

```txt
用户点击 -> 等待 10 秒空白 -> 突然出现全部内容
```

体验很差，而且长连接容易超时。

流式输出（Streaming）让内容像打字机一样逐步返回：

```txt
用户点击 -> 立刻开始逐字显示 -> 持续输出直到结束
```

好处：

- 首字时间短，体验好。
- 长响应不容易超时断连。
- 用户可随时中断。

## 2. 安装依赖

```bash
npm install ai @ai-sdk/openai zod
```

- `ai`：Vercel AI SDK 核心。
- `@ai-sdk/openai`：OpenAI provider。
- `zod`：参数校验。

## 3. 服务端流式接口

```ts
// app/api/chat/route.ts
import { NextRequest } from 'next/server'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { buildSystemPrompt } from '@/lib/prompts'
import { rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const maxDuration = 60

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1).max(8000),
      }),
    )
    .min(1)
    .max(50),
})

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  if (!rateLimit(`chat:${ip}`, 20, 60_000)) {
    return new Response(JSON.stringify({ error: '请求过于频繁，请稍后再试' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let parsed
  try {
    const json = await request.json()
    parsed = bodySchema.parse(json)
  } catch (error) {
    console.error('[chat parse]', error)
    return new Response(JSON.stringify({ error: '参数格式错误' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: buildSystemPrompt('chat'),
      messages: parsed.messages,
      temperature: 0.7,
      maxTokens: 1024,
      abortSignal: request.signal,
      onError: error => {
        console.error('[streamText error]', error)
      },
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('[POST /api/chat]', error)
    return new Response(JSON.stringify({ error: '生成失败，请稍后重试' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
```

## 4. 前端打字机效果

```tsx
// app/chat/ChatBox.tsx
'use client'

import { useChat } from 'ai/react'

export function ChatBox() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    stop,
    error,
    reload,
  } = useChat({
    api: '/api/chat',
    onError: error => {
      console.error('[useChat]', error)
    },
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  return (
    <div>
      <div className="messages">
        {messages.map(message => (
          <div key={message.id} data-role={message.role}>
            <strong>{message.role === 'user' ? '我' : 'AI'}：</strong>
            <span>{message.content}</span>
          </div>
        ))}
      </div>

      {error && (
        <div role="alert">
          <p>出错了，请重试</p>
          <button onClick={() => reload()}>重新生成</button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="输入消息..."
          disabled={isLoading}
        />
        {isLoading ? (
          <button type="button" onClick={stop}>停止</button>
        ) : (
          <button type="submit" disabled={!input.trim()}>发送</button>
        )}
      </form>
    </div>
  )
}
```

## 5. Prompt 工程化管理

不要把 System Prompt 硬编码散落在各处。集中管理并版本化。

```ts
// lib/prompts/index.ts
export type PromptKey = 'chat' | 'codeReview' | 'summary'

type PromptDefinition = {
  version: string
  template: string
}

const prompts: Record<PromptKey, PromptDefinition> = {
  chat: {
    version: '2026-06-13',
    template: `你是一个严谨的助手。
规则：
1. 不要编造事实。
2. 不确定时明确说明不确定。
3. 回答使用简体中文。`,
  },
  codeReview: {
    version: '2026-06-13',
    template: `你是一名资深工程师，负责代码审查。
重点关注：安全、边界条件、错误处理。
输出使用简体中文。`,
  },
  summary: {
    version: '2026-06-13',
    template: `请将用户提供的内容总结为要点列表，保持客观。`,
  },
}

export function buildSystemPrompt(key: PromptKey, context?: Record<string, string>): string {
  const definition = prompts[key]
  if (!definition) {
    throw new Error(`Unknown prompt key: ${key}`)
  }

  let result = definition.template

  if (context) {
    for (const [name, value] of Object.entries(context)) {
      result = result.replaceAll(`{{${name}}}`, value)
    }
  }

  return result
}

export function getPromptVersion(key: PromptKey): string {
  return prompts[key]?.version ?? 'unknown'
}
```

好处：

- Prompt 集中，便于审查和回滚。
- 带版本号，便于追踪线上效果。
- 模板支持变量注入，避免拼接混乱。

## 6. 超时与重试（非流式调用）

有些场景需要一次性结果（如批处理）。这时要做超时和重试。

```ts
// lib/ai-call.ts
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

type CallOptions = {
  system: string
  prompt: string
  retries?: number
  timeoutMs?: number
}

export async function callModelWithRetry(options: CallOptions): Promise<string> {
  const { system, prompt, retries = 2, timeoutMs = 30_000 } = options

  let lastError: unknown = null

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const { text } = await generateText({
        model: openai('gpt-4o-mini'),
        system,
        prompt,
        maxTokens: 1024,
        abortSignal: controller.signal,
      })

      clearTimeout(timer)
      return text
    } catch (error) {
      clearTimeout(timer)
      lastError = error
      console.error(`[callModelWithRetry] attempt ${attempt} failed`, error)

      // 指数退避，避免立即重试打爆上游
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 500 * 2 ** attempt))
      }
    }
  }

  throw new Error(`AI call failed after ${retries + 1} attempts: ${String(lastError)}`)
}
```

## 7. 成本控制与额度防护

防止恶意用户刷爆 Token 额度。

关键手段：

1. 登录校验，匿名用户限制更严。
2. 按用户限流，不只按 IP。
3. 限制单次消息长度和历史条数。
4. 记录每个用户的 Token 用量。
5. 超出额度直接拒绝。

```ts
// lib/usage.ts
import { prisma } from '@/lib/prisma'

const DAILY_TOKEN_LIMIT = 100_000

export async function canConsume(userId: string): Promise<boolean> {
  if (!userId) return false

  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const usage = await prisma.aiUsage.findFirst({
      where: { userId, date: today },
    })

    return (usage?.tokens ?? 0) < DAILY_TOKEN_LIMIT
  } catch (error) {
    console.error('[canConsume]', error)
    // 出错时保守拒绝，避免被刷
    return false
  }
}

export async function recordUsage(userId: string, tokens: number): Promise<void> {
  if (!userId || tokens <= 0) return

  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    await prisma.aiUsage.upsert({
      where: { userId_date: { userId, date: today } },
      create: { userId, date: today, tokens },
      update: { tokens: { increment: tokens } },
    })
  } catch (error) {
    console.error('[recordUsage]', error)
  }
}
```

在接口中接入额度判断：

```ts
// 在 streamText 之前
const userId = request.cookies.get('user_id')?.value
if (!userId) {
  return new Response(JSON.stringify({ error: '请先登录' }), { status: 401 })
}

if (!(await canConsume(userId))) {
  return new Response(JSON.stringify({ error: '今日额度已用完' }), { status: 429 })
}
```

流式结束后记录用量：

```ts
const result = streamText({
  model: openai('gpt-4o-mini'),
  system: buildSystemPrompt('chat'),
  messages: parsed.messages,
  onFinish: async ({ usage }) => {
    await recordUsage(userId, usage.totalTokens ?? 0)
  },
})
```

## 8. 真实业务坑点

### 8.1 把 OpenAI Key 放前端

任何 `NEXT_PUBLIC_` 都会泄露。AI 调用必须在服务端。

### 8.2 不限制历史长度

用户可以塞超长 messages，导致 Token 飙升、成本爆炸。务必限制条数和长度。

### 8.3 流式响应被代理缓冲

某些反向代理会缓冲响应，破坏流式效果。需要确认 CDN/代理不缓冲 SSE。

### 8.4 不处理用户中断

用户关闭页面但请求还在跑，浪费 Token。要用 `request.signal` 透传中断。

### 8.5 重试无退避

失败立即重试会放大上游压力。要用指数退避。

### 8.6 Prompt 硬编码

散落各处难维护、难回滚。集中管理并加版本号。

## 9. 生产建议

1. AI 调用只在服务端。
2. 入参用 zod 强校验，限制长度和条数。
3. 流式接口透传 `abortSignal`。
4. 按用户记录用量并限额。
5. 一次性调用要超时 + 指数退避重试。
6. Prompt 集中管理、版本化。
7. 监控成本，异常用量告警。
