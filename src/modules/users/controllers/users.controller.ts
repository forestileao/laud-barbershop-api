import { Body, Controller, Post } from "@nestjs/common";
import { CreateCustomerInput } from "../dtos";
import { UserService } from "../services";

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @Post('/customer')
  async createCustomer(@Body() input: CreateCustomerInput) {
    const { id, name, email } = await this.usersService.createCustomer(input);

    return { id, name, email };
  }
}
