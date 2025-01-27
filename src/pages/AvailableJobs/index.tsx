import React from 'react';

import { Typography } from '@/components/Typography';
import { strings } from '@/locales';

const AvailableJobs = () => {
  const staticText = strings.availableJobs;

  return (
    <div className='flex flex-col items-end gap-6 overflow-scroll relative'>
      <Typography variant='heading'>{staticText.title}</Typography>;
    </div>
  );
};

export default AvailableJobs;
