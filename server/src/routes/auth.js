const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { asyncHandler, createHttpError } = require('../middleware');

const router = express.Router();

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
      throw createHttpError(400, 'username and password are required.');
    }

    if (username !== config.adminUsername) {
      throw createHttpError(401, 'Invalid username or password.');
    }

    const passwordMatched = config.adminPasswordHash
      ? await bcrypt.compare(password, config.adminPasswordHash)
      : password === config.adminPassword;

    if (!passwordMatched) {
      throw createHttpError(401, 'Invalid username or password.');
    }

    const token = jwt.sign(
      { username: config.adminUsername, role: 'admin' },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      message: 'Login successful.'
    });
  })
);

module.exports = router;
