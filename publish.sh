#!/usr/bin/env sh

# 一键发布：提交源码到 source 分支，并构建部署到 main 分支（GitHub Pages）
# 用法：
#   sh publish.sh                 使用默认提交信息
#   sh publish.sh "更新某篇笔记"    使用自定义提交信息

set -e

# 提交信息：取第一个参数，没有则用带时间的默认信息
COMMIT_MSG="${1:-docs: update blog $(date '+%Y-%m-%d %H:%M')}"

echo "==============================="
echo "🟦 第 1 步 / 共 2 步：提交源码到 source 分支"
echo "==============================="

# 切到 source 分支（已在该分支则无副作用）
git checkout source

# 只有存在改动时才提交，避免空提交报错中断
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "$COMMIT_MSG"
  echo "✅ 已提交：$COMMIT_MSG"
else
  echo "ℹ️  没有需要提交的源码改动，跳过提交"
fi

# 推送 source（远程已是最新时 git 会提示 up-to-date，不影响后续）
git push origin source
echo "✅ 已推送 source 分支"

echo ""
echo "==============================="
echo "🟩 第 2 步 / 共 2 步：构建并部署到 GitHub Pages（main 分支）"
echo "==============================="

# 复用既有部署脚本：npm run gen -> npm run build -> 强推 dist 到 main
sh deploy.sh

echo ""
echo "🎉 全部完成！源码已存档，网站已发布。"
echo "🌐 1-3 分钟后强制刷新（Ctrl+F5）查看：https://zephyrnan.github.io"
