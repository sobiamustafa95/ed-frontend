import React from 'react';

import { cn } from '@/lib/utils';

const UnreadBadge = ({
  count,
  className,
}: {
  count?: number | null;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'bg-tomatoRed text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center',
        { 'w-2 h-2': !count },
        className,
      )}
    >
      {count}
    </div>
  );
};

export default UnreadBadge;
