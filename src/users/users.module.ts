import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersController } from "./controllers/users.controller";
import { userModelDefinition } from "./schemas/user.schema";
import { UsersService } from "./services/users.service";
import { IUsersService } from "./services/users.service.abstract";

@Module({
  imports: [MongooseModule.forFeature([userModelDefinition])],
  controllers: [UsersController],
  providers: [
    {
      provide: IUsersService,
      useClass: UsersService,
    },
  ],
  exports: [IUsersService],
})
export class UserModule {}
