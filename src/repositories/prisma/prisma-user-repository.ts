import { prisma } from '@/libs/prisma';
import { Prisma } from '@prisma/client';
import type { UserRepository } from '../user-repository';

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
