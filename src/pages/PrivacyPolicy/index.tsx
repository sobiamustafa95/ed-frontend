import React from 'react';

import { Typography } from '@/components/Typography';
import { strings } from '@/locales';

const PrivacyPolicy = () => {
  const staticText = strings.privacyPolicy;

  return (
    <div className='flex flex-col w-full p-3 gap-2'>
      <Typography variant='subheading'>{staticText.title}</Typography>
      <div className='flex flex-col items-start overflow-auto max-h-[65vh] scrollbarHidden'>
        {/* Information We Collect */}
        <Typography variant='p' className='font-semibold'>
          1. {staticText.informationWeCollect}
        </Typography>
        <Typography variant='md' className='mb-4 pt-2 text-SteelGray'>
          {staticText.weMayCollect}
        </Typography>

        {staticText.sections.map((section, index) => (
          <div key={index} className='mb-6'>
            <Typography variant='md' className='text-SteelGray'>
              {section.title}
            </Typography>
            <ul className='list-disc pl-5 text-sm text-SteelGray flex flex-col gap-1'>
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* How We Use Your Information */}
        <Typography variant='p' className='font-semibold'>
          2. {staticText.howWeUse}
        </Typography>
        <Typography variant='md' className='mb-4 pt-2 text-SteelGray'>
          {staticText.weUseYourInfo}
        </Typography>
        <ul className='list-disc pl-5 text-sm text-SteelGray flex flex-col gap-2'>
          {staticText.uses.map((use, index) => (
            <li key={index}>{use}</li>
          ))}
        </ul>

        <Typography variant='p' className='font-semibold mt-6'>
          3. {staticText.infoSharing}
        </Typography>
        <Typography variant='md' className='mb-4 pt-2 text-SteelGray'>
          {staticText.infoSharingDesc}
        </Typography>
        <ul className='list-disc pl-5 text-sm text-SteelGray flex flex-col gap-2'>
          {staticText.details.map((use, index) => (
            <li key={index}>{use}</li>
          ))}
        </ul>
      </div>{' '}
    </div>
  );
};

export default PrivacyPolicy;
