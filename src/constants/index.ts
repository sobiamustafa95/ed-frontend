import { IRequestDetails } from '@/@types/auth';
import Slider01 from '@/assets/images/Slider-01.webp';
import Slider02 from '@/assets/images/Slider-02.webp';
import Slider03 from '@/assets/images/Slider-03.webp';
import { strings } from '@/locales';
import { ROUTES } from '@/routes';

export const enum USER_PROVIDER {
  EMAIL = 'EMAIL',
}

export enum USER_TYPE {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  TECHNICIAN = 'TECHNICIAN',
}

export enum USER_ROLE {
  CUSTOMER = 'CUSTOMER',
  TECHNICIAN = 'TECHNICIAN',
}

export enum LOCAL_CONSTANT {
  USER_TOKEN = 'token',
  USER = 'user',
}

export const enum SUB_ROLE {
  ACCOUNT_OFFICER = 'ACCOUNT_OFFICER',
  RECRUITMENT_MANAGER = 'RECRUITMENT_MANAGER',
}

export const enum MUTATION_STATUS {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  ERROR = 'error',
}

export enum FIELD_TYPES {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  DROPDOWN = 'dropdown',
  TEXT = 'text',
  PASSWORD = 'password',
}

export enum SKILL_SET {
  ENGINE = 'engine',
  HYDRAULICS = 'hydraulics',
  ELECTRICAL = 'electrical',
}

export enum URGENCY_LEVEL {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
  IMMEDIATE = 'IMMEDIATE',
}

export enum GEO_CODE_STATUS {
  OK = 'OK',
  ZERO_RESULTS = 'ZERO_RESULTS',
  OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
  REQUEST_DENIED = 'REQUEST_DENIED',
  INVALID_REQUEST = 'INVALID_REQUEST',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export enum REQUEST_STATUS {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  TRACK_ORDER = 'Track Order',
  INVOICE = 'INVOICE',
  INPROGRESS = 'Inprogress',
}

export enum BUTTON_VARIANT {
  OUTLINE = 'outline',
  DEFAULT = 'default',
  DESTRUCTIVE = 'destructive',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
  LINK = 'link',
}

export enum STAR_TYPE {
  FULL = 'full',
  HALF = 'half',
  EMPTY = 'empty',
}

export enum FAQTopicIds {
  ACCOUNT_MANAGEMENT = 'account-management',
  REQUESTING_A_REPAIR_SERVICE = 'requesting-a-repair-service',
  REAL_TIME_TRACKING = 'real-time-tracking',
  NOTIFICATIONS = 'notifications',
  INVOICING_AND_PAYMENT = 'invoicing-and-payment',
  REVIEW_AND_RATING = 'review-and-rating',
  TECHNICAL_SUPPORT = 'technical-support',
}

export enum SETTINGS {
  EDIT_PERSONAL_INFORMATION = 'editPersonal Information',
  MANAGE_PAYMENT_METHOD = 'manage Payment Method',
  PREFERENCES = 'preferences',
  PRIVACY_POLICY = 'Privacy Policy',
}

export enum PAYMENT_STATUS {
  PENDING = 'Pending',
  PAID = 'Paid',
  OVERDUE = 'Overdue',
}

export enum BOOKING_TABS {
  ALL = 'all',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export const urgencyPriority = {
  IMMEDIATE: 1,
  CRITICAL: 2,
  HIGH: 3,
  MEDIUM: 4,
  LOW: 5,
};

export const statusPriority = {
  [PAYMENT_STATUS.OVERDUE]: 1,
  [PAYMENT_STATUS.PENDING]: 2,
  [PAYMENT_STATUS.PAID]: 3,
};

export enum INDICATOR_STATE {
  ERROR = 'Error',
  LOADING = 'Loading',
  EMPTY = 'Empty',
}

export const SLIDER_IMAGES = [
  {
    id: '01',
    src: Slider01,
    alt: 'first slider',
  },
  {
    id: '02',
    src: Slider02,
    alt: 'second slider',
  },
  {
    id: '03',
    src: Slider03,
    alt: 'third slider',
  },
];

export const REQUEST_DETAIL_FIELDS: {
  label: string;
  key: keyof IRequestDetails;
}[] = [
  { label: 'Service', key: 'service' },
  { label: 'Contact', key: 'contact' },
  { label: 'Booking date', key: 'bookingDate' },
  { label: 'Total Amount', key: 'totalAmount' },
];

export const SERVICE_CATEGORY_OPTIONS = [
  { value: SKILL_SET.ENGINE, label: 'Engine' },
  { value: SKILL_SET.HYDRAULICS, label: 'Hydraulics' },
  { value: SKILL_SET.ELECTRICAL, label: 'Electrical' },
];

export const URGENCY_OPTIONS = [
  { value: URGENCY_LEVEL.LOW, label: 'Low Priority' },
  { value: URGENCY_LEVEL.MEDIUM, label: 'Medium Priority' },
  { value: URGENCY_LEVEL.HIGH, label: 'High Priority' },
  { value: URGENCY_LEVEL.CRITICAL, label: 'Critical Priority' },
  { value: URGENCY_LEVEL.IMMEDIATE, label: 'Immediate Priority' },
];

export const DEFAULT_CENTER = {
  lat: 37.7749,
  lng: -122.4194,
};

export const ROWS_PER_PAGE = 5;
export const INVOICE_ROWS_PER_PAGE = 6;

export const STEPS = [
  {
    label: strings.progressBar.bookingConfirmed,
    status: REQUEST_STATUS.PENDING,
  },
  {
    label: strings.progressBar.technicianEnRoute,
    status: REQUEST_STATUS.TRACK_ORDER,
  },
  { label: strings.progressBar.inProgress, status: REQUEST_STATUS.INPROGRESS },
  { label: strings.progressBar.completed, status: REQUEST_STATUS.COMPLETED },
];

export const SETTINGS_OPTIONS = [
  {
    text: strings.settings.settings_options.editPersonalInformation,
    location: ROUTES.EDIT_PERSONAL_INFO,
  },
  {
    text: strings.settings.settings_options.managePaymentMethod,
    location: ROUTES.MANAGE_PAYMENT_METHOD,
  },
  {
    text: strings.settings.settings_options.preferences,
    location: ROUTES.PREFERENCES,
  },
  {
    text: strings.settings.settings_options.privacyPolicy,
    location: ROUTES.PRIVACY_POLICY,
  },
];

export const mimeTypes: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.docx':
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.doc': 'application/msword',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.csv': 'text/csv',
};
