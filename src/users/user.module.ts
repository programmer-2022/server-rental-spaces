import { Module } from "@nestjs/common";

import { UserController } from "./application/controllers/user.controller";

@Module({
  controllers: [UserController],
})
export class UserModule {}