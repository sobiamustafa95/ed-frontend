import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FieldErrors } from 'react-hook-form';
import toast from 'react-hot-toast';

import { IEditFormFieldsTypes } from '@/@types/request';
import { mimeTypes } from '@/constants';
import { strings } from '@/locales';
import { getMimeTypes } from '@/utils/common';

import { Button } from './ui/button';
import ProfileAvatar from './ProfileAvatar';
import { Typography } from './Typography';

interface Props {
  setFile?: React.Dispatch<React.SetStateAction<File | null>>;
  fileName?: string;
  fileSize?: number;
  acceptedFileFormat?: string[] | string;
  dropzoneClassName?: string;
  uploadingDivClassName?: string;
  progress?: number;
  error?: FieldErrors<IEditFormFieldsTypes>;
  buttonText?: string;
}

const FileDropContainer: React.FC<Props> = ({
  setFile,
  fileName,
  fileSize = 0.5, // Default size limit: 500KB
  acceptedFileFormat = ['image/jpeg', 'image/png'],
  dropzoneClassName,
  uploadingDivClassName,
  progress,
  buttonText,
}) => {
  const FILE_SIZE_LIMIT = fileSize * 1024 * 1024;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const staticText = strings.editPersonalInfo;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter(
        (file) => file.size <= FILE_SIZE_LIMIT,
      );

      if (validFiles.length !== acceptedFiles.length) {
        toast.error(staticText.fileSizeLimitExceeded);
      }

      if (validFiles.length > 0) {
        const [updatedFile] = validFiles;
        setSelectedFile(updatedFile ?? null);
        setFile?.(updatedFile ?? null);
      }
    },
    [FILE_SIZE_LIMIT, setFile],
  );

  const acceptConfig = useMemo(() => {
    const mimeTypesArray = getMimeTypes(
      Array.isArray(acceptedFileFormat)
        ? acceptedFileFormat
        : [acceptedFileFormat],
    );

    return mimeTypesArray.reduce(
      (acc, mimeType) => {
        if (mimeType) {
          acc[mimeType] = Object.keys(mimeTypes).filter(
            (ext) => mimeTypes[ext] === mimeType,
          );
        }
        return acc;
      },
      {} as Record<string, string[]>,
    );
  }, [acceptedFileFormat]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptConfig,
    multiple: false,
  });

  const handleClearFileUpload = () => {
    setFile?.(null);
    setSelectedFile(null);
  };

  return (
    <div className={`flex items-center gap-2 ${dropzoneClassName}`}>
      {/* Profile Avatar */}
      {selectedFile ? (
        <ProfileAvatar
          name={fileName || staticText.file}
          src={selectedFile ? URL.createObjectURL(selectedFile) : undefined}
          className='w-16 h-16'
        />
      ) : (
        <div className='w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-grimGrey text-mouseGrey'>
          <Typography variant='sm' className='z-10 text-center px-1'>
            {buttonText || staticText.file}
          </Typography>
        </div>
      )}

      {/* File Upload Section */}
      <div className='flex flex-col flex-grow'>
        <div
          {...getRootProps()}
          className={`flex items-center justify-between cursor-pointer p-2 pb-0 ${uploadingDivClassName}`}
        >
          <input {...getInputProps()} />
          <div>
            <Button
              variant={'outline'}
              className='text-mouseGrey truncate h-7 text-sm py-0 font-medium bg-gray-200 border-grimGrey'
            >
              {fileName && fileName.length > 30
                ? `${fileName.slice(0, 30)}...`
                : fileName}
            </Button>

            {/* Delete Button */}
            <Button
              variant={'link'}
              className='text-red-500 text-sm font-medium hover:underline'
              onClick={handleClearFileUpload}
            >
              {staticText.delete}
            </Button>
          </div>
          {progress && (
            <div className='text-xs text-gray-500 ml-2'>{`${progress}%`}</div>
          )}
        </div>
        <Typography variant='sm' className='text-gray-500'>
          {staticText.fileSizeLimit}
        </Typography>
      </div>
    </div>
  );
};

export default FileDropContainer;
