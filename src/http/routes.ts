import type { FastifyInstance } from 'fastify';
import { RegisterController } from './controllers/register-controller';
import { AuthenticateController } from './controllers/authenticate-controller';

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', new RegisterController().handle);
  app.post('/sessions', new AuthenticateController().handle);
};
