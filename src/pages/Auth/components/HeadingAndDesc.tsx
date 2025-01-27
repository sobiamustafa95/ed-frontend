import React from 'react';

import { Typography } from '@/components/Typography';

interface IAuthHeadingsAndDesc {
  title: string;
  desc: string;
}

const AuthHeadingsAndDesc: React.FC<IAuthHeadingsAndDesc> = ({
  title,
  desc,
}) => {
  return (
    <div className='pb-4 lg:pb-8'>
      <Typography
        variant='title'
        className='font-bold text-youngNight block pb-2'
      >
        {title}
      </Typography>
      <Typography variant='p' className='text-millionGrey pb-2'>
        {desc}
      </Typography>
    </div>
  );
};

export default AuthHeadingsAndDesc;
