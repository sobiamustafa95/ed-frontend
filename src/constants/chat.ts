import { IUser } from '@/@types/auth';
import { IMessage } from '@/@types/chat';

import { USER_TYPE } from '.';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DUMMY_RECIPIENT_LIST: any[] = [
  {
    _id: '728ed52g',
    name: 'Sharon Johnson',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '128ed52g',
    name: 'Charles Jones',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '228ed52g',
    name: 'Marshall Harris',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '728ed52m',
    name: 'Dennis King',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '428ed52g',
    name: 'Sharon Johnson',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '528ed52g',
    name: 'Charles Jones',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '628ed52g',
    name: 'Marshall Harris',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '728ed52m',
    name: 'Dennis King',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '928ed52g',
    name: 'Sharon Johnson',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '1028ed52g',
    name: 'Charles Jones',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '1128ed52g',
    name: 'Marshall Harris',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '728ed52m',
    name: 'Dennis King',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '1328ed52g',
    name: 'Sharon Johnson',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '1428ed52g',
    name: 'Charles Jones',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '1528ed52g',
    name: 'Marshall Harris',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
  {
    _id: '728ed52m',
    name: 'Dennis King',
    image: '',
    email: 'sharonjohnson@mail.com',
  },
];

// ✅ Dummy Users Data
export const dummyChats = [
  {
    conversationId: 'user_1',
    user: {
      id: 'user_1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: USER_TYPE.CUSTOMER,
      avatar: 'https://via.placeholder.com/40',
    },
    recentMessage: {
      message: 'Hello, how can I help you? What are you doing?',
      timestamp: '4:30 PM',
    },
    unreadCount: 2,
  },
  {
    conversationId: 'user_2',
    user: {
      id: 'user_2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: USER_TYPE.ADMIN,
      avatar: 'https://via.placeholder.com/40',
    },
    recentMessage: {
      message: 'Hello, how can I help you?',
      timestamp: '4:30 PM',
    },
    unreadCount: 0,
  },
  {
    conversationId: 'user_3',
    user: {
      id: 'user_3',
      name: 'Robert Brown',
      email: 'robert.brown@example.com',
      role: USER_TYPE.TECHNICIAN,
      avatar: 'https://via.placeholder.com/40',
    },
    recentMessage: {
      message: 'Hello, how can I help you?',
      timestamp: '4:30 PM',
    },
    unreadCount: 5,
  },
];

export enum MESSAGE_TYPE {
  SYSTEM_GENERATED = 'systemGenerated',
  USER_GENERATED = 'userGenerated',
}

export const urlRegex = /(https?:\/\/[^\s]+)/g;

export enum CHAT_SOCKET_EVENTS {
  SEND_MESSAGE = 'sendMessage',
  RECIEVE_MESSAGE = 'receiveMessage',
  JOIN_CONVERSATION = 'joinConversation',
  LEAVE_CONVERSATION = 'leaveConversation',
  MESSAGE_NOTIFICATION = 'messageNotification',
}

// Dummy user objects
export const user1: IUser = {
  id: 'user_1',
  email: 'john.doe@example.com',
  role: USER_TYPE.CUSTOMER, // Replace with correct USER_TYPE
  authProvider: 'email',
  verified: true,
  name: 'John Doe',
  phoneNumber: '+1234567890',
  companyName: 'Company A',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  accessToken: true,
  status: 1,
  message: 'Hello! How are you?',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: '' as any,
};

export const user2: IUser = {
  id: 'user_2',
  email: 'jane.smith@example.com',
  role: USER_TYPE.ADMIN, // Replace with correct USER_TYPE
  authProvider: 'email',
  verified: true,
  name: 'Jane Smith',
  phoneNumber: '+0987654321',
  companyName: 'Company B',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  accessToken: true,
  status: 1,
  message: 'Hello! How are you?',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: '' as any,
};

// Dummy chat history with proper user objects
export const dummyChatHistory: IMessage[] = [
  {
    to: user2,
    from: user1,
    conversationId: 'conv_1',
    docs: [],
    message: 'Hello! How are you?',
    messageType: MESSAGE_TYPE.USER_GENERATED,
    createdAt: new Date().toISOString(),
    seen: false,
  },
  {
    to: user1,
    from: user2,
    conversationId: 'conv_1',
    docs: [],
    message: 'I am fine. How about you?',
    messageType: MESSAGE_TYPE.USER_GENERATED,
    createdAt: new Date().toISOString(),
    seen: false,
  },
];

export const DUMMY_CHAT_LIST_DATA = [
  {
    name: 'Company 1',
    ticket: 'Tk#5529',
    employees: [
      {
        _id: '728ed52g',
        firstName: 'Jessica',
        lastName: 'Clark',
        image: '',
        jobPosition: 'UI/UX Designer',
        department: 'Design',
        email: 'sharonjohnson@mail.com',
      },
      {
        _id: '128ed52g',
        firstName: 'Charles',
        lastName: 'Jones',
        image: '',
        jobPosition: 'UI/UX Designer',
        department: 'Design',
        email: 'sharonjohnson@mail.com',
      },
      {
        _id: '228ed52g',
        firstName: 'Marshall',
        lastName: 'Harris',
        image: '',
        jobPosition: 'UI/UX Designer',
        department: 'Design',
        email: 'sharonjohnson@mail.com',
      },
      {
        _id: '728ed52m',
        firstName: 'Dennis',
        lastName: 'King',
        image: '',
        jobPosition: 'UI/UX Designer',
        department: 'Design',
        email: 'sharonjohnson@mail.com',
      },
    ],
  },
];
