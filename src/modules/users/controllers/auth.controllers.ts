import { Controller, Post } from '@nestjs/common';
import { SignInInput } from '../dtos/auth.dtos';
import { AuthService } from '../services';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  async signIn(input: SignInInput) {
    return this.authService.signIn(input);
  }
}
