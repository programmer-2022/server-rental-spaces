import { Module } from "@nestjs/common";

import { LoggerModule } from "@shared/logger/logger.module";

import { CatsModule } from "./cats/cats.module";
import { DatabaseModule } from "./database/database.module";
import { HealthModule } from "./health/health.module";
import { ConfigCustomModule } from "./shared/config";

@Module({
  imports: [ConfigCustomModule, LoggerModule, HealthModule, CatsModule, DatabaseModule],
})
export class AppModule {}
