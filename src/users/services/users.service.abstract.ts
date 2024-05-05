import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../schemas/user.schema";

export abstract class IUsersService {
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: string): Promise<User>;
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  abstract remove(id: string): Promise<{ deletedCount: number; id: string }>;
}
