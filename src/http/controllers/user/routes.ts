import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { RegisterController } from './register-controller';
import { AuthenticateController } from './authenticate-controller';
import { ProfileController } from './profile-controller';
import { RefreshController } from './refresh-controller';
import type { FastifyInstance } from 'fastify';

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/users', new RegisterController().handle);
  app.post('/sessions', new AuthenticateController().handle);
  app.patch('/token/refresh', new RefreshController().handle);

  /* Authenticated */
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    new ProfileController().handle,
  );
};
