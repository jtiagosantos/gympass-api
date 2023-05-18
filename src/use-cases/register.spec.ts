import { describe, it, expect, beforeEach } from 'vitest';
import { compare } from 'bcryptjs';
import { RegisterUseCase } from './register-use-case';
import { InMemoryUserRepository } from '@/repositories/in-memory-user-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let userRepository: InMemoryUserRepository;
let registerUseCase: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    registerUseCase = new RegisterUseCase(userRepository);
  });

  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
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

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com';

    await registerUseCase.execute({
      name: 'John Doe',
      email: email,
      password: '123456',
    });

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email: email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
