import { hash } from 'bcryptjs';
import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from '@/repositories/in-memory-user-repository';
import { AuthenticateUseCase } from './authenticate-use-case';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let userRepository: InMemoryUserRepository;
let authenticateUseCase: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    authenticateUseCase = new AuthenticateUseCase(userRepository);
  });

  it('should be able to authenticate', async () => {
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
    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
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
