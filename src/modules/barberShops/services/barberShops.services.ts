import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateBarberShopInput } from '../dtos';
import { BarberShopRepository } from '../repositories';

@Injectable()
export class BarberShopService {
  constructor(private readonly barberShopRepository: BarberShopRepository) {}

  async create(owner: User, input: CreateBarberShopInput) {
    return await this.barberShopRepository.create({
      name: input.name,
      owner: {
        connect: {
          id: owner.id,
        },
      },
    });
  }

  async listSimple() {
    return await this.barberShopRepository.getSimple();
  }
}
