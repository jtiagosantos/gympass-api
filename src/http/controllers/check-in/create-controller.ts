import { z } from 'zod';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case';

export class CreateController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createCheckInsParamsSchema = z.object({
      gymId: z.string().uuid(),
    });
    const createCheckInBodySchema = z.object({
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90;
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180;
      }),
    });

    const { gymId } = createCheckInsParamsSchema.parse(request.params);
    const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

    const checkInUseCase = makeCheckInUseCase();

    await checkInUseCase.execute({
      gymId,
      userId: request.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    });

    reply.status(201).send();
  }
}
