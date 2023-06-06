import { verifyJWT } from '@/http/middlewares/verify-jwt';
import type { FastifyInstance } from 'fastify';
import { CreateController } from './create-controller';
import { ValidateController } from './validate-controller';
import { HistoryController } from './history-controller';
import { MetricsController } from './metrics-controller';

export const checkInRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT);

  app.get('/check-ins/history', new HistoryController().handle);
  app.get('/check-ins/metrics', new MetricsController().handle);
  app.post('/gyms/:gymId/check-ins', new CreateController().handle);
  app.patch('/check-ins/:checkInId/validate', new ValidateController().handle);
};
