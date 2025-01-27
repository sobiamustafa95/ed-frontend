/* eslint-disable max-lines */
import { SettingIcon } from '@/assets/svgs';
import ArchiveBookIcon from '@/assets/svgs/ArchiveBookIcon';
import HelpCenterIcon from '@/assets/svgs/HelpCenterIcon';
import NotificationIcon from '@/assets/svgs/NotificationIcon';
import ReceiptIcon from '@/assets/svgs/ReceiptIcon';
import { strings } from '@/locales';
import { ROUTES } from '@/routes';

// Define a type for FAQ topic keys
type FAQTopicKey = keyof typeof strings.helpCenter.faqTopics;

export const getBreadcrumbs = (route: string, params?: { id?: string }) => {
  switch (route) {
    case ROUTES.BOOKINGS:
      return [
        {
          label: strings.sidebarRoutes.bookings,
          route: ROUTES.BOOKINGS,
          isCurrentPage: true,
          icon: <ArchiveBookIcon className='w-4 h-4' />,
        },
      ];
    case ROUTES.CREATE_BOOKING:
      return [
        {
          label: strings.sidebarRoutes.bookings,
          route: ROUTES.BOOKINGS,
          icon: <ArchiveBookIcon className='w-4 h-4' />,
        },
        {
          label: strings.createRequest.title,
          route: ROUTES.CREATE_BOOKING,
          isCurrentPage: true,
        },
      ];
    case ROUTES.TRACK_ORDER:
      return [
        {
          label: strings.sidebarRoutes.bookings,
          route: ROUTES.BOOKINGS,
          icon: <ArchiveBookIcon className='w-4 h-4' />,
        },
        {
          label: strings.trackOrder.bookingId,
          route: ROUTES.TRACK_ORDER,
          isCurrentPage: true,
        },
      ];
    case ROUTES.INVOICES:
      return [
        {
          label: strings.sidebarRoutes.invoices,
          route: ROUTES.INVOICES,
          icon: <ReceiptIcon className='w-4 h-4' />,
        },
      ];
    case ROUTES.NOTIFICATIONS:
      return [
        {
          label: strings.sidebarRoutes.notifications,
          route: ROUTES.NOTIFICATIONS,
          icon: <NotificationIcon className='w-4 h-4' />,
        },
      ];
    case ROUTES.HELP_CENTER:
      return [
        {
          label: strings.helpCenter.title,
          route: ROUTES.HELP_CENTER,
          icon: <HelpCenterIcon className='w-4 h-4' />,
        },
      ];
    case ROUTES.FAQ_TOPICS: {
      if (!params?.id) {
        throw new Error(strings.helpCenter.breadcrumbsError);
      }

      const topicKey = params.id as FAQTopicKey;

      return [
        {
          label: strings.helpCenter.title,
          route: ROUTES.HELP_CENTER,
          icon: <HelpCenterIcon className='w-4 h-4' />,
        },
        {
          label: strings.helpCenter.faqTopics[topicKey],
          route: ROUTES.FAQ_TOPICS.replace(':id', params.id),
          isCurrentPage: true,
        },
      ];
    }
    case ROUTES.SETTINGS:
      return [
        {
          label: strings.settings.title,
          route: ROUTES.SETTINGS,
          icon: <SettingIcon className='w-4 h-4' />,
        },
      ];
    case ROUTES.EDIT_PERSONAL_INFO:
      return [
        {
          label: strings.settings.title,
          route: ROUTES.SETTINGS,
          icon: <SettingIcon className='w-4 h-4' />,
        },
      ];
    case ROUTES.MANAGE_PAYMENT_METHOD:
      return [
        {
          label: strings.settings.title,
          route: ROUTES.SETTINGS,
          icon: <SettingIcon className='w-4 h-4' />,
        },
      ];
    case ROUTES.PREFERENCES:
      return [
        {
          label: strings.settings.title,
          route: ROUTES.SETTINGS,
          icon: <SettingIcon className='w-4 h-4' />,
        },
      ];
    case ROUTES.PAYMENT_METHODS:
      return [
        {
          label: strings.settings.title,
          route: ROUTES.SETTINGS,
          icon: <SettingIcon className='w-4 h-4' />,
        },
      ];

    default:
      return [];
  }
};
