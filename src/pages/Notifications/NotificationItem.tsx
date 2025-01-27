import React from 'react';
import { FiX } from 'react-icons/fi';

import otherIcon from '@/assets/images/anyStatusIcon.png';
import assignedIcon from '@/assets/images/statusAssigned icon.png';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { TASK_STATUS } from '@/constants/notification';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';

export interface INotificationItem {
  id: string;
  taskStatus: string;
  message1: string;
  message2: string;
  timestamp: string;
  read: boolean;
}

interface NotificationItemProps {
  notification: INotificationItem;
  onClick: () => void;
  onClose: () => void;
  isFirst: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
  onClose,
  isFirst,
}) => {
  const { taskStatus, message1, message2, timestamp, read } = notification;
  const staticText = strings.notifications.notificationItem;

  const getButtonLabel = (status: string): string => {
    switch (status) {
      case TASK_STATUS.ASSIGNED:
        return staticText.trackOrder;
      case TASK_STATUS.IN_PROGRESS:
        return staticText.viewJobStatus;
      case TASK_STATUS.COMPLETED:
        return staticText.viewSummary;
      default:
        return staticText.viewDetails;
    }
  };

  return (
    <div
      className={cn('flex px-4 py-3 max-h-12vh cursor-pointer', {
        'border-t border-lightGrey': !isFirst,
        'bg-transparent': !read,
      })}
      onClick={onClick}
    >
      <div className='mr-3 flex-shrink-0'>
        <img
          src={taskStatus === TASK_STATUS.ASSIGNED ? assignedIcon : otherIcon}
          alt={taskStatus}
          className='h-8 w-8'
        />
      </div>
      <div className='flex flex-col flex-grow'>
        <Typography variant='p' className='font-semibold leading-0'>
          {message1}
        </Typography>
        <Typography variant='sm' className='text-SteelGray leading-0'>
          {message2}
        </Typography>
        <Typography variant='sm' className='text-SteelGray mt-2'>
          {timestamp}
        </Typography>
        <div className='block sm:hidden mt-3'>
          <Button className='rounded-xl w-full text-sm'>
            {getButtonLabel(taskStatus)}
          </Button>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <FiX
          size={20}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className='text-SteelGray cursor-pointer hover:text-black'
        />
        <Button className='rounded-xl hidden sm:block w-32 text-xs mt-4 self-end'>
          {getButtonLabel(taskStatus)}
        </Button>
      </div>
    </div>
  );
};

export default NotificationItem;
