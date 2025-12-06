#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

echo "📝 自动生成侧边栏和文章列表..."
npm run gen

echo "🚀 开始构建..."

# 生成静态文件
npm run build

echo "✅ 构建完成！"

# 进入生成的文件夹
cd docs/.vuepress/dist

echo "📦 准备部署..."

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy: update blog'

echo "🎉 准备推送到 GitHub..."

# 发布到 https://zephyrnan.github.io
git push -f https://github.com/zephyrnan/zephyrnan.github.io.git main

echo "✅ 部署完成！"
echo "🌐 访问：https://zephyrnan.github.io"

cd -
