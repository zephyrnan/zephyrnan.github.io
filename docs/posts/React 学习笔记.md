---
title: React 学习笔记
date: 2026-03-03
categories:
  - 前端开发
tags:
  - React
  - JavaScript
---

# React 学习笔记

[React 官方文档](https://react.dev/)

## 一、React 简介

### 1. React 是什么

- **React** 是由 Facebook（现 Meta）开发并维护的一个用于构建用户界面的 **JavaScript 库**
- React 采用**组件化**的开发模式，将 UI 拆分为独立、可复用的组件
- React 使用**虚拟 DOM**（Virtual DOM）来提高页面渲染性能
- React 遵循**声明式编程**范式，开发者只需描述 UI 应该是什么样子，React 负责高效地更新和渲染

> 💡 **理解要点**：
> - **库 vs 框架**：React 是一个"库"而非"框架"，它只关注视图层（View），路由、状态管理等需要搭配其他库使用
> - **声明式**：你只需要告诉 React "我想要什么"，而不需要手动操作 DOM 去"怎么做"
> - **组件化**：页面中的每一个部分都可以封装为组件，组件可以嵌套、复用
> - **单向数据流**：数据从父组件流向子组件（通过 props），子组件不能直接修改父组件的数据

### 2. React 的特点

- **声明式设计**：以声明式编写 UI，代码更加可读和易于调试
- **组件化**：将 UI 拆分成独立、可复用的组件，每个组件管理自己的状态
- **虚拟 DOM**：通过在内存中维护一个虚拟 DOM 树，减少对真实 DOM 的操作，提升性能
- **JSX 语法**：JavaScript 的语法扩展，允许在 JS 中编写类 HTML 的代码
- **单向数据流**：数据自上而下流动，使应用状态更加可预测
- **跨平台**：通过 React Native 可以开发移动端应用

### 3. 开发环境搭建

**使用 Vite 创建 React 项目（推荐）**

```bash
# 创建项目（JavaScript 版本）
npm create vite@latest my-react-app -- --template react

# 创建项目（TypeScript 版本，推荐）
npm create vite@latest my-react-app -- --template react-ts

# 进入项目目录
cd my-react-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

**项目目录结构**

```
my-react-app/
├── node_modules/         # 依赖包
├── public/               # 静态资源
│   └── vite.svg
├── src/                  # 源代码
│   ├── assets/           # 资源文件
│   ├── App.css           # App 组件样式
│   ├── App.jsx           # App 根组件
│   ├── index.css         # 全局样式
│   └── main.jsx          # 入口文件
├── index.html            # HTML 模板
├── package.json          # 项目配置
└── vite.config.js        # Vite 配置
```

**入口文件 main.jsx**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 创建根节点并渲染 App 组件
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

> 💡 **关于 `import React`**：
> - 从 **React 17** 开始，引入了新的 JSX Transform，单纯编写 JSX **不再需要**显式引入 `import React from 'react'`
> - 只有当你需要使用 React 导出的 API（如 `React.StrictMode`、`React.createElement` 等）时才需要引入
> - 入口文件中因为使用了 `<React.StrictMode>`，所以仍需引入；普通组件文件中可以省略

**使用 TypeScript 的组件示例**

现在的 React 项目几乎默认使用 TypeScript，以下是一个简单的 TS 组件写法：

```tsx
// 定义 Props 类型
interface UserProps {
    name: string;
    age?: number;       // 可选属性
    onLogout: () => void;
}

function User({ name, age = 18, onLogout }: UserProps) {
    return (
        <div>
            <p>{name}，{age}岁</p>
            <button onClick={onLogout}>退出</button>
        </div>
    );
}
```

> 💡 **TypeScript vs PropTypes**：TypeScript 提供**编译时**的类型检查，比运行时的 PropTypes 更强大、更早发现错误，是现代 React 项目的标准选择。

### 4. 开发调试工具

**React Developer Tools**

React 官方提供的浏览器扩展，是开发 React 应用的必备调试工具：

- 安装：在 Chrome / Firefox / Edge 扩展商店搜索 "React Developer Tools" 安装
- 功能：
  - **Components 面板**：以组件树的形式查看页面结构，实时查看和修改每个组件的 props、state、hooks 值
  - **Profiler 面板**：录制组件渲染过程，分析哪些组件渲染耗时过长，定位性能瓶颈

```
浏览器 → F12 打开开发者工具 → 找到 "Components" 和 "Profiler" 两个面板
```

> 💡 **调试技巧**：
> - 在 Components 面板中点击任意组件，可以在右侧直接修改 state 值观察效果
> - Profiler 中的 "Highlight updates" 可以高亮正在重新渲染的组件，帮助发现不必要的渲染

### 5. 环境变量

在 React 项目中经常需要根据环境（开发/生产）使用不同的 API 地址等配置：

**Vite 项目中使用环境变量**

```bash
# .env                  — 所有环境生效
VITE_APP_TITLE=我的应用

# .env.development      — 仅开发环境生效（npm run dev）
VITE_API_URL=http://localhost:3000/api

# .env.production       — 仅生产环境生效（npm run build）
VITE_API_URL=https://api.example.com
```

```jsx
// 在代码中使用（必须以 VITE_ 开头才能在客户端访问）
console.log(import.meta.env.VITE_API_URL);
console.log(import.meta.env.VITE_APP_TITLE);
console.log(import.meta.env.MODE);  // 'development' 或 'production'

// 示例：配置 API 基础地址
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
```

> 💡 **注意事项**：
> - Vite 项目中环境变量必须以 `VITE_` 前缀开头，否则不会暴露给客户端代码（出于安全考虑）
> - `.env` 文件中不要存放密钥、密码等敏感信息，因为它们会被打包到前端代码中
> - `.env.local` 文件会被 Git 忽略，适合存放本地开发的个人配置

## 二、JSX 语法

### 1. JSX 是什么

- **JSX**（JavaScript XML）是 JavaScript 的语法扩展，它允许在 JavaScript 中编写类似 HTML 的标记
- 在 React 17 之前，JSX 会被编译为 `React.createElement()` 调用；从 **React 17+** 开始，JSX 被编译为 `_jsx()`（来自 `react/jsx-runtime`），因此不再需要显式引入 React
- JSX 不是模板语言，它具有 JavaScript 的全部功能

```jsx
// JSX 写法
const element = <h1>Hello, React!</h1>;

// React 17 之前等价写法
// const element = React.createElement('h1', null, 'Hello, React!');

// React 17+ 实际编译为（由构建工具自动处理，无需手动编写）
// import { jsx as _jsx } from 'react/jsx-runtime';
// const element = _jsx('h1', { children: 'Hello, React!' });
```

### 2. JSX 基本规则

```jsx
function App() {
    return (
        // 1. 必须有一个根元素（可以用 <></> 空标签包裹）
        <div>
            {/* 2. 使用 className 代替 class */}
            <h1 className="title">Hello</h1>

            {/* 3. 使用 htmlFor 代替 for */}
            <label htmlFor="username">用户名</label>

            {/* 4. 所有标签必须闭合 */}
            <input type="text" id="username" />
            <br />

            {/* 5. 使用小驼峰命名属性 */}
            <div onClick={handleClick} tabIndex={0}>
                点击我
            </div>

            {/* 6. style 属性接收一个对象，数值类型会自动添加 px */}
            <p style={{ color: 'red', fontSize: 16 }}>
                红色文字
            </p>
        </div>
    );
}
```

> 💡 **JSX 与 HTML 的主要区别**：
> - `class` → `className`
> - `for` → `htmlFor`
> - 事件名使用小驼峰：`onclick` → `onClick`
> - `style` 接收对象而非字符串：`style={{ color: 'red' }}`，数值类型的属性会自动添加 `px`（如 `fontSize: 16` 等价于 `fontSize: '16px'`）
> - 所有标签必须闭合，包括 `<img />`、`<br />`、`<input />`

**Fragment（片段）**

JSX 要求必须有一个根元素，但有时不想引入多余的 DOM 节点（如 `<div>`），可以使用 **Fragment**：

```jsx
import { Fragment } from 'react';

function App() {
    const items = [
        { id: 1, term: 'React', desc: 'UI 库' },
        { id: 2, term: 'Vue', desc: '渐进式框架' },
    ];

    return (
        <dl>
            {items.map(item => (
                // 需要传 key 时，必须使用 <Fragment>，不能用 <>
                <Fragment key={item.id}>
                    <dt>{item.term}</dt>
                    <dd>{item.desc}</dd>
                </Fragment>
            ))}
        </dl>
    );
}

// 不需要 key 时，可以用简写语法 <> </>
function Header() {
    return (
        <>
            <h1>标题</h1>
            <p>副标题</p>
        </>
    );
}
```

> 💡 **`<Fragment>` vs `<>`**：
> - `<>...</>` 是 `<Fragment>...</Fragment>` 的简写，两者功能一致，都不会产生多余的 DOM 节点
> - 区别：`<>` **不能接收任何属性**；当你需要传 `key`（如列表渲染中）时，必须使用完整的 `<Fragment key={...}>`

### 3. JSX 中使用表达式

```jsx
function App() {
    const name = '张三';
    const age = 18;
    const isLogin = true;
    const list = ['React', 'Vue', 'Angular'];

    return (
        <div>
            {/* 变量 */}
            <p>姓名：{name}</p>

            {/* 表达式运算 */}
            <p>年龄：{age + 1}</p>

            {/* 三元表达式 */}
            <p>{isLogin ? '已登录' : '未登录'}</p>

            {/* 调用函数 */}
            <p>{name.toUpperCase()}</p>

            {/* 渲染列表 */}
            <ul>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
```

> 💡 **注意**：
> - JSX 中 `{}` 内只能放**表达式**，不能放**语句**（如 `if`、`for`、`switch`）
> - 表达式：有返回值的代码，如变量、运算、函数调用、三元运算等
> - 语句：不产生值的代码，如 `if`、`for`、`while` 等

### 4. 条件渲染

```jsx
function App() {
    const isLogin = true;
    const role = 'admin';
    const messages = ['消息1', '消息2'];

    return (
        <div>
            {/* 方式一：三元表达式 */}
            {isLogin ? <p>欢迎回来</p> : <p>请登录</p>}

            {/* 方式二：逻辑与 &&（适合只有一种情况） */}
            {isLogin && <p>已登录</p>}

            {/* ⚠️ && 的陷阱：左侧为 0 时会渲染出 "0" */}
            {/* ❌ 错误写法：当 messages.length 为 0 时，页面会显示 "0" */}
            {/* {messages.length && <p>有新消息</p>} */}

            {/* ✅ 正确写法：确保左侧是布尔值 */}
            {messages.length > 0 && <p>有新消息</p>}

            {/* 方式三：提取为函数 */}
            {renderContent(role)}

            {/* 方式四：根据数量显示不同内容 */}
            {messages.length > 0 && (
                <p>你有 {messages.length} 条新消息</p>
            )}
        </div>
    );
}

// 复杂条件逻辑可以提取为函数
function renderContent(role) {
    if (role === 'admin') return <p>管理员面板</p>;
    if (role === 'user') return <p>用户面板</p>;
    return <p>游客面板</p>;
}
```

> 💡 **`&&` 渲染陷阱**：
> - `{count && <Component />}` 当 `count` 为 `0` 时，React 会将 `0` 作为有效的 JSX 渲染到页面上，显示一个孤零零的 "0"
> - 原因：`&&` 运算符在左侧为 **falsy 但非布尔值**（如 `0`、`NaN`、`""`）时，会返回左侧的值本身
> - 解决方案：将左侧**显式转换为布尔值**，如 `{count > 0 && ...}` 或 `{!!count && ...}` 或 `{Boolean(count) && ...}`

### 5. 列表渲染

```jsx
function App() {
    const students = [
        { id: 1, name: '张三', age: 18 },
        { id: 2, name: '李四', age: 20 },
        { id: 3, name: '王五', age: 22 },
    ];

    return (
        <div>
            {/* 使用 map 遍历数组生成 JSX */}
            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        {student.name} - {student.age}岁
                    </li>
                ))}
            </ul>

            {/* 渲染表格 */}
            <table>
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>年龄</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
```

> 💡 **关于 key**：
> - `key` 是 React 识别列表项的唯一标识，帮助 React 高效地更新 DOM
> - `key` 应该是稳定、唯一的值，推荐使用数据的 `id`
> - **不推荐**使用数组索引 `index` 作为 `key`：当列表发生增删或排序时会导致性能问题和 Bug。仅当列表是**静态的且不会发生重排/过滤**时，才勉强可用 `index`（这也是 React 不指定 key 时的默认行为）
> - `key` 只需要在兄弟元素之间唯一，不需要全局唯一

## 三、组件基础

### 1. 函数组件

React 中推荐使用**函数组件**（Function Component）来定义组件

```jsx
// 基本函数组件
function Welcome() {
    return <h1>Hello, React!</h1>;
}

// 箭头函数写法
const Welcome = () => {
    return <h1>Hello, React!</h1>;
};

// 使用组件
function App() {
    return (
        <div>
            <Welcome />
            <Welcome />
        </div>
    );
}
```

> 💡 **组件规范**：
> - 组件名必须以**大写字母**开头（React 以此区分组件和 HTML 标签）
> - 组件必须返回一段 JSX（或 `null`）
> - 每个组件建议单独放一个文件，文件名与组件名一致

### 2. Props（属性）

Props 是组件间通信的方式，用于从**父组件向子组件传递数据**

```jsx
// 子组件：接收 props
function UserCard({ name, age, avatar }) {
    return (
        <div className="user-card">
            <img src={avatar} alt={name} />
            <h2>{name}</h2>
            <p>年龄：{age}</p>
        </div>
    );
}

// 父组件：传递 props
function App() {
    return (
        <div>
            <UserCard
                name="张三"
                age={18}
                avatar="/images/zhangsan.jpg"
            />
            <UserCard
                name="李四"
                age={20}
                avatar="/images/lisi.jpg"
            />
        </div>
    );
}
```

**Props 的特点**

| 特性         | 说明                                   |
| ------------ | -------------------------------------- |
| 只读性       | Props 是只读的，子组件不能修改 props   |
| 单向数据流   | 数据只能从父组件流向子组件             |
| 任意类型     | 可以传递字符串、数字、对象、数组、函数、JSX 等 |
| 默认值       | 可以设置默认值                         |

**设置默认值和 children**

```jsx
// 设置默认值
function Button({ text = '按钮', type = 'primary', children }) {
    return (
        <button className={`btn btn-${type}`}>
            {/* children 代表组件标签之间的内容 */}
            {children || text}
        </button>
    );
}

// 使用
function App() {
    return (
        <div>
            <Button />                        {/* 显示：按钮 */}
            <Button text="提交" />             {/* 显示：提交 */}
            <Button type="danger">删除</Button> {/* 显示：删除 */}
        </div>
    );
}
```

### 3. 事件处理

```jsx
function App() {
    // 基本事件处理
    const handleClick = () => {
        console.log('按钮被点击了');
    };

    // 带参数的事件处理
    const handleDelete = (id) => {
        console.log('删除 ID:', id);
    };

    // 获取事件对象
    const handleChange = (e) => {
        console.log('输入值:', e.target.value);
    };

    // 同时获取事件对象和自定义参数
    const handleItemClick = (id, e) => {
        console.log('ID:', id);
        console.log('事件:', e);
    };

    return (
        <div>
            {/* 直接绑定函数 */}
            <button onClick={handleClick}>点击</button>

            {/* 传递参数（使用箭头函数包裹） */}
            <button onClick={() => handleDelete(1)}>删除</button>

            {/* 输入事件 */}
            <input onChange={handleChange} />

            {/* 同时传参和获取事件对象 */}
            <div onClick={(e) => handleItemClick(1, e)}>点击项</div>
        </div>
    );
}
```

> 💡 **React 事件与原生事件的区别**：
> - React 事件使用小驼峰命名（`onClick` 而非 `onclick`）
> - React 事件处理函数传的是函数引用，而非字符串
> - React 使用**合成事件**（SyntheticEvent），它是对浏览器原生事件的包装，具有跨浏览器兼容性
> - 阻止默认行为必须使用 `e.preventDefault()`，不能通过 `return false`

## 四、State 与 Hooks

### 1. useState — 状态管理

`useState` 是最基本的 Hook，用于在函数组件中添加状态

```jsx
import { useState } from 'react';

function Counter() {
    // 声明状态变量 count，初始值为 0
    // setCount 是更新 count 的函数
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>当前计数：{count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(count - 1)}>-1</button>
            <button onClick={() => setCount(0)}>重置</button>
        </div>
    );
}
```

**useState 的使用规则**

```jsx
function App() {
    // ✅ 基本类型状态
    const [name, setName] = useState('张三');
    const [age, setAge] = useState(18);
    const [isShow, setIsShow] = useState(true);

    // ✅ 对象类型状态（更新时必须创建新对象）
    const [user, setUser] = useState({ name: '张三', age: 18 });
    const updateName = () => {
        setUser({ ...user, name: '李四' });  // 展开运算符创建新对象
    };

    // ✅ 数组类型状态（更新时必须创建新数组）
    const [list, setList] = useState([1, 2, 3]);
    const addItem = () => {
        setList([...list, 4]);  // 展开运算符创建新数组
    };
    const removeItem = (index) => {
        setList(list.filter((_, i) => i !== index));
    };

    // ✅ 函数式更新（基于前一次状态计算新状态）
    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(prev => prev + 1);  // 推荐：基于前一次的值
    };

    return <div>...</div>;
}
```

> 💡 **useState 注意事项**：
> - `set` 函数不会立即更新状态，而是**异步批量更新**。React 18 之后，**所有场景**（包括 `setTimeout`、`Promise`、原生事件等）中的状态更新都会自动批处理（Automatic Batching），避免不必要的多次渲染。React 18 之前只有事件处理函数中的更新才会批处理
> - 更新对象/数组时必须传入**新的引用**（新对象或新数组），直接修改原对象不会触发重新渲染
> - 如果新状态需要依赖旧状态，推荐使用**函数式更新**：`setState(prev => prev + 1)`
> - Hooks 只能在**函数组件的顶层**调用，不能在循环、条件或嵌套函数中调用

### 2. useEffect — 副作用处理

`useEffect` 用于处理组件中的**副作用操作**，如数据请求、订阅、手动操作 DOM 等

```jsx
import { useState, useEffect } from 'react';

function App() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState(null);

    // 情况一：每次渲染后都执行（不传依赖数组）
    useEffect(() => {
        console.log('组件渲染了');
    });

    // 情况二：仅在挂载时执行一次（空依赖数组）
    useEffect(() => {
        console.log('组件挂载了');
        // 适合做：数据请求、事件监听注册等
    }, []);

    // 情况三：依赖项变化时执行
    useEffect(() => {
        console.log('count 变化了:', count);
        document.title = `当前计数：${count}`;
    }, [count]);

    // 情况四：清理副作用（返回清理函数）
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('定时器运行中...');
        }, 1000);

        // 清理函数：组件卸载时或依赖变化前执行
        return () => {
            clearInterval(timer);
            console.log('定时器已清除');
        };
    }, []);

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    );
}
```

**useEffect 执行时机对比**

| 依赖数组         | 执行时机                         | 常见用途               |
| ---------------- | -------------------------------- | ---------------------- |
| 不传             | 每次渲染后                       | 调试/日志              |
| `[]`             | 仅组件挂载时                     | 数据请求、事件监听     |
| `[dep1, dep2]`   | 挂载时 + 依赖项变化时            | 响应特定状态变化       |

> ⚠️ **React 18 严格模式（Strict Mode）下的特殊行为**：
> - 在**开发环境**中，React 18 的严格模式会特意对组件执行 **挂载 → 卸载 → 再挂载** 的流程
> - 这意味着 `useEffect` 中的代码会**执行两次**（包括 `[]` 依赖的 Effect）
> - 这**不是 Bug**，而是 React 故意为之：用于检测你的副作用**清理函数**是否正确编写
> - 如果你的 Effect 在执行两次后出现异常（如数据重复请求、事件重复监听），说明你需要添加/完善清理函数
> - **生产环境不会有此行为**，Effect 只会执行一次

**数据请求示例（含请求取消）**

```jsx
function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 创建 AbortController 用于取消请求
        const controller = new AbortController();

        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://api.example.com/users', {
                    signal: controller.signal,  // 绑定取消信号
                });
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                // 忽略因取消请求导致的错误
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

        // 清理函数：组件卸载时取消未完成的请求
        // 在严格模式下，这能正确处理 Effect 执行两次的情况
        return () => controller.abort();
    }, []);

    if (loading) return <p>加载中...</p>;
    if (error) return <p>错误：{error}</p>;

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

> 💡 **为什么需要 AbortController**：
> - 组件卸载后如果请求还未完成，回调中的 `setState` 会作用在已卸载的组件上
> - 在 React 18 严格模式开发环境下，Effect 会执行两次，不取消的话会发起两次重复请求
> - `AbortController` 是浏览器原生 API，调用 `controller.abort()` 后，`fetch` 会抛出 `AbortError`，通过判断错误名称来忽略它

### 3. useRef — 引用

`useRef` 用于获取 DOM 元素引用或保存不需要触发重新渲染的可变值

```jsx
import { useRef, useState } from 'react';

function App() {
    // 用法一：获取 DOM 元素
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current.focus();       // 聚焦输入框
        inputRef.current.value = '';    // 清空输入框
    };

    // 用法二：保存可变值（修改不会触发重新渲染）
    const timerRef = useRef(null);
    const [count, setCount] = useState(0);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setCount(prev => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
    };

    return (
        <div>
            <input ref={inputRef} />
            <button onClick={focusInput}>聚焦并清空</button>

            <p>计数：{count}</p>
            <button onClick={startTimer}>开始</button>
            <button onClick={stopTimer}>停止</button>
        </div>
    );
}
```

> 💡 **useRef vs useState**：
> - `useState`：值变化时**会**触发重新渲染，适合 UI 相关的数据
> - `useRef`：值变化时**不会**触发重新渲染，适合保存定时器 ID、DOM 引用、上一次状态值等

**forwardRef — 转发 Ref 到子组件**

默认情况下，`ref` 不能直接传给自定义组件。如果需要让父组件获取子组件内部的 DOM 元素，需要使用 `forwardRef`：

```jsx
import { useRef, forwardRef } from 'react';

// 子组件：使用 forwardRef 接收父组件传来的 ref
const CustomInput = forwardRef(function CustomInput({ label }, ref) {
    return (
        <div>
            <label>{label}</label>
            <input ref={ref} />
        </div>
    );
});

// 父组件：可以通过 ref 直接操作子组件内部的 input
function App() {
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <CustomInput ref={inputRef} label="用户名" />
            <button onClick={handleClick}>聚焦输入框</button>
        </div>
    );
}
```

> 💡 **使用场景**：封装通用的表单组件、输入框组件、弹窗组件等，需要让外部控制内部 DOM 时使用。

### 4. useMemo 和 useCallback — 性能优化

```jsx
import { useState, useMemo, useCallback } from 'react';

function App() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    // useMemo：缓存计算结果，依赖不变时不重新计算
    const expensiveResult = useMemo(() => {
        console.log('进行复杂计算...');
        let result = 0;
        for (let i = 0; i < 1000000; i++) {
            result += i;
        }
        return result + count;
    }, [count]);  // 只有 count 变化时才重新计算

    // useCallback：缓存函数引用，依赖不变时返回同一个函数
    const handleClick = useCallback(() => {
        console.log('count:', count);
    }, [count]);  // 只有 count 变化时才创建新函数

    return (
        <div>
            <p>计算结果：{expensiveResult}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <input value={text} onChange={e => setText(e.target.value)} />
            <ChildComponent onClick={handleClick} />
        </div>
    );
}
```

| Hook          | 缓存内容   | 使用场景                       |
| ------------- | ---------- | ------------------------------ |
| `useMemo`     | 计算结果   | 避免重复执行昂贵的计算操作     |
| `useCallback` | 函数引用   | 避免子组件因函数引用变化而重新渲染 |

**React.memo — 组件级别的缓存**

`React.memo` 是一个高阶组件，它会对组件的 props 进行**浅比较**，只有 props 变化时才重新渲染。它与 `useCallback` 配合使用才能真正发挥作用：

```jsx
import { useState, useCallback, memo } from 'react';

// 用 memo 包裹子组件：只有 props 变化时才重新渲染
const ExpensiveChild = memo(function ExpensiveChild({ onClick, data }) {
    console.log('子组件渲染了');
    return (
        <div>
            <p>{data}</p>
            <button onClick={onClick}>点击</button>
        </div>
    );
});

function App() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    // ❌ 不用 useCallback：每次 App 渲染都创建新函数 → memo 失效 → 子组件每次都重新渲染
    // const handleClick = () => console.log('clicked');

    // ✅ 用 useCallback：函数引用稳定 → memo 生效 → 子组件不会因为 text 变化而重新渲染
    const handleClick = useCallback(() => {
        console.log('clicked');
    }, []);

    return (
        <div>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={() => setCount(count + 1)}>count: {count}</button>
            {/* 当只修改 text 时，ExpensiveChild 不会重新渲染 */}
            <ExpensiveChild onClick={handleClick} data={count} />
        </div>
    );
}
```

> 💡 **性能优化三件套的关系**：
> - `React.memo`：缓存**组件**，props 不变就跳过渲染
> - `useCallback`：缓存**函数引用**，确保传给子组件的函数 props 不变
> - `useMemo`：缓存**计算结果**，确保传给子组件的对象/数组 props 不变
> - **三者通常配合使用**：单独使用 `React.memo` 而不稳定 props 引用，memo 等于白做；单独使用 `useCallback` 而子组件没有 `memo`，缓存函数也没意义
> - **不要过度优化**：只在子组件渲染确实昂贵、或列表项数量大时才使用，否则缓存本身也有开销

### 5. useContext — 跨组件通信

`useContext` 用于跨层级组件之间共享数据，避免逐层传递 props（prop drilling）

```jsx
import { createContext, useContext, useState } from 'react';

// 1. 创建 Context
const ThemeContext = createContext();

// 2. 在顶层组件中提供 Context
function App() {
    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={`app ${theme}`}>
                <Header />
                <Main />
            </div>
        </ThemeContext.Provider>
    );
}

// 3. 在任意后代组件中使用 Context
function Header() {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <header>
            <p>当前主题：{theme}</p>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                切换主题
            </button>
        </header>
    );
}

function Main() {
    const { theme } = useContext(ThemeContext);
    return <main>主题色：{theme}</main>;
}
```

> 💡 **useContext 使用场景**：
> - 主题切换（dark/light mode）
> - 用户登录状态
> - 语言国际化（i18n）
> - 全局配置信息
> - 当 props 需要跨越多层组件传递时

### 6. 自定义 Hook

自定义 Hook 是以 `use` 开头的函数，用于**复用有状态的逻辑**

```jsx
import { useState, useEffect } from 'react';

// 自定义 Hook：窗口大小监听
function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}

// 自定义 Hook：本地存储
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

// 自定义 Hook：数据请求
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
}

// 使用自定义 Hook
function App() {
    const { width, height } = useWindowSize();
    const [name, setName] = useLocalStorage('username', '');
    const { data, loading, error } = useFetch('/api/users');

    return (
        <div>
            <p>窗口尺寸：{width} x {height}</p>
            <input value={name} onChange={e => setName(e.target.value)} />
        </div>
    );
}
```

> 💡 **自定义 Hook 规范**：
> - 函数名必须以 `use` 开头
> - 自定义 Hook 内部可以调用其他 Hook
> - 自定义 Hook 用于**复用逻辑**，每个组件使用时状态是**独立**的

## 五、组件通信

### 1. Props Drilling（属性穿透）问题

在了解各种通信方式之前，先理解一个常见的痛点：**Props Drilling**（属性穿透）

```jsx
// ❌ Props Drilling：数据需要经过中间组件层层传递
function App() {
    const [user, setUser] = useState({ name: '张三' });
    return <Layout user={user} />;        // 第1层传递
}

function Layout({ user }) {
    return <Sidebar user={user} />;       // 第2层传递（Layout 自身不需要 user）
}

function Sidebar({ user }) {
    return <UserInfo user={user} />;      // 第3层传递（Sidebar 自身也不需要 user）
}

function UserInfo({ user }) {
    return <p>{user.name}</p>;            // 最终使用者
}
```

当组件层级较深时，中间的组件不得不"接力"传递它们自己并不需要的 props，这会导致：
- 代码冗余，维护困难
- 中间组件与它不关心的数据产生不必要的耦合
- 重构时需要修改所有中间层

这就是为什么我们需要 **Context**（见第四章第 5 节）或**状态管理库**来解决跨层级通信。

### 2. 父传子 — Props

```jsx
// 父组件
function Parent() {
    const [message, setMessage] = useState('Hello');

    return <Child msg={message} />;
}

// 子组件
function Child({ msg }) {
    return <p>{msg}</p>;
}
```

### 3. 子传父 — 回调函数

```jsx
// 父组件
function Parent() {
    const [childData, setChildData] = useState('');

    // 将回调函数传递给子组件
    const getChildData = (data) => {
        setChildData(data);
    };

    return (
        <div>
            <p>子组件传来的数据：{childData}</p>
            <Child onSend={getChildData} />
        </div>
    );
}

// 子组件
function Child({ onSend }) {
    return (
        <button onClick={() => onSend('来自子组件的数据')}>
            发送数据给父组件
        </button>
    );
}
```

### 4. 兄弟组件通信 — 状态提升

```jsx
// 父组件：管理共享状态
function Parent() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <BrotherA count={count} />
            <BrotherB onAdd={() => setCount(count + 1)} />
        </div>
    );
}

// 兄弟 A：显示数据
function BrotherA({ count }) {
    return <p>计数：{count}</p>;
}

// 兄弟 B：修改数据
function BrotherB({ onAdd }) {
    return <button onClick={onAdd}>+1</button>;
}
```

### 5. 跨层级通信 — Context

见第四章第 5 节 `useContext` 的内容。

**通信方式总结**

| 通信方式         | 适用场景                     | 方法                     |
| ---------------- | ---------------------------- | ------------------------ |
| 父 → 子         | 直接父子关系                 | Props                    |
| 子 → 父         | 直接父子关系                 | 回调函数                 |
| 兄弟组件         | 同一父组件下的兄弟           | 状态提升                 |
| 跨层级           | 祖先与深层后代               | Context                  |
| 全局状态         | 复杂应用的全局数据管理       | Redux / Zustand 等       |

## 六、React Router 路由

### 1. 安装与基本使用

```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            {/* 导航链接 */}
            <nav>
                <Link to="/">首页</Link>
                <Link to="/about">关于</Link>
                {/* NavLink 会自动添加 active 类名 */}
                <NavLink to="/contact">联系我们</NavLink>
            </nav>

            {/* NavLink 的 className 支持函数写法，根据激活状态动态设置样式 */}
            <nav>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                    }
                >
                    首页
                </NavLink>

                {/* 配合 Tailwind CSS 使用 */}
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `px-3 py-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-900'}`
                    }
                >
                    关于
                </NavLink>
            </nav>

            {/* 路由出口 */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

function Home() { return <h1>首页</h1>; }
function About() { return <h1>关于</h1>; }
function Contact() { return <h1>联系我们</h1>; }
function NotFound() { return <h1>404 - 页面不存在</h1>; }
```

> 💡 **Link vs NavLink**：
> - `<Link>`：普通导航链接，仅实现跳转
> - `<NavLink>`：导航链接 + 激活状态感知，当链接匹配当前路由时自动添加 `active` 类名
> - `NavLink` 的 `className` 和 `style` 都支持**函数写法**：`className={({ isActive, isPending }) => ...}`，这在配合 Tailwind CSS 动态切换样式时非常实用

### 2. 嵌套路由

```jsx
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* index 路由：默认子路由 */}
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="dashboard" element={<Dashboard />}>
                        <Route index element={<DashboardHome />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

// Layout 组件中使用 Outlet 渲染子路由
import { Outlet, Link } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <nav>
                <Link to="/">首页</Link>
                <Link to="/about">关于</Link>
                <Link to="/dashboard">控制台</Link>
            </nav>
            <main>
                <Outlet />  {/* 子路由渲染出口 */}
            </main>
        </div>
    );
}
```

### 3. 路由参数

```jsx
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

// 路由配置
<Route path="/user/:id" element={<UserDetail />} />

// 动态路由参数
function UserDetail() {
    // 获取路径参数 /user/123 → id = '123'
    const { id } = useParams();

    return <h1>用户 ID：{id}</h1>;
}

// 查询参数
function SearchPage() {
    // 获取查询参数 ?keyword=react&page=1
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const page = searchParams.get('page');

    return (
        <div>
            <p>搜索：{keyword}，第 {page} 页</p>
            <button onClick={() => setSearchParams({ keyword: 'vue', page: '2' })}>
                修改参数
            </button>
        </div>
    );
}

// 编程式导航
function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // 登录成功后跳转
        navigate('/dashboard');
        // 或替换当前历史记录（用户不能点击后退回到登录页）
        navigate('/dashboard', { replace: true });
        // 后退
        navigate(-1);
    };

    return <button onClick={handleLogin}>登录</button>;
}
```

### 4. 路由守卫（受保护路由）

实际项目中，某些页面（如后台管理）需要登录后才能访问，未登录时应重定向到登录页：

```jsx
import { Navigate, Outlet } from 'react-router-dom';

// 路由守卫组件
function ProtectedRoute() {
    // 判断用户是否已登录（这里简化为读取 token）
    const token = localStorage.getItem('token');

    // 未登录：重定向到登录页
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 已登录：渲染子路由
    return <Outlet />;
}

// 路由配置中使用
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                {/* 受保护的路由：需要登录才能访问 */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
```

> 💡 **路由守卫的原理**：利用 React Router 的**布局路由**（Layout Route）特性，`<ProtectedRoute />` 作为父路由不渲染自己的 UI，而是根据认证状态决定渲染 `<Outlet />`（放行）还是 `<Navigate />`（重定向）。

## 七、状态管理

### 1. useReducer — 复杂状态管理

`useReducer` 是 `useState` 的替代方案，适用于有多种操作的复杂状态逻辑

```jsx
import { useReducer } from 'react';

// 1. 定义 reducer 函数
function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, {
                id: Date.now(),
                text: action.payload,
                completed: false
            }];
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        case 'DELETE':
            return state.filter(todo => todo.id !== action.payload);
        default:
            return state;
    }
}

// 2. 在组件中使用
function TodoApp() {
    const [todos, dispatch] = useReducer(todoReducer, []);

    const handleAdd = (text) => {
        dispatch({ type: 'ADD', payload: text });
    };

    const handleToggle = (id) => {
        dispatch({ type: 'TOGGLE', payload: id });
    };

    const handleDelete = (id) => {
        dispatch({ type: 'DELETE', payload: id });
    };

    return (
        <div>
            <button onClick={() => handleAdd('新任务')}>添加</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            onClick={() => handleToggle(todo.id)}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => handleDelete(todo.id)}>删除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

> 💡 **useState vs useReducer**：
> - `useState`：适合简单状态（单一值、简单对象）
> - `useReducer`：适合复杂状态逻辑（多种操作类型、状态间有依赖关系）
> - `useReducer` 将状态逻辑从组件中抽离，便于测试和复用

### 2. 第三方状态管理概览

当应用规模增大，React 内置的状态管理不够用时，可以使用第三方库：

| 库          | 特点                                   | 适用场景           |
| ----------- | -------------------------------------- | ------------------ |
| **Redux Toolkit (RTK)** | 单一数据源、可预测的状态容器，Redux 官方推荐的标准写法 | 大型复杂应用       |
| **Zustand** | 轻量级、API 简洁、无模板代码           | 中小型应用         |
| **Jotai**   | 原子化状态管理、接近 React 原生写法    | 细粒度状态控制     |
| **MobX**    | 响应式编程、自动追踪依赖              | 喜欢响应式范式的场景 |

> 💡 **关于 Redux**：原生的 Redux 写法非常繁琐（需要手动创建 action type、action creator、reducer 等模板代码），目前官方**已不推荐**直接使用原生 Redux。**Redux Toolkit（RTK）** 是现在编写 Redux 的标准方式，它大幅简化了 Redux 的使用。如果项目需要用 Redux，请直接使用 RTK。

**Zustand 快速上手示例**

```bash
npm install zustand
```

```jsx
import { create } from 'zustand';

// 创建 store
const useCounterStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
}));

// 在组件中使用
function Counter() {
    const { count, increment, decrement, reset } = useCounterStore();

    return (
        <div>
            <p>{count}</p>
            <button onClick={increment}>+1</button>
            <button onClick={decrement}>-1</button>
            <button onClick={reset}>重置</button>
        </div>
    );
}
```

## 八、样式处理

### 1. 行内样式

```jsx
function App() {
    const titleStyle = {
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '16px',
    };

    return <h1 style={titleStyle}>标题</h1>;
}
```

### 2. CSS 文件导入

```jsx
// App.css
// .title { color: red; font-size: 24px; }

import './App.css';

function App() {
    return <h1 className="title">标题</h1>;
}
```

### 3. CSS Modules

CSS Modules 可以实现样式的**局部作用域**，避免类名冲突

```css
/* App.module.css */
.title {
    color: blue;
    font-size: 24px;
}

.active {
    color: red;
}
```

```jsx
import styles from './App.module.css';

function App() {
    const isActive = true;

    return (
        <div>
            <h1 className={styles.title}>标题</h1>
            {/* 动态类名 */}
            <p className={isActive ? styles.active : ''}>文字</p>
            {/* 多个类名 */}
            <p className={`${styles.title} ${styles.active}`}>组合样式</p>
        </div>
    );
}
```

### 4. 使用 classnames 库处理动态类名

```bash
npm install classnames
```

```jsx
import classNames from 'classnames';
import styles from './App.module.css';

function App() {
    const isActive = true;
    const isDisabled = false;

    return (
        <button
            className={classNames(styles.btn, {
                [styles.active]: isActive,
                [styles.disabled]: isDisabled,
            })}
        >
            按钮
        </button>
    );
}
```

### 5. Tailwind CSS

Tailwind CSS 是目前 React 生态中最流行的原子化 CSS 框架，通过预定义的工具类直接在 JSX 中编写样式：

```bash
# Vite 项目安装 Tailwind CSS
npm install -D tailwindcss @tailwindcss/vite
```

```js
// vite.config.js
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
});
```

```css
/* src/index.css — 引入 Tailwind */
@import "tailwindcss";
```

```jsx
// 直接在 className 中使用工具类
function Card({ title, description }) {
    return (
        <div className="rounded-lg bg-white p-6 shadow-md hover:shadow-xl transition-shadow">
            <h2 className="mb-2 text-xl font-bold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 active:bg-blue-700">
                了解更多
            </button>
        </div>
    );
}

// 条件样式：配合模板字符串
function Button({ variant = 'primary', children }) {
    const baseClass = 'rounded px-4 py-2 font-medium transition-colors';
    const variantClass = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    };

    return (
        <button className={`${baseClass} ${variantClass[variant]}`}>
            {children}
        </button>
    );
}
```

> 💡 **为什么选择 Tailwind**：
> - 不用起类名、不用切换 CSS 文件，开发效率高
> - 生产环境自动移除未使用的样式，打包体积小
> - 高度可定制（通过 `tailwind.config.js` 配置主题色、间距、断点等）
> - 响应式设计简单：`md:text-lg lg:text-xl`（不同屏幕尺寸不同样式）

> ⚠️ **版本说明**：以上安装和配置方式是 **Tailwind CSS v4** 的最新写法（使用 `@import "tailwindcss"` 和 `@tailwindcss/vite` 插件）。如果你参考的是旧版本教程（v3 及以下），配置方式会有所不同（v3 使用 `@tailwind base; @tailwind components; @tailwind utilities;` 指令，且需要 `postcss` 和 `autoprefixer` 配合）。请注意区分版本。

### 6. 样式方案对比

| 方案               | 作用域   | 优点                               | 缺点                           | 适用场景           |
| ------------------ | -------- | ---------------------------------- | ------------------------------ | ------------------ |
| **CSS 文件导入**   | 全局     | 简单直接、无学习成本               | 类名易冲突、难维护             | 小型项目、原型开发 |
| **CSS Modules**    | 局部     | 自动生成唯一类名、无冲突           | 动态样式不够灵活               | 中型项目           |
| **Tailwind CSS**   | 局部     | 开发效率高、体积小、高度可定制     | 类名较长、有一定学习曲线       | 各种规模项目（推荐）|
| **CSS-in-JS**      | 局部     | JS 中直接写样式、动态样式强大      | 运行时开销、包体积增加         | 组件库、需要强动态样式 |
| **行内样式**       | 局部     | 零配置、完全动态                   | 不支持伪类/媒体查询、难复用    | 简单的动态样式     |

> 💡 **CSS-in-JS** 代表库有 **styled-components** 和 **Emotion**，它们允许在 JS 中用模板字符串写 CSS 并自动生成唯一类名。但由于运行时性能开销的问题，近年来社区趋势是逐渐转向 **Tailwind CSS** 或零运行时方案。

## 九、常用开发模式

### 1. 受控组件与非受控组件

**受控组件**：表单元素的值由 React 状态控制

```jsx
function ControlledForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        gender: 'male',
        agree: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('提交数据：', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />
            <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="male">男</option>
                <option value="female">女</option>
            </select>
            <label>
                <input
                    name="agree"
                    type="checkbox"
                    checked={formData.agree}
                    onChange={handleChange}
                />
                同意协议
            </label>
            <button type="submit">提交</button>
        </form>
    );
}
```

**非受控组件**：使用 `ref` 直接获取 DOM 元素的值

```jsx
function UncontrolledForm() {
    const usernameRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('用户名：', usernameRef.current.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input ref={usernameRef} defaultValue="默认值" />
            <button type="submit">提交</button>
        </form>
    );
}
```

> 💡 **受控 vs 非受控**：
> - **受控组件**（推荐）：React 完全控制表单数据，便于数据验证和处理
> - **非受控组件**：更接近传统 HTML 表单，适合简单场景或集成第三方库

### 2. 组件懒加载

```jsx
import { lazy, Suspense } from 'react';

// 懒加载组件（按需加载，减少首屏加载时间）
const LazyAbout = lazy(() => import('./pages/About'));
const LazyDashboard = lazy(() => import('./pages/Dashboard'));

function App() {
    return (
        <Suspense fallback={<div>页面加载中...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<LazyAbout />} />
                <Route path="/dashboard" element={<LazyDashboard />} />
            </Routes>
        </Suspense>
    );
}
```

### 3. 错误边界

React 中可以使用**错误边界**（Error Boundary）捕获子组件中的 JavaScript 错误，防止整个应用崩溃

**原理：类组件实现（了解原理）**

```jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('组件错误：', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || <h1>出错了，请稍后重试</h1>
            );
        }
        return this.props.children;
    }
}
```

**推荐：使用 react-error-boundary 库**

虽然 React 核心仍需类组件来实现错误边界，但在函数组件主流的今天，社区标准做法是使用 `react-error-boundary` 库，它提供了更优雅的 Hooks API：

```bash
npm install react-error-boundary
```

```jsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div>
            <p>出错了：{error.message}</p>
            <button onClick={resetErrorBoundary}>重试</button>
        </div>
    );
}

function App() {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                // 重置应用状态
            }}
        >
            <SomeComponent />
        </ErrorBoundary>
    );
}
```

> 💡 **注意**：错误边界无法捕获以下错误：
> - 事件处理函数中的错误（需要用 `try/catch`）
> - 异步代码中的错误（如 `setTimeout`、`Promise`）
> - 服务端渲染时的错误
> - 错误边界自身抛出的错误

## 十、Hooks 规则与最佳实践

### 1. Hooks 使用规则

- **只在函数组件的最顶层调用 Hook**：不能在循环、条件语句或嵌套函数中调用
- **只在 React 函数组件或自定义 Hook 中调用**：不能在普通函数中调用

```jsx
function App() {
    // ✅ 正确：在顶层调用
    const [count, setCount] = useState(0);

    // ❌ 错误：在条件中调用
    // if (count > 0) {
    //     const [name, setName] = useState('');
    // }

    // ❌ 错误：在循环中调用
    // for (let i = 0; i < 3; i++) {
    //     useEffect(() => {});
    // }

    return <div>{count}</div>;
}
```

### 2. 常用 Hooks 速查表

| Hook              | 用途                           | 返回值                   |
| ----------------- | ------------------------------ | ------------------------ |
| `useState`        | 状态管理                       | `[state, setState]`      |
| `useEffect`       | 副作用处理                     | 无                       |
| `useRef`          | DOM 引用 / 可变值              | `{ current: value }`     |
| `useContext`       | 跨组件通信                     | Context 值               |
| `useReducer`      | 复杂状态管理                   | `[state, dispatch]`      |
| `useMemo`         | 缓存计算结果                   | 缓存值                   |
| `useCallback`     | 缓存函数引用                   | 缓存函数                 |
| `useId`           | 生成唯一 ID                    | 唯一 ID 字符串           |
| `useTransition`   | 标记非紧急更新，优化性能       | `[isPending, startTransition]` |
| `useDeferredValue` | 延迟更新非紧急值              | 延迟后的值               |
| `useLayoutEffect` | 同步执行副作用（DOM 更新后）   | 无                       |

### 3. React 18 新 Hooks

#### useId — 生成唯一 ID

用于在服务端和客户端生成一致的唯一 ID，常用于无障碍属性（`aria-*`）和表单关联

```jsx
import { useId } from 'react';

function FormField({ label }) {
    const id = useId();

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input id={id} />
        </div>
    );
}

// 多次使用，每次生成不同的 ID
function App() {
    return (
        <>
            <FormField label="用户名" />  {/* id=":r0:" */}
            <FormField label="密码" />    {/* id=":r1:" */}
        </>
    );
}
```

#### useTransition — 非紧急更新

将某些状态更新标记为"非紧急"的**过渡更新**，让 React 优先处理更紧急的更新（如用户输入），从而保持界面响应性

```jsx
import { useState, useTransition } from 'react';

function SearchPage() {
    const [query, setQuery] = useState('');
    const [list, setList] = useState([]);
    const [isPending, startTransition] = useTransition();

    const handleChange = (e) => {
        const value = e.target.value;
        // 紧急更新：立即响应输入
        setQuery(value);

        // 非紧急更新：列表过滤可以稍后处理
        startTransition(() => {
            const filtered = hugeList.filter(item =>
                item.includes(value)
            );
            setList(filtered);
        });
    };

    return (
        <div>
            <input value={query} onChange={handleChange} />
            {isPending && <p>加载中...</p>}
            <ul>
                {list.map(item => <li key={item}>{item}</li>)}
            </ul>
        </div>
    );
}
```

> 💡 **useTransition vs 防抖（Debounce）**：
> - **防抖**：用户停止输入一段时间后才执行搜索 — 是"延迟执行"策略，用户输入期间完全不搜索
> - **useTransition**：用户每次输入都会触发搜索，但搜索结果的渲染被标记为低优先级 — 是"降低优先级"策略，React 会优先保持输入框的响应，在空闲时再渲染列表
> - **区别**：防抖牺牲了即时反馈（用户需要等一下才能看到结果），useTransition 保持了即时反馈（输入流畅的同时结果也在更新，只是可能稍有延迟），这正是 React **并发模式**的优势所在
> - **可以结合使用**：对于网络请求用防抖减少请求次数，对于本地计算/渲染用 useTransition 保持响应性

#### useDeferredValue — 延迟更新

`useDeferredValue` 接受一个值并返回其"延迟版本"，当有更紧急的更新时，延迟值会暂时保持旧值

```jsx
import { useState, useDeferredValue, useMemo } from 'react';

function SearchResults({ query }) {
    // query 频繁变化时，deferredQuery 会延迟更新
    const deferredQuery = useDeferredValue(query);
    const isStale = query !== deferredQuery;

    const results = useMemo(() => {
        return hugeList.filter(item => item.includes(deferredQuery));
    }, [deferredQuery]);

    return (
        <ul style={{ opacity: isStale ? 0.5 : 1 }}>
            {results.map(item => <li key={item}>{item}</li>)}
        </ul>
    );
}
```

> 💡 **useTransition vs useDeferredValue**：
> - `useTransition`：你**能控制**状态更新的代码时使用，用 `startTransition` 包裹非紧急的 `setState`
> - `useDeferredValue`：你**无法控制**值的来源时使用（如来自 props），让 React 自动延迟处理

### 4. 项目开发建议

- **组件拆分**：当组件超过 200 行时考虑拆分为更小的子组件
- **状态管理**：状态应放在需要使用它的最近公共父组件中
- **命名规范**：组件用大驼峰（`UserList`），Hook 以 `use` 开头（`useAuth`），事件处理以 `handle` 开头（`handleClick`）
- **文件组织**：按功能/页面组织目录结构，而非按文件类型

```
src/
├── components/       # 公共组件
│   ├── Button/
│   │   ├── index.jsx
│   │   └── index.module.css
│   └── Header/
├── pages/            # 页面组件
│   ├── Home/
│   └── About/
├── hooks/            # 自定义 Hooks
├── utils/            # 工具函数
├── api/              # 接口请求
├── store/            # 状态管理
├── App.jsx
└── main.jsx
```

## 十一、React 的未来方向

### React Server Components（RSC）

React 正在向**服务端组件**（React Server Components）演进，这是 React 架构层面的重大变革：

- **服务端组件**（Server Components）：在服务端运行，不会打包到客户端 JavaScript 中，可以直接访问数据库、文件系统等后端资源，大幅减少客户端 JS 体积
- **客户端组件**（Client Components）：传统的 React 组件，在浏览器中运行，处理交互和状态

```jsx
// 服务端组件（默认）—— 在服务器上渲染，零客户端 JS
async function ArticleList() {
    const articles = await db.query('SELECT * FROM articles');  // 直接访问数据库
    return (
        <ul>
            {articles.map(a => <li key={a.id}>{a.title}</li>)}
        </ul>
    );
}

// 客户端组件 —— 需要在文件顶部声明 'use client'
'use client';
import { useState } from 'react';

function LikeButton() {
    const [liked, setLiked] = useState(false);
    return <button onClick={() => setLiked(!liked)}>{liked ? '❤️' : '🤍'}</button>;
}
```

> 💡 **了解即可**：RSC 目前主要通过 **Next.js** 等框架使用（Next.js App Router 已深度集成 RSC）。作为初学者，先掌握本笔记中的客户端 React 基础，后续再学习 RSC 和全栈框架。



