import * as Joi from 'joi';
import { ENVIRONMENT } from '../configuration/enum/environment.enum';

export const envVarsSchema = Joi.object({
  server: Joi.object({
    port: Joi.number().port().required(),
    environment: Joi.string()
      .valid(
        ENVIRONMENT.PRODUCTION,
        ENVIRONMENT.STAGING,
        ENVIRONMENT.DEVELOPMENT,
      )
      .required(),
  }),
  database: Joi.object({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    database: Joi.string().required(),
  }),
  sentry: Joi.object({
    enabled: Joi.boolean().required().allow(true, false),
    dsn: Joi.string().required(),
  }),
}).unknown(true);
