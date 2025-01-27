import { LOCAL_CONSTANT } from '@/constants';

import { JSONParse } from './jsonparse';

export const setTokenToSS = (token: string) => {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(LOCAL_CONSTANT.USER_TOKEN, JSON.stringify(token));
  }
};

export const getTokenFromSS = () => {
  if (typeof localStorage !== 'undefined') {
    return JSONParse(
      sessionStorage.getItem(LOCAL_CONSTANT.USER_TOKEN) as string,
    );
  }
  return null;
};
