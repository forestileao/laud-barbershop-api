import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppointmentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findOne(input: Prisma.AppointmentWhereUniqueInput) {
    return this.prismaService.appointment.findUnique({
      where: input,
    });
  }

  find(input: Prisma.AppointmentWhereInput) {}

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
