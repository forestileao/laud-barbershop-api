import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { BarberShopRepository } from './repositories';
import { BarberShopService } from './services';

@Module({
  imports: [PrismaModule],
  providers: [BarberShopRepository, BarberShopService],
})
export class BarberShopModule {}
