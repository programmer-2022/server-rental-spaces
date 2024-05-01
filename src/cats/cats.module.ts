import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CatsController } from "./controllers/cats.controller";
import { catModelDefinition } from "./schemas/cat.schema";
import { CatsService } from "./services/cats.service";
import { ICatsService } from "./services/cats.service.abstract";

@Module({
  imports: [MongooseModule.forFeature([catModelDefinition])],
  controllers: [CatsController],
  providers: [
    {
      provide: ICatsService,
      useClass: CatsService,
    },
  ],
  exports: [ICatsService],
})
export class CatsModule {}
