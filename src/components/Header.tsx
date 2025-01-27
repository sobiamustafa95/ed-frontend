import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

import { USER_TYPE } from '@/constants';
import { cn } from '@/lib/utils';
import { useAuth } from '@/provider/AuthProvider';
import { useSidebarContext } from '@/provider/SidebarProvider';
import { ROUTES } from '@/routes';
import { getUsernameFromEmail, snakeToTitleCase } from '@/utils/common';

import Logo from '../assets/svgs/logo.svg';

import { Button } from './ui/button';
import ProfileBadge from './ProfileBadge';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setSidebarExpand, sidebarExpand, isSmallScreen } =
    useSidebarContext();
  const { avatar, role: profileType } = user || {};

  return (
    <div className='relative'>
      <div
        className={cn(
          'flex justify-between items-center w-full px-4 md:px-8 h-[72px] bg-primary border-b-greyWhite border-b',
          { 'justify-end': sidebarExpand },
        )}
      >
        <div
          className={cn('w-[100px] md:hidden', {
            hidden: isSmallScreen && sidebarExpand,
          })}
          onClick={() => navigate(ROUTES.BOOKINGS)}
        >
          <img src={Logo} alt='Logo' />
        </div>
        <Button
          variant='ghost'
          size='icon'
          className={cn('size-8 ', {
            hidden: sidebarExpand || isSmallScreen,
          })}
          onClick={() => setSidebarExpand((prev) => !prev)}
        />
        <div className='flex gap-4 md:gap-8 justify-between items-center'>
          <RxHamburgerMenu
            className='md:hidden text-white'
            onClick={() => setSidebarExpand(true)}
          />
          <ProfileBadge
            name={getUsernameFromEmail(user?.email || '')}
            profilePicture={avatar as string}
            attribute={snakeToTitleCase(
              (profileType === USER_TYPE.ADMIN
                ? USER_TYPE.ADMIN
                : profileType
              )?.toLowerCase(),
            )}
            className='hidden md:flex'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
