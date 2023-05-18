import { z } from 'zod';
import { AuthenticateUseCase } from '@/use-cases/authenticate-use-case';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import type { FastifyRequest, FastifyReply } from 'fastify';

export class AuthenticateController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
      const userRepository = new PrismaUserRepository();
      const authenticateUseCase = new AuthenticateUseCase(userRepository);

      await authenticateUseCase.execute({ email, password });
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(400).send({ error: error.message });
      }

      throw error;
    }

    reply.status(200).send();
  }
}
