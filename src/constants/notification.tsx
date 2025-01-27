/* eslint-disable max-lines */
import { INotificationItem } from '@/pages/Notifications/NotificationItem';
import { EnumToArray } from '@/utils/common';

export enum NOTIFICATION_TABS {
  TAB_ALL = 'all',
  TAB_UNREAD = 'unread',
}

export const NotificationTabsList = EnumToArray(NOTIFICATION_TABS);

export enum TASK_STATUS {
  ASSIGNED = 'Assigned',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export const DUMMY_NOTIFICATIONS: INotificationItem[] = [
  {
    id: '1',
    taskStatus: TASK_STATUS.ASSIGNED,
    message1: 'Technician Stephen has been assigned to your job.',
    message2:
      'Stephen will arrive at your location at 3:30 PM. Click here to track their route',
    timestamp: 'March 1, 2023',
    read: false,
  },
  {
    id: '2',
    taskStatus: TASK_STATUS.IN_PROGRESS,
    message1: 'Your repair job is now in progress.',
    message2: 'Technician John Doe has started working on the issue.',
    timestamp: 'March 1, 2023',
    read: false,
  },
  {
    id: '3',
    taskStatus: TASK_STATUS.COMPLETED,
    message1: 'Your job has been completed!',
    message2: 'Review the job summary and pay the invoice',
    timestamp: 'March 1, 2023',
    read: false,
  },
  {
    id: '4',
    taskStatus: TASK_STATUS.IN_PROGRESS,
    message1: 'Your repair job is now in progress.',
    message2: 'Technician John Doe has started working on the issue.',
    timestamp: 'March 1, 2023',
    read: false,
  },
  {
    id: '5',
    taskStatus: TASK_STATUS.COMPLETED,
    message1: 'Your job has been completed!',
    message2: 'Review the job summary and pay the invoice',
    timestamp: 'March 1, 2023',
    read: false,
  },
  {
    id: '6',
    taskStatus: TASK_STATUS.ASSIGNED,
    message1: 'Technician Stephen has been assigned to your job.',
    message2:
      'Stephen will arrive at your location at 3:30 PM. Click here to track their route',
    timestamp: 'March 1, 2023',
    read: false,
  },
  {
    id: '7',
    taskStatus: TASK_STATUS.ASSIGNED,
    message1: 'Technician Stephen has been assigned to your job.',
    message2:
      'Stephen will arrive at your location at 3:30 PM. Click here to track their route',
    timestamp: 'March 1, 2023',
    read: false,
  },
  {
    id: '8',
    taskStatus: TASK_STATUS.IN_PROGRESS,
    message1: 'Your repair job is now in progress.',
    message2: 'Technician John Doe has started working on the issue.',
    timestamp: 'March 1, 2023',
    read: false,
  },
  {
    id: '9',
    taskStatus: TASK_STATUS.COMPLETED,
    message1: 'Your job has been completed!',
    message2: 'Review the job summary and pay the invoice',
    timestamp: 'March 1, 2023',
    read: false,
  },
  {
    id: '10',
    taskStatus: TASK_STATUS.IN_PROGRESS,
    message1: 'Your repair job is now in progress.',
    message2: 'Technician John Doe has started working on the issue.',
    timestamp: 'March 1, 2023',
    read: false,
  },
  {
    id: '11',
    taskStatus: TASK_STATUS.COMPLETED,
    message1: 'Your job has been completed!',
    message2: 'Review the job summary and pay the invoice',
    timestamp: 'March 1, 2023',
    read: false,
  },
  {
    id: '12',
    taskStatus: TASK_STATUS.COMPLETED,
    message1: 'Your job has been completed!',
    message2: 'Review the job summary and pay the invoice',
    timestamp: 'March 1, 2023',
    read: false,
  },
  {
    id: '13',
    taskStatus: TASK_STATUS.ASSIGNED,
    message1: 'Technician Stephen has been assigned to your job.',
    message2:
      'Stephen will arrive at your location at 3:30 PM. Click here to track their route',
    timestamp: 'March 1, 2023',
    read: false,
  },
  {
    id: '14',
    taskStatus: TASK_STATUS.IN_PROGRESS,
    message1: 'Your repair job is now in progress.',
    message2: 'Technician John Doe has started working on the issue.',
    timestamp: 'March 1, 2023',
    read: false,
  },
  {
    id: '15',
    taskStatus: TASK_STATUS.ASSIGNED,
    message1: 'Technician Stephen has been assigned to your job.',
    message2:
      'Stephen will arrive at your location at 3:30 PM. Click here to track their route',
    timestamp: 'March 1, 2023',
    read: false,
  },
];
