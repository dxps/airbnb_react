import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import type { ListingFilter } from '@/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HomeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import DataRenderer from '@/components/DataRenderer';
import { fetchListings } from '@/state/listings/listingsSlice';
import type { RootState, store } from '@/state/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import type { AxiosRequestConfig } from 'axios';

const HomePage: React.FC = () => {
  const { listings, error, status } = useAppSelector((state: RootState) => state.listings);
  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState<ListingFilter>();

  const handleFilters = useCallback((filter: ListingFilter) => {
    setFilter(filter);
  }, []);

  const fetchOptions = useMemo<AxiosRequestConfig>(() => ({ params: filter }), [filter]);

  useEffect(() => {
    const request = dispatch(fetchListings(fetchOptions));

    return () => {
      console.log('>>> [useEffect] on cleanup, status:', status);
      if (status !== 'idle' && status !== 'succeeded') {
        request.abort();
      }
    };
  }, [dispatch, fetchOptions]);

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <div className='flex flex-row items-center justify-center'>
          <Link to='/'>
            <HomeIcon className='mr-4 h-6 w-6' />
          </Link>
          <ListingFilters onChange={handleFilters} />
        </div>
        <Separator className='my-4' />
      </div>
      <DataRenderer error={error} isLoading={status === 'loading'}>
        <ListingList listings={listings} />
      </DataRenderer>
    </div>
  );
};

export default HomePage;
