/* eslint-disable max-lines */
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { IAttachment } from '@/@types/booking';
import AddImage from '@/assets/svgs/AddImage.svg';
import PDFIcon from '@/assets/svgs/pdfIcon.svg';
import Trash from '@/assets/svgs/trash.svg';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';
import { useUploadFileContext } from '@/provider/UploadFileProvider';
import { getMimeTypes } from '@/utils/common';

import { Typography } from './Typography';

interface AttachmentsProps {
  title?: string;
  isRequired?: boolean;
  labelClassName?: string;
  maxAttachments?: number;
  onAttachmentsChange?: (attachments: IAttachment[]) => void;
  acceptedFileTypes?: string[] | string;
}

const Attachments: FC<AttachmentsProps> = ({
  title,
  isRequired = false,
  labelClassName,
  maxAttachments = 10,
  onAttachmentsChange,
  acceptedFileTypes = '.jpg,.jpeg,.png,.pdf',
}) => {
  const [attachments, setAttachments] = useState<IAttachment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploadingFiles] = useState<Set<string>>(new Set()); // Track uploading files
  const staticText = strings.attachmentComponent;
  const { uploadFilesHandler } = useUploadFileContext();

  // Memoized accept configuration
  const acceptConfig = useMemo(
    () =>
      getMimeTypes(
        Array.isArray(acceptedFileTypes)
          ? acceptedFileTypes
          : [acceptedFileTypes],
      ).reduce((acc, mimeType) => ({ ...acc, [mimeType]: [] }), {}),
    [acceptedFileTypes],
  );

  // File drop handler
  const onDrop = useCallback(
    async (files: File[]) => {
      setError(null);

      if (attachments.length + files.length > maxAttachments) {
        setError('Maximum attachments exceeded');
        return;
      }

      try {
        // Upload files and add placeholders while uploading
        const newAttachments = files.map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
        }));
        setAttachments((prev) => [...prev, ...newAttachments]);

        // Use the uploadFilesHandler from the context
        await uploadFilesHandler(files);
        onAttachmentsChange?.([...attachments, ...newAttachments]);
      } catch (err) {
        console.error('File upload failed:', err);
        setError('Failed to upload files');
      }
    },
    [attachments, maxAttachments, onAttachmentsChange, uploadFilesHandler],
  );

  // Dropzone configuration
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: acceptConfig,
    multiple: true,
  });

  // Delete attachment handler
  const handleDeleteAttachment = (url: string) => {
    const updatedAttachments = attachments.filter(
      (attachment) => attachment.url !== url,
    );
    setAttachments(updatedAttachments);
    onAttachmentsChange?.(updatedAttachments);
  };

  const getFileExtension = (fileName: string) =>
    fileName.split('.').pop()?.toLowerCase();

  const isPdfFile = (fileName: string) => getFileExtension(fileName) === 'pdf';

  return (
    <div>
      <Typography
        className={cn('block text-black px-1 text-sm mb-2', labelClassName)}
      >
        {title || staticText.attachment}
        {isRequired && <span className='text-tomatoRed'>*</span>}
      </Typography>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-wrap gap-5'>
          {attachments.length < maxAttachments && (
            <div
              {...getRootProps()}
              className='flex w-16 h-16 border border-dashed rounded items-center justify-center cursor-pointer'
            >
              <input {...getInputProps()} />
              <img
                src={AddImage}
                alt={staticText.addAttachment}
                onClick={open}
              />
            </div>
          )}
          {attachments.map(({ url, name }) => (
            <div
              key={url}
              className='relative flex flex-col items-center justify-center w-16'
            >
              <div className='w-16 h-16 rounded overflow-hidden bg-gray-200 shadow hover:shadow-md transition duration-200 group flex items-center justify-center'>
                {isPdfFile(name) ? (
                  <img
                    src={PDFIcon}
                    alt={staticText.pdfAttachment}
                    className='w-8 h-8 object-contain'
                  />
                ) : (
                  <img
                    src={url}
                    alt={name}
                    className={`w-full h-full object-cover ${
                      uploadingFiles.has(name) ? 'opacity-50' : ''
                    }`}
                  />
                )}
                <button
                  className='absolute flex items-center justify-center w-5 h-5 bg-white rounded-md shadow'
                  onClick={() => handleDeleteAttachment(url)}
                >
                  <img
                    src={Trash}
                    alt={staticText.attachment}
                    className='w-3 h-3 object-cover'
                  />
                </button>
              </div>
              <span className='mt-1 text-xs text-SteelGray text-center truncate w-full'>
                {name}
              </span>
            </div>
          ))}
        </div>
        {error && <div className='text-red-500 text-sm'>{error}</div>}
      </div>
    </div>
  );
};

export default Attachments;
