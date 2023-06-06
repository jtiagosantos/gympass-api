import { z } from 'zod';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import type { FastifyRequest, FastifyReply } from 'fastify';

export class RegisterController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const registerUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = registerUserBodySchema.parse(request.body);

    try {
      const registerUseCase = makeRegisterUseCase();

      await registerUseCase.execute({ name, email, password });
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ error: error.message });
      }

      throw error;
    }

    reply.status(201).send();
  }
}
