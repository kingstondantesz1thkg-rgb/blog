const { mongoose, isDatabaseConnected } = require('./config');
const { Schema } = mongoose;

const localizedField = {
  type: Schema.Types.Mixed,
  default: ''
};

const postSchema = new mongoose.Schema(
  {
    title: { ...localizedField, required: true },
    content: { ...localizedField, required: true },
    summary: localizedField,
    category: { ...localizedField, default: 'Uncategorized' },
    tags: { type: [String], default: [] },
    coverImage: { type: String, default: '' },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const experienceSchema = new mongoose.Schema(
  {
    projectName: { ...localizedField, required: true },
    techStack: { type: [String], default: [] },
    description: { ...localizedField, required: true },
    achievement: localizedField,
    duration: localizedField,
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
const Experience =
  mongoose.models.Experience || mongoose.model('Experience', experienceSchema);

const memoryPosts = [
  {
    _id: '682b4a710000000000000001',
    title: {
      zh: '欢迎来到我的动态博客',
      en: 'Welcome To My Dynamic Blog'
    },
    content: {
      zh: '# 你好\n\n这是新后端提供的第一篇文章。',
      en: '# Hello\n\nThis is the first post served by the new backend.'
    },
    summary: {
      zh: '这是服务端种子数据返回的第一篇文章。',
      en: 'The first article returned by the server seed data.'
    },
    category: {
      zh: '后端',
      en: 'Backend'
    },
    tags: ['node', 'express', 'blog'],
    coverImage: '',
    isPublished: true,
    createdAt: new Date('2026-05-19T10:00:00.000Z'),
    updatedAt: new Date('2026-05-19T10:00:00.000Z')
  },
  {
    _id: '682b4a710000000000000002',
    title: {
      zh: '关于页数据流的构建方式',
      en: 'Building The About Page Data Flow'
    },
    content: {
      zh: '这篇文章介绍了项目经历如何被动态管理并展示在前台页面。',
      en: 'This article explains how project experiences can be managed dynamically.'
    },
    summary: {
      zh: '一篇介绍关于页动态数据流的文章。',
      en: 'A post describing the dynamic about page data flow.'
    },
    category: {
      zh: '架构设计',
      en: 'Architecture'
    },
    tags: ['vue', 'mongodb'],
    coverImage: '',
    isPublished: true,
    createdAt: new Date('2026-05-18T10:00:00.000Z'),
    updatedAt: new Date('2026-05-18T10:00:00.000Z')
  }
];

const memoryExperiences = [
  {
    _id: '682b4a710000000000000101',
    projectName: {
      zh: '个人博客重构',
      en: 'Personal Blog Rebuild'
    },
    techStack: ['Vue 3', 'Node.js', 'Express', 'MongoDB'],
    description: {
      zh: '将静态博客重构为具备前后端分离能力的动态全栈应用。',
      en: 'Refactored a static blog into a dynamic full-stack application.'
    },
    achievement: {
      zh: '建立了前后端分离架构，并沉淀出可复用的内容接口。',
      en: 'Established separated front-end/back-end architecture and reusable content APIs.'
    },
    duration: {
      zh: '2026.05 - 至今',
      en: '2026.05 - Present'
    },
    sortOrder: 1,
    createdAt: new Date('2026-05-19T09:00:00.000Z'),
    updatedAt: new Date('2026-05-19T09:00:00.000Z')
  }
];

function normalizeStringArray(input) {
  if (Array.isArray(input)) {
    return input.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof input === 'string') {
    return input
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function isLocalizedObject(input) {
  return Boolean(input) && typeof input === 'object' && !Array.isArray(input);
}

function normalizeLocalizedValue(input, fallback = '') {
  if (typeof input === 'string') {
    const value = input.trim();
    return value ? { zh: value, en: value } : fallback;
  }

  if (isLocalizedObject(input)) {
    const zh = typeof input.zh === 'string' ? input.zh.trim() : '';
    const en = typeof input.en === 'string' ? input.en.trim() : '';

    if (!zh && !en) {
      return fallback;
    }

    return {
      zh: zh || en,
      en: en || zh
    };
  }

  return fallback;
}

function hasLocalizedContent(input) {
  if (typeof input === 'string') {
    return Boolean(input.trim());
  }

  if (isLocalizedObject(input)) {
    return ['zh', 'en'].some(
      (key) => typeof input[key] === 'string' && Boolean(input[key].trim())
    );
  }

  return false;
}

function normalizePostPayload(payload) {
  return {
    ...payload,
    title: normalizeLocalizedValue(payload.title),
    content: normalizeLocalizedValue(payload.content),
    summary:
      payload.summary !== undefined ? normalizeLocalizedValue(payload.summary) : '',
    category:
      payload.category !== undefined
        ? normalizeLocalizedValue(payload.category, 'Uncategorized')
        : 'Uncategorized',
    tags: normalizeStringArray(payload.tags)
  };
}

function normalizeExperiencePayload(payload) {
  return {
    ...payload,
    projectName: normalizeLocalizedValue(payload.projectName),
    description: normalizeLocalizedValue(payload.description),
    achievement:
      payload.achievement !== undefined
        ? normalizeLocalizedValue(payload.achievement)
        : '',
    duration:
      payload.duration !== undefined ? normalizeLocalizedValue(payload.duration) : '',
    techStack: normalizeStringArray(payload.techStack)
  };
}

async function listPosts({ page = 1, limit = 10, category }) {
  const safePage = Number(page) > 0 ? Number(page) : 1;
  const safeLimit = Number(limit) > 0 ? Number(limit) : 10;

  if (isDatabaseConnected()) {
    const filter = category ? { category } : {};
    const total = await Post.countDocuments(filter);
    const data = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit);

    return { total, data, page: safePage, limit: safeLimit };
  }

  let data = [...memoryPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (category) {
    data = data.filter((item) => item.category === category);
  }

  return {
    total: data.length,
    data: data.slice((safePage - 1) * safeLimit, safePage * safeLimit),
    page: safePage,
    limit: safeLimit
  };
}

async function getPostById(id) {
  if (isDatabaseConnected()) {
    return Post.findById(id);
  }

  return memoryPosts.find((item) => item._id === id) || null;
}

async function createPost(payload) {
  const document = normalizePostPayload(payload);

  if (isDatabaseConnected()) {
    return Post.create(document);
  }

  const now = new Date();
  const created = {
    _id: new mongoose.Types.ObjectId().toString(),
    title: document.title || '',
    content: document.content || '',
    summary: document.summary || '',
    category: document.category || 'Uncategorized',
    tags: document.tags,
    coverImage: document.coverImage || '',
    isPublished: document.isPublished ?? true,
    createdAt: now,
    updatedAt: now
  };

  memoryPosts.unshift(created);
  return created;
}

async function updatePost(id, payload) {
  const document = {
    ...payload,
    ...(payload.title !== undefined
      ? { title: normalizeLocalizedValue(payload.title) }
      : {}),
    ...(payload.content !== undefined
      ? { content: normalizeLocalizedValue(payload.content) }
      : {}),
    ...(payload.summary !== undefined
      ? { summary: normalizeLocalizedValue(payload.summary) }
      : {}),
    ...(payload.category !== undefined
      ? { category: normalizeLocalizedValue(payload.category, 'Uncategorized') }
      : {}),
    ...(payload.tags !== undefined ? { tags: normalizeStringArray(payload.tags) } : {})
  };

  if (isDatabaseConnected()) {
    return Post.findByIdAndUpdate(id, document, { new: true, runValidators: true });
  }

  const index = memoryPosts.findIndex((item) => item._id === id);
  if (index === -1) {
    return null;
  }

  memoryPosts[index] = {
    ...memoryPosts[index],
    ...document,
    updatedAt: new Date()
  };

  return memoryPosts[index];
}

async function deletePost(id) {
  if (isDatabaseConnected()) {
    return Post.findByIdAndDelete(id);
  }

  const index = memoryPosts.findIndex((item) => item._id === id);
  if (index === -1) {
    return null;
  }

  const [deleted] = memoryPosts.splice(index, 1);
  return deleted;
}

async function listExperiences() {
  if (isDatabaseConnected()) {
    return Experience.find().sort({ sortOrder: 1, createdAt: -1 });
  }

  return [...memoryExperiences].sort(
    (a, b) => a.sortOrder - b.sortOrder || new Date(b.createdAt) - new Date(a.createdAt)
  );
}

async function createExperience(payload) {
  const document = normalizeExperiencePayload(payload);

  if (isDatabaseConnected()) {
    return Experience.create(document);
  }

  const now = new Date();
  const created = {
    _id: new mongoose.Types.ObjectId().toString(),
    projectName: document.projectName || '',
    techStack: document.techStack,
    description: document.description || '',
    achievement: document.achievement || '',
    duration: document.duration || '',
    sortOrder: Number(document.sortOrder || 0),
    createdAt: now,
    updatedAt: now
  };

  memoryExperiences.unshift(created);
  return created;
}

async function updateExperience(id, payload) {
  const document = {
    ...payload,
    ...(payload.projectName !== undefined
      ? { projectName: normalizeLocalizedValue(payload.projectName) }
      : {}),
    ...(payload.description !== undefined
      ? { description: normalizeLocalizedValue(payload.description) }
      : {}),
    ...(payload.achievement !== undefined
      ? { achievement: normalizeLocalizedValue(payload.achievement) }
      : {}),
    ...(payload.duration !== undefined
      ? { duration: normalizeLocalizedValue(payload.duration) }
      : {}),
    ...(payload.techStack !== undefined
      ? { techStack: normalizeStringArray(payload.techStack) }
      : {})
  };

  if (isDatabaseConnected()) {
    return Experience.findByIdAndUpdate(id, document, { new: true, runValidators: true });
  }

  const index = memoryExperiences.findIndex((item) => item._id === id);
  if (index === -1) {
    return null;
  }

  memoryExperiences[index] = {
    ...memoryExperiences[index],
    ...document,
    updatedAt: new Date()
  };

  return memoryExperiences[index];
}

async function deleteExperience(id) {
  if (isDatabaseConnected()) {
    return Experience.findByIdAndDelete(id);
  }

  const index = memoryExperiences.findIndex((item) => item._id === id);
  if (index === -1) {
    return null;
  }

  const [deleted] = memoryExperiences.splice(index, 1);
  return deleted;
}

async function getAdminSummary() {
  if (isDatabaseConnected()) {
    const [postCount, experienceCount, latestPosts, latestExperiences] = await Promise.all([
      Post.countDocuments(),
      Experience.countDocuments(),
      Post.find().sort({ updatedAt: -1 }).limit(5),
      Experience.find().sort({ updatedAt: -1 }).limit(5)
    ]);

    return {
      postCount,
      experienceCount,
      latestPosts,
      latestExperiences
    };
  }

  return {
    postCount: memoryPosts.length,
    experienceCount: memoryExperiences.length,
    latestPosts: [...memoryPosts]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5),
    latestExperiences: [...memoryExperiences]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5)
  };
}

module.exports = {
  hasLocalizedContent,
  listPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  listExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getAdminSummary
};
