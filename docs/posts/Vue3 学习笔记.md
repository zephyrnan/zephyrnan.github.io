---
title: Vue3 学习笔记
date: 2025-11-20
categories:
  - 前端开发
tags:
  - Vue3
  - TypeScript
---

# Vue3 学习笔记

[🪩 尚硅谷Vue3入门到实战，最新版vue3+TypeScript前端开发教程](https://www.bilibili.com/video/BV1Za4y1r7KE)

## 一、Vue3 简介

### 1. Vue3 是什么

- Vue（读音 /vjuː/，类似于 view）是一套用于构建用户界面的**渐进式 JavaScript 框架**
- Vue3 是 Vue.js 的最新主版本，于 2020 年 9 月发布
- Vue3 在保持 Vue2 核心特性的基础上，进行了全面的性能优化和功能增强

> 💡 **理解"渐进式框架"**：
> - **渐进式**意味着你可以根据项目需求逐步采用 Vue 的功能
> - 可以从简单的页面交互开始，逐步引入组件、路由、状态管理等功能
> - 不需要一次性学习所有内容，学习曲线平缓
> - 既可以作为库使用（只用核心功能），也可以作为框架使用（全家桶）

### 2. Vue3 的特点

**性能提升**
- 打包体积减少 41%
- 初次渲染快 55%，更新渲染快 133%
- 内存使用减少 54%

**新特性**
- Composition API（组合式 API）
- 更好的 TypeScript 支持
- 新的内置组件：Teleport、Suspense、Fragment
- 更好的 Tree-shaking 支持
- 自定义渲染器

**源码优化**
- 使用 Proxy 代替 Object.defineProperty 实现响应式
- 重写虚拟 DOM 的实现和 Tree-Shaking

> 💡 **Proxy vs Object.defineProperty**：
> - **Vue2 的 Object.defineProperty**：
>   - 需要遍历对象的每个属性进行劫持
>   - 无法监听新增/删除属性，需要用 `$set`/`$delete`
>   - 无法监听数组索引和 length 的变化
> - **Vue3 的 Proxy**：
>   - 直接代理整个对象，无需遍历属性
>   - 可以监听动态新增的属性
>   - 可以监听数组的变化
>   - 性能更好，内存占用更少

### 3. Vue3 vs Vue2

| 特性 | Vue2 | Vue3 |
|------|------|------|
| 响应式原理 | Object.defineProperty | Proxy |
| API 风格 | Options API | Composition API + Options API |
| 性能 | 较慢 | 更快 |
| TypeScript 支持 | 一般 | 完善 |
| 组件 | 单根节点 | 多根节点（Fragment） |
| 生命周期 | beforeCreate、created 等 | setup、onMounted 等 |
| 源码 | Flow | TypeScript |

### 4. 渐进式框架

Vue 可以根据项目需求灵活使用：

- **声明式渲染**：最基础的功能，在 HTML 中绑定数据
- **组件系统**：构建大型应用的基础
- **客户端路由**：Vue Router 实现单页应用
- **状态管理**：Pinia/Vuex 管理复杂状态
- **构建工具**：Vite/Vue CLI 构建项目

## 二、创建 Vue3 项目

### 1. 使用 Vite 创建（推荐）

```bash
# npm
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue

# 使用 TypeScript 模板
npm create vite@latest my-vue-app -- --template vue-ts
```

**项目结构**

```
my-vue-app/
├── node_modules/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
└── vite.config.js
```

### 2. 使用 Vue CLI 创建

```bash
# 安装 Vue CLI
npm install -g @vue/cli

# 创建项目
vue create my-vue-app

# 选择 Vue3 预设或手动选择特性
```

### 3. 通过 CDN 使用

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Vue3 CDN</title>
</head>
<body>
    <div id="app">
        <h1>{{ message }}</h1>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp } = Vue;

        createApp({
            data() {
                return {
                    message: 'Hello Vue3!'
                }
            }
        }).mount('#app');
    </script>
</body>
</html>
```

// 效果: 页面显示 "Hello Vue3!" 的标题

> ⚠️ **注意事项**:
> - CDN方式仅适用于学习和原型开发，生产环境建议使用构建工具
> - 需要网络连接才能加载Vue库
> - 不支持单文件组件(.vue文件)
> - 性能不如构建后的版本

> 🎯 **实际应用场景**:
> ```html
> <!-- 场景1: 快速原型验证 -->
> <!-- 场景2: 为现有页面添加交互功能 -->
> <!-- 场景3: 学习Vue基础概念 -->
> ```

### 4. main.js 入口文件

```js
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例
const app = createApp(App)

// 全局配置
app.config.errorHandler = (err) => {
    console.error(err)
}

// 挂载应用
app.mount('#app')
```

## 三、模板语法

### 1. 文本插值

```vue
<template>
    <!-- 双大括号语法（Mustache 语法） -->
    <p>{{ message }}</p>

    <!-- 支持 JavaScript 表达式 -->
    <p>{{ number + 1 }}</p>
    <p>{{ ok ? 'YES' : 'NO' }}</p>
    <p>{{ message.split('').reverse().join('') }}</p>
</template>

<script>
export default {
    data() {
        return {
            message: 'Hello Vue3!',
            number: 10,
            ok: true
        }
    }
}
</script>
```

### 2. 原始 HTML

```vue
<template>
    <!-- v-html 指令 -->
    <div v-html="rawHtml"></div>
</template>

<script>
export default {
    data() {
        return {
            rawHtml: '<span style="color: red;">红色文字</span>'
        }
    }
}
</script>
```

### 3. 属性绑定

```vue
<template>
    <!-- v-bind 指令，简写为 : -->
    <div v-bind:id="dynamicId"></div>
    <div :id="dynamicId"></div>

    <!-- 绑定多个属性 -->
    <div v-bind="objectOfAttrs"></div>

    <!-- 动态属性名 -->
    <div :[attributeName]="value"></div>

    <!-- 布尔型属性 -->
    <button :disabled="isDisabled">按钮</button>
</template>

<script>
export default {
    data() {
        return {
            dynamicId: 'my-id',
            objectOfAttrs: {
                id: 'container',
                class: 'wrapper'
            },
            attributeName: 'href',
            value: 'https://vuejs.org',
            isDisabled: false
        }
    }
}
</script>
```

### 4. 条件渲染

```vue
<template>
    <!-- v-if、v-else-if、v-else -->
    <div v-if="type === 'A'">A</div>
    <div v-else-if="type === 'B'">B</div>
    <div v-else>C</div>

    <!-- v-show -->
    <div v-show="isShow">显示/隐藏</div>

    <!-- template 上使用 v-if -->
    <template v-if="ok">
        <h1>标题</h1>
        <p>段落</p>
    </template>
</template>

<script>
export default {
    data() {
        return {
            type: 'A',
            isShow: true,
            ok: true
        }
    }
}
</script>
```

**v-if vs v-show**

- `v-if`：真正的条件渲染，会销毁和重建 DOM，有更高的切换开销
- `v-show`：只是 CSS display 的切换，有更高的初始渲染开销
- 频繁切换用 `v-show`，运行时条件很少改变用 `v-if`

> ⚠️ **注意事项**:
> - **v-if 是惰性的**:如果初始条件为false,则不会渲染
> - **v-show 总是会渲染**:只是用CSS隐藏,DOM始终存在
> - **v-if 可以配合 v-else**:v-show不能
> - **v-if 有更高的切换成本**:每次都要销毁/重建DOM
> - **v-show 有更高的初始成本**:无论条件如何都会渲染
>
> ```vue
> <!-- 性能对比示例 -->
> <template>
>     <!-- 频繁切换(如tab切换):使用v-show -->
>     <div v-show="activeTab === 'tab1'">Tab 1 内容</div>
>     <div v-show="activeTab === 'tab2'">Tab 2 内容</div>
>
>     <!-- 很少改变(如权限控制):使用v-if -->
>     <div v-if="user.isAdmin">管理员面板</div>
>     <div v-if="user.isPremium">高级功能</div>
>
>     <!-- v-if适合条件渲染+懒加载 -->
>     <HeavyComponent v-if="showHeavy" />
> </template>
> ```

> 🎯 **实际应用场景**:
> ```vue
> <!-- 场景1:Tab切换(频繁) - 使用v-show -->
> <template>
>     <div class="tabs">
>         <button @click="tab = 'home'">首页</button>
>         <button @click="tab = 'profile'">个人</button>
>         <button @click="tab = 'settings'">设置</button>
>     </div>
>     <div v-show="tab === 'home'">首页内容</div>
>     <div v-show="tab === 'profile'">个人内容</div>
>     <div v-show="tab === 'settings'">设置内容</div>
> </template>
>
> <!-- 场景2:权限控制(不常变) - 使用v-if -->
> <template>
>     <nav>
>         <router-link to="/">首页</router-link>
>         <router-link v-if="isLoggedIn" to="/dashboard">控制台</router-link>
>         <router-link v-if="isAdmin" to="/admin">管理</router-link>
>     </nav>
> </template>
>
> <!-- 场景3:条件加载组件 - 使用v-if避免初始渲染 -->
> <template>
>     <button @click="showModal = true">打开弹窗</button>
>     <Modal v-if="showModal" @close="showModal = false" />
> </template>
> ```

### 5. 列表渲染

```vue
<template>
    <!-- 遍历数组 -->
    <ul>
        <li v-for="(item, index) in items" :key="item.id">
            {{ index }} - {{ item.name }}
        </li>
    </ul>

    <!-- 遍历对象 -->
    <ul>
        <li v-for="(value, key, index) in obj" :key="key">
            {{ index }}. {{ key }}: {{ value }}
        </li>
    </ul>

    <!-- 遍历数字 -->
    <span v-for="n in 10" :key="n">{{ n }}</span>

    <!-- template 上使用 v-for -->
    <template v-for="item in items" :key="item.id">
        <li>{{ item.name }}</li>
        <li class="divider"></li>
    </template>
</template>

<script>
export default {
    data() {
        return {
            items: [
                { id: 1, name: '张三' },
                { id: 2, name: '李四' }
            ],
            obj: {
                name: '张三',
                age: 18,
                city: '北京'
            }
        }
    }
}
</script>
```

**key 的重要性**

- Vue 使用 key 来跟踪节点的身份，从而重用和重新排序现有元素
- 不要使用索引作为 key（会导致性能问题）
- key 必须是唯一的

### 6. 事件处理

```vue
<template>
    <!-- 内联事件处理器 -->
    <button @click="count++">{{ count }}</button>

    <!-- 方法事件处理器 -->
    <button @click="handleClick">点击</button>

    <!-- 传递参数 -->
    <button @click="say('hello')">Say hello</button>

    <!-- 访问事件对象 -->
    <button @click="warn('警告', $event)">警告</button>

    <!-- 事件修饰符 -->
    <form @submit.prevent="onSubmit">
        <button type="submit">提交</button>
    </form>

    <!-- 按键修饰符 -->
    <input @keyup.enter="onEnter" />
</template>

<script>
export default {
    data() {
        return {
            count: 0
        }
    },
    methods: {
        handleClick() {
            console.log('点击了')
        },
        say(message) {
            alert(message)
        },
        warn(message, event) {
            if (event) {
                event.preventDefault()
            }
            alert(message)
        },
        onSubmit() {
            console.log('提交表单')
        },
        onEnter() {
            console.log('按下回车')
        }
    }
}
</script>
```

**事件修饰符**

```vue
<!-- 阻止默认行为 -->
<a @click.prevent="handleClick">链接</a>

<!-- 阻止事件冒泡 -->
<div @click.stop="handleClick">点击</div>

<!-- 事件只触发一次 -->
<button @click.once="handleClick">只触发一次</button>

<!-- 捕获模式 -->
<div @click.capture="handleClick">捕获</div>

<!-- 只当事件在该元素本身触发时才触发 -->
<div @click.self="handleClick">只在自己上触发</div>

<!-- 链式调用 -->
<div @click.stop.prevent="handleClick">组合</div>
```

**按键修饰符**

```vue
<!-- 按键别名 -->
<input @keyup.enter="submit" />
<input @keyup.tab="nextInput" />
<input @keyup.delete="deleteItem" />
<input @keyup.esc="cancel" />
<input @keyup.space="addSpace" />
<input @keyup.up="moveUp" />
<input @keyup.down="moveDown" />
<input @keyup.left="moveLeft" />
<input @keyup.right="moveRight" />

<!-- 系统修饰键 -->
<input @keyup.ctrl="handleCtrl" />
<input @keyup.alt="handleAlt" />
<input @keyup.shift="handleShift" />
<input @keyup.meta="handleMeta" />

<!-- 组合使用 -->
<input @keyup.ctrl.enter="submit" />
```

### 7. 表单输入绑定

```vue
<template>
    <!-- 文本输入 -->
    <input v-model="text" placeholder="输入文本" />
    <p>{{ text }}</p>

    <!-- 多行文本 -->
    <textarea v-model="message"></textarea>

    <!-- 复选框 -->
    <input type="checkbox" v-model="checked" />
    <label>{{ checked }}</label>

    <!-- 多个复选框 -->
    <input type="checkbox" value="张三" v-model="checkedNames" />
    <input type="checkbox" value="李四" v-model="checkedNames" />
    <p>{{ checkedNames }}</p>

    <!-- 单选框 -->
    <input type="radio" value="male" v-model="gender" />
    <input type="radio" value="female" v-model="gender" />
    <p>{{ gender }}</p>

    <!-- 下拉框 -->
    <select v-model="selected">
        <option value="A">A</option>
        <option value="B">B</option>
    </select>

    <!-- v-model 修饰符 -->
    <input v-model.lazy="msg" />      <!-- 在 change 事件后同步 -->
    <input v-model.number="age" />    <!-- 自动转为数字 -->
    <input v-model.trim="text" />     <!-- 自动过滤首尾空格 -->
</template>

<script>
export default {
    data() {
        return {
            text: '',
            message: '',
            checked: false,
            checkedNames: [],
            gender: '',
            selected: 'A',
            msg: '',
            age: 0
        }
    }
}
</script>
```

### 8. Class 与 Style 绑定

**绑定 Class**

```vue
<template>
    <!-- 对象语法 -->
    <div :class="{ active: isActive, 'text-danger': hasError }"></div>

    <!-- 绑定对象 -->
    <div :class="classObject"></div>

    <!-- 数组语法 -->
    <div :class="[activeClass, errorClass]"></div>

    <!-- 数组中使用对象 -->
    <div :class="[{ active: isActive }, errorClass]"></div>
</template>

<script>
export default {
    data() {
        return {
            isActive: true,
            hasError: false,
            classObject: {
                active: true,
                'text-danger': false
            },
            activeClass: 'active',
            errorClass: 'text-danger'
        }
    }
}
</script>
```

**绑定 Style**

```vue
<template>
    <!-- 对象语法 -->
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

    <!-- 绑定对象 -->
    <div :style="styleObject"></div>

    <!-- 数组语法 -->
    <div :style="[baseStyles, overridingStyles]"></div>
</template>

<script>
export default {
    data() {
        return {
            activeColor: 'red',
            fontSize: 30,
            styleObject: {
                color: 'red',
                fontSize: '13px'
            },
            baseStyles: {
                color: 'blue'
            },
            overridingStyles: {
                fontSize: '20px'
            }
        }
    }
}
</script>
```

## 四、响应式基础

### 1. 响应式原理

> 💡 **Vue 响应式系统的核心**：
> - **响应式**是指当数据发生变化时，视图会自动更新
> - Vue 通过数据劫持和依赖收集实现响应式
> - **Vue3 的响应式流程**：
>   1. 使用 Proxy 代理数据对象
>   2. 当读取数据时，收集依赖（effect）
>   3. 当修改数据时，触发依赖更新（trigger）
>   4. 组件重新渲染，更新视图
> - **优势**：
>   - 自动追踪依赖，无需手动管理
>   - 细粒度更新，只更新变化的部分
>   - 支持嵌套对象的深层响应式

**Vue3 响应式**：基于 Proxy 实现

```js
// Vue3 响应式原理简化版
function reactive(target) {
    // 使用 Proxy 创建代理对象，拦截对原始对象的操作
    return new Proxy(target, {
        // get 陷阱：当读取属性时触发
        get(target, key) {
            // 1. 收集依赖（track）
            // 记录"哪个组件/effect正在读取这个属性"
            // 当这个属性变化时，就知道要通知哪些组件更新
            track(target, key)

            // 2. 返回属性值
            return target[key]

            // 示例执行流程：
            // 组件中访问 state.count -> 触发get
            // -> track记录: count属性被当前组件依赖
            // -> 返回count的值
        },

        // set 陷阱：当修改属性时触发
        set(target, key, value) {
            // 1. 先更新原始对象的值
            target[key] = value

            // 2. 触发更新（trigger）
            // 通知所有依赖这个属性的组件重新渲染
            trigger(target, key)

            // 3. 返回true表示设置成功
            return true

            // 示例执行流程：
            // 修改 state.count = 10 -> 触发set
            // -> 更新target[key]的值
            // -> trigger通知所有依赖count的组件
            // -> 组件重新渲染，显示新值
        }
    })
}

// 实际使用示例：
// const state = reactive({ count: 0 })
//
// 读取操作：
// console.log(state.count)
// -> 触发get陷阱 -> track收集依赖 -> 返回0
//
// 写入操作：
// state.count = 10
// -> 触发set陷阱 -> 更新值 -> trigger触发更新 -> 视图重新渲染
```

**Vue2 响应式**：基于 Object.defineProperty

```js
// Vue2 响应式原理简化版
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            // 收集依赖
            return val
        },
        set(newVal) {
            val = newVal
            // 触发更新
        }
    })
}
```

### 2. ref() 定义响应式数据

```vue
<template>
    <div>
        <p>{{ count }}</p>
        <button @click="increment">+1</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// 定义响应式数据
const count = ref(0)

// 在 JS 中访问需要 .value
function increment() {
    count.value++
}

// 在模板中自动解包，不需要 .value
</script>
```

**ref 的特点**

- 可以包装任何类型的值（基本类型、对象等）
- 在 JS 中访问需要 `.value`
- 在模板中自动解包
- 响应式是深层的（嵌套对象也是响应式的）

### 3. reactive() 定义响应式对象

```vue
<template>
    <div>
        <p>{{ state.count }}</p>
        <p>{{ state.user.name }}</p>
        <button @click="increment">+1</button>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

// 定义响应式对象
const state = reactive({
    count: 0,
    user: {
        name: '张三',
        age: 18
    }
})

function increment() {
    state.count++
    // 不需要 .value
}
</script>
```

**reactive 的特点**

- 只能用于对象类型（对象、数组、Map、Set 等）
- 不需要 `.value`
- 解构会失去响应性
- 不能替换整个对象

**ref vs reactive**

> 💡 **ref 和 reactive 的选择**：
> - **ref** 的使用场景：
>   - 定义基本类型数据（string、number、boolean等）
>   - 需要重新分配整个对象的场景
>   - 单个值的响应式
> - **reactive** 的使用场景：
>   - 定义复杂对象、数组等引用类型
>   - 对象结构相对稳定，不需要替换整个对象
>   - 需要解构使用时配合 `toRefs`
> - **推荐做法**：
>   - 基本类型用 ref
>   - 对象类型优先用 reactive，需要替换时用 ref
>   - 保持团队风格一致

| 特性 | ref | reactive |
|------|-----|----------|
| 适用类型 | 任何类型 | 对象类型 |
| 访问方式 | .value | 直接访问 |
| 解构 | 可以 | 会失去响应性 |
| 替换 | 可以 | 不可以 |
| 使用场景 | 基本类型、需要重新分配的对象 | 对象、不需要重新分配 |

### 4. computed() 计算属性

> 💡 **计算属性的特点和使用**：
> - **计算属性**是基于响应式依赖进行缓存的
> - **缓存机制**：
>   - 只有依赖的响应式数据变化时才会重新计算
>   - 多次访问会直接返回缓存结果，不会重复执行
>   - 相比方法调用，性能更好
> - **两种形式**：
>   - **只读计算属性**：只提供 getter，返回计算结果
>   - **可写计算属性**：提供 getter 和 setter，可以修改计算属性
> - **使用场景**：
>   - 根据现有数据派生新数据（如过滤、排序、格式化）
>   - 多个数据组合计算（如总价、全名）
>   - 需要缓存的复杂计算

```vue
<template>
    <div>
        <p>原价：{{ price }}</p>
        <p>折扣价：{{ discountPrice }}</p>
        <p>全名：{{ fullName }}</p>
        <input v-model="fullName" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const price = ref(100)

// 只读计算属性
const discountPrice = computed(() => {
    return price.value * 0.8
})

const firstName = ref('张')
const lastName = ref('三')

// 可写计算属性
const fullName = computed({
    get() {
        return firstName.value + lastName.value
    },
    set(value) {
        firstName.value = value[0]
        lastName.value = value.slice(1)
    }
})
</script>
```

**计算属性 vs 方法**

- 计算属性基于依赖缓存，只有依赖变化才重新计算
- 方法每次调用都会执行
- 计算属性性能更好

### 5. watch() 侦听器

> 💡 **watch 侦听器的使用**：
> - **watch** 用于监听响应式数据的变化并执行副作用
> - **特点**：
>   - 可以访问新值和旧值
>   - 支持深度监听（deep）
>   - 支持立即执行（immediate）
>   - 可以监听多个数据源
> - **使用场景**：
>   - 数据变化时需要执行异步操作（如API调用）
>   - 数据变化时需要执行复杂的业务逻辑
>   - 需要访问变化前后的值
> - **注意事项**：
>   - 监听 reactive 对象时默认是深度监听
>   - 监听 ref 包裹的对象时需要 `.value` 或使用函数返回

```vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)
const user = ref({ name: '张三', age: 18 })

// 侦听 ref
watch(count, (newVal, oldVal) => {
    console.log(`count 从 ${oldVal} 变为 ${newVal}`)
})

// 侦听对象的某个属性
watch(() => user.value.age, (newVal, oldVal) => {
    console.log(`age 从 ${oldVal} 变为 ${newVal}`)
})

// 侦听多个数据源
watch([count, user], ([newCount, newUser], [oldCount, oldUser]) => {
    console.log('count 或 user 发生变化')
})

// 立即执行
watch(count, (newVal) => {
    console.log(newVal)
}, { immediate: true })

// 深度侦听
watch(user, (newVal) => {
    console.log('user 发生深层变化')
}, { deep: true })
</script>
```

### 6. watchEffect() 自动侦听

> 💡 **watchEffect 的特点**：
> - **watchEffect** 会自动追踪回调函数中使用的所有响应式数据
> - **与 watch 的区别**：
>   - `watch`：需要明确指定监听的数据源
>   - `watchEffect`：自动收集依赖，更简洁
>   - `watch`：可以访问新旧值
>   - `watchEffect`：只能访问当前值
>   - `watch`：默认懒执行
>   - `watchEffect`：立即执行一次
> - **使用场景**：
>   - 不需要访问旧值的场景
>   - 依赖多个响应式数据，不想逐个列出
>   - 需要立即执行的副作用
> - **返回值**：返回一个停止函数，调用可停止监听

```vue
<script setup>
import { ref, watchEffect } from 'vue'

const count = ref(0)
const user = ref({ name: '张三' })

// 自动追踪依赖
watchEffect(() => {
    console.log(`count 是 ${count.value}`)
    console.log(`name 是 ${user.value.name}`)
})

// 停止侦听
const stop = watchEffect(() => {
    console.log(count.value)
})

// 调用 stop 函数停止侦听
// stop()
</script>
```

**watch vs watchEffect**

- `watch`：需要明确指定依赖，可以访问新旧值
- `watchEffect`：自动追踪依赖，立即执行，无法访问旧值

## 五、组件基础

> 💡 **Vue 组件的核心思想**：
> - **组件**是 Vue 应用的基本构建块
> - **组件化开发的优势**：
>   - **复用性**：同一组件可在多处使用
>   - **可维护性**：每个组件职责单一，易于维护
>   - **可组合性**：小组件组合成大组件
>   - **作用域隔离**：组件的样式和逻辑相互独立
> - **单文件组件（SFC）**：
>   - 一个 `.vue` 文件包含 template、script、style 三部分
>   - 更好的代码组织和语法高亮
>   - 支持 CSS 预处理器和作用域样式
> - **组件通信**：
>   - Props：父传子
>   - Emit：子传父
>   - Provide/Inject：跨层级传递
>   - v-model：双向绑定

### 1. 定义组件

**单文件组件（SFC）**

```vue
<!-- MyComponent.vue -->
<template>
    <div class="my-component">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
    </div>
</template>

<script>
export default {
    name: 'MyComponent',
    data() {
        return {
            title: '标题',
            content: '内容'
        }
    }
}
</script>

<style scoped>
.my-component {
    padding: 20px;
    border: 1px solid #ccc;
}
</style>
```

**使用 setup 语法糖（推荐）**

```vue
<template>
    <div>
        <h2>{{ title }}</h2>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('标题')
</script>
```

### 2. 注册组件

**全局注册**

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import MyComponent from './components/MyComponent.vue'

const app = createApp(App)

// 全局注册
app.component('MyComponent', MyComponent)

app.mount('#app')
```

**局部注册**

```vue
<template>
    <MyComponent />
</template>

<script setup>
import MyComponent from './components/MyComponent.vue'
// 使用 setup 语法糖，自动注册
</script>
```

```vue
<!-- Options API 方式 -->
<script>
import MyComponent from './components/MyComponent.vue'

export default {
    components: {
        MyComponent
    }
}
</script>
```

### 3. Props 父传子

> 💡 **Props 的核心概念**：
> - **Props**（properties）是组件的自定义属性，用于父组件向子组件传递数据
> - **单向数据流**：
>   - Props 只能从父组件流向子组件
>   - 子组件不应该修改 props 的值
>   - 如需修改，应该通过 emit 通知父组件更新
> - **Props 验证**：
>   - 类型检查：确保传入的数据类型正确
>   - 必填检查：required 标记必须传入的 prop
>   - 默认值：为可选 prop 提供默认值
>   - 自定义验证：validator 函数进行复杂验证
> - **命名规范**：
>   - 在 JS 中使用 camelCase（驼峰命名）
>   - 在模板中使用 kebab-case（短横线命名）

**父组件**

```vue
<template>
    <ChildComponent
        title="标题"
        :count="100"
        :user="{ name: '张三' }"
    />
</template>

<script setup>
import ChildComponent from './ChildComponent.vue'
</script>
```

**子组件（setup 语法糖）**

```vue
<template>
    <div>
        <h2>{{ title }}</h2>
        <p>{{ count }}</p>
        <p>{{ user.name }}</p>
    </div>
</template>

<script setup>
// 定义 props
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    user: {
        type: Object,
        default: () => ({})
    }
})

// 使用 props
console.log(props.title)
</script>
```

**Props 验证**

```js
defineProps({
    // 基础类型检查
    name: String,
    age: Number,

    // 多个可能的类型
    count: [Number, String],

    // 必填
    title: {
        type: String,
        required: true
    },

    // 默认值
    message: {
        type: String,
        default: 'hello'
    },

    // 对象或数组的默认值
    user: {
        type: Object,
        default: () => ({ name: '张三' })
    },

    // 自定义验证
    age: {
        type: Number,
        validator: (value) => value >= 0 && value <= 150
    }
})
```

### 4. Emit 子传父

**子组件**

```vue
<template>
    <button @click="handleClick">点击</button>
</template>

<script setup>
// 定义事件
const emit = defineEmits(['update', 'delete'])

function handleClick() {
    // 触发事件
    emit('update', { id: 1, name: '张三' })
}
</script>
```

**父组件**

```vue
<template>
    <ChildComponent
        @update="handleUpdate"
        @delete="handleDelete"
    />
</template>

<script setup>
import ChildComponent from './ChildComponent.vue'

function handleUpdate(data) {
    console.log('更新', data)
}

function handleDelete() {
    console.log('删除')
}
</script>
```

**事件验证**

```vue
<script setup>
const emit = defineEmits({
    // 无验证
    click: null,

    // 验证 submit 事件
    submit: ({ email, password }) => {
        if (email && password) {
            return true
        } else {
            console.warn('无效的提交事件！')
            return false
        }
    }
})
</script>
```

### 5. v-model 双向绑定

**父组件**

```vue
<template>
    <ChildComponent v-model="count" />
    <p>{{ count }}</p>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const count = ref(0)
</script>
```

**子组件**

```vue
<template>
    <button @click="increment">{{ modelValue }}</button>
</template>

<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

function increment() {
    emit('update:modelValue', props.modelValue + 1)
}
</script>
```

**多个 v-model**

```vue
<!-- 父组件 -->
<template>
    <ChildComponent
        v-model:title="title"
        v-model:content="content"
    />
</template>

<!-- 子组件 -->
<script setup>
defineProps(['title', 'content'])
const emit = defineEmits(['update:title', 'update:content'])

function updateTitle(value) {
    emit('update:title', value)
}
</script>
```

### 6. 插槽 Slots

> 💡 **插槽的作用和使用**：
> - **插槽**允许父组件向子组件传递模板内容
> - **三种插槽类型**：
>   - **默认插槽**：最基本的插槽，传递任意内容
>   - **具名插槽**：多个插槽，通过名称区分
>   - **作用域插槽**：子组件向父组件传递数据，让父组件自定义渲染方式
> - **使用场景**：
>   - 组件内容需要由父组件定制
>   - 创建可复用的布局组件
>   - 列表组件自定义每项的渲染方式
> - **优势**：
>   - 提高组件灵活性和复用性
>   - 实现内容分发的重要手段
>   - 保持组件逻辑和展示的分离

**默认插槽**

```vue
<!-- 父组件 -->
<template>
    <ChildComponent>
        <p>这是插槽内容</p>
    </ChildComponent>
</template>

<!-- 子组件 -->
<template>
    <div class="container">
        <slot>默认内容</slot>
    </div>
</template>
```

**具名插槽**

```vue
<!-- 父组件 -->
<template>
    <ChildComponent>
        <template #header>
            <h1>标题</h1>
        </template>

        <template #default>
            <p>内容</p>
        </template>

        <template #footer>
            <p>页脚</p>
        </template>
    </ChildComponent>
</template>

<!-- 子组件 -->
<template>
    <div>
        <header>
            <slot name="header"></slot>
        </header>

        <main>
            <slot></slot>
        </main>

        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>
```

**作用域插槽**

```vue
<!-- 父组件 -->
<template>
    <ChildComponent>
        <template #default="slotProps">
            <p>{{ slotProps.user.name }}</p>
            <p>{{ slotProps.user.age }}</p>
        </template>
    </ChildComponent>
</template>

<!-- 子组件 -->
<template>
    <div>
        <slot :user="user"></slot>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
    name: '张三',
    age: 18
})
</script>
```

### 7. 透传 Attributes

```vue
<!-- 父组件 -->
<template>
    <ChildComponent
        class="custom-class"
        style="color: red;"
        @click="handleClick"
    />
</template>

<!-- 子组件 -->
<template>
    <!-- 单根节点会自动继承 -->
    <div>
        内容
    </div>

    <!-- 禁用自动继承 -->
    <!-- <div v-bind="$attrs"></div> -->
</template>

<script setup>
// 禁用自动继承
defineOptions({
    inheritAttrs: false
})

// 访问透传属性
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
```

## 六、组合式 API（Composition API）

> 💡 **Composition API 的核心价值**：
> - **Composition API** 是 Vue3 最重要的新特性之一
> - **解决的问题**：
>   - Options API 中，相关逻辑分散在不同选项中（data、methods、computed等）
>   - 大型组件难以维护和阅读
>   - 逻辑复用困难（mixins 有命名冲突等问题）
> - **Composition API 的优势**：
>   - **逻辑组织**：按功能组织代码，相关逻辑聚合在一起
>   - **逻辑复用**：通过组合式函数（composables）轻松复用逻辑
>   - **类型推导**：更好的 TypeScript 支持
>   - **更灵活**：不受选项式 API 的限制
> - **核心概念**：
>   - `setup()` 函数是组合式 API 的入口
>   - 使用 `ref`、`reactive` 创建响应式数据
>   - 使用 `computed`、`watch` 等组合式函数
>   - 返回的数据和方法可在模板中使用

### 1. setup() 函数

**基本用法**

```vue
<template>
    <div>{{ count }}</div>
    <button @click="increment">+1</button>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const count = ref(0)

        function increment() {
            count.value++
        }

        // 返回给模板使用
        return {
            count,
            increment
        }
    }
}
</script>
```

**setup 语法糖（推荐）**

```vue
<template>
    <div>{{ count }}</div>
    <button @click="increment">+1</button>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
    count.value++
}

// 不需要 return，自动暴露给模板
</script>
```

**setup 的参数**

```vue
<script>
export default {
    setup(props, context) {
        // props: 响应式的 props
        console.log(props.title)

        // context: 上下文对象
        // context.attrs - 透传属性
        // context.slots - 插槽
        // context.emit - 触发事件
        // context.expose - 暴露给父组件

        context.emit('update', data)
    }
}
</script>
```

### 2. 生命周期钩子

**Options API vs Composition API**

| Options API | Composition API |
|-------------|-----------------|
| beforeCreate | setup() |
| created | setup() |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeUnmount | onBeforeUnmount |
| unmounted | onUnmounted |
| errorCaptured | onErrorCaptured |
| renderTracked | onRenderTracked |
| renderTriggered | onRenderTriggered |

**使用示例**

```vue
<script setup>
import {
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted
} from 'vue'

onBeforeMount(() => {
    console.log('组件挂载前')
})

onMounted(() => {
    console.log('组件挂载后')
    // DOM 已经可用
})

onBeforeUpdate(() => {
    console.log('组件更新前')
})

onUpdated(() => {
    console.log('组件更新后')
})

onBeforeUnmount(() => {
    console.log('组件卸载前')
})

onUnmounted(() => {
    console.log('组件卸载后')
    // 清理副作用
})
</script>
```

### 3. 依赖注入 provide/inject

**父组件提供数据**

```vue
<script setup>
import { provide, ref } from 'vue'

const theme = ref('dark')
const user = ref({ name: '张三' })

// 提供数据
provide('theme', theme)
provide('user', user)

// 提供响应式数据
provide('updateTheme', (newTheme) => {
    theme.value = newTheme
})
</script>
```

**子组件注入数据**

```vue
<template>
    <div>
        <p>主题：{{ theme }}</p>
        <p>用户：{{ user.name }}</p>
        <button @click="changeTheme">切换主题</button>
    </div>
</template>

<script setup>
import { inject } from 'vue'

// 注入数据
const theme = inject('theme')
const user = inject('user')
const updateTheme = inject('updateTheme')

// 提供默认值
const message = inject('message', '默认消息')

function changeTheme() {
    updateTheme('light')
}
</script>
```

**应用级 provide**

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 全局提供
app.provide('globalMessage', 'Hello World')

app.mount('#app')
```

### 4. 组合式函数（Composables）

> 💡 **组合式函数的重要性**：
> - **组合式函数**是 Vue3 中实现逻辑复用的最佳方式
> - **特点**：
>   - 本质是一个函数，封装了可复用的状态逻辑
>   - 使用 Vue 的组合式 API（ref、computed、watch 等）
>   - 返回响应式数据和方法，供组件使用
>   - 命名约定：以 `use` 开头（如 useMouse、useCounter）
> - **优势**：
>   - **更好的代码组织**：相关逻辑集中在一个函数中
>   - **易于测试**：函数独立，易于单元测试
>   - **类型安全**：配合 TypeScript 有完整的类型推导
>   - **无命名冲突**：相比 mixins，不会有命名冲突问题
> - **使用场景**：
>   - 鼠标位置追踪、窗口尺寸监听等浏览器 API 封装
>   - 表单验证、数据请求等通用业务逻辑
>   - 计数器、定时器等状态逻辑

**定义组合式函数**

```js
// composables/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
    const x = ref(0)
    const y = ref(0)

    function update(event) {
        x.value = event.pageX
        y.value = event.pageY
    }

    onMounted(() => {
        window.addEventListener('mousemove', update)
    })

    onUnmounted(() => {
        window.removeEventListener('mousemove', update)
    })

    return { x, y }
}
```

**使用组合式函数**

```vue
<template>
    <div>鼠标位置：{{ x }}, {{ y }}</div>
</template>

<script setup>
import { useMouse } from './composables/useMouse'

const { x, y } = useMouse()
</script>
```

**常用组合式函数示例**

```js
// useCounter.js
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
    const count = ref(initialValue)

    function increment() {
        count.value++
    }

    function decrement() {
        count.value--
    }

    function reset() {
        count.value = initialValue
    }

    return {
        count,
        increment,
        decrement,
        reset
    }
}

// useFetch.js
import { ref } from 'vue'

export function useFetch(url) {
    const data = ref(null)
    const error = ref(null)
    const loading = ref(false)

    async function fetch() {
        loading.value = true
        try {
            const response = await fetch(url)
            data.value = await response.json()
        } catch (e) {
            error.value = e
        } finally {
            loading.value = false
        }
    }

    return {
        data,
        error,
        loading,
        fetch
    }
}
```

### 5. toRef() 和 toRefs()

```vue
<script setup>
import { reactive, toRef, toRefs } from 'vue'

const state = reactive({
    name: '张三',
    age: 18
})

// toRef - 为某个属性创建 ref
const nameRef = toRef(state, 'name')

// toRefs - 为所有属性创建 ref
const { name, age } = toRefs(state)

// 解构后保持响应式
console.log(name.value)  // '张三'
name.value = '李四'
console.log(state.name)  // '李四'
</script>
```

### 6. readonly() 和 shallowRef()

**readonly() - 只读**

```vue
<script setup>
import { reactive, readonly } from 'vue'

const state = reactive({ count: 0 })

// 创建只读代理
const readonlyState = readonly(state)

// 无法修改
// readonlyState.count++ // 警告
</script>
```

**shallowRef() - 浅层响应式**

```vue
<script setup>
import { shallowRef } from 'vue'

// 只有 .value 的变化是响应式的
const state = shallowRef({ count: 0 })

// 不会触发更新
state.value.count++

// 会触发更新
state.value = { count: 1 }
</script>
```

## 七、Vue Router 路由

> 💡 **Vue Router 的核心概念**：
> - **Vue Router** 是 Vue 官方的路由管理器，用于构建单页应用（SPA）
> - **单页应用（SPA）**：
>   - 整个应用只有一个 HTML 页面
>   - 通过 JavaScript 动态更新页面内容
>   - 路由切换不会重新加载页面，用户体验更好
> - **核心功能**：
>   - **路由映射**：URL 路径与组件的映射关系
>   - **导航**：编程式导航和声明式导航
>   - **路由参数**：动态路由参数和查询参数
>   - **嵌套路由**：路由组件中嵌套子路由
>   - **路由守卫**：控制路由访问权限
> - **路由模式**：
>   - **Hash 模式**：URL 带 `#`，兼容性好
>   - **History 模式**：URL 干净，需要服务器配置

### 1. 安装和配置

**安装**

```bash
npm install vue-router@4
```

**配置路由**

```js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/user/:id',
        name: 'User',
        component: () => import('../views/User.vue') // 懒加载
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
```

**注册路由**

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')
```

**使用路由**

```vue
<template>
    <div>
        <!-- 路由出口 -->
        <router-view />

        <!-- 路由链接 -->
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于</router-link>
        <router-link :to="{ name: 'User', params: { id: 123 } }">
            用户
        </router-link>
    </div>
</template>
```

### 2. 编程式导航

```vue
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 导航到不同的路由
function goToHome() {
    router.push('/')
}

function goToUser() {
    router.push({ name: 'User', params: { id: 123 } })
}

// 带查询参数
function goToAbout() {
    router.push({
        path: '/about',
        query: { name: '张三' }
    })
}

// 替换当前路由（不留历史记录）
function replaceRoute() {
    router.replace('/about')
}

// 前进后退
function goBack() {
    router.go(-1) // 后退
    router.back() // 后退
    router.forward() // 前进
}

// 获取当前路由信息
console.log(route.path)     // 当前路径
console.log(route.params)   // 路由参数
console.log(route.query)    // 查询参数
</script>
```

### 3. 路由传参

**动态路由参数**

```js
// 路由配置
{
    path: '/user/:id',
    component: User
}
```

```vue
<!-- 访问参数 -->
<template>
    <div>用户ID: {{ $route.params.id }}</div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.params.id)
</script>
```

**查询参数**

```js
// 导航
router.push({
    path: '/user',
    query: { name: '张三', age: 18 }
})
```

```vue
<!-- 访问查询参数 -->
<template>
    <div>
        姓名: {{ $route.query.name }}
        年龄: {{ $route.query.age }}
    </div>
</template>
```

**Props 传参**

```js
// 路由配置
{
    path: '/user/:id',
    component: User,
    props: true // 将 params 作为 props 传递
}

// 或者函数模式
{
    path: '/user/:id',
    component: User,
    props: route => ({ id: route.params.id, query: route.query })
}
```

```vue
<!-- User.vue -->
<script setup>
defineProps({
    id: String
})
</script>
```

### 4. 嵌套路由

```js
// 路由配置
const routes = [
    {
        path: '/user',
        component: User,
        children: [
            {
                path: '', // 默认子路由
                component: UserHome
            },
            {
                path: 'profile',
                component: UserProfile
            },
            {
                path: 'posts',
                component: UserPosts
            }
        ]
    }
]
```

```vue
<!-- User.vue -->
<template>
    <div>
        <h2>用户中心</h2>

        <router-link to="/user">首页</router-link>
        <router-link to="/user/profile">个人资料</router-link>
        <router-link to="/user/posts">文章</router-link>

        <!-- 子路由出口 -->
        <router-view />
    </div>
</template>
```

### 5. 路由守卫

**全局前置守卫**

```js
// router/index.js
router.beforeEach((to, from, next) => {
    // to: 即将进入的路由
    // from: 当前导航正要离开的路由
    // next: 必须调用

    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/login')
    } else {
        next()
    }
})
```

**全局后置守卫**

```js
router.afterEach((to, from) => {
    // 更改页面标题
    document.title = to.meta.title || '默认标题'
})
```

**路由独享守卫**

```js
const routes = [
    {
        path: '/admin',
        component: Admin,
        beforeEnter: (to, from, next) => {
            if (isAdmin()) {
                next()
            } else {
                next('/403')
            }
        }
    }
]
```

**组件内守卫**

```vue
<script setup>
import { onBeforeRouteEnter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'

// 进入路由前
onBeforeRouteEnter((to, from) => {
    // 此时组件实例还未创建，无法访问 this
})

// 路由更新时
onBeforeRouteUpdate((to, from) => {
    console.log('路由更新')
})

// 离开路由前
onBeforeRouteLeave((to, from) => {
    const answer = window.confirm('确定要离开吗？')
    if (!answer) return false
})
</script>
```

### 6. 路由元信息

```js
const routes = [
    {
        path: '/admin',
        component: Admin,
        meta: {
            requiresAuth: true,
            title: '管理后台',
            roles: ['admin']
        }
    }
]
```

```js
// 使用元信息
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        // 需要认证
    }

    document.title = to.meta.title || '默认标题'
    next()
})
```

## 八、Pinia 状态管理

> 💡 **Pinia 状态管理的核心**：
> - **Pinia** 是 Vue 官方推荐的新一代状态管理库，替代 Vuex
> - **状态管理的作用**：
>   - 解决多个组件共享状态的问题
>   - 集中管理应用的全局状态
>   - 让状态变化可追踪、可预测
> - **Pinia vs Vuex**：
>   - **更简洁**：没有 mutations，直接修改 state
>   - **更好的 TypeScript 支持**：完整的类型推导
>   - **模块化**：每个 store 都是独立的，无需嵌套
>   - **DevTools 支持**：完整的调试工具支持
>   - **更小的包体积**：约 1KB
> - **核心概念**：
>   - **State**：状态数据，类似组件的 data
>   - **Getters**：计算属性，类似组件的 computed
>   - **Actions**：方法，可以是同步或异步
> - **两种风格**：
>   - **选项式 Store**：类似 Vuex 的写法
>   - **组合式 Store**：类似 Composition API 的写法（推荐）

### 1. 安装和配置

**安装**

```bash
npm install pinia
```

**配置**

```js
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

### 2. 定义 Store

**选项式 Store**

```js
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
    // 状态
    state: () => ({
        count: 0,
        name: '计数器'
    }),

    // 计算属性
    getters: {
        doubleCount: (state) => state.count * 2,

        // 访问其他 getter
        doublePlusOne() {
            return this.doubleCount + 1
        }
    },

    // 方法
    actions: {
        increment() {
            this.count++
        },

        async fetchCount() {
            const response = await fetch('/api/count')
            this.count = await response.json()
        }
    }
})
```

**组合式 Store（推荐）**

```js
// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
    // state
    const count = ref(0)
    const name = ref('计数器')

    // getters
    const doubleCount = computed(() => count.value * 2)

    // actions
    function increment() {
        count.value++
    }

    async function fetchCount() {
        const response = await fetch('/api/count')
        count.value = await response.json()
    }

    return {
        count,
        name,
        doubleCount,
        increment,
        fetchCount
    }
})
```

### 3. 使用 Store

```vue
<template>
    <div>
        <p>{{ counter.count }}</p>
        <p>{{ counter.doubleCount }}</p>
        <button @click="counter.increment">+1</button>
    </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

// 直接访问
console.log(counter.count)

// 调用方法
counter.increment()
</script>
```

**解构 Store**

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

// 解构 state 和 getters（保持响应式）
const { count, doubleCount } = storeToRefs(counter)

// 解构 actions（不需要 storeToRefs）
const { increment } = counter
</script>
```

### 4. 修改 State

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

// 直接修改
counter.count++

// $patch 批量修改
counter.$patch({
    count: counter.count + 1,
    name: '新名称'
})

// $patch 函数形式
counter.$patch((state) => {
    state.count++
    state.name = '新名称'
})

// $reset 重置到初始状态
counter.$reset()

// 替换整个 state
counter.$state = { count: 0, name: '计数器' }
</script>
```

### 5. 订阅 State 变化

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

// 订阅 state 变化
counter.$subscribe((mutation, state) => {
    console.log('state 发生变化', mutation.type)
    console.log('新的 state', state)

    // 持久化到 localStorage
    localStorage.setItem('counter', JSON.stringify(state))
})

// 订阅 action
counter.$onAction(({ name, args, after, onError }) => {
    console.log(`调用了 ${name}`)

    after((result) => {
        console.log('action 执行后', result)
    })

    onError((error) => {
        console.error('action 出错', error)
    })
})
</script>
```

### 6. Store 组合

```js
// stores/user.js
import { defineStore } from 'pinia'
import { useCounterStore } from './counter'

export const useUserStore = defineStore('user', () => {
    const counter = useCounterStore()

    function someAction() {
        // 使用其他 store
        counter.increment()
    }

    return {
        someAction
    }
})
```

### 7. 插件

```js
// plugins/persistedstate.js
import { createPinia } from 'pinia'

const pinia = createPinia()

// 添加插件
pinia.use(({ store }) => {
    // 从 localStorage 恢复状态
    const saved = localStorage.getItem(store.$id)
    if (saved) {
        store.$patch(JSON.parse(saved))
    }

    // 监听变化并保存
    store.$subscribe((mutation, state) => {
        localStorage.setItem(store.$id, JSON.stringify(state))
    })
})

export default pinia
```

## 九、内置组件

> 💡 **Vue3 内置组件概述**：
> - Vue3 提供了多个强大的内置组件，解决常见的开发需求
> - **主要内置组件**：
>   - **Teleport**：将组件渲染到 DOM 树的其他位置
>   - **Suspense**：处理异步组件的加载状态
>   - **Transition**：为元素添加过渡动画
>   - **TransitionGroup**：为列表添加过渡动画
>   - **KeepAlive**：缓存组件实例，避免重复渲染
> - **使用价值**：
>   - 提升开发效率，无需自己实现这些功能
>   - 经过优化，性能更好
>   - API 设计合理，易于使用
> - **注意事项**：
>   - 这些组件都是 Vue 内置的，无需导入
>   - 合理使用可以提升用户体验和应用性能

### 1. Teleport 传送门

```vue
<template>
    <div>
        <button @click="showModal = true">打开模态框</button>

        <!-- 传送到 body -->
        <Teleport to="body">
            <div v-if="showModal" class="modal">
                <p>模态框内容</p>
                <button @click="showModal = false">关闭</button>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>

<style>
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
}
</style>
```

### 2. Suspense 异步组件

```vue
<template>
    <Suspense>
        <!-- 异步组件 -->
        <template #default>
            <AsyncComponent />
        </template>

        <!-- 加载中显示 -->
        <template #fallback>
            <div>加载中...</div>
        </template>
    </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() =>
    import('./components/AsyncComponent.vue')
)
</script>
```

**异步 setup**

```vue
<!-- AsyncComponent.vue -->
<template>
    <div>{{ data }}</div>
</template>

<script setup>
const data = await fetch('/api/data').then(r => r.json())
</script>
```

### 3. Transition 过渡

**基本用法**

```vue
<template>
    <button @click="show = !show">切换</button>

    <Transition>
        <p v-if="show">Hello</p>
    </Transition>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<style>
/* 进入和离开动画 */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
```

**自定义过渡类名**

```vue
<template>
    <Transition
        name="fade"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
    >
        <p v-if="show">Hello</p>
    </Transition>
</template>
```

**JavaScript 钩子**

```vue
<template>
    <Transition
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
        @after-leave="onAfterLeave"
    >
        <div v-if="show">内容</div>
    </Transition>
</template>

<script setup>
function onBeforeEnter(el) {
    el.style.opacity = 0
}

function onEnter(el, done) {
    // 动画结束后调用 done
    el.offsetHeight // 触发重排
    el.style.opacity = 1
    el.style.transition = 'opacity 0.5s'
    el.addEventListener('transitionend', done)
}

function onAfterEnter(el) {
    console.log('进入动画完成')
}
</script>
```

### 4. TransitionGroup 列表过渡

```vue
<template>
    <TransitionGroup name="list" tag="ul">
        <li v-for="item in items" :key="item.id">
            {{ item.text }}
        </li>
    </TransitionGroup>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
    { id: 1, text: '项目 1' },
    { id: 2, text: '项目 2' },
    { id: 3, text: '项目 3' }
])
</script>

<style>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.list-move {
    transition: transform 0.5s;
}
</style>
```

### 5. KeepAlive 缓存组件

> 💡 **KeepAlive 的作用**：
> - **KeepAlive** 用于缓存动态组件，避免重复创建和销毁
> - **使用场景**：
>   - 标签页切换时保持组件状态
>   - 表单填写过程中切换页面，保留填写内容
>   - 列表页和详情页切换，保持列表滚动位置
> - **性能优势**：
>   - 避免组件重复渲染，提升性能
>   - 保留组件状态，提升用户体验
> - **配置选项**：
>   - `include`：只缓存指定的组件
>   - `exclude`：不缓存指定的组件
>   - `max`：最多缓存多少个组件实例
> - **生命周期钩子**：
>   - `onActivated`：组件被激活时调用
>   - `onDeactivated`：组件被缓存时调用

```vue
<template>
    <button @click="current = 'ComponentA'">A</button>
    <button @click="current = 'ComponentB'">B</button>

    <!-- 缓存组件 -->
    <KeepAlive>
        <component :is="current" />
    </KeepAlive>

    <!-- 条件缓存 -->
    <KeepAlive :include="['ComponentA']" :exclude="['ComponentB']">
        <component :is="current" />
    </KeepAlive>

    <!-- 最大缓存数 -->
    <KeepAlive :max="10">
        <component :is="current" />
    </KeepAlive>
</template>

<script setup>
import { ref } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const current = ref('ComponentA')
</script>
```

**组件内钩子**

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
    console.log('组件被激活')
})

onDeactivated(() => {
    console.log('组件被缓存')
})
</script>
```

## 十、TypeScript 支持

### 1. 为组件添加类型

**Props 类型**

```vue
<script setup lang="ts">
interface Props {
    title: string
    count?: number
    user: {
        name: string
        age: number
    }
}

const props = defineProps<Props>()

// 带默认值
const props = withDefaults(defineProps<Props>(), {
    count: 0
})
</script>
```

**Emit 类型**

```vue
<script setup lang="ts">
interface Emits {
    (e: 'update', value: string): void
    (e: 'delete', id: number): void
}

const emit = defineEmits<Emits>()

emit('update', 'hello')
emit('delete', 123)
</script>
```

**Ref 类型**

```vue
<script setup lang="ts">
import { ref, Ref } from 'vue'

const count: Ref<number> = ref(0)
// 或者使用类型推断
const count = ref<number>(0)

const user = ref<{ name: string; age: number }>({
    name: '张三',
    age: 18
})
</script>
```

**Reactive 类型**

```vue
<script setup lang="ts">
import { reactive } from 'vue'

interface User {
    name: string
    age: number
}

const user: User = reactive({
    name: '张三',
    age: 18
})
</script>
```

### 2. 为组合式函数添加类型

```ts
// composables/useMouse.ts
import { ref, Ref, onMounted, onUnmounted } from 'vue'

interface MousePosition {
    x: Ref<number>
    y: Ref<number>
}

export function useMouse(): MousePosition {
    const x = ref(0)
    const y = ref(0)

    function update(event: MouseEvent) {
        x.value = event.pageX
        y.value = event.pageY
    }

    onMounted(() => {
        window.addEventListener('mousemove', update)
    })

    onUnmounted(() => {
        window.removeEventListener('mousemove', update)
    })

    return { x, y }
}
```

### 3. 为 Store 添加类型

```ts
// stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
    id: number
    name: string
    email: string
}

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)
    const isLoggedIn = computed(() => !!user.value)

    async function login(email: string, password: string): Promise<void> {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        })
        user.value = await response.json()
    }

    function logout(): void {
        user.value = null
    }

    return {
        user,
        isLoggedIn,
        login,
        logout
    }
})
```

## 十一、性能优化

> 💡 **Vue3 性能优化策略**：
> - Vue3 本身已经做了很多优化，但合理使用仍能进一步提升性能
> - **主要优化方向**：
>   - **减少渲染次数**：使用 v-memo、computed 缓存等
>   - **优化大列表**：虚拟列表、分页加载
>   - **代码分割**：异步组件、路由懒加载
>   - **响应式优化**：使用 shallowRef、shallowReactive
> - **性能优化的原则**：
>   - **先测量后优化**：使用 DevTools 找出性能瓶颈
>   - **不要过早优化**：在性能问题明显时再优化
>   - **权衡复杂度**：不要为了微小的性能提升增加代码复杂度
> - **Vue3 的性能提升**：
>   - 编译时优化（静态提升、预字符串化等）
>   - 运行时优化（更快的虚拟 DOM diff）
>   - Tree-shaking 支持（减小打包体积）

### 1. v-memo 缓存模板

```vue
<template>
    <!-- 仅在 value 变化时才更新 -->
    <div v-memo="[value]">
        <p>{{ value }}</p>
        <p>{{ expensive() }}</p>
    </div>
</template>
```

### 2. 虚拟列表

```vue
<template>
    <div class="list-container" @scroll="handleScroll">
        <div class="phantom" :style="{ height: totalHeight + 'px' }"></div>
        <div class="list" :style="{ transform: `translateY(${offset}px)` }">
            <div v-for="item in visibleData" :key="item.id" class="item">
                {{ item.text }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    data: Array,
    itemHeight: Number
})

const scrollTop = ref(0)
const containerHeight = 600

const visibleCount = Math.ceil(containerHeight / props.itemHeight)
const totalHeight = computed(() => props.data.length * props.itemHeight)
const startIndex = computed(() => Math.floor(scrollTop.value / props.itemHeight))
const endIndex = computed(() => startIndex.value + visibleCount)
const visibleData = computed(() => props.data.slice(startIndex.value, endIndex.value))
const offset = computed(() => startIndex.value * props.itemHeight)

function handleScroll(e) {
    scrollTop.value = e.target.scrollTop
}
</script>
```

### 3. 异步组件

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

// 简单用法
const AsyncComp = defineAsyncComponent(() =>
    import('./components/HeavyComponent.vue')
)

// 高级用法
const AsyncComp = defineAsyncComponent({
    loader: () => import('./components/HeavyComponent.vue'),
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    delay: 200,
    timeout: 3000
})
</script>
```

### 4. 响应式优化

```vue
<script setup>
import { ref, shallowRef, shallowReactive, markRaw } from 'vue'

// shallowRef - 只有 .value 是响应式的
const state = shallowRef({ count: 0 })
state.value.count++ // 不会触发更新
state.value = { count: 1 } // 会触发更新

// shallowReactive - 只有根级属性是响应式的
const state2 = shallowReactive({
    foo: 1,
    nested: {
        bar: 2
    }
})
state2.foo++ // 会触发更新
state2.nested.bar++ // 不会触发更新

// markRaw - 标记对象永远不会转为响应式
const obj = markRaw({ count: 0 })
const state3 = reactive({ obj })
// state3.obj 不是响应式的
</script>
```

## 十二、常用技巧和最佳实践

### 1. 组件命名规范

```vue
<!-- 推荐：PascalCase -->
<MyComponent />

<!-- 不推荐：kebab-case（仅在 DOM 模板中必须使用） -->
<my-component />
```

### 2. Props 验证

```vue
<script setup>
defineProps({
    // 基础验证
    status: String,

    // 多类型
    id: [String, Number],

    // 必填
    title: {
        type: String,
        required: true
    },

    // 默认值
    count: {
        type: Number,
        default: 0
    },

    // 对象/数组默认值
    items: {
        type: Array,
        default: () => []
    },

    // 自定义验证
    age: {
        type: Number,
        validator: (value) => value >= 0 && value <= 150
    }
})
</script>
```

### 3. 动态组件

```vue
<template>
    <component :is="currentComponent" />
</template>

<script setup>
import { ref } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const currentComponent = ref(ComponentA)
</script>
```

### 4. 自定义指令

```js
// directives/focus.js
export default {
    mounted(el) {
        el.focus()
    }
}
```

```vue
<template>
    <input v-focus />
</template>

<script setup>
import vFocus from './directives/focus'
</script>
```

### 5. 全局属性

```js
// main.js
const app = createApp(App)

app.config.globalProperties.$http = axios

app.mount('#app')
```

```vue
<script setup>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()
proxy.$http.get('/api/data')
</script>
```

### 6. 错误处理

```js
// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
    console.error('全局错误:', err)
    console.error('组件实例:', instance)
    console.error('错误信息:', info)
}

// 警告处理
app.config.warnHandler = (msg, instance, trace) => {
    console.warn('警告:', msg)
}
```

```vue
<!-- 组件内错误处理 -->
<script setup>
import { onErrorCaptured } from 'vue'

onErrorCaptured((err, instance, info) => {
    console.error('捕获到错误:', err)
    return false // 阻止错误继续传播
})
</script>
```

---

> **学习建议**
>
> 1. **循序渐进**：从 Options API 入门，再学习 Composition API
> 2. **多写项目**：通过实际项目巩固知识
> 3. **阅读文档**：Vue 官方文档非常详细，要多看
> 4. **关注生态**：学习 Vue Router、Pinia、Vite 等周边工具
> 5. **代码规范**：遵循 Vue 风格指南，保持代码整洁
> 6. **性能优化**：了解虚拟 DOM、响应式原理等底层知识
> 7. **TypeScript**：掌握 TypeScript 能写出更健壮的代码
>
> 🔗 **推荐资源**
> - [Vue3 官方文档](https://cn.vuejs.org/)
> - [Vue Router](https://router.vuejs.org/zh/)
> - [Pinia](https://pinia.vuejs.org/zh/)
> - [Vite](https://cn.vitejs.dev/)
> - [Vue 风格指南](https://cn.vuejs.org/style-guide/)
