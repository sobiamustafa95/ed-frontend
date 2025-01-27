import toast from 'react-hot-toast';

import { API } from '@/api/ApiInstance';
import { REST_SUB_URL } from '@/constants/urls';

import {
  ForgotPasswordEmailField,
  ILoginRequest,
  ILoginResponse,
  IOtpFields,
  IResetPasswordFields,
  ISignupRequest,
  ISignupResponse,
  IUser,
  OtpFieldsResponseType,
} from '../@types/auth';

export const signup = async (
  payload: ISignupRequest,
): Promise<ISignupResponse | boolean> => {
  const response = await API.Post<ISignupRequest, ISignupResponse>(
    REST_SUB_URL.SIGN_UP,
    payload,
  );
  if (response.status && response?.data) {
    return response?.data;
  }
  toast.error(response.message);
  return false;
};

export const login = async (
  payload: ILoginRequest,
): Promise<ILoginResponse | boolean> => {
  const response = await API.Post<ILoginRequest, ILoginResponse>(
    REST_SUB_URL.LOGIN,
    payload,
  );
  if (response.status && response?.data) {
    return response?.data;
  }
  toast.error(response.message);
  return false;
};

export const forgotPassword = async (
  payload: ForgotPasswordEmailField,
): Promise<IUser | boolean> => {
  const response = await API.Post<ForgotPasswordEmailField, IUser | boolean>(
    REST_SUB_URL.FORGOT_PASSWORD,
    payload,
  );
  if (response.status && response?.data) {
    return response.data;
  }
  toast.error(response.message);
  return false;
};

export const verifyOtp = async (
  payload: IOtpFields,
): Promise<OtpFieldsResponseType> => {
  const response = await API.Post<IOtpFields, OtpFieldsResponseType>(
    REST_SUB_URL.VERIFY_RESET_PASSWORD,
    payload,
  );
  if (response.status && response?.data) {
    return response.data;
  }
  throw new Error(response.message);
};

export const resetPassword = async (
  payload: IResetPasswordFields,
): Promise<string | boolean> => {
  const response = await API.Post<IResetPasswordFields, boolean>(
    REST_SUB_URL.RESET_PASSWORD,
    payload,
  );
  if (response.status) {
    return response.message;
  }
  toast.error(response.message);
  return false;
};
