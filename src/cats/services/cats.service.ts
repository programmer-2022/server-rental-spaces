import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateCatDto } from "../dto/create-cat.dto";
import { UpdateCatDto } from "../dto/update-cat.dto";
import { Cat, CatDocument } from "../schemas/cat.schema";
import { ICatsService } from "./cats.service.abstract";

@Injectable()
export class CatsService implements ICatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    const cat = await this.catModel.findById(id).exec();
    if (!cat) {
      throw new NotFoundException("Cat not found");
    }
    return cat;
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const existingCat = await this.catModel.findByIdAndUpdate(id, updateCatDto, { new: true }).exec();
    if (!existingCat) {
      throw new NotFoundException("Cat not found");
    }
    return existingCat;
  }

  async remove(id: string): Promise<{ deletedCount: number; id: string }> {
    const result = await this.catModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      return { deletedCount: 0, id };
    }
    return { deletedCount: result.deletedCount, id };
  }
}
