import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import type { UserRepository } from '@/repositories/user-repository';
import type { User } from '@prisma/client';

interface RegisterUseCaseInput {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseInput): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithTheSameEmail = await this.userRepository.findByEmail(email);

    if (userWithTheSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
