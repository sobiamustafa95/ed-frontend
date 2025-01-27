import React from 'react';
import { PencilIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { strings } from '@/locales';

const ManagePaymentMethod: React.FC = () => {
  const staticText = strings.managePaymentMethods;

  return (
    <div className='max-w-xl p-6 bg-gray-50 rounded-xl'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-lg font-semibold text-gray-800'>
          {staticText.title}
        </h1>
        <Button variant='default' className='text-white'>
          {staticText.addNew}
        </Button>
      </div>

      {/* Payment Method Item */}
      <div className='border border-gray-300 rounded-md bg-white p-4'>
        <div className='flex justify-between items-center'>
          {/* Left Section: Checkbox and Name */}
          <div className='flex items-center gap-3'>
            <Checkbox className='rounded-md' />
            <span className='text-indigo-600 font-medium'>
              {staticText.paymentMethod}
            </span>
          </div>

          {/* Right Section: Action Icons */}
          <div className='flex items-center'>
            <Button className='text-red-500 bg-transparent'>
              <TrashIcon className='w-5 h-5' />
            </Button>
            <Button className='text-primary bg-transparent'>
              <PencilIcon className='w-5 h-5' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePaymentMethod;
