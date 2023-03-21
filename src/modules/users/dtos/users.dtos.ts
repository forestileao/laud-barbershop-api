export interface CreateCustomerInput {
  email: string;
  name: string;
  password: string;
}

export interface CreateBarberInput extends CreateCustomerInput {
  workingBarberShopId: string;
}
