import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateBarberShopInput } from '../dtos';
import { BarberShopRepository } from '../repositories';
import { UserRepository } from 'src/modules/users/repositories';

@Injectable()
export class BarberShopService {
  constructor(
    private readonly barberShopRepository: BarberShopRepository,
    private readonly userRepository: UserRepository,
  ) {}

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
    const barberShops = await this.barberShopRepository.getSimple();
    const promises = [];
    for (let barberShop of barberShops)
      promises.push(
        this.userRepository.find({ workingbarberShopId: barberShop.id }),
      );
    const barbers = (await Promise.all(promises)).flat();
    return barberShops.map((bs) => {
      const workers = barbers.filter((b) => b.workingbarberShopId === bs.id);
      return {
        ...bs,
        barbers: workers.map((b) => ({
          id: b.id,
          name: `${b.firstName} ${b.lastName}`,
        })),
      };
    });
  }

  async getBarberShop(id: string) {
    const barberShop = await this.barberShopRepository.findOne({ id });
    const barbers = await this.userRepository.find({ workingbarberShopId: id });
    return {
      ...barberShop,
      barbers: barbers.map((b) => ({
        id: b.id,
        name: `${b.firstName} ${b.lastName}`,
      })),
    };
  }
}
