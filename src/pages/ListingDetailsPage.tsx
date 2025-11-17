import { Link, useParams } from 'react-router-dom';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import { Separator, Spinner } from '@/components/ui';
import type { Listing } from '@/types';
import { HomeIcon } from '@radix-ui/react-icons';
import useFetch from '@/hooks/useFetch';

const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const {
    data: listing,
    error,
    isLoading,
  } = useFetch<Listing>(`/api/listings/${listingId}`);

  const renderListing = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner />
        </div>
      );
    }

    if (error) {
      return <div className='text-center'>{error}</div>;
    }

    return (
      <>
        <div className='flex flex-row items-center justify-center'>
          <Link to='/'>
            <HomeIcon className='h-6 w-6' />
          </Link>
        </div>
        <Separator className='my-4' />
        <ListingDetailsCard listing={listing!} />
      </>
    );
  };

  return <div className='container py-4'>{renderListing()}</div>;
};

export default ListingDetailsPage;
