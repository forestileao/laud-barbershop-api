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
    const { id, name, email } = await this.usersService.createCustomer(input);

    return { id, name, email };
  }

  @Post('/barber')
  async createBarber(@Body() input: CreateBarberInput) {
    const { id, name, email } = await this.usersService.createBarber(input);

    return { id, name, email };
  }

  @Post('/shopOwner')
  async createShopOwner(@Body() input: CreateShopOwnerInput) {
    return await this.usersService.createShopOwner(input);
  }
}
