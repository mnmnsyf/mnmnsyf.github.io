# 佘泳霏 - 个人网站模板 🎮

这是一个专为游戏开发工程师设计的现代化个人网站模板，使用 Vue 3 + TypeScript + Vite 构建。

## ✨ 特性

- 🎨 **现代化设计** - 采用卡片式布局，专业且美观
- 📱 **完全响应式** - 适配手机、平板、电脑所有设备
- ⚡ **高性能** - 基于 Vite 构建，快速加载
- 🎯 **SEO 友好** - 优化的 meta 标签和语义化 HTML
- 🎨 **统一设计系统** - 一致的颜色、字体、间距
- 🔗 **锚点导航** - 平滑滚动到各个模块

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 部署到GitHub Pages

#### 准备工作

1. 在GitHub上创建一个名为 `web-syf` 的仓库
2. 确保已安装Git并正确配置

#### 使用SSH方式部署（推荐，需要配置SSH密钥）

**Linux/Mac 用户:**

```bash
# 修改deploy.sh中的GitHub用户名和仓库名
# 例如将 git@github.com:<USERNAME>/<REPO>.git 修改为 git@github.com:yourusername/web-syf.git

# 赋予脚本执行权限
chmod +x deploy.sh

# 执行部署脚本
./deploy.sh
```

**Windows 用户:**

```bash
# 使用Git Bash
# 修改deploy.sh中的GitHub用户名和仓库名
sh deploy.sh

# 或者使用批处理文件
# 修改deploy.bat中的GitHub用户名和仓库名
deploy.bat
```

#### 使用HTTPS方式部署（无需SSH密钥）

**Linux/Mac 用户:**

```bash
# 修改deploy-https.sh中的GitHub用户名和仓库名
# 例如将 https://github.com/<USERNAME>/<REPO>.git 修改为 https://github.com/yourusername/web-syf.git

# 赋予脚本执行权限
chmod +x deploy-https.sh

# 执行部署脚本
./deploy-https.sh
```

**Windows 用户:**

```bash
# 使用Git Bash
# 修改deploy-https.sh中的GitHub用户名和仓库名
sh deploy-https.sh

# 或者使用批处理文件
# 修改deploy-https.bat中的GitHub用户名和仓库名
deploy-https.bat
```

#### 使用GitHub Actions自动部署（推荐）

项目已配置GitHub Actions工作流，可以实现自动部署：

1. 将项目推送到GitHub仓库
2. 每次推送到 `master` 或 `main` 分支时，GitHub Actions会自动构建并部署到 `mnmnsyf.github.io` 仓库的 `main` 分支
3. 无需手动运行部署脚本

**注意：** 使用此方法需要在GitHub设置中添加 `DEPLOY_TOKEN` 密钥，这是一个有权限访问 `mnmnsyf.github.io` 仓库的个人访问令牌。

```bash
# 初始化Git仓库（如果尚未初始化）
git init

# 添加远程仓库
git remote add origin https://github.com/mnmnsyf/web-syf.git

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 推送到GitHub
git push -u origin master
```

#### 手动部署

你也可以使用部署脚本直接部署到 `mnmnsyf.github.io` 仓库：

```bash
# Windows用户
deploy.bat  # 使用SSH方式
# 或
deploy-https.bat  # 使用HTTPS方式

# Linux/Mac用户
./deploy.sh  # 使用SSH方式
# 或
./deploy-https.sh  # 使用HTTPS方式
```

#### 部署后访问

部署完成后，你的网站将在 `https://mnmnsyf.github.io/` 上线

## 📁 项目结构

```
src/
├── App.vue              # 主应用组件
├── main.ts              # 应用入口
├── assets/
│   ├── base.css         # 基础样式和变量
│   └── main.css         # 全局样式
└── components/          # 组件目录（可选）
```

## 🎨 设计系统

### 颜色方案

- **主色**: `#1e40af` (深蓝色)
- **辅助色**: `#f59e0b` (橙色)
- **背景色**: `#f8fafc` (浅灰)
- **文字色**: `#1e293b` (深灰)

### 字体

- **主字体**: Inter (Google Fonts)
- **备用字体**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto

### 间距

- **容器最大宽度**: 1200px
- **章节间距**: 80px
- **卡片内边距**: 2rem

## 📝 自定义内容

### 1. 个人信息

在 `App.vue` 中更新以下内容：

- 姓名和职位
- 个人简介
- 联系方式

### 2. 各个模块

每个模块都有占位符，您需要替换为实际内容：

#### About Me

```html
<p>[您的个人介绍 - 描述您对游戏开发的热情、经历和驱动力]</p>
```

#### Education

```html
<h3>[大学名称]</h3>
<p class="education-degree">[学位名称]</p>
<p class="education-major">[专业/方向]</p>
<p class="education-gpa">GPA: [您的 GPA]</p>
```

#### Projects

```html
<h3 class="project-title">[项目名称]</h3>
<p class="project-description">[项目简介、使用的技术、您的角色]</p>
<div class="project-tech">
  <span class="tech-tag">[技术1]</span>
  <span class="tech-tag">[技术2]</span>
</div>
```

#### Work Experience

```html
<h3 class="job-title">[职位名称]</h3>
<span class="company-name">[公司名称]</span>
<span class="job-period">[开始日期 - 结束日期]</span>
```

### 3. 图片替换

将占位符替换为实际图片：

- 个人头像 (Hero 区域)
- 项目截图
- About 区域的配图

### 4. 链接更新

更新所有链接指向实际地址：

- GitHub 链接
- LinkedIn 链接
- 项目演示链接
- 邮箱地址

## 🎯 模块说明

### 导航栏

- 固定在顶部
- 支持锚点跳转
- 移动端汉堡菜单（待实现）

### Hero 区域

- 个人姓名和职位
- 简短介绍
- 行动按钮

### About Me

- 个人详细介绍
- 配图区域

### Education

- 教育经历卡片
- 支持多个教育经历

### University Projects

- 项目展示卡片
- 技术标签
- 演示和代码链接

### Competitions & Awards

- 竞赛和奖项展示
- 图标和描述

### Work Experience

- 工作经验时间线
- 职责和成就列表

### Algorithms

- 算法能力展示
- 统计数据

### Interests

- 兴趣爱好展示
- 图标和描述

### Footer

- 联系信息
- 快速链接
- 版权信息

## 📱 响应式设计

### 断点

- **桌面**: > 768px
- **平板**: 768px - 480px
- **手机**: < 480px

### 适配特性

- 移动端单列布局
- 触摸友好的按钮大小
- 优化的字体大小
- 简化的导航

## 🛠️ 技术栈

- **框架**: Vue 3
- **语言**: TypeScript
- **构建工具**: Vite
- **样式**: CSS3 + CSS Variables
- **字体**: Google Fonts (Inter)
- **图标**: Emoji (可替换为图标库)

## 🎨 样式定制

### 修改颜色

在 `src/assets/base.css` 中更新 CSS 变量：

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --background-color: #your-color;
}
```

### 修改字体

在 `index.html` 中更新 Google Fonts 链接，然后在 CSS 中更新字体变量。

### 添加新模块

1. 在 `App.vue` 中添加新的 section
2. 在导航栏中添加对应链接
3. 添加相应的 CSS 样式

## 🚀 部署

### Vercel (推荐)

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署

### Netlify

1. 构建项目: `npm run build`
2. 上传 `dist` 文件夹到 Netlify

### GitHub Pages

1. 构建项目
2. 配置 GitHub Actions 自动部署

## 📞 支持

如果您在使用过程中遇到问题，请：

1. 检查控制台错误信息
2. 确认所有依赖已正确安装
3. 验证文件路径和引用

## 📄 许可证

MIT License - 可自由使用和修改

---

**祝您使用愉快！** 🎉
