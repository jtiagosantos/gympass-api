import { z } from 'zod';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case';

export class SearchController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const searchGymsQuerySchema = z.object({
      query: z.string(),
      page: z.coerce.number().min(1).default(1),
    });

    const query = searchGymsQuerySchema.parse(request.query);

    const searchGymsUseCase = makeSearchGymsUseCase();

    const { gyms } = await searchGymsUseCase.execute(query);

    reply.status(200).send({ gyms });
  }
}
