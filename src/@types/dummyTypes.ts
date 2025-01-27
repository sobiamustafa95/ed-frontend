// These types are for setting up the dummy table data constant.
import {
  PAYMENT_STATUS,
  REQUEST_STATUS,
  SKILL_SET,
  URGENCY_LEVEL,
} from '@/constants';
export interface IBookingDataType {
  id: string;
  machine: string;
  serviceCategory: SKILL_SET;
  urgency: URGENCY_LEVEL;
  notes: string;
  viewDetails: REQUEST_STATUS;
}

export interface InvoiceData {
  id?: string;
  invoiceNo: string;
  technician: string;
  status: PAYMENT_STATUS;
  date: string;
  dueDate: string;
  amount: string;
}
