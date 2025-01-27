/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines */
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { LiaCcVisa } from 'react-icons/lia';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { BookingStatus } from '@/@types/booking';
import UserImage from '@/assets/images/Slider-02.webp';
import { ArchiveBookIcon, ChatIcon } from '@/assets/svgs';
import DocumentText from '@/assets/svgs/DocumentText';
// import EstimatedArrival from '@/assets/svgs/EstimatedArrival';
import Breadcrumbs from '@/components/Breadcrumbs';
import CustomModal from '@/components/CustomModal';
import ProgressBar from '@/components/ProgressBar';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { getBreadcrumbs } from '@/constants/breadcrumbs';
import { bookingDetails } from '@/constants/dummyData';
import { useGenericQuery } from '@/hooks/useQueryData';
import { strings } from '@/locales';
import { ROUTES } from '@/routes';
import { getBookingsById } from '@/services/booking';

import Separator from './Separator';
interface BookingDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const BookingDetailsDialog: React.FC<BookingDetailsDialogProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const {
    // id,
    bookingDate,
    // estimatedArrival,
    customer,
    progress,
    payment,
    location,
    helpTopics,
    orderSummary,
  } = bookingDetails;

  const { id } = useParams<{ id: string }>();
  const staticText = strings.trackOrder;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log('the booking id is', id);
  const { data } = useGenericQuery(['getBookingsById', id], () =>
    getBookingsById(id as any),
  );
  console.log('the data is', data);
  return (
    <CustomModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      customStyle='flex items-center left-48 z-[10]'
    >
      <div className='relative flex flex-col gap-4'>
        {/* Close Button */}
        <div className='flex justify-between'>
          <Breadcrumbs data={getBreadcrumbs(pathname)} />
          <button
            className='absolute top-0 right-0 text-gray-500 hover:text-black'
            onClick={() => setIsOpen(false)}
            aria-label='Close Modal'
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        <div className='flex items-center justify-between'>
          <Typography variant='p' className='font-semibold text-black'>
            {staticText.bookingId}: {id}
          </Typography>
          <Button
            variant='outline'
            size='sm'
            className='border-grayLight rounded-xl bg-gray-50 text-SteelGray text-xs py-1'
            onClick={() => {
              progress === BookingStatus.COMPLETED
                ? navigate(ROUTES.INVOICES)
                : null;
            }}
          >
            <DocumentText />
            {staticText.invoiceBtn}
          </Button>
        </div>
        <Typography variant='sm' className='flex gap-2 text-gray-600'>
          <span className='flex items-center gap-1'>
            <ArchiveBookIcon className='text-primary size-4' />
            {staticText.bookingDate}: <strong>{bookingDate}</strong>
          </span>
          {/* |  <span className='flex items-center gap-1'>
            <EstimatedArrival />
            {staticText.estimatedTime}:{' '}
            <strong>
              {REQUEST_STATUS.INPROGRESS ? estimatedArrival : '-'}
            </strong>
          </span> */}
        </Typography>
        <Separator />
        <div className='flex flex-row justify-between gap-2'>
          <div className='flex items-center'>
            <img
              src={UserImage}
              alt={staticText.technicianImgAlt}
              className='w-20 h-16 bg-gray-200 object-fill rounded-xl border-primary border'
            />
            <Typography
              variant='sm'
              className='ml-4 flex flex-col gap-1 font-light'
            >
              <span>
                {staticText.name}:
                <strong className='text-black'> {customer.name}</strong>
              </span>
              <span>
                {staticText.specialization}:{' '}
                <strong className='text-black'>
                  {customer.specialization}
                </strong>
              </span>
              <span className='text-black'>
                {staticText.contact}:<strong> {customer.contact}</strong>
              </span>
            </Typography>
          </div>
          <div className='flex flex-col gap-2'>
            <Typography
              variant='md'
              className='ml-auto text-black font-semibold'
            >
              ${orderSummary.totalDue}
            </Typography>
            <Button
              variant='outline'
              className='border-primary rounded-xl bg-gray-50 w-fit text-primary text-xs'
            >
              <ChatIcon />
              {staticText.chatBtn}
            </Button>
          </div>
        </div>
        <Separator />
        <div className='flex items-center justify-between'>
          <ProgressBar status={progress} />
        </div>
        <Separator />
        <div className='grid grid-cols-2 gap-6 mt-6'>
          <div>
            <Typography variant='md' className='font-semibold text-black'>
              {staticText.payment}
            </Typography>
            <Typography
              variant='sm'
              className='flex items-center gap-2 text-gray-600'
            >
              {payment} <LiaCcVisa size={18} className='text-gray-400' />
            </Typography>
          </div>
          <div>
            <Typography variant='md' className='font-semibold text-black'>
              {staticText.location}
            </Typography>
            <Typography
              variant='sm'
              className='flex items-center gap-2 text-gray-600'
            >
              {location}
            </Typography>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-6 mt-6'>
          <div className='flex flex-col gap-2'>
            <Typography variant='md' className='font-semibold text-black'>
              {staticText.needHelp}
            </Typography>
            <ul className='text-xs text-SteelGray'>
              {helpTopics.map((topic, index) => (
                <li key={index} className='flex items-center py-1'>
                  {typeof topic.icon === 'string' ? (
                    <img
                      src={topic.icon}
                      alt={topic.text}
                      className='w-3 h-3 mr-2'
                    />
                  ) : (
                    <topic.icon className='w-3 h-3 mr-2' color='#797979' />
                  )}
                  {topic.text}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <Typography variant='md' className='font-semibold text-black'>
              {staticText.orderSummary}
            </Typography>
            <Typography
              variant='sm'
              className='grid grid-cols-2 gap-2 text-gray-600'
            >
              <span className='text-left'>{staticText.serviceCost}:</span>
              <span className='text-right'>${orderSummary.serviceCost}</span>
              <span className='text-left'>{staticText.discountApplied}:</span>
              <span className='text-right'>${orderSummary.discount}</span>
              <span className='text-left'>{staticText.travelFee}:</span>
              <span className='text-right'>${orderSummary.travelFee}</span>
              <span className='text-left'>{staticText.tax}:</span>
              <span className='text-right'>${orderSummary.tax}</span>
            </Typography>
            <Separator />
            <Typography
              variant='sm'
              className='grid grid-cols-2 gap-2 text-gray-600 mb-6'
            >
              <span className='text-left'>{staticText.totalDue}:</span>
              <span className='text-right'>${orderSummary.totalDue}</span>
            </Typography>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default BookingDetailsDialog;
