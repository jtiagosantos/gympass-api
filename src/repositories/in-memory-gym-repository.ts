import { Gym, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { GymRepository } from './gym-repository';
import { randomUUID } from 'crypto';

export class InMemoryGymRepository implements GymRepository {
  public gyms: Gym[] = [];

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id);

    return gym ?? null;
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
