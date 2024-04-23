import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";

import { User } from "@src/users/domain/entities/user.entity";
import { UserRepository } from "@src/users/domain/repositories/interfaces/user.repository.interface";

@Injectable()
export class TypeORMUserRepository implements UserRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async create(user: User): Promise<void> {
    await this.entityManager.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.entityManager.find(User);
  }
}
