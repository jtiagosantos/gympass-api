import fastify from 'fastify';

import { logs } from './logs';
import { appRoutes } from './http/routes';

export const app = fastify();

app.addHook('preHandler', logs);

app.register(appRoutes);
