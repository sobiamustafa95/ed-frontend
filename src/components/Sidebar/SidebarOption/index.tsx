import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { strings } from '@/locales';
import { useAuth } from '@/provider/AuthProvider';
import { useSidebarContext } from '@/provider/SidebarProvider';
import { PUBLIC_ROUTES } from '@/routes';
import { clearStorage } from '@/utils/localstorage';

import OptionText, { IOptionText } from './OptionText';

interface ISidebarOption extends IOptionText {
  location: string;
  icon: ReactElement;
  selected?: boolean;
  name: string;
  className?: string;
  strokeColor?: string;
  selectedStrokeColor?: string; // Add a separate color for the selected state
}

const SidebarOption = ({
  selected,
  name,
  icon,
  location,
  strokeColor,
  selectedStrokeColor,
}: ISidebarOption) => {
  const { setCurrentTab, setSidebarExpand, isSmallScreen } =
    useSidebarContext();

  const { setUser } = useAuth();
  const staticText = strings.sidebarRoutes;
  const handleLogout = () => {
    clearStorage();
    setUser(null);
    console.log('logout called.....');
    window.location.href = PUBLIC_ROUTES.LOGIN;
  };

  const handleOnClick = () => {
    setCurrentTab(name);
    if (name === staticText.logout) {
      handleLogout();
      return;
    }
    if (isSmallScreen) setSidebarExpand(false);
  };

  return (
    <Link
      to={location}
      onClick={handleOnClick}
      className={cn(
        'flex min-w-fit items-center py-2 px-3 rounded-xl my-1 justify-between transition-colors group hover:bg-primary hover:text-white',
        {
          'bg-primary text-white font-bold': selected,
        },
      )}
    >
      <div className='flex items-center gap-3'>
        <div
          className={cn(
            'w-5 text-base transition-colors',
            selected
              ? selectedStrokeColor || 'text-white'
              : strokeColor || 'text-SteelGray',
          )}
        >
          {React.cloneElement(icon)}
        </div>
        <OptionText
          name={name}
          selected={selected}
          className={cn(
            'transition-colors',
            // eslint-disable-next-line no-nested-ternary
            name === strings.sidebarRoutes.logout
              ? 'text-tomatoRed'
              : selected
                ? 'text-white'
                : 'text-SteelGray group-hover:text-white',
          )}
        />
      </div>
    </Link>
  );
};

export default SidebarOption;
