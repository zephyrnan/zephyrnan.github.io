---
title: 作品集
---

# 🎨 作品集

欢迎来到我的作品展示页面！这里收录了我的项目作品，包括网站、应用和其他创作。

<style>
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  margin: 30px 0;
}

.portfolio-item {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 2px solid #e3f2fd;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.portfolio-item:hover {
  transform: translateY(-5px);
  border-color: #1e88e5;
  box-shadow: 0 8px 30px rgba(30, 136, 229, 0.2);
}

.portfolio-media {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  background: #f0f4f8;
}

.portfolio-media img,
.portfolio-media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.portfolio-item:hover .portfolio-media img,
.portfolio-item:hover .portfolio-media video {
  transform: scale(1.05);
}

.portfolio-content {
  padding: 20px;
}

.portfolio-title {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1e88e5;
}

.portfolio-desc {
  margin: 0 0 15px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.portfolio-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.portfolio-tag {
  padding: 4px 10px;
  background: #e3f2fd;
  color: #1565c0;
  border-radius: 15px;
  font-size: 12px;
}

.portfolio-links {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.portfolio-link {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%);
  color: white !important;
  text-decoration: none !important;
  border-radius: 8px;
  font-size: 13px;
  transition: all 0.3s ease;
}

.portfolio-link:hover {
  background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
  transform: translateY(-2px);
}

.portfolio-link.secondary {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  color: #333 !important;
}

.portfolio-link.secondary:hover {
  background: linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 40px 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #e3f2fd;
}

.section-icon {
  font-size: 28px;
}

/* 视频播放按钮 */
.video-wrapper {
  position: relative;
}

.video-wrapper::after {
  content: "▶";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  color: white;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  pointer-events: none;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.video-wrapper:hover::after {
  opacity: 0;
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-media {
    height: 180px;
  }

  .portfolio-content {
    padding: 15px;
  }

  .portfolio-title {
    font-size: 16px;
  }
}
</style>

## 🌐 Web 项目

<div class="portfolio-grid">

<!-- Web 协同画板 -->
<div class="portfolio-item">
  <div class="portfolio-media">
    <img src="/portfolio/web.png" alt="Web协同画板截图" />
  </div>
  <div class="portfolio-content">
    <h3 class="portfolio-title">Web 协同画板</h3>
    <p class="portfolio-desc">专业的在线图形编辑器，支持多人实时协作。基于 Canvas API 实现图形绘制，WebSocket 实现实时同步，支持矩形、圆形、钢笔、画笔等多种工具，以及撤销/重做、图层管理等功能。</p>
    <div class="portfolio-tags">
      <span class="portfolio-tag">Vue3</span>
      <span class="portfolio-tag">TypeScript</span>
      <span class="portfolio-tag">Canvas</span>
      <span class="portfolio-tag">WebSocket</span>
      <span class="portfolio-tag">Node.js</span>
    </div>
    <div class="portfolio-links">
      <a href="https://web-bindraw.vercel.app/" target="_blank" class="portfolio-link">在线预览</a>
      <a href="https://github.com/zephyrnan/web-bindraw" target="_blank" class="portfolio-link secondary">源代码</a>
    </div>
  </div>
</div>

<div class="portfolio-item">
  <div class="portfolio-media">
    <img src="/portfolio/room.png" alt="智能灯杆系统截图" />
  </div>
  <div class="portfolio-content">
    <h3 class="portfolio-title">智能灯杆系统</h3>
    <p class="portfolio-desc">基于 Vue 3 + Node.js + MongoDB 的智能灯杆监控系统，提供实时监控、历史数据分析、报警管理和人员检测等功能。</p>
    <div class="portfolio-tags">
      <span class="portfolio-tag"> Vue 3</span>
      <span class="portfolio-tag">Node.js </span>
    </div>
    <div class="portfolio-links">
      <a href="https://github.com/zephyrnan/Intelligent-lamp-post-monitoring-system" target="_blank" class="portfolio-link secondary">源代码</a>
    </div>
  </div>
</div>

</div>

---

## 📝 如何添加作品

在这个页面添加你的作品非常简单：

### 1. 准备素材
将图片或视频文件放到 `docs/.vuepress/public/portfolio/` 目录下

### 2. 添加图片作品

```html
<div class="portfolio-item">
  <div class="portfolio-media">
    <img src="/portfolio/你的图片.png" alt="项目截图" />
  </div>
  <div class="portfolio-content">
    <h3 class="portfolio-title">项目名称</h3>
    <p class="portfolio-desc">项目描述...</p>
    <div class="portfolio-tags">
      <span class="portfolio-tag">标签1</span>
      <span class="portfolio-tag">标签2</span>
    </div>
    <div class="portfolio-links">
      <a href="链接地址" target="_blank" class="portfolio-link">在线预览</a>
      <a href="源码地址" target="_blank" class="portfolio-link secondary">源代码</a>
    </div>
  </div>
</div>
```

### 3. 添加视频作品

```html
<div class="portfolio-item">
  <div class="portfolio-media video-wrapper">
    <video src="/portfolio/演示视频.mp4" poster="/portfolio/封面图.png" controls></video>
  </div>
  <div class="portfolio-content">
    <!-- 内容同上 -->
  </div>
</div>
```

### 支持的格式
- **图片**: PNG, JPG, GIF, WebP
- **视频**: MP4, WebM (建议 MP4 兼容性最好)

<div style="text-align: center; margin-top: 50px; padding: 30px; background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border-radius: 12px;">
  <h3 style="color: #1e88e5; margin-bottom: 15px;">🚀 持续更新中...</h3>
  <p style="color: #666; font-size: 16px;">更多作品正在整理中，敬请期待！</p>
</div>

<comment-section />
