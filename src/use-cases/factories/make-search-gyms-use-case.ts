import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository';
import { SearchGymsUseCase } from '../search-gyms-use-case';

export function makeSearchGymsUseCase() {
  const gymRepository = new PrismaGymRepository();
  const searchGymsUseCase = new SearchGymsUseCase(gymRepository);

  return searchGymsUseCase;
}
