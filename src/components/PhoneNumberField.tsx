import React, { useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import PhoneInput, { Country } from 'react-phone-number-input';

import { cn } from '@/lib/utils';
import { ErrorMessage as HookFormErrorMessage } from '@hookform/error-message';

import { Typography } from './Typography';

import 'react-phone-number-input/style.css';

interface PhoneNumberFieldProps {
  title?: string;
  name: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  labelClassName?: string;
  containerClassName?: string;
  isRequired?: boolean;
  errors?: FieldErrors;
  defaultCountry?: Country;
  isAuthField?: boolean;
}

const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
  title,
  name,
  value,
  onChange,
  placeholder = 'Phone Number',
  labelClassName,
  containerClassName,
  isAuthField = false,
  errors,
  defaultCountry = 'US',
  isRequired,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        'flex flex-col',
        isAuthField ? 'relative w-full my-1' : 'my-2',
        containerClassName,
      )}
    >
      {title && (
        <Typography
          variant='sm'
          className={cn(
            isAuthField
              ? 'absolute text-xs left-3 z-10 -top-2 bg-white px-1'
              : 'mb-2',
            isFocused ? 'text-primary' : 'text-millionGrey',
            labelClassName,
          )}
        >
          {title}
          {isRequired ? (
            <span className='text-tomatoRed text-sm'>*</span>
          ) : null}
        </Typography>
      )}
      <PhoneInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultCountry={defaultCountry}
        international
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        isRequired={isRequired}
        className={cn(
          'custom-phone-input h-10 w-full px-3 py-2 border-2 rounded-md focus:outline-none !focus:border-primary text-black peer',
          isAuthField && 'border-greyWhite rounded-lg',
        )}
      />

      {errors?.[name] && (
        <div className='h-5'>
          <HookFormErrorMessage
            errors={errors}
            name={name}
            render={({ message }: { message: string }) => (
              <p className='text-tomatoRed text-xs xl:text-xs'>{message}</p>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default PhoneNumberField;
