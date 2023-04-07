import { Role } from '@prisma/client';

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: Role;
}
