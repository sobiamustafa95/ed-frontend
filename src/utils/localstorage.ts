import { IUser } from '@/@types/auth';
import { LOCAL_CONSTANT } from '@/constants';

import { JSONParse } from './jsonparse';

// set user and token to localstorage
export const setTokenToLS = (token: string) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(LOCAL_CONSTANT.USER_TOKEN, JSON.stringify(token));
  }
};
export const setUserDetailToLS = (user?: IUser | null) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(LOCAL_CONSTANT.USER, JSON.stringify(user));
  }
};

// get user and token to localstorage
export const getAuthTokenFromLS = () => {
  if (typeof localStorage !== 'undefined') {
    return JSONParse(localStorage.getItem(LOCAL_CONSTANT.USER_TOKEN) as string);
  }
  return null;
};
export const getUserDetailsFromLS = () => {
  if (typeof localStorage !== 'undefined') {
    return JSONParse(localStorage.getItem(LOCAL_CONSTANT.USER) as string);
  }
  return null;
};

// clear storage
export const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};
