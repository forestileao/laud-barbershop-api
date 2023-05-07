import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { validate } from 'src/modules/shared/validations/validate';
import {
  CreateBarberInput,
  CreateCustomerInput,
  CreateShopOwnerInput,
} from '../dtos';
import { UserRepository } from '../repositories';
import { zodCreateCustomerInput } from '../validations';
import { hash } from 'argon2';
import { BarberShopService } from 'src/modules/barberShops/services/barberShops.services';
import { BarberShopRepository } from 'src/modules/barberShops/repositories';

type UserInput = CreateBarberInput | CreateCustomerInput;

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly barberShopRepository: BarberShopRepository,
    private readonly barberShopService: BarberShopService,
  ) {}

  async createCustomer(input: CreateCustomerInput) {
    return await this.createUser(input, 'CUSTOMER');
  }

  async createBarber(input: CreateBarberInput) {
    const shopExists =
      input?.workingBarberShopId.length === 36
        ? !!(await this.barberShopRepository.findOne({
            id: input.workingBarberShopId,
          }))
        : false;

    if (!shopExists) throw new NotFoundException('Barber shop not found!');
    return await this.createUser(input, 'BARBER');
  }

  async createShopOwner(input: CreateShopOwnerInput) {
    const owner = await this.createUser(
      {
        email: input.email,
        firstName: input.firstName,
        password: input.password,
        lastName: input.lastName,
        birthdate: new Date(input.birthdate),
      },
      'SHOP_OWNER',
    );
    const barberShop = await this.barberShopService.create(
      owner,
      input.barberShop,
    );

    return {
      ...owner,
      barberShop: {
        id: barberShop.id,
        name: barberShop.name,
      },
    };
  }

  private async createUser(input: UserInput, role: Role) {
    const exists = !!(await this.userRepository.findOne({
      email: input.email,
    }));

    if (exists) throw new ConflictException('Email already registered!');

    input.birthdate = new Date(input.birthdate);

    await validate(input, zodCreateCustomerInput);

    const password = await hash(input.password);
    const workingBarberShopId = (input as CreateBarberInput)
      .workingBarberShopId;
    delete (input as CreateBarberInput).workingBarberShopId;
    const params: Prisma.UserCreateInput = {
      ...input,
      password,
    };

    if (role === 'BARBER') {
      params.workingBarberShop = {
        connect: {
          id: workingBarberShopId,
        },
      };
    }

    const user = await this.userRepository.create({ ...params, role });

    return user;
  }
}
