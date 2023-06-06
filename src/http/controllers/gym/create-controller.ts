import { z } from 'zod';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case';

export class CreateController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createGymBodySchema = z.object({
      title: z.string(),
      description: z.string().nullable(),
      phone: z.string().nullable(),
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90;
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180;
      }),
    });

    const body = createGymBodySchema.parse(request.body);

    const createGymUseCase = makeCreateGymUseCase();

    await createGymUseCase.execute(body);

    reply.status(201).send();
  }
}
