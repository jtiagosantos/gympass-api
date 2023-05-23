import { randomUUID } from 'node:crypto';
import { CheckIn, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { CheckInRepository } from './check-in-repository';

export class InMemoryCheckInRepository implements CheckInRepository {
  public checkIns: CheckIn[] = [];

  async create(input: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: input.user_id,
      gym_id: input.gym_id,
      validated_at: input.validated_at ? new Date(input.validated_at) : null,
      created_at: new Date(),
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate = dayjs(date).isSame(checkInDate, 'day');

      return checkIn.user_id === userId && isOnSameDate;
    });

    return checkInOnSameDate ?? null;
  }
}
