import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarberShopModule } from './modules/barberShops';
import { PrismaModule } from './modules/prisma';
import { UserModule } from './modules/users/users.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';

@Module({
  imports: [PrismaModule, UserModule, BarberShopModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
