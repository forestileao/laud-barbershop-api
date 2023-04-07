import { BadRequestException, Injectable } from '@nestjs/common';
import { verify } from 'argon2';

import { SignInInput, SignUpInput } from '../dtos/auth.dtos';
import { UserRepository } from '../repositories';
import { UserService } from './users.services';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  async signIn(input: SignInInput) {
    const user = await this.userRepository.findOne({ email: input.email });

    if (!user || !(await verify(user.password, input.password)))
      throw new BadRequestException('Email or password wrong!');

    return user;
  }

  async signUp(input: SignUpInput) {
    return await this.userService.createUser(input, input.role);
  }
}
