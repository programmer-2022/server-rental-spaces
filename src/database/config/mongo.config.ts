import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

import { EnvMap } from "@shared/config";

@Injectable()
export class MongooseModuleConfig implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const { MONGO_URI, MONGO_DATABASE_NAME, MONGO_CONNECTION_ATTEMPTS, MONGO_CONNECTION_TIMEOUT } = EnvMap;
    const uri = this.configService.get<string>(MONGO_URI);
    const databaseName = this.configService.get<string>(MONGO_DATABASE_NAME);
    const retryAttempts = this.configService.get<number>(MONGO_CONNECTION_ATTEMPTS);
    const connectTimeoutMS = this.configService.get<number>(MONGO_CONNECTION_TIMEOUT);
    Logger.log(`Connecting to the database: ${uri}`);
    return {
      uri,
      dbName: databaseName,
      retryAttempts,
      connectTimeoutMS,
    };
  }
}
