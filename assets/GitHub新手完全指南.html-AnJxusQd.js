import{_ as a,c as e,a as i,b as l,r as p,o as c}from"./app-B0_jyweK.js";const t={};function r(o,s){const n=p("ValineComment");return c(),e("div",null,[s[0]||(s[0]=i(`<h1 id="github-新手完全指南" tabindex="-1"><a class="header-anchor" href="#github-新手完全指南"><span>GitHub 新手完全指南</span></a></h1><h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h2><ol><li><a href="#%E5%89%8D%E7%BD%AE%E5%87%86%E5%A4%87">前置准备</a></li><li><a href="#%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5">核心概念</a></li><li><a href="#%E5%9F%BA%E7%A1%80%E5%91%BD%E4%BB%A4%E8%AF%A6%E8%A7%A3">基础命令详解</a></li><li><a href="#%E5%AE%8C%E6%95%B4%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B">完整工作流程</a></li><li><a href="#%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88">常见错误与解决方案</a></li><li><a href="#%E5%AE%9E%E6%88%98%E6%A1%88%E4%BE%8B">实战案例</a></li><li><a href="#%E8%BF%9B%E9%98%B6%E6%8A%80%E5%B7%A7">进阶技巧</a></li></ol><hr><h2 id="前置准备" tabindex="-1"><a class="header-anchor" href="#前置准备"><span>前置准备</span></a></h2><h3 id="_1-安装-git" tabindex="-1"><a class="header-anchor" href="#_1-安装-git"><span>1. 安装 Git</span></a></h3><p><strong>Windows 用户</strong></p><ul><li>访问 <a href="https://git-scm.com/download/win" target="_blank" rel="noopener noreferrer">https://git-scm.com/download/win</a> 下载安装包</li><li>安装时建议勾选 &quot;Git Bash Here&quot;</li><li>验证安装：打开命令行输入 <code>git --version</code></li></ul><p><strong>macOS 用户</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 使用 Homebrew 安装</span></span>
<span class="line">brew <span class="token function">install</span> <span class="token function">git</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Linux 用户</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># Ubuntu/Debian</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">git</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># CentOS/RHEL</span></span>
<span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token function">git</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-注册-github-账号" tabindex="-1"><a class="header-anchor" href="#_2-注册-github-账号"><span>2. 注册 GitHub 账号</span></a></h3><p>访问 <a href="https://github.com" target="_blank" rel="noopener noreferrer">https://github.com</a> 注册账号</p><h3 id="_3-配置-git-用户信息" tabindex="-1"><a class="header-anchor" href="#_3-配置-git-用户信息"><span>3. 配置 Git 用户信息</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 设置全局用户名</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&quot;你的用户名&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置全局邮箱（建议与 GitHub 注册邮箱一致）</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">&quot;your_email@example.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看配置</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--list</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-配置-ssh-密钥-推荐" tabindex="-1"><a class="header-anchor" href="#_4-配置-ssh-密钥-推荐"><span>4. 配置 SSH 密钥（推荐）</span></a></h3><p><strong>为什么需要 SSH？</strong> 使用 SSH 可以避免每次推送代码时输入用户名和密码。</p><p><strong>生成 SSH 密钥</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 生成密钥（邮箱替换为你的 GitHub 邮箱）</span></span>
<span class="line">ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-b</span> <span class="token number">4096</span> <span class="token parameter variable">-C</span> <span class="token string">&quot;your_email@example.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 一路按回车，使用默认设置</span></span>
<span class="line"><span class="token comment"># 密钥保存在 ~/.ssh/id_rsa.pub（公钥）和 ~/.ssh/id_rsa（私钥）</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>添加公钥到 GitHub</strong></p><ol><li><p>复制公钥内容：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># Windows (Git Bash)</span></span>
<span class="line"><span class="token function">cat</span> ~/.ssh/id_rsa.pub <span class="token operator">|</span> clip</span>
<span class="line"></span>
<span class="line"><span class="token comment"># macOS</span></span>
<span class="line"><span class="token function">cat</span> ~/.ssh/id_rsa.pub <span class="token operator">|</span> pbcopy</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Linux</span></span>
<span class="line"><span class="token function">cat</span> ~/.ssh/id_rsa.pub</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>登录 GitHub → 点击头像 → Settings → SSH and GPG keys → New SSH key</p></li><li><p>粘贴公钥内容，设置标题（如 &quot;My Laptop&quot;），点击 Add SSH key</p></li></ol><p><strong>测试连接</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">ssh</span> <span class="token parameter variable">-T</span> git@github.com</span>
<span class="line"><span class="token comment"># 成功会显示：Hi username! You&#39;ve successfully authenticated...</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="核心概念" tabindex="-1"><a class="header-anchor" href="#核心概念"><span>核心概念</span></a></h2><h3 id="git-与-github-的区别" tabindex="-1"><a class="header-anchor" href="#git-与-github-的区别"><span>Git 与 GitHub 的区别</span></a></h3><ul><li><strong>Git</strong>: 分布式版本控制系统（软件工具）</li><li><strong>GitHub</strong>: 基于 Git 的代码托管平台（网站服务）</li></ul><h3 id="三个重要区域" tabindex="-1"><a class="header-anchor" href="#三个重要区域"><span>三个重要区域</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">工作区 (Working Directory)  →  暂存区 (Staging Area)  →  本地仓库 (Repository)  →  远程仓库 (Remote)</span>
<span class="line">   |                              |                         |                           |</span>
<span class="line">你编辑的文件                    git add                   git commit               git push</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分支-branch" tabindex="-1"><a class="header-anchor" href="#分支-branch"><span>分支（Branch）</span></a></h3><ul><li><strong>main/master</strong>: 主分支，生产环境代码</li><li><strong>develop</strong>: 开发分支</li><li><strong>feature/xxx</strong>: 功能分支</li><li><strong>hotfix/xxx</strong>: 紧急修复分支</li></ul><hr><h2 id="基础命令详解" tabindex="-1"><a class="header-anchor" href="#基础命令详解"><span>基础命令详解</span></a></h2><h3 id="_1-git-init-初始化仓库" tabindex="-1"><a class="header-anchor" href="#_1-git-init-初始化仓库"><span>1. <code>git init</code> - 初始化仓库</span></a></h3><p><strong>作用</strong> 在当前目录创建一个新的 Git 仓库，生成隐藏的 <code>.git</code> 文件夹。</p><p><strong>用法</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token builtin class-name">cd</span> my-project</span>
<span class="line"><span class="token function">git</span> init</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意事项</strong></p><ul><li>只在项目首次纳入 Git 管理时使用</li><li>重复执行不会有副作用，但会提示 &quot;Reinitialized existing Git repository&quot;</li><li>不要在用户根目录（如 <code>~</code> 或 <code>C:\\Users\\Username</code>）执行</li></ul><hr><h3 id="_2-git-clone-克隆远程仓库" tabindex="-1"><a class="header-anchor" href="#_2-git-clone-克隆远程仓库"><span>2. <code>git clone</code> - 克隆远程仓库</span></a></h3><p><strong>作用</strong> 将远程仓库复制到本地。</p><p><strong>用法</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># HTTPS 方式（无需配置 SSH）</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/username/repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># SSH 方式（需配置 SSH 密钥）</span></span>
<span class="line"><span class="token function">git</span> clone git@github.com:username/repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 克隆到指定目录</span></span>
<span class="line"><span class="token function">git</span> clone git@github.com:username/repo.git my-folder</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常见错误</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># ❌ 错误：Permission denied (publickey)</span></span>
<span class="line"><span class="token comment"># 原因：SSH 密钥未配置或未添加到 GitHub</span></span>
<span class="line"><span class="token comment"># 解决：重新配置 SSH 密钥（参考前置准备第4步）</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_3-git-status-查看状态" tabindex="-1"><a class="header-anchor" href="#_3-git-status-查看状态"><span>3. <code>git status</code> - 查看状态</span></a></h3><p><strong>作用</strong> 查看当前工作区和暂存区的状态。</p><p><strong>用法</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> status</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>输出示例</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">On branch main</span>
<span class="line">Changes not staged for commit:</span>
<span class="line">  modified:   README.md          # 已修改但未暂存</span>
<span class="line"></span>
<span class="line">Untracked files:</span>
<span class="line">  new-file.txt                   # 新文件，未追踪</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>技巧</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 简洁输出</span></span>
<span class="line"><span class="token function">git</span> status <span class="token parameter variable">-s</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_4-git-add-添加到暂存区" tabindex="-1"><a class="header-anchor" href="#_4-git-add-添加到暂存区"><span>4. <code>git add</code> - 添加到暂存区</span></a></h3><p><strong>作用</strong> 将文件的修改添加到暂存区，准备提交。</p><p><strong>用法</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 添加所有文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加指定文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> README.md</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加多个文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> file1.txt file2.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加某个目录下所有文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> src/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常见错误</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># ❌ 错误：添加了不该提交的文件（如 node_modules、.env）</span></span>
<span class="line"><span class="token comment"># 解决：创建 .gitignore 文件</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>.gitignore 示例</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 依赖目录</span>
<span class="line">node_modules/</span>
<span class="line">vendor/</span>
<span class="line"></span>
<span class="line"># 环境配置文件</span>
<span class="line">.env</span>
<span class="line">.env.local</span>
<span class="line"></span>
<span class="line"># 编译产物</span>
<span class="line">dist/</span>
<span class="line">build/</span>
<span class="line">*.pyc</span>
<span class="line"></span>
<span class="line"># IDE 配置</span>
<span class="line">.vscode/</span>
<span class="line">.idea/</span>
<span class="line"></span>
<span class="line"># 系统文件</span>
<span class="line">.DS_Store</span>
<span class="line">Thumbs.db</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_5-git-commit-提交到本地仓库" tabindex="-1"><a class="header-anchor" href="#_5-git-commit-提交到本地仓库"><span>5. <code>git commit</code> - 提交到本地仓库</span></a></h3><p><strong>作用</strong> 将暂存区的内容提交到本地仓库，并附上提交说明。</p><p><strong>用法</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 提交并添加说明</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: 添加用户登录功能&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 提交所有已追踪文件的修改（跳过 git add）</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-am</span> <span class="token string">&quot;fix: 修复登录按钮样式&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改上一次提交（未推送到远程时）</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;新的提交信息&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提交信息规范（推荐）</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">feat: 新功能</span>
<span class="line">fix: 修复 Bug</span>
<span class="line">docs: 文档更新</span>
<span class="line">style: 代码格式调整</span>
<span class="line">refactor: 重构代码</span>
<span class="line">test: 测试相关</span>
<span class="line">chore: 构建/工具链更新</span>
<span class="line"></span>
<span class="line"># 示例</span>
<span class="line">git commit -m &quot;feat: 添加文章评论功能&quot;</span>
<span class="line">git commit -m &quot;fix: 修复评论时间显示错误&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常见错误</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># ❌ 错误：Please tell me who you are.</span></span>
<span class="line"><span class="token comment"># 原因：未配置用户信息</span></span>
<span class="line"><span class="token comment"># 解决：</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&quot;你的用户名&quot;</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">&quot;your_email@example.com&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_6-git-log-查看提交历史" tabindex="-1"><a class="header-anchor" href="#_6-git-log-查看提交历史"><span>6. <code>git log</code> - 查看提交历史</span></a></h3><p><strong>用法</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看完整历史</span></span>
<span class="line"><span class="token function">git</span> log</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 单行显示</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--oneline</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 图形化显示分支历史</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--graph</span> <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--all</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看最近 3 次提交</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">-3</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_7-git-remote-管理远程仓库" tabindex="-1"><a class="header-anchor" href="#_7-git-remote-管理远程仓库"><span>7. <code>git remote</code> - 管理远程仓库</span></a></h3><p><strong>作用</strong> 管理与远程仓库的关联。</p><p><strong>用法</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token parameter variable">-v</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token function">add</span> origin git@github.com:username/repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改远程仓库地址</span></span>
<span class="line"><span class="token function">git</span> remote set-url origin git@github.com:username/new-repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除远程仓库关联</span></span>
<span class="line"><span class="token function">git</span> remote remove origin</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常见错误</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># ❌ 错误：remote origin already exists</span></span>
<span class="line"><span class="token comment"># 原因：已存在名为 origin 的远程仓库</span></span>
<span class="line"><span class="token comment"># 解决：</span></span>
<span class="line"><span class="token function">git</span> remote remove origin</span>
<span class="line"><span class="token function">git</span> remote <span class="token function">add</span> origin git@github.com:username/repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或者使用不同的名称</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token function">add</span> upstream git@github.com:username/repo.git</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_8-git-push-推送到远程仓库" tabindex="-1"><a class="header-anchor" href="#_8-git-push-推送到远程仓库"><span>8. <code>git push</code> - 推送到远程仓库</span></a></h3><p><strong>作用</strong> 将本地提交推送到远程仓库。</p><p><strong>用法</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 首次推送（设置上游分支）</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 后续推送</span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 推送所有分支</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">--all</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除远程分支</span></span>
<span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> feature-branch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>强制推送（谨慎使用）</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># ⚠️ 危险操作：覆盖远程历史</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">--force</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ✅ 更安全的强制推送（检测远程是否有新提交）</span></span>
<span class="line"><span class="token function">git</span> push --force-with-lease</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常见错误</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># ❌ 错误：Updates were rejected because the tip of your current branch is behind</span></span>
<span class="line"><span class="token comment"># 原因：远程仓库有新的提交，本地落后</span></span>
<span class="line"><span class="token comment"># 解决：</span></span>
<span class="line"><span class="token function">git</span> pull origin main</span>
<span class="line"><span class="token comment"># 解决冲突后再推送</span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span>
<span class="line"><span class="token comment"># ❌ 错误：failed to push some refs</span></span>
<span class="line"><span class="token comment"># 原因：未设置上游分支</span></span>
<span class="line"><span class="token comment"># 解决：</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_9-git-pull-拉取远程更新" tabindex="-1"><a class="header-anchor" href="#_9-git-pull-拉取远程更新"><span>9. <code>git pull</code> - 拉取远程更新</span></a></h3><p><strong>作用</strong> 从远程仓库拉取最新代码并合并到本地。</p><p><strong>用法</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 拉取当前分支</span></span>
<span class="line"><span class="token function">git</span> pull</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 拉取指定分支</span></span>
<span class="line"><span class="token function">git</span> pull origin main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 拉取并使用 rebase 模式</span></span>
<span class="line"><span class="token function">git</span> pull <span class="token parameter variable">--rebase</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>pull 与 fetch 的区别</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># git pull = git fetch + git merge</span></span>
<span class="line"><span class="token function">git</span> pull</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 仅下载远程更新，不合并</span></span>
<span class="line"><span class="token function">git</span> fetch</span>
<span class="line"><span class="token function">git</span> merge origin/main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解决冲突</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 当拉取时出现冲突</span></span>
<span class="line"><span class="token comment"># 1. 手动编辑冲突文件，查找 &lt;&lt;&lt;&lt;&lt;&lt;&lt;, =======, &gt;&gt;&gt;&gt;&gt;&gt;&gt; 标记</span></span>
<span class="line"><span class="token comment"># 2. 保留需要的内容，删除标记</span></span>
<span class="line"><span class="token comment"># 3. 添加并提交</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;resolve merge conflict&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_10-git-branch-分支管理" tabindex="-1"><a class="header-anchor" href="#_10-git-branch-分支管理"><span>10. <code>git branch</code> - 分支管理</span></a></h3><p><strong>用法</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看所有本地分支</span></span>
<span class="line"><span class="token function">git</span> branch</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看所有分支（包括远程）</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-a</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建新分支</span></span>
<span class="line"><span class="token function">git</span> branch feature-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 切换分支</span></span>
<span class="line"><span class="token function">git</span> checkout feature-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建并切换到新分支（推荐）</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除本地分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-d</span> feature-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 强制删除未合并的分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-D</span> feature-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重命名分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-m</span> old-name new-name</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_11-git-merge-合并分支" tabindex="-1"><a class="header-anchor" href="#_11-git-merge-合并分支"><span>11. <code>git merge</code> - 合并分支</span></a></h3><p><strong>用法</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 将 feature 分支合并到当前分支</span></span>
<span class="line"><span class="token function">git</span> merge feature-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用 --no-ff 保留分支历史</span></span>
<span class="line"><span class="token function">git</span> merge --no-ff feature-login</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>冲突解决流程</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 合并时出现冲突</span></span>
<span class="line"><span class="token function">git</span> merge feature-login</span>
<span class="line"><span class="token comment"># Auto-merging file.txt</span></span>
<span class="line"><span class="token comment"># CONFLICT (content): Merge conflict in file.txt</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 查看冲突文件</span></span>
<span class="line"><span class="token function">git</span> status</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 手动编辑冲突文件</span></span>
<span class="line"><span class="token comment"># &lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</span></span>
<span class="line"><span class="token comment"># 当前分支的内容</span></span>
<span class="line"><span class="token comment"># =======</span></span>
<span class="line"><span class="token comment"># 被合并分支的内容</span></span>
<span class="line"><span class="token comment"># &gt;&gt;&gt;&gt;&gt;&gt;&gt; feature-login</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 保留需要的内容，删除标记</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 标记为已解决</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 完成合并</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;merge: 合并登录功能分支&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="完整工作流程" tabindex="-1"><a class="header-anchor" href="#完整工作流程"><span>完整工作流程</span></a></h2><h3 id="场景一-创建新项目并上传到-github" tabindex="-1"><a class="header-anchor" href="#场景一-创建新项目并上传到-github"><span>场景一：创建新项目并上传到 GitHub</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 在本地创建项目目录</span></span>
<span class="line"><span class="token function">mkdir</span> my-project</span>
<span class="line"><span class="token builtin class-name">cd</span> my-project</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 初始化 Git 仓库</span></span>
<span class="line"><span class="token function">git</span> init</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 创建文件</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;# My Project&quot;</span> <span class="token operator">&gt;</span> README.md</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 添加到暂存区</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 提交到本地仓库</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: 初始化项目&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 在 GitHub 创建新仓库（通过网页操作）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 7. 关联远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token function">add</span> origin git@github.com:username/my-project.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 8. 设置主分支名为 main</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-M</span> main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 9. 推送到远程仓库</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常见问题</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># ❌ 如果 GitHub 自动创建了 README.md，会报错</span></span>
<span class="line"><span class="token comment"># 解决方法：</span></span>
<span class="line"><span class="token function">git</span> pull <span class="token parameter variable">--rebase</span> origin main</span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="场景二-参与开源项目协作" tabindex="-1"><a class="header-anchor" href="#场景二-参与开源项目协作"><span>场景二：参与开源项目协作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. Fork 目标仓库（通过 GitHub 网页）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 克隆你 Fork 的仓库</span></span>
<span class="line"><span class="token function">git</span> clone git@github.com:yourusername/open-source-project.git</span>
<span class="line"><span class="token builtin class-name">cd</span> open-source-project</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 添加上游仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token function">add</span> upstream git@github.com:original-owner/open-source-project.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 创建功能分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature-new-function</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 修改代码并提交</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: 添加新功能&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 推送到你的 Fork 仓库</span></span>
<span class="line"><span class="token function">git</span> push origin feature-new-function</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 7. 在 GitHub 创建 Pull Request（通过网页）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 8. 保持你的分支与上游同步</span></span>
<span class="line"><span class="token function">git</span> fetch upstream</span>
<span class="line"><span class="token function">git</span> checkout main</span>
<span class="line"><span class="token function">git</span> merge upstream/main</span>
<span class="line"><span class="token function">git</span> push origin main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="场景三-日常开发流程" tabindex="-1"><a class="header-anchor" href="#场景三-日常开发流程"><span>场景三：日常开发流程</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 每天开始工作前，拉取最新代码</span></span>
<span class="line"><span class="token function">git</span> checkout main</span>
<span class="line"><span class="token function">git</span> pull origin main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 创建功能分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature-user-profile</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 开发并提交</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: 完成用户资料页面&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 推送到远程</span></span>
<span class="line"><span class="token function">git</span> push origin feature-user-profile</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 创建 Pull Request 进行代码审查</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 合并到主分支后，删除功能分支</span></span>
<span class="line"><span class="token function">git</span> checkout main</span>
<span class="line"><span class="token function">git</span> pull origin main</span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-d</span> feature-user-profile</span>
<span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> feature-user-profile</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="常见错误与解决方案" tabindex="-1"><a class="header-anchor" href="#常见错误与解决方案"><span>常见错误与解决方案</span></a></h2><h3 id="错误-1-提交了敏感信息" tabindex="-1"><a class="header-anchor" href="#错误-1-提交了敏感信息"><span>错误 1：提交了敏感信息</span></a></h3><p><strong>场景</strong> 不小心将包含密码的 <code>.env</code> 文件提交到仓库。</p><p><strong>解决方案</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># ❌ 错误做法：直接删除文件再提交（历史记录仍存在）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ✅ 正确做法：使用 git filter-branch 或 BFG Repo-Cleaner</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方法一：从历史记录中移除文件</span></span>
<span class="line"><span class="token function">git</span> filter-branch <span class="token parameter variable">--force</span> --index-filter <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token string">&quot;git rm --cached --ignore-unmatch .env&quot;</span> <span class="token punctuation">\\</span></span>
<span class="line">  --prune-empty --tag-name-filter <span class="token function">cat</span> -- <span class="token parameter variable">--all</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 强制推送（覆盖远程历史）</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">--force</span> <span class="token parameter variable">--all</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方法二：使用 BFG Repo-Cleaner（更快）</span></span>
<span class="line"><span class="token comment"># 下载 https://rtyley.github.io/bfg-repo-cleaner/</span></span>
<span class="line"><span class="token function">java</span> <span class="token parameter variable">-jar</span> bfg.jar --delete-files .env</span>
<span class="line"><span class="token function">git</span> reflog expire <span class="token parameter variable">--expire</span><span class="token operator">=</span>now <span class="token parameter variable">--all</span> <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> gc <span class="token parameter variable">--prune</span><span class="token operator">=</span>now <span class="token parameter variable">--aggressive</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">--force</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>预防措施</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 创建 .gitignore</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;.env&quot;</span> <span class="token operator">&gt;&gt;</span> .gitignore</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 使用 git-secrets 工具</span></span>
<span class="line"><span class="token function">git</span> secrets <span class="token parameter variable">--install</span></span>
<span class="line"><span class="token function">git</span> secrets --register-aws</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="错误-2-提交信息写错了" tabindex="-1"><a class="header-anchor" href="#错误-2-提交信息写错了"><span>错误 2：提交信息写错了</span></a></h3><p><strong>场景</strong> 提交后发现 commit message 写错了。</p><p><strong>解决方案</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 情况一：仅修改最后一次提交信息（未推送）</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;正确的提交信息&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 情况二：已经推送到远程</span></span>
<span class="line"><span class="token comment"># 不推荐修改，会导致其他人冲突</span></span>
<span class="line"><span class="token comment"># 如果必须修改：</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;正确的提交信息&quot;</span></span>
<span class="line"><span class="token function">git</span> push --force-with-lease</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="错误-3-忘记切换分支就开始开发" tabindex="-1"><a class="header-anchor" href="#错误-3-忘记切换分支就开始开发"><span>错误 3：忘记切换分支就开始开发</span></a></h3><p><strong>场景</strong> 应该在 <code>feature</code> 分支开发，却在 <code>main</code> 分支修改了代码。</p><p><strong>解决方案</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 如果还没有提交</span></span>
<span class="line"><span class="token comment"># 1. 暂存当前修改</span></span>
<span class="line"><span class="token function">git</span> stash</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 切换到正确的分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature-branch</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 恢复修改</span></span>
<span class="line"><span class="token function">git</span> stash pop</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如果已经提交但未推送</span></span>
<span class="line"><span class="token comment"># 1. 创建新分支（保留当前提交）</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature-branch</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 回退 main 分支</span></span>
<span class="line"><span class="token function">git</span> checkout main</span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD~1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="错误-4-需要撤销某次提交" tabindex="-1"><a class="header-anchor" href="#错误-4-需要撤销某次提交"><span>错误 4：需要撤销某次提交</span></a></h3><p><strong>场景</strong> 某次提交引入了 Bug，需要撤销。</p><p><strong>解决方案</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 方法一：revert（推荐，不修改历史）</span></span>
<span class="line"><span class="token function">git</span> revert <span class="token operator">&lt;</span>commit-hash<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># 会创建一个新的提交来撤销指定提交的更改</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方法二：reset（危险，修改历史）</span></span>
<span class="line"><span class="token comment"># 软重置：保留修改，仅撤销 commit</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--soft</span> HEAD~1</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 混合重置：撤销 commit 和 add</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--mixed</span> HEAD~1</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 硬重置：彻底删除修改（慎用）</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD~1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="错误-5-合并时产生大量冲突" tabindex="-1"><a class="header-anchor" href="#错误-5-合并时产生大量冲突"><span>错误 5：合并时产生大量冲突</span></a></h3><p><strong>场景</strong><code>git merge</code> 时出现几十个文件冲突。</p><p><strong>解决方案</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 取消当前合并</span></span>
<span class="line"><span class="token function">git</span> merge <span class="token parameter variable">--abort</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 使用 rebase 代替 merge</span></span>
<span class="line"><span class="token function">git</span> rebase main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 逐个解决冲突</span></span>
<span class="line"><span class="token comment"># 编辑冲突文件 → git add . → git rebase --continue</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 如果冲突太多，跳过某个提交</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">--skip</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 完全放弃 rebase</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">--abort</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="错误-6-推送被拒绝" tabindex="-1"><a class="header-anchor" href="#错误-6-推送被拒绝"><span>错误 6：推送被拒绝</span></a></h3><p><strong>错误信息</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">! [rejected]        main -&gt; main (fetch first)</span>
<span class="line">error: failed to push some refs to &#39;git@github.com:username/repo.git&#39;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>原因</strong> 远程仓库有新的提交，本地不是最新版本。</p><p><strong>解决方案</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 先拉取远程更新</span></span>
<span class="line"><span class="token function">git</span> pull origin main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 如果出现冲突，手动解决</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 再次推送</span></span>
<span class="line"><span class="token function">git</span> push origin main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如果确定要覆盖远程（谨慎）</span></span>
<span class="line"><span class="token function">git</span> push --force-with-lease</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="实战案例" tabindex="-1"><a class="header-anchor" href="#实战案例"><span>实战案例</span></a></h2><h3 id="案例-1-修复线上紧急-bug" tabindex="-1"><a class="header-anchor" href="#案例-1-修复线上紧急-bug"><span>案例 1：修复线上紧急 Bug</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 从 main 创建 hotfix 分支</span></span>
<span class="line"><span class="token function">git</span> checkout main</span>
<span class="line"><span class="token function">git</span> pull origin main</span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> hotfix-payment-error</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 修复 Bug 并提交</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> src/payment.js</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;fix: 修复支付金额计算错误&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 合并到 main</span></span>
<span class="line"><span class="token function">git</span> checkout main</span>
<span class="line"><span class="token function">git</span> merge hotfix-payment-error</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 推送到远程</span></span>
<span class="line"><span class="token function">git</span> push origin main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 打标签</span></span>
<span class="line"><span class="token function">git</span> tag <span class="token parameter variable">-a</span> v1.0.1 <span class="token parameter variable">-m</span> <span class="token string">&quot;修复支付 Bug&quot;</span></span>
<span class="line"><span class="token function">git</span> push origin v1.0.1</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 同步到开发分支</span></span>
<span class="line"><span class="token function">git</span> checkout develop</span>
<span class="line"><span class="token function">git</span> merge hotfix-payment-error</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 7. 删除 hotfix 分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-d</span> hotfix-payment-error</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="案例-2-多人协作冲突解决" tabindex="-1"><a class="header-anchor" href="#案例-2-多人协作冲突解决"><span>案例 2：多人协作冲突解决</span></a></h3><p><strong>场景</strong> 你和同事同时修改了 <code>config.js</code> 文件。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 你提交了代码</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> config.js</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: 添加数据库配置&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 推送时发现冲突</span></span>
<span class="line"><span class="token function">git</span> push origin main</span>
<span class="line"><span class="token comment"># ! [rejected] main -&gt; main (fetch first)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 拉取远程代码</span></span>
<span class="line"><span class="token function">git</span> pull origin main</span>
<span class="line"><span class="token comment"># CONFLICT (content): Merge conflict in config.js</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 查看冲突</span></span>
<span class="line"><span class="token function">cat</span> config.js</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>冲突文件内容</strong></p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">// config.js</span></span>
<span class="line"><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token operator">&lt;&lt;</span><span class="token operator">&lt;&lt;</span><span class="token operator">&lt;&lt;</span><span class="token operator">&lt;</span> <span class="token constant">HEAD</span></span>
<span class="line">  <span class="token literal-property property">database</span><span class="token operator">:</span> <span class="token string">&#39;mysql&#39;</span><span class="token punctuation">,</span>  <span class="token comment">// 你的修改</span></span>
<span class="line">  <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">3306</span></span>
<span class="line"><span class="token operator">===</span><span class="token operator">===</span><span class="token operator">=</span></span>
<span class="line">  <span class="token literal-property property">database</span><span class="token operator">:</span> <span class="token string">&#39;postgresql&#39;</span><span class="token punctuation">,</span>  <span class="token comment">// 同事的修改</span></span>
<span class="line">  <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">5432</span></span>
<span class="line"><span class="token operator">&gt;&gt;&gt;</span><span class="token operator">&gt;&gt;&gt;</span><span class="token operator">&gt;</span> origin<span class="token operator">/</span>main</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解决冲突</strong></p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">// 保留两者的修改，根据实际需求调整</span></span>
<span class="line"><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">database</span><span class="token operator">:</span> <span class="token string">&#39;postgresql&#39;</span><span class="token punctuation">,</span>  <span class="token comment">// 使用同事的数据库选择</span></span>
<span class="line">  <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">5432</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">mysql</span><span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token comment">// 你的配置作为备用</span></span>
<span class="line">    <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">3306</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 5. 标记为已解决</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> config.js</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;merge: 解决数据库配置冲突&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 推送</span></span>
<span class="line"><span class="token function">git</span> push origin main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="进阶技巧" tabindex="-1"><a class="header-anchor" href="#进阶技巧"><span>进阶技巧</span></a></h2><h3 id="_1-使用别名简化命令" tabindex="-1"><a class="header-anchor" href="#_1-使用别名简化命令"><span>1. 使用别名简化命令</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 设置常用别名</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.st status</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.co checkout</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.br branch</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.ci commit</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.unstage <span class="token string">&#39;reset HEAD --&#39;</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.last <span class="token string">&#39;log -1 HEAD&#39;</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.lg <span class="token string">&quot;log --graph --oneline --all&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用别名</span></span>
<span class="line"><span class="token function">git</span> st</span>
<span class="line"><span class="token function">git</span> co main</span>
<span class="line"><span class="token function">git</span> lg</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_2-交互式暂存" tabindex="-1"><a class="header-anchor" href="#_2-交互式暂存"><span>2. 交互式暂存</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 部分暂存文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-p</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 会逐个显示修改块，选择：</span></span>
<span class="line"><span class="token comment"># y - 暂存此块</span></span>
<span class="line"><span class="token comment"># n - 不暂存</span></span>
<span class="line"><span class="token comment"># s - 分割成更小的块</span></span>
<span class="line"><span class="token comment"># q - 退出</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_3-查看文件修改历史" tabindex="-1"><a class="header-anchor" href="#_3-查看文件修改历史"><span>3. 查看文件修改历史</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看文件的所有提交历史</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--follow</span> -- path/to/file</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看文件每一行的修改者</span></span>
<span class="line"><span class="token function">git</span> blame file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看某次提交的详细内容</span></span>
<span class="line"><span class="token function">git</span> show <span class="token operator">&lt;</span>commit-hash<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_4-使用-git-hooks-自动化" tabindex="-1"><a class="header-anchor" href="#_4-使用-git-hooks-自动化"><span>4. 使用 Git Hooks 自动化</span></a></h3><p><strong>pre-commit hook 示例</strong>（代码提交前检查）</p><p>创建 <code>.git/hooks/pre-commit</code> 文件：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/sh</span></span>
<span class="line"><span class="token comment"># 运行测试</span></span>
<span class="line"><span class="token function">npm</span> <span class="token builtin class-name">test</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">  <span class="token builtin class-name">echo</span> <span class="token string">&quot;测试未通过,提交已取消&quot;</span></span>
<span class="line">  <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查代码规范</span></span>
<span class="line"><span class="token function">npm</span> run lint</span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">  <span class="token builtin class-name">echo</span> <span class="token string">&quot;代码规范检查失败&quot;</span></span>
<span class="line">  <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 设置可执行权限</span></span>
<span class="line"><span class="token function">chmod</span> +x .git/hooks/pre-commit</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_5-子模块管理" tabindex="-1"><a class="header-anchor" href="#_5-子模块管理"><span>5. 子模块管理</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 添加子模块</span></span>
<span class="line"><span class="token function">git</span> submodule <span class="token function">add</span> https://github.com/user/repo.git lib/repo</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 克隆包含子模块的仓库</span></span>
<span class="line"><span class="token function">git</span> clone --recurse-submodules https://github.com/user/main-repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 更新子模块</span></span>
<span class="line"><span class="token function">git</span> submodule update <span class="token parameter variable">--remote</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_6-搜索历史提交" tabindex="-1"><a class="header-anchor" href="#_6-搜索历史提交"><span>6. 搜索历史提交</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 搜索包含特定内容的提交</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">-S</span> <span class="token string">&quot;function_name&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 搜索提交信息</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--grep</span><span class="token operator">=</span><span class="token string">&quot;关键词&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查找删除了某行代码的提交</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">-S</span> <span class="token string">&quot;deleted_code&quot;</span> <span class="token parameter variable">--all</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="常用资源" tabindex="-1"><a class="header-anchor" href="#常用资源"><span>常用资源</span></a></h2><h3 id="官方文档" tabindex="-1"><a class="header-anchor" href="#官方文档"><span>官方文档</span></a></h3><ul><li><a href="https://git-scm.com/doc" target="_blank" rel="noopener noreferrer">Git 官方文档</a></li><li><a href="https://docs.github.com" target="_blank" rel="noopener noreferrer">GitHub 官方文档</a></li></ul><h3 id="可视化工具" tabindex="-1"><a class="header-anchor" href="#可视化工具"><span>可视化工具</span></a></h3><ul><li><strong>GitKraken</strong>: 跨平台图形化界面</li><li><strong>SourceTree</strong>: 免费的 Git GUI</li><li><strong>GitHub Desktop</strong>: GitHub 官方客户端</li></ul><h3 id="学习资源" tabindex="-1"><a class="header-anchor" href="#学习资源"><span>学习资源</span></a></h3><ul><li><a href="https://learngitbranching.js.org/" target="_blank" rel="noopener noreferrer">Learn Git Branching</a>（交互式教程）</li><li><a href="https://git-scm.com/book/zh/v2" target="_blank" rel="noopener noreferrer">Pro Git 中文版</a></li></ul><h3 id="速查表" tabindex="-1"><a class="header-anchor" href="#速查表"><span>速查表</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看帮助</span></span>
<span class="line"><span class="token function">git</span> <span class="token builtin class-name">help</span> <span class="token operator">&lt;</span>command<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">git</span> <span class="token operator">&lt;</span>command<span class="token operator">&gt;</span> <span class="token parameter variable">--help</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 示例</span></span>
<span class="line"><span class="token function">git</span> <span class="token builtin class-name">help</span> commit</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><h3 id="最重要的命令-新手必会" tabindex="-1"><a class="header-anchor" href="#最重要的命令-新手必会"><span>最重要的命令（新手必会）</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> clone    <span class="token comment"># 克隆仓库</span></span>
<span class="line"><span class="token function">git</span> status   <span class="token comment"># 查看状态</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span>      <span class="token comment"># 添加到暂存区</span></span>
<span class="line"><span class="token function">git</span> commit   <span class="token comment"># 提交</span></span>
<span class="line"><span class="token function">git</span> push     <span class="token comment"># 推送到远程</span></span>
<span class="line"><span class="token function">git</span> pull     <span class="token comment"># 拉取远程更新</span></span>
<span class="line"><span class="token function">git</span> branch   <span class="token comment"># 分支管理</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token comment"># 切换分支</span></span>
<span class="line"><span class="token function">git</span> merge    <span class="token comment"># 合并分支</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="黄金法则" tabindex="-1"><a class="header-anchor" href="#黄金法则"><span>黄金法则</span></a></h3><ol><li><strong>频繁提交</strong>：小步快跑，每完成一个功能就提交</li><li><strong>写清楚提交信息</strong>：让别人（和未来的自己）能看懂</li><li><strong>推送前先拉取</strong>：避免冲突</li><li><strong>不要推送敏感信息</strong>：使用 <code>.gitignore</code></li><li><strong>谨慎使用 <code>--force</code></strong>：除非你知道自己在做什么</li><li><strong>善用分支</strong>：不要在 main 分支直接开发</li><li><strong>代码审查</strong>：使用 Pull Request 流程</li></ol><hr><p><strong>祝你使用 Git/GitHub 顺利！</strong> 遇到问题时，记住：<code>git help</code> 是你的好朋友。</p><h2 id="💬-评论交流" tabindex="-1"><a class="header-anchor" href="#💬-评论交流"><span>💬 评论交流</span></a></h2><p>有任何问题或建议，欢迎在下方留言交流！</p>`,215)),l(n)])}const m=a(t,[["render",r]]),u=JSON.parse('{"path":"/posts/GitHub%E6%96%B0%E6%89%8B%E5%AE%8C%E5%85%A8%E6%8C%87%E5%8D%97.html","title":"GitHub新手完全指南","lang":"zh-CN","frontmatter":{"title":"GitHub新手完全指南","date":"2024-01-12T00:00:00.000Z","categories":["工具"],"tags":["GitHub","Git"]},"git":{"updatedTime":1763183937000,"contributors":[{"name":"52nnnn","username":"52nnnn","email":"2764304248@qq.com","commits":2,"url":"https://github.com/52nnnn"},{"name":"Claude","username":"Claude","email":"noreply@anthropic.com","commits":2,"url":"https://github.com/Claude"}],"changelog":[{"hash":"3ffb432574865b064ea9512c3a59862d91d39afb","time":1763183937000,"email":"2764304248@qq.com","author":"52nnnn","message":"feat: add comment component to all 12 articles","coAuthors":[{"name":"Claude","email":"noreply@anthropic.com"}]},{"hash":"da4a1f32e3b2d27eb28b30330c63b7481faef583","time":1763119350000,"email":"2764304248@qq.com","author":"52nnnn","message":"Initial commit: VuePress 2.0 博客项目搭建完成","coAuthors":[{"name":"Claude","email":"noreply@anthropic.com"}]}]},"filePathRelative":"posts/GitHub新手完全指南.md"}');export{m as comp,u as data};
