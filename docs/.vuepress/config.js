import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// 动态加载侧边栏配置（由 npm run gen 生成）
const __dirname = dirname(fileURLToPath(import.meta.url))
const sidebarPath = join(__dirname, 'sidebar.json')
let postsSidebar = []
if (fs.existsSync(sidebarPath)) {
  postsSidebar = JSON.parse(fs.readFileSync(sidebarPath, 'utf-8'))
}

export default defineUserConfig({
  lang: 'zh-CN',
  title: '楠渡余生',
  description: '楠渡余生 的个人博客',

  // GitHub Pages 部署配置
  base: '/',

  // 网站图标配置
  head: [
    ['link', { rel: 'icon', href: '/bg.jpg' }],

    // 百度统计（已临时禁用以消除错误）
    // 如需启用，请取消下方注释并替换 YOUR_BAIDU_ANALYTICS_ID
    // 获取方法见：BAIDU-ANALYTICS-CONFIG.md
    // ['script', {}, `
    //   var _hmt = _hmt || [];
    //   (function() {
    //     var hm = document.createElement("script");
    //     hm.src = "https://hm.baidu.com/hm.js?YOUR_BAIDU_ANALYTICS_ID";
    //     var s = document.getElementsByTagName("script")[0];
    //     s.parentNode.insertBefore(hm, s);
    //   })();
    // `],
  ],

  bundler: viteBundler(),

  // 插件配置
  plugins: [
    searchPlugin({
      // 搜索框占位符
      locales: {
        '/': {
          placeholder: '搜索文档',
        },
      },
      // 最大搜索建议数
      maxSuggestions: 10,
      // 排除首页
      isSearchable: (page) => page.path !== '/',
      // 允许搜索 Frontmatter 中的 tags
      getExtraFields: (page) => page.frontmatter.tags ?? [],
    }),
  ],

  theme: defaultTheme({
    logo: '/author.jpg',

    // 导航栏配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '笔记',
        link: '/posts/',
      },
      {
        text: '作品集',
        link: '/portfolio.md',
      },
      {
        text: '留言板',
        link: '/guestbook.md',
      },
      {
        text: '关于',
        link: '/about.md',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/zephyrnan',
      },
      {
        text: 'CSDN',
        link: 'https://blog.csdn.net/2303_80433826?type=blog',
      },
    ],

    // 侧边栏配置（自动生成）
    sidebar: {
      '/posts/': postsSidebar,
      // 留言板页面不显示侧边栏
      '/guestbook.html': [],
    },

    // 最后更新时间
    lastUpdated: true,
    lastUpdatedText: '最后更新',

    // 贡献者
    contributors: true,
    contributorsText: '贡献者',

    // 编辑此页
    editLink: false,

    // 页脚
    // 如果需要可以取消注释
    // footer: 'MIT Licensed | Copyright © 2024-present',
    // displayFooter: true,
  }),
})
