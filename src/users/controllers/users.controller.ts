import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../schemas/user.schema";
import { IUsersService } from "../services/users.service.abstract";

@ApiTags("Users")
@Controller("Users")
export class UsersController {
  constructor(private readonly usersService: IUsersService) {}

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "List of users", type: User, isArray: true })
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Get a User by ID" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, description: "The found user", type: User })
  @ApiResponse({ status: 404, description: "User not found" })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @ApiOperation({ summary: "Create a user" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: "The created user", type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Update a user by ID" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: "The updated User", type: User })
  @ApiResponse({ status: 404, description: "User not found" })
  @Put(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "Delete a user by ID" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    await this.usersService.remove(id);
  }
}
