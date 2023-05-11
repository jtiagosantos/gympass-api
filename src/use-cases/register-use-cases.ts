import { hash } from 'bcryptjs';
import type { UserRepository } from '@/repositories/user-repository';

interface RegisterUseCaseInput {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: RegisterUseCaseInput) {
    const password_hash = await hash(password, 6);

    const userWithTheSameEmail = await this.userRepository.findByEmail(email);

    if (userWithTheSameEmail) {
      throw new Error('E-mail already exists');
    }

    await this.userRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
