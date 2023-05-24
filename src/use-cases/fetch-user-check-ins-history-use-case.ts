import { CheckIn } from '@prisma/client';
import { CheckInRepository } from '@/repositories/check-in-repository';

interface FetchUserCheckInsHistoryUseCaseInput {
  userId: string;
  page: number;
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseInput): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page);

    return { checkIns };
  }
}
