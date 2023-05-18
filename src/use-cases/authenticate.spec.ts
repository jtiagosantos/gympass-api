import { hash } from 'bcryptjs';
import { describe, it, expect } from 'vitest';
import { InMemoryUserRepository } from '@/repositories/in-memory-user-repository';
import { AuthenticateUseCase } from './authenticate-use-case';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const userRepository = new InMemoryUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(userRepository);

    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash: user.password_hash,
      }),
    );
  });

  it('should not be able to authenticate with wrong email', async () => {
    const userRepository = new InMemoryUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(userRepository);

    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const userRepository = new InMemoryUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(userRepository);

    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: 'foo',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
