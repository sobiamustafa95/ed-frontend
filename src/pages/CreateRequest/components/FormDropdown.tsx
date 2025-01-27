import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';

import ReactDropdown from '@/components/ReactDropdown';

interface DropdownOption {
  label: string;
  value: string;
}

interface FormDropdownProps<T extends FieldValues> {
  title: string;
  name: Path<T>;
  options: DropdownOption[];
  // value: string | null; // Value should be string or null, no DropdownOption type
  control: Control<T>;
  rules?: Record<string, unknown>;
  errors: FieldErrors<T>;
}

const FormDropdown = <T extends FieldValues>({
  title,
  name,
  options,
  control,
  rules,
  errors,
  // value,
}: FormDropdownProps<T>) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange } }) => (
      <ReactDropdown
        title={title}
        name={name}
        options={options}
        placeholder='Select'
        isRequired={!!rules?.required}
        // defaultValue={value || ''}
        onChange={(selected: string | DropdownOption) => {
          if (typeof selected === 'string') {
            onChange(selected);
          } else {
            onChange(selected.value);
          }
        }}
        errors={errors}
      />
    )}
  />
);

export default FormDropdown;
