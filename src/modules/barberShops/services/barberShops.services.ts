import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateBarberShopInput } from '../dtos';
import { BarberShopRepository, ReportRepository } from '../repositories';
import { UserRepository } from 'src/modules/users/repositories';
import { AppointmentsRepository } from 'src/modules/appointments/repositories';

@Injectable()
export class BarberShopService {
  constructor(
    private readonly barberShopRepository: BarberShopRepository,
    private readonly reportRepository: ReportRepository,
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getAllReportsByOwner(ownerId: string) {
    const barberShop = await this.barberShopRepository.findOne({
      ownerId,
    });

    if (!barberShop) throw new NotFoundException('Invalid Barber Shop!');

    return await this.reportRepository.getAllByShop(barberShop.id);
  }

  async generateReport(ownerId: string, from: Date, to: Date) {
    const barberShop = await this.barberShopRepository.findOne({
      ownerId,
    });

    if (!barberShop) throw new NotFoundException('Invalid Barber Shop!');

    const totalReports = await this.appointmentsRepository.count({
      AND: [
        { createdAt: { gte: from } },
        { createdAt: { lte: to } }
      ]
    })

    return await this.reportRepository.create({
      from,
      to,
      totalReports,
      barberShop: {
        connect: {
          id: barberShop.id
        }
      }
    });
  }

  async create(owner: User, input: CreateBarberShopInput) {
    return await this.barberShopRepository.create({
      name: input.name,
      owner: {
        connect: { id: owner.id },
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
