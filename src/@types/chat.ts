import { MESSAGE_TYPE } from '@/constants/chat';

import { IUser } from './auth';
import { IAPIResponse } from '.';

export interface Attachment {
  buffer: ArrayBuffer | Buffer;
  originalname: string;
  mimetype: string;
  size: number;
}

export interface IChat {
  conversationId: string;
  user: IUser;
  lastMessage: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  unreadCount: number;
  timestamp: string;
}

export interface IActiveChat {
  user: IUser;
}

export interface IChatResponse {
  others: IChat[];
}

export interface IUserChat {
  name: string;
  user: IUser[];
}

export interface IMessage {
  _id?: string;
  conversationId: string;
  to: IUser;
  from: IUser;
  message: string;
  docs: string[] | Attachment[];
  seen: boolean;
  messageType: MESSAGE_TYPE;
  deleted?: boolean;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

export interface ICreateChatPayload {
  user1: string;
  user2: string;
}

export interface ICreateChatResponse extends ICreateChatPayload {
  // This is conversation id
  _id: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICreateBulkChatResponse {
  createdConversations: ICreateChatResponse[];
  skippedConversations: ICreateChatResponse[];
}

export interface IMessageNotification {
  conversationId: string;
  message?: string;
}

export interface IReceivedMessage {
  conversationId: string;
  from: string;
  message: IAPIResponse<IMessage>;
}

export interface ISocketMessage {
  to: string;
  from: string;
  conversationId: string;
  docs: string[] | Attachment[];
  message: string;
  messageType: MESSAGE_TYPE;
}
