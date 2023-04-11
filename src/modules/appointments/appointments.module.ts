import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { AppointmentController } from './controllers';
import { AppointmentsRepository } from './repositories';
import { AppointmentsService } from './services';
import { BarberShopRepository } from '../barberShops/repositories';
import { UserRepository } from '../users/repositories';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({
    secretOrPrivateKey: process.env.SECRET
  })],
  providers: [AppointmentsRepository, AppointmentsService, BarberShopRepository, UserRepository],
  controllers: [AppointmentController],
})
export class AppointmentsModule {}
