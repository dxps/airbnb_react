import { getDatabaseTable } from './helpers';

type Location = {
  id: number;
  name: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
};

export const getLocationById = (id: number): Location | undefined => {
  const locations = getDatabaseTable<Location[]>('locations');
  if (!locations) {
    console.log('No locations table found');
    return;
  }

  return locations.find((location) => location.id === id);
};
