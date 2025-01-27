/* eslint-disable react/no-children-prop */
import React from 'react';
import { BsChevronLeft } from 'react-icons/bs';

import ProfileBadge from '@/components/ProfileBadge';
// import { Skeleton } from '@/components/ui/skeleton';
import { useChatContext } from '@/provider/ChatProvider';

// ✅ Define a dummy user
const dummyUser = {
  id: 'user_1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'CUSTOMER',
  avatar: 'https://via.placeholder.com/40',
};

const ChatHeader = () => {
  const { activeChat, setActiveChat } = useChatContext();

  // ✅ Use activeChat if available, otherwise use dummyUser
  const recipient = activeChat?.user || dummyUser;

  const handleBackClick = () => {
    setActiveChat(null);
  };

  const Content = () => {
    // if (!activeChat)
    //   return (
    //     <div className='flex items-center space-x-4 w-full'>
    //       <Skeleton className='size-11 rounded-full' />
    //       <div className='space-y-2 w-full'>
    //         <Skeleton className='h-4 w-1/6' />
    //         <Skeleton className='h-4 w-2/6' />
    //       </div>
    //     </div>
    //   );

    return (
      <div className='flex flex-col md:flex-row gap-4 w-full bg-white items-start md:items-center px-5'>
        <BsChevronLeft
          size={25}
          className='text-pigeon cursor-pointer'
          onClick={handleBackClick}
        />
        <ProfileBadge
          name={recipient.name as string}
          profilePicture={recipient.avatar as string}
          avatarClassName='size-14'
          attribute={recipient.email}
          nameClassName='text-base font-semibold text-black text-lg'
          attributeClassName='text-greyishBlack font-semibold'
        />
      </div>
    );
  };

  return <div className='flex items-center gap-4 w-full'>{Content()}</div>;
};

export default ChatHeader;
