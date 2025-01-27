export enum SERVICE_CATEGORY {
  ENGINE = 'Engine',
  HYDRAULICS = 'Hydraulics',
  ELECTRICAL = 'Electrical',
  NOT_SPECIFIED = 'Not Specified',
}

export enum URGENCY {
  LOW = 'Low Priority',
  MEDIUM = 'Medium Priority',
  HIGH = 'High Priority',
  CRITICAL = 'Critical Priority',
  IMMEDIATE = 'Immediate Priority',
}

export enum BookingStatus {
  BOOKING_CANCELED = 'BOOKING_CANCELED',
  BOOKING_CREATED = 'BOOKING_CREATED',
  BOOKING_CONFIRMED = 'BOOKING_CONFIRMED',
  TECH_EN_ROUTE = 'TECH_EN_ROUTE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface IAttachment {
  name: string;
  url: string;
}

export interface IBookingDetails {
  machineryType: string;
  repairIssue: string;
  notes: string;
  serviceCategory: SERVICE_CATEGORY;
  urgency: URGENCY;
  location: {
    lat: string;
    lng: string;
  };
  address: string;
  attachment?: IAttachment[];
}

export interface IAttachment {
  id?: string;
  name: string;
  url: string;
}

export interface ILocation {
  lat: string;
  lng: string;
}

export interface IBookingDetails {
  machineryType: string;
  repairIssue: string;
  notes: string;
  serviceCategory: SERVICE_CATEGORY;
  urgency: URGENCY;
  address: string;
  location: ILocation;
  attachment?: IAttachment[];
}

export interface ICreateBookingResponse {
  bookingDetails: IBookingDetails;
}

export interface IBooking {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  technicianNote: Record<string, unknown>;
  customerId: string;
  technicianId: string;
  bookingDetails: IBookingDetails;
}

export interface IMeta {
  offset: number;
  limit: number;
  total: number;
  hasNext: boolean;
}

export interface IBookingResponse {
  data: IBooking[];
  meta: IMeta;
}

export interface IAllBookingDetails {
  id: string;
  customerId?: string;
  technicianId?: string | null;
  status: string;
  technicianNote?: string;
  cancelledBy?: string | null;
  createdAt: string;
  updatedAt?: string;
  bookingInvoice?: string | null;
  bookingDetails: IBookingDetails;
}

export interface IReviewAndRating {
  review: string;
  rating: number;
  bookingId: string;
}
