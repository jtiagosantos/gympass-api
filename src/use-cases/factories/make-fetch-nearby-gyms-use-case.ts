import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository';
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms-use-case';

export function makeFetchNearbyGymsUseCase() {
  const gymRepository = new PrismaGymRepository();
  const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymRepository);

  return fetchNearbyGymsUseCase;
}
