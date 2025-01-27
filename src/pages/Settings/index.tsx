import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@/components/Typography';
import { SETTINGS_OPTIONS } from '@/constants';
import { strings } from '@/locales';

const Settings = () => {
  const staticText = strings.settings;
  const navigate = useNavigate();

  const handleClick = (location: string) => {
    navigate(location);
  };

  return (
    <div className='relative h-full flex flex-col gap-2'>
      <div className='flex justify-between'>
        <Typography variant='subheading'>{staticText.title}</Typography>
      </div>
      <div>
        {SETTINGS_OPTIONS.map((topic, index) => (
          <div
            key={index}
            onClick={() => handleClick(topic.location)}
            className='py-5 cursor-pointer hover:bg-gray-100 transition rounded-md border-b-2 border-snow'
          >
            <div className='mx-5 px-2 flex justify-between items-center'>
              <Typography variant='p' className='font-semibold'>
                {topic.text}
              </Typography>
              <BsArrowRight size={25} className='text-primary' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
