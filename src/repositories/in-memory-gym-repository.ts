import { Gym } from '@prisma/client';
import { GymRepository } from './gym-repository';

export class InMemoryGymRepository implements GymRepository {
  public gyms: Gym[] = [];

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id);

    return gym ?? null;
  }
}
