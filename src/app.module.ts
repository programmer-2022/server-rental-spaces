import { Module } from "@nestjs/common";

import { LoggerModule } from "@shared/logger/logger.module";

import { DatabaseModule } from "./database/database.module";
import { HealthModule } from "./health/health.module";
import { ConfigCustomModule } from "./shared/config";
import { UserModule } from "./users/users.module";

@Module({
  imports: [ConfigCustomModule, LoggerModule, HealthModule, UserModule, DatabaseModule],
})
export class AppModule {}
