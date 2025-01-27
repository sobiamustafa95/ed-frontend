import React, { useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { FIELD_TYPES } from '@/constants';
import { strings } from '@/locales';
import { ErrorMessage as HookFormErrorMessage } from '@hookform/error-message';

import { cn } from 'src/lib/utils';

import { Input } from './ui/input';
import { Typography } from './Typography';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  placeholder?: string;
  labelClassName?: string;
  containerClassName?: string;
  name: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  errors?: FieldErrors;
  hideIcon?: boolean;
  isAuthField?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  placeholder,
  name,
  value,
  labelClassName,
  containerClassName,
  onChange,
  isAuthField = false,
  errors,
  hideIcon = false,
  type = FIELD_TYPES.TEXT,
  isRequired,
  ...props
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(
    type === FIELD_TYPES.PASSWORD,
  );
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordHidden((prev) => !prev);
  };

  const inputType =
    type === FIELD_TYPES.PASSWORD && isPasswordHidden
      ? FIELD_TYPES.PASSWORD
      : FIELD_TYPES.TEXT;

  return (
    <div
      className={cn(
        'flex flex-col',
        isAuthField ? 'relative w-full my-1' : 'my-2',
        containerClassName,
      )}
    >
      <div className={cn(isAuthField ? 'relative w-full my-1' : 'my-2')}>
        {title && (
          <Typography
            className={cn(
              'block text-black px-1 text-sm mb-2',
              isAuthField &&
                `absolute text-xs left-3 mb-0 transition-all duration-200 ease-in-out text-millionGrey z-10 ${
                  isFocused || value
                    ? '-top-2 bg-white text-primary'
                    : 'top-1/2 transform -translate-y-1/2'
                }`,
              labelClassName,
            )}
          >
            {title}
            {isRequired ? (
              <span className='text-tomatoRed text-sm'>*</span>
            ) : null}
          </Typography>
        )}

        <div className='relative'>
          <Input
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={60}
            type={inputType}
            className={cn(
              'h-10 w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-primary text-black peer',
              isAuthField && 'border-greyWhite rounded-lg',
            )}
            {...props}
          />
          {type === FIELD_TYPES.PASSWORD && !hideIcon && (
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 text-millionGrey focus:outline-none'
              aria-label={
                isPasswordHidden
                  ? strings.signIn.showPassword
                  : strings.signIn.hidePassword
              }
            >
              {isPasswordHidden ? <FiEye size={16} /> : <FiEyeOff size={16} />}
            </button>
          )}
        </div>
      </div>

      {errors?.[name] ? (
        <div className='h-5'>
          <HookFormErrorMessage
            errors={errors}
            name={name}
            render={({ message }: { message: string }) => (
              <p className='text-tomatoRed text-xs xl:text-xs'>{message}</p>
            )}
          />
        </div>
      ) : null}
    </div>
  );
};

export default FormField;
