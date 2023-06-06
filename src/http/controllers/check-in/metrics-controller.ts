import type { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case';

export class MetricsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getUserMetricsUseCase = makeGetUserMetricsUseCase();

    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: request.user.sub,
    });

    reply.status(200).send({ checkInsCount });
  }
}
