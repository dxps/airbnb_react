import { Card, CardContent } from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';
import type { Listing } from '@/types';

type ListingCardProps = {
  listing: Listing;
};

const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <Card className='w-[320px]'>
      <img
        className='h-[200px] w-full rounded-md object-cover'
        src={getImageUrl(listing.images[0])}
        alt={listing.name}
      />
      <CardContent className='p-4'>
        <h2 className='mb-0 text-xl font-semibold'>{listing.name}</h2>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
