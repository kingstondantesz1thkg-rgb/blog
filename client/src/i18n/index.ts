import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'Home',
      posts: 'Posts',
      about: 'About',
      cooperation: 'Cooperate',
      sponsor: 'Sponsor',
      admin: 'Admin',
      dashboard: 'Dashboard',
      logout: 'Logout',
      toggleLang: 'EN'
    },
    home: {
      status: 'Available for new opportunities',
      statusAction: 'View cooperation details',
      greeting: "Hi, I'm",
      name: 'Zheng Hongda',
      role: 'Full-Stack Dev.',
      desc: 'I build modern, high-performance web applications with scalable architectures. Transforming complex problems into elegant digital experiences.',
      btnExplore: 'Explore My Journey',
      btnGithub: 'GitHub',
      btnBrowsePosts: 'Browse Posts',
      apiStatus: 'API Status',
      apiOnline: 'Online',
      apiError: 'Error',
      apiDesc: 'Frontend is connected to real backend API',
      postCount: 'Post Count',
      postCountDesc: 'Supports pagination, details, and admin panel',
      categories: 'Categories',
      categoriesDesc: 'Real-time aggregation from published posts',
      latestWriting: 'Latest Writing',
      latestWritingDesc: 'Displaying latest posts, click to view details.',
      viewAll: 'View All',
      scrollNext: 'Scroll Down',
      readArticle: 'Read Article',
      loadingPosts: 'Loading posts...',
      loadPostsError: 'Failed to load posts, please check if backend is running.',
      noSummary: 'No summary',
    },
    cooperation: {
      badge: 'Open For Cooperation',
      title: 'Let us build something valuable together.',
      subtitle: 'Brand content, technical consulting, website customization, and project collaboration are all welcome. If your idea matches my direction, feel free to reach out.',
      ctaEmail: 'Send Email',
      ctaQr: 'View QR Code',
      emailTitle: 'Email Cooperation',
      emailDesc: 'If you already have a brief, schedule, or reference case, sending it by email helps me evaluate the collaboration faster.',
      emailLabel: 'Business Email',
      sendMail: 'Write Now',
      qrTitle: 'QR Contact',
      qrDesc: 'You can also scan the QR code for a quicker conversation about your needs, timeline, and budget.',
      serviceTitle: 'Cooperation Scope',
      serviceDesc: 'Frontend and backend development, personal brand websites, blog systems, admin dashboards, and content-oriented interactive pages.',
      responseTitle: 'Response Time',
      responseDesc: 'Normally replies within 24 hours. For urgent projects, please mention your expected launch time in the first message.'
    },
    posts: {
      title: 'Posts',
      subtitle: 'Documenting tech and life',
      noPosts: 'No posts available.',
      readMore: 'Read Full Article',
      backToList: 'Back to List',
      postNotFound: 'Failed to load post, it may not exist.',
    },
    sponsor: {
      title: 'Support Developer',
      subtitle: 'If my open-source projects and articles helped you, you can buy me a coffee! ☕',
      menuTitle: 'Drink Menu',
      addToCart: 'Add to Cart',
      cartTitle: 'Cart',
      emptyCart: 'Cart is empty~',
      total: 'Total',
      checkout: 'Confirm Support',
      processing: 'Processing...',
      successTitle: 'Payment Successful!',
      successDesc: 'Thank you very much for your generous support! The drinks you bought will turn into my motivation for coding late at night. 🚀',
      continue: 'Continue Browsing',
      drinks: {
        juice: { name: 'Fresh Juice', desc: 'Refreshing and clears the mind, a source of inspiration for fixing bugs.' },
        boba: { name: 'Boba Tea', desc: 'Sugar rush for an enjoyable coding time.' },
        coffee: { name: 'Iced Americano', desc: 'Essential for late-night grinds, code without sleeping.' },
        tea: { name: 'Deluxe High Tea', desc: 'Double the boost! Motivates me to build better open-source projects.' },
      }
    },
    about: {
      name: 'Zheng Hongda',
      role: 'Full-Stack Software Engineer',
      desc: 'Passionate developer obsessed with code quality, performance, and building intuitive user experiences from the ground up.',
      coreCapabilities: 'Core Capabilities',
      frontend: 'Frontend',
      backend: 'Backend',
      devops: 'DevOps & DB',
      projectExp: 'Project Experience',
      proj1: {
        title: 'Full-Stack Blog System',
        time: '2025 - 2026',
        desc: 'Independently designed, developed, and maintained a personal tech brand portal. Implemented dynamic article management, categorization, full-text search, and an interactive comment system with an admin dashboard.',
        achieve: 'Achieved <strong class="text-white">40% reduction</strong> in first-paint rendering time through deep architecture customization and advanced frontend performance optimization techniques.'
      },
      proj2: {
        title: 'Enterprise Admin Dashboard',
        time: '2024 - 2025',
        desc: 'Architected an internal data management platform for medium-sized enterprises. Supports dynamic permission routing, large-scale data table exports, and real-time chart monitoring via WebSockets.',
        achieve: 'Streamlined legacy approval workflows, boosting cross-department collaboration. System stably processes <strong class="text-white">1,000,000+</strong> data entries monthly without performance degradation.'
      }
    },
    footer: {
      copyright: '© 2026 Zheng Hongda. Crafted with Vue 3 & Tailwind.',
      systemOnline: 'System Online'
    }
  },
  zh: {
    nav: {
      home: '首页',
      posts: '文章',
      about: '关于我',
      cooperation: '合作',
      sponsor: '请我喝茶',
      admin: '后台',
      dashboard: '控制台',
      logout: '退出',
      toggleLang: '中'
    },
    home: {
      status: '开放新的合作机会',
      statusAction: '查看合作方式',
      greeting: "你好，我是",
      name: '郑泓达',
      role: '全栈开发者',
      desc: '我致力于构建现代、高性能且具备可扩展架构的 Web 应用。将复杂问题转化为优雅的数字体验。',
      btnExplore: '探索我的旅程',
      btnGithub: 'GitHub',
      btnBrowsePosts: '浏览文章',
      apiStatus: '接口状态',
      apiOnline: '在线',
      apiError: '异常',
      apiDesc: '前端已接入真实后端 API',
      postCount: '文章数量',
      postCountDesc: '支持分页、详情与后台管理',
      categories: '主要分类',
      categoriesDesc: '来自已发布文章的实时聚合',
      latestWriting: '精选文章',
      latestWritingDesc: '首页展示最新文章，点击后进入文章详情页。',
      viewAll: '查看全部',
      scrollNext: '继续下翻',
      readArticle: '阅读文章',
      loadingPosts: '正在加载文章...',
      loadPostsError: '文章加载失败，请确认后端服务已启动。',
      noSummary: '暂无摘要',
    },
    cooperation: {
      badge: '合作开放中',
      title: '如果你有想法，我们可以一起把它做成作品。',
      subtitle: '欢迎品牌内容合作、技术咨询、网站定制开发、博客系统搭建与项目协作。只要方向契合，都可以直接联系我。',
      ctaEmail: '发送邮件',
      ctaQr: '查看二维码',
      emailTitle: '邮件合作',
      emailDesc: '如果你已经有需求说明、预期排期或参考案例，建议直接通过邮箱发送，我可以更快评估合作方案。',
      emailLabel: '合作邮箱',
      sendMail: '立即写信',
      qrTitle: '扫码联系',
      qrDesc: '如果你更习惯即时沟通，也可以扫码联系我，快速对接需求、排期和预算。',
      serviceTitle: '合作范围',
      serviceDesc: '前后端开发、个人品牌站、博客系统、后台管理面板，以及面向内容展示的高质量交互页面。',
      responseTitle: '响应时间',
      responseDesc: '通常会在 24 小时内回复；如果项目时间紧急，建议首条消息里直接说明上线时间。'
    },
    posts: {
      title: '文章列表',
      subtitle: '记录技术与生活',
      noPosts: '暂无文章。',
      readMore: '阅读全文',
      backToList: '返回列表',
      postNotFound: '文章加载失败，可能不存在。',
    },
    sponsor: {
      title: '支持开发者',
      subtitle: '如果我的开源项目和文章对你有帮助，可以请我喝杯茶！☕',
      menuTitle: '饮品菜单',
      addToCart: '加入购物车',
      cartTitle: '购物车',
      emptyCart: '购物车空空如也~',
      total: '总计',
      checkout: '确认打赏',
      processing: '处理中...',
      successTitle: '支付成功！',
      successDesc: '非常感谢您的慷慨打赏！您请的饮品将化作我深夜写代码的动力。🚀',
      continue: '继续浏览博客',
      drinks: {
        juice: { name: '清爽果汁', desc: '提神醒脑，解决 Bug 的灵感之源。' },
        boba: { name: '珍珠奶茶', desc: '补充糖分，享受编码的美好时光。' },
        coffee: { name: '冰美式咖啡', desc: '深夜修仙必备，肝代码不瞌睡。' },
        tea: { name: '豪华下午茶', desc: '超级加倍！让我能有动力写出更好的开源项目。' },
      }
    },
    about: {
      name: '郑泓达',
      role: '全栈软件工程师',
      desc: '充满热情的开发者，对代码质量、性能和从零构建直观的用户体验有着极致的追求。',
      coreCapabilities: '核心能力',
      frontend: '前端开发',
      backend: '后端架构',
      devops: '运维与数据库',
      projectExp: '项目经验',
      proj1: {
        title: '全栈个人博客系统',
        time: '2025 - 2026',
        desc: '独立设计、开发并维护的个人技术品牌门户。实现了动态文章管理、分类、全文搜索以及带有管理后台的互动评论系统。',
        achieve: '通过深度架构定制和先进的前端性能优化技术，将首屏渲染时间减少了 <strong class="text-white">40%</strong>。'
      },
      proj2: {
        title: '企业级后台管理系统',
        time: '2024 - 2025',
        desc: '为中型企业架构的内部数据管理平台。支持动态权限路由、大规模数据表格导出以及基于 WebSocket 的实时图表监控。',
        achieve: '优化了原有繁琐的审批流，提升了跨部门协作效率。系统稳定处理每月超过 <strong class="text-white">1,000,000</strong> 条数据，且无性能衰减。'
      }
    },
    footer: {
      copyright: '© 2026 郑泓达. 基于 Vue 3 & Tailwind 打造.',
      systemOnline: '系统在线'
    }
  }
}

// Check local storage for saved language, default to 'zh'
const savedLang = localStorage.getItem('user-lang') || 'zh'

export const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: savedLang,
  fallbackLocale: 'en',
  messages,
})
