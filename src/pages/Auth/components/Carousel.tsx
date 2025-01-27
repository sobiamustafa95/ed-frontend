import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SLIDER_IMAGES } from '@/constants';

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <Carousel plugins={[plugin.current]} className='relative w-full h-screen'>
      <CarouselContent>
        {SLIDER_IMAGES.map((image) => (
          <CarouselItem
            key={image.id}
            className='flex justify-center items-center bg-black'
          >
            <img
              src={image.src}
              alt={image.alt}
              className='object-cover w-full h-full'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
