import type { FastifyReply, FastifyRequest } from 'fastify';

export const verifyJWT = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
};
