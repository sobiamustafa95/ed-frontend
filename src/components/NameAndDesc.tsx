import React, { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Skeleton } from './ui/skeleton';
import { Typography } from './Typography';

interface INameAndDescProps {
  title: string;
  description?: string | number;
  className?: string;
  avoidTruncate?: boolean;
  tags?: ReactNode;
  isLoading?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
}

const NameAndDesc: React.FC<INameAndDescProps> = ({
  title,
  description,
  className,
  avoidTruncate = false,
  isLoading = false,
  tags,
  titleClassName,
  descriptionClassName,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Typography
        className={cn('block font-bold md:text-[15px]', titleClassName, {
          truncate: !avoidTruncate,
        })}
      >
        {title}
      </Typography>
      {isLoading ? (
        <Skeleton className='w-20 h-4 bg-black/10' />
      ) : (
        <>
          {description || !tags ? (
            <Typography
              className={cn(
                'block whitespace-normal font-semibold md:text-[15px]',
                {
                  capitalize: !title?.toLowerCase().includes('email'),
                  truncate: !avoidTruncate,
                },
                descriptionClassName,
              )}
            >
              {description || '-'}
            </Typography>
          ) : null}
          {tags ? tags : null}
        </>
      )}
    </div>
  );
};

export default NameAndDesc;
