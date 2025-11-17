import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import type { Listing, ListingFilter } from '@/types';
import { useCallback, useMemo, useState } from 'react';
import { HomeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import DataRenderer from '@/components/DataRenderer';

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
      <DataRenderer error={error} isLoading={isLoading}>
        <ListingList listings={listings!} />
      </DataRenderer>
    </div>
  );
};

export default HomePage;
