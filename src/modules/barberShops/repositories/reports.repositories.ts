import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getAllByShop(barberShopId: string) {
    return this.prismaService.report.findMany({
      where: {
        barberShopId,
      }
    })
  }

  async exists(input: Prisma.ReportWhereInput) {
    return (
      (await this.prismaService.report.count({
        where: input,
      })) > 0
    );
  }

  findOne(input: Prisma.ReportWhereUniqueInput) {
    return this.prismaService.report.findUnique({
      where: input,
    });
  }

  create(input: Prisma.ReportCreateInput) {
    return this.prismaService.report.create({
      data: input,
    });
  }

  update(input: Prisma.ReportUpdateInput, id: string) {
    return this.prismaService.report.update({
      data: input,
      where: {
        id,
      },
    });
  }

  delete(input: Prisma.ReportWhereUniqueInput) {
    return this.prismaService.report.delete({
      where: input,
    });
  }
}
