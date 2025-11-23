---
title: JavaScript 学习笔记
date: 2025-11-20
categories:
  - 前端开发
tags:
  - JavaScript
---

# JavaScript 学习笔记

[🪩 尚硅谷JavaScript基础&实战丨JS入门到精通全套完整版](https://www.bilibili.com/video/BV1YW411T7GX)

## 一、JavaScript 简介

### 1. JavaScript 是什么

- **JavaScript**（简称 JS）是一种具有函数优先的轻量级、解释型或即时编译型的编程语言
- JavaScript 是一种**基于原型**、**多范式**的动态脚本语言，支持面向对象、命令式和声明式（如函数式编程）风格
- JavaScript 最初是为浏览器设计的**客户端脚本语言**，现在也可以用于**服务器端**（Node.js）

> 💡 **理解要点**：
> - **解释型语言**：代码不需要编译成机器码，而是在运行时由JavaScript引擎（如V8、SpiderMonkey）逐行解释执行
> - **基于原型**：JavaScript的继承机制是通过原型链实现的，而不是像Java那样的类继承
> - **多范式**：可以使用面向对象、函数式、命令式等多种编程范式
> - **动态类型**：变量的类型在运行时确定，而不是编译时

### 2. JavaScript 的组成

**JavaScript = ECMAScript + DOM + BOM**

- **ECMAScript**：JavaScript 的核心，规定了语法、类型、语句、关键字、保留字、操作符、对象等
  - 定义了语言的基础规范和标准
  - 包括变量、数据类型、运算符、流程控制、函数等核心功能
  - ES5、ES6（ES2015）、ES2016+ 都是ECMAScript的不同版本

- **DOM**（Document Object Model）：文档对象模型，提供访问和操作网页内容的方法和接口
  - 将HTML文档表示为树状结构
  - 可以获取、创建、修改、删除HTML元素
  - 处理元素的属性、样式、内容等

- **BOM**（Browser Object Model）：浏览器对象模型，提供与浏览器交互的方法和接口
  - 包括window、location、navigator、history、screen等对象
  - 控制浏览器窗口、导航、获取浏览器信息等
  - 没有统一标准，各浏览器实现略有差异

### 3. JavaScript 的特点

- **解释型语言**：不需要编译，由浏览器直接解释执行
- **弱类型语言**：变量类型不固定，可以随时改变
- **基于对象**：JavaScript 中的一切都是对象
- **事件驱动**：可以响应用户的操作
- **跨平台性**：只要有浏览器就能运行

### 4. JavaScript 的书写位置

**行内式（不推荐）**

```html
<button onclick="alert('Hello')">点击我</button>
```

**内嵌式**

```html
<script>
    alert('Hello World');
</script>
```

**外链式（推荐）**

```html
<script src="./js/index.js"></script>
```

## 二、JavaScript 基础语法

### 1. 变量

变量是用于存储信息的容器

**声明变量的三种方式**

```js
// var 声明（ES5）- 函数作用域
var name = '张三';

// let 声明（ES6）- 块级作用域
let age = 18;

// const 声明（ES6）- 块级作用域，常量
const PI = 3.14;
```

**变量命名规则**

- 由字母、数字、下划线、$ 组成，不能以数字开头
- 不能使用关键字和保留字
- 区分大小写
- 建议使用驼峰命名法（firstName）

**var、let、const 的区别**

| 特性       | var          | let          | const        |
| ---------- | ------------ | ------------ | ------------ |
| 作用域     | 函数作用域   | 块级作用域   | 块级作用域   |
| 变量提升   | 存在         | 不存在       | 不存在       |
| 重复声明   | 允许         | 不允许       | 不允许       |
| 修改值     | 可以         | 可以         | 不可以       |
| 暂时性死区 | 不存在       | 存在         | 存在         |

```js
// var 的函数作用域
function test() {
    if (true) {
        var x = 10;
    }
    console.log(x); // 10
}

// let 的块级作用域
function test2() {
    if (true) {
        let y = 20;
    }
    // console.log(y); // 报错：y is not defined
}

// const 常量
const MAX_SIZE = 100;
// MAX_SIZE = 200; // 报错：Assignment to constant variable
```

### 2. 数据类型

JavaScript 中有 8 种数据类型（ES2020）

**基本数据类型（原始类型）**

- **Number**：数值型
- **String**：字符串型
- **Boolean**：布尔型
- **Undefined**：未定义
- **Null**：空值
- **Symbol**（ES6）：唯一标识符
- **BigInt**（ES2020）：大整数

**引用数据类型**

- **Object**：对象（包括：普通对象、数组、函数、正则、日期等）

> 💡 **基本类型 vs 引用类型**：
> - **基本类型**：存储在栈内存中，按值访问，赋值时会创建值的副本
>   ```js
>   let a = 10;
>   let b = a;  // b得到的是a值的副本
>   b = 20;     // 修改b不会影响a
>   console.log(a);  // 10
>   ```
> - **引用类型**：存储在堆内存中，栈中存储的是对象的引用地址，赋值时传递的是引用
>   ```js
>   let obj1 = { name: '张三' };
>   let obj2 = obj1;  // obj2得到的是obj1的引用
>   obj2.name = '李四';  // 修改obj2会影响obj1
>   console.log(obj1.name);  // '李四'
>   ```

#### 2.1 Number 数值型

```js
let num1 = 10;           // 整数
let num2 = 3.14;         // 小数
let num3 = 0xff;         // 十六进制
let num4 = 0o77;         // 八进制
let num5 = 0b1010;       // 二进制
let num6 = 1.5e3;        // 科学计数法 1500
let num7 = Infinity;     // 无穷大
let num8 = -Infinity;    // 无穷小
let num9 = NaN;          // Not a Number

// 数值范围
console.log(Number.MAX_VALUE);  // 最大值
console.log(Number.MIN_VALUE);  // 最小值

// isNaN() 判断是否为非数字
console.log(isNaN(10));        // false
console.log(isNaN('hello'));   // true
```

#### 2.2 String 字符串型

```js
let str1 = 'Hello';
let str2 = "World";
let str3 = `Hello ${str2}`;  // 模板字符串（ES6）

// 字符串的不可变性
let str = 'hello';
str[0] = 'H';
console.log(str);  // 还是 'hello'

// 常用属性和方法
console.log(str.length);              // 5
console.log(str.charAt(0));           // 'h'
console.log(str.indexOf('l'));        // 2
console.log(str.slice(1, 3));         // 'el'
console.log(str.substring(1, 3));     // 'el'
console.log(str.substr(1, 3));        // 'ell'
console.log(str.toUpperCase());       // 'HELLO'
console.log(str.toLowerCase());       // 'hello'
console.log(str.split(''));           // ['h','e','l','l','o']
console.log(str.replace('l', 'L'));   // 'heLlo'
console.log(str.trim());              // 去除两端空格
```

#### 2.3 Boolean 布尔型

```js
let flag1 = true;
let flag2 = false;

// 以下值会被转换为 false
console.log(Boolean(0));          // false
console.log(Boolean(''));         // false
console.log(Boolean(NaN));        // false
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false

// 其他所有值都是 true
console.log(Boolean(1));          // true
console.log(Boolean('hello'));    // true
console.log(Boolean([]));         // true
console.log(Boolean({}));         // true
```

#### 2.4 Undefined 和 Null

```js
// Undefined：变量声明了但未赋值
let a;
console.log(a);        // undefined
console.log(typeof a); // "undefined"

// Null：空对象
let b = null;
console.log(b);        // null
console.log(typeof b); // "object"（这是一个历史遗留bug）

// 区别
console.log(undefined == null);   // true
console.log(undefined === null);  // false
```

#### 2.5 Symbol（ES6）

```js
// Symbol 表示独一无二的值
let s1 = Symbol('描述');

let s2 = Symbol('描述');
console.log(s1 === s2);  // false

// 应用：作为对象属性名，防止属性名冲突
let obj = {
    [Symbol('name')]: '张三',
    [Symbol('name')]: '李四'
};
```

#### 2.6 BigInt（ES2020）

```js
// 用于表示大于 2^53 - 1 的整数
let bigNum1 = 9007199254740991n;
let bigNum2 = BigInt(9007199254740991);

console.log(bigNum1 + 1n);  // 9007199254740992n
```

### 3. 数据类型检测

```js
// typeof 操作符
console.log(typeof 123);           // "number"
console.log(typeof 'hello');       // "string"
console.log(typeof true);          // "boolean"
console.log(typeof undefined);     // "undefined"
console.log(typeof null);          // "object"（bug）
console.log(typeof {});            // "object"
console.log(typeof []);            // "object"
console.log(typeof function(){}); // "function"

// instanceof 检测引用类型
console.log([] instanceof Array);   // true
console.log({} instanceof Object);  // true

// Object.prototype.toString.call()（最准确）
console.log(Object.prototype.toString.call([]));       // "[object Array]"
console.log(Object.prototype.toString.call({}));       // "[object Object]"
console.log(Object.prototype.toString.call(null));     // "[object Null]"
```

### 4. 数据类型转换

#### 4.1 转换为字符串

```js
let num = 10;

// 方式1：toString()
console.log(num.toString());        // "10"

// 方式2：String()
console.log(String(num));           // "10"

// 方式3：隐式转换（+ 拼接字符串）
console.log(num + '');              // "10"
```

#### 4.2 转换为数值

```js
let str = '123';

// 方式1：Number()
console.log(Number(str));           // 123
console.log(Number('123abc'));      // NaN

// 方式2：parseInt()
console.log(parseInt('123.45'));    // 123
console.log(parseInt('123abc'));    // 123

// 方式3：parseFloat()
console.log(parseFloat('123.45'));  // 123.45

// 方式4：隐式转换（算术运算）
console.log('123' - 0);             // 123
console.log('123' * 1);             // 123
console.log(+'123');                // 123
```

#### 4.3 转换为布尔值

```js
// 方式1：Boolean()
console.log(Boolean(1));            // true
console.log(Boolean(0));            // false

// 方式2：隐式转换
console.log(!!'hello');             // true
```

### 5. 运算符

#### 5.1 算术运算符

```js
let a = 10, b = 3;

console.log(a + b);   // 13  加
console.log(a - b);   // 7   减
console.log(a * b);   // 30  乘
console.log(a / b);   // 3.333... 除
console.log(a % b);   // 1   取余
console.log(a ** b);  // 1000 幂运算（ES2016）

// 自增自减
let x = 5;
console.log(x++);     // 5（先用后加）
console.log(++x);     // 7（先加后用）
console.log(x--);     // 7（先用后减）
console.log(--x);     // 5（先减后用）
```

#### 5.2 赋值运算符

```js
let a = 10;
a += 5;   // a = a + 5;   15
a -= 3;   // a = a - 3;   12
a *= 2;   // a = a * 2;   24
a /= 4;   // a = a / 4;   6
a %= 5;   // a = a % 5;   1
```

#### 5.3 比较运算符

```js
console.log(5 > 3);    // true
console.log(5 < 3);    // false
console.log(5 >= 5);   // true
console.log(5 <= 3);   // false
console.log(5 == '5'); // true（只比较值）
console.log(5 === '5');// false（比较值和类型）
console.log(5 != '5'); // false
console.log(5 !== '5');// true
```

#### 5.4 逻辑运算符

```js
// && 逻辑与（全真为真）
console.log(true && true);    // true
console.log(true && false);   // false

// || 逻辑或（一真即真）
console.log(false || true);   // true
console.log(false || false);  // false

// ! 逻辑非（取反）
console.log(!true);           // false

// 短路运算
let a = 0;
console.log(a && a++);        // 0（a不会自增）
console.log(a || 100);        // 100
```

#### 5.5 三元运算符

```js
// 三元运算符：条件 ? 值1 : 值2
// 如果条件为true,返回值1;否则返回值2
let age = 18;

// 根据年龄判断是否成年
let result = age >= 18 ? '成年' : '未成年';
console.log(result);  // 输出: '成年'

// 三元运算符可以嵌套使用
let score = 85;
let grade = score >= 90 ? 'A' :
            score >= 80 ? 'B' :
            score >= 70 ? 'C' : 'D';
console.log(grade);  // 输出: 'B'
```

> ⚠️ **注意事项**:
> - 三元运算符适合简单的条件判断,复杂逻辑建议使用 if-else
> - 过度嵌套会降低代码可读性,建议最多嵌套一层
> - 三元运算符必须有返回值,不能只执行语句

> 🎯 **实际应用场景**:
> ```js
> // 场景1:动态设置CSS类名
> const buttonClass = isActive ? 'btn-active' : 'btn-inactive';
>
> // 场景2:设置默认值
> const username = inputValue ? inputValue : '游客';
>
> // 场景3:条件渲染(React中常用)
> const display = isLoggedIn ? <UserProfile /> : <LoginButton />;
> ```

### 6. 流程控制

#### 6.1 分支结构

**if 语句**

```js
// if-else if-else 多分支结构
let score = 85;

// 根据分数判断等级
if (score >= 90) {
    console.log('优秀');          // 分数>=90时执行
} else if (score >= 80) {
    console.log('良好');          // 分数80-89时执行,输出此项
} else if (score >= 60) {
    console.log('及格');          // 分数60-79时执行
} else {
    console.log('不及格');        // 分数<60时执行
}
// 实际输出: '良好'

// 单个if语句
let age = 20;
if (age >= 18) {
    console.log('已成年');        // 输出: '已成年'
}

// if-else 双分支
let isRaining = true;
if (isRaining) {
    console.log('带伞');          // 输出: '带伞'
} else {
    console.log('不带伞');
}
```

> ⚠️ **注意事项**:
> - if 条件会进行隐式类型转换,建议使用明确的布尔值判断
> - 多个 if-else if 只会执行第一个满足条件的分支
> - 单行语句也建议使用花括号 `{}`,增强代码可读性
> - 避免过深的嵌套(建议不超过3层),可使用提前返回优化
>
> ```js
> // 不推荐:深层嵌套
> if (user) {
>     if (user.age >= 18) {
>         if (user.hasPermission) {
>             // ...
>         }
>     }
> }
>
> // 推荐:提前返回
> if (!user) return;
> if (user.age < 18) return;
> if (!user.hasPermission) return;
> // ...
> ```

> 🎯 **实际应用场景**:
> ```js
> // 场景1:表单验证
> function validateForm(data) {
>     if (!data.username) {
>         return '用户名不能为空';
>     } else if (data.username.length < 3) {
>         return '用户名至少3个字符';
>     } else if (!data.email) {
>         return '邮箱不能为空';
>     } else {
>         return '验证通过';
>     }
> }
>
> // 场景2:权限控制
> if (user.role === 'admin') {
>     showAdminPanel();
> } else if (user.role === 'editor') {
>     showEditorPanel();
> } else {
>     showUserPanel();
> }
>
> // 场景3:响应式设计
> if (window.innerWidth < 768) {
>     loadMobileLayout();
> } else if (window.innerWidth < 1024) {
>     loadTabletLayout();
> } else {
>     loadDesktopLayout();
> }
> ```

**switch 语句**

```js
// switch 语句用于基于不同值执行不同代码
let day = 3;

switch (day) {
    case 1:
        console.log('星期一');
        break;  // break防止继续执行下一个case
    case 2:
        console.log('星期二');
        break;
    case 3:
        console.log('星期三');  // 匹配此项,输出: '星期三'
        break;                 // break跳出switch
    case 4:
        console.log('星期四');
        break;
    case 5:
        console.log('星期五');
        break;
    case 6:
    case 7:                    // case可以合并,6或7都执行这里
        console.log('周末');
        break;
    default:                   // 所有case都不匹配时执行
        console.log('无效的日期');
}

// 利用穿透特性(不加break)
let grade = 'B';
switch (grade) {
    case 'A':
    case 'B':
    case 'C':
        console.log('及格');    // 输出: '及格'
        break;
    case 'D':
    case 'F':
        console.log('不及格');
        break;
}
```

> ⚠️ **注意事项**:
> - switch 使用**严格相等(===)**进行比较,不会进行类型转换
> - 忘记 break 会导致**穿透(fall-through)**,继续执行下一个 case
> - default 可以省略,但建议保留以处理意外情况
> - case 值必须是常量表达式,不能是变量
>
> ```js
> // 常见错误:类型不匹配
> let num = '1';
> switch (num) {
>     case 1:  // 不会匹配,因为'1'!==1
>         console.log('一');
>         break;
> }
>
> // 常见错误:忘记break
> let x = 1;
> switch (x) {
>     case 1:
>         console.log('A');  // 输出
>     case 2:
>         console.log('B');  // 也输出(穿透)
>         break;
> }
> ```

> 🎯 **实际应用场景**:
> ```js
> // 场景1:处理HTTP状态码
> switch (response.status) {
>     case 200:
>         handleSuccess(response.data);
>         break;
>     case 404:
>         showNotFound();
>         break;
>     case 500:
>         showServerError();
>         break;
>     default:
>         showUnknownError();
> }
>
> // 场景2:根据用户操作执行不同逻辑
> switch (action.type) {
>     case 'ADD_TODO':
>         return [...state, action.payload];
>     case 'DELETE_TODO':
>         return state.filter(item => item.id !== action.id);
>     case 'TOGGLE_TODO':
>         return state.map(item =>
>             item.id === action.id
>                 ? { ...item, completed: !item.completed }
>                 : item
>         );
>     default:
>         return state;
> }
>
> // 场景3:根据文件类型处理
> switch (file.extension) {
>     case '.jpg':
>     case '.png':
>     case '.gif':
>         return processImage(file);
>     case '.mp4':
>     case '.avi':
>         return processVideo(file);
>     case '.pdf':
>         return processPDF(file);
>     default:
>         return processGenericFile(file);
> }
> ```

#### 6.2 循环结构

**for 循环**

```js
// 1. 基本 for 循环
// for (初始化; 条件判断; 每次迭代后执行)
for (let i = 0; i < 5; i++) {
    console.log(i);
}
// 输出: 0 1 2 3 4 (每个数字单独一行)

// 2. for...in 遍历对象的键(可枚举属性)
let obj = { name: '张三', age: 18, city: '北京' };
for (let key in obj) {
    console.log(key, obj[key]);
}
// 输出:
// name 张三
// age 18
// city 北京

// 3. for...of 遍历可迭代对象的值（ES6）
// 适用于数组、字符串、Map、Set等
let arr = [10, 20, 30];
for (let value of arr) {
    console.log(value);
}
// 输出: 10 20 30

// 4. 遍历字符串
let str = 'Hello';
for (let char of str) {
    console.log(char);
}
// 输出: H e l l o (每个字符单独一行)

// 5. 数组的forEach方法(推荐用于数组遍历)
let fruits = ['苹果', '香蕉', '橙子'];
fruits.forEach((item, index) => {
    console.log(`${index}: ${item}`);
});
// 输出:
// 0: 苹果
// 1: 香蕉
// 2: 橙子
```

> ⚠️ **注意事项**:
> - **for...in** 不应用于数组遍历(会遍历所有可枚举属性,包括原型链上的)
> - **for...of** 不能直接遍历普通对象(对象不是可迭代对象)
> - 循环变量建议使用 `let` 而不是 `var`,避免作用域问题
> - 避免在循环内修改循环变量,容易造成死循环
>
> ```js
> // 常见错误1:for...in遍历数组
> let arr = [1, 2, 3];
> arr.custom = 'test';
> for (let i in arr) {
>     console.log(i);  // 输出: 0, 1, 2, custom (不仅仅是索引!)
> }
>
> // 常见错误2:for...of遍历对象
> let obj = { a: 1, b: 2 };
> for (let val of obj) {  // 报错: obj is not iterable
>     console.log(val);
> }
>
> // 常见错误3:使用var导致的闭包问题
> for (var i = 0; i < 3; i++) {
>     setTimeout(() => console.log(i), 100);
> }
> // 输出: 3 3 3 (而不是 0 1 2)
> // 解决:使用let
> for (let i = 0; i < 3; i++) {
>     setTimeout(() => console.log(i), 100);
> }
> // 输出: 0 1 2
> ```

> 🎯 **实际应用场景**:
> ```js
> // 场景1:遍历DOM元素列表
> const buttons = document.querySelectorAll('button');
> for (let btn of buttons) {
>     btn.addEventListener('click', handleClick);
> }
>
> // 场景2:处理API返回的数组数据
> const users = await fetch('/api/users').then(r => r.json());
> for (let user of users) {
>     renderUserCard(user);
> }
>
> // 场景3:遍历对象属性进行数据转换
> const formData = { name: 'John', age: '25', email: 'john@example.com' };
> const queryString = [];
> for (let key in formData) {
>     queryString.push(`${key}=${formData[key]}`);
> }
> console.log(queryString.join('&'));
> // 输出: name=John&age=25&email=john@example.com
>
> // 场景4:使用forEach处理购物车
> const cart = [
>     { name: '商品A', price: 100, count: 2 },
>     { name: '商品B', price: 50, count: 1 }
> ];
> let total = 0;
> cart.forEach(item => {
>     total += item.price * item.count;
> });
> console.log(`总价: ${total}元`);  // 输出: 总价: 250元
>
> // 场景5:for...in vs for...of 对比
> const data = ['a', 'b', 'c'];
>
> // for...in 获取索引
> for (let index in data) {
>     console.log(index, typeof index);  // '0' string, '1' string, '2' string
> }
>
> // for...of 获取值
> for (let value of data) {
>     console.log(value, typeof value);  // 'a' string, 'b' string, 'c' string
> }
> ```

**while 循环**

```js
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}
// 输出: 0 1 2 3 4
```

> ⚠️ **注意事项**:
> - while先判断条件再执行循环体,条件为false时一次也不执行
> - 必须在循环体内改变条件,否则会造成死循环
> - 不确定循环次数时优先使用while
>
> ```js
> // 常见错误:忘记更新条件导致死循环
> let i = 0;
> while (i < 5) {
>     console.log(i);
>     // 忘记 i++，会无限循环输出0
> }
> ```

> 🎯 **实际应用场景**:
> ```js
> // 场景1:读取用户输入直到满足条件
> let password = '';
> while (password !== 'correct') {
>     password = prompt('请输入密码:');
> }
>
> // 场景2:处理队列
> let queue = [1, 2, 3, 4, 5];
> while (queue.length > 0) {
>     let item = queue.shift();
>     processItem(item);
> }
>
> // 场景3:等待异步操作完成
> let retries = 0;
> while (retries < 3 && !isConnected()) {
>     await tryConnect();
>     retries++;
> }
> ```

**do...while 循环**

```js
let j = 0;
do {
    console.log(j);
    j++;
} while (j < 5);
// 输出: 0 1 2 3 4
```

> ⚠️ **注意事项**:
> - do-while先执行后判断,**至少执行一次**循环体
> - 与while的区别:条件为false时,while一次不执行,do-while执行一次
> - 适用于至少需要执行一次的场景
>
> ```js
> // while vs do-while 对比
> let i = 10;
> while (i < 5) {
>     console.log('while:', i);  // 不执行
> }
>
> let j = 10;
> do {
>     console.log('do-while:', j);  // 执行一次,输出: do-while: 10
> } while (j < 5);
> ```

> 🎯 **实际应用场景**:
> ```js
> // 场景1:菜单系统(至少显示一次)
> let choice;
> do {
>     console.log('1. 开始游戏');
>     console.log('2. 设置');
>     console.log('3. 退出');
>     choice = prompt('请选择:');
> } while (choice !== '3');
>
> // 场景2:输入验证(至少尝试一次)
> let input;
> do {
>     input = prompt('请输入6位数字密码:');
> } while (!/^\d{6}$/.test(input));
>
> // 场景3:游戏主循环
> let gameOver = false;
> do {
>     updateGame();
>     renderGame();
>     gameOver = checkGameOver();
> } while (!gameOver);
> ```

**break 和 continue**

```js
// break：跳出整个循环
for (let i = 0; i < 10; i++) {
    if (i === 5) break;
    console.log(i);  // 0 1 2 3 4
}

// continue：跳过本次循环
for (let i = 0; i < 5; i++) {
    if (i === 2) continue;
    console.log(i);  // 0 1 3 4
}
```

> ⚠️ **注意事项**:
> - **break**: 立即终止整个循环,跳出循环体
> - **continue**: 跳过当前迭代,继续下一次迭代
> - 在嵌套循环中,break/continue只影响最内层循环
> - 可以使用标签(label)来跳出外层循环
>
> ```js
> // break vs continue 区别
> console.log('--- break ---');
> for (let i = 0; i < 5; i++) {
>     if (i === 2) break;    // 遇到2就结束
>     console.log(i);        // 输出: 0 1
> }
>
> console.log('--- continue ---');
> for (let i = 0; i < 5; i++) {
>     if (i === 2) continue; // 遇到2就跳过
>     console.log(i);        // 输出: 0 1 3 4
> }
>
> // 使用标签跳出外层循环
> outer: for (let i = 0; i < 3; i++) {
>     for (let j = 0; j < 3; j++) {
>         if (i === 1 && j === 1) {
>             break outer;  // 跳出外层循环
>         }
>         console.log(i, j);
>     }
> }
> ```

> 🎯 **实际应用场景**:
> ```js
> // 场景1:查找数组中的元素(找到后立即停止)
> let users = ['Alice', 'Bob', 'Charlie', 'David'];
> let target = 'Charlie';
> for (let user of users) {
>     if (user === target) {
>         console.log('找到用户:', user);
>         break;  // 找到后立即停止搜索
>     }
> }
>
> // 场景2:跳过无效数据
> let numbers = [1, -2, 3, -4, 5, -6];
> let sum = 0;
> for (let num of numbers) {
>     if (num < 0) continue;  // 跳过负数
>     sum += num;
> }
> console.log(sum);  // 输出: 9 (只计算正数)
>
> // 场景3:分页加载,找到目标页后停止
> for (let page = 1; page <= 10; page++) {
>     let data = await fetchPage(page);
>     if (data.includes(targetItem)) {
>         console.log('在第', page, '页找到');
>         break;
>     }
> }
>
> // 场景4:表单验证,跳过空字段
> let formData = { name: 'John', email: '', phone: '123456' };
> for (let key in formData) {
>     if (!formData[key]) continue;  // 跳过空值
>     console.log(`${key}: ${formData[key]}`);
> }
> ```

## 三、函数

### 1. 函数的定义

**函数声明**

```js
function sayHello(name) {
    console.log('Hello, ' + name);
}
// 函数声明会被提升(hoisting),可以在声明前调用
```

**函数表达式**

```js
let sayHi = function(name) {
    console.log('Hi, ' + name);
};
// 函数表达式不会提升,只能在声明后调用
```

**箭头函数（ES6）**

```js
let add = (a, b) => a + b;

// 等价于
let add = function(a, b) {
    return a + b;
};
```

> ⚠️ **函数定义方式对比**:
>
> | 特性 | 函数声明 | 函数表达式 | 箭头函数 |
> |------|---------|-----------|---------|
> | 提升 | 是 | 否 | 否 |
> | this绑定 | 动态 | 动态 | 继承外层 |
> | arguments | 有 | 有 | 无 |
> | 构造函数 | 可以 | 可以 | 不可以 |
> | 适用场景 | 常规函数 | 回调、条件定义 | 简洁回调、不需要this |
>
> ```js
> // 函数提升示例
> sayHello('Alice');  // 正常运行
> function sayHello(name) {
>     console.log('Hello', name);
> }
>
> sayHi('Bob');  // 报错: sayHi is not a function
> let sayHi = function(name) {
>     console.log('Hi', name);
> };
>
> // 箭头函数的this绑定
> let obj = {
>     name: 'Object',
>     regular: function() {
>         console.log(this.name);  // 'Object'
>     },
>     arrow: () => {
>         console.log(this.name);  // undefined (继承外层作用域的this)
>     }
> };
> ```

> 🎯 **实际应用场景**:
> ```js
> // 场景1:数组方法中使用箭头函数
> const numbers = [1, 2, 3, 4, 5];
> const doubled = numbers.map(n => n * 2);  // [2, 4, 6, 8, 10]
> const evens = numbers.filter(n => n % 2 === 0);  // [2, 4]
>
> // 场景2:函数表达式用于条件定义
> const mode = 'development';
> const log = mode === 'development'
>     ? function(msg) { console.log('[DEV]', msg); }
>     : function(msg) { /* 生产环境不输出 */ };
>
> // 场景3:箭头函数简化回调
> setTimeout(() => console.log('延迟执行'), 1000);
> button.addEventListener('click', () => handleClick());
>
> // 场景4:函数声明用于工具函数
> function formatDate(date) {
>     return date.toISOString().split('T')[0];
> }
> ```

**Function 构造函数（不推荐）**

```js
let multiply = new Function('a', 'b', 'return a * b');
```

### 2. 函数的调用

```js
function greet(name) {
    return 'Hello, ' + name;
}

let message = greet('张三');
console.log(message);  // "Hello, 张三"
```

### 3. 函数的参数

**形参和实参**

```js
function add(a, b) {  // a, b 是形参
    return a + b;
}

let result = add(3, 5);  // 3, 5 是实参
```

**默认参数（ES6）**

```js
function greet(name = '游客') {
    console.log('Hello, ' + name);
}

greet();         // "Hello, 游客"
greet('张三');   // "Hello, 张三"
```

> ⚠️ **注意事项**:
> - 默认参数只在参数为 `undefined` 时生效,`null` 不会触发默认值
> - 默认参数可以引用前面的参数
> - 默认参数会创建单独的作用域
>
> ```js
> // undefined vs null
> function test(x = 10) {
>     return x;
> }
> console.log(test(undefined));  // 10 (使用默认值)
> console.log(test(null));       // null (不使用默认值)
>
> // 引用前面的参数
> function greet(name = '游客', message = `Hello, ${name}`) {
>     return message;
> }
> console.log(greet('Alice'));  // "Hello, Alice"
> ```

> 🎯 **实际应用场景**:
> ```js
> // 场景1:API请求配置
> function fetchData(url, options = {}) {
>     const config = {
>         method: options.method || 'GET',
>         headers: options.headers || {},
>         timeout: options.timeout || 5000
>     };
>     return fetch(url, config);
> }
>
> // 场景2:分页参数
> function getUsers(page = 1, pageSize = 10) {
>     return fetch(`/api/users?page=${page}&size=${pageSize}`);
> }
>
> // 场景3:配置对象
> function createButton(text, {
>     color = 'blue',
>     size = 'medium',
>     disabled = false
> } = {}) {
>     return { text, color, size, disabled };
> }
> ```

**剩余参数（ES6）**

```js
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4));  // 10
```

> ⚠️ **注意事项**:
> - 剩余参数必须是最后一个参数
> - 剩余参数是真正的数组,可以使用所有数组方法
> - 一个函数只能有一个剩余参数
> - 剩余参数 vs arguments: 剩余参数是数组,arguments是伪数组
>
> ```js
> // 正确:剩余参数在最后
> function fn(a, b, ...rest) {
>     console.log(rest);  // 真数组
> }
>
> // 错误:剩余参数不是最后一个
> function fn(...rest, a) {  // 语法错误
> }
>
> // 剩余参数 vs arguments
> function test(...args) {
>     console.log(Array.isArray(args));  // true
>     args.forEach(x => console.log(x)); // 可以用数组方法
> }
> ```

> 🎯 **实际应用场景**:
> ```js
> // 场景1:不定参数的数学运算
> function max(...numbers) {
>     return Math.max(...numbers);
> }
> console.log(max(1, 5, 3, 9, 2));  // 9
>
> // 场景2:合并参数
> function logWithPrefix(prefix, ...messages) {
>     messages.forEach(msg => console.log(`[${prefix}]`, msg));
> }
> logWithPrefix('INFO', 'Server started', 'Port 3000');
>
> // 场景3:函数柯里化
> function curry(fn, ...fixedArgs) {
>     return function(...newArgs) {
>         return fn(...fixedArgs, ...newArgs);
>     };
> }
>
> // 场景4:代理/装饰器模式
> function logger(fn) {
>     return function(...args) {
>         console.log('调用参数:', args);
>         const result = fn(...args);
>         console.log('返回结果:', result);
>         return result;
>     };
> }
> ```

**arguments 对象**

```js
function showArgs() {
    console.log(arguments);  // 伪数组
    console.log(arguments.length);
}

showArgs(1, 2, 3);  // [1, 2, 3]
```

### 4. 函数的返回值

```js
function add(a, b) {
    return a + b;  // return 后面的代码不会执行
    console.log('不会执行');
}

// 没有 return 或 return 后面没有值，返回 undefined
function test() {
    return;
}
console.log(test());  // undefined
```

### 5. 作用域

**全局作用域**

```js
let globalVar = '全局变量';

function test() {
    console.log(globalVar);  // 可以访问
}
```

**局部作用域（函数作用域）**

```js
function test() {
    let localVar = '局部变量';
    console.log(localVar);  // 可以访问
}

// console.log(localVar);  // 报错：localVar is not defined
```

**块级作用域（ES6）**

```js
{
    let blockVar = '块级变量';
    console.log(blockVar);  // 可以访问
}

// console.log(blockVar);  // 报错
```

**作用域链**

```js
let a = 10;

function outer() {
    let b = 20;

    function inner() {
        let c = 30;
        console.log(a, b, c);  // 10 20 30
    }

    inner();
}

outer();
```

### 6. 预解析（变量提升）

```js
// 变量提升
console.log(a);  // undefined（声明提升，赋值不提升）
var a = 10;

// 等价于
var a;
console.log(a);
a = 10;

// 函数提升
sayHello();  // "Hello"（函数声明会整体提升）

function sayHello() {
    console.log('Hello');
}

// 函数表达式不会提升
// sayHi();  // 报错
var sayHi = function() {
    console.log('Hi');
};
```

### 7. 闭包

**闭包**是指有权访问另一个函数作用域中变量的函数

> 💡 **闭包的核心概念**：
> - 闭包 = 函数 + 函数能够访问的自由变量
> - 即使外部函数已经执行完毕，闭包仍然可以访问外部函数的变量
> - 闭包会导致变量不会被垃圾回收，需要注意内存泄漏问题
>
> **闭包的用途**：
> 1. 数据私有化：创建私有变量,外部无法直接访问
> 2. 模块化开发：避免全局变量污染
> 3. 回调函数：保存函数执行时的状态
> 4. 函数工厂：根据参数创建特定功能的函数

```js
function outer() {
    // 1. 在outer函数内部声明一个局部变量count
    let count = 0;

    // 2. 返回一个内部函数inner（这就是闭包）
    // 关键：inner函数可以访问outer函数的变量count
    return function inner() {
        // 3. 每次调用inner时，都会访问并修改outer中的count
        // count变量不会被垃圾回收，因为inner函数一直引用着它
        count++;
        console.log(count);
    };
}

// 4. 调用outer()，返回inner函数并赋值给counter
// 此时outer()已经执行完毕，但count变量仍然存在于内存中
let counter = outer();

// 5. 每次调用counter()，实际上是调用inner函数
// inner函数会访问并修改同一个count变量（闭包保存的变量）
counter();  // 1  (count从0变成1)
counter();  // 2  (count从1变成2)
counter();  // 3  (count从2变成3)

// 闭包应用：数据私有化
function createPerson(name) {
    // name是外部函数的局部变量，形成闭包 
    // 外部无法直接访问name，只能通过返回的方法访问
    return {
        // getName通过闭包访问name变量
        getName: function() {
            return name;  // 返回闭包中保存的name
        },
        // setName通过闭包修改name变量
        setName: function(newName) {
            name = newName;  // 修改闭包中的name
        }
    };
}

let person = createPerson('张三');
console.log(person.getName());  // "张三" - 通过方法读取私有变量
person.setName('李四');         // 通过方法修改私有变量
console.log(person.getName());  // "李四" - 闭包中的name已被修改
// console.log(person.name);    // undefined - 无法直接访问name
```

### 8. 立即执行函数（IIFE）

```js
// 写法1
(function() {
    console.log('立即执行');
})();

// 写法2
(function() {
    console.log('立即执行');
}());

// 带参数
(function(a, b) {
    console.log(a + b);  // 30
})(10, 20);
```

### 9. 递归函数

```js
// 计算阶乘
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}

console.log(factorial(5));  // 120

// 斐波那契数列
function fibonacci(n) {
    if (n <= 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6));  // 8
```

### 10. 回调函数

```js
function processData(data, callback) {
    let result = data * 2;
    callback(result);
}

processData(10, function(result) {
    console.log(result);  // 20
});

// 常见的回调函数场景
setTimeout(function() {
    console.log('1秒后执行');
}, 1000);

let arr = [1, 2, 3];
arr.forEach(function(item) {
    console.log(item);
});
```

## 四、对象

### 1. 对象的创建

**字面量方式**

```js
let person = {
    name: '张三',
    age: 18,
    sayHello: function() {
        console.log('Hello');
    }
};
```

**new Object()**

```js
let person = new Object();
person.name = '张三';
person.age = 18;
```

**构造函数**

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayHello = function() {
        console.log('Hello, ' + this.name);
    };
}

let p1 = new Person('张三', 18);
let p2 = new Person('李四', 20);
```

**Object.create()**

```js
let proto = {
    sayHello: function() {
        console.log('Hello');
    }
};

let person = Object.create(proto);
person.name = '张三';
```

### 2. 对象的属性操作

**访问属性**

```js
let person = { name: '张三', age: 18 };

// 点语法
console.log(person.name);

// 方括号语法
console.log(person['age']);
```

**添加属性**

```js
person.gender = '男';
person['height'] = 180;
```

**修改属性**

```js
person.age = 20;
```

**删除属性**

```js
delete person.gender;
```

**遍历属性**

```js
for (let key in person) {
    console.log(key, person[key]);
}
```

### 3. this 关键字

```js
// 1. 全局作用域中，this 指向 window
console.log(this);  // window

// 2. 普通函数中，this 指向 window
function test() {
    console.log(this);  // window
}

// 3. 对象方法中，this 指向该对象
let obj = {
    name: '张三',
    sayName: function() {
        console.log(this.name);  // this 指向 obj
    }
};

// 4. 构造函数中，this 指向实例对象
function Person(name) {
    this.name = name;  // this 指向新创建的对象
}

// 5. 事件处理函数中，this 指向事件源
// button.onclick = function() {
//     console.log(this);  // this 指向 button
// };

// 6. 箭头函数没有自己的 this，继承外层作用域的 this
let obj2 = {
    name: '李四',
    sayName: () => {
        console.log(this);  // this 指向外层作用域
    } 
};
```

### 4. 改变 this 指向

**call()**

```js
let person1 = { name: '张三' };
let person2 = { name: '李四' };

function greet(greeting) {
    console.log(greeting + ', ' + this.name);
}

greet.call(person1, 'Hello');  // "Hello, 张三"
greet.call(person2, 'Hi');     // "Hi, 李四"
```

**apply()**

```js
function sum(a, b) {
    return a + b;
}

// apply 的参数是数组
let result = sum.apply(null, [3, 5]);
console.log(result);  // 8
```

**bind()**

```js
let person = { name: '张三' };

function greet() {
    console.log('Hello, ' + this.name);
}

// bind 返回一个新函数，不会立即执行
let boundGreet = greet.bind(person);
boundGreet();  // "Hello, 张三"
```

### 5. 内置对象

#### 5.1 Math 对象

```js
console.log(Math.PI);              // 3.141592653589793
console.log(Math.abs(-5));         // 5
console.log(Math.ceil(3.1));       // 4（向上取整）
console.log(Math.floor(3.9));      // 3（向下取整）
console.log(Math.round(3.5));      // 4（四舍五入）
console.log(Math.max(1, 2, 3));    // 3
console.log(Math.min(1, 2, 3));    // 1
console.log(Math.pow(2, 3));       // 8（2的3次方）
console.log(Math.sqrt(16));        // 4（平方根）
console.log(Math.random());        // 0-1之间的随机数

// 获取 [min, max] 之间的随机整数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

#### 5.2 Date 对象

```js
// 创建日期对象
let now = new Date();
let date1 = new Date('2025-01-01');
let date2 = new Date(2025, 0, 1);  // 月份从0开始

// 获取日期
console.log(now.getFullYear());    // 年
console.log(now.getMonth());       // 月（0-11）
console.log(now.getDate());        // 日
console.log(now.getDay());         // 星期（0-6）
console.log(now.getHours());       // 时
console.log(now.getMinutes());     // 分
console.log(now.getSeconds());     // 秒
console.log(now.getTime());        // 时间戳

// 设置日期
now.setFullYear(2025);
now.setMonth(11);
now.setDate(25);

// 日期格式化
console.log(now.toLocaleDateString());    // 2025/12/25
console.log(now.toLocaleTimeString());    // 上午11:30:45
console.log(now.toLocaleString());        // 2025/12/25 上午11:30:45
```

## 五、数组

### 1. 数组的创建

```js
// 字面量方式
let arr1 = [1, 2, 3, 4, 5];

// 构造函数
let arr2 = new Array(5);        // 长度为5的空数组
let arr3 = new Array(1, 2, 3);  // [1, 2, 3]

// Array.of()（ES6）
let arr4 = Array.of(1, 2, 3);   // [1, 2, 3]

// Array.from()（ES6）
let arr5 = Array.from('hello'); // ['h','e','l','l','o']
```

### 2. 数组的访问和修改

```js
let arr = [10, 20, 30, 40];

// 访问元素
console.log(arr[0]);     // 10
console.log(arr.length); // 4

// 修改元素
arr[1] = 25;

// 添加元素
arr[4] = 50;
arr[arr.length] = 60;
```

### 3. 数组的方法

#### 3.1 增删改方法（会修改原数组）

```js
let arr = [1, 2, 3];

// push() - 在末尾添加元素，返回新长度
arr.push(4, 5);          // [1, 2, 3, 4, 5]

// pop() - 删除最后一个元素，返回被删除的元素
arr.pop();               // [1, 2, 3, 4]

// unshift() - 在开头添加元素，返回新长度
arr.unshift(0);          // [0, 1, 2, 3, 4]

// shift() - 删除第一个元素，返回被删除的元素
arr.shift();             // [1, 2, 3, 4]

// splice() - 删除/插入/替换元素
arr.splice(1, 1);        // 从索引1删除1个元素 [1, 3, 4]
arr.splice(1, 0, 2);     // 从索引1插入2 [1, 2, 3, 4]
arr.splice(1, 1, 'two'); // 替换索引1的元素 [1, 'two', 3, 4]

// reverse() - 反转数组
arr.reverse();           // [4, 3, 'two', 1]

// sort() - 排序
let nums = [3, 1, 4, 2];
nums.sort();                           // [1, 2, 3, 4]
nums.sort((a, b) => b - a);           // [4, 3, 2, 1] 降序
```

#### 3.2 查询和检测方法（不修改原数组）

```js
let arr = [1, 2, 3, 4, 5];

// indexOf() - 查找元素索引
console.log(arr.indexOf(3));           // 2
console.log(arr.indexOf(10));          // -1

// lastIndexOf() - 从后向前查找
console.log(arr.lastIndexOf(3));       // 2

// includes()（ES7）- 是否包含某元素
console.log(arr.includes(3));          // true

// find()（ES6）- 查找第一个符合条件的元素
let result = arr.find(item => item > 3);
console.log(result);                   // 4

// findIndex()（ES6）- 查找第一个符合条件的元素索引
let index = arr.findIndex(item => item > 3);
console.log(index);                    // 3

// some() - 是否有元素符合条件
console.log(arr.some(item => item > 3));  // true

// every() - 是否所有元素都符合条件
console.log(arr.every(item => item > 0)); // true
```

#### 3.3 遍历方法（不修改原数组）

```js
let arr = [1, 2, 3, 4, 5];

// forEach() - 遍历数组
//item存值，index存索引，array要遍历的数组
arr.forEach((item, index, array) => {
    console.log(item, index);
});

// map() - 映射，返回新数组
let doubled = arr.map(item => item * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// filter() - 过滤，返回新数组
let filtered = arr.filter(item => item > 2);
console.log(filtered);  // [3, 4, 5]

// reduce() - 累加器
let sum = arr.reduce((total, item) => total + item, 0);
console.log(sum);  // 15 

// reduceRight() - 从右向左累加
let result = arr.reduceRight((acc, item) => acc + item, 0);
```

#### 3.4 其他方法

```js
let arr = [1, 2, 3];

// concat() - 合并数组
let arr2 = arr.concat([4, 5]);
console.log(arr2);  // [1, 2, 3, 4, 5]

// slice() - 截取数组
let sliced = arr.slice(1, 3);
console.log(sliced);  // [2, 3]

// join() - 转换为字符串
console.log(arr.join('-'));  // "1-2-3"

// toString() - 转换为字符串
console.log(arr.toString());  // "1,2,3"

// flat()（ES10）- 数组扁平化
let nested = [1, [2, [3, [4]]]];
console.log(nested.flat(2));  // [1, 2, 3, [4]]
console.log(nested.flat(Infinity));  // [1, 2, 3, 4]

// Array.isArray() - 判断是否为数组
console.log(Array.isArray(arr));  // true
```

### 4. 数组的解构赋值（ES6）

```js
let arr = [1, 2, 3, 4, 5];

// 基本解构
let [a, b, c] = arr;
console.log(a, b, c);  // 1 2 3

// 跳过元素
let [x, , z] = arr;
console.log(x, z);  // 1 3

// 剩余参数
let [first, ...rest] = arr;
console.log(first);  // 1
console.log(rest);   // [2, 3, 4, 5]

// 默认值
let [m, n, o, p, q, r = 100] = arr;
console.log(r);  // 100
```

### 5. 扩展运算符（ES6）

```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

// 合并数组
let merged = [...arr1, ...arr2];
console.log(merged);  // [1, 2, 3, 4, 5, 6]

// 复制数组
let copied = [...arr1];

// 将伪数组转为真数组
function test() {
    let args = [...arguments];
    console.log(args);
}

// 数组的最大值
console.log(Math.max(...arr1));  // 3
```

## 六、字符串扩展

### 1. 模板字符串（ES6）

```js
let name = '张三';
let age = 18;

// 传统拼接
let str1 = '我叫' + name + '，今年' + age + '岁';

// 模板字符串
let str2 = `我叫${name}，今年${age}岁`;

// 多行字符串
let html = `
    <div>
  
        <p>内容</p>
    </div>g
`;

// 表达式
let str3 = `1 + 1 = ${1 + 1}`;
console.log(str3);  // "1 + 1 = 2"
```

### 2. 字符串新方法（ES6）

```js
let str = 'Hello World';

// includes() - 是否包含
console.log(str.includes('World'));  // true

// startsWith() - 是否以某字符串开头
console.log(str.startsWith('Hello'));  // true

// endsWith() - 是否以某字符串结尾
console.log(str.endsWith('World'));  // true

// repeat() - 重复字符串
console.log('abc'.repeat(3));  // "abcabcabc"

// padStart() - 头部补全
console.log('5'.padStart(3, '0'));  // "005"

// padEnd() - 尾部补全
console.log('5'.padEnd(3, '0'));  // "500"

// trimStart() / trimEnd() - 去除空格
console.log('  hello  '.trimStart());  // "hello  "
console.log('  hello  '.trimEnd());    // "  hello"
```

## 七、ES6+ 新特性

### 1. let 和 const

见前面【变量】部分

### 2. 解构赋值

> 💡 **解构赋值的作用**：
> - 解构赋值是一种快速提取数组或对象中值的语法
> - 可以同时声明多个变量并赋值，代码更简洁
> - 支持默认值、重命名、嵌套解构等高级用法
> - 常用于函数参数、模块导入等场景

**数组解构**（见前面）

**对象解构**

```js

let person = { name: '张三', age: 18, gender: '男' };

// 基本解构
let { name, age } = person;
console.log(name, age);  // "张三" 18

// 重命名
let { name: personName, age: personAge } = person;
console.log(personName);  // "张三"

// 默认值
let { name, height = 180 } = person;
console.log(height);  // 180

// 嵌套解构
let obj = {
    user: {
        name: '李四',
        info: { age: 20 }
    }
};
let { user: { name, info: { age } } } = obj;
```

### 3. 箭头函数

> 💡 **箭头函数的特点**：
> - 箭头函数是 ES6 引入的一种更简洁的函数写法
> - 语法更简洁：省略 `function` 关键字，单个表达式可省略 `return`
> - `this` 绑定：箭头函数没有自己的 `this`，它会捕获定义时所在上下文的 `this` 值
> - 不能用作构造函数：不能使用 `new` 关键字调用
> - 没有 `arguments` 对象：可以使用剩余参数 `...args` 代替

```js
// 传统函数
let add1 = function(a, b) {
    return a + b;
};

// 箭头函数
let add2 = (a, b) => a + b;

// 一个参数可以省略括号
let double = x => x * 2;

// 多条语句需要大括号
let greet = name => {
    let message = 'Hello, ' + name;
    return message;
};

// 返回对象字面量需要加括号
let createPerson = (name, age) => ({ name, age });
```

**箭头函数注意点**

```js
// 1. 没有自己的 this
let obj = {
    name: '张三',
    sayName: () => {
        console.log(this.name);  // undefined（this指向外层）
    }
};

// 2. 不能用作构造函数
let Person = (name) => {
    this.name = name;
};
// let p = new Person('张三');  // 报错

// 3. 没有 arguments 对象
let test = () => {
    // console.log(arguments);  // 报错
};

// 4. 不能用作 Generator 函数
```

### 4. 对象的扩展

**属性简写**

```js
let name = '张三';
let age = 18;

// ES5
let person1 = {
    name: name,
    age: age
};

// ES6
let person2 = { name, age };
```

**方法简写**

```js
// ES5
let obj1 = {
    sayHello: function() {
        console.log('Hello');
    }
};

// ES6
let obj2 = {
    sayHello() {
        console.log('Hello');
    }
};
```

**属性名表达式**

```js
let key = 'name';

let obj = {
    [key]: '张三',
    ['get' + 'Age']() {
        return 18;
    }
};

console.log(obj.name);  // "张三"
console.log(obj.getAge());  // 18
```

**Object 新方法**

```js
// Object.assign() - 对象合并
let target = { a: 1 };
let source = { b: 2, c: 3 };
Object.assign(target, source);
console.log(target);  // {a: 1, b: 2, c: 3}

// Object.keys() - 获取所有键
console.log(Object.keys(target));  // ['a', 'b', 'c']

// Object.values() - 获取所有值
console.log(Object.values(target));  // [1, 2, 3]

// Object.entries() - 获取键值对数组
console.log(Object.entries(target));  // [['a',1], ['b',2], ['c',3]]

// Object.fromEntries() - 键值对数组转对象
let entries = [['name', '张三'], ['age', 18]];
let obj = Object.fromEntries(entries);
console.log(obj);  // {name: '张三', age: 18}
```

### 5. Set 和 Map

> 💡 **Set 和 Map 的作用**：
> - **Set**：集合数据结构，成员值都是唯一的，没有重复值
>   - 常用于数组去重、判断元素是否存在
>   - 操作方法：add()、delete()、has()、clear()
> - **Map**：键值对集合，键可以是任意类型（对象、函数等）
>   - 比普通对象更灵活，对象的键只能是字符串或 Symbol
>   - 操作方法：set()、get()、has()、delete()、clear()
> - 两者都是可迭代对象，可以使用 `for...of` 遍历

**Set（集合）**

```js
// 创建 Set
let set = new Set([1, 2, 3, 3, 4]);
console.log(set);  // Set(4) {1, 2, 3, 4}

// 添加元素
set.add(5);

// 删除元素
set.delete(3);

// 判断是否存在
console.log(set.has(2));  // true

// 清空
// set.clear();

// 大小
console.log(set.size);  // 4

// 遍历
set.forEach(value => console.log(value));

// 数组去重
let arr = [1, 2, 2, 3, 3, 4];
let unique = [...new Set(arr)];
console.log(unique);  // [1, 2, 3, 4]
```

**Map（映射）**

```js
// 创建 Map
let map = new Map();

// 设置键值对
map.set('name', '张三');
map.set('age', 18);

// 获取值
console.log(map.get('name'));  // "张三"

// 判断是否存在
console.log(map.has('age'));  // true

// 删除
map.delete('age');

// 大小
console.log(map.size);  // 1

// 遍历
map.forEach((value, key) => {
    console.log(key, value);
});

// 转换为数组
console.log([...map]);  // [['name', '张三']]
```

### 6. Promise（异步编程）

> 💡 **Promise 的作用**：
> - Promise 是异步编程的一种解决方案，比传统的回调函数更强大
> - 可以避免回调地狱（callback hell），让异步代码更清晰易读
> - Promise 有三种状态：
>   - `pending`（进行中）：初始状态
>   - `fulfilled`（已成功）：操作成功完成
>   - `rejected`（已失败）：操作失败
> - 状态一旦改变就不会再变，只能从 pending 变为 fulfilled 或 rejected

```js
// 创建 Promise
// ============
let promise = new Promise((resolve, reject) => {
    // 这里的代码是同步执行的！（立即执行）
    // Promise构造函数接收一个执行器函数(executor)

    setTimeout(() => {
        // 1秒后执行这个回调
        let success = true;

        if (success) {
            // 调用resolve，Promise状态从pending变为fulfilled
            // resolve的参数会传递给.then()的回调函数
            resolve('成功');  // 状态变为fulfilled，值为'成功'
        } else {
            // 调用reject，Promise状态从pending变为rejected
            // reject的参数会传递给.catch()的回调函数
            reject('失败');   // 状态变为rejected，原因为'失败'
        }
    }, 1000);
});

// 使用 Promise
// ===========
promise
    // .then()注册成功时的回调（当Promise状态变为fulfilled时执行）
    .then(result => {
        console.log(result);  // "成功" - 1秒后打印
        // .then()可以返回一个值，这个值会被自动包装成一个新的Promise
        // 返回的Promise会传递给下一个.then()
        return '继续';  // 等价于 return Promise.resolve('继续')
    })
    // 第二个.then()接收上一个.then()返回的值
    .then(result => {
        console.log(result);  // "继续" - 紧接着打印
        // 如果这里抛出错误，会被后面的.catch()捕获
    })
    // .catch()捕获Promise链中任何一个环节的错误
    // (1) Promise被reject
    // (2) .then()中抛出异常
    .catch(error => {
        console.log(error);  // 如果有错误，会在这里处理
    })
    // .finally()无论Promise成功还是失败都会执行
    // 通常用于清理工作（关闭加载动画、释放资源等）
    .finally(() => {
        console.log('结束');  // 总是会执行
    });

// Promise.all() - 并发执行，全部成功才成功
// ==========================================
let p1 = Promise.resolve(1);  // 立即返回一个fulfilled状态的Promise，值为1
let p2 = Promise.resolve(2);  // 立即返回一个fulfilled状态的Promise，值为2
let p3 = Promise.resolve(3);  // 立即返回一个fulfilled状态的Promise，值为3

// Promise.all()等待所有Promise都变为fulfilled状态
// - 如果全部成功：返回所有结果组成的数组
// - 如果有一个失败：立即返回第一个失败的Promise的原因
Promise.all([p1, p2, p3]).then(results => {
    // 当p1、p2、p3全部成功时，才会执行这里
    console.log(results);  // [1, 2, 3] - 按照传入顺序排列的结果数组
});

// Promise.race() - 竞速，第一个完成的结果
// ========================================
// race方法返回最先改变状态的Promise的结果
// 无论这个Promise是成功还是失败
Promise.race([p1, p2, p3]).then(result => {
    // 哪个Promise最先完成（fulfilled或rejected），就返回哪个
    console.log(result);  // 1 - p1最先resolve，所以返回1
});
```

### 7. async/await（ES2017）

> 💡 **async/await 的优势**：
> - `async/await` 是基于 Promise 的语法糖，让异步代码看起来像同步代码
> - **async 函数**：
>   - 声明一个异步函数，函数总是返回一个 Promise
>   - 即使返回的是普通值，也会被自动包装成 Promise
> - **await 关键字**：
>   - 只能在 async 函数内使用
>   - 暂停函数执行，等待 Promise 完成
>   - 返回 Promise 的结果值
> - **错误处理**：使用 `try...catch` 捕获异步错误，比 `.catch()` 更直观

```js
// async 函数返回 Promise
async function getData() {
    return '数据';
}

getData().then(data => console.log(data));  // "数据"

// await 等待 Promise 完成
async function fetchData() {
    try {
        let result1 = await promise1;
        let result2 = await promise2;
        console.log(result1, result2);
    } catch (error) {
        console.log(error);
    }
}

// 实际应用
async function getUserInfo() {
    try {
        let response = await fetch('https://api.example.com/user');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('获取失败:', error);
    }
}
```

### 8. Class（类）

> 💡 **ES6 Class 的特点**：
> - Class 是 ES6 引入的语法糖，本质上仍是基于原型的继承
> - **优势**：
>   - 语法更清晰：相比构造函数 + 原型的方式更易读
>   - 更接近传统面向对象语言的写法
>   - 强制使用 `new` 关键字：直接调用会报错
> - **关键概念**：
>   - `constructor`：构造方法，创建实例时自动调用
>   - 实例方法：定义在类中的方法，每个实例都可调用
>   - 静态方法：使用 `static` 关键字，只能通过类名调用
>   - getter/setter：使用 `get` 和 `set` 关键字定义访问器属性

```js
// 定义类
class Person {
    // 构造函数
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // 实例方法
    sayHello() {
        console.log(`Hello, 我是${this.name}`);
    }

    // 静态方法
    static create(name, age) {
        return new Person(name, age);
    }

    // getter
    get info() {
        return `${this.name} - ${this.age}岁`;
    }

    // setter
    set info(value) {
        let [name, age] = value.split('-');
        this.name = name;
        this.age = parseInt(age);
    }
}

let p1 = new Person('张三', 18);
p1.sayHello();

// 继承
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);  // 调用父类构造函数
        this.grade = grade;
    }

    // 重写方法
    sayHello() {
        super.sayHello();  // 调用父类方法
        console.log(`我在读${this.grade}年级`);
    }
}

let s1 = new Student('李四', 16, '高一');
s1.sayHello();
```

### 9. 模块化（ES6 Module）

> 💡 **ES6 模块化的优势**：
> - **静态结构**：import 和 export 必须在顶层，便于静态分析和 tree-shaking
> - **单例模式**：模块只会执行一次，多次导入得到的是同一个实例
> - **严格模式**：ES6 模块自动采用严格模式
> - **导出方式**：
>   - **具名导出**：`export { name, age }`，可以导出多个
>   - **默认导出**：`export default obj`，一个模块只能有一个
> - **导入方式**：
>   - 具名导入：`import { name } from './module'`
>   - 默认导入：`import obj from './module'`
>   - 全部导入：`import * as module from './module'`

**导出模块**

```js
// utils.js

// 单个导出
export let name = '张三';
export function add(a, b) {
    return a + b;
}

// 批量导出
let age = 18;
let sayHello = () => console.log('Hello');
export { age, sayHello };

// 默认导出
export default {
    name: '李四',
    greet() {
        console.log('Hi');
    }
};
```

**导入模块**

```js
// main.js

// 导入具名导出
import { name, add } from './utils.js';

// 重命名
import { age as personAge } from './utils.js';

// 导入所有
import * as utils from './utils.js';

// 导入默认导出
import myModule from './utils.js';
```

## 八、面向对象编程

### 1. 创建对象的方式

见前面【对象】部分

### 2. 原型和原型链

**原型（prototype）**

> 💡 **原型的作用**：
> - JavaScript 中每个函数都有一个 `prototype` 属性，指向原型对象
> - 原型对象用于存放所有实例共享的属性和方法
> - 通过原型，我们可以实现继承和方法共享，节省内存空间
> - 实例对象通过 `__proto__` 属性访问其构造函数的原型对象

```js
// 1. 定义构造函数
function Person(name) {
    // this指向新创建的实例对象
    // 每个实例都有自己的name属性（存储在实例本身）
    this.name = name;
}

// 2. 在原型上添加方法
// 所有实例共享同一个原型对象，因此共享这个方法
// 这样可以节省内存，不用每个实例都创建一个sayHello方法
Person.prototype.sayHello = function() {
    // this指向调用该方法的实例
    console.log('Hello, ' + this.name);
};

// 3. 使用new创建实例
// new做了4件事：
// (1) 创建一个新的空对象
// (2) 将这个空对象的__proto__指向Person.prototype
// (3) 将Person函数的this绑定到这个新对象，并执行函数
// (4) 返回这个新对象
let p1 = new Person('张三');  // p1.__proto__ === Person.prototype
let p2 = new Person('李四');  // p2.__proto__ === Person.prototype

// 4. 调用方法
// JavaScript查找sayHello的过程：
// (1) 先在p1自身查找 -> 没找到
// (2) 沿着__proto__到Person.prototype查找 -> 找到了！
p1.sayHello();  // "Hello, 张三"
p2.sayHello();  // "Hello, 李四"

// 5. 验证方法共享
// p1和p2的sayHello引用的是同一个函数对象（在Person.prototype上）
console.log(p1.sayHello === p2.sayHello);  // true - 共享同一个方法，节省内存

// 补充说明：如果在构造函数内定义方法，每个实例都会创建一个新的方法副本
// function Person(name) {
//     this.name = name;
//     this.sayHello = function() { ... };  // 不推荐：每个实例都有独立副本
// }
```

**原型链**

> 💡 **原型链的工作机制**：
> - 当访问对象的属性或方法时，JavaScript 会先在对象自身查找
> - 如果找不到，会沿着 `__proto__` 链向上查找原型对象
> - 一直查找到 `Object.prototype`，如果还找不到则返回 `undefined`
> - 这个查找过程形成的链式结构就是原型链
>
> **原型链示意**：
> ```
> 实例对象 p1
>   ↓ __proto__
> Person.prototype
>   ↓ __proto__
> Object.prototype
>   ↓ __proto__
> null
> ```

```js
function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function() {
    console.log('Hello');
};

let p1 = new Person('张三');

// 原型链查找过程的详细说明
// ============================

// 情况1：查找name属性
console.log(p1.name);  // 在实例上找到
// 查找过程：
// (1) 在p1自身的属性中查找name -> 找到了！返回'张三'

// 情况2：查找sayHello方法
console.log(p1.sayHello);  // 在原型上找到
// 查找过程：
// (1) 在p1自身的属性中查找sayHello -> 没找到
// (2) 通过p1.__proto__到Person.prototype中查找 -> 找到了！返回函数

// 情况3：查找toString方法
console.log(p1.toString);  // 在 Object.prototype 上找到
// 查找过程：
// (1) 在p1自身的属性中查找toString -> 没找到
// (2) 通过p1.__proto__到Person.prototype中查找 -> 没找到
// (3) 通过Person.prototype.__proto__到Object.prototype中查找 -> 找到了！

// 原型链的关系验证
// =================

// p1的__proto__指向Person.prototype
console.log(p1.__proto__ === Person.prototype);  // true
// 意思：p1是通过Person构造函数创建的，所以它的原型指向Person.prototype

// Person.prototype的__proto__指向Object.prototype
console.log(Person.prototype.__proto__ === Object.prototype);  // true
// 意思：Person.prototype本质上也是一个对象，所以它的原型指向Object.prototype

// Object.prototype的__proto__是null（原型链的终点）
console.log(Object.prototype.__proto__);  // null
// 意思：Object.prototype是原型链的顶端，没有更上层的原型了

// 使用instanceof判断原型关系
// ==========================

// instanceof检查：p1的原型链上是否有Person.prototype
console.log(p1 instanceof Person);  // true
// 等价于检查：Person.prototype.isPrototypeOf(p1)

// p1的原型链上也有Object.prototype，所以也是Object的实例
console.log(p1 instanceof Object);  // true

// 使用isPrototypeOf()方法判断
console.log(Person.prototype.isPrototypeOf(p1));  // true
// 检查Person.prototype是否在p1的原型链上
```

### 3. 继承

**原型链继承**

```js
function Parent() {
    this.name = 'parent';
    this.colors = ['red', 'blue'];
}

Parent.prototype.sayHello = function() {
    console.log('Hello');
};

function Child() {
    this.age = 18;
}

// 原型链继承
Child.prototype = new Parent();

let child1 = new Child();
child1.colors.push('green');

let child2 = new Child();
console.log(child2.colors);  // ['red', 'blue', 'green']（引用类型共享）
```

**构造函数继承**

```js
function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
}

function Child(name, age) {
    Parent.call(this, name);  // 继承属性
    this.age = age;
}

let child1 = new Child('张三', 18);
child1.colors.push('green');

let child2 = new Child('李四', 20);
console.log(child2.colors);  // ['red', 'blue']（不共享）
```

**组合继承**

```js
function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
}

Parent.prototype.sayHello = function() {
    console.log('Hello');
};

function Child(name, age) {
    Parent.call(this, name);  // 继承属性
    this.age = age;
}

Child.prototype = new Parent();  // 继承方法
Child.prototype.constructor = Child;

let child = new Child('张三', 18);
```

**寄生组合继承（最优）**

```js
function Parent(name) {
    this.name = name;
}

Parent.prototype.sayHello = function() {
    console.log('Hello');
};

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键：使用 Object.create()
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

let child = new Child('张三', 18);
```

**ES6 Class 继承**

见前面【Class】部分

### 4. 面向对象的特性

**封装**

```js
function Person(name, age) {
    // 私有变量
    let _age = age;

    // 公有属性
    this.name = name;

    // 公有方法
    this.getAge = function() {
        return _age;
    };

    this.setAge = function(age) {
        if (age > 0 && age < 150) {
            _age = age;
        }
    };
}

let p = new Person('张三', 18);
console.log(p.getAge());  // 18
p.setAge(20);
console.log(p.getAge());  // 20
```

**继承**

见上面【继承】部分

**多态**

```js
class Animal {
    speak() {
        console.log('动物发出声音');
    }
}

class Dog extends Animal {
    speak() {
        console.log('汪汪汪');
    }
}

class Cat extends Animal {
    speak() {
        console.log('喵喵喵');
    }
}

function makeSound(animal) {
    animal.speak();
}

makeSound(new Dog());  // "汪汪汪"
makeSound(new Cat());  // "喵喵喵"
```

## 九、正则表达式

### 1. 创建正则表达式

```js
// 字面量方式
let reg1 = /pattern/flags;

// 构造函数方式
let reg2 = new RegExp('pattern', 'flags');

// 示例
let reg3 = /hello/i;
let reg4 = new RegExp('hello', 'i');
```

### 2. 修饰符（flags）

```js
// i - 忽略大小写
let reg1 = /hello/i;

// g - 全局匹配
let reg2 = /hello/g;

// m - 多行匹配
let reg3 = /^hello/m;

// s - 让 . 匹配换行符
let reg4 = /hello.world/s;

// u - Unicode 模式
let reg5 = /\u{1F600}/u;

// y - 粘连模式
let reg6 = /hello/y;
```

### 3. 元字符

```js
// . - 匹配任意字符（除换行符）
/h.llo/.test('hello');  // true

// \d - 匹配数字 [0-9]
/\d/.test('5');  // true

// \D - 匹配非数字
/\D/.test('a');  // true

// \w - 匹配字母、数字、下划线 [a-zA-Z0-9_]
/\w/.test('a');  // true

// \W - 匹配非字母、数字、下划线
/\W/.test('@');  // true

// \s - 匹配空白字符
/\s/.test(' ');  // true

// \S - 匹配非空白字符
/\S/.test('a');  // true

// ^ - 匹配开头
/^hello/.test('hello world');  // true

// $ - 匹配结尾
/world$/.test('hello world');  // true

// \b - 匹配单词边界
/\bhello\b/.test('hello world');  // true

// \B - 匹配非单词边界
/\Bhello/.test('xhello');  // true
```

### 4. 量词

```js
// * - 0次或多次
/ab*/.test('a');    // true
/ab*/.test('abbb'); // true

// + - 1次或多次
/ab+/.test('a');    // false
/ab+/.test('ab');   // true

// ? - 0次或1次
/ab?/.test('a');    // true
/ab?/.test('ab');   // true

// {n} - 恰好n次
/a{3}/.test('aaa'); // true

// {n,} - 至少n次
/a{2,}/.test('aa'); // true

// {n,m} - n到m次
/a{2,4}/.test('aaa'); // true
```

### 5. 字符类

```js
// [abc] - 匹配 a 或 b 或 c
/[abc]/.test('b');  // true

// [^abc] - 匹配除了 a、b、c 之外的字符
/[^abc]/.test('d'); // true

// [a-z] - 匹配小写字母
/[a-z]/.test('m');  // true

// [A-Z] - 匹配大写字母
/[A-Z]/.test('M');  // true

// [0-9] - 匹配数字
/[0-9]/.test('5');  // true
```

### 6. 分组和引用

```js
// () - 分组
/(ab)+/.test('ababab');  // true

// \1 \2 - 反向引用
/(\d)\1/.test('11');  // true（匹配两个相同的数字）
/(\d)(\d)\2\1/.test('1221');  // true

// (?:) - 非捕获分组
/(?:ab)+/.test('ababab');  // true（不捕获）
```

### 7. 常用方法

**RegExp 方法**

```js
let reg = /hello/i;

// test() - 测试是否匹配
console.log(reg.test('Hello'));  // true

// exec() - 返回匹配信息
let result = reg.exec('Hello World');
console.log(result);  // ['Hello', index: 0, input: 'Hello World']
```

**String 方法**

```js
let str = 'Hello World';

// match() - 匹配
console.log(str.match(/o/g));  // ['o', 'o']

// search() - 搜索位置
console.log(str.search(/World/));  // 6

// replace() - 替换
console.log(str.replace(/World/, 'JavaScript'));  // "Hello JavaScript"

// split() - 分割
console.log('a1b2c3'.split(/\d/));  // ['a', 'b', 'c', '']
```

### 8. 常用正则表达式

```js
// 手机号
let phoneReg = /^1[3-9]\d{9}$/;

// 邮箱
let emailReg = /^[\w-]+@[\w-]+\.(com|cn|net)$/;

// 身份证号
let idCardReg = /^\d{17}[\dXx]$/;

// QQ号
let qqReg = /^[1-9]\d{4,10}$/;

// 网址
let urlReg = /^https?:\/\/.+/;

// 日期（YYYY-MM-DD）
let dateReg = /^\d{4}-\d{2}-\d{2}$/;

// 密码（6-16位字母数字组合）
let pwdReg = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;

// 中文
let chineseReg = /^[\u4e00-\u9fa5]+$/;

// 去除首尾空格
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}
```

## 十、DOM 操作

> 💡 **DOM 的核心概念**：
> - **DOM**（Document Object Model）文档对象模型
> - 将 HTML 文档表示为一个树形结构，每个节点都是一个对象
> - JavaScript 可以通过 DOM API 来：
>   - 获取元素：`getElementById`、`querySelector` 等
>   - 操作内容：修改文本、HTML、属性等
>   - 修改样式：改变 CSS 样式、添加/删除类名
>   - 操作节点：创建、插入、删除、克隆节点
>   - 绑定事件：响应用户操作
> - DOM 操作是前端开发的基础，但操作 DOM 成本较高，应尽量减少频繁操作

### 1. 获取元素

```js
// 通过 id 获取
let elem = document.getElementById('myId');

//通过类属性获取
let elem=doucument.querySelector('input[value]')

// 通过标签名获取
let elems = document.getElementsByTagName('div');

// 通过类名获取
let elems = document.getElementsByClassName('myClass');

// 通过 name 属性获取
let elems = document.getElementsByName('username');

// 通过选择器获取（推荐）
let elem = document.querySelector('#myId');
let elems = document.querySelectorAll('.myClass');
```

### 2. 操作元素内容

```js
let div = document.querySelector('div');

// innerText - 文本内容（不解析HTML）
div.innerText = 'Hello';
console.log(div.innerText);

// innerHTML - HTML内容（解析HTML）
div.innerHTML = '<strong>Hello</strong>';
console.log(div.innerHTML);

// textContent - 文本内容（包含所有文本节点）
console.log(div.textContent);
```

### 3. 操作元素属性

```js
let img = document.querySelector('img');

// 获取属性
console.log(img.src);
console.log(img.getAttribute('src'));

// 设置属性
img.src = 'new.jpg';
img.setAttribute('alt', '图片');

// 删除属性
img.removeAttribute('alt');

// 判断是否有属性
console.log(img.hasAttribute('src'));
```

### 4. 操作元素样式

**行内样式**

```js
let div = document.querySelector('div');

// 设置样式
div.style.color = 'red';
div.style.fontSize = '20px';
div.style.backgroundColor = 'yellow';

// 获取样式
console.log(div.style.color);
```

**类名操作**

```js
let div = document.querySelector('div');

// className - 会覆盖原来的类名
div.className = 'box';

// classList - 更灵活（推荐）
div.classList.add('active');        // 添加类
div.classList.remove('active');     // 删除类
div.classList.toggle('active');     // 切换类
div.classList.contains('active');   // 是否包含类
```

### 5. 操作元素节点

**创建节点**

```js
// 创建元素节点
let div = document.createElement('div');

// 创建文本节点
let text = document.createTextNode('Hello');

// 创建文档片段
let fragment = document.createDocumentFragment();
```

**添加节点**

```js
let parent = document.querySelector('.parent');
let child = document.createElement('div');

// appendChild - 添加到末尾
parent.appendChild(child);

// insertBefore - 插入到指定节点前
let reference = document.querySelector('.reference');
parent.insertBefore(child, reference);
```

**删除节点**

```js
let parent = document.querySelector('.parent');
let child = document.querySelector('.child');

// removeChild - 删除子节点
parent.removeChild(child);

// remove - 删除自己
child.remove();
```

**克隆节点**

```js
let elem = document.querySelector('div');

// cloneNode(false) - 浅克隆（只克隆元素本身）
let clone1 = elem.cloneNode();

// cloneNode(true) - 深克隆（克隆元素及其后代）
let clone2 = elem.cloneNode(true);
```

### 6. 事件

> 💡 **事件机制的理解**：
> - **事件**是用户或浏览器执行的某种动作（如点击、鼠标移动、键盘按下等）
> - **事件处理**就是当事件发生时，执行特定的代码（事件处理函数）
> - **事件流**包括三个阶段：
>   1. **捕获阶段**：事件从 window 向下传播到目标元素
>   2. **目标阶段**：事件到达目标元素
>   3. **冒泡阶段**：事件从目标元素向上冒泡到 window
> - **事件委托**：利用事件冒泡，将事件监听器绑定在父元素上，减少内存消耗

**事件绑定**

```js
let btn = document.querySelector('button');

// 方式1：on + 事件名（会覆盖）
btn.onclick = function() {
    console.log('点击了');
};

// 方式2：addEventListener（推荐）
btn.addEventListener('click', function() {
    console.log('点击了');
});

// 可以绑定多个
btn.addEventListener('click', handler1);
btn.addEventListener('click', handler2);
```

**事件移除**

```js
function handler() {
    console.log('点击了');
}

btn.addEventListener('click', handler);

// 移除事件
btn.removeEventListener('click', handler);
```

**常用事件**

```js
// 鼠标事件
elem.onclick       // 点击
elem.ondblclick    // 双击
elem.onmousedown   // 鼠标按下
elem.onmouseup     // 鼠标抬起
elem.onmousemove   // 鼠标移动
elem.onmouseover   // 鼠标移入
elem.onmouseout    // 鼠标移出
elem.onmouseenter  // 鼠标进入（不冒泡）
elem.onmouseleave  // 鼠标离开（不冒泡）

// 键盘事件
elem.onkeydown     // 键盘按下
elem.onkeyup       // 键盘抬起
elem.onkeypress    // 键盘按下（已废弃）

// 表单事件
elem.onfocus       // 获得焦点
elem.onblur        // 失去焦点
elem.oninput       // 输入时触发
elem.onchange      // 值改变时触发
elem.onsubmit      // 表单提交

// 其他事件
elem.onload        // 加载完成
elem.onscroll      // 滚动
elem.onresize      // 窗口大小改变
```

**事件对象**

```js
btn.addEventListener('click', function(e) {
    console.log(e.type);          // 事件类型
    console.log(e.target);        // 事件目标
    console.log(e.currentTarget); // 当前元素
    console.log(e.clientX);       // 鼠标X坐标
    console.log(e.clientY);       // 鼠标Y坐标
    console.log(e.keyCode);       // 键盘码

    e.preventDefault();   // 阻止默认行为
    e.stopPropagation();  // 阻止冒泡
});
```

**事件委托**

```js
// 利用事件冒泡，将事件绑定到父元素上
let ul = document.querySelector('ul');

ul.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        console.log('点击了', e.target.innerText);
    }
});
```

## 十一、BOM 操作

> 💡 **BOM 的核心概念**：
> - **BOM**（Browser Object Model）浏览器对象模型
> - 提供了与浏览器窗口交互的对象和方法
> - **核心对象**：
>   - `window`：浏览器窗口的全局对象，所有全局变量和函数都是它的属性和方法
>   - `location`：当前页面的 URL 信息，可用于页面跳转
>   - `navigator`：浏览器信息（用户代理、平台等）
>   - `history`：浏览器历史记录，用于前进/后退
>   - `screen`：屏幕信息
> - BOM 没有统一标准，不同浏览器实现可能略有差异

### 1. window 对象

```js
// 窗口尺寸
console.log(window.innerWidth);   // 可视区域宽度
console.log(window.innerHeight);  // 可视区域高度
console.log(window.outerWidth);   // 浏览器窗口宽度
console.log(window.outerHeight);  // 浏览器窗口高度

// 滚动
window.scrollTo(0, 100);    // 滚动到指定位置
window.scrollBy(0, 100);    // 滚动指定距离

// 打开/关闭窗口
let newWin = window.open('https://www.baidu.com', '_blank');
newWin.close();

// 定时器
let timer1 = setTimeout(() => {
    console.log('1秒后执行');
}, 1000);
clearTimeout(timer1);

let timer2 = setInterval(() => {
    console.log('每1秒执行');
}, 1000);
clearInterval(timer2);

// 对话框
alert('提示信息');
let result = confirm('确认吗?');
let input = prompt('请输入:', '默认值');
```

### 2. location 对象

```js
// 获取URL信息
console.log(location.href);      // 完整URL
console.log(location.protocol);  // 协议
console.log(location.host);      // 主机名+端口
console.log(location.hostname);  // 主机名
console.log(location.port);      // 端口
console.log(location.pathname);  // 路径
console.log(location.search);    // 查询字符串
console.log(location.hash);      // 哈希值

// 跳转页面
location.href = 'https://www.baidu.com';
location.assign('https://www.baidu.com');  // 可后退
location.replace('https://www.baidu.com'); // 不可后退
location.reload();  // 刷新页面
location.reload(true);  // 强制刷新
```

### 3. navigator 对象

```js
// 浏览器信息
console.log(navigator.userAgent);   // 用户代理
console.log(navigator.platform);    // 平台
console.log(navigator.language);    // 语言
console.log(navigator.onLine);      // 是否在线

// 判断移动端
function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
```

### 4. history 对象

```js
// 前进后退
history.back();      // 后退
history.forward();   // 前进
history.go(-1);      // 后退1页
history.go(1);       // 前进1页

// 历史记录数量
console.log(history.length);
```

### 5. 本地存储

> 💡 **本地存储的使用**：
> - **localStorage** 和 **sessionStorage** 都提供了在浏览器中存储键值对的能力
> - **localStorage**：
>   - 永久存储，除非主动删除，否则数据一直存在
>   - 同源的所有页面共享数据
>   - 存储容量一般为 5-10MB
> - **sessionStorage**：
>   - 会话存储，关闭浏览器标签页后数据清除
>   - 只在当前页面（标签页）有效
>   - 存储容量一般为 5-10MB
> - **使用场景**：
>   - localStorage：保存用户设置、主题、语言等需要持久化的数据
>   - sessionStorage：保存表单数据、临时状态等会话级数据
> - **注意事项**：只能存储字符串，对象需要用 `JSON.stringify()` 转换

**localStorage**

```js
// 存储数据（永久存储）
localStorage.setItem('name', '张三');
localStorage.setItem('age', 18);

// 获取数据
console.log(localStorage.getItem('name'));

// 删除数据
localStorage.removeItem('name');

// 清空所有数据
localStorage.clear();

// 存储对象
let user = { name: '张三', age: 18 };
localStorage.setItem('user', JSON.stringify(user));
let userObj = JSON.parse(localStorage.getItem('user'));
```

**sessionStorage**

```js
// 存储数据（会话存储，关闭浏览器就清空）
sessionStorage.setItem('token', 'abc123');

// 其他方法与 localStorage 相同
console.log(sessionStorage.getItem('token'));
sessionStorage.removeItem('token');
sessionStorage.clear();
```

## 十二、网络请求

> 💡 **网络请求的发展**：
> - **XMLHttpRequest**（XHR）：传统的 AJAX 请求方式
>   - 语法较复杂，需要手动处理状态变化
>   - 兼容性好，支持所有浏览器
> - **Fetch API**：现代的网络请求方式（ES6+）
>   - 基于 Promise，语法更简洁
>   - 支持 async/await，代码更易读
>   - 默认不会在 HTTP 错误状态（如 404）时 reject
>   - 部分老浏览器不支持，需要 polyfill
> - **第三方库**：axios、jQuery.ajax 等
>   - 提供了更多功能（拦截器、取消请求等）
>   - 更好的错误处理

### 1. XMLHttpRequest

```js
// 创建 XHR 对象
let xhr = new XMLHttpRequest();

// 配置请求
xhr.open('GET', 'https://api.example.com/data', true);

// 设置请求头
xhr.setRequestHeader('Content-Type', 'application/json');

// 监听状态变化
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        }
    }
};

// 发送请求
xhr.send();

// POST 请求
let xhr2 = new XMLHttpRequest();
xhr2.open('POST', 'https://api.example.com/data', true);
xhr2.setRequestHeader('Content-Type', 'application/json');
xhr2.send(JSON.stringify({ name: '张三' }));
```

### 2. Fetch API

```js
// GET 请求
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// POST 请求
fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: '张三' })
})
    .then(response => response.json())
    .then(data => console.log(data));

// async/await 方式
async function getData() {
    try {
        let response = await fetch('https://api.example.com/data');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

## 十三、常见算法和技巧

> 💡 **常见算法的重要性**：
> - 掌握这些常用算法和技巧是前端开发的必备技能
> - **数组操作**：去重、扁平化、排序等是日常开发中的高频需求
> - **对象操作**：深拷贝、浅拷贝理解引用类型的本质
> - **性能优化**：防抖、节流能显著提升应用性能
> - **函数式编程**：柯里化等技巧让代码更灵活、可复用
> - 这些知识点也是面试中的常考题目

### 1. 数组去重

```js
// 方法1：Set
let arr = [1, 2, 2, 3, 3, 4];
let unique = [...new Set(arr)];

// 方法2：filter
let unique = arr.filter((item, index) => arr.indexOf(item) === index);

// 方法3：reduce
let unique = arr.reduce((acc, item) => {
    return acc.includes(item) ? acc : [...acc, item];
}, []);
```

### 2. 数组扁平化

```js
let arr = [1, [2, [3, [4]]]];

// 方法1：flat()
let flat = arr.flat(Infinity);

// 方法2：递归
function flatten(arr) {
    let result = [];
    for (let item of arr) {
        if (Array.isArray(item)) {
            result.push(...flatten(item));
        } else {
            result.push(item);
        }
    }
    return result;
}
```

### 3. 深拷贝

> 💡 **深拷贝 vs 浅拷贝**：
> - **浅拷贝**：只复制对象的第一层属性，如果属性值是引用类型，则复制的是引用
>   - 方法：`Object.assign()`、扩展运算符 `{...obj}`
> - **深拷贝**：递归复制对象的所有层级，创建完全独立的副本
>   - 修改深拷贝后的对象不会影响原对象
> - **使用场景**：
>   - 需要完全独立的对象副本时使用深拷贝
>   - 避免修改对象时影响其他引用
> - **注意事项**：
>   - `JSON.parse(JSON.stringify())` 方法简单但有局限性：
>     - 不能复制函数、undefined、Symbol
>     - 不能处理循环引用
>     - 日期对象会变成字符串

```js
// 方法1：JSON（简单但有局限）
let obj = { name: '张三', age: 18 };
let copy = JSON.parse(JSON.stringify(obj));

// 方法2：递归实现深拷贝
function deepClone(obj) {
    // 基础情况1：如果是null，直接返回null
    // 基础情况2：如果不是对象类型（是基本类型），直接返回原值
    // typeof null === 'object' 是JS的一个历史bug，所以要单独判断
    if (obj === null || typeof obj !== 'object') return obj;

    // 判断是数组还是对象，创建对应的空容器
    // Array.isArray() 检查obj是否为数组
    let clone = Array.isArray(obj) ? [] : {};

    // 遍历对象的所有属性
    for (let key in obj) {
        // hasOwnProperty()检查key是否是obj自身的属性（不是继承来的）
        // 这样可以避免拷贝原型链上的属性
        if (obj.hasOwnProperty(key)) {
            // 递归调用deepClone，处理嵌套的对象或数组
            // 如果obj[key]是对象或数组，会继续递归
            // 如果obj[key]是基本类型，会直接返回值
            clone[key] = deepClone(obj[key]);
        }
    }

    // 返回克隆后的新对象
    return clone;
}

// 使用示例：
// =========
let original = {
    name: '张三',
    age: 18,
    hobbies: ['reading', 'coding'],  // 数组（引用类型）
    address: {                        // 嵌套对象（引用类型）
        city: '北京',
        district: '朝阳'
    }
};

// 深拷贝：创建完全独立的副本
let cloned = deepClone(original);

// 修改克隆后的对象不会影响原对象
cloned.name = '李四';
cloned.hobbies.push('gaming');
cloned.address.city = '上海';

console.log(original.name);         // '张三' - 未被修改
console.log(original.hobbies);      // ['reading', 'coding'] - 未被修改
console.log(original.address.city); // '北京' - 未被修改
```

### 4. 防抖和节流

> 💡 **防抖和节流的作用**：
> - 两者都是性能优化的重要手段，用于控制函数的执行频率
> - **防抖（debounce）**：
>   - 原理：在事件触发 n 秒后再执行回调，如果 n 秒内又触发，则重新计时
>   - 效果：无论触发多少次，只执行最后一次
>   - 场景：搜索框输入、窗口 resize、表单验证
>   - 类比：电梯门，有人进来就重新计时关门时间
> - **节流（throttle）**：
>   - 原理：规定时间内只执行一次，如果多次触发，只有第一次生效
>   - 效果：降低执行频率，但保证一定时间内至少执行一次
>   - 场景：滚动加载、鼠标移动、按钮重复点击
>   - 类比：技能冷却，冷却时间内无法再次释放

**防抖（debounce）**

```js
// 防抖函数的实现
function debounce(fn, delay) {
    // timer变量存储定时器ID，通过闭包保持在内存中
    let timer = null;

    // 返回一个新函数（闭包），这个函数会代替原函数绑定到事件上
    return function(...args) {
        // 每次事件触发时：

        // 1. 清除之前的定时器（如果存在）
        //    这是防抖的关键：只要在delay时间内再次触发，就重新计时
        clearTimeout(timer);

        // 2. 设置新的定时器
        //    delay毫秒后，才真正执行fn函数
        timer = setTimeout(() => {
            // 使用apply确保fn执行时的this指向正确
            // args是用户传入的所有参数
            fn.apply(this, args);
        }, delay);

        // 总结：如果500ms内不断输入，timer会不断被清除和重置
        // 只有停止输入500ms后，fn才会真正执行
    };
}

// 使用场景：搜索框输入
let input = document.querySelector('input');
input.addEventListener('input', debounce(function() {
    // this指向input元素
    console.log(this.value);  // 只有停止输入500ms后才打印
}, 500));

// 执行时间轴示例（假设delay=500ms）：
// 0ms:    用户输入'a'    -> 设置timer，500ms后执行
// 200ms:  用户输入'b'    -> 清除之前的timer，重新设置，700ms后执行
// 400ms:  用户输入'c'    -> 清除之前的timer，重新设置，900ms后执行
// 900ms:  （用户停止输入500ms）-> 执行fn，打印'abc'
```

**节流（throttle）**

```js
// 节流函数的实现
function throttle(fn, delay) {
    // lastTime记录上一次执行fn的时间戳
    // 初始值为0，表示还没有执行过
    let lastTime = 0;

    // 返回一个新函数（闭包），代替原函数绑定到事件上
    return function(...args) {
        // 每次事件触发时：

        // 1. 获取当前时间戳（毫秒）
        let now = Date.now();

        // 2. 判断距离上次执行是否已经超过delay毫秒
        if (now - lastTime >= delay) {
            // 如果超过了delay时间，可以执行fn

            // 执行函数，保持正确的this和参数
            fn.apply(this, args);

            // 更新lastTime为当前时间，作为下次判断的基准
            lastTime = now;

            // 总结：在delay时间内，无论触发多少次事件，fn只执行一次
            // 相当于给函数加了一个"冷却时间"
        }
        // 如果还在冷却期内（now - lastTime < delay），什么都不做
    };
}

// 使用场景：页面滚动
window.addEventListener('scroll', throttle(function() {
    console.log('滚动了');  // 每500ms最多打印一次
}, 500));

// 执行时间轴示例（假设delay=500ms）：
// 0ms:    用户滚动     -> lastTime=0, now=0, 0-0>=500? 否 -> 不执行
//                        （首次会立即执行，因为0-0>=500）
// 100ms:  用户滚动     -> lastTime=0, now=100, 100-0>=500? 否 -> 不执行
// 300ms:  用户滚动     -> lastTime=0, now=300, 300-0>=500? 否 -> 不执行
// 600ms:  用户滚动     -> lastTime=0, now=600, 600-0>=500? 是 -> 执行fn，lastTime=600
// 800ms:  用户滚动     -> lastTime=600, now=800, 800-600>=500? 否 -> 不执行
// 1200ms: 用户滚动     -> lastTime=600, now=1200, 1200-600>=500? 是 -> 执行fn，lastTime=1200
```

### 5. 函数柯里化

```js
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

// 使用
function sum(a, b, c) {
    return a + b + c;
}

let curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3));  // 6
console.log(curriedSum(1, 2)(3));  // 6
```

## 十四、错误处理

### 1. try...catch

```js
try {
    // 可能出错的代码
    let result = JSON.parse('invalid json');
} catch (error) {
    // 处理错误
    console.error('错误:', error.message);
} finally {
    // 无论是否出错都会执行
    console.log('清理工作');
}
```

### 2. 抛出错误

```js
function divide(a, b) {
    if (b === 0) {
        throw new Error('除数不能为0');
    }
    return a / b;
}

try {
    divide(10, 0);
} catch (error) {
    console.error(error.message);
}
```

### 3. 自定义错误

```js
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

function validateAge(age) {
    if (age < 0 || age > 150) {
        throw new ValidationError('年龄无效');
    }
}

try {
    validateAge(200);
} catch (error) {
    if (error instanceof ValidationError) {
        console.log('验证错误:', error.message);
    }
}
```

## 十五、性能优化

### 1. 减少 DOM 操作

```js
// 不好的做法
for (let i = 0; i < 1000; i++) {
    document.body.innerHTML += '<div>' + i + '</div>';
}

// 好的做法
let html = '';
for (let i = 0; i < 1000; i++) {
    html += '<div>' + i + '</div>';
}
document.body.innerHTML = html;

// 更好的做法
let fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    let div = document.createElement('div');
    div.textContent = i;
    fragment.appendChild(div);
}
document.body.appendChild(fragment);
```

### 2. 事件委托

```js
// 不好的做法
let items = document.querySelectorAll('li');
items.forEach(item => {
    item.addEventListener('click', function() {
        console.log(this.textContent);
    });
});

// 好的做法
document.querySelector('ul').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        console.log(e.target.textContent);
    }
});
```

### 3. 使用 requestAnimationFrame

```js
// 平滑动画
function animate() {
    // 动画逻辑
    elem.style.left = elem.offsetLeft + 1 + 'px';

    if (elem.offsetLeft < 500) {
        requestAnimationFrame(animate);
    }
}

requestAnimationFrame(animate);
```

---

> **学习建议**
>
> 1. **基础要扎实**：变量、数据类型、运算符、流程控制等基础知识要反复练习
> 2. **多写代码**：JavaScript 是实践性很强的语言，要多动手写代码
> 3. **理解原理**：不仅要知道怎么用，还要知道为什么这样用
> 4. **阅读文档**：MDN 是最权威的 JavaScript 文档，遇到问题多查文档
> 5. **项目实战**：通过实际项目来巩固所学知识
> 6. **关注新特性**：JavaScript 在不断发展，要关注 ES6+ 的新特性
>
> 🔗 **推荐资源**
> - [MDN Web Docs](https://developer.mozilla.org/zh-CN/)
> - [JavaScript.info](https://javascript.info/)
> - [ES6 入门教程](https://es6.ruanyifeng.com/) 
