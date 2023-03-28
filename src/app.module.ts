import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarberShopModule } from './modules/barberShops';
import { PrismaModule } from './modules/prisma';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [PrismaModule, UserModule, BarberShopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
