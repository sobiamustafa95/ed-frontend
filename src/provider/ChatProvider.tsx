import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { IActiveChat, IChat } from '@/@types/chat';

import { useSidebarContext } from './SidebarProvider';

interface IChatContext {
  activeChat: IActiveChat | null;
  setActiveChat: React.Dispatch<React.SetStateAction<IActiveChat | null>>;
  conversationId: string;
  setConversationId: React.Dispatch<React.SetStateAction<string>>;
  chatList: IChat[] | null;
  setChatList: React.Dispatch<React.SetStateAction<IChat[] | null>>;
  unReadMessageCount: number;
}

const ChatContext = createContext<IChatContext>({
  activeChat: null,
  setActiveChat: () => {},
  conversationId: '',
  setConversationId: () => {},
  chatList: null,
  setChatList: () => {},
  unReadMessageCount: 0,
});

interface IChatProvider {
  children: React.ReactNode;
}

export const ChatProvider = ({ children }: IChatProvider) => {
  const { currentTab } = useSidebarContext();

  const [conversationId, setConversationId] = useState('');
  const [unReadMessageCount, setUnReadMessageCount] = useState(0);
  const [activeChat, setActiveChat] = useState<IActiveChat | null>(null);
  const [chatList, setChatList] = useState<IChat[] | null>(null);

  const hasUnreadMessages = useCallback(() => {
    if (!chatList) return;

    const totalUnreadCount = chatList?.reduce(
      (acc, message) => acc + (message?.unreadCount || 0),
      0,
    );
    setUnReadMessageCount(totalUnreadCount);
  }, [chatList]);

  useEffect(() => {
    if (currentTab !== 'chat') {
      setActiveChat(null);
      setConversationId('');
    }
  }, [currentTab]);

  useEffect(() => {
    hasUnreadMessages();
  }, [chatList, hasUnreadMessages]);

  const value = {
    activeChat,
    setActiveChat,
    conversationId,
    setConversationId,
    chatList,
    setChatList,
    unReadMessageCount,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext);
