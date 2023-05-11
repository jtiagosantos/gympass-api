import { z } from 'zod';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { RegisterUseCase } from '@/use-cases/register-use-cases';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';

export class RegisterController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const registerUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = registerUserBodySchema.parse(request.body);

    try {
      const userRepository = new PrismaUserRepository();
      const registerUseCase = new RegisterUseCase(userRepository);

      await registerUseCase.execute({ name, email, password });
    } catch (error) {
      return reply.status(409).send();
    }

    reply.status(201).send();
  }
}
