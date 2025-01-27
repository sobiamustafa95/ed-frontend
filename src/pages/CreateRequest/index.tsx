/* eslint-disable max-lines */
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  IAttachment,
  IBookingDetails,
  ICreateBookingResponse,
  SERVICE_CATEGORY,
  URGENCY,
} from '@/@types/booking';
import Attachments from '@/components/Attachment';
import Loader from '@/components/Loader';
import Map from '@/components/Map';
import StatusModal from '@/components/StatusModal';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MUTATION_STATUS } from '@/constants';
import { strings } from '@/locales';
import { useUploadFileContext } from '@/provider/UploadFileProvider';
import { ROUTES } from '@/routes';
import { createBooking } from '@/services/booking';

import FormDropdown from './components/FormDropdown';
import FormInput from './components/FormInput';

const RepairRequestForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const staticText = strings.createRequest;
  const errorMessage = strings.errors.createRequest;
  const { uploadFilesHandler } = useUploadFileContext();
  console.log('this is the log:', uploadFilesHandler);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<ICreateBookingResponse>({
    defaultValues: {
      bookingDetails: {
        machineryType: '',
        repairIssue: '',
        serviceCategory: undefined,
        urgency: undefined,
        notes: '',
        address: '',
        location: { lat: '0', lng: '0' },
        attachment: [],
      },
    },
  });

  const onSubmit = async (formState: ICreateBookingResponse) => {
    const formattedAttachments = (
      formState.bookingDetails.attachment || []
    ).map((file) => {
      if (file instanceof File) {
        return {
          name: file.name,
          url: 'https://picsum.photos/seed/picsum/200/300', // Dummy URL for testing
        };
      }
      return file;
    });

    const bookingDetails: IBookingDetails = {
      machineryType: formState.bookingDetails.machineryType,
      repairIssue: formState.bookingDetails.repairIssue,
      serviceCategory:
        formState.bookingDetails.serviceCategory ||
        SERVICE_CATEGORY.NOT_SPECIFIED,
      urgency: formState.bookingDetails.urgency || URGENCY.LOW,
      notes: formState.bookingDetails.notes || '',
      address: formState.bookingDetails.address,
      location: {
        lat: formState.bookingDetails.location.lat,
        lng: formState.bookingDetails.location.lng,
      },
      attachment: formattedAttachments,
    };

    setLoading(true);

    const result = await createBooking({ bookingDetails });
    console.log('result is', result);
    setLoading(false);
    if (result) {
      console.log('in result');
      setIsModalOpen(true);
      reset();
    }
  };

  const handleAttachmentsChange = (attachments: IAttachment[]) => {
    setValue('bookingDetails.attachment', attachments);
  };

  const handleModalClose = () => {
    reset();
    setIsModalOpen(false);
  };

  const serviceCategoryOptions = Object.entries(SERVICE_CATEGORY).map(
    ([key, value]) => ({
      label: value,
      value: key,
    }),
  );

  const urgencyOptions = Object.entries(URGENCY).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='overflow-auto max-h-[77vh] scrollbarHidden'
      >
        <div className='flex flex-col items-start gap-2 sticky top-0 bg-white z-10 b-2'>
          <Typography variant='subheading'>{staticText.title}</Typography>
          <Typography variant='md'>{staticText.desc}</Typography>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 h-auto'>
          <FormInput
            title='Machinery Type'
            name={'bookingDetails.machineryType'}
            placeholder='Type Here'
            control={control}
            rules={{ required: errorMessage.machineTypeRequired }}
            errors={errors}
          />
          <FormInput
            title='Repair Issue'
            name='bookingDetails.repairIssue'
            placeholder='Type Here'
            control={control}
            rules={{ required: errorMessage.repairIssueRequired }}
            errors={errors}
          />
          <FormDropdown
            title='Service Category'
            name='bookingDetails.serviceCategory'
            options={serviceCategoryOptions}
            control={control}
            rules={{ required: errorMessage.serviceCategoryRequired }}
            errors={errors}
          />
          <FormDropdown
            title='Urgency'
            name='bookingDetails.urgency'
            options={urgencyOptions}
            control={control}
            rules={{ required: errorMessage.urgencyRequired }}
            errors={errors}
          />
        </div>
        <Controller
          control={control}
          name='bookingDetails.notes'
          render={({ field: { onChange, value } }) => (
            <Textarea
              title='Notes'
              name='notes'
              value={value}
              onChange={onChange}
              errors={errors}
              placeholder='Type Here'
              className='h-20'
            />
          )}
        />
        <Map
          errors={errors}
          control={control}
          address={watch('bookingDetails.address')}
          setValue={setValue}
          onLocationChange={(address, lat, lng) => {
            setValue('bookingDetails.address', address);
            setValue('bookingDetails.location.lat', lat);
            setValue('bookingDetails.location.lng', lng);
          }}
        />

        <Attachments onAttachmentsChange={handleAttachmentsChange} />
        <div className='flex justify-end mb-6'>
          <Button type='submit' disabled={loading}>
            {loading ? (
              <Typography variant='sm' className='px-6'>
                <Loader />
              </Typography>
            ) : (
              staticText.btnText
            )}
          </Button>
        </div>
      </form>

      <StatusModal
        isOpen={isModalOpen}
        heading={staticText.requestResponse}
        description={staticText.requestDetails}
        primaryButtonText={staticText.viewBookDetails}
        secondaryButtonText={staticText.close}
        onSecondaryAction={handleModalClose}
        onPrimaryAction={() => navigate(ROUTES.BOOKINGS)}
        status={MUTATION_STATUS.SUCCESS}
        customClass='max-w-md'
      />
    </>
  );
};

export default RepairRequestForm;
