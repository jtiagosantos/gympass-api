import { compare } from 'bcryptjs';
import { UserRepository } from '@/repositories/user-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { User } from '@prisma/client';

interface AuthenticateUseCaseInput {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseInput): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
