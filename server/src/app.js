const express = require('express');
const cors = require('cors');
const { config } = require('./config');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const postRoutes = require('./routes/posts');
const experienceRoutes = require('./routes/experiences');
const healthRoutes = require('./routes/health');
const { notFound, errorHandler } = require('./middleware');

const app = express();

const corsOptions =
  config.clientOrigin === '*'
    ? { origin: true, credentials: true }
    : { origin: config.clientOrigin, credentials: true };

app.use(cors(corsOptions));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'MyBlog server is running.',
    docsHint: 'See API_PORT_DOC.md in the server root directory.'
  });
});

app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/experiences', experienceRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
