import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BarberShopRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getSimple(input: Prisma.BarberShopWhereInput = undefined) {
    return this.prismaService.barberShop.findMany({
      where: input,
      select: {
        id: true,
        name: true,
      },
    });
  }

  async exists(input: Prisma.BarberShopWhereInput) {
    return (
      (await this.prismaService.barberShop.count({
        where: input,
      })) > 0
    );
  }

  findOne(input: Prisma.BarberShopWhereUniqueInput) {
    return this.prismaService.barberShop.findUnique({
      where: input,
    });
  }

  create(input: Prisma.BarberShopCreateInput) {
    return this.prismaService.barberShop.create({
      data: input,
    });
  }

  update(input: Prisma.BarberShopUpdateInput, id: string) {
    return this.prismaService.barberShop.update({
      data: input,
      where: {
        id,
      },
    });
  }

  delete(input: Prisma.BarberShopWhereUniqueInput) {
    return this.prismaService.barberShop.delete({
      where: input,
    });
  }
}
