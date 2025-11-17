import { useParams } from 'react-router-dom';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import type { Listing } from '@/types';
import useFetch from '@/hooks/useFetch';
import DataRenderer from '@/components/DataRenderer';

const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const {
    data: listing,
    error,
    isLoading,
  } = useFetch<Listing>(`/api/listings/${listingId}`);

  return (
    <div className='container py-4'>
      <DataRenderer error={error} isLoading={isLoading}>
        <ListingDetailsCard listing={listing!} />
      </DataRenderer>
    </div>
  );
};

export default ListingDetailsPage;
