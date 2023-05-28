import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository';
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository';
import { CheckInUseCase } from '../check-in-use-case';

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository();
  const gymRepository = new PrismaGymRepository();
  const checkInUseCase = new CheckInUseCase(checkInRepository, gymRepository);

  return checkInUseCase;
}
