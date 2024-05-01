import { CreateCatDto } from "../dto/create-cat.dto";
import { UpdateCatDto } from "../dto/update-cat.dto";
import { Cat } from "../schemas/cat.schema";

export abstract class ICatsService {
  abstract findAll(): Promise<Cat[]>;
  abstract findOne(id: string): Promise<Cat>;
  abstract create(createCatDto: CreateCatDto): Promise<Cat>;
  abstract update(id: string, updateCatDto: UpdateCatDto): Promise<Cat>;
  abstract remove(id: string): Promise<{ deletedCount: number; id: string }>;
}
