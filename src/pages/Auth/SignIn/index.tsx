import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  Controller,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { ILoginResponse, ISignInFields, IUser } from '@/@types/auth';
import FormField from '@/components/FormField';
import Loader from '@/components/Loader';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useGenericMutation } from '@/hooks/useMutationData';
import { strings } from '@/locales';
import { useAuth } from '@/provider/AuthProvider';
import { PUBLIC_ROUTES, ROUTES } from '@/routes';
import { login } from '@/services/auth';
import { EmailRegex, validateNewPasswordFields } from '@/utils/common';
import { setUserDetailToLS } from '@/utils/localstorage';

import AuthHeadingsAndDesc from '../components/HeadingAndDesc';

const SignIn = () => {
  const staticText = strings.signIn;
  const errorMessage = strings.errors;

  const navigate = useNavigate();
  const { setUser, token, setToken } = useAuth();
  const [cookies, setCookie] = useCookies(['email', 'token']);
  const [isRemember, setIsRemember] = useState(false);

  const toggleRemember = () => setIsRemember(!isRemember);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<ISignInFields>({
    mode: 'all',
    defaultValues: {
      email: cookies.email || '',
      password: '',
    },
  });

  const { newPasswordRules } = validateNewPasswordFields(watch('password'));

  const loginMutation = useGenericMutation<
    ISignInFields,
    ILoginResponse | boolean
  >(login, {
    onSuccess: (response) => {
      if (typeof response === 'object') {
        // const { token, user } = response as ILoginResponse;
        if (token) {
          console.log('Token already exists:', token);
          setToken(token); // Update token and authentication state
          // setCookie('token', token, { path: '/' });
        }
        // Save user details
        setUser(response as IUser);
        toast.success(staticText.success);
        setUserDetailToLS(response as IUser);
        // Save email if "Remember Me" is checked
        if (isRemember) {
          setCookie('email', response.user.email, { path: '/' });
        }
        toast.success(staticText.success);
        navigate(ROUTES.BOOKINGS, { replace: true });
      }
    },
    onError: (err) => {
      console.error('Error during login:', err);
      toast.error('Login failed. Please check your credentials.');
    },
  });

  const handleSignIn: SubmitHandler<ISignInFields> = (formData) => {
    loginMutation.mutate(formData);
  };

  return (
    <>
      <AuthHeadingsAndDesc title={staticText.title} desc={staticText.desc} />
      <div className='space-y-2'>
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
              onChange={onChange}
              type='email'
              errors={isSubmitted ? errors : {}}
              isAuthField
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          rules={newPasswordRules as RegisterOptions<ISignInFields, 'password'>}
          render={({ field: { onChange, value, name } }) => (
            <FormField
              title={staticText.password}
              name={name}
              value={value}
              onChange={onChange}
              type='password'
              errors={errors}
              isAuthField
            />
          )}
        />
        <div className='flex justify-between pb-1'>
          <div className='flex items-center gap-1'>
            <Checkbox onClick={toggleRemember} />
            <Typography className='text-oceanBlue'>
              {staticText.rememberMe}
            </Typography>
          </div>
          <div
            className='text-sm font-semibold text-primary cursor-pointer'
            onClick={() => navigate(PUBLIC_ROUTES.FORGOT_PASSWORD)}
          >
            {staticText.forgotPass}
          </div>
        </div>
        <Button
          className='text-base font-semibold w-full h-10'
          onClick={handleSubmit(handleSignIn)}
          disabled={loginMutation.status === 'pending'}
        >
          {loginMutation.status === 'pending' ? <Loader /> : staticText.btnText}
        </Button>
      </div>
    </>
  );
};

export default SignIn;
