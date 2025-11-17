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

function ListingCardImages({ listing }: { listing: Listing }) {
  const { images, name } = listing;
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Carousel
      className='w-full'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CarouselContent className='ml-0'>
        {images.map((image, index) => (
          <CarouselItem key={image} className='pl-0'>
            <img
              className='h-[200px] w-full rounded-t-lg object-cover'
              src={getImageUrl(image)}
              alt={`${name} Image ${index + 1}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {isHovering && (
        <>
          <CarouselPrevious
            variant='link'
            className='absolute left-4 bg-slate-300 hover:cursor-pointer dark:bg-slate-500'
          />
          <CarouselNext
            variant='link'
            className='absolute right-4 bg-slate-300 hover:cursor-pointer dark:bg-slate-500'
          />
        </>
      )}
    </Carousel>
  );
}

export default ListingCardImages;
