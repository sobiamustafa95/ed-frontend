import React, { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import CircularLoader from './ClipLoader';

interface Props {
  width?: string;
  height?: string;
  className?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const Container = forwardRef<HTMLDivElement, Props>(
  (
    { width = 'w-full', height = 'h-full', className, loading, children },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'bg-white rounded-xl px-2 md:px-4 md:py-5 py-3 border border-greyWhite overflow-scroll scrollbarHidden',
          width,
          height,
          className,
          { 'flex justify-center items-center h-[calc(100vh-200px)]': loading },
        )}
        ref={ref}
      >
        {loading ? <CircularLoader /> : children}
      </div>
    );
  },
);
Container.displayName = 'Container';

export default Container;
