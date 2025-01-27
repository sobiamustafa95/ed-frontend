/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { IMessage } from '@/@types/chat';
import CircularLoader from '@/components/ClipLoader';
import { Separator } from '@/components/ui/separator';
import { dummyChatHistory, MESSAGE_TYPE, user1, user2 } from '@/constants/chat';
import { useAuth } from '@/provider/AuthProvider';
import { useChatContext } from '@/provider/ChatProvider';

import ChatHeader from './ChatHeader';
import Message from './Message';
import MessageInput from './MessageInput';

const ChatArea = () => {
  const { user: loggedInUser } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeChat } = useChatContext();

  const [chatHistory, setChatHistory] = useState<IMessage[]>(dummyChatHistory);

  // Handle sending a new message
  const handleSendMessage = (message: string, attachments: File[]) => {
    const newMessage: IMessage = {
      to: activeChat?.user?.id || (user2.id as any),
      from: loggedInUser?.id || (user1.id as any),
      conversationId: activeChat?.user?.id || 'conv_1',
      docs: attachments as any,
      message: message,
      messageType: MESSAGE_TYPE.USER_GENERATED,
      createdAt: new Date().toISOString(),
      seen: false,
    };

    setChatHistory((prev) => [newMessage, ...prev]);
  };

  return (
    <div className='flex flex-col gap-4 w-full lg:w-3/4 h-[96%] lg:h-full bg-silentSea'>
      <ChatHeader />
      <Separator />

      {/* Chat Content */}
      <div
        ref={containerRef}
        id='scrollableDiv'
        className='h-full overflow-y-auto flex flex-col-reverse mx-4'
      >
        <InfiniteScroll
          dataLength={chatHistory.length}
          next={() => {}}
          hasMore={false}
          loader={<CircularLoader />}
          scrollableTarget='scrollableDiv'
          inverse={true}
          initialScrollY={containerRef.current?.scrollHeight}
          className='flex gap-4 flex-col-reverse'
        >
          {chatHistory.map((item, index) => (
            <Message
              key={`Message-${index}`}
              message={item}
              showAvatar={chatHistory[index - 1]?.from !== item.from}
            />
          ))}
        </InfiniteScroll>
      </div>

      {/* Message Input Component */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;
