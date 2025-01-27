/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { BookingStatus } from '@/@types/booking';
import ProfileBadge from '@/components/ProfileBadge';
import StarRating from '@/components/StarRating';
import StatusModal from '@/components/StatusModal';
import { Typography } from '@/components/Typography';
import { Textarea } from '@/components/ui/textarea';
import { MUTATION_STATUS, REQUEST_DETAIL_FIELDS } from '@/constants';
import { bookingDetails } from '@/constants/dummyData';
import { strings } from '@/locales';

interface JobCompletedProps {
  isOpen: boolean;
  onPrimaryAction: () => void;
}

const JobCompleted: React.FC<JobCompletedProps> = ({
  isOpen,
  onPrimaryAction,
}) => {
  const staticText = strings.jobCompleted;
  const {
    control,
    formState: { errors },
  } = useForm();

  return (
    <div>
      {bookingDetails.progress === BookingStatus.COMPLETED && (
        <StatusModal
          isOpen={isOpen}
          heading={staticText.title}
          onSecondaryAction={onPrimaryAction}
          secondaryButtonText={staticText.submitBtn}
          status={MUTATION_STATUS.SUCCESS}
          customClass='w-full'
          headingClassName='text-3xl'
        >
          <ProfileBadge
            name={'Joe Doe'}
            profilePicture='https://picsum.photos/200/300'
            nameClassName='text-black text-xl'
            avatarClassName='w-16 h-16'
          />
          <div className='grid grid-cols-2 gap-1 px-4'>
            {REQUEST_DETAIL_FIELDS.map((field, index) => (
              <div key={index} className='flex'>
                <Typography variant='sm' className='font-semibold'>
                  {field.label}:{' '}
                </Typography>
                <Typography variant='sm' className='text-primary'>
                  dummy value
                  {/* {REQUEST_DETAIL_FIELDS[field.key]} */}
                </Typography>
              </div>
            ))}
          </div>
          <Typography variant='p' className='flex font-semibold justify-center'>
            {staticText.desc}
          </Typography>
          <div>
            <Typography variant='sm' className='font-semibold'>
              {staticText.rating}
            </Typography>
            <StarRating isInteractive onRatingChange={() => {}} />
          </div>
          <Controller
            control={control}
            name='notes'
            render={({ field: { onChange, value } }) => (
              <Textarea
                title={staticText.feedback}
                name='feedback'
                labelClassName='text-xs font-semibold'
                value={value}
                onChange={onChange}
                placeholder={staticText.placeholder}
                className='h-20 text-xs'
                rows={4}
                errors={errors}
              />
            )}
          />
        </StatusModal>
      )}
    </div>
  );
};

export default JobCompleted;
