import api from '@/api';
import axios from 'axios';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import { Spinner } from '@/components/ui/spinner';
import type { ListingFilter } from '@/types';
import { useEffect, useRef, useState } from 'react';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ListingFilter>();
  const abortController = useRef<AbortController>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);
      abortController.current = new AbortController();

      try {
        const response = await api.get('/api/listings', {
          params: filter,
          signal: abortController.current?.signal,
        });
        setListings(response.data);
      } catch (error: any) {
        if (axios.isCancel(error)) {
          return;
        }
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }

      return () => abortController.current?.abort();
    };

    fetchListings();
  }, [filter]);

  const handleFilters = (filter: ListingFilter) => {
    setFilter(filter);
  };

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
    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;
