import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z
    .string({
      required_error: 'DATABASE_URL is a required environment variable',
    })
    .nonempty({ message: 'DATABASE_URL is a required environment variable' }),
  JWT_SECRET: z
    .string({ required_error: 'DATABASE_URL is a required environment variable' })
    .nonempty({ message: 'DATABASE_URL is a required environment variable' }),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log(`❌ Invalid environment variable`);
  _env.error.issues.forEach((error) => console.error(error));

  process.exit(1);
}

export const env = _env.data;
