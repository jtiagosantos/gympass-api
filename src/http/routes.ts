import type { FastifyInstance } from 'fastify';
import { RegisterController } from './controllers/register-controller';

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', new RegisterController().handle);
};
