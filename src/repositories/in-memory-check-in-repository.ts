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

  async findManyByUserId(userId: string, page: number) {
    const MAX_ITEMS_PER_PAGE = 20;
    const start = (page - 1) * MAX_ITEMS_PER_PAGE;
    const end = start + MAX_ITEMS_PER_PAGE;

    const checkIns = this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice(start, end);

    return checkIns;
  }

  async countByUserId(userId: string) {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).length;
  }

  async findById(id: string) {
    const checkIn = this.checkIns.find((checkIn) => checkIn.id === id);

    if (!checkIn) {
      return null;
    }

    return { ...checkIn };
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(
      (checkIn) => checkIn.id === checkIn.id,
    );

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn;
    }

    return checkIn;
  }
}
