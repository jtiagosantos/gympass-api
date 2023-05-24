import { describe, it, expect, beforeEach } from 'vitest';
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history-use-case';
import { InMemoryCheckInRepository } from '@/repositories/in-memory-check-in-repository';

let checkInRepository: InMemoryCheckInRepository;
let fetchUserCheckInsHistoryUseCase: FetchUserCheckInsHistoryUseCase;

describe('Fetch User CheckIns History Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
      checkInRepository,
    );
  });

  it('should be able to fetch check-ins history', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    });

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
      userId: 'user-01',
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ]);
  });

  it('should be able to fetch paginated check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-${String(i).padStart(2, '0')}`,
        user_id: 'user-01',
      });
    }

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
      userId: 'user-01',
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ]);
  });
});
