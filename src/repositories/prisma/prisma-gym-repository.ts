import { Gym, Prisma } from '@prisma/client';
import { prisma } from '@/libs/prisma';
import type { FindManyNearbyInput, GymRepository } from '../gym-repository';

export class PrismaGymRepository implements GymRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }
  async create(input: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data: {
        ...input,
      },
    });

    return gym;
  }
  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return gyms;
  }
  async findManyNearby({ latitude, longitude }: FindManyNearbyInput) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) 
      - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }
}
