import { env } from '@/lib/env';
import { getItem, setItem } from '@/lib/utils/localStorage';

import { listings } from './listings';
import { locations } from './locations';
import { reviews } from './reviews';
import { users } from './users';

type Database = {
  listings: typeof listings;
  locations: typeof locations;
  users: typeof users;
  reviews: typeof reviews;
};

// Add all data to localstorage to simulate database
export const seedLocalDatabase = (): void => {
  const database = getItem<Database>(env.DB_KEY);

  if (database) {
    return;
  }

  const initialDatabase: Database = {
    listings,
    locations,
    users,
    reviews,
  };

  setItem(env.DB_KEY, initialDatabase);
};
