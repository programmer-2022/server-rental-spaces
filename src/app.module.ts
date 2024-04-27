import { Module } from "@nestjs/common";

import { LoggerModule } from "@shared/logger/logger.module";

import { ConfigCustomModule } from "./config";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [ConfigCustomModule, LoggerModule, HealthModule],
})
export class AppModule {}
