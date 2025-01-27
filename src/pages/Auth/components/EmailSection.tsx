import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import { ForgotPasswordEmailField } from '@/@types/auth';
import FormField from '@/components/FormField';
import { Button } from '@/components/ui/button';
import { strings } from '@/locales';
import { EmailRegex } from '@/utils/common';

interface EmailSectionProps {
  control: Control<ForgotPasswordEmailField>;
  errors: FieldErrors;
  handleSubmit: () => void;
  isLoading: boolean;
}

const EmailSection: React.FC<EmailSectionProps> = ({
  control,
  errors,
  handleSubmit,
  isLoading,
}) => {
  const staticText = strings.forgotPasswordEmailScreen;
  const errorMessage = strings.errors;
  return (
    <div className='space-y-4'>
      <Controller
        control={control}
        name='email'
        rules={{
          required: errorMessage.email.required,
          pattern: {
            value: EmailRegex,
            message: errorMessage.email.pattern,
          },
        }}
        render={({ field: { onChange, value, name } }) => (
          <FormField
            title={staticText.email}
            name={name}
            value={value}
            isRequired
            isAuthField
            onChange={onChange}
            errors={errors}
          />
        )}
      />
      <Button
        onClick={handleSubmit}
        className='text-base w-full h-12'
        disabled={isLoading}
      >
        {staticText.resendOtp}
      </Button>
    </div>
  );
};

export default EmailSection;
