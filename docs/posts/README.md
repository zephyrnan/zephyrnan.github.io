# 📚 博客文章

欢迎来到我的技术学习笔记归档页面！这里记录了我在前端和后端开发学习过程中的心得体会和技术总结。

<style scoped>
.post-nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 30px 0;
  max-width: 900px;
}

.post-card {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 2px solid #e3f2fd;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
}

.post-card:hover {
  transform: translateX(5px);
  border-color: #1e88e5;
  box-shadow: 0 4px 20px rgba(30, 136, 229, 0.15);
}

.card-icon {
  font-size: 36px;
  margin-right: 20px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  min-width: 50px;
  text-align: center;
}

.post-card:hover .card-icon {
  transform: scale(1.15);
}

.card-content {
  flex: 1;
}

.card-title {
  margin: 0 0 6px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1e88e5;
}

.post-card:hover .card-title {
  color: #1565c0;
}

.card-desc {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.card-arrow {
  font-size: 24px;
  color: #1e88e5;
  margin-left: 20px;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.post-card:hover .card-arrow {
  transform: translateX(8px);
}

@media (max-width: 768px) {
  .post-nav {
    max-width: 100%;
  }
  .post-card {
    padding: 15px 18px;
  }
  .card-icon {
    font-size: 28px;
    margin-right: 15px;
    min-width: 40px;
  }
  .card-title {
    font-size: 16px;
  }
  .card-desc {
    font-size: 13px;
  }
}
</style>

## 🎯 前端开发

<div class="post-nav">
  <a href="/posts/JavaScript 学习笔记.html" class="post-card">
    <div class="card-icon">📘</div>
    <div class="card-content">
      <div class="card-title">JavaScript 学习笔记</div>
      <div class="card-desc">深入理解 JavaScript 核心概念、数据类型、函数、作用域、闭包等基础知识</div>
    </div>
    <div class="card-arrow">→</div>
  </a>

  <a href="/posts/TypeScript 快速上手.html" class="post-card">
    <div class="card-icon">🔷</div>
    <div class="card-content">
      <div class="card-title">TypeScript 快速上手</div>
      <div class="card-desc">TypeScript 类型系统、接口、泛型等特性，让 JavaScript 更加类型安全</div>
    </div>
    <div class="card-arrow">→</div>
  </a>

  <a href="/posts/Vue3 学习笔记.html" class="post-card">
    <div class="card-icon">💚</div>
    <div class="card-content">
      <div class="card-title">Vue3 学习笔记</div>
      <div class="card-desc">Vue3 组合式 API、响应式原理、组件通信、路由和状态管理实践</div>
    </div>
    <div class="card-arrow">→</div>
  </a>

  <a href="/posts/HTML5 与 CSS 综合学习笔记.html" class="post-card">
    <div class="card-icon">🎨</div>
    <div class="card-content">
      <div class="card-title">HTML5 与 CSS 综合学习笔记</div>
      <div class="card-desc">HTML5 新特性、语义化标签、CSS3 动画、布局技巧与响应式设计</div>
    </div>
    <div class="card-arrow">→</div>
  </a>

  <a href="/posts/CSS 属性速查手册.html" class="post-card">
    <div class="card-icon">📖</div>
    <div class="card-content">
      <div class="card-title">CSS 属性速查手册</div>
      <div class="card-desc">常用 CSS 属性快速查询，包含盒模型、定位、弹性布局、网格布局等</div>
    </div>
    <div class="card-arrow">→</div>
  </a>

  <a href="/posts/AJAX 学习笔记.html" class="post-card">
    <div class="card-icon">🌐</div>
    <div class="card-content">
      <div class="card-title">AJAX 学习笔记</div>
      <div class="card-desc">异步 JavaScript 与 XML，XMLHttpRequest 使用、跨域请求解决方案</div>
    </div>
    <div class="card-arrow">→</div>
  </a>

  <a href="/posts/Promise 学习笔记.html" class="post-card">
    <div class="card-icon">🎁</div>
    <div class="card-content">
      <div class="card-title">Promise 学习笔记</div>
      <div class="card-desc">Promise 异步编程、链式调用、错误处理、async/await 语法糖</div>
    </div>
    <div class="card-arrow">→</div>
  </a>

  <a href="/posts/Axios完整学习笔记.html" class="post-card">
    <div class="card-icon">📡</div>
    <div class="card-content">
      <div class="card-title">Axios 完整学习笔记</div>
      <div class="card-desc">基于 Promise 的 HTTP 客户端，拦截器、请求配置、错误处理最佳实践</div>
    </div>
    <div class="card-arrow">→</div>
  </a>

  <a href="/posts/Node.js 学习笔记.html" class="post-card">
    <div class="card-icon">🟢</div>
    <div class="card-content">
      <div class="card-title">Node.js 学习笔记</div>
      <div class="card-desc">Node.js 基础、模块系统、文件操作、HTTP 服务器、包管理工具 npm</div>
    </div>
    <div class="card-arrow">→</div>
  </a>
</div>

## 🚀 后端开发

<div class="post-nav">
  <a href="/posts/SpringBoot 完整学习笔记.html" class="post-card">
    <div class="card-icon">🍃</div>
    <div class="card-content">
      <div class="card-title">SpringBoot 完整学习笔记</div>
      <div class="card-desc">SpringBoot 快速开发、自动配置、RESTful API 设计、数据库集成</div>
    </div>
    <div class="card-arrow">→</div>
  </a>
</div>

## 🛠️ 开发工具

<div class="post-nav">
  <a href="/posts/GitHub新手完全指南.html" class="post-card">
    <div class="card-icon">🐙</div>
    <div class="card-content">
      <div class="card-title">GitHub 新手完全指南</div>
      <div class="card-desc">Git 版本控制基础、GitHub 使用技巧、团队协作流程、开源项目参与</div>
    </div>
    <div class="card-arrow">→</div>
  </a>
<a href="/posts/个人博客搭建指南.html" class="post-card">    <div class="card-icon">📝</div>    <div class="card-content">      <div class="card-title">个人博客搭建指南</div>      <div class="card-desc">VuePress 2.0 博客从零搭建教程,环境准备、部署上线、功能扩展完整指南</div>    </div>    <div class="card-arrow">→</div>  </a>
</div>

---

<div style="text-align: center; margin-top: 50px; padding: 30px; background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border-radius: 12px;">
  <h3 style="color: #1e88e5; margin-bottom: 15px;">💡 持续更新中...</h3>
  <p style="color: #666; font-size: 16px;">更多精彩内容正在路上，敬请期待！</p>
  <p style="color: #999; font-size: 14px; margin-top: 10px;">如有问题或建议，欢迎通过 GitHub 或邮件与我交流</p>
</div>
