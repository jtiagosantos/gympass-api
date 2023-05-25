import { Gym, Prisma } from '@prisma/client';

export interface FindManyNearbyInput {
  latitude: number;
  longitude: number;
}

export interface GymRepository {
  findById: (id: string) => Promise<Gym | null>;
  create: (input: Prisma.GymCreateInput) => Promise<Gym>;
  searchMany: (query: string, page: number) => Promise<Gym[]>;
  findManyNearby: (input: FindManyNearbyInput) => Promise<Gym[]>;
}
