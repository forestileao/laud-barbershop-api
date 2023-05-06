import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { BarberShopRepository } from './repositories';
import { BarberShopService } from './services';
import { BarberShopController } from './controllers/barbershops.controllers';
import { UserRepository } from '../users/repositories';

@Module({
  controllers: [BarberShopController],
  imports: [PrismaModule],
  providers: [UserRepository, BarberShopRepository, BarberShopService],
})
export class BarberShopModule {}
