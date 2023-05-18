import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { AuthenticateUseCase } from '../authenticate-use-case';

export const makeAuthenticateUseCase = () => {
  const userRepository = new PrismaUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);

  return authenticateUseCase;
};
