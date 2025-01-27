import React, { useEffect } from 'react';

import BackHeader from '@/components/BackHeader';
import { user1 } from '@/constants/chat';
import { strings } from '@/locales';
import { useChatContext } from '@/provider/ChatProvider';

import ChatArea from './ChatArea';
import ChatSidebar from './ChatSidebar';
// import StartChattingAnimationView from './StartChattingAnimationView';

const ChatScreen = () => {
  const { activeChat, setActiveChat } = useChatContext();
  const staticText = strings.chatScreen;
  const isSmallScreen = window.innerWidth < 1024;
  const showChatArea = activeChat;

  const handleGoBack = () => {
    setActiveChat(null);
  };

  // ✅ Set a dummy active chat when component mounts
  useEffect(() => {
    if (!activeChat) {
      setActiveChat({
        user: user1, // Set dummy active user
      });
    }
  }, [activeChat, setActiveChat]);

  return (
    <div className='h-full flex gap-3 p-5 bg-white'>
      {/* h-[calc(100vh-120px)] */}
      {!isSmallScreen ? (
        <>
          <ChatSidebar />
          <ChatArea />
          {/* {showChatArea ? <ChatArea /> : <StartChattingAnimationView />} */}
        </>
      ) : (
        <>
          {showChatArea ? (
            <div className='flex flex-col gap-2 w-full bg-red-400'>
              <BackHeader
                title={staticText.messages}
                handleBackBtn={handleGoBack}
              />
              <ChatArea />
            </div>
          ) : (
            <ChatSidebar />
          )}
        </>
      )}
    </div>
  );
};

export default ChatScreen;
