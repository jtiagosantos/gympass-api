import { describe, it, expect, beforeEach } from 'vitest';
import { SearchGymsUseCase } from './search-gyms-use-case';
import { InMemoryGymRepository } from '@/repositories/in-memory-gym-repository';

let gymRepository: InMemoryGymRepository;
let searchGymsUseCase: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository();
    searchGymsUseCase = new SearchGymsUseCase(gymRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymRepository.create({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -3.0211984,
      longitude: -59.94651,
    });

    await gymRepository.create({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -3.0211984,
      longitude: -59.94651,
    });

    await gymRepository.create({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -3.0211984,
      longitude: -59.94651,
    });

    const { gyms } = await searchGymsUseCase.execute({
      query: 'Javascript Gym',
      page: 1,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym' }),
      expect.objectContaining({ title: 'Javascript Gym' }),
    ]);
  });

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Javascript Gym - ${String(i).padStart(2, '0')}`,
        description: null,
        phone: null,
        latitude: -3.0211984,
        longitude: -59.94651,
      });
    }

    const { gyms } = await searchGymsUseCase.execute({
      query: 'Javascript Gym',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym - 21' }),
      expect.objectContaining({ title: 'Javascript Gym - 22' }),
    ]);
  });
});
