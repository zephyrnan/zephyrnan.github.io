/**
 * 自动生成侧边栏和文章列表脚本
 * 运行: npm run gen
 */

const fs = require('fs')
const path = require('path')

// 配置
const DOCS_PATH = path.join(__dirname, '../docs')
const POSTS_PATH = path.join(DOCS_PATH, 'posts')
const SIDEBAR_OUTPUT = path.join(DOCS_PATH, '.vuepress/sidebar.json')
const README_OUTPUT = path.join(POSTS_PATH, 'README.md')

// 分类配置 - 定义分类顺序和图标
const CATEGORY_CONFIG = {
  '前端开发': { order: 1, icon: '🎯', emoji: '📘' },
  'Node.js 深入学习': { order: 2, icon: '📗', emoji: '🟢' },
  '后端开发': { order: 3, icon: '🚀', emoji: '🍃' },
  '开发工具': { order: 4, icon: '🛠️', emoji: '🔧' },
  '其他': { order: 99, icon: '📂', emoji: '📄' }
}

// 文章图标映射（根据关键词）
const ICON_MAP = {
  'JavaScript': '📘',
  'TypeScript': '🔷',
  'Vue': '💚',
  'React': '⚛️',
  'HTML': '🎨',
  'CSS': '🎨',
  'Tailwind': '🎨',
  'AJAX': '🌐',
  'Promise': '🎁',
  'Axios': '📡',
  'Node': '🟢',
  'Express': '🚂',
  'MongoDB': '🍃',
  'Spring': '🍃',
  'jQuery': '💲',
  'Git': '🐙',
  'GitHub': '🐙',
  '博客': '📝',
  '文件系统': '📁',
  '模块': '📦',
  'NPM': '📚',
  'HTTP': '🌐',
}

/**
 * 解析 frontmatter
 */
function parseFrontmatter(content) {
  // 规范化换行符
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  const frontmatter = {}
  const lines = match[1].split('\n')
  let currentKey = null
  let isArray = false
  let arrayValues = []

  for (const line of lines) {
    if (line.match(/^(\w+):\s*$/)) {
      // 数组开始
      if (currentKey && isArray) {
        frontmatter[currentKey] = arrayValues
      }
      currentKey = line.match(/^(\w+):/)[1]
      isArray = true
      arrayValues = []
    } else if (line.match(/^\s+-\s+(.+)$/)) {
      // 数组项
      const value = line.match(/^\s+-\s+(.+)$/)[1]
      arrayValues.push(value)
    } else if (line.match(/^(\w+):\s*(.+)$/)) {
      // 普通键值对
      if (currentKey && isArray) {
        frontmatter[currentKey] = arrayValues
        isArray = false
      }
      const [, key, value] = line.match(/^(\w+):\s*(.+)$/)
      frontmatter[key] = value
      currentKey = null
    }
  }

  if (currentKey && isArray) {
    frontmatter[currentKey] = arrayValues
  }

  return frontmatter
}

/**
 * 获取文章图标
 */
function getArticleIcon(title) {
  for (const [keyword, icon] of Object.entries(ICON_MAP)) {
    if (title.includes(keyword)) {
      return icon
    }
  }
  return '📄'
}

/**
 * 扫描文章目录
 */
function scanPosts(dir, baseDir = '') {
  const posts = []
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // 递归扫描子目录
      posts.push(...scanPosts(fullPath, path.join(baseDir, item)))
    } else if (item.endsWith('.md') && item !== 'README.md') {
      const content = fs.readFileSync(fullPath, 'utf-8')
      const frontmatter = parseFrontmatter(content)

      // 获取文章标题
      let title = frontmatter.title
      if (!title) {
        // 从文件名获取标题
        title = item.replace('.md', '')
      }

      // 获取分类
      let categories = frontmatter.categories || []
      if (typeof categories === 'string') {
        categories = [categories]
      }
      const category = categories[0] || '其他'

      // 获取描述（从内容中提取第一段）
      let description = ''
      const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n*/, '')
      const firstParagraph = contentWithoutFrontmatter.match(/^#.*\n+([^#\n][^\n]+)/)
      if (firstParagraph) {
        description = firstParagraph[1].replace(/[*`\[\]]/g, '').slice(0, 60)
        if (description.length === 60) description += '...'
      }

      posts.push({
        title,
        path: baseDir ? `${baseDir}/${item}` : item,
        link: baseDir ? `/posts/${baseDir}/${item.replace('.md', '.html')}` : `/posts/${item.replace('.md', '.html')}`,
        category,
        date: frontmatter.date || '',
        tags: frontmatter.tags || [],
        icon: getArticleIcon(title),
        description: description || `${title} 学习笔记与实践总结`
      })
    }
  }

  return posts
}

/**
 * 按分类分组文章
 */
function groupByCategory(posts) {
  const groups = {}

  for (const post of posts) {
    if (!groups[post.category]) {
      groups[post.category] = []
    }
    groups[post.category].push(post)
  }

  // 每个分类内按日期排序（新的在前）
  for (const category of Object.keys(groups)) {
    groups[category].sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date)
      }
      return a.title.localeCompare(b.title, 'zh-CN')
    })
  }

  return groups
}

/**
 * 生成侧边栏配置
 */
function generateSidebar(groups) {
  const sidebar = []

  // 按配置的顺序排列分类
  const sortedCategories = Object.keys(groups).sort((a, b) => {
    const orderA = CATEGORY_CONFIG[a]?.order || 99
    const orderB = CATEGORY_CONFIG[b]?.order || 99
    return orderA - orderB
  })

  for (const category of sortedCategories) {
    const posts = groups[category]

    sidebar.push({
      text: category,
      collapsible: true,
      children: posts.map(p => ({
        text: p.title,
        collapsible: true,
        children: [`/posts/${p.path}`]
      }))
    })
  }

  return sidebar
}

/**
 * 生成 README.md 内容
 */
function generateReadme(groups) {
  let content = `# 📚 博客文章

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

`

  // 按配置的顺序排列分类
  const sortedCategories = Object.keys(groups).sort((a, b) => {
    const orderA = CATEGORY_CONFIG[a]?.order || 99
    const orderB = CATEGORY_CONFIG[b]?.order || 99
    return orderA - orderB
  })

  for (const category of sortedCategories) {
    const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG['其他']
    const posts = groups[category]

    content += `## ${config.icon} ${category}\n\n`
    content += `<div class="post-nav">\n`

    for (const post of posts) {
      content += `  <a href="${post.link}" class="post-card">
    <div class="card-icon">${post.icon}</div>
    <div class="card-content">
      <div class="card-title">${post.title}</div>
      <div class="card-desc">${post.description}</div>
    </div>
    <div class="card-arrow">→</div>
  </a>\n`
    }

    content += `</div>\n\n`
  }

  content += `---

<div style="text-align: center; margin-top: 50px; padding: 30px; background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border-radius: 12px;">
  <h3 style="color: #1e88e5; margin-bottom: 15px;">💡 持续更新中...</h3>
  <p style="color: #666; font-size: 16px;">更多精彩内容正在路上，敬请期待！</p>
  <p style="color: #999; font-size: 14px; margin-top: 10px;">如有问题或建议，欢迎通过 GitHub 或邮件与我交流</p>
</div>
`

  return content
}

/**
 * 主函数
 */
function main() {
  console.log('🚀 开始生成...\n')

  // 扫描文章
  console.log('📂 扫描文章目录...')
  const posts = scanPosts(POSTS_PATH)
  console.log(`   找到 ${posts.length} 篇文章\n`)

  // 按分类分组
  const groups = groupByCategory(posts)
  console.log('📑 文章分类:')
  for (const [category, categoryPosts] of Object.entries(groups)) {
    console.log(`   - ${category}: ${categoryPosts.length} 篇`)
  }
  console.log()

  // 生成侧边栏配置
  console.log('📝 生成侧边栏配置...')
  const sidebar = generateSidebar(groups)
  fs.writeFileSync(SIDEBAR_OUTPUT, JSON.stringify(sidebar, null, 2), 'utf-8')
  console.log(`   已写入: ${SIDEBAR_OUTPUT}\n`)

  // 生成 README.md
  console.log('📝 生成文章列表页...')
  const readme = generateReadme(groups)
  fs.writeFileSync(README_OUTPUT, readme, 'utf-8')
  console.log(`   已写入: ${README_OUTPUT}\n`)

  console.log('✅ 生成完成！')
  console.log('\n💡 提示: 请更新 config.js 导入 sidebar.json')
}

main()
