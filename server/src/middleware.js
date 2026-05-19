const jwt = require('jsonwebtoken');
const { config } = require('./config');

function asyncHandler(handler) {
  return function wrappedHandler(req, res, next) {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    return next(createHttpError(401, 'Missing or invalid authorization header.'));
  }

  try {
    req.user = jwt.verify(authHeader.slice(7), config.jwtSecret);
    return next();
  } catch (error) {
    return next(createHttpError(401, 'Token is invalid or expired.'));
  }
}

function notFound(req, res) {
  res.status(404).json({ message: 'Route not found.' });
}

function errorHandler(error, req, res, next) {
  const status = error.status || 500;
  const message = error.message || 'Internal server error.';

  if (status >= 500) {
    console.error('[error]', error);
  }

  res.status(status).json({ message });
}

module.exports = {
  asyncHandler,
  createHttpError,
  authenticate,
  notFound,
  errorHandler
};
