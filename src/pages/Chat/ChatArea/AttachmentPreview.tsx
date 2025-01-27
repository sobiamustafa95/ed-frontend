/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import { Attachment } from '@/@types/chat';
// import { BsDownload } from 'react-icons/bs';
// import { IoCloseOutline } from 'react-icons/io5';
import PDFIcon from '@/assets/svgs/pdfIcon.svg';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  attachment: string | Attachment | File;
  onRemoveAttachment?: () => void;
}

const ActionButton: React.FC<{
  action: 'Remove' | 'Download';
  onClick?: () => void;
  isFile?: boolean;
}> = ({ action, onClick, isFile }) => (
  <Button
    type='button'
    size='icon'
    // icon={
    //   action === 'Remove' ? (
    //     <IoCloseOutline />
    //   ) : (
    //     <BsDownload className='text-base' />
    //   )
    // }
    className={cn('absolute size-5 hidden group-hover:flex bg-quickSilver', {
      'size-8': action === 'Download',
      'right-[2%] top-[20%]': isFile,
      'right-[30%] top-[30%]': !isFile,
      '-right-2 -top-2': action === 'Remove',
    })}
    onClick={onClick}
  />
);

const AttachmentPreview: React.FC<Props> = ({
  attachment,
  onRemoveAttachment,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const getFileName = (attachment: string | Attachment | File): string => {
    if (typeof attachment === 'string') {
      return attachment.split('/').pop() || '';
    } else if (attachment instanceof File) {
      return attachment.name;
    }
    return attachment.originalname;
  };

  const getMimeType = (attachment: string | Attachment | File): string => {
    if (typeof attachment === 'string') {
      return attachment.split('.').pop()?.toLowerCase() || '';
    } else if (attachment instanceof File) {
      return attachment.type;
    }
    return attachment.mimetype;
  };

  const fileName = getFileName(attachment);
  const mimeType = getMimeType(attachment);
  const action = onRemoveAttachment ? 'Remove' : 'Download';
  const isFile = mimeType?.includes('pdf') || mimeType?.includes('docx');
  useEffect(() => {
    if (attachment instanceof File || (attachment as Attachment)?.buffer) {
      const blob = new Blob(
        [
          attachment instanceof File
            ? attachment
            : (attachment as Attachment).buffer,
        ],
        { type: mimeType },
      );
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof attachment === 'string') {
      setPreviewUrl(attachment);
    } else {
      return setPreviewUrl(null);
    }
  }, [attachment, mimeType]);

  const handleDownload = () => {
    if (typeof attachment === 'string') {
      window.open(attachment, '_blank');
    } else {
      const blob = new Blob(
        [
          attachment instanceof File
            ? attachment
            : (attachment as Attachment).buffer,
        ],
        { type: mimeType },
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  if (isFile) {
    return (
      <div className='relative flex p-1 rounded-lg w-48 h-12 lg:w-56 gap-2 items-center lg:h-16 group shrink-0 bg-black/5'>
        <ActionButton
          action={action}
          onClick={onRemoveAttachment || handleDownload}
          isFile
        />
        <img src={PDFIcon} alt={`file-${fileName}`} className='size-8' />
        <div className='flex flex-col w-full'>
          <Typography className='md:text-sm font-bold truncate w-36 lg:w-40 leading-none'>
            {fileName}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className='relative lg:size-20 size-16 bg-black/5 rounded-lg group shrink-0 p-1'>
      <ActionButton
        action={action}
        onClick={onRemoveAttachment || handleDownload}
      />
      {previewUrl ? (
        <img
          src={previewUrl}
          alt={`attachment-${fileName}`}
          className='w-full h-full object-cover'
        />
      ) : (
        <Typography className='text-center md:text-[10px] text-[10px]'>
          No Preview Available
        </Typography>
      )}
    </div>
  );
};

export default AttachmentPreview;
