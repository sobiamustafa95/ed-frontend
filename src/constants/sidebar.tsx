import { ReactElement } from 'react';

import {
  ArchiveBookIcon,
  ChatIcon,
  HelpCenterIcon,
  LogoutIcon,
  NotificationIcon,
  ReceiptIcon,
  SettingIcon,
} from '@/assets/svgs';
import { strings } from '@/locales';
import { ROUTES } from '@/routes';

import { USER_TYPE } from '.';

export interface SidebarItem {
  name: string;
  icon: ReactElement;
  location: string;
  roles: Record<USER_TYPE, boolean>;
  strokeColor?: string;
  selectedStrokeColor?: string;
}

// Utility function to assign roles
const withRoles = (roles: USER_TYPE[]): Record<USER_TYPE, boolean> => {
  return roles.reduce(
    (acc, role) => {
      acc[role] = true;
      return acc;
    },
    {} as Record<USER_TYPE, boolean>,
  );
};

// Custom hook to generate sidebar items
export const useSidebarItems = (): SidebarItem[] => {
  const { bookings, invoices, chat } = strings.sidebarRoutes;
  const { BOOKINGS, INVOICES, CHAT } = ROUTES;

  return [
    {
      name: bookings,
      icon: <ArchiveBookIcon />,
      location: BOOKINGS,
      roles: withRoles([USER_TYPE.CUSTOMER]),
      strokeColor: 'group-hover:text-primary',
      selectedStrokeColor: 'text-primary',
    },
    {
      name: invoices,
      icon: <ReceiptIcon />,
      location: INVOICES,
      roles: withRoles([USER_TYPE.CUSTOMER]),
      strokeColor: 'group-hover:text-primary',
      selectedStrokeColor: 'text-primary',
    },
    {
      name: chat,
      icon: <ChatIcon />,
      location: CHAT,
      roles: withRoles([USER_TYPE.CUSTOMER]),
      strokeColor: 'group-hover:text-primary',
      selectedStrokeColor: 'text-primary',
    },
  ];
};

export const sidebarOptions = () => {
  const staticText = strings.sidebarRoutes;
  const { NOTIFICATIONS, HELP_CENTER, SETTINGS } = ROUTES;

  return [
    {
      icon: <NotificationIcon />,
      name: staticText.notifications,
      location: NOTIFICATIONS,
      strokeColor: 'group-hover:text-white',
      selectedStrokeColor: 'text-primary',
    },
    {
      icon: <SettingIcon />,
      name: staticText.settings,
      location: SETTINGS,
      strokeColor: 'group-hover:text-white',
      selectedStrokeColor: 'text-white',
    },
    {
      icon: <HelpCenterIcon />,
      name: staticText.helpCenter,
      location: HELP_CENTER,
      strokeColor: 'group-hover:text-white',
      selectedStrokeColor: 'text-primary',
    },
    {
      icon: <LogoutIcon />,
      name: staticText.logout,
      location: '/login',
      strokeColor: 'text-tomatoRed group-hover:text-white',
      selectedStrokeColor: 'text-primary',
    },
  ];
};
