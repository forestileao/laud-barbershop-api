import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { PrismaModule } from '../prisma';
import { UserRepository } from './repositories';
import { UserService } from './services';
import { BarberShopModule } from '../barberShops';
import { BarberShopRepository } from '../barberShops/repositories';
import { BarberShopService } from '../barberShops/services';

@Module({
  imports: [PrismaModule, BarberShopModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    BarberShopRepository,
    BarberShopService,
  ],
})
export class UserModule {}
