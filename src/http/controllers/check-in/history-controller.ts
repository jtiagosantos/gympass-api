import { z } from 'zod';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case';

export class HistoryController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
      page: z.coerce.number().min(1).default(1),
    });

    const { page } = checkInHistoryQuerySchema.parse(request.query);

    const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
      page,
      userId: request.user.sub,
    });

    reply.status(200).send({ checkIns });
  }
}
