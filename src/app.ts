import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

import { logs } from './logs';
import { errorHandler } from './global/error-handler';
import { env } from './env';

import { userRoutes } from './http/controllers/user/routes';
import { gymRoutes } from './http/controllers/gym/routes';
import { checkInRoutes } from './http/controllers/check-in/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
});
app.register(fastifyCookie);

app.addHook('preHandler', logs);

app.setErrorHandler(errorHandler);

app.register(userRoutes);
app.register(gymRoutes);
app.register(checkInRoutes);
