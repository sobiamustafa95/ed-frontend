import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import {
  ISignUpFields,
  ISignupRequest,
  ISignupResponse,
  IUser,
} from '@/@types/auth';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { USER_ROLE } from '@/constants';
import { useGenericMutation } from '@/hooks/useMutationData';
import { strings } from '@/locales';
import { useAuth } from '@/provider/AuthProvider';
import { PUBLIC_ROUTES, ROUTES } from '@/routes';
import { signup } from '@/services/auth';
import {
  EmailRegex,
  EnumToArray,
  PhoneRegex,
  validatePassword,
} from '@/utils/common';
import { setUserDetailToLS } from '@/utils/localstorage';

import AuthHeadingsAndDesc from '../components/HeadingAndDesc';
import SignUpFormField from '../components/SignUpFormField';

const SignUp = () => {
  const staticText = strings.signUp;
  const errorMessage = strings.errors;
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFields>({
    mode: 'all',
    defaultValues: {
      role: undefined,
      email: '',
      phoneNumber: '',
      password: '',
    },
  });

  const selectedRole = watch('role');

  const signupMutation = useGenericMutation<
    ISignupRequest,
    ISignupResponse | boolean
  >(signup, {
    onSuccess: (response) => {
      if (typeof response === 'object') {
        toast.success(staticText.success);
        setUser(response as IUser);
        setUserDetailToLS(response as IUser);
        if (response.role === USER_ROLE.TECHNICIAN) {
          navigate(PUBLIC_ROUTES.TECHNICIAN_DETAILS);
        } else {
          navigate(ROUTES.CREATE_BOOKING);
        }
      }
    },
  });

  const handleSignUp: SubmitHandler<ISignUpFields> = (formData) => {
    signupMutation.mutate(formData);
  };

  const renderButtonContent = () => {
    if (signupMutation.status === 'pending') {
      return <Loader />;
    }
    return selectedRole === USER_ROLE.TECHNICIAN
      ? staticText.continue
      : staticText.btnText;
  };

  return (
    <>
      <AuthHeadingsAndDesc title={staticText.title} desc={staticText.desc} />
      <div className='space-y-2'>
        <SignUpFormField
          name='role'
          control={control}
          errors={errors}
          rules={{
            required: errorMessage.role.required,
          }}
          options={EnumToArray(USER_ROLE) as USER_ROLE[]}
          placeholder={staticText.select}
        />
        <SignUpFormField
          name='email'
          control={control}
          errors={errors}
          rules={{
            required: errorMessage.email.required,
            pattern: {
              value: EmailRegex,
              message: errorMessage.email.pattern,
            },
          }}
          placeholder={staticText.email}
        />
        <SignUpFormField
          name='phoneNumber'
          control={control}
          errors={errors}
          rules={{
            required: strings.errors.phoneNumber.required,
            pattern: {
              value: PhoneRegex,
              message: strings.errors.phoneNumber.invalid,
            },
          }}
          placeholder={staticText.phone}
        />
        <SignUpFormField
          name='password'
          control={control}
          errors={errors}
          rules={{
            required: strings.errors.password.required,
            validate: validatePassword,
          }}
          type='password'
          placeholder={staticText.password}
        />
        <div>
          <Button
            className='!mt-1 text-base font-semibold w-full h-10'
            onClick={handleSubmit(handleSignUp)}
            disabled={signupMutation.status === 'pending'}
          >
            {renderButtonContent()}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
