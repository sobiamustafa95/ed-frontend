import React from 'react';
import OtpInput from 'react-otp-input';

import Loader from '@/components/Loader';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { MUTATION_STATUS } from '@/constants';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';

interface IOtpSectionProps {
  otp: string;
  setOtp: (otp: string) => void;
  status: 'error' | 'success' | null;
  timer: number;
  handleOtpSubmit: () => void;
  handleResend: () => void;
  mutationStatus: string;
}

const OtpSection: React.FC<IOtpSectionProps> = ({
  otp,
  setOtp,
  status,
  timer,
  handleOtpSubmit,
  handleResend,
  mutationStatus,
}) => {
  const staticText = strings.forgotPasswordEmailScreen;

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
  };

  return (
    <div>
      <div className='flex justify-center'>
        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          containerStyle='otp-input flex items-center justify-center gap-2 md:gap-4 w-full'
          inputStyle={cn(
            'rounded-md flex-grow focus:outline-primary bg-white border-greyWhite border h-8 xl:h-12 text-center text-lg',
            {
              'outline outline-greenRevolution': status === 'success',
              'outline outline-tomatoRed': status === 'error',
            },
          )}
          numInputs={4}
          skipDefaultStyles
          renderInput={(props) => (
            <input
              {...props}
              className={cn(
                'flex-grow basis-[30px] max-w-8 xl:min-w-8 xl:max-w-[50px]',
                props.className,
              )}
            />
          )}
        />
      </div>
      <span className='w-full flex justify-center pt-3'>{timer}s</span>
      <div className='flex mt-2 justify-between items-center'>
        {mutationStatus === MUTATION_STATUS.PENDING ? (
          <Loader />
        ) : (
          <div className='flex justify-between w-full'>
            <Typography variant='p' className='text-millionGrey'>
              {staticText.didtGetCode}
            </Typography>
            <span
              onClick={handleResend}
              className={cn(
                'text-primary text-sm md:text-base font-normal leading-[27px] cursor-pointer hidden',
                {
                  'block ':
                    timer === 0 &&
                    (mutationStatus === 'success' || mutationStatus === 'idle'),
                },
              )}
            >
              {staticText.resendOtp}
            </span>
          </div>
        )}
      </div>
      <Button
        onClick={handleOtpSubmit}
        className='text-base mt-4 w-full h-12'
        disabled={otp.length < 4}
      >
        {staticText.btnText}
      </Button>
    </div>
  );
};

export default OtpSection;
