import React from 'react';
import { ClipLoader } from 'react-spinners';

import { cn } from '@/lib/utils';

interface ILoader {
  color?: string;
  loading?: boolean;
  size?: number;
  className?: string;
}

const CircularLoader: React.FC<ILoader> = ({
  color = '#2B8ABC',
  loading,
  size = 24,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <ClipLoader
        color={color}
        loading={loading}
        size={size}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default CircularLoader;
