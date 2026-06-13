---
title: Axios 完整学习笔记
date: 2025-11-20
categories:
  - 前端开发
tags:
  - JavaScript
  - Axios
  - HTTP
---

# Axios 完整学习笔记

> Axios 是一个基于 Promise 的 HTTP 客户端，适用于浏览器和 Node.js 环境。本笔记涵盖从基础使用到高级特性、源码实现的完整内容。

---

## 目录

- [一、环境准备与Mock服务](#一环境准备与mock服务)
- [二、Axios基础](#二axios基础)
- [三、Axios核心特性](#三axios核心特性)
- [四、高级应用](#四高级应用)
- [五、源码实现原理](#五源码实现原理)
- [六、实战封装](#六实战封装)
- [七、最佳实践](#七最佳实践)
- [八、常见问题与解决方案](#八常见问题与解决方案)

---

## 一、环境准备与Mock服务

### 1.1 安装 json-server

作为前端开发工程师，在后端接口未就绪时，我们可以使用 json-server 快速搭建 Mock 服务。

```bash
# 全局安装
npm install -g json-server

# 或者项目本地安装
npm install --save-dev json-server
```

### 1.2 创建 Mock 数据

创建 `db.json` 文件：

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": {
    "name": "typicode"
  }
}
```

### 1.3 启动 Mock 服务

```bash
# 在 db.json 所在目录执行
json-server db.json

# 指定端口
json-server --watch db.json --port 3000
```

服务启动后，会自动生成 RESTful API：

- `GET    /posts`       - 获取所有文章
- `GET    /posts/1`     - 获取 id=1 的文章
- `POST   /posts`       - 创建文章
- `PUT    /posts/1`     - 更新文章
- `PATCH  /posts/1`     - 部分更新文章
- `DELETE /posts/1`     - 删除文章

---

## 二、Axios基础

### 2.1 Axios 简介

**什么是 Axios？**

- 前端最流行的 AJAX 请求库
- React/Vue 官方推荐的 HTTP 客户端
- 基于 XMLHttpRequest + Promise 封装
- 官方文档：https://github.com/axios/axios

**核心特点**

✅ 基于 Promise 的异步处理
✅ 浏览器和 Node.js 环境通用
✅ 支持请求/响应拦截器
✅ 支持请求取消
✅ 自动转换 JSON 数据
✅ 客户端支持防御 XSRF
✅ 批量发送多个请求

### 2.2 安装 Axios

```bash
# npm
npm install axios

# yarn
yarn add axios

# pnpm
pnpm add axios
```

CDN 引入（在 HTML 中直接使用，无需打包工具）：

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

### 2.3 基本使用

#### 2.3.1 发送 GET 请求

```javascript
// 方式1：简洁写法
axios.get('http://localhost:3000/posts')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// 方式2：带参数
axios.get('http://localhost:3000/posts', {
  params: {
    id: 1,
    author: 'typicode'
  }
})
  .then(response => console.log(response.data));

// 方式3：通用写法
axios({
  method: 'GET',
  url: 'http://localhost:3000/posts',
  params: { id: 1 }
})
  .then(response => console.log(response.data));
```

> ⚠️ **注意事项**:
> - **params 会自动编码**:特殊字符会被 encodeURIComponent 处理
> - **GET 请求参数在 URL 中**:params 配置项会拼接到 URL ?后面
> - **response.data** 是响应体数据,已自动解析 JSON
> - **catch 捕获错误**:包括网络错误、4xx/5xx 状态码等
> - params 中的数组和对象会自动序列化
>
> ```javascript
> // params自动编码示例
> axios.get('/api/search', {
>   params: {
>     keyword: '你好 世界',  // 自动编码为 %E4%BD%A0%E5%A5%BD%20%E4%B8%96%E7%95%8C
>     tags: ['vue', 'react']  // 自动序列化为 tags[]=vue&tags[]=react
>   }
> });
>
> // 完整的错误处理
> axios.get('/api/posts')
>   .then(response => {
>     console.log('状态码:', response.status);        // 200
>     console.log('响应头:', response.headers);       // {...}
>     console.log('响应数据:', response.data);        // 实际数据
>     console.log('请求配置:', response.config);      // 请求配置
>   })
>   .catch(error => {
>     if (error.response) {
>       // 服务器返回了错误状态码
>       console.log('错误状态:', error.response.status);
>       console.log('错误数据:', error.response.data);
>     } else if (error.request) {
>       // 请求已发出但没有收到响应
>       console.log('无响应:', error.request);
>     } else {
>       // 请求配置出错
>       console.log('配置错误:', error.message);
>     }
>   });
> ```

> 🎯 **实际应用场景**:
> ```javascript
> // 场景1:分页查询列表
> async function getPosts(page = 1, pageSize = 10) {
>   try {
>     const { data } = await axios.get('/api/posts', {
>       params: {
>         _page: page,
>         _limit: pageSize,
>         _sort: 'createdAt',
>         _order: 'desc'
>       }
>     });
>     return data;
>   } catch (error) {
>     console.error('获取文章失败:', error);
>     throw error;
>   }
> }
>
> // 场景2:搜索功能(支持多条件)
> function searchPosts(filters) {
>   return axios.get('/api/posts', {
>     params: {
>       q: filters.keyword,        // 关键词
>       category: filters.category, // 分类
>       tags: filters.tags,        // 标签数组
>       minViews: filters.minViews // 最小浏览量
>     }
>   });
> }
>
> // 使用示例
> searchPosts({
>   keyword: 'axios',
>   category: 'tutorial',
>   tags: ['http', 'ajax'],
>   minViews: 100
> }).then(({ data }) => {
>   console.log('搜索结果:', data);
> });
>
> // 场景3:获取单条数据详情
> function getPostDetail(id) {
>   return axios.get(`/api/posts/${id}`, {
>     params: {
>       _embed: 'comments'  // 关联查询评论
>     }
>   });
> }
> ```

#### 2.3.2 发送 POST 请求

```javascript
// 方式1：简洁写法
axios.post('http://localhost:3000/posts', {
  title: 'New Post',
  author: 'John'
})
  .then(response => console.log(response.data));

// 方式2：通用写法
axios({
  method: 'POST',
  url: 'http://localhost:3000/posts',
  data: {
    title: 'New Post',
    author: 'John'
  }
})
  .then(response => console.log(response.data));
```

#### 2.3.3 其他请求方法

```javascript
// PUT - 完整更新
axios.put('http://localhost:3000/posts/1', {
  id: 1,
  title: 'Updated Post',
  author: 'John'
});

// PATCH - 部分更新
axios.patch('http://localhost:3000/posts/1', {
  title: 'Partially Updated'
});

// DELETE - 删除
axios.delete('http://localhost:3000/posts/1');
```

### 2.4 响应结构

Axios 响应对象包含以下属性：

```javascript
{
  data: {},           // 服务器返回的数据
  status: 200,        // HTTP 状态码
  statusText: 'OK',   // HTTP 状态文本
  headers: {},        // 响应头
  config: {},         // 请求配置
  request: {}         // 原始请求对象（XMLHttpRequest 或 http.ClientRequest）
}
```

**示例：**

```javascript
axios.get('http://localhost:3000/posts/1')
  .then(response => {
    console.log('数据:', response.data);
    console.log('状态码:', response.status);
    console.log('状态文本:', response.statusText);
    console.log('响应头:', response.headers);
  });
```

---

## 三、Axios核心特性

### 3.1 默认配置

#### 3.1.1 全局默认配置

```javascript
// 设置全局默认值
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.timeout = 5000;
axios.defaults.headers.common['Authorization'] = 'Bearer token';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 使用时无需重复配置
axios.get('/posts').then(response => console.log(response.data));
```

#### 3.1.2 自定义实例配置

```javascript
// 创建自定义实例
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
});

// 使用自定义实例
instance.get('/posts').then(response => console.log(response.data));

// 修改实例配置
instance.defaults.timeout = 5000;
```

#### 3.1.3 配置优先级

配置优先级：**请求配置 > 实例配置 > 全局配置**

```javascript
// 全局配置
axios.defaults.timeout = 5000;

// 实例配置
const instance = axios.create({
  timeout: 3000  // 覆盖全局配置
});

// 请求配置
instance.get('/posts', {
  timeout: 1000  // 覆盖实例配置
});
```

### 3.2 拦截器（Interceptors）

拦截器允许在请求或响应被处理前进行拦截和修改。

#### 3.2.1 请求拦截器

```javascript
// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    console.log('请求拦截器执行', config);

    // 例如：添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 例如：显示加载动画
    // showLoading();

    return config;
  },
  error => {
    // 对请求错误做些什么
    console.error('请求拦截器错误', error);
    return Promise.reject(error);
  }
);
```

#### 3.2.2 响应拦截器

```javascript
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 2xx 范围内的状态码都会触发该函数
    console.log('响应拦截器执行', response);

    // 例如：隐藏加载动画
    // hideLoading();

    // 直接返回数据部分
    return response.data;                  
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数
    console.error('响应拦截器错误', error);

    // 例如：统一错误处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，跳转登录
          console.log('请先登录');
          break;
        case 404:
          console.log('请求的资源不存在');
          break;
        case 500:
          console.log('服务器错误');
          break;
      }
    }

    return Promise.reject(error);
  }
);
```

#### 3.2.3 多个拦截器执行顺序

**执行顺序：** 请求拦截器2 → 请求拦截器1 → 发送请求 → 响应拦截器1 → 响应拦截器2

```javascript
// 请求拦截器1（后添加的先执行）
axios.interceptors.request.use(
  config => {
    console.log('请求拦截器1 - 成功');
    return config;
  },
  error => {
    console.log('请求拦截器1 - 失败');
    return Promise.reject(error);
  }
);

// 请求拦截器2
axios.interceptors.request.use(
  config => {
    console.log('请求拦截器2 - 成功');
    return config;
  },
  error => {
    console.log('请求拦截器2 - 失败');
    return Promise.reject(error);
  }
);

// 响应拦截器1（先添加的先执行）
axios.interceptors.response.use(
  response => {
    console.log('响应拦截器1 - 成功');
    return response;
  },
  error => {
    console.log('响应拦截器1 - 失败');
    return Promise.reject(error);
  }
);

// 响应拦截器2
axios.interceptors.response.use(
  response => {
    console.log('响应拦截器2 - 成功');
    return response;
  },
  error => {
    console.log('响应拦截器2 - 失败');
    return Promise.reject(error);
  }
);

// 发送请求
axios.get('http://localhost:3000/posts');

/* 输出顺序：
  请求拦截器2 - 成功
  请求拦截器1 - 成功
  响应拦截器1 - 成功
  响应拦截器2 - 成功
*/
```

#### 3.2.4 移除拦截器

```javascript
// 保存拦截器引用
const myInterceptor = axios.interceptors.request.use(config => config);

// 移除拦截器
axios.interceptors.request.eject(myInterceptor);
```

### 3.3 取消请求

> ⚠️ **重要**：`CancelToken` 自 axios v0.22.0 起已被**官方废弃**（仍可用，但不推荐）。新项目请优先使用下面 3.3.1 的 `AbortController`（浏览器原生标准 API）。下方 3.3.2 的 `CancelToken` 写法仅供阅读老代码时参考。

#### 3.3.1 使用 AbortController（推荐）

```javascript
// AbortController 是浏览器原生 API，axios v0.22+ 原生支持
const controller = new AbortController();

axios.get('http://localhost:3000/posts', {
  signal: controller.signal  // 把 signal 传给 axios
}).catch(error => {
  // 被取消时 error.name 为 'CanceledError'
  if (axios.isCancel(error)) {
    console.log('请求被取消');
  }
});

// 需要时调用 abort() 取消请求
controller.abort();
```

实际场景：搜索框输入时取消上一次未完成的请求（防止旧结果覆盖新结果）。

```javascript
let controller = null;

function search(keyword) {
  // 取消上一次请求
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();

  return axios
    .get('/api/search', {
      params: { keyword },
      signal: controller.signal,
    })
    .then(res => res.data)
    .catch(error => {
      if (!axios.isCancel(error)) {
        throw error; // 只忽略「取消」错误，其他错误照常抛出
      }
    });
}
```

#### 3.3.2 使用 CancelToken（旧写法，已废弃）

```javascript
const CancelToken = axios.CancelToken;
let cancel;

// 方式1：使用 CancelToken.source
const source = CancelToken.source();

axios.get('http://localhost:3000/posts', {
  cancelToken: source.token
}).catch(error => {
  if (axios.isCancel(error)) {
    console.log('请求被取消:', error.message);
  }
});

// 取消请求
source.cancel('用户主动取消请求');

// 方式2：使用 CancelToken 构造函数
axios.get('http://localhost:3000/posts', {
  cancelToken: new CancelToken(c => {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 取消请求
cancel('操作被用户取消');
```

#### 3.3.3 实际应用场景

**场景1：防止重复请求**

```javascript
let cancel;

function fetchData() {
  // 如果存在上一次请求，先取消
  if (cancel) {
    cancel('取消上一次请求');
  }

  axios.get('http://localhost:3000/posts', {
    cancelToken: new axios.CancelToken(c => {
      cancel = c;
    })
  }).then(response => {
    console.log(response.data);
    cancel = null; // 请求完成后重置
  }).catch(error => {
    if (axios.isCancel(error)) {
      console.log('请求被取消');
    }
  });
}

// 连续调用，只有最后一次请求会成功
fetchData();
fetchData();
fetchData();
```

**场景2：页面切换时取消未完成请求**

```javascript
class DataService {
  constructor() {
    this.pendingRequests = new Map();
  }

  request(config) {
    const requestKey = `${config.method}_${config.url}`;

    // 取消之前相同的请求
    if (this.pendingRequests.has(requestKey)) {
      this.pendingRequests.get(requestKey)();
    }

    // 添加 cancelToken
    config.cancelToken = new axios.CancelToken(cancel => {
      this.pendingRequests.set(requestKey, cancel);
    });

    return axios(config).finally(() => {
      this.pendingRequests.delete(requestKey);
    });
  }

  cancelAll() {
    this.pendingRequests.forEach(cancel => cancel());
    this.pendingRequests.clear();
  }
}

// 使用
const dataService = new DataService();

// 组件卸载时取消所有请求
window.addEventListener('beforeunload', () => {
  dataService.cancelAll();
});
```

### 3.4 并发请求

#### 3.4.1 使用 axios.all 和 axios.spread

```javascript
// 并发多个请求
axios.all([
  axios.get('http://localhost:3000/posts'),
  axios.get('http://localhost:3000/comments')
])
  .then(axios.spread((postsRes, commentsRes) => {
    console.log('文章:', postsRes.data);
    console.log('评论:', commentsRes.data);
  }))
  .catch(error => {
    console.error('请求失败:', error);
  });
```

#### 3.4.2 使用 Promise.all（推荐）

```javascript
// 现代方式：使用原生 Promise.all
Promise.all([
  axios.get('http://localhost:3000/posts'),
  axios.get('http://localhost:3000/comments')
])
  .then(([postsRes, commentsRes]) => {
    console.log('文章:', postsRes.data);
    console.log('评论:', commentsRes.data);
  })
  .catch(error => {
    console.error('请求失败:', error);
  });
```

#### 3.4.3 使用 Promise.allSettled（更安全）

```javascript
// 即使某个请求失败，也能获取其他成功的结果
Promise.allSettled([
  axios.get('http://localhost:3000/posts'),
  axios.get('http://localhost:3000/invalid-url'), // 会失败
  axios.get('http://localhost:3000/comments')
])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`请求 ${index} 成功:`, result.value.data);
      } else {
        console.error(`请求 ${index} 失败:`, result.reason.message);
      }
    });
  });
```

---

## 四、高级应用

### 4.1 错误处理

#### 4.1.1 错误类型识别

```javascript
axios.get('http://localhost:3000/posts')
  .catch(error => {
    if (error.response) {
      // 服务器返回了错误状态码（2xx 之外）
      console.log('响应错误:', error.response.data);
      console.log('状态码:', error.response.status);
      console.log('响应头:', error.response.headers);
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.log('网络错误:', error.request);
    } else {
      // 发送请求时出了点问题
      console.log('错误:', error.message);
    }
    console.log('配置:', error.config);
  });
```

#### 4.1.2 统一错误处理

```javascript
// 创建统一的错误处理器
function handleError(error) {
  if (axios.isCancel(error)) {
    console.log('请求被取消:', error.message);
    return Promise.reject({ type: 'cancel', message: error.message });
  }

  let errorMessage = '未知错误';

  if (error.response) {
    // 服务器错误
    const { status, data } = error.response;

    switch (status) {
      case 400:
        errorMessage = '请求参数错误';
        break;
      case 401:
        errorMessage = '未授权，请重新登录';
        // 可以在这里跳转到登录页
        // router.push('/login');
        break;
      case 403:
        errorMessage = '拒绝访问';
        break;
      case 404:
        errorMessage = '请求的资源不存在';
        break;
      case 500:
        errorMessage = '服务器内部错误';
        break;
      case 502:
        errorMessage = '网关错误';
        break;
      case 503:
        errorMessage = '服务不可用';
        break;
      case 504:
        errorMessage = '网关超时';
        break;
      default:
        errorMessage = data.message || `服务器错误 ${status}`;
    }
  } else if (error.request) {
    // 网络错误
    errorMessage = '网络连接失败，请检查网络';
  } else {
    // 其他错误
    errorMessage = error.message || '请求失败';
  }

  // 统一提示（可以使用 UI 库的提示组件）
  console.error(errorMessage);
  // Toast.error(errorMessage);

  return Promise.reject({
    type: 'error',
    message: errorMessage,
    originalError: error
  });
}

// 在响应拦截器中使用
axios.interceptors.response.use(
  response => response,
  error => handleError(error)
);
```

#### 4.1.3 重试机制

```javascript
// 添加请求重试功能
axios.interceptors.response.use(
  response => response,
  error => {
    const config = error.config;

    // 如果没有配置重试或重试次数用完，直接返回错误
    if (!config || !config.retry) {
      return Promise.reject(error);
    }

    // 设置重试计数器
    config.__retryCount = config.__retryCount || 0;

    // 检查是否已达到最大重试次数
    if (config.__retryCount >= config.retry) {
      return Promise.reject(error);
    }

    // 增加重试次数
    config.__retryCount += 1;

    console.log(`请求失败，${config.retryDelay}ms 后进行第 ${config.__retryCount} 次重试`);

    // 创建延迟 Promise
    const backoff = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, config.retryDelay || 1000);
    });

    // 返回重试的 Promise
    return backoff.then(() => {
      return axios(config);
    });
  }
);

// 使用重试配置
axios.get('http://localhost:3000/posts', {
  retry: 3,           // 重试次数
  retryDelay: 1000    // 重试延迟（毫秒）
})
  .then(response => console.log(response.data))
  .catch(error => console.error('请求失败:', error));
```

### 4.2 请求/响应数据转换

#### 4.2.1 自定义转换器

```javascript
const instance = axios.create({
  // 请求数据转换器
  transformRequest: [
    (data, headers) => {
      // 对发送的数据进行处理
      if (data instanceof FormData) {
        return data;
      }

      // 转换为 JSON
      headers['Content-Type'] = 'application/json';
      return JSON.stringify(data);
    }
  ],

  // 响应数据转换器
  transformResponse: [
    (data) => {
      // 对响应数据进行处理
      try {
        const parsed = JSON.parse(data);

        // 统一处理后端返回的数据格式
        if (parsed.code === 200) {
          return parsed.data;
        } else {
          throw new Error(parsed.message || '请求失败');
        }
      } catch (e) {
        return data;
      }
    }
  ]
});
```

#### 4.2.2 处理特殊数据格式

```javascript
// 发送 FormData
const formData = new FormData();
formData.append('username', 'John');
formData.append('file', fileInput.files[0]);

axios.post('http://localhost:3000/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

// 发送 URLSearchParams
const params = new URLSearchParams();
params.append('username', 'John');
params.append('age', '30');

axios.post('http://localhost:3000/user', params, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
```

### 4.3 上传和下载

#### 4.3.1 文件上传with进度监控

```javascript
function uploadFile(file, onProgress) {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post('http://localhost:3000/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(`上传进度: ${percentCompleted}%`);

      // 回调函数通知外部
      if (onProgress) {
        onProgress(percentCompleted);
      }
    }
  });
}

// 使用
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];

  uploadFile(file, (progress) => {
    console.log(`当前进度: ${progress}%`);
    // 更新 UI 进度条
  })
    .then(response => console.log('上传成功:', response.data))
    .catch(error => console.error('上传失败:', error));
});
```

#### 4.3.2 文件下载with进度监控

```javascript
function downloadFile(url, filename, onProgress) {
  return axios.get(url, {
    responseType: 'blob',  // 重要：设置响应类型为 blob
    onDownloadProgress: progressEvent => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(`下载进度: ${percentCompleted}%`);

      if (onProgress) {
        onProgress(percentCompleted);
      }
    }
  }).then(response => {
    // 创建 blob URL
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    // 清理
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  });
}

// 使用
downloadFile(
  'http://localhost:3000/files/document.pdf',
  'document.pdf',
  (progress) => console.log(`下载进度: ${progress}%`)
);
```

### 4.4 超时处理

```javascript
// 全局超时设置
axios.defaults.timeout = 5000;

// 单个请求超时设置
axios.get('http://localhost:3000/posts', {
  timeout: 3000  // 3秒超时
})
  .catch(error => {
    if (error.code === 'ECONNABORTED') {
      console.log('请求超时');
    }
  });

// 动态超时设置
function requestWithTimeout(config, timeout = 5000) {
  return axios({
    ...config,
    timeout,
    signal: AbortSignal.timeout(timeout) // 现代浏览器支持
  });
}
```

### 4.5 并发控制

限制同时发送的请求数量，防止请求过多导致浏览器卡顿或服务器压力过大。

```javascript
class RequestQueue {
  constructor(maxConcurrent = 5) {
    this.maxConcurrent = maxConcurrent;  // 最大并发数
    this.currentCount = 0;                // 当前并发数
    this.queue = [];                      // 请求队列
  }

  async request(config) {
    // 如果当前并发数已达上限，等待
    while (this.currentCount >= this.maxConcurrent) {
      await new Promise(resolve => {
        this.queue.push(resolve);
      });
    }

    this.currentCount++;

    try {
      const response = await axios(config);
      return response;
    } finally {
      this.currentCount--;

      // 通知队列中的下一个请求
      if (this.queue.length > 0) {
        const resolve = this.queue.shift();
        resolve();
      }
    }
  }
}

// 使用
const requestQueue = new RequestQueue(3); // 最多同时3个请求

const urls = [
  'http://localhost:3000/posts/1',
  'http://localhost:3000/posts/2',
  'http://localhost:3000/posts/3',
  'http://localhost:3000/posts/4',
  'http://localhost:3000/posts/5',
];

Promise.all(
  urls.map(url => requestQueue.request({ method: 'GET', url }))
).then(responses => {
  console.log('所有请求完成:', responses);
});
```

### 4.6 请求缓存

```javascript
class RequestCache {
  constructor(maxAge = 60000) {
    this.cache = new Map();
    this.maxAge = maxAge; // 缓存有效期（毫秒）
  }

  generateKey(config) {
    // 根据请求配置生成唯一key
    return `${config.method}_${config.url}_${JSON.stringify(config.params || {})}`;
  }

  get(config) {
    const key = this.generateKey(config);
    const cached = this.cache.get(key);

    if (!cached) return null;

    // 检查是否过期
    if (Date.now() - cached.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  set(config, data) {
    const key = this.generateKey(config);
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clear() {
    this.cache.clear();
  }
}

// 创建缓存实例
const cache = new RequestCache(60000); // 缓存60秒

// 添加请求拦截器使用缓存
axios.interceptors.request.use(config => {
  // 只对 GET 请求使用缓存
  if (config.method.toLowerCase() === 'get' && config.useCache !== false) {
    const cached = cache.get(config);
    if (cached) {
      console.log('使用缓存数据');
      // 直接返回缓存的数据，阻止实际请求
      return Promise.reject({
        __cached: true,
        data: cached
      });
    }
  }
  return config;
});

// 添加响应拦截器保存缓存
axios.interceptors.response.use(
  response => {
    if (response.config.method.toLowerCase() === 'get') {
      cache.set(response.config, response.data);
    }
    return response;
  },
  error => {
    // 如果是缓存数据，直接返回
    if (error.__cached) {
      return Promise.resolve({ data: error.data });
    }
    return Promise.reject(error);
  }
);

// 使用
axios.get('http://localhost:3000/posts') // 第一次发送实际请求
  .then(response => console.log(response.data));

axios.get('http://localhost:3000/posts') // 使用缓存
  .then(response => console.log(response.data));

// 禁用缓存
axios.get('http://localhost:3000/posts', { useCache: false });
```

### 4.7 TypeScript 支持

```typescript
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

// 定义响应数据接口
interface Post {
  id: number;
  title: string;
  author: string;
}

interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 创建类型安全的 Axios 实例
class HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 5000
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // 请求拦截器
    // 注意：axios v1+ 中请求拦截器的参数类型是 InternalAxiosRequestConfig，
    // 不是 AxiosRequestConfig，否则 config.headers 会有类型报错
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        return response.data;
      },
      (error) => Promise.reject(error)
    );
  }

  // GET 请求
  get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.get(url, config);
  }

  // POST 请求
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.post(url, data, config);
  }

  // PUT 请求
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.put(url, data, config);
  }

  // DELETE 请求
  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.delete(url, config);
  }
}

// 使用
const httpClient = new HttpClient('http://localhost:3000');

// 类型安全的请求
httpClient.get<Post[]>('/posts').then(response => {
  console.log(response.data); // TypeScript 知道这是 Post[]
});
```

### 4.8 Async/Await 使用

```javascript
// 基本用法
async function fetchPosts() {
  try {
    const response = await axios.get('http://localhost:3000/posts');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
}

// 串行请求
async function fetchUserAndPosts(userId) {
  try {
    // 先获取用户信息
    const userResponse = await axios.get(`http://localhost:3000/users/${userId}`);
    const user = userResponse.data;

    // 再获取该用户的文章
    const postsResponse = await axios.get(`http://localhost:3000/posts?userId=${userId}`);
    const posts = postsResponse.data;

    return { user, posts };
  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
}

// 并行请求
async function fetchMultipleResources() {
  try {
    const [postsRes, commentsRes, usersRes] = await Promise.all([
      axios.get('http://localhost:3000/posts'),
      axios.get('http://localhost:3000/comments'),
      axios.get('http://localhost:3000/users')
    ]);

    return {
      posts: postsRes.data,
      comments: commentsRes.data,
      users: usersRes.data
    };
  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
}

// 解决外部取值问题（用户提供的场景）
async function resolveAsync() {
  try {
    // 获取数据
    let data = await axios({ url: 'http://localhost:3000/test' })
      .then(v => v.data); // 提取 data 部分

    console.log(data); // 正确获取值

    // 修改数据
    data.course_name = data.course_name + '1';

    // 发送更新请求
    const updateResponse = await axios({
      url: 'http://localhost:3000/test',
      method: 'put',
      data
    });

    console.log('更新结果:', updateResponse.data);
    return updateResponse.data;
  } catch (error) {
    console.error('操作失败:', error);
    throw error;
  }
}
```

---

## 五、源码实现原理

### 5.1 目录结构

```
axios/
├── /dist/              # 打包输出目录
├── /lib/               # 源码目录
│   ├── /adapters/      # 适配器
│   │   ├── http.js     # Node.js 适配器（http 模块）
│   │   └── xhr.js      # 浏览器适配器（XMLHttpRequest）
│   ├── /cancel/        # 取消请求功能
│   │   ├── Cancel.js
│   │   ├── CancelToken.js
│   │   └── isCancel.js
│   ├── /core/          # 核心功能
│   │   ├── Axios.js              # Axios 类
│   │   ├── dispatchRequest.js    # 分发请求
│   │   ├── InterceptorManager.js # 拦截器管理
│   │   └── settle.js             # 根据状态改变 Promise
│   ├── /helpers/       # 辅助函数
│   ├── axios.js        # 入口文件
│   ├── defaults.js     # 默认配置
│   └── utils.js        # 工具函数
```

### 5.2 Axios 与 axios 的关系

**关键理解：**

1. **从语法上**：`axios` 不是 `Axios` 的实例
2. **从功能上**：`axios` 是 `Axios` 的实例
3. **本质**：`axios` 是 `Axios.prototype.request` 方法 `bind()` 返回的函数
4. `axios` 作为对象拥有 `Axios` 原型上的所有方法和实例属性

```javascript
// Axios 构造函数
function Axios(config) {
  this.defaults = config;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

// 原型方法
Axios.prototype.request = function(config) {
  console.log('发送请求:', config.method);
};

Axios.prototype.get = function(config) {
  return this.request({ method: 'GET', ...config });
};

Axios.prototype.post = function(config) {
  return this.request({ method: 'POST', ...config });
};

// 创建 axios 函数
function createInstance(config) {
  // 1. 创建 Axios 实例
  const context = new Axios(config);

  // 2. 将 request 方法绑定到 context，返回函数
  const instance = Axios.prototype.request.bind(context);

  // 3. 将 Axios.prototype 上的方法复制到 instance 函数对象上
  Object.keys(Axios.prototype).forEach(key => {
    instance[key] = Axios.prototype[key].bind(context);
  });

  // 4. 将 context 的属性复制到 instance 函数对象上
  Object.keys(context).forEach(key => {
    instance[key] = context[key];
  });

  return instance;
}

// 导出的 axios
const axios = createInstance({});

// 使用
axios({ method: 'GET', url: '/posts' });  // 函数调用
axios.get('/posts');                       // 方法调用
console.log(axios.defaults);               // 访问属性
console.log(axios.interceptors);           // 访问属性
```

### 5.3 请求处理流程

**整体流程：**

`request(config)` → `dispatchRequest(config)` → `xhrAdapter(config)`

```javascript
// 1. Axios 构造函数
function Axios(config) {
  this.config = config;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

// 2. request 方法（核心）
Axios.prototype.request = function(config) {
  // 创建 Promise 链
  let promise = Promise.resolve(config);

  // 请求拦截器数组
  const requestInterceptors = [];
  this.interceptors.request.handlers.forEach(handler => {
    requestInterceptors.unshift(handler.fulfilled, handler.rejected);
  });

  // 响应拦截器数组
  const responseInterceptors = [];
  this.interceptors.response.handlers.forEach(handler => {
    responseInterceptors.push(handler.fulfilled, handler.rejected);
  });

  // 组合 Promise 链
  const chain = [
    ...requestInterceptors,
    dispatchRequest, undefined,  // 实际发送请求
    ...responseInterceptors
  ];

  // 执行 Promise 链
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// 3. dispatchRequest 函数
function dispatchRequest(config) {
  // 调用适配器发送请求
  return xhrAdapter(config).then(
    response => {
      // 转换响应数据
      return response;
    },
    error => {
      throw error;
    }
  );
}

// 4. xhrAdapter 适配器
function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // 初始化
    xhr.open(config.method.toUpperCase(), config.url);

    // 设置请求头
    if (config.headers) {
      Object.keys(config.headers).forEach(key => {
        xhr.setRequestHeader(key, config.headers[key]);
      });
    }

    // 发送请求
    xhr.send(config.data || null);

    // 处理响应
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: JSON.parse(xhr.response),
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            config: config,
            request: xhr
          });
        } else {
          reject(new Error(`请求失败: ${xhr.status}`));
        }
      }
    };
  });
}

// 5. 拦截器管理器
function InterceptorManager() {
  this.handlers = [];
}

InterceptorManager.prototype.use = function(fulfilled, rejected) {
  this.handlers.push({ fulfilled, rejected });
  return this.handlers.length - 1; // 返回索引用于移除
};

InterceptorManager.prototype.eject = function(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

// 创建 axios
const context = new Axios({});
const axios = Axios.prototype.request.bind(context);
Object.keys(context).forEach(key => {
  axios[key] = context[key];
});
```

### 5.4 拦截器实现原理

**核心思想：** 通过 Promise 链串联所有拦截器和请求

```javascript
// 完整的拦截器实现
function Axios(config) {
  this.config = config;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

Axios.prototype.request = function(config) {
  // 初始 Promise
  let promise = Promise.resolve(config);

  // chains 数组：[请求拦截器n...请求拦截器1, dispatchRequest, 响应拦截器1...响应拦截器n]
  const chains = [dispatchRequest, undefined];

  // 请求拦截器：后添加的先执行（unshift）
  this.interceptors.request.handlers.forEach(handler => {
    chains.unshift(handler.fulfilled, handler.rejected);
  });

  // 响应拦截器：先添加的先执行（push）
  this.interceptors.response.handlers.forEach(handler => {
    chains.push(handler.fulfilled, handler.rejected);
  });

  // 执行 Promise 链
  while (chains.length > 0) {
    promise = promise.then(chains.shift(), chains.shift());
  }

  return promise;
};

function InterceptorManager() {
  this.handlers = [];
}

InterceptorManager.prototype.use = function(fulfilled, rejected) {
  this.handlers.push({ fulfilled, rejected });
};

// 模拟发送请求
function dispatchRequest(config) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        statusText: 'OK',
        data: { message: '请求成功' }
      });
    }, 100);
  });
}

// 测试
const axios = new Axios({});

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    console.log('请求拦截器1');
    return config;
  }
);

axios.interceptors.request.use(
  config => {
    console.log('请求拦截器2');
    return config;
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    console.log('响应拦截器1');
    return response;
  }
);

axios.interceptors.response.use(
  response => {
    console.log('响应拦截器2');
    return response;
  }
);

// 发送请求
axios.request({ method: 'GET', url: '/posts' });

/* 输出：
  请求拦截器2
  请求拦截器1
  响应拦截器1
  响应拦截器2
*/
```

### 5.5 取消请求实现原理

```javascript
// CancelToken 实现
function CancelToken(executor) {
  let resolvePromise;

  // 创建一个 pending 状态的 Promise
  this.promise = new Promise(resolve => {
    resolvePromise = resolve;
  });

  // 调用 executor，传入 cancel 函数
  executor(function cancel(message) {
    // 调用 cancel 时，让 promise 变为 resolved
    resolvePromise(new Cancel(message));
  });
}

// Cancel 类
function Cancel(message) {
  this.message = message;
}

// xhrAdapter 中的取消逻辑
function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(config.method, config.url);
    xhr.send();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ data: xhr.response });
        } else {
          reject(new Error('请求失败'));
        }
      }
    };

    // 处理取消请求
    if (config.cancelToken) {
      config.cancelToken.promise.then(cancel => {
        xhr.abort();  // 中断请求
        reject(cancel);  // 让外部 Promise 失败
      });
    }
  });
}

// 使用
let cancel;

axios.get('http://localhost:3000/posts', {
  cancelToken: new CancelToken(c => {
    cancel = c;  // 保存 cancel 函数
  })
});

// 取消请求
cancel('用户取消');
```

---

## 六、实战封装

### 6.1 基础封装

```javascript
// request.js
import axios from 'axios';

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 添加时间戳防止缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }

    return config;
  },
  error => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;

    // 根据后端约定的状态码判断
    if (res.code !== 200) {
      console.error('接口错误:', res.message);

      // 特殊状态码处理
      if (res.code === 401) {
        // token 过期，跳转登录
        localStorage.removeItem('token');
        window.location.href = '/login';
      }

      return Promise.reject(new Error(res.message || '请求失败'));
    }

    return res.data;
  },
  error => {
    console.error('响应错误:', error);

    let message = '网络错误';

    if (error.response) {
      message = `错误码: ${error.response.status}`;
    } else if (error.request) {
      message = '网络连接失败';
    }

    // 可以在这里使用 UI 库的提示组件
    // Message.error(message);

    return Promise.reject(error);
  }
);

export default service;
```

### 6.2 API 模块化管理

```javascript
// api/post.js
import request from '@/utils/request';

// 文章相关 API
export const postApi = {
  // 获取文章列表
  getList(params) {
    return request({
      url: '/posts',
      method: 'get',
      params
    });
  },

  // 获取文章详情
  getDetail(id) {
    return request({
      url: `/posts/${id}`,
      method: 'get'
    });
  },

  // 创建文章
  create(data) {
    return request({
      url: '/posts',
      method: 'post',
      data
    });
  },

  // 更新文章
  update(id, data) {
    return request({
      url: `/posts/${id}`,
      method: 'put',
      data
    });
  },

  // 删除文章
  delete(id) {
    return request({
      url: `/posts/${id}`,
      method: 'delete'
    });
  }
};

// api/user.js
import request from '@/utils/request';

export const userApi = {
  // 用户登录
  login(data) {
    return request({
      url: '/auth/login',
      method: 'post',
      data
    });
  },

  // 获取用户信息
  getInfo() {
    return request({
      url: '/user/info',
      method: 'get'
    });
  },

  // 退出登录
  logout() {
    return request({
      url: '/auth/logout',
      method: 'post'
    });
  }
};

// 使用
import { postApi } from '@/api/post';

async function fetchPosts() {
  try {
    const posts = await postApi.getList({ page: 1, limit: 10 });
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}
```

### 6.3 环境配置

```javascript
// config/env.js
const env = process.env.NODE_ENV;

const config = {
  development: {
    baseURL: 'http://localhost:3000',
    timeout: 10000
  },
  production: {
    baseURL: 'https://api.example.com',
    timeout: 5000
  },
  test: {
    baseURL: 'https://test-api.example.com',
    timeout: 10000
  }
};

export default config[env];

// request.js 中使用
import axios from 'axios';
import envConfig from '@/config/env';

const service = axios.create({
  baseURL: envConfig.baseURL,
  timeout: envConfig.timeout
});
```

### 6.4 完整的企业级封装

```javascript
// utils/request.js
import axios from 'axios';
import { Message, Loading } from 'element-ui'; // 示例：使用 Element UI

class HttpRequest {
  constructor(baseURL, timeout = 10000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.queue = {}; // 请求队列
  }

  // 通用配置
  getInsideConfig() {
    return {
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
  }

  // 拦截器
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加到队列
        this.queue[url] = true;

        // 显示loading（可选）
        // Loading.service();

        // 添加 token
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      error => Promise.reject(error)
    );

    // 响应拦截
    instance.interceptors.response.use(
      response => {
        // 从队列移除
        delete this.queue[url];

        // 隐藏loading
        if (Object.keys(this.queue).length === 0) {
          // Loading.service().close();
        }

        const { data, status } = response;

        // 根据状态码处理
        if (status === 200) {
          if (data.code === 200) {
            return data.data;
          } else {
            Message.error(data.message || '请求失败');
            return Promise.reject(data);
          }
        } else {
          Message.error('请求失败');
          return Promise.reject(response);
        }
      },
      error => {
        delete this.queue[url];

        if (Object.keys(this.queue).length === 0) {
          // Loading.service().close();
        }

        // 错误处理
        if (error.response) {
          const { status } = error.response;

          switch (status) {
            case 401:
              Message.error('未授权，请重新登录');
              // 跳转登录
              // router.push('/login');
              break;
            case 403:
              Message.error('拒绝访问');
              break;
            case 404:
              Message.error('请求资源不存在');
              break;
            case 500:
              Message.error('服务器错误');
              break;
            default:
              Message.error(`请求失败: ${status}`);
          }
        } else {
          Message.error('网络错误，请检查网络连接');
        }

        return Promise.reject(error);
      }
    );
  }

  // 创建实例
  request(options) {
    const instance = axios.create();
    const config = {
      ...this.getInsideConfig(),
      ...options
    };

    this.interceptors(instance, options.url);

    return instance(config);
  }

  // 便捷方法
  get(url, params = {}, config = {}) {
    return this.request({
      method: 'get',
      url,
      params,
      ...config
    });
  }

  post(url, data = {}, config = {}) {
    return this.request({
      method: 'post',
      url,
      data,
      ...config
    });
  }

  put(url, data = {}, config = {}) {
    return this.request({
      method: 'put',
      url,
      data,
      ...config
    });
  }

  delete(url, config = {}) {
    return this.request({
      method: 'delete',
      url,
      ...config
    });
  }
}

// 导出实例
const http = new HttpRequest(
  process.env.VUE_APP_BASE_API || 'http://localhost:3000'
);

export default http;
```

---

## 七、最佳实践

### 7.1 统一错误处理

```javascript
// 创建错误处理类
class ErrorHandler {
  static handle(error) {
    if (axios.isCancel(error)) {
      console.log('请求被取消:', error.message);
      return;
    }

    if (error.response) {
      // 服务器返回错误
      this.handleServerError(error.response);
    } else if (error.request) {
      // 网络错误
      this.handleNetworkError();
    } else {
      // 其他错误
      this.handleOtherError(error);
    }
  }

  static handleServerError(response) {
    const { status, data } = response;

    const errorMap = {
      400: '请求参数错误',
      401: '未授权',
      403: '禁止访问',
      404: '资源不存在',
      500: '服务器错误',
      502: '网关错误',
      503: '服务不可用'
    };

    const message = data.message || errorMap[status] || '请求失败';
    console.error(message);

    // 特殊处理
    if (status === 401) {
      // 清除token，跳转登录
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }

  static handleNetworkError() {
    console.error('网络连接失败');
  }

  static handleOtherError(error) {
    console.error('请求失败:', error.message);
  }
}

// 在响应拦截器中使用
axios.interceptors.response.use(
  response => response,
  error => {
    ErrorHandler.handle(error);
    return Promise.reject(error);
  }
);
```

### 7.2 请求防抖和节流

```javascript
// 防抖：多次触发只执行最后一次
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 节流：一段时间内只执行一次
function throttle(func, wait) {
  let previous = 0;
  return function(...args) {
    const now = Date.now();
    if (now - previous > wait) {
      func.apply(this, args);
      previous = now;
    }
  };
}

// 应用到搜索功能
const searchDebounced = debounce(async (keyword) => {
  const results = await axios.get('/api/search', {
    params: { keyword }
  });
  console.log(results);
}, 500);

// 监听输入
document.querySelector('#search-input').addEventListener('input', (e) => {
  searchDebounced(e.target.value);
});
```

### 7.3 Token 刷新机制

```javascript
let isRefreshing = false;
let requests = [];

axios.interceptors.response.use(
  response => response,
  async error => {
    const { config, response } = error;

    // token 过期
    if (response && response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // 刷新 token
          const refreshToken = localStorage.getItem('refreshToken');
          const res = await axios.post('/auth/refresh', { refreshToken });

          const newToken = res.data.token;
          localStorage.setItem('token', newToken);

          // 重新发送所有排队的请求
          requests.forEach(cb => cb(newToken));
          requests = [];

          // 重新发送当前请求
          config.headers.Authorization = `Bearer ${newToken}`;
          return axios(config);
        } catch (err) {
          // 刷新失败，跳转登录
          localStorage.clear();
          window.location.href = '/login';
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      } else {
        // 正在刷新，将请求加入队列
        return new Promise(resolve => {
          requests.push(token => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(axios(config));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);
```

### 7.4 接口版本管理

```javascript
// 支持多版本 API
class ApiVersionManager {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.versions = {
      v1: axios.create({
        baseURL: `${baseURL}/api/v1`,
        timeout: 5000
      }),
      v2: axios.create({
        baseURL: `${baseURL}/api/v2`,
        timeout: 5000
      })
    };
  }

  getVersion(version = 'v1') {
    return this.versions[version] || this.versions.v1;
  }
}

const apiManager = new ApiVersionManager('http://localhost:3000');

// 使用不同版本
apiManager.getVersion('v1').get('/posts');
apiManager.getVersion('v2').get('/posts');
```

### 7.5 请求日志记录

```javascript
// 开发环境请求日志
if (process.env.NODE_ENV === 'development') {
  axios.interceptors.request.use(config => {
    console.group(`🚀 ${config.method.toUpperCase()} ${config.url}`);
    console.log('请求配置:', config);
    console.log('请求参数:', config.params || config.data);
    console.groupEnd();
    return config;
  });

  axios.interceptors.response.use(
    response => {
      console.group(`✅ ${response.config.method.toUpperCase()} ${response.config.url}`);
      console.log('响应状态:', response.status);
      console.log('响应数据:', response.data);
      console.log('耗时:', Date.now() - response.config.metadata?.startTime || 0, 'ms');
      console.groupEnd();
      return response;
    },
    error => {
      console.group(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`);
      console.error('错误信息:', error.message);
      console.error('错误详情:', error);
      console.groupEnd();
      return Promise.reject(error);
    }
  );

  // 记录请求开始时间
  axios.interceptors.request.use(config => {
    config.metadata = { startTime: Date.now() };
    return config;
  });
}
```

---

## 八、常见问题与解决方案

### 8.1 CORS 跨域问题

**问题：** 浏览器控制台报错 `Access-Control-Allow-Origin`

**解决方案：**

```javascript
// 1. 开发环境：使用代理（Vue CLI 配置）
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};

// 2. 生产环境：后端配置 CORS
// Node.js Express 示例
const cors = require('cors');
app.use(cors({
  origin: 'https://your-domain.com',
  credentials: true
}));
```

> ⚠️ 说明：axios 本身**没有** `axios.jsonp()` 方法（这是常见误解）。JSONP 是利用 `<script>` 标签绕过同源策略的老技术，需要自己实现或借助第三方库，且只支持 GET。现代项目应优先用「开发代理 + 后端 CORS」来解决跨域，不要再用 JSONP。

> 💡 关于 `withCredentials`：如果请求需要携带 Cookie（跨域登录态），前端要设置 `axios.defaults.withCredentials = true`，同时后端 CORS 的 `origin` 不能用 `*`，必须指定具体域名，否则浏览器会拦截。

### 8.2 请求参数序列化

**问题：** POST 请求参数格式不正确

```javascript
// 1. JSON 格式（默认）
axios.post('/api/user', {
  name: 'John',
  age: 30
});
// Content-Type: application/json

// 2. FormData 格式
const formData = new FormData();
formData.append('name', 'John');
formData.append('age', 30);

axios.post('/api/user', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

// 3. URL编码格式
import qs from 'qs';

axios.post('/api/user', qs.stringify({
  name: 'John',
  age: 30
}), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
```

### 8.3 图片上传预览

```javascript
async function uploadImage(file) {
  // 1. 图片预览
  const reader = new FileReader();
  reader.onload = (e) => {
    document.querySelector('#preview').src = e.target.result;
  };
  reader.readAsDataURL(file);

  // 2. 上传图片
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`上传进度: ${percent}%`);
      }
    });

    console.log('上传成功:', response.data.url);
    return response.data.url;
  } catch (error) {
    console.error('上传失败:', error);
  }
}
```

### 8.4 下载文件

```javascript
// 下载文件并保存
async function downloadFile(url, filename) {
  try {
    const response = await axios.get(url, {
      responseType: 'blob'
    });

    // 创建 blob URL
    const blob = new Blob([response.data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    // 触发下载
    document.body.appendChild(link);
    link.click();

    // 清理
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('下载失败:', error);
  }
}

// 使用
downloadFile('http://localhost:3000/files/document.pdf', 'document.pdf');
```

### 8.5 请求超时重试

```javascript
// 自动重试配置
axios.interceptors.response.use(null, async (error) => {
  const { config } = error;

  if (!config || !config.retry) {
    return Promise.reject(error);
  }

  config.__retryCount = config.__retryCount || 0;

  if (config.__retryCount >= config.retry) {
    return Promise.reject(error);
  }

  config.__retryCount += 1;

  const backoff = new Promise((resolve) => {
    setTimeout(() => resolve(), config.retryDelay || 1000);
  });

  await backoff;
  return axios(config);
});

// 使用
axios.get('/api/data', {
  retry: 3,
  retryDelay: 1000
});
```

### 8.6 批量请求限流

```javascript
// 限制并发数量
async function batchRequest(urls, maxConcurrent = 5) {
  const results = [];
  const executing = [];

  for (const url of urls) {
    const promise = axios.get(url).then(res => {
      results.push(res.data);
      return res;
    });

    results.push(promise);

    if (maxConcurrent <= urls.length) {
      const e = promise.then(() => {
        executing.splice(executing.indexOf(e), 1);
      });
      executing.push(e);

      if (executing.length >= maxConcurrent) {
        await Promise.race(executing);
      }
    }
  }

  return Promise.all(results);
}

// 使用
const urls = [
  'http://localhost:3000/posts/1',
  'http://localhost:3000/posts/2',
  // ... 更多URL
];

batchRequest(urls, 3).then(results => {
  console.log('所有请求完成:', results);
});
```

---

## 快速参考

### 常用 API 速查

```javascript
// 基础请求
axios(config)
axios(url[, config])

// 请求方法别名
axios.get(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.patch(url[, data[, config]])

// 创建实例
axios.create([config])

// 拦截器
axios.interceptors.request.use(onFulfilled[, onRejected])
axios.interceptors.response.use(onFulfilled[, onRejected])

// 取消请求
axios.CancelToken
axios.isCancel(value)

// 并发请求
axios.all(promises)
axios.spread(callback)
Promise.all(promises)
```

### 配置选项速查

```javascript
{
  // 基础配置
  baseURL: 'https://api.example.com',
  url: '/user',
  method: 'get',

  // 请求头
  headers: {'X-Custom-Header': 'value'},

  // 参数
  params: {ID: 12345},
  paramsSerializer: function(params) {},

  // 请求体
  data: {firstName: 'John'},

  // 超时
  timeout: 1000,

  // 认证
  auth: {username: 'user', password: 'pass'},

  // 响应类型
  responseType: 'json', // 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'

  // 取消令牌
  cancelToken: new CancelToken(function (cancel) {}),

  // 进度监控
  onUploadProgress: function (progressEvent) {},
  onDownloadProgress: function (progressEvent) {},

  // 其他
  withCredentials: false,
  maxRedirects: 5,
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  }
}
```

---

## 总结

Axios 是一个功能强大、易于使用的 HTTP 客户端库。掌握其核心特性和最佳实践，可以大大提升前端开发效率和代码质量。

**关键要点：**

1. ✅ 使用拦截器统一处理请求和响应
2. ✅ 合理封装 API，模块化管理
3. ✅ 实现错误处理和重试机制
4. ✅ 注意跨域和安全问题
5. ✅ 使用 TypeScript 提升类型安全
6. ✅ 在生产环境做好请求监控和日志记录

**学习资源：**

- [Axios 官方文档](https://axios-http.com/)
- [Axios GitHub 仓库](https://github.com/axios/axios)
- [MDN - HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)

---

**最后更新:** 2025-11-20
**作者:** 前端学习笔记
