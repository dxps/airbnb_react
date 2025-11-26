import { Link, useParams } from 'react-router-dom';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import type { Listing } from '@/types';
import useFetch from '@/hooks/useFetch';
import DataRenderer from '@/components/DataRenderer';
import { HomeIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui';

const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const { data: listing, error, isLoading } = useFetch<Listing>(`/api/listings/${listingId}`);

  return (
    <div className='container py-4'>
      <DataRenderer error={error} isLoading={isLoading}>
        <div className='flex flex-row items-center justify-center'>
          <Link to='/'>
            <HomeIcon className='h-6 w-6' />
          </Link>
        </div>
        <Separator className='my-4' />
        <ListingDetailsCard listing={listing!} />
      </DataRenderer>
    </div>
  );
};

export default ListingDetailsPage;
