export interface CreateCustomerInput {
  email: string;
  age: number;
  firstName: string;
  lastName: string;
  password: string;
}

export interface CreateBarberInput extends CreateCustomerInput {
  workingBarberShopId: string;
}
