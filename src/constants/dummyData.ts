import { IBookingDataType } from '@/@types/dummyTypes';
import DocumentText from '@/assets/svgs/DocumentText';
import InfoIcon from '@/assets/svgs/infoCircle.svg';

import {
  FAQTopicIds,
  PAYMENT_STATUS,
  REQUEST_STATUS,
  SKILL_SET,
  URGENCY_LEVEL,
} from '.';

export const dummyBookingData: IBookingDataType[] = [
  {
    id: '1',
    machine: 'Excavator',
    serviceCategory: SKILL_SET.HYDRAULICS,
    notes: 'Leak in hydraulic pipe',
    urgency: URGENCY_LEVEL.HIGH,
    viewDetails: REQUEST_STATUS.TRACK_ORDER,
  },
  {
    id: '2',
    machine: 'CNC machines',
    serviceCategory: SKILL_SET.HYDRAULICS,
    notes: 'Leak in hydraulic pipe',
    urgency: URGENCY_LEVEL.LOW,
    viewDetails: REQUEST_STATUS.COMPLETED,
  },
  {
    id: '3',
    machine: 'CNC machines',
    serviceCategory: SKILL_SET.HYDRAULICS,
    notes: 'Leak in hydraulic pipe',
    urgency: URGENCY_LEVEL.MEDIUM,
    viewDetails: REQUEST_STATUS.PENDING,
  },
];

export const dummyTrackBookingData: IBookingDataType[] = [
  {
    id: '1',
    machine: 'Excavator',
    serviceCategory: SKILL_SET.HYDRAULICS,
    notes: 'Leak in hydraulic pipe',
    urgency: URGENCY_LEVEL.HIGH,
    viewDetails: REQUEST_STATUS.TRACK_ORDER,
  },
];

export const START_POINT = {
  lat: 35.4676,
  lng: -97.5164,
  address: '8502 Preston, Rd. Inglewood, Maine 98380',
};

export const END_POINT = {
  lat: 38.6272,
  lng: -90.1978,
  address: '2972 Westheimer, Rd. Santa Ana, Illinois 85486 ',
};

// dummyData.ts
export const bookingDetails = {
  id: '3354654654526',
  bookingDate: 'November 18, 2024',
  estimatedArrival: '04:24 PM',
  customer: {
    name: 'Alex',
    specialization: 'Hydraulic Systems Expert',
    contact: '+1 561-555-7689',
  },
  progress: BookingStatus.IN_PROGRESS,
  payment: 'Visa **56',
  location: '123 Anywhere Street, TN, USA, 47401',
  helpTopics: [
    { text: 'Booking Issues', icon: DocumentText },
    { text: 'Revisit or Rework', icon: InfoIcon },
  ],
  orderSummary: {
    serviceCost: 0,
    discount: 0,
    travelFee: 0,
    tax: 0,
    totalDue: 0,
  },
};
import { BookingStatus } from '@/@types/booking';
import { strings } from '@/locales';

export const chatAvatarLink =
  'https://dummyimage.com/128x128/354ea1/ffffff&text=G';

export const dummyHistoryData = [
  {
    id: '1',
    technician: 'John Doe',
    dateAndTime: 'Nov 15, 2024',
    time: '2:30 PM',
    status: REQUEST_STATUS.COMPLETED,
    notes: 'AC serviced successfully. Replace filter in 3 months.',
    rating: 4.5,
  },
  {
    id: '2',
    technician: 'John Doe',
    dateAndTime: 'Nov 15, 2024',
    time: '3:00 PM',
    status: REQUEST_STATUS.COMPLETED,
    notes: 'Refrigerator diagnostic ongoing.',
    rating: 4.0,
  },
  {
    id: '3',
    technician: 'John Doe',
    dateAndTime: 'Nov 15, 2024',
    time: '4:00 PM',
    status: REQUEST_STATUS.COMPLETED,
    notes: 'Scheduled for compressor replacement.',
    rating: 5.0,
  },
  {
    id: '4',
    technician: 'John Doe',
    dateAndTime: 'Nov 16, 2024',
    time: '10:00 AM',
    status: REQUEST_STATUS.COMPLETED,
    notes: 'Heating system serviced. No issues found.',
    rating: 4.7,
  },
  {
    id: '5',
    technician: 'John Doe',
    dateAndTime: 'Nov 16, 2024',
    time: '11:00 AM',
    status: REQUEST_STATUS.COMPLETED,
    notes: 'Duct cleaning completed. Recommend yearly follow-up.',
    rating: 4.8,
  },
  {
    id: '6',
    technician: 'John Doe',
    dateAndTime: 'Nov 16, 2024',
    time: '11:00 AM',
    status: REQUEST_STATUS.COMPLETED,
    notes: 'Duct cleaning completed. Recommend yearly follow-up.',
    rating: 4.8,
  },
];

export const faqData = [
  {
    id: FAQTopicIds.ACCOUNT_MANAGEMENT,
    title: strings.helpCenter.faqTopics.accountManagement,
    questions: [
      {
        question: 'How do I sign up?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How can I change my profile?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I log out?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I update my email address?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
    ],
  },
  {
    id: FAQTopicIds.REQUESTING_A_REPAIR_SERVICE,
    title: strings.helpCenter.faqTopics.requestingARepairService,
    questions: [
      {
        question: 'How do I sign up?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How can I change my profile?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I log out?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I update my email address?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
    ],
  },
  {
    id: FAQTopicIds.REAL_TIME_TRACKING,
    title: strings.helpCenter.faqTopics.realTimeTracking,
    questions: [
      {
        question: 'How do I sign up?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How can I change my profile?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I log out?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I update my email address?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
    ],
  },
  {
    id: FAQTopicIds.NOTIFICATIONS,
    title: strings.helpCenter.faqTopics.notifications,
    questions: [
      {
        question: 'How do I sign up?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How can I change my profile?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I log out?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I update my email address?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
    ],
  },
  {
    id: FAQTopicIds.INVOICING_AND_PAYMENT,
    title: strings.helpCenter.faqTopics.invoicingAndPayment,
    questions: [
      {
        question: 'How do I sign up?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How can I change my profile?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I log out?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I update my email address?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
    ],
  },
  {
    id: FAQTopicIds.REVIEW_AND_RATING,
    title: strings.helpCenter.faqTopics.reviewAndRating,
    questions: [
      {
        question: 'How do I sign up?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How can I change my profile?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I log out?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I update my email address?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
    ],
  },
  {
    id: FAQTopicIds.TECHNICAL_SUPPORT,
    title: strings.helpCenter.faqTopics.technicalSupport,
    questions: [
      {
        question: 'How do I sign up?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How can I change my profile?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I log out?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
      {
        question: 'How do I update my email address?',
        answer:
          'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.',
      },
    ],
  },
];

export const dummyInvoiceData = [
  {
    id: '1',
    invoiceNo: 'INV-1001',
    technician: 'Sarah Connor',
    status: PAYMENT_STATUS.PAID,
    date: '11/10/2024',
    dueDate: '11/15/2024',
    amount: '$250.00',
  },
  {
    id: '2',
    invoiceNo: 'INV-1002',
    technician: 'John Doe',
    status: PAYMENT_STATUS.PENDING,
    date: '11/12/2024',
    dueDate: '11/17/2024',
    amount: '$150.00',
  },
  {
    id: '3',
    invoiceNo: 'INV-1003',
    technician: 'Alice Smith',
    status: PAYMENT_STATUS.OVERDUE,
    date: '11/08/2024',
    dueDate: '11/13/2024',
    amount: '$300.00',
  },
  {
    id: '4',
    invoiceNo: 'INV-1004',
    technician: 'Bob Johnson',
    status: PAYMENT_STATUS.OVERDUE,
    date: '11/15/2024',
    dueDate: '11/20/2024',
    amount: '$400.00',
  },
  {
    id: '5',
    invoiceNo: 'INV-1005',
    technician: 'Clara Oswald',
    status: PAYMENT_STATUS.PENDING,
    date: '11/09/2024',
    dueDate: '11/14/2024',
    amount: '$200.00',
  },
  {
    id: '6',
    invoiceNo: 'INV-1006',
    technician: 'Tom Hanks',
    status: PAYMENT_STATUS.OVERDUE,
    date: '11/07/2024',
    dueDate: '11/12/2024',
    amount: '$350.00',
  },
];
