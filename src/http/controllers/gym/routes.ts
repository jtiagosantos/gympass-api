import { verifyJWT } from '@/http/middlewares/verify-jwt';
import type { FastifyInstance } from 'fastify';
import { SearchController } from './search-controller';
import { NearbyController } from './nearby-controller';
import { CreateController } from './create-controller';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export const gymRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT);

  app.get('/gyms/search', new SearchController().handle);
  app.get('/gyms/nearby', new NearbyController().handle);
  app.post(
    '/gyms',
    { onRequest: [verifyUserRole('ADMIN')] },
    new CreateController().handle,
  );
};
