import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const ChatLoadingState = () => {
  return (
    <div className='h-full'>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={cn('flex mb-4 gap-4', {
            'flex-row-reverse': index % 2 === 0,
          })}
        >
          <Skeleton className='size-9 rounded-full' />
          <div
            className={cn('flex space-y-2 w-full', {
              'justify-end': index % 2 === 0,
            })}
          >
            <Skeleton className='h-16 w-72' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatLoadingState;
