import React from 'react';

import MarkIcon from '@/assets/svgs/markIcon.svg';
import { Typography } from '@/components/Typography';

interface AddressCardProps {
  address: string;
}

const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  const [title, addressText] = address.split(', ');

  return (
    <div className='flex items-center bg-white rounded-lg shadow-lg p-3 px-4 border border-[#c3dafe] z-10 absolute top-24 right-24'>
      <div className='flex justify-center items-center bg-[#e9eaf7] rounded-full w-8 h-8 mr-2'>
        <img src={MarkIcon} alt='Location Icon' className='w-5 h-5' />
      </div>
      <div className='text-sm flex flex-col'>
        <Typography variant='md' className='text-gray-700 font-bold'>
          {title}
        </Typography>
        <Typography variant='sm' className='text-gray-500'>
          {addressText}
        </Typography>
      </div>
    </div>
  );
};

export default AddressCard;
