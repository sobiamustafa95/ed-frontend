import toast from 'react-hot-toast';

import { IAttachment } from '@/@types/booking';
import { API } from '@/api/ApiInstance';
import { REST_SUB_URL } from '@/constants/urls';

// to upload the file and get the URL
export const uploadFiles = async (files: File[]): Promise<IAttachment[]> => {
  const uploadedFiles = await Promise.all(
    files.map(async (file) => {
      const formData = new FormData();
      formData.append('attachments', file);

      const response = await API.Post<FormData, { url: string }>(
        REST_SUB_URL.UPLOAD_ATTACHMENTS,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      // Check if the response contains a valid URL
      if (response.status && response.data) {
        return {
          id: response.data.url,
          name: file.name,
          url: response.data.url,
        };
      }
      console.error('Invalid response data:', response);
      return null; // if response invalid then return null
    }),
  );

  // Filter out any null values to avoid errors
  return uploadedFiles.filter((file) => file !== null) as IAttachment[];
};

export const getFileUrl = async (
  fileId: string,
): Promise<{ url: string } | null> => {
  const response = await API.Get<{ url: string }>(
    `${REST_SUB_URL.UPLOAD_ATTACHMENTS}/${fileId}`,
  );

  if (response.status && response.data) {
    return {
      url: response.data.url,
    };
  }

  toast.error('Failed to fetch file URL');
  return null;
};

// to delete an uploaded file by its ID
export const deleteUploadedFile = async (fileId: string): Promise<boolean> => {
  const response = await API.Delete<{ id: string }, { success: boolean }>(
    `${REST_SUB_URL.UPLOAD_ATTACHMENTS}/${fileId}`,
  );

  if (response.status && response.data?.success) {
    toast.success('File deleted successfully');
    return true;
  }

  toast.error('Failed to delete file');
  return false;
};
