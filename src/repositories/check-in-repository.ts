import { Prisma, CheckIn } from '@prisma/client';

export interface CheckInRepository {
  create: (input: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>;
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>;
}
