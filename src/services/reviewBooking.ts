// import toast from 'react-hot-toast';

// import { API } from '@/api/ApiInstance';
// import { REST_SUB_URL } from '@/constants/urls';

// interface IReviewAndRating {
//   rating: number;
//   review: string;
//   bookingId: string;
// }

// interface ITechnician {
//   id: string;
//   name: string;
//   profilePic: string;
//   serviceCategory: string;
//   phoneNumber: string;
//   bookingDate: string;
//   totalAmount: number;
//   // Add other user fields as needed
// }

// export const reviewBooking = async ({
//   reviews,
// }: {
//   reviews: IReviewAndRating;
// }): Promise<ITechnician | boolean> => {
//   const url = REST_SUB_URL.REVIEW_BOOKINGS;

//   try {
//     const response = await API.Post<ITechnician, IReviewAndRating>(
//       url,
//       reviews,
//     );

//     if (response.status && response.data) {
//       return response.data; // Return user data on success
//     }

//     toast.error(response.message || 'Failed to submit review');
//     return false;
//   } catch (error) {
//     console.error('Error in reviewBooking:', error);
//     toast.error('An unexpected error occurred while submitting the review.');
//     return false;
//   }
// };
