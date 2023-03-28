import { CreateBarberShopInput } from 'src/modules/barberShops/dtos';

interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

export type CreateCustomerInput = CreateUserInput;

export interface CreateBarberInput extends CreateUserInput {
  workingBarberShopId: string;
}

export interface CreateShopOwnerInput extends CreateUserInput {
  barberShop: CreateBarberShopInput;
}
