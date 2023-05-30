import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case';
import type { FastifyRequest, FastifyReply } from 'fastify';

export class ProfileController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getUserProfileUseCase = makeGetUserProfileUseCase();

    const { user } = await getUserProfileUseCase.execute({
      userId: request.user.sub,
    });

    return reply.status(200).send({
      ...user,
      password_hash: undefined,
    });
  }
}
