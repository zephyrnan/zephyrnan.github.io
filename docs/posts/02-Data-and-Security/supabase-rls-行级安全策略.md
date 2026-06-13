---
title: Supabase RLS 行级安全策略
date: 2026-06-13
categories:
  - 现代数据流与安全
tags:
  - Supabase
  - RLS
  - PostgreSQL
---

# Supabase RLS 行级安全策略

## 1. RLS 是什么

RLS，全称 Row Level Security，行级安全策略。

它的作用是：

> 即使用户能访问同一张表，也只能读写符合策略的行。

在 Supabase 中，前端可以直接访问数据库 API。如果没有 RLS，用户可能读到别人的数据。

## 2. 基础表结构

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  created_at timestamptz not null default now()
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index notes_user_id_idx on public.notes(user_id);
```

## 3. 开启 RLS

```sql
alter table public.profiles enable row level security;
alter table public.notes enable row level security;
```

开启 RLS 后，如果没有策略，默认谁都访问不了。

## 4. 用户只能读自己的 profile

```sql
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);
```

## 5. 用户只能更新自己的 profile

```sql
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);
```

`using` 和 `with check` 区别：

- `using`：限制能操作哪些已有行。
- `with check`：限制新写入或更新后的行必须满足什么条件。

## 6. notes 表完整策略

```sql
create policy "notes_select_own"
on public.notes
for select
to authenticated
using (auth.uid() = user_id);

create policy "notes_insert_own"
on public.notes
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "notes_update_own"
on public.notes
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "notes_delete_own"
on public.notes
for delete
to authenticated
using (auth.uid() = user_id);
```

## 7. 前端 Supabase Client

```ts
// lib/supabase/browser.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error('Supabase browser env is missing')
  }

  return createBrowserClient(url, anonKey)
}
```

```tsx
// app/notes/NotesClient.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/browser'

type Note = {
  id: string
  title: string
  content: string
  created_at: string
}

export function NotesClient() {
  const [notes, setNotes] = useState<Note[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const supabase = createClient()

    async function loadNotes() {
      try {
        const { data, error } = await supabase
          .from('notes')
          .select('id,title,content,created_at')
          .order('created_at', { ascending: false })

        if (error) throw error
        if (mounted) setNotes((data ?? []) as Note[])
      } catch (error) {
        console.error('[NotesClient]', error)
        if (mounted) setError('加载笔记失败')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadNotes()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <p>加载中...</p>
  if (error) return <p role="alert">{error}</p>

  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </li>
      ))}
    </ul>
  )
}
```

## 8. 服务端 Supabase Client

```ts
// lib/supabase/server.ts
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function createClient() {
  const cookieStore = await cookies()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error('Supabase server env is missing')
  }

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch (error) {
          console.error('[supabase setAll]', error)
        }
      },
    },
  })
}
```

```tsx
// app/notes/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function NotesPage() {
  const supabase = await createClient()

  try {
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData.user) {
      redirect('/login')
    }

    const { data, error } = await supabase
      .from('notes')
      .select('id,title,content,created_at')
      .order('created_at', { ascending: false })

    if (error) throw error

    return (
      <main>
        <h1>我的笔记</h1>
        <ul>
          {(data ?? []).map(note => (
            <li key={note.id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      </main>
    )
  } catch (error) {
    console.error('[NotesPage]', error)
    return <p>笔记加载失败，请稍后重试。</p>
  }
}
```

## 9. Server Action 新增笔记

```ts
// app/notes/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type CreateNoteState = {
  ok: boolean
  message: string
}

export async function createNote(
  _prevState: CreateNoteState,
  formData: FormData,
): Promise<CreateNoteState> {
  const title = String(formData.get('title') || '').trim()
  const content = String(formData.get('content') || '').trim()

  if (title.length < 1 || title.length > 80) {
    return { ok: false, message: '标题需在 1 到 80 字之间' }
  }

  if (content.length < 1 || content.length > 5000) {
    return { ok: false, message: '内容需在 1 到 5000 字之间' }
  }

  try {
    const supabase = await createClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData.user) {
      return { ok: false, message: '请先登录' }
    }

    const { error } = await supabase.from('notes').insert({
      user_id: userData.user.id,
      title,
      content,
    })

    if (error) throw error

    revalidatePath('/notes')
    return { ok: true, message: '创建成功' }
  } catch (error) {
    console.error('[createNote]', error)
    return { ok: false, message: '创建失败，请稍后重试' }
  }
}
```

```tsx
// app/notes/CreateNoteForm.tsx
'use client'

import { useActionState } from 'react'
import { createNote, type CreateNoteState } from './actions'

const initialState: CreateNoteState = { ok: false, message: '' }

export function CreateNoteForm() {
  const [state, action, pending] = useActionState(createNote, initialState)

  return (
    <form action={action}>
      <input name="title" required maxLength={80} placeholder="标题" />
      <textarea name="content" required maxLength={5000} placeholder="内容" />
      <button disabled={pending}>{pending ? '创建中...' : '创建笔记'}</button>
      {state.message && <p role="status">{state.message}</p>}
    </form>
  )
}
```

## 10. Service Role 的危险性

`SUPABASE_SERVICE_ROLE_KEY` 会绕过 RLS，只能放在服务端。

适合场景：

- Webhook 回调
- 管理后台定时任务
- 服务端批处理

不适合：

- 浏览器代码
- `NEXT_PUBLIC_*` 环境变量
- 普通用户直接请求的 API 中无校验使用

```ts
// lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error('Supabase admin env is missing')
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  })
}
```

## 11. RLS 真实业务坑点

### 11.1 只写 select，忘记 insert/update/delete

每一种操作都要单独写策略。

### 11.2 insert 忘记 `with check`

如果没有 `with check (auth.uid() = user_id)`，用户可能插入属于别人的数据。

### 11.3 管理员策略过宽

不要简单写：

```sql
using (true)
```

更安全的方式是单独维护角色表：

```sql
create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'admin'))
);

create policy "admin_select_all_notes"
on public.notes
for select
to authenticated
using (
  exists (
    select 1
    from public.user_roles
    where user_roles.user_id = auth.uid()
    and user_roles.role = 'admin'
  )
);
```

### 11.4 以为后端校验可以替代 RLS

如果前端直接使用 Supabase API，RLS 是最后防线，不能省。

## 12. 生产建议

1. 所有用户数据表默认开启 RLS。
2. 每张表按 CRUD 分别写策略。
3. 前端用 anon key，服务端敏感任务才用 service role。
4. insert/update 必须关注 `with check`。
5. 复杂权限建议用角色表，不要把权限硬编码在前端。
6. 迁移文件中保存 SQL 策略，避免只在控制台手动配置。
