import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import {
  ForgotPasswordEmailField,
  IOtpFields,
  IUser,
  OtpFieldsResponseType,
} from '@/@types/auth';
import { MUTATION_STATUS } from '@/constants';
import { useGenericMutation } from '@/hooks/useMutationData';
import { strings } from '@/locales';
import { PUBLIC_ROUTES } from '@/routes';
import { forgotPassword, verifyOtp } from '@/services/auth';
import { formatEmailAddress } from '@/utils/common';
import { setTokenToSS } from '@/utils/sessionStorage';

import EmailSection from '../components/EmailSection';
import AuthHeadingsAndDesc from '../components/HeadingAndDesc';
import OtpSection from '../components/OtpSection';

const ForgotPassword = () => {
  const staticText = strings.forgotPasswordEmailScreen;

  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [timer, setTimer] = useState(0);
  const [otpStep, setOtpStep] = useState(false);
  const [status, setStatus] = useState<'error' | 'success' | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<ForgotPasswordEmailField>({
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const forgotPasswordMutation = useGenericMutation<
    ForgotPasswordEmailField,
    IUser | boolean
  >(forgotPassword, {
    onSuccess: (response) => {
      if (response) {
        toast.success(staticText.otpSend);
        setTimer(60);
        setOtpStep(true); // Show OTP screen immediately
        setEmail('sobia@geeksofkolachi.com');
      } else {
        // In case data is null but status is successful
        // toast.success(staticText.otpSend);
        setTimer(60);
        setOtpStep(true); // Ensure OTP screen is shown even when data is null
        setEmail('sobia@geeksofkolachi.com');
      }
    },
  });

  const otpMutation = useGenericMutation<
    IOtpFields,
    OtpFieldsResponseType | boolean
  >(verifyOtp, {
    onError: (error) => {
      setStatus('error');
      toast.error((error as AxiosError).message);
    },
    onSuccess: (response) => {
      if (typeof response === 'object') {
        setStatus('success');
        toast.success(staticText.otpVerified);
        setTokenToSS(response.accessToken);
        setTimeout(() => {
          navigate(PUBLIC_ROUTES.SET_NEW_PASSWORD);
        }, 1000);
      }
    },
  });

  const handleSubmitEmail: SubmitHandler<ForgotPasswordEmailField> = (data) => {
    forgotPasswordMutation.mutate(data);
  };

  const handleOtpSubmit = () => {
    const payload = {
      email,
      otp: Number(otp),
    };
    otpMutation.mutate(payload);
  };

  const handleResend = () => {
    forgotPasswordMutation.mutate({ email });
    setOtp('');
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  useEffect(() => {
    if (status) setStatus(null);
  }, [otp.length]);

  return (
    <>
      <AuthHeadingsAndDesc
        title={staticText.title}
        desc={
          otpStep
            ? staticText.descWithEmail.replace(
                '{{emailAddress}}',
                formatEmailAddress(email),
              )
            : staticText.desc
        }
      />
      {otpStep ? (
        <OtpSection
          otp={otp}
          setOtp={setOtp}
          status={status}
          timer={timer}
          handleOtpSubmit={handleOtpSubmit}
          handleResend={handleResend}
          mutationStatus={forgotPasswordMutation.status}
        />
      ) : (
        <EmailSection
          control={control}
          errors={isSubmitted ? errors : {}}
          handleSubmit={handleSubmit(handleSubmitEmail)}
          isLoading={forgotPasswordMutation.status === MUTATION_STATUS.PENDING}
        />
      )}
    </>
  );
};

export default ForgotPassword;
