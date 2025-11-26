import * as jose from 'jose';

import { env } from '@/lib/env';
import { getItem, setItem } from '@/lib/utils/localStorage';

const JWT_SECRET_KEY = 'airbnb_react_jwt_secret';
const jwtSecret = new TextEncoder().encode(JWT_SECRET_KEY);

type DbData = Record<string, unknown>;

type VerifyOptions = {
  returnPayload?: boolean;
};

type MockConfig = {
  headers?: Record<string, string>;
  [key: string]: unknown;
};

type MockHandler = (
  config: MockConfig,
) => Promise<(number | { message: string })[]> | (number | { message: string })[];

// Waits for a given number of milliseconds.
export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to easily retrieve a database table.
export const getDatabaseTable = <T = unknown>(entity: string): T | undefined => {
  const db = getItem<DbData>(env.DB);
  return db ? (db[entity] as T) : undefined;
};

export const setDatabaseTable = (entity: string, data: unknown): void => {
  const db = getItem<DbData>(env.DB + entity) ?? {};
  db[entity] = data;
  setItem(env.DB + entity, db);
};

// Removes the password from a user object.
export const cleanUser = <T extends { password?: unknown }>(user: T): Omit<T, 'password'> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user;
  return rest;
};

// Wrapper for axios mock adapter that adds authentication checks
export const withAuth =
  (...data: any) =>
  async (config: any): Promise<any> => {
    const authHeader = config.headers?.Authorization || config.headers?.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : undefined;

    const verified = token ? await verifyToken(token) : false;

    if (env.USE_AUTH && !verified) {
      return [401, { message: 'Unauthorized' }];
    }

    return typeof data[0] === 'function' ? (data[0] as MockHandler)(config) : data;
  };

// Verifies a JWT token.
export const verifyToken = async (
  token: string,
  options: VerifyOptions = {},
): Promise<boolean | jose.JWTPayload> => {
  try {
    const verification = await jose.jwtVerify(token, jwtSecret);
    return options.returnPayload ? verification.payload : true;
  } catch {
    return false;
  }
};

// Generates a refresh token with a 30 day expiration.
export const generateRefreshToken = async (data: unknown): Promise<string> => {
  return await new jose.SignJWT({ data })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(jwtSecret);
};

// Generates an access token with a 15 minute expiration.
export const generateAccessToken = async (data: unknown): Promise<string> => {
  return await new jose.SignJWT({ data })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m')
    .sign(jwtSecret);
};
