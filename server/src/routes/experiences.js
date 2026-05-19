const express = require('express');
const {
  listExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  hasLocalizedContent
} = require('../store');
const { asyncHandler, createHttpError, authenticate } = require('../middleware');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const data = await listExperiences();
    res.json(data);
  })
);

router.post(
  '/',
  authenticate,
  asyncHandler(async (req, res) => {
    const { projectName, description } = req.body || {};

    if (!hasLocalizedContent(projectName) || !hasLocalizedContent(description)) {
      throw createHttpError(400, 'projectName and description are required.');
    }

    const document = await createExperience(req.body);
    res.status(201).json(document);
  })
);

router.put(
  '/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const document = await updateExperience(req.params.id, req.body || {});

    if (!document) {
      throw createHttpError(404, 'Experience not found.');
    }

    res.json(document);
  })
);

router.delete(
  '/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const document = await deleteExperience(req.params.id);

    if (!document) {
      throw createHttpError(404, 'Experience not found.');
    }

    res.json({ message: 'Experience deleted successfully.' });
  })
);

module.exports = router;
