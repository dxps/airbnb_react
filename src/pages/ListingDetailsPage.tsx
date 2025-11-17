import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '@/api';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import { Separator, Spinner } from '@/components/ui';
import axios from 'axios';
import type { Listing } from '@/types';
import { HomeIcon } from '@radix-ui/react-icons';

const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const [listing, setListing] = useState<Listing>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const abortController = useRef<AbortController>(null);

  console.log('>>> [ListingDetailsPage] listingId', listingId);

  useEffect(() => {
    const fetchListing = async () => {
      setIsLoading(true);
      setError(null);

      abortController.current = new AbortController();

      try {
        const response = await api.get(`/api/listings/${listingId}`, {
          signal: abortController.current?.signal,
        });
        setListing(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();

    return () => {
      abortController.current?.abort();
    };
  }, [listingId]);

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
