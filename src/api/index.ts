import axios, { type AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';

import { env } from '@/lib/env';

import {
  cleanUser,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  withAuth,
} from './helpers';
import { createListing, getListingById, getListings } from './listings';
import { getLocationById } from './locations';
import { getReviewsByListingId } from './reviews';
import { getUser, getUserById } from './users';

// Creates a base axios instance
const api = axios.create({
  baseURL: env.BASE_URL,
});

// Creates a mock adapter for axios
const adapter = new MockAdapter(api, { delayResponse: 1000 });

// Gets a single listing
adapter.onGet(/\/api\/listings\/\d+/).reply(
  withAuth(async (config: AxiosRequestConfig) => {
    const match = config.url?.match(/\/api\/listings\/(\d+)/);
    const id = match ? parseInt(match[1]!, 10) : NaN;

    if (Number.isNaN(id)) {
      return [400, { message: 'Invalid listing id' }];
    }

    const listing = getListingById(id);
    if (!listing) {
      return [404, { message: 'Listing not found' }];
    }

    const location = getLocationById((listing as any).locationId);
    if (!location) {
      return [404, { message: 'Location not found' }];
    }

    return [200, { ...listing, location }];
  }),
);

// Gets all listings
adapter.onGet('/api/listings').reply(
  withAuth(async (config: AxiosRequestConfig) => {
    const { params } = config;

    const listings = getListings(params || {}) || [];

    const domainListings = listings.map((listing) => {
      const location = getLocationById((listing as any).locationId);
      return { ...listing, location };
    });

    return [200, domainListings];
  }),
);

// Creates a listing
adapter.onPost('/api/listings').reply(
  withAuth(async (config: AxiosRequestConfig) => {
    const raw = config.data ?? '{}';
    const listing = createListing(JSON.parse(raw));

    return [200, listing];
  }),
);

// Gets reviews for a listing
adapter.onGet('/api/reviews').reply(
  withAuth(async (config: AxiosRequestConfig) => {
    const { params } = config;
    const reviews = getReviewsByListingId(params?.listingId);
    return [200, reviews];
  }),
);

// Gets the current user
adapter.onGet('/api/me').reply(
  withAuth(async (config: AxiosRequestConfig) => {
    const accessToken = config.headers?.Authorization?.toString().split(' ')[1];

    const accessTokenPayload = accessToken
      ? await verifyToken(accessToken, { returnPayload: true })
      : false;

    if (!accessTokenPayload || typeof accessTokenPayload === 'boolean') {
      return [403, { message: 'Unauthorized' }];
    }

    const refreshTokenPayload = await verifyToken(
      accessTokenPayload.data as string,
      { returnPayload: true },
    );

    if (!refreshTokenPayload || typeof refreshTokenPayload === 'boolean') {
      return [403, { message: 'Unauthorized' }];
    }

    const user = getUserById(refreshTokenPayload.data as number);

    return [
      200,
      {
        accessToken: env.USE_AUTH ? accessToken : null,
        user: env.USE_AUTH && user ? cleanUser(user) : null,
      },
    ];
  }),
);

// Signs the user in
adapter.onPost('/api/signin').reply(async (config: AxiosRequestConfig) => {
  const raw = config.data ?? '{}';
  const user = getUser(JSON.parse(raw));

  if (user) {
    const refreshToken = await generateRefreshToken(user.id);

    Cookies.set('refreshToken', refreshToken);

    const accessToken = await generateAccessToken(refreshToken);

    return [
      200,
      {
        accessToken: env.USE_AUTH ? accessToken : null,
        user: env.USE_AUTH ? cleanUser(user) : null,
      },
    ];
  } else {
    return [401, { message: 'Invalid credentials' }];
  }
});

// Refreshes the user's access token
adapter.onGet('/api/refreshToken').reply(async () => {
  const refreshToken = Cookies.get('refreshToken');

  const refreshTokenPayload = refreshToken
    ? await verifyToken(refreshToken, { returnPayload: true })
    : false;

  if (
    env.USE_AUTH &&
    (!refreshTokenPayload || typeof refreshTokenPayload === 'boolean')
  ) {
    return [403, { message: 'Invalid refresh token' }];
  }

  const user = getUserById((refreshTokenPayload as any).data as number);

  const accessToken = await generateAccessToken(refreshToken as string);

  return [
    200,
    env.USE_AUTH
      ? {
          accessToken,
          user: user ? cleanUser(user) : null,
        }
      : null,
  ];
});

// Signs the user out
adapter.onPost('/api/signout').reply(
  withAuth(() => {
    Cookies.remove('refreshToken');
    return [200];
  }),
);

export default api;
