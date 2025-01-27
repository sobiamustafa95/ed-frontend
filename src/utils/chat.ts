import {
  IChat,
  IMessageNotification,
  IReceivedMessage,
  ISocketMessage,
} from '@/@types/chat';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const convertFilesToBuffers = async (files: File[]) => {
  const buffers = await Promise.all(
    files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              buffer: reader.result,
              originalname: file.name,
              mimetype: file.type,
              size: file.size,
            });
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        }),
    ),
  );
  return buffers;
};

const joinedConversations = new Set();

// Mock function to replace socket.emit
const mockSocketEmit = (event: string, payload: any) => {
  console.log(`Mock Socket Emit: Event - ${event}`, payload);
};

// Join a conversation (room) - Mocked
export const joinConversation = (conversationId: string) => {
  console.log('joinConversation');
  if (joinedConversations.has(conversationId)) {
    return;
  }
  joinedConversations.add(conversationId); // Track joined conversations
  mockSocketEmit('joinConversation', { conversationId });
  //   socket.emit(CHAT_SOCKET_EVENTS.JOIN_CONVERSATION, { conversationId });
};

// Leave a conversation (room)
export const leaveConversation = (conversationId: string) => {
  console.log('leaveConversation');
  mockSocketEmit('leaveConversation', { conversationId });
  //   socket.emit(CHAT_SOCKET_EVENTS.LEAVE_CONVERSATION, { conversationId });
};

// Listen for incoming messages
export const receiveMessage = (
  callback: (message: IReceivedMessage) => void,
) => {
  mockSocketEmit('receiveMessage', (message: any) => {
    callback(message);
  });
  //   socket.on(CHAT_SOCKET_EVENTS.RECIEVE_MESSAGE, (message) => {
  //     callback(message);
  //   });
};

// Send a message to a conversation
export const sendMessage = (messageData: ISocketMessage) => {
  if (messageData?.message.trim() || messageData?.docs?.length)
    // socket.emit(CHAT_SOCKET_EVENTS.SEND_MESSAGE, messageData);
    mockSocketEmit('sendMessage', messageData);
};

export const messageNotification = (
  messageAlert: IMessageNotification,
  chatList: IChat[] | null,
  setChatList: React.Dispatch<React.SetStateAction<IChat[] | null>>,
  // queryClient: QueryClient,
) => {
  if (chatList?.length) {
    const chatIndex = chatList?.findIndex(
      (chat) => chat.conversationId === messageAlert.conversationId,
    );
    if (chatIndex >= 0) {
      const existingChat = chatList[chatIndex]!;
      const updatedChat = {
        ...existingChat,
        unreadCount: (existingChat?.unreadCount || 0) + 1,
      };
      const newChatList = chatList.map((chat) =>
        chat.conversationId === existingChat?.conversationId
          ? updatedChat
          : chat,
      );
      setChatList(newChatList);
    }
  } else {
    // Invalidate queries if the chat does not exist
    // queryClient.invalidateQueries({
    //   queryKey: ['chatList'],
    // });
  }
};
