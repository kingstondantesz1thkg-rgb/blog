# MyBlog 项目前后端对接与后台UI更新文档

## 1. 概览 (Overview)
本项目是一个基于 Vue 3 (前端) + Node.js/Express (后端) 的全栈博客系统。
本次更新主要完成了前端与已有后端 API 的深度对接，并基于 TailwindCSS 构建了一个具备完整鉴权与增删改查展示的本地后台管理 UI。

## 2. 核心完成事项

### 2.1 前端页面实现与对接
- **文章列表页 (`Posts.vue`)**:
  - 完成了页面的 UI 构建，展示博客文章列表。
  - 成功对接了后端的 `GET /api/posts` 接口，动态渲染文章标题、摘要、分类、日期等。
- **文章详情页 (`PostDetail.vue`)**:
  - 实现了点击文章进入详情页的路由。
  - 对接了 `GET /api/posts/:id` 接口，利用自建的 markdown 工具函数 (`utils/markdown.ts`) 渲染文章内容。
- **关于页面重构 (`About.vue`)**:
  - 移除原有的硬编码国际化数据 (Mock Data)。
  - 对接 `GET /api/experiences` 接口，实现动态拉取后端数据库中的项目经历并渲染到时间轴上。

### 2.2 本地后台管理系统构建 (Admin UI)
- **后台登录页 (`AdminLogin.vue`)**:
  - 位于 `/admin/login`，提供了管理员登录界面。
  - 对接 `POST /api/auth/login` 接口，获取 JWT Token 并持久化存储至 `localStorage`。
- **后台管理面板 (`AdminDashboard.vue`)**:
  - 位于 `/admin`，通过 Vue Router 的路由守卫拦截未登录用户。
  - **选项卡切换**: 支持在“文章管理”和“经历管理”之间切换。
  - **数据展示**: 表格形式展示文章列表与项目经历列表。
  - **操作功能**: 实现了对接 `DELETE` 接口的删除功能，并在界面上预留了“新增”和“编辑”的操作入口。

### 2.3 融合外部 UI 切图的新功能：赞助/打赏系统 (Sponsor UI)
- **提取 UI 资产**: 
  - 根据需求，从 `C:\wechatxiaochengxv\UI\0116 奶茶果汁饮料商城APP界面设计41P\切图` 目录中精选了部分商城图标（如 `购物车`、`礼包/会员`、`菜单`、`支付成功`）。
- **重构为“支持开发者”功能 (`Sponsor.vue`)**:
  - 为了让商城 UI 在个人博客中**更有意义**，我没有生硬地塞入一个与博客毫不相干的独立商城，而是开发了一个 **"请我喝杯茶 / 赞助开发者"** 的交互页面。
  - 包含饮品菜单（果汁、奶茶、咖啡等模拟商品）、右侧购物车面板以及模拟的结账流程。
  - 使用了提取的商城切图（如购物袋、成功提示、菜单等）作为页面核心视觉元素，极大地提升了页面的趣味性和美观度。
- **导航接入**: 
  - 在全局导航栏 `Navbar.vue` 与多语言配置 `i18n` 中增加了 `/sponsor` 的路由入口。

## 3. 技术细节说明

- **路由保护**: 在 `client/src/router/index.ts` 中配置了全局前置守卫，检查 `localStorage` 中的 `admin-token` 以保护 `/admin` 相关路由。
- **Markdown 渲染**: 考虑到最小化依赖，没有引入第三方的 `marked.js`，而是使用项目原有的 `client/src/utils/markdown.ts` 进行富文本解析。
- **网络请求**: API 调用逻辑已集中在 `client/src/api/content.ts`，借助 Axios 拦截器实现了 JWT Token 的自动携带。

## 4. 后续操作指南

### 启动方式
1. **启动后端**:
   ```powershell
   cd server
   node src/server.js
   ```
2. **启动前端**:
   ```powershell
   cd client
   npm run dev
   ```
   默认地址为 `http://localhost:5173`。

### 使用后台
1. 访问 `http://localhost:5173/admin`。
2. 输入在 `.env` 中配置的管理员账号密码（默认为 `admin` / `admin123`）。
3. 登录后即可在仪表盘中管理文章与项目经历。
