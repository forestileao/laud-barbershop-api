import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { PrismaModule } from '../prisma';
import { UserRepository } from './repositories';
import { UserService } from './services';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule { }
