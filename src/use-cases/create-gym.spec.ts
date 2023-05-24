import { describe, it, expect, beforeEach } from 'vitest';
import { Decimal } from '@prisma/client/runtime/library';
import { InMemoryGymRepository } from '@/repositories/in-memory-gym-repository';
import { CreateGymUseCase } from './create-gym-use-case';

let gymRepository: InMemoryGymRepository;
let createGymUseCase: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    createGymUseCase = new CreateGymUseCase(gymRepository);
  });

  it('should be able to create gym', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -3.0211984,
      longitude: -59.94651,
    });

    expect(gym).toEqual(
      expect.objectContaining({
        title: 'Typescript Gym',
        description: null,
        phone: null,
        latitude: new Decimal(-3.0211984),
        longitude: new Decimal(-59.94651),
      }),
    );
  });
});
