import { DollarSign, Pin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import type { Listing } from '@/types';
import { getLocationById } from '@/api/locations';
import ListingCardImages from './ListingCardImages';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }: { listing: Listing }) => {
  const location = getLocationById(listing.locationId)!;

  return (
    <Link to={`/listings/${listing.id}`}>
      <Card className='w-[320px] hover:border-green-400 dark:hover:border-green-700'>
        <ListingCardImages listing={listing} />

        <CardContent className='p-4'>
          <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
          <div className='flex items-center gap-2'>
            <DollarSign className='text-primary h-4 w-4' />
            <span className='text-muted-foreground'>
              <span className='text-foreground font-bold'>{listing.price}</span> / night
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Pin className='text-primary h-4 w-4' />
            <span className='text-muted-foreground'>{location.name}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='text-primary h-4 w-4' />
            <span className='text-muted-foreground'>{listing.maxGuests} Guests</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;
