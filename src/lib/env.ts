import * as z from 'zod';

const envSchema = z.object({
  BASE_URL: z.url(),
  COURSE_URL: z.url(),
  COSDEN_SOLUTIONS_URL: z.url(),
  DB_KEY: z.string(),
  USE_AUTH: z.string().transform((value) => value === 'true'),
});

export const env = envSchema.parse({
  BASE_URL: process.env.BUN_PUBLIC_BASE_URL,
  COURSE_URL: process.env.BUN_PUBLIC_COURSE_URL,
  COSDEN_SOLUTIONS_URL: process.env.BUN_PUBLIC_COSDEN_SOLUTIONS_URL,
  DB_KEY: process.env.BUN_PUBLIC_DB_KEY,
  USE_AUTH: process.env.BUN_PUBLIC_USE_AUTH,
});
