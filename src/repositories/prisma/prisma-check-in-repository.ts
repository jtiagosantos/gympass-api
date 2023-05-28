import { Prisma, CheckIn } from '@prisma/client';
import { prisma } from '@/libs/prisma';
import dayjs from 'dayjs';
import type { CheckInRepository } from '../check-in-repository';

export class PrismaCheckInRepository implements CheckInRepository {
  async create(input: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data: {
        ...input,
      },
    });

    return checkIn;
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }
  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return checkIns;
  }
  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }
  async save(input: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: input.id,
      },
      data: {
        ...input,
      },
    });

    return checkIn;
  }
}
