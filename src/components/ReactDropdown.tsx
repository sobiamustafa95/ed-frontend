import React, { useMemo, useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { GoChevronDown } from 'react-icons/go';
import Creatable from 'react-select/creatable';
import { AsyncPaginate } from 'react-select-async-paginate';

import { IDropdownOption } from '@/@types';
import { cn } from '@/lib/utils';
import { ErrorMessage as HookFormErrorMessage } from '@hookform/error-message';

import { customStyles } from './customStyle';
import { Typography } from './Typography';

interface ReactDropdownProps {
  title?: string;
  defaultValue?: string | IDropdownOption;
  options?: IDropdownOption[] | string[];
  placeholder?: string | React.ReactNode;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  creatable?: boolean;
  name: string;
  className?: string;
  titleClassName?: string;
  onChange?: (value: IDropdownOption | string) => void;
  errors?: FieldErrors;
  isAuthField?: boolean;
}

const CustomDropdownIndicator = () => {
  return (
    <div className='px-2 text-primary'>
      <GoChevronDown size={20} />
    </div>
  );
};

const ReactDropdown: React.FC<ReactDropdownProps> = ({
  title,
  defaultValue,
  options = [],
  placeholder,
  isSearchable = false,
  isDisabled = false,
  isLoading = false,
  creatable = false,
  name,
  className,
  titleClassName,
  onChange,
  errors,
  isAuthField,
  isRequired,
}) => {
  const normalizedOptions = useMemo(() => {
    return options.map((opt) =>
      typeof opt === 'string' ? { label: opt, value: opt } : opt,
    );
  }, [options]);
  const initializeSelectedValue = () => {
    if (!defaultValue) {
      return null;
    }
    if (typeof defaultValue === 'string') {
      return { label: defaultValue, value: defaultValue };
    }
    return defaultValue;
  };
  const [isFocused, setIsFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState<IDropdownOption | null>(
    initializeSelectedValue,
  );

  const handleChange = (selected: IDropdownOption | null) => {
    setSelectedValue(selected);
    if (onChange) onChange(selected ? selected.value : '');
  };
  const loadOptions = (search: string) => {
    const filteredOptions = normalizedOptions.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );
    return {
      options: filteredOptions,
    };
  };

  const commonProps = {
    styles: customStyles,
    placeholder,
    isSearchable,
    isDisabled,
    isLoading,
    components: { DropdownIndicator: CustomDropdownIndicator },
    onChange: handleChange,
    defaultValue: selectedValue,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    isRequired,
  };

  return (
    <div
      className={cn(
        'flex flex-col',
        isAuthField ? 'relative w-full' : 'my-2',
        className,
      )}
    >
      {title && (
        <Typography
          variant='sm'
          className={cn(
            'block text-black px-1 text-sm',
            isAuthField
              ? 'absolute text-xs left-3 z-10 -top-2 bg-white px-1 text-millionGrey'
              : 'mb-2',
            isFocused ? 'text-primary' : '',
            titleClassName,
          )}
        >
          {title}
          {isRequired ? (
            <span className='text-tomatoRed text-sm'>*</span>
          ) : null}
        </Typography>
      )}
      {creatable ? (
        <Creatable options={normalizedOptions} {...commonProps} />
      ) : (
        <AsyncPaginate
          loadOptions={loadOptions}
          additional={{ page: 1 }}
          {...commonProps}
        />
      )}
      {errors?.[name] ? (
        <div className='h-5'>
          <HookFormErrorMessage
            errors={errors}
            name={String(name)}
            render={({ message }) => (
              <p className='text-tomatoRed text-xs'>{message}</p>
            )}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ReactDropdown;
