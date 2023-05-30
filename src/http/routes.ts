import type { FastifyInstance } from 'fastify';
import { RegisterController } from './controllers/register-controller';
import { AuthenticateController } from './controllers/authenticate-controller';
import { ProfileController } from './controllers/profile-controller';
import { verifyJWT } from './middlewares/verify-jwt';

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', new RegisterController().handle);
  app.post('/sessions', new AuthenticateController().handle);

  /* Authenticated */
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    new ProfileController().handle,
  );
};
