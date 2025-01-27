// temporary update...

import React from 'react';

import { cn } from '@/lib/utils';
import {
  generateHexCode,
  // generateInitials,
  getTextColor,
} from '@/utils/common';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';

interface Props {
  name: string;
  src?: string;
  className?: string;
  isLoading?: boolean;
}

const ProfileAvatar: React.FC<Props> = ({
  name,
  src,
  className,
  isLoading,
}) => {
  return isLoading ? (
    <Skeleton className='h-[34px] w-[34px] rounded-full' />
  ) : (
    <Avatar className={cn('h-[34px] w-[34px]', className)}>
      <AvatarImage src={src} />
      <AvatarFallback
        style={{
          backgroundColor: generateHexCode(name),
          color: getTextColor(generateHexCode(name)),
        }}
      >
        {/* {generateInitials(name)?.[0]} ||  */}
        {'JD'}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
