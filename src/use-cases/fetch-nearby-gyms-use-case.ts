import type { GymRepository } from '@/repositories/gym-repository';
import type { Gym } from '@prisma/client';

interface FetchNearbyUseCaseInput {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyUseCaseInput): Promise<FetchNearbyUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
