const express = require('express');
const {
  listPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  hasLocalizedContent
} = require('../store');
const { asyncHandler, createHttpError, authenticate } = require('../middleware');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, category } = req.query;
    const result = await listPosts({ page, limit, category });
    res.json(result);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const post = await getPostById(req.params.id);

    if (!post) {
      throw createHttpError(404, 'Post not found.');
    }

    res.json(post);
  })
);

router.post(
  '/',
  authenticate,
  asyncHandler(async (req, res) => {
    const { title, content } = req.body || {};

    if (!hasLocalizedContent(title) || !hasLocalizedContent(content)) {
      throw createHttpError(400, 'title and content are required.');
    }

    const post = await createPost(req.body);
    res.status(201).json(post);
  })
);

router.put(
  '/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const post = await updatePost(req.params.id, req.body || {});

    if (!post) {
      throw createHttpError(404, 'Post not found.');
    }

    res.json(post);
  })
);

router.delete(
  '/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const post = await deletePost(req.params.id);

    if (!post) {
      throw createHttpError(404, 'Post not found.');
    }

    res.json({ message: 'Post deleted successfully.' });
  })
);

module.exports = router;
