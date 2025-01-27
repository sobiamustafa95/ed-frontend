import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa6';

import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DUMMY_NOTIFICATIONS,
  NOTIFICATION_TABS,
  NotificationTabsList,
} from '@/constants/notification';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';

import NotificationItem, { INotificationItem } from './NotificationItem';

const Notifications = () => {
  const staticText = strings.notifications;
  const [activeTab, setActiveTab] = useState(NOTIFICATION_TABS.TAB_ALL);
  const [notifications, setNotifications] =
    useState<INotificationItem[]>(DUMMY_NOTIFICATIONS);

  const handleNotificationClick = (id: string) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    );
    setNotifications(updatedNotifications);
  };

  const handleNotificationClose = (id: string) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id,
    );
    setNotifications(updatedNotifications);
  };

  const filteredNotifications =
    activeTab === NOTIFICATION_TABS.TAB_ALL
      ? notifications
      : notifications.filter((notification) => !notification.read);

  return (
    <div className='flex flex-col gap-2 h-full'>
      <div className='flex justify-between'>
        <Typography variant='heading'>{staticText.title}</Typography>
      </div>

      <div className='flex gap-2 justify-between items-center'>
        <div className='flex rounded-xl'>
          {NotificationTabsList.map((tab) => (
            <Button
              key={tab}
              className={cn(
                'text-xs w-auto border no-underline hover:no-underline border-lightGrey capitalize rounded-none text-black p-3 h-10',
                {
                  'bg-salt hover:bg-salt': activeTab === tab,
                  'bg-snow hover:bg-snow': activeTab !== tab,
                },
                {
                  'rounded-l-xl': NOTIFICATION_TABS.TAB_ALL === tab,
                  'rounded-r-xl': NOTIFICATION_TABS.TAB_UNREAD === tab,
                },
              )}
              onClick={() => setActiveTab(tab as NOTIFICATION_TABS)}
            >
              {tab}
            </Button>
          ))}
        </div>
        <div className='flex gap-2'>
          <div className='flex items-center gap-2 bg-snow border border-lightGrey rounded-xl px-2 md:px-4 py-2 w-24 md:w-40'>
            <Checkbox />
            <Typography variant='sm'>{staticText.selectAll}</Typography>
          </div>
          <Button className='flex justify-center items-center bg-snow hover:bg-snow border border-lightGrey rounded-xl'>
            <div className='flex gap-1'>
              <span className='text-black opacity-40 text-xs'>
                {staticText.groupBy}
              </span>
              <span className='text-black text-xs'>{staticText.date}</span>
            </div>
            <FaCaretDown className='text-trout' size={15} />
          </Button>
        </div>
      </div>
      <div className='overflow-y-scroll scrollbarHidden'>
        {filteredNotifications.length > 0 ? (
          <div>
            {filteredNotifications.map(
              (notification: INotificationItem, index) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification.id)}
                  onClose={() => handleNotificationClose(notification.id)}
                  isFirst={index === 0}
                />
              ),
            )}
          </div>
        ) : (
          <div className='flex justify-center items-center h-full'>
            <Typography className='text-sm text-mouseGrey'>
              {activeTab === NOTIFICATION_TABS.TAB_ALL
                ? 'No Notifications available!'
                : 'No unread notifications!'}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
