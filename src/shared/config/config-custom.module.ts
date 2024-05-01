import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { default as Configuration } from "./env-configuration";
import { validationSchema } from "./env-validation-schema";
import { Environments } from "./environments";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      envFilePath: process.env.NODE_ENV === Environments.PRODUCTION ? ".env" : ".env.development",
      validationSchema,
      isGlobal: true,
      cache: true,
    }),
  ],
})
export class ConfigCustomModule {}
