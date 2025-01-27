import toast from 'react-hot-toast';

import { IEditUser, IUser } from '@/@types/auth';
import { API } from '@/api/ApiInstance';
import { REST_SUB_URL } from '@/constants/urls';

export const fetchProfile = async (
  userId: string,
): Promise<IUser | boolean> => {
  const url = REST_SUB_URL.USER_DATA.replace('{id}', userId);
  const response = await API.Get<IUser>(url);

  if (response.status && response.data) {
    return response.data;
  }

  toast.error(response.message);
  return false;
};

export const updateProfile = async ({
  payload,
  setPercent,
}: {
  payload: IEditUser;
  setPercent?: (percent: number) => void;
}): Promise<IEditUser | boolean> => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });
  const response = await API.Patch<FormData, IEditUser>(
    `${REST_SUB_URL.PROFILE}`,
    formData,
    {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setPercent?.(percentage);
        }
      },
    },
  );
  if (response.status && response.data) {
    return response.data;
  }

  toast.error(response.message);
  return false;
};
