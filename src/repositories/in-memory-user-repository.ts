import { randomUUID } from 'node:crypto';
import { Prisma, User, Role } from '@prisma/client';
import { UserRepository } from './user-repository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      role: 'MEMBER' as Role,
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);

    return user ?? null;
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);

    return user ?? null;
  }
}
