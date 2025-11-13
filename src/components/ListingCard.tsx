import { DollarSign, Pin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';
import type { Listing } from '@/types';
import { getLocationById } from '@/api/locations';

type ListingCardProps = {
  listing: Listing;
};

const ListingCard = ({ listing }: ListingCardProps) => {
  const location = getLocationById(listing.locationId)!;
  return (
    <Card className='w-[320px]'>
      <img
        className='-mt-8 h-[200px] w-full rounded-t-lg object-cover'
        src={getImageUrl(listing.images[0])}
        alt={listing.name}
      />
      <CardContent className='p-4'>
        <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
        <div className='flex items-center gap-2'>
          <DollarSign className='text-primary h-4 w-4' />
          <span className='text-muted-foreground'>
            <span className='text-foreground font-bold'>{listing.price}</span> /
            night
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Pin className='text-primary h-4 w-4' />
          <span className='text-muted-foreground'>{location.name}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Users className='text-primary h-4 w-4' />
          <span className='text-muted-foreground'>
            {listing.maxGuests} Guests
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
