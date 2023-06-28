import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/helpers/test/create-and-authenticate-user';

describe('Nearby Gyms Controller', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Some description',
        phone: '99999999999',
        latitude: -3.0211984,
        longitude: -59.94651,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: 'Some description',
        phone: '99999999999',
        latitude: -1.1716556,
        longitude: -58.5651723,
      });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -3.0211984,
        longitude: -59.94651,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym',
      }),
    ]);
  });
});
