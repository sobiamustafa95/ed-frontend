import React from 'react';

import { cn } from '@/lib/utils';

import { Skeleton } from './ui/skeleton';
import ProfileAvatar from './ProfileAvatar';
import { Typography } from './Typography';

interface Props {
  name: string;
  profilePicture?: string;
  attribute?: string;
  className?: string;
  avatarClassName?: string;
  nameClassName?: string;
  attributeClassName?: string;
  isLoading?: boolean;
  description?: string;
}

const ProfileBadge: React.FC<Props> = ({
  name,
  className,
  nameClassName,
  isLoading = false,
  profilePicture,
  avatarClassName,
  description,
}) => {
  return (
    <div className={cn('flex justify-center items-center gap-2', className)}>
      <ProfileAvatar
        name={name}
        src={profilePicture}
        className={avatarClassName}
        isLoading={isLoading}
      />
      <div>
        <div className={cn('text-sm font-bold text-white', nameClassName)}>
          {isLoading ? (
            <Skeleton className='w-28 h-4 bg-black/10' />
          ) : (
            <div className='flex flex-col justify-between'>
              <Typography
                variant='md'
                className={cn('font-bold text-white', nameClassName)}
              >
                {name}
              </Typography>

              {description ? (
                <Typography variant='sm'>{description}</Typography>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBadge;
