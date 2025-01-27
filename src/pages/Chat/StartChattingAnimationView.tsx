import React from 'react';
import Lottie from 'lottie-react';

import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';

import ChatAnimation from '../../assets/animations/ChatAnimation.json';

interface Props {
  isEmpty?: boolean;
}

const StartChattingAnimationView: React.FC<Props> = ({ isEmpty = false }) => {
  const staticText = strings.chatScreen;

  const Content = () => {
    if (isEmpty) return staticText.sendMessage;
    return staticText.startMessaging;
  };
  return (
    <div
      className={cn(
        'flex items-center justify-center flex-col md:flex-row h-full bg-silentSea',
        isEmpty ? 'w-full' : 'lg:w-3/4',
        {
          'border-none': isEmpty,
        },
      )}
    >
      <Lottie
        animationData={ChatAnimation}
        loop={true}
        className='w-1/2 md:w-1/5'
      />
      <Typography variant='subheading' className='self-center text-center'>
        {Content()}
      </Typography>
    </div>
  );
};

export default StartChattingAnimationView;
