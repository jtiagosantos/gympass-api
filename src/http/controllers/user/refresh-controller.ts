import type { FastifyRequest, FastifyReply } from 'fastify';

export class RefreshController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify({ onlyCookie: true });

    const { role } = request.user;

    const token = await reply.jwtSign(
      {
        role,
      },
      {
        sign: {
          sub: request.user.sub,
          expiresIn: '10m',
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {
        role,
      },
      {
        sign: {
          sub: request.user.sub,
          expiresIn: '7d',
        },
      },
    );

    reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  }
}
