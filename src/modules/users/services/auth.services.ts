import { Injectable } from "@nestjs/common";
import { SignInInput } from "../dtos/auth.dtos";
import { UserRepository } from "../repositories";

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) { }

  signIn(input: SignInInput) {

  }
}
