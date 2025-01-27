import * as React from 'react';
import { FieldErrors } from 'react-hook-form';

import { strings } from '@/locales';
import { ErrorMessage as HookFormErrorMessage } from '@hookform/error-message';

import { cn } from 'src/lib/utils';

import { Typography } from '../Typography';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errors?: FieldErrors;
  name: string;
  title?: string;
  isRequired?: boolean;
  labelClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      name,
      errors,
      placeholder,
      title,
      isRequired,
      labelClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <div className='my-2'>
        {title && (
          <Typography
            className={cn(
              'block text-black px-1 !text-sm !mb-2 !mt-0',
              labelClassName,
            )}
          >
            {title}
            {isRequired ? (
              <span className='text-tomatoRed text-sm'>*</span>
            ) : null}
          </Typography>
        )}
        <textarea
          placeholder={strings.technicianDetails.placeholder || placeholder}
          className={cn(
            'w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-primary text-SteelGray peer !mt-0',
            className,
          )}
          ref={ref}
          {...props}
        />
        {errors?.[name] && (
          <div className='h-5'>
            <HookFormErrorMessage
              errors={errors}
              name={name || ''}
              render={({ message }) => (
                <p className='text-tomatoRed text-xs mx-3'>{message}</p>
              )}
            />
          </div>
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
