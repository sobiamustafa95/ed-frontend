import { USER_PROVIDER, USER_ROLE, USER_TYPE } from '@/constants';

import { INameable } from '.';

export interface IUser extends ILoginResponse {
  createdAt?: string;
  email: string;
  isEmailVerified?: boolean;
  role: USER_TYPE | USER_ROLE;
  provider?: USER_PROVIDER;
  updatedAt?: string;
  id?: string;
  avatar?: string | File;
  phoneNumber?: string;
  companyName?: string;
  name?: string | INameable;
  authProvider: string;
  verified: boolean;
}
export interface ISignInFields {
  email: string;
  password: string;
}

export interface IAttachment {
  id: string;
  src: string;
  type: AttachmentType;
  name?: string;
  sizeInBytes?: number;
  url: string;
}

export interface ICertifications {
  name: string;
  attachments: IAttachment[];
}

export interface ISignUpFields {
  role: USER_ROLE;
  email: string;
  phoneNumber: string;
  password: string;
  skillSet?: string;
  certificate?: ICertifications[];
  experience?: ICertifications[];
}
export interface ILoginRequest {
  email: string;
  password: string;
}
export interface ISignupRequest {
  email: string;
  password: string;
  role: USER_ROLE;
  phoneNumber: string;
}

export interface ILoginResponse {
  accessToken: boolean;
  user: IUser;
  status: number;
  message: string;
}
export interface ISignupResponse extends IUser {
  accessToken: boolean;
  user: IUser;
  status: number;
  message: string;
}

export type IResetPasswordFields = {
  newPassword: string;
};

export interface ISetNewPasswordFields {
  password: string;
  reEnterPassword: string;
}

export type OtpFieldsResponseType = {
  accessToken: string;
};

export type ForgotPasswordEmailField = {
  email: string;
};

export interface IOtpFields {
  email: string;
  otp: number;
}

export enum AttachmentType {
  Image = 'image',
  Pdf = 'pdf',
}

export interface IRequestDetails {
  service: string;
  contact: string;
  bookingDate: string;
  totalAmount: string;
}

export interface IEditUser extends IUser {
  firstName: INameable | string;
  lastName: INameable | string;
  email: string;
  phoneNumber: string;
}
