/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';

import { IMessage } from '@/@types/chat';
import ProfileAvatar from '@/components/ProfileAvatar';
import { Typography } from '@/components/Typography';
import { MESSAGE_TYPE, urlRegex } from '@/constants/chat';
import { cn } from '@/lib/utils';
import { useAuth } from '@/provider/AuthProvider';
import { getLocalDate } from '@/utils/dateTime';

import AttachmentPreview from './AttachmentPreview';

interface Props {
  message: IMessage;
  showAvatar: boolean;
}

const Message: React.FC<Props> = ({ message, showAvatar }) => {
  const { user } = useAuth();

  const {
    _id,
    docs,
    messageType,
    from: sender,
    createdAt,
    message: text,
  } = message;

  const sentByLoggedInUser = sender?.id === user?.id;

  const formatMessageWithLinks = (text: string) => {
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary underline break-all'
          >
            {part}
          </a>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  if (messageType === MESSAGE_TYPE.SYSTEM_GENERATED)
    return (
      <div className='flex flex-col gap-0.5 items-center justify-center w-full'>
        <Typography className='md:text-sm font-medium rounded-xl px-5 py-1.5 w-fit max-w-[80%] sm:max-w-[60%] bg-flashWhite text-mouseGrey flex items-center justify-center gap-2'>
          <IoMdInformationCircleOutline className='text-mouseGrey flex-shrink-0' />
          {text}
        </Typography>
        <Typography className='text-xs md:text-xs text-mouseGrey bg-orange-500'>
          {getLocalDate(createdAt, 'MMM D, YYYY, hh:mm A')}
        </Typography>
      </div>
    );

  return (
    <div
      className={cn('w-full flex gap-2 md:gap-4', {
        'flex-row-reverse': sentByLoggedInUser,
      })}
    >
      <ProfileAvatar
        name={sender.user.name as string}
        src={sender?.user?.avatar as string}
        className={cn('w-9 h-9', {
          'opacity-0': !showAvatar,
        })}
      />
      <div
        className={cn(
          'flex flex-col gap-0.5 items-start max-w-full lg:max-w-[60%]',
          {
            'self-end items-end': sentByLoggedInUser,
          },
        )}
      >
        {text ? (
          <div
            className={cn('rounded-xl p-3 w-fit', {
              'bg-white border border-lightGrey text-SteelGray rounded-tr-none':
                sentByLoggedInUser,
              'bg-primary text-white rounded-tl-none': !sentByLoggedInUser,
            })}
          >
            <Typography className='md:text-sm font-medium'>
              {formatMessageWithLinks(text)}
            </Typography>
          </div>
        ) : (
          ''
        )}
        <div
          className={cn('flex flex-wrap gap-3', {
            'flex-row-reverse': sentByLoggedInUser,
          })}
        >
          {docs?.map((item, index) => (
            <AttachmentPreview
              key={`Attachment-${index}:${_id}`}
              attachment={item}
            />
          ))}
        </div>
        <div className='flex gap-1'>
          <Typography
            className={cn('text-xs md:text-xs text-mouseGrey', {
              'self-end': sentByLoggedInUser,
            })}
          >
            {getLocalDate(createdAt, 'MMM D, YYYY, hh:mm A')}
          </Typography>
          {/* {sentByLoggedInUser ? (
            <div
              className={cn({
                'text-primary': message.seen,
                'text-lightGrey': !message.seen,
              })}
            >
              <BsCheckAll size={16} />
            </div>
          ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default Message;
