import { z } from 'zod';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';
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
      const authenticateUseCase = makeAuthenticateUseCase();

      const { user } = await authenticateUseCase.execute({ email, password });

      const token = await reply.jwtSign(
        {
          role: user.role,
        },
        {
          sign: {
            sub: user.id,
            expiresIn: '10m',
          },
        },
      );

      const refreshToken = await reply.jwtSign(
        {
          role: user.role,
        },
        {
          sign: {
            sub: user.id,
            expiresIn: '7d',
          },
        },
      );

      reply
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          sameSite: true,
          httpOnly: true,
        })
        .status(200)
        .send({ token });
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(400).send({ error: error.message });
      }

      throw error;
    }
  }
}