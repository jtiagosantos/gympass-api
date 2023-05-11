import fastify from 'fastify';

import { logs } from './logs';
import { errorHandler } from './global/error-handler';

import { appRoutes } from './http/routes';

export const app = fastify();

app.addHook('preHandler', logs);

app.setErrorHandler(errorHandler);

app.register(appRoutes);
