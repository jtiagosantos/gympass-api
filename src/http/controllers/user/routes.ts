import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { RegisterController } from './register-controller';
import { AuthenticateController } from './authenticate-controller';
import { ProfileController } from './profile-controller';
import type { FastifyInstance } from 'fastify';

export const userRoutes = async (app: FastifyInstance) => {
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
