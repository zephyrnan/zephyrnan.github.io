---
title: Resend 事务性邮件模板
date: 2026-06-13
categories:
  - 增长、监控与运营
tags:
  - Resend
  - React Email
  - 邮件
---

# Resend 事务性邮件模板

## 1. 事务性邮件是什么

事务性邮件指由用户行为触发的一对一邮件：

```txt
注册 -> 验证码 / 验证链接
下单 -> 收据
重置密码 -> 重置链接
订阅成功 -> 欢迎邮件
```

和营销群发不同，事务性邮件要求：

- 到达率高
- 实时性强
- 跨邮件客户端兼容
- 内容个性化

## 2. 安装依赖

```bash
npm install resend @react-email/components react-email
```

- `resend`：发信 SDK。
- `@react-email/components`：用 React 写邮件模板。

## 3. 用 React Email 写模板

邮件 HTML 兼容性很差，必须用表格布局和内联样式。React Email 帮你处理这些。

```tsx
// emails/VerifyCodeEmail.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
} from '@react-email/components'

type Props = {
  code: string
  expiresInMinutes: number
}

export function VerifyCodeEmail({ code, expiresInMinutes }: Props) {
  return (
    <Html lang="zh">
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>邮箱验证</Heading>
          <Text style={text}>你的验证码是：</Text>
          <Section style={codeBox}>
            <Text style={codeText}>{code}</Text>
          </Section>
          <Text style={text}>验证码将在 {expiresInMinutes} 分钟后过期。</Text>
          <Text style={muted}>如果不是你本人操作，请忽略此邮件。</Text>
        </Container>
      </Body>
    </Html>
  )
}

const body = { backgroundColor: '#f4f4f7', margin: '0', padding: '24px 0' }
const container = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  maxWidth: '480px',
  margin: '0 auto',
  padding: '32px',
}
const heading = { color: '#1a1a1a', fontSize: '20px', margin: '0 0 16px' }
const text = { color: '#444', fontSize: '14px', lineHeight: '22px', margin: '8px 0' }
const muted = { color: '#999', fontSize: '12px', margin: '16px 0 0' }
const codeBox = {
  backgroundColor: '#f0f4ff',
  borderRadius: '6px',
  padding: '16px',
  textAlign: 'center' as const,
  margin: '16px 0',
}
const codeText = { color: '#1e88e5', fontSize: '28px', letterSpacing: '6px', fontWeight: 700, margin: '0' }
```

## 4. 服务端发送邮件

```ts
// lib/email.ts
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { VerifyCodeEmail } from '@/emails/VerifyCodeEmail'

const resend = new Resend(process.env.RESEND_API_KEY || '')
const FROM = process.env.RESEND_FROM || 'noreply@example.com'

type SendResult = { ok: true } | { ok: false; error: string }

export async function sendVerifyCode(to: string, code: string): Promise<SendResult> {
  if (!process.env.RESEND_API_KEY) {
    console.error('[sendVerifyCode] missing RESEND_API_KEY')
    return { ok: false, error: '邮件服务未配置' }
  }

  if (!to.includes('@')) {
    return { ok: false, error: '邮箱格式错误' }
  }

  try {
    const html = await render(VerifyCodeEmail({ code, expiresInMinutes: 10 }))

    const { data, error } = await resend.emails.send({
      from: FROM,
      to,
      subject: '你的验证码',
      html,
    })

    if (error) {
      console.error('[sendVerifyCode] resend error', error)
      return { ok: false, error: '邮件发送失败' }
    }

    console.info('[sendVerifyCode] sent', data?.id)
    return { ok: true }
  } catch (error) {
    console.error('[sendVerifyCode]', error)
    return { ok: false, error: '邮件发送异常' }
  }
}
```

## 5. 触发发信的接口

```ts
// app/api/auth/send-code/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { sendVerifyCode } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

function generateCode(): string {
  // 6 位数字验证码
  return String(Math.floor(100000 + Math.random() * 900000))
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  // 防止刷验证码：同 IP 每分钟最多 3 次
  if (!rateLimit(`send-code:${ip}`, 3, 60_000)) {
    return NextResponse.json({ error: '请求过于频繁，请稍后再试' }, { status: 429 })
  }

  try {
    const body = await request.json().catch(() => null) as { email?: string } | null
    const email = body?.email?.trim()

    if (!email || !email.includes('@') || email.length > 254) {
      return NextResponse.json({ error: '请输入有效邮箱' }, { status: 400 })
    }

    const code = generateCode()

    // 生产中应把 code 存入有 TTL 的存储（Redis），此处省略
    const result = await sendVerifyCode(email, code)

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[POST /api/auth/send-code]', error)
    return NextResponse.json({ error: '服务暂时不可用' }, { status: 500 })
  }
}
```

## 6. 前端发送验证码

```tsx
// app/register/SendCodeButton.tsx
'use client'

import { useState } from 'react'

type Props = {
  email: string
}

export function SendCodeButton({ email }: Props) {
  const [cooldown, setCooldown] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function startCooldown() {
    setCooldown(60)
    const timer = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  async function handleSend() {
    if (loading || cooldown > 0) return
    if (!email.includes('@')) {
      setError('请输入有效邮箱')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.status === 429) throw new Error('发送太频繁，请稍后再试')

      const data = await res.json().catch(() => null) as { error?: string } | null
      if (!res.ok) throw new Error(data?.error || '发送失败')

      startCooldown()
    } catch (error) {
      console.error('[SendCodeButton]', error)
      setError(error instanceof Error ? error.message : '发送失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleSend} disabled={loading || cooldown > 0}>
        {cooldown > 0 ? `${cooldown}s 后重试` : loading ? '发送中...' : '发送验证码'}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  )
}
```

## 7. 真实业务坑点

### 7.1 用普通 HTML/CSS 写邮件

邮件客户端（尤其 Outlook）对 CSS 支持极差。flex、grid 常失效。要用表格布局、内联样式，或直接用 React Email。

### 7.2 发信域名未配置 SPF/DKIM/DMARC

未验证域名发信极易进垃圾箱。必须在 Resend 后台验证发信域名并配置 DNS 记录。

### 7.3 验证码不设过期和频率限制

会被批量刷信、轰炸用户、消耗额度。必须：

- 验证码有 TTL（如 10 分钟）。
- 同 IP / 同邮箱限频。
- 加冷却时间。

### 7.4 把发信放在主流程同步阻塞

如果发信失败导致注册失败，体验差。可考虑异步队列发送，或区分关键邮件与非关键邮件。

### 7.5 直接把错误细节返回前端

邮件服务报错细节不应暴露给用户，只返回友好提示，详细日志记服务端。

## 8. 生产建议

1. 用 React Email 保证跨客户端兼容。
2. 发信域名配置 SPF/DKIM/DMARC。
3. 验证码设 TTL + 限频 + 冷却。
4. 发信 SDK 只在服务端调用。
5. 发信失败记录日志并告警。
6. 关键邮件（验证码、收据）和营销邮件分开通道。
