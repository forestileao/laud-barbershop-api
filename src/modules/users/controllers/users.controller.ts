import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateBarberInput,
  CreateCustomerInput,
  CreateShopOwnerInput,
} from '../dtos';
import { UserService } from '../services';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('/customer')
  async createCustomer(@Body() input: CreateCustomerInput) {
    return await this.usersService.createCustomer(input);
  }

  @Post('/barber')
  async createBarber(@Body() input: CreateBarberInput) {
    return await this.usersService.createBarber(input);
  }

  @Post('/shopOwner')
  async createShopOwner(@Body() input: CreateShopOwnerInput) {
    return await this.usersService.createShopOwner(input);
  }
}
