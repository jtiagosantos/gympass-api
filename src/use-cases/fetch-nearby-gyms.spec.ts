import { describe, it, expect, beforeEach } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms-use-case';
import { InMemoryGymRepository } from '@/repositories/in-memory-gym-repository';

let gymRepository: InMemoryGymRepository;
let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository();
    fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -3.0211984,
      longitude: -59.94651,
    });

    await gymRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -1.1716556,
      longitude: -58.5651723,
    });

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: -3.0211984,
      userLongitude: -59.94651,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
  });
});
