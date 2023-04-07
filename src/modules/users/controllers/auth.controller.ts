import { Body, Controller, Post } from '@nestjs/common';
import { SignInInput, SignUpInput } from '../dtos/auth.dtos';
import { AuthService } from '../services/auth.services';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  async signIn(@Body() input: SignInInput) {
    return await this.authService.signIn(input);
  }

  @Post('/signUp')
  async signUp(@Body() input: SignUpInput) {
    return await this.authService.signUp(input);
  }
}
