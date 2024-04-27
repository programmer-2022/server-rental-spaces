/* eslint-disable prettier/prettier */
export interface EnvConfig {
  environment?: string;
  port: number;
  loggerLevel?: string;
  debugPort?: number;
  urlHost?: string;
  version?: string;
  globalPrefix?: string;
  mongo: {
    username?: string;
    password?: string;
    port?: number;
    databaseName?: string;
  };
}

export default (): EnvConfig => ({
  environment: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 8000,
  loggerLevel: process.env.LOGGER_LEVEL || "log",
  debugPort: Number(process.env.DEBUG_PORT) || 9229,
  urlHost: process.env.URL_HOST || "localhost",
  version: process.env.VERSION || "v1.0",
  globalPrefix: process.env.GLOBAL_PREFIX || "api",
  mongo: {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    port: Number(process.env.MONGO_PORT) || 27_017,
    databaseName: process.env.MONGO_DATABASE_NAME,
  },
});
