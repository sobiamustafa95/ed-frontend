import React, { useState } from 'react';

import HeadSetIcon from '@/assets/svgs/HeadSetIcon';

import ChatModal from './ChatModal';

const CustomerCareChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <div
        onClick={toggleChat}
        className='absolute bg-primary rounded-full p-5 bottom-5 right-3 cursor-pointer hover:bg-blue-500 transition'
        aria-label='Open Customer Care Chat'
      >
        <HeadSetIcon />
      </div>
      <ChatModal isOpen={isOpen} onClose={toggleChat} />
    </div>
  );
};

export default CustomerCareChat;
