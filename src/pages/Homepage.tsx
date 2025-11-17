import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import { Spinner } from '@/components/ui/spinner';
import type { Listing, ListingFilter } from '@/types';
import { useCallback, useMemo, useState } from 'react';
import { HomeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';

const HomePage = () => {
  const [filter, setFilter] = useState<ListingFilter>();

  const fetchOptions = useMemo(() => ({ params: filter }), [filter]);

  const {
    data: listings,
    error,
    isLoading,
  } = useFetch<Listing[]>('/api/listings', fetchOptions);

  const handleFilters = useCallback((filter: ListingFilter) => {
    setFilter(filter);
  }, []);

  const renderListingList = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner />
        </div>
      );
    }
    if (error) {
      return <div className='text-center text-red-500'>{error}</div>;
    }
    return <ListingList listings={listings!} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <div className='flex flex-row items-center justify-center'>
          <Link to='/'>
            <HomeIcon className='mr-10 h-6 w-6' />
          </Link>
          <ListingFilters onChange={handleFilters} />
        </div>
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;
