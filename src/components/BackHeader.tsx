import React from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';

import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { Typography } from './Typography';

interface IBackHeaderProps {
  loading?: boolean;
  title: string;
  handleBackBtn: () => void;
}

const BackHeader: React.FC<IBackHeaderProps> = ({
  loading,
  title,
  handleBackBtn,
}) => {
  const handleBack = () => {
    if (handleBackBtn) {
      handleBackBtn();
    }
  };

  return (
    <div className='flex items-center gap-3'>
      <Button
        className='bg-simplyViolet border border-lightGrey rounded-md px-0 size-8'
        onClick={handleBack}
      />
      <IoChevronBackSharp className='text-primaryBlack size-4' />
      {loading ? (
        <Skeleton className='w-32 h-4 bg-black/10' />
      ) : (
        <Typography className='text-xl md:text-[22px] font-bold'>
          {title}
        </Typography>
      )}
    </div>
  );
};

export default BackHeader;
