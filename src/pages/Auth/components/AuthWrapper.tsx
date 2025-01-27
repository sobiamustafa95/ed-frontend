import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FacebookIcon from '@/assets/svgs/Facebook.svg';
import GoogleIcon from '@/assets/svgs/google.svg';
import Logo from '@/assets/svgs/logoBlack.svg';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { strings } from '@/locales';
import { PUBLIC_ROUTES } from '@/routes';

import { CarouselPlugin } from './Carousel';
import LineForOrOption from './LineForOrOption';

interface IAuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<IAuthWrapperProps> = ({ children }) => {
  const staticText = strings.signIn;
  const signupText = strings.signUp;
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginOrSignup =
    location.pathname === PUBLIC_ROUTES.LOGIN ||
    location.pathname === PUBLIC_ROUTES.SIGNUP;

  const showCarousel = location.pathname !== PUBLIC_ROUTES.TECHNICIAN_DETAILS;

  let dynamicText = null;

  if (location.pathname === PUBLIC_ROUTES.LOGIN) {
    dynamicText = (
      <Typography variant='md' className='flex justify-center w-full pt-8'>
        {staticText.needAnAccount}
        &nbsp;
        <div
          className='cursor-pointer text-primary'
          onClick={() => navigate(PUBLIC_ROUTES.SIGNUP)}
        >
          {staticText.signUp}
        </div>
      </Typography>
    );
  } else if (location.pathname === PUBLIC_ROUTES.SIGNUP) {
    dynamicText = (
      <Typography variant='md' className='text-center w-full lg:pt-6'>
        {signupText.alreadyHaveAnAccount}
        &nbsp;
        <div
          className='cursor-pointer text-primary'
          onClick={() => navigate(PUBLIC_ROUTES.LOGIN)}
        >
          {signupText.signIn}
        </div>
      </Typography>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 ${
        showCarousel ? 'md:grid-cols-[45%_55%]' : 'md:grid-cols-1'
      } md:h-screen h-full`}
    >
      <div
        className={
          'w-11/12 lg:w-3/5 mx-auto pt-6 lg:pt-12 flex flex-col justify-between pb-1 md:pb-2'
        }
      >
        <div className='my-auto'>
          <img src={Logo} alt='Logo' className='mb-4 xl:mb-6 h-5 xl:h-7' />
          {children}
          {isLoginOrSignup ? (
            <>
              <LineForOrOption />
              <div className='flex flex-col items-center'>
                <div className='flex flex-col md:flex-row justify-center w-full gap-2'>
                  <Button className='text-xs font-semibold w-full h-10 border bg-white border-greyWhite text-black hover:bg-teleGrey'>
                    <img src={GoogleIcon} alt='google' className='ml-1' />
                    {staticText.googleSignIn}
                  </Button>
                  <Button className='text-xs font-semibold w-full h-10 border bg-white border-greyWhite text-black hover:bg-teleGrey'>
                    <img src={FacebookIcon} alt='facebook' className='ml-1' />
                    {staticText.facebookSignIn}
                  </Button>
                </div>
                {dynamicText}
              </div>
            </>
          ) : (
            showCarousel && (
              <Button
                variant='outline'
                className='text-sm mt-4 font-semibold w-full h-10 border bg-white border-primary text-primary'
                onClick={() => navigate(PUBLIC_ROUTES.LOGIN)}
              >
                {signupText.backTo}
              </Button>
            )
          )}
        </div>
      </div>
      {showCarousel && (
        <div className='md:flex flex-col h-full bg-slate-500 justify-between overflow-hidden hidden'>
          <CarouselPlugin />
        </div>
      )}
    </div>
  );
};
export default AuthWrapper;
