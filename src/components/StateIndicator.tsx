import React from 'react';
import Lottie from 'lottie-react';

import { cn } from '@/lib/utils';
import { strings } from '@/locales';

import SomethingWentWrongAnimation from '../assets/animations/SomethingWentWrong.json';

import CircularLoader from './ClipLoader';
import { Typography } from './Typography';

interface Props {
  state: 'Error' | 'Loading' | 'Empty';
  noDataMessage?: string;
  errorMessage?: string;
  className?: string;
}

const StateIndicator: React.FC<Props> = ({
  state,
  noDataMessage,
  errorMessage,
  className,
}) => {
  const staticText = strings.common;

  const Content = () => {
    switch (state) {
      case 'Loading':
        return <CircularLoader />;
      case 'Empty':
        return (
          <Typography>{noDataMessage || staticText.noDataAvailable}</Typography>
        );

      default:
        return (
          <>
            <Lottie
              animationData={SomethingWentWrongAnimation}
              loop={true}
              className='w-1/5'
            />
            <Typography variant='subheading' className='self-center'>
              {errorMessage || staticText.error}
            </Typography>
          </>
        );
    }
  };

  return (
    <div
      className={cn(
        'flex w-full h-full justify-center items-center',
        className,
      )}
    >
      {Content()}
    </div>
  );
};

export default StateIndicator;
