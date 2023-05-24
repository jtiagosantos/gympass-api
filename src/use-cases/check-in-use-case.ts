import { CheckIn } from '@prisma/client';
import { CheckInRepository } from '@/repositories/check-in-repository';
import { GymRepository } from '@/repositories/gym-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { getDistanceBetweenCoordinates } from '@/helpers/get-distance-between-coordinates';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckIns } from './errors/max-number-of-check-ins-error';

interface CheckInUseCaseInput {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymRepository: GymRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseInput): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() },
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckIns();
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
