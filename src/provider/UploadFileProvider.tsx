import React, { createContext, useCallback, useContext, useState } from 'react';

import { IAttachment } from '@/@types/booking';
import { uploadFiles } from '@/services/uploadFile';

interface UploadFileContextProps {
  uploadedFiles: IAttachment[];
  uploadFilesHandler: (files: File[]) => Promise<void>;
}

const UploadFileContext = createContext<UploadFileContextProps | undefined>(
  undefined,
);

export const UploadFileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<IAttachment[]>([]);

  const uploadFilesHandler = useCallback(async (files: File[]) => {
    try {
      const response = await uploadFiles(files); // Call the uploadFiles API
      console.log('Upload API Response:', response); // Log the response

      // Update the uploadedFiles state with successful uploads
      setUploadedFiles((prev) => [...prev, ...response]);
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  }, []);

  return (
    <UploadFileContext.Provider
      value={{
        uploadedFiles,
        uploadFilesHandler,
      }}
    >
      {children}
    </UploadFileContext.Provider>
  );
};

// Custom hook to use the UploadFile context
export const useUploadFileContext = (): UploadFileContextProps => {
  const context = useContext(UploadFileContext);
  if (!context) {
    throw new Error(
      'useUploadFileContext must be used within an UploadFileProvider',
    );
  }
  return context;
};
