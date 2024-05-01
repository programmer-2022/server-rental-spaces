import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { MongooseModuleConfig } from "./config/mongo.config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseModuleConfig,
    }),
  ],
})
export class DatabaseModule {}
