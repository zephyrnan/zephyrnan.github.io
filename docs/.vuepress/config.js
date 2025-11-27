import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'

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

    // 侧边栏配置
    sidebar: {
      '/posts/': [
        {
          text: '前端开发',
          children: [
            '/posts/JavaScript 学习笔记.md',
            '/posts/TypeScript 快速上手.md',
            '/posts/Vue3 学习笔记.md',
            '/posts/HTML5 与 CSS 综合学习笔记.md',
            '/posts/CSS 属性速查手册.md',
            '/posts/Tailwind-CSS-笔记.md',
            '/posts/AJAX 学习笔记.md',
            '/posts/Promise 学习笔记.md',
            '/posts/Axios完整学习笔记.md',
            '/posts/Node.js 学习笔记.md',
          ],
        },
        {
          text: 'Node.js 深入学习',
          collapsible: true,
          children: [
            '/posts/nodejs/Node.js-文件系统模块.md',
            '/posts/nodejs/Node.js-模块化设计.md',
            '/posts/nodejs/Node.js-NPM包管理.md',
            '/posts/nodejs/Node.js-HTTP模块.md',
            '/posts/nodejs/Node.js-Express框架.md',
            '/posts/nodejs/Node.js-MongoDB数据库.md',
            '/posts/nodejs/MongoDB数据库基础使用.md',
          ],
        },
        {
          text: '后端开发',
          children: [
            '/posts/SpringBoot 完整学习笔记.md',
          ],
        },
        {
          text: '开发工具',
          children: [
            '/posts/GitHub新手完全指南.md',
            '/posts/个人博客搭建指南.md',
          ],
        },
      ],
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
