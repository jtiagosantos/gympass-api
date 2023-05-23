import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Decimal } from '@prisma/client/runtime/library';
import { CheckInUseCase } from './check-in-use-case';
import { InMemoryCheckInRepository } from '@/repositories/in-memory-check-in-repository';
import { InMemoryGymRepository } from '@/repositories/in-memory-gym-repository';

let userRepository: InMemoryCheckInRepository;
let gymRepository: InMemoryGymRepository;
let checkInUseCase: CheckInUseCase;

describe('CheckIn Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryCheckInRepository();
    gymRepository = new InMemoryGymRepository();
    checkInUseCase = new CheckInUseCase(userRepository, gymRepository);

    gymRepository.gyms.push({
      id: 'gym-01',
      title: 'Typescript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-3.0211984),
      longitude: new Decimal(-59.94651),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -3.0211984,
      userLongitude: -59.94651,
    });

    expect(checkIn).toEqual(
      expect.objectContaining({
        user_id: 'user-01',
        gym_id: 'gym-01',
      }),
    );
  });

  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 9, 0, 0));

    await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -3.0211984,
      userLongitude: -59.94651,
    });

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -3.0211984,
        userLongitude: -59.94651,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but on different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 9, 0, 0));
    await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -3.0211984,
      userLongitude: -59.94651,
    });

    vi.setSystemTime(new Date(2022, 0, 22, 9, 0, 0));
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -3.0211984,
      userLongitude: -59.94651,
    });

    expect(checkIn).toEqual(
      expect.objectContaining({
        user_id: 'user-01',
        gym_id: 'gym-01',
      }),
    );
  });

  it('should not be able to check in on distant gym', async () => {
    gymRepository.gyms.push({
      id: 'gym-02',
      title: 'Typescript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-3.0306691),
      longitude: new Decimal(-59.9605289),
    });

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -3.0211984,
        userLongitude: -59.94651,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
