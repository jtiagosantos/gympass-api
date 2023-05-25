import { Gym, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { GymRepository } from './gym-repository';
import { randomUUID } from 'crypto';
import { getDistanceBetweenCoordinates } from '@/helpers/get-distance-between-coordinates';
import type { FindManyNearbyInput } from './gym-repository';

export class InMemoryGymRepository implements GymRepository {
  public gyms: Gym[] = [];

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id);

    return gym ?? null;
  }

  async searchMany(query: string, page: number) {
    const MAX_ITEMS_PER_PAGE = 20;
    const start = (page - 1) * MAX_ITEMS_PER_PAGE;
    const end = start + MAX_ITEMS_PER_PAGE;

    return this.gyms.filter((gym) => gym.title.includes(query)).slice(start, end);
  }

  async findManyNearby(input: FindManyNearbyInput) {
    return this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: input.latitude, longitude: input.longitude },
        { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() },
      );

      return distance < 10;
    });
  }

  async create(input: Prisma.GymCreateInput) {
    const gym = {
      id: input.id ?? randomUUID(),
      title: input.title,
      description: input.description ?? null,
      phone: input.phone ?? null,
      latitude: new Decimal(input.latitude.toString()),
      longitude: new Decimal(input.longitude.toString()),
      created_at: new Date(),
    };

    this.gyms.push(gym);

    return gym;
  }
}
