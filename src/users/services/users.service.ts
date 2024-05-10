import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User, UserDocument } from "../schemas/user.schema";
import { IUsersService } from "./users.service.abstract";

@Injectable()
export class UsersService implements IUsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!existingUser) {
      throw new NotFoundException("User not found");
    }
    return existingUser;
  }

  async remove(id: string): Promise<{ deletedCount: number; id: string }> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      return { deletedCount: 0, id };
    }
    return { deletedCount: result.deletedCount, id };
  }
}
