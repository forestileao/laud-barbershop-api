import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { BarberShopRepository, ReportRepository } from './repositories';
import { BarberShopService } from './services';
import { BarberShopController } from './controllers/barbershops.controllers';
import { UserRepository } from '../users/repositories';
import { AppointmentsRepository } from '../appointments/repositories';

@Module({
  controllers: [BarberShopController],
  imports: [PrismaModule],
  providers: [UserRepository, ReportRepository, BarberShopRepository, AppointmentsRepository, BarberShopService],
})
export class BarberShopModule {}
