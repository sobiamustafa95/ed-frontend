import React from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';

import FormField from '@/components/FormField';

interface IFormFieldProps<T extends FieldValues> {
  title: string;
  name: Path<T>;
  placeholder: string;
  control: Control<T>;
  rules?: Record<string, unknown>;
  errors: FieldErrors<T>;
}

const FormInput = <T extends FieldValues>({
  title,
  name,
  placeholder,
  control,
  rules,
  errors,
}: IFormFieldProps<T>) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange, value } }) => (
      <FormField
        title={title}
        name={name}
        value={value}
        isRequired={!!rules?.required}
        onChange={onChange}
        errors={errors}
        placeholder={placeholder}
      />
    )}
  />
);

export default FormInput;
