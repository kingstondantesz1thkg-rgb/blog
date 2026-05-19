const express = require('express');
const { isDatabaseConnected, getDatabaseMode } = require('../config');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mode: getDatabaseMode(),
    dbConnected: isDatabaseConnected(),
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
