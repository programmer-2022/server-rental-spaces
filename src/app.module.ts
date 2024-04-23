import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

//import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerModule } from "@shared/logger/logger.module";

import { HealthModule } from "./health/health.module";
import { UserModule } from "./users/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      cache: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: "mongodb",
    //   host: "localhost",
    //   port: 27_017,
    //   username: "admin",
    //   password: "pass",
    //   database: "rental_spaces_db",
    //   entities: [],
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    LoggerModule,
    HealthModule,
    UserModule,
  ],
})
export class AppModule {}
