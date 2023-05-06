import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SignInInput } from '../dtos/auth.dtos';
import { UserRepository } from '../repositories';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(input: SignInInput) {
    if (!input.email) throw new BadRequestException('Invalid email!');

    const user = await this.userRepository.findOne({
      email: input.email,
    });

    if (!user) throw new UnauthorizedException('Wrong email/password.');

    const validPassword = await verify(user.password, input.password);

    if (!validPassword)
      throw new UnauthorizedException('Wrong email/password.');

    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload, {
      secret: process.env.SECRET || '',
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    };
  }
}
