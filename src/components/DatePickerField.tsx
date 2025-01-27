import * as React from 'react';
import { FieldErrors } from 'react-hook-form';
import { HiMiniCalendarDays } from 'react-icons/hi2';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';
import { ErrorMessage as HookFormErrorMessage } from '@hookform/error-message';

import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Typography } from './Typography';

export interface Props {
  value: Date | undefined;
  setValue: React.Dispatch<React.SetStateAction<Date | undefined>>;
  containerClassName?: string;
  errors?: FieldErrors;
  name?: string;
  fromDate?: Date;
  toDate?: Date;
  disabled?: boolean;
}

export const DatePickerField: React.FC<Props> = ({
  value,
  setValue,
  containerClassName,
  errors,
  name,
  fromDate = new Date(),
  toDate = new Date('2100-12-31'),
  disabled,
}) => {
  const staticText = strings.common;

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'h-10 justify-start text-left font-normal text-xs rounded-lg text-millionGrey hover:text-millionGrey hover:bg-transparent border-greyWhite',
              containerClassName,
            )}
          >
            <HiMiniCalendarDays className='ml-2 size-4 shrink-0' />
            {value ? (
              format(value, 'PPP')
            ) : (
              <Typography variant='sm' className='text-millionGrey'>
                {staticText.select}
              </Typography>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='flex w-auto flex-col space-y-2 p-2'>
          <Calendar
            mode='single'
            selected={value}
            onSelect={setValue}
            fromDate={fromDate}
            toDate={toDate}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
      {errors && (
        <HookFormErrorMessage
          errors={errors}
          name={String(name)}
          render={({ message }) => (
            <p className='text-red-500 text-xs'>{message}</p>
          )}
        />
      )}
    </>
  );
};

export default DatePickerField;
