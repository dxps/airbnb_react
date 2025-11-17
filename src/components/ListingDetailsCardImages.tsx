import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';
import type { Listing } from '@/types';

const ListingDetailsCardImages = ({ listing }: { listing: Listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      <img
        className='mb-4 h-[500px] w-full rounded-md object-cover'
        src={getImageUrl(listing.images[currentImageIndex]!)}
        alt={listing.name}
      />
      <Carousel className='mx-auto mb-4 w-[90%]'>
        <CarouselContent>
          {listing.images.map((image, index) => (
            <CarouselItem
              key={image}
              className='basis-1/3 cursor-pointer'
              onClick={() => setCurrentImageIndex(index)}
            >
              <img
                className='h-52 w-full rounded-sm border-2 object-cover shadow-sm hover:border-green-400 dark:hover:border-green-600'
                src={getImageUrl(image)}
                alt={listing.name}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='bg-slate-300 hover:cursor-pointer dark:bg-slate-500' />
        <CarouselNext className='bg-slate-300 hover:cursor-pointer dark:bg-slate-500' />
      </Carousel>
    </>
  );
};

export default ListingDetailsCardImages;
