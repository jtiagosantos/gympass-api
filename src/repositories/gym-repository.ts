import { Gym, Prisma } from '@prisma/client';

export interface GymRepository {
  findById: (id: string) => Promise<Gym | null>;
  create: (input: Prisma.GymCreateInput) => Promise<Gym>;
  searchMany: (query: string, page: number) => Promise<Gym[]>;
}
