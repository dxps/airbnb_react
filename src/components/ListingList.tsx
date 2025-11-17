import type { Listing } from '@/types';
import ListingCard from './ListingCard';

const ListingList = ({ listings }: { listings: Listing[] }) => {
  return (
    <div className='flex flex-wrap justify-center gap-4'>
      {listings && listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))
      ) : (
        <p>No listings found.</p>
      )}
    </div>
  );
};

export default ListingList;
