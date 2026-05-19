# 博客系统重构需求与接口文档

## 1. 项目概述
本项目从 Hexo 静态博客重构为前后端分离的动态博客系统。目标是提供更好的自定义能力、真正的数据库支持，以及一个专属于个人的可视化管理后台，用于动态管理文章、分类和“关于我”页面的项目经验。

## 2. 技术栈架构
- **前端 (Client)**: Vue 3 + Vite + TypeScript + Vue Router + Pinia + TailwindCSS
- **后端 (Server)**: Node.js + Express.js + Mongoose (MongoDB) + JWT 鉴权
- **代码仓库**: `https://github.com/kingstondantesz1thkg-rgb/zhd.git`

## 3. 功能需求模块

### 3.1 客户端 (用户前台)
- **文章展示**: 首页分页展示文章列表，支持按分类筛选。
- **文章详情**: Markdown 格式渲染、代码高亮。
- **关于我**: 独立页面，动态拉取并展示博主的核心技能和项目经验。

### 3.2 管理后台 (Admin)
- **安全鉴权**: 登录页，基于 JWT 的 Token 验证，保护所有后台 API。
- **数据面板**: 博客数据概览（文章数、项目数等）。
- **文章管理**: 增、删、改、查文章，包含 Markdown 在线编辑器和封面图上传。
- **项目经验管理**: 在后台动态添加、修改、删除“关于我”页面的项目经验和成就记录，无需再修改代码。

## 4. 接口文档 (API Specifications)

### 4.1 认证模块 (Auth)
- **管理员登录**
  - `POST /api/auth/login`
  - 请求体: `{ username, password }`
  - 响应: `{ token, message }`

### 4.2 文章模块 (Posts)
- **获取文章列表**
  - `GET /api/posts?page=1&limit=10`
  - 响应: `{ total, data: [...] }`
- **获取单篇文章详情**
  - `GET /api/posts/:id`
- **创建新文章** (需鉴权)
  - `POST /api/posts`
  - 请求体: `{ title, content, category, tags }`
- **更新文章** (需鉴权)
  - `PUT /api/posts/:id`
- **删除文章** (需鉴权)
  - `DELETE /api/posts/:id`

### 4.3 个人项目经验模块 (Experiences)
- **获取项目经验列表**
  - `GET /api/experiences`
  - 响应: `[{ id, projectName, techStack, description, achievement, duration }]`
- **新增项目经验** (需鉴权)
  - `POST /api/experiences`
- **修改项目经验** (需鉴权)
  - `PUT /api/experiences/:id`
- **删除项目经验** (需鉴权)
  - `DELETE /api/experiences/:id`