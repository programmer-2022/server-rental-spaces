import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  age: number;

  @Prop()
  dni: string;

  @Prop()
  email: string;

  @Prop()
  status: boolean;

  @Prop()
  role: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
export const userModelDefinition: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
};
