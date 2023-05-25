import { describe, it, expect, beforeEach } from 'vitest';
import { GetUserMetricsUseCase } from './get-user-metrics-use-case';
import { InMemoryCheckInRepository } from '@/repositories/in-memory-check-in-repository';

let checkInRepository: InMemoryCheckInRepository;
let getUserMetricsUseCase: GetUserMetricsUseCase;

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepository);
  });

  it('should be able to get check-ins count from metrics', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    });

    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: 'user-01',
    });

    expect(checkInsCount).toBe(2);
  });
});
