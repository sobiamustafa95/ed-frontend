/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import SearchBar from '@/components/SearchBar';
import { Typography } from '@/components/Typography';
import { user1, user2 } from '@/constants/chat';
import { strings } from '@/locales';
import { useChatContext } from '@/provider/ChatProvider';

import ChatAccordion from './chatAccordion';

const ChatSidebar = () => {
  const staticText = strings.chatScreen;
  const { setChatList } = useChatContext();

  const [searchText, setSearchText] = useState('');

  // const debouncedSearchText = useDebounce(searchText);

  // const { data, isLoading } = useGenericQuery(
  //   ['chatList', isCustomer || isAdmin, debouncedSearchText],
  //   () => getChatList(isCustomer || isAdmin, debouncedSearchText),
  // );

  const dummyChatList = {
    others: [
      {
        conversationId: 'chat1',
        user: user1,
        lastMessage: 'Hey, are we meeting tomorrow?',
        unreadCount: 2,
        timestamp: '2025-01-15T10:00:00Z',
        deleted: false,
        createdAt: '2025-01-10T08:30:00Z',
        updatedAt: '2025-01-15T10:00:00Z',
        __v: 1,
      },
      {
        conversationId: 'chat2',
        user: user2,
        lastMessage: 'Let’s finalize the project details.',
        unreadCount: 0,
        timestamp: '2025-01-14T15:30:00Z',
        deleted: false,
        createdAt: '2025-01-05T09:00:00Z',
        updatedAt: '2025-01-14T15:30:00Z',
        __v: 1,
      },
      {
        conversationId: 'chat3',
        user: 'Team Alpha',
        lastMessage: 'Great work on the presentation!',
        unreadCount: 5,
        timestamp: '2025-01-13T20:15:00Z',
        deleted: false,
        createdAt: '2025-01-03T10:15:00Z',
        updatedAt: '2025-01-13T20:15:00Z',
        __v: 1,
      },
    ],
  };

  useEffect(() => {
    // if (typeof data === 'object') setChatList(data);
    setChatList(dummyChatList as any);
  }, []); // data

  return (
    <>
      <div className='flex flex-col gap-4 w-full lg:w-2/6'>
        <div className='flex justify-between xs:items-center flex-col xs:flex-row'>
          <Typography variant='heading' className='md:text-2xl'>
            {staticText.messages}
          </Typography>
        </div>
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          placeholder={'Search'}
        />
        <div className='flex flex-col h-full gap-2 overflow-scroll scrollbarHidden'>
          <ChatAccordion loading={false} />
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
