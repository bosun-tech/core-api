import * as dotenv from 'dotenv';

dotenv.config();

export default () => ({
  server: {
    port: +process.env.PORT || 3000,
    nodeEnvironment: process.env.NODE_ENV,
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  sentry: {
    enabled: process.env.SENTRY_ENABLED === 'true',
    dsn: process.env.SENTRY_DSN,
  },
});
