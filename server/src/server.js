const app = require('./app');
const { config, connectDatabase, getDatabaseMode } = require('./config');

async function bootstrap() {
  await connectDatabase();

  app.listen(config.port, () => {
    console.log(
      `[server] listening on http://localhost:${config.port} (${getDatabaseMode()} mode)`
    );
  });
}

bootstrap();
