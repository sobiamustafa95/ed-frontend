import React from 'react';

const LineForOrOption = () => {
  return (
    <div className='flex justify-center items-center gap-1 my-4 xl:my-5'>
      <div className='h-[1px] w-full bg-lightGrey' />
      <div className='text-primaryBlack'>or</div>
      <div className='h-[1px] w-full bg-lightGrey' />
    </div>
  );
};

export default LineForOrOption;
