import React, { useEffect } from 'react';
import {
  Controller,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { IResetPasswordFields, ISetNewPasswordFields } from '@/@types/auth';
import FormField from '@/components/FormField';
import { Button } from '@/components/ui/button';
import { useGenericMutation } from '@/hooks/useMutationData';
import { strings } from '@/locales';
import { PUBLIC_ROUTES } from '@/routes';
import { resetPassword } from '@/services/auth';
import { validateNewPasswordFields } from '@/utils/common';
import { clearStorage } from '@/utils/localstorage';

import AuthHeadingsAndDesc from '../components/HeadingAndDesc';

const SetNewPassword = () => {
  const staticText = strings.setNewPassScreen;

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<ISetNewPasswordFields>({
    mode: 'all',
    defaultValues: {
      password: '',
      reEnterPassword: '',
    },
  });

  const { newPasswordRules, confirmNewPasswordRules } =
    validateNewPasswordFields(watch('password'));

  const setNewPassMutation = useGenericMutation<
    IResetPasswordFields,
    string | boolean
  >(resetPassword, {
    onSuccess: (response) => {
      if (typeof response === 'string') {
        toast.success(response);
        navigate(PUBLIC_ROUTES.LOGIN);
        clearStorage();
      }
    },
  });

  const handleNewPassSubmit: SubmitHandler<ISetNewPasswordFields> = (
    formData,
  ) => {
    const payload = {
      newPassword: formData.password,
    };
    setNewPassMutation.mutate(payload);
  };

  useEffect(() => {
    if (watch('password') && watch('reEnterPassword')) {
      trigger('reEnterPassword');
    }
  }, [watch('password'), trigger]);

  return (
    <>
      <AuthHeadingsAndDesc title={staticText.title} desc={staticText.desc} />
      <div className='space-y-1'>
        <Controller
          control={control}
          name='password'
          rules={
            newPasswordRules as RegisterOptions<
              ISetNewPasswordFields,
              'password'
            >
          }
          render={({ field: { onChange, value, name } }) => (
            <FormField
              title={staticText.newPassword}
              name={name}
              value={value}
              isRequired
              onChange={onChange}
              type='password'
              errors={isSubmitted ? errors : {}}
              isAuthField
            />
          )}
        />
        <Controller
          control={control}
          name='reEnterPassword'
          rules={
            confirmNewPasswordRules as RegisterOptions<
              ISetNewPasswordFields,
              'reEnterPassword'
            >
          }
          render={({ field: { onChange, value, name } }) => (
            <FormField
              title={staticText.confirmPassword}
              name={name}
              value={value}
              type='password'
              isRequired
              onChange={onChange}
              errors={isSubmitted ? errors : {}}
              isAuthField
            />
          )}
        />
        <Button
          onClick={handleSubmit(handleNewPassSubmit)}
          className='text-sm w-full h-10'
          disabled={setNewPassMutation.status === 'pending'}
        >
          {staticText.btnText}
        </Button>
      </div>
    </>
  );
};

export default SetNewPassword;
