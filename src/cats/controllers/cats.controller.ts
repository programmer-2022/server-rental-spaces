import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateCatDto } from "../dto/create-cat.dto";
import { UpdateCatDto } from "../dto/update-cat.dto";
import { Cat } from "../schemas/cat.schema";
import { ICatsService } from "../services/cats.service.abstract";

@ApiTags("Cats")
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: ICatsService) {}

  @ApiOperation({ summary: "Get all cats" })
  @ApiResponse({ status: 200, description: "List of cats", type: Cat, isArray: true })
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @ApiOperation({ summary: "Get a cat by ID" })
  @ApiParam({ name: "id", description: "Cat ID" })
  @ApiResponse({ status: 200, description: "The found cat", type: Cat })
  @ApiResponse({ status: 404, description: "Cat not found" })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Cat> {
    const cat = await this.catsService.findOne(id);
    if (!cat) {
      throw new NotFoundException("Cat not found");
    }
    return cat;
  }

  @ApiOperation({ summary: "Create a cat" })
  @ApiBody({ type: CreateCatDto })
  @ApiResponse({ status: 201, description: "The created cat", type: Cat })
  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @ApiOperation({ summary: "Update a cat by ID" })
  @ApiParam({ name: "id", description: "Cat ID" })
  @ApiBody({ type: UpdateCatDto })
  @ApiResponse({ status: 200, description: "The updated cat", type: Cat })
  @ApiResponse({ status: 404, description: "Cat not found" })
  @Put(":id")
  async update(@Param("id") id: string, @Body() updateCatDto: UpdateCatDto): Promise<Cat> {
    return this.catsService.update(id, updateCatDto);
  }

  @ApiOperation({ summary: "Delete a cat by ID" })
  @ApiParam({ name: "id", description: "Cat ID" })
  @ApiResponse({ status: 200, description: "Cat deleted successfully" })
  @ApiResponse({ status: 404, description: "Cat not found" })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    await this.catsService.remove(id);
  }
}
