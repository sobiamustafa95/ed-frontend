import React from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';

import FormField from '@/components/FormField';
import PhoneNumberField from '@/components/PhoneNumberField';
import ReactDropdown from '@/components/ReactDropdown';
import { USER_ROLE } from '@/constants';

interface SignUpFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  rules?: Record<string, unknown>;
  type?: string;
  options?: USER_ROLE[];
  placeholder?: string;
}

const SignUpFormField = <T extends FieldValues>({
  name,
  control,
  errors,
  rules,
  type,
  options,
  placeholder,
}: SignUpFormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => {
        if (name === 'role') {
          return (
            <ReactDropdown
              name={name}
              options={options || []}
              onChange={onChange}
              title={placeholder || ''}
              placeholder={placeholder || ''}
              errors={errors}
              isAuthField
            />
          );
        }
        if (name === 'phoneNumber') {
          return (
            <PhoneNumberField
              name={name as string}
              title={placeholder || ''}
              value={value}
              onChange={onChange}
              errors={errors}
              isAuthField
            />
          );
        }
        return (
          <FormField
            name={name as string}
            title={placeholder || ''}
            value={value}
            onChange={onChange}
            errors={errors}
            type={type || 'text'}
            isAuthField
          />
        );
      }}
    />
  );
};

export default SignUpFormField;
