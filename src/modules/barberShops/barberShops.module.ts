import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { BarberShopRepository } from './repositories';
import { BarberShopService } from './services';
import { BarberShopController } from './controllers/barbershops.controllers';

@Module({
  controllers: [BarberShopController],
  imports: [PrismaModule],
  providers: [BarberShopRepository, BarberShopService],
})
export class BarberShopModule {}
