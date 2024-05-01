import { default as Joi } from "joi";

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  LOGGER_LEVEL: Joi.string().required(),
  DEBUG_PORT: Joi.number().required(),
  URL_HOST: Joi.string().required(),
  VERSION: Joi.string().required(),
  GLOBAL_PREFIX: Joi.string().required(),
  MONGO_URI: Joi.string().required(),
  MONGO_USERNAME: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
  MONGO_PORT: Joi.number().required(),
  MONGO_DATABASE_NAME: Joi.string().required(),
  MONGO_CONNECTION_ATTEMPTS: Joi.string().required(),
  MONGO_CONNECTION_TIMEOUT: Joi.string().required(),
});
