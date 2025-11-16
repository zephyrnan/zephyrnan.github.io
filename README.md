# 静态资源目录

将你的静态资源（图片、图标等）放在这个目录下。

## 推荐的文件：

- `avatar.jpg` 或 `avatar.png` - 头像图片
- `hero-image.jpg` - 首页展示图片
- `logo.png` - 网站 logo

## 使用方法：

在 markdown 文件中引用：
```markdown
![图片描述](/avatar.jpg)
```

在配置文件中引用：
```js
logo: '/logo.png'
```

注意：路径以 `/` 开头，表示从 public 目录开始。
