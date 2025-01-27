/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';

import { IActiveChat } from '@/@types/chat';
import ProfileBadge from '@/components/ProfileBadge';
import StateIndicator from '@/components/StateIndicator';
import { Typography } from '@/components/Typography';
import UnreadBadge from '@/components/UnreadBadge';
import { INDICATOR_STATE, USER_TYPE } from '@/constants';
import { user1, user2 } from '@/constants/chat';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';
import { useAuth } from '@/provider/AuthProvider';
import { useChatContext } from '@/provider/ChatProvider';

interface Props {
  loading: boolean;
}

// ✅ Dummy Chats Data with `usersInfo`
const dummyChats = [
  {
    conversationId: 'chat_1',
    usersInfo: [user1, user2],
    recentMessage: {
      message: 'Hello, how can I help you?',
      timestamp: '4:30 PM',
    },
    unreadCount: 2,
  },
  {
    conversationId: 'chat_2',
    usersInfo: [
      {
        id: 'user_3',
        name: 'Robert Brown',
        role: USER_TYPE.TECHNICIAN,
        avatar: 'https://via.placeholder.com/40',
      },
      {
        id: 'user_4',
        name: 'Emily Clark',
        role: USER_TYPE.CUSTOMER,
        avatar: 'https://via.placeholder.com/40',
      },
    ],
    recentMessage: {
      message: 'Hello, how can I help you?',
      timestamp: '4:30 PM',
    },
    unreadCount: 0,
  },
];

const ChatAccordion: React.FC<Props> = ({ loading }) => {
  const staticText = strings.chatScreen;

  const { user: loggedInUser } = useAuth();
  const { activeChat, setActiveChat, setConversationId } = useChatContext();

  // ✅ Replaced `chatList` with `dummyChats`
  const chats = dummyChats;

  const [, setOpenItems] = useState<string[]>([]);

  const handleChatClick = (chat: IActiveChat, conversationId: string) => {
    setActiveChat(chat);
    setConversationId(conversationId);
    console.log('Chat Clicked:', chat);
  };

  useEffect(() => {
    if (activeChat) {
      const activeChatItem = chats.find((chat) =>
        chat.usersInfo.some((user) => user.id === activeChat.user.id),
      );
      if (activeChatItem) {
        setConversationId(activeChatItem.conversationId);
      }
      setOpenItems((prev) => [...prev, 'others']);
    }
  }, [activeChat]);

  if (loading) return <StateIndicator state={INDICATOR_STATE.LOADING} />;
  if (!chats.length)
    return (
      <StateIndicator
        state={INDICATOR_STATE.EMPTY}
        noDataMessage={staticText.noChats}
        className='h-[90%] lg:h-full'
      />
    );

  return (
    <div className='flex flex-col gap-2'>
      {chats.map((chat) => {
        const { conversationId, unreadCount, usersInfo } = chat;
        const recipientDetails = usersInfo.find(
          (user) => user.id !== loggedInUser?.id,
        );

        if (!recipientDetails) return null;

        return (
          <div
            key={`Chat-${conversationId}`}
            className={cn(
              'bg-white hover:bg-greyWhite border-none rounded-full h-12 m-2 pr-5 flex justify-between items-center gap-2 cursor-pointer',
              {
                'bg-primary': activeChat?.user?.id === recipientDetails.id,
              },
            )}
            onClick={() =>
              handleChatClick({ user: recipientDetails as any }, conversationId)
            }
          >
            <ProfileBadge
              name={recipientDetails.name as any}
              profilePicture={recipientDetails.avatar as any}
              nameClassName='font-semibold text-black'
              description={chat.recentMessage.message}
              avatarClassName='w-12 h-12 flex justify-center items-center'
            />
            <div className='flex flex-col items-center gap-1'>
              <Typography variant='sm'>
                {chat.recentMessage.timestamp}
              </Typography>
              {unreadCount > 0 && (
                <UnreadBadge count={unreadCount} className='flex self-end' />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatAccordion;
