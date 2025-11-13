import type { Availability, Listing, ListingFilter } from '@/types';
import { isListingAvailable } from './data/listings';
import { getDatabaseTable, setDatabaseTable } from './helpers';

// Gets listing by id
export const getListingById = (id: number): Listing | undefined => {
  const listings = getDatabaseTable<Listing[]>('listings');
  if (!listings) {
    console.log('No listings table found');
    return;
  }

  return listings.find((listing) => listing.id === id);
};

// Gets listings using optional date range and search parameters
export const getListings = (params: ListingFilter): Listing[] | undefined => {
  const { dates, guests, search } = params;

  const listings = getDatabaseTable<Listing[]>('listings');
  if (!listings) {
    console.log('No listings table found');
    return;
  }

  let filteredListings: Listing[] = listings;

  if (dates) {
    filteredListings = filteredListings.filter((listing) =>
      isListingAvailable(listing, dates),
    );
  }

  if (typeof guests === 'number') {
    filteredListings = filteredListings.filter(
      (listing) => guests <= (listing.maxGuests as number),
    );
  }

  if (search) {
    const needle = search.toLowerCase();
    filteredListings = filteredListings.filter((listing) =>
      String(listing.name).toLowerCase().includes(needle),
    );
  }

  return filteredListings;
};

// Creates a listing
export const createListing = (
  data: Omit<Listing, 'id' | 'createdAt' | 'updatedAt' | 'userId'>,
): Listing | undefined => {
  const listings = getDatabaseTable<Listing[]>('listings');
  if (!listings) {
    console.log('>>> [createListing] No listings table found');
    return;
  }

  const newListing: Listing = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1,
    id: listings.length + 1,
  };

  listings.push(newListing);
  setDatabaseTable('listings', listings);

  return newListing;
};
