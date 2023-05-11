import { env } from '@/env';
import { FastifyError, FastifyReply } from 'fastify';

import { ZodError } from 'zod';

export const errorHandler = (error: FastifyError, _, reply: FastifyReply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: error.errors.map((error) => error.message),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ error: 'Internal server error' });
};
