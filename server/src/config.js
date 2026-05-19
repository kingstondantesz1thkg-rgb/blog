const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const config = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || 'development',
  clientOrigin: process.env.CLIENT_ORIGIN || '*',
  jwtSecret: process.env.JWT_SECRET || 'change-this-jwt-secret',
  adminUsername: process.env.ADMIN_USERNAME || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || '',
  mongodbUri: process.env.MONGODB_URI || ''
};

let databaseMode = 'memory';

async function connectDatabase() {
  if (!config.mongodbUri) {
    console.warn('[db] MONGODB_URI not set, using in-memory development mode.');
    return { connected: false, mode: databaseMode };
  }

  try {
    await mongoose.connect(config.mongodbUri);
    databaseMode = 'mongo';
    console.log('[db] MongoDB connected successfully.');
    return { connected: true, mode: databaseMode };
  } catch (error) {
    databaseMode = 'memory';
    console.error('[db] MongoDB connection failed, falling back to memory mode.');
    console.error(error.message);
    return { connected: false, mode: databaseMode, error };
  }
}

function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

function getDatabaseMode() {
  return isDatabaseConnected() ? 'mongo' : databaseMode;
}

module.exports = {
  config,
  mongoose,
  connectDatabase,
  isDatabaseConnected,
  getDatabaseMode
};
