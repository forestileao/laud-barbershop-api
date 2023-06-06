import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppointmentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  count(input: Prisma.AppointmentWhereInput) {
    return this.prismaService.appointment.count({
      where: input
    });
  }

  findOne(input: Prisma.AppointmentWhereUniqueInput) {
    return this.prismaService.appointment.findUnique({
      where: input,
    });
  }

  find(input: Prisma.AppointmentWhereInput) {
    return this.prismaService.appointment.findMany({
      where: input,
      include: {
        barber: true,
        barberShop: true,
        customer: true
      }
    });
  }

  create(input: Prisma.AppointmentCreateInput) {
    return this.prismaService.appointment.create({
      data: input,
    });
  }

  update(input: Prisma.AppointmentUpdateInput, id: string) {
    return this.prismaService.appointment.update({
      data: input,
      where: {
        id,
      },
    });
  }

  delete(input: Prisma.AppointmentWhereUniqueInput) {
    return this.prismaService.appointment.delete({
      where: input,
    });
  }
}
