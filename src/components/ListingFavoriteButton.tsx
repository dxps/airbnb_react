import type { Listing } from '@/types';
import { Button } from './ui';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/hooks';
import type { RootState } from '@/state/store';
import { useMemo } from 'react';
import { addFavoriteListing, removeFavoriteListing } from '@/state/listings/listingsSlice';

const ListingFavoriteButton = ({
  className,
  listing,
}: {
  className?: string;
  listing: Listing;
}) => {
  const favoriteListingIds = useAppSelector(
    (state: RootState) => state.listings.favoriteListingIds,
  );
  const dispatch = useAppDispatch();

  const isFavorite = useMemo(
    () => favoriteListingIds.includes(listing.id),
    [listing, favoriteListingIds],
  );

  return (
    <Button
      className={cn(className, 'hover:cursor-pointer')}
      variant='outline'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
          dispatch(removeFavoriteListing(listing.id));
        } else {
          dispatch(addFavoriteListing(listing.id));
        }
      }}
    >
      <Heart
        className={cn('h-4 w-4', {
          'fill-primary text-primary': isFavorite,
        })}
      />
    </Button>
  );
};

export default ListingFavoriteButton;
