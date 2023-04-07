import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { PrismaModule } from '../prisma';
import { UserRepository } from './repositories';
import { UserService } from './services';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.services';

@Module({
  imports: [PrismaModule],
  controllers: [UserController, AuthController],
  providers: [UserService, UserRepository, AuthService],
})
export class UserModule {}
