import { hash } from 'bcryptjs';
import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from '@/repositories/in-memory-user-repository';
import { GetUserProfileUseCase } from './get-user-profile-use-case';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let userRepository: InMemoryUserRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(userRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await getUserProfileUseCase.execute({ userId: createdUser.id });

    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash: user.password_hash,
      }),
    );
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({ userId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
