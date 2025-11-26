import { DollarSign, Pin, Users } from 'lucide-react';
import { Card, Separator } from '@/components/ui';
import type { Listing } from '@/types';
import { getLocationById } from '@/api/locations';
import ListingDetailsCardImages from './ListingDetailsCardImages';
import ListingFavoriteButton from './ListingFavoriteButton';

const ListingDetailsCard = ({ listing }: { listing: Listing }) => {
  if (!listing) {
    return null;
  }
  const location = getLocationById(listing.locationId)!;

  return (
    <Card className='mx-4 p-4'>
      <ListingDetailsCardImages listing={listing} />
      <div className='flex justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='mb-2 text-2xl font-bold'>{listing.name}</h1>
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
        </div>
        <ListingFavoriteButton listing={listing} />
      </div>
      <Separator className='my-4' />
      <div className='whitespace-pre-line'>{listing.description}</div>
    </Card>
  );
};

export default ListingDetailsCard;
