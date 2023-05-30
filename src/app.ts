import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';

import { logs } from './logs';
import { errorHandler } from './global/error-handler';
import { env } from './env';

import { appRoutes } from './http/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.addHook('preHandler', logs);

app.setErrorHandler(errorHandler);

app.register(appRoutes);
