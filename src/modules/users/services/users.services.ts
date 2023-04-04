import { ConflictException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { validate } from 'src/modules/shared/validations/validate';
import { CreateBarberInput, CreateCustomerInput } from '../dtos';
import { UserRepository } from '../repositories';
import { zodCreateCustomerInput } from '../validations';
import { hash } from 'argon2';

type UserInput = CreateBarberInput | CreateCustomerInput;

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createCustomer(input: CreateCustomerInput) {
    return await this.createUser(input, 'CUSTOMER');
  }

  async createBarber(input: CreateBarberInput) {
    return await this.createUser(input, 'BARBER');
  }

  private async createUser(input: UserInput, role: Role) {
    const exists = !!(await this.userRepository.findOne({
      email: input.email,
    }));

    if (exists) throw new ConflictException('Email already registered!');

    await validate(input, zodCreateCustomerInput);

    const password = await hash(input.password);

    const user = await this.userRepository.create({
      ...input,
      password,
      role: role,
    });

    return user;
  }
}
