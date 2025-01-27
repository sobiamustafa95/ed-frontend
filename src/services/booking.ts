/* eslint-disable @typescript-eslint/no-explicit-any */
// booking.ts
import toast from 'react-hot-toast';

import {
  IAllBookingDetails,
  IBookingDetails,
  ICreateBookingResponse,
} from '@/@types/booking';
import { API } from '@/api/ApiInstance'; // Assuming API utility is available
import { REST_SUB_URL } from '@/constants/urls';

// to upload the file and get the URL
export const uploadFile = async (
  file: File,
): Promise<{ url: string; name: string } | null> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await API.Post<FormData, { url: string }>(
    REST_SUB_URL.UPLOAD_ATTACHMENTS,
    formData,
  );

  if (response.status && response.data) {
    return {
      url: response.data.url,
      name: file.name,
    };
  }

  toast.success('File uploaded');
  return null;
};

// Create booking
export const createBooking = async (payload: {
  bookingDetails: IBookingDetails;
}): Promise<ICreateBookingResponse | boolean> => {
  // Process attachments: Upload files and get URLs
  const updatedAttachments = await Promise.all(
    (payload.bookingDetails.attachment || []).map(async (file) => {
      if (file instanceof File) {
        const uploadedData = await uploadFile(file);
        if (uploadedData) {
          return {
            name: uploadedData.name,
            url: uploadedData.url,
          };
        }
        return null;
      }
      return file;
    }),
  );

  // Filter out any null values from the attachments
  payload.bookingDetails.attachment = updatedAttachments.filter(
    (attachment) => attachment !== null,
  );
  console.log('Payload being sent to API:', payload.bookingDetails);

  // Use the generic API utility to create a booking
  const response = await API.Post<
    { bookingDetails: IBookingDetails },
    ICreateBookingResponse
  >(
    REST_SUB_URL.BOOKING,
    { bookingDetails: payload.bookingDetails }, // Send booking details as payload
  );

  if (response.status === 201 && response.data) {
    return response.data;
  }
  return false;
};

export const getAllBookings = async (): Promise<IAllBookingDetails[]> => {
  const response = await API.Post<
    object,
    {
      data: IAllBookingDetails[];
      status: boolean | number;
      message: string;
    }
  >(REST_SUB_URL.BOOKING_ALL, {});
  // console.log('response', response);

  if (response.status === true && Array.isArray(response.data)) {
    return response.data;
  }
  toast.error(response.message);
  return [];
};

// export const getBookingsById = async (
//   id: string,
// ): Promise<IAllBookingDetails[]> => {
//   const response = await API.Post<
//     null,
//     { data: IAllBookingDetails[]; status: boolean | number; message: string }
//   >(`${REST_SUB_URL.BOOKING}/${id}`, null);
//   console.log('API Response:', response);
//   if (response.status === true && Array.isArray(response.data)) {
//     console.log('Response:', response);
//     return response.data;
//   }
//   toast.error(response.message);
//   return [];
// };

export const getBookingsById = async (
  id: string,
): Promise<IAllBookingDetails[]> => {
  console.log('Requesting Booking Details for ID:', id);

  const response = await API.Post<
    object,
    {
      data: IAllBookingDetails[];
      status: boolean | number;
      message: string;
    }
  >(`${REST_SUB_URL.BOOKING}/${id}`, {});

  console.log('Raw Response from API.Post:', response);

  // Ensure the structure of the response is as expected
  if (response.status === true && Array.isArray(response.data)) {
    console.log('Valid Response:', response.data);
    return response.data;
  }

  console.error('Unexpected Response:', response);
  toast.error(response.message);
  return [];
};
