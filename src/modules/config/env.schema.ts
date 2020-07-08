import * as Joi from '@hapi/joi';

export type EnvRunType = { [key: string]: any };

export const EnvSchema = Joi.object().keys({
  USE_DATABASE: Joi.boolean().default(true),
  REDIS_AUTH: Joi.string().required(),
  REDIS_DB: Joi.number().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_TTL: Joi.number().required(),
  COOKIE_AGE: Joi.number().optional(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_TYPE: Joi.string()
    .required()
    .valid('postgres', 'mysql'),
  DATABASE_USERNAME: Joi.string().required(),
  GLOBAL_PREFIX: Joi.string().default('').allow(''),
  JWT_EXPIRES_IN: Joi.number()
    .min(3600)
    .max(31536000)
    .default(3600),
  JWT_SECRET_KEY: Joi.string().default('temp-jwt_key'),
  LOG_LEVEL: Joi.string()
    .default('INFO')
    .valid('OFF', 'ALL', 'VERBOSE', 'DEBUG', 'LOG', 'WARN', 'ERROR', 'FATAL', 'INFO', 'FINE', 'SILLY'),
  NODE_ENV: Joi.string()
    .default('development')
    .valid('development', 'production', 'prod', 'dev'),
  PAGE_LIMIT: Joi.number()
    .min(5)
    .max(100)
    .default(10),
  PORT: Joi.number()
    .min(3000)
    .max(5000)
    .default(3000),
  RATE_LIMIT: Joi.number().default(1000),
  SESSION_SECRET: Joi.string().default('temp-sess1on_key'),
  USE_HTTPS: Joi.boolean().default(false),
  STATIC_FILE_USER: Joi.string().default(''),
  STATIC_FILE_GROUP: Joi.string().default(''),
  QRCODE_SIZE: Joi.number().default(320),
  WECHAT_APP_ID: Joi.string().required(),
  WECHAT_APP_SECRET: Joi.string().required(),
  WECHAT_MCH_ID: Joi.string().required(),
  WECHAT_PAY_API_KEY: Joi.string().required(),
  WECHAT_ACCESS_TOKEN_EXPIRES_IN: Joi.number().default(7200),
  RSMS_MGR_HOST: Joi.string().default(''),
  RSMS_MGR_ADDRESS: Joi.string().default(''),
  LOCAL_IP: Joi.string().default(''),
  GLOBAL_IP: Joi.string().default(''),
});
