import { HiDownload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { strings } from '@/locales';
import { useSidebarContext } from '@/provider/SidebarProvider';
import { ROUTES } from '@/routes';

import Logo from '../../assets/svgs/logo.svg';
import { Button } from '../ui/button';

const SidebarHeader = () => {
  const navigate = useNavigate();
  const { sidebarExpand, setSidebarExpand, setSidebarClosing, isSmallScreen } =
    useSidebarContext();
  const staticText = strings.dashboard;

  const handleSidebarClose = () => {
    setSidebarClosing(true);
    setTimeout(() => {
      setSidebarExpand((prev) => !prev);
      setSidebarClosing(false);
    }, 1000);
  };

  return (
    <div
      className={cn(
        'cursor-pointer flex bg-primary justify-center h-[72px] items-center',
        {
          'justify-between px-4': sidebarExpand,
        },
      )}
    >
      <div
        className={cn('block', {
          'w-[100px] h-[100px]': sidebarExpand,
          'w-12 h-12': !sidebarExpand,
        })}
        onClick={() => navigate(ROUTES.BOOKINGS)}
      >
        <img
          src={Logo}
          alt={staticText.alt}
          className='w-full h-full object-contain'
        />
      </div>
      {isSmallScreen ? (
        <Button
          variant='ghost'
          size='icon'
          className={cn(
            'size-8 bg-primary hover:bg-primary text-white hover:text-white',
            {
              hidden: !sidebarExpand,
            },
          )}
          onClick={handleSidebarClose}
        >
          <HiDownload className='rotate-90 text-primaryBlack text-xl' />
        </Button>
      ) : null}
    </div>
  );
};

export default SidebarHeader;
