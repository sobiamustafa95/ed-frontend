import React from 'react';

import { Typography } from '@/components/Typography';
import { strings } from '@/locales';

import ProfileCard from './components/ProfileCard';

const EditPersonalInfo = () => {
  const staticText = strings.editPersonalInfo;

  return (
    <div className='flex flex-col gap-2 ml-6 mt-4'>
      <Typography variant='subheading'>{staticText.title}</Typography>
      <ProfileCard />
    </div>
  );
};

export default EditPersonalInfo;
