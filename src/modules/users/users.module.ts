import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { PrismaModule } from '../prisma';
import { UserRepository } from './repositories';
import { UserService } from './services';
import { BarberShopModule } from '../barberShops';
import { BarberShopRepository } from '../barberShops/repositories';
import { BarberShopService } from '../barberShops/services';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './services/auth.services';
import { AuthController } from './controllers/auth.controllers';

@Module({
  imports: [PrismaModule, BarberShopModule, JwtModule.register({
    secret: process.env.SECRET,
    signOptions: { expiresIn: '3600s' },
    global: true,
  })
],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    UserRepository,
    BarberShopRepository,
    BarberShopService,
    JwtService,
    AuthService,
  ],
})
export class UserModule {}
