import { Prisma } from "@prisma/client";
import { PrismaService } from "src/modules/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) { }

  findOne(input: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({
      where: input
    });
  }

  create(input: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: input
    });
  }

  update(input: Prisma.UserUpdateInput, id: string) {
    return this.prismaService.user.update({
      data: input,
      where: {
        id
      }
    });
  }

  delete(input: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.delete({
      where: input
    });
  }
}
