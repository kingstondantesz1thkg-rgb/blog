const express = require('express');
const { getAdminSummary } = require('../store');
const { asyncHandler, authenticate } = require('../middleware');

const router = express.Router();

router.get(
  '/summary',
  authenticate,
  asyncHandler(async (req, res) => {
    const summary = await getAdminSummary();
    res.json(summary);
  })
);

module.exports = router;
