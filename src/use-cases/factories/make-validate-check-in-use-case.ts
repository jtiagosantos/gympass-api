import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository';
import { ValidateCheckInUseCase } from '../validate-check-in-use-case';

export function makeValidateCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository();
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository);

  return validateCheckInUseCase;
}
