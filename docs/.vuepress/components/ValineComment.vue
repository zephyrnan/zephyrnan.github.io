<template>
  <div class="comment-section">
    <p class="debug-info">✅ 评论组件已加载</p>
    <div id="vcomments" class="valine-wrapper"></div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { usePageData } from '@vuepress/client'

const page = usePageData()

const initValine = async () => {
  // 检查是否在浏览器环境
  if (typeof window === 'undefined') {
    console.log('服务端渲染环境，跳过 Valine 初始化')
    return
  }

  console.log('🔄 开始初始化 Valine 评论系统...')
  console.log('📍 当前页面路径:', page.value.path)

  try {
    // 动态导入 Valine（只在浏览器环境中）
    const Valine = (await import('valine')).default

    console.log('📦 Valine 模块加载成功')

    // Valine 配置
    new Valine({
      el: '#vcomments',
      appId: 'sLLFTcoWHCJVJOdd9UsscnGE-gzGzoHsz', // LeanCloud AppID
      appKey: 'NcwfyGUEwWLSt8fu7uCcglXC', // LeanCloud AppKey
      placeholder: '留下你的评论吧~ 支��� Markdown 语法',
      avatar: 'robohash',
      pageSize: 10,
      visitor: true, // 文章访问量统计
      highlight: true, // 代码高亮
      recordIP: true, // 记录IP
      serverURLs: 'https://sllftcow.lc-cn-n1-shared.com', // LeanCloud 服务器地址
      path: page.value.path,
      lang: 'zh-CN',
      enableQQ: false,
    })

    console.log('✅ Valine 初始化完成')
  } catch (error) {
    console.error('❌ Valine 初始化失败:', error)
    console.error('错误详情:', error.message)

    // ��页面上显示错误信息
    const el = document.getElementById('vcomments')
    if (el) {
      el.innerHTML = `
        <div style="padding: 20px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 5px; color: #856404;">
          <h4>⚠️ 评论系统加载失败</h4>
          <p><strong>错误信息：</strong>${error.message}</p>
          <p><strong>可能的原因：</strong></p>
          <ol>
            <li>LeanCloud 安全域名未配置（最常见）</li>
            <li>网络连接问题</li>
            <li>AppID 或 AppKey 配置错误</li>
          </ol>
          <p>请查看浏览器控制台（F12）获取详细错误信息</p>
        </div>
      `
    }
  }
}

onMounted(() => {
  console.log('🎯 评论组件已挂载到 DOM')
  // 延迟初始化，确保 DOM 完全加载
  setTimeout(() => {
    initValine()
  }, 500)
})

// 监听路由变化，重新初始化评论
watch(() => page.value.path, () => {
  console.log('🔄 路由变化，重新加载评论:', page.value.path)

  // 清空评论区
  const el = document.getElementById('vcomments')
  if (el) {
    el.innerHTML = '<p style="text-align: center; color: #999;">正在加载评论...</p>'
  }

  // 重新初始化
  setTimeout(initValine, 500)
})
</script>

<style scoped>
.comment-section {
  margin-top: 50px;
  width: 100%;
  max-width: 100%;
}

.debug-info {
  display: none; /* 隐藏调试信息 */
}

.valine-wrapper {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid var(--c-border);
  min-height: 200px;
  width: 100%;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .comment-section {
    margin-top: 40px;
    padding: 0 10px;
  }

  .valine-wrapper {
    margin-top: 15px;
    padding-top: 15px;
  }
}

/* Valine 移动端样式优化 */
:deep(.valine-wrapper) {
  width: 100% !important;
}

:deep(.valine .vwrap) {
  width: 100% !important;
}

:deep(.valine .veditor) {
  min-height: 120px !important;
}

@media (max-width: 768px) {
  :deep(.valine .vwrap) {
    padding: 10px !important;
  }

  :deep(.valine .veditor) {
    min-height: 100px !important;
    font-size: 14px !important;
  }

  :deep(.valine .vbtn) {
    padding: 8px 16px !important;
    font-size: 14px !important;
  }

  :deep(.valine .vinfo) {
    flex-direction: column !important;
  }

  :deep(.valine .vinfo input) {
    width: 100% !important;
    margin-bottom: 10px !important;
  }
}
</style>
