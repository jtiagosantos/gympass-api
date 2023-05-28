import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository';
import { CreateGymUseCase } from '../create-gym-use-case';

export function makeCreateGymUseCase() {
  const gymRepository = new PrismaGymRepository();
  const createGymUseCase = new CreateGymUseCase(gymRepository);

  return createGymUseCase;
}
