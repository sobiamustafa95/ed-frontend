import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

import { BookingStatus } from '@/@types/booking';
import { REQUEST_STATUS } from '@/constants';

interface ProgressBarProps {
  status: BookingStatus;
}

const steps = [
  { label: 'Booking Confirmed', status: BookingStatus.BOOKING_CONFIRMED },
  { label: 'Technician En Route', status: BookingStatus.TECH_EN_ROUTE },
  { label: 'In Progress', status: BookingStatus.IN_PROGRESS },
  { label: 'Invoice', status: REQUEST_STATUS.INVOICE },
  { label: 'Completed', status: BookingStatus.COMPLETED },
];

const ProgressBar: React.FC<ProgressBarProps> = ({ status }) => {
  const currentStepIndex = steps.findIndex((step) => step.status === status);

  return (
    <div className='flex flex-col items-center w-full'>
      {/* Progress Bar */}
      <div className='flex items-center w-full'>
        {steps.map((step, index) => (
          <div
            key={step.status}
            className='flex items-center justify-center relative flex-1'
          >
            {/* Step Icon */}
            <div
              className={`flex items-center z-10 justify-center w-5 h-5 rounded-full ${
                index <= currentStepIndex
                  ? 'bg-gray-100 text-primary ring-primary dark:bg-primary dark:text-primary'
                  : 'bg-gray-100 text-gray-500 ring-gray-200 dark:bg-gray-700 dark:text-SteelGray'
              }`}
            >
              {index <= currentStepIndex ? (
                <FaCheckCircle className='w-4 h-4' />
              ) : (
                <FaCheckCircle className='w-4 h-4' />
              )}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-1/2 -translate-y-1/2 left-14 h-1 ${
                  index < currentStepIndex
                    ? 'bg-primary text-white'
                    : 'bg-gray-300 text-white'
                }`}
                style={{ width: '100%' }}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className='flex justify-between w-full mt-4'>
        {steps.map((step, index) => (
          <div
            key={step.label}
            className='text-center flex-1 flex-wrap text-xs font-medium'
            style={{
              color: index <= currentStepIndex ? '#6666ff' : '#6b7280',
            }}
          >
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
