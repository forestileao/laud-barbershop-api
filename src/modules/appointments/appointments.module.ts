import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';

@Module({
  imports: [PrismaModule],
  providers: [],
  controllers: [],
})
export class AppointmentsModule {}
