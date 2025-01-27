import React, { useMemo } from 'react';

import { USER_TYPE } from '@/constants';
import { cn } from '@/lib/utils';
import { useAuth } from '@/provider/AuthProvider';
import { useSidebarContext } from '@/provider/SidebarProvider';
import { matchPath } from '@/utils/common';

import { SidebarItem, useSidebarItems } from '../../constants/sidebar';

import SidebarOption from './SidebarOption';

// Utility function to check role permissions
const hasAccess = (
  item: SidebarItem,
  isAdmin: boolean,
  isTechnician: boolean,
  isCustomer: boolean,
): boolean => {
  // Check if the item should be accessible based on the user's role
  return (
    (isAdmin && item.roles[USER_TYPE.ADMIN]) ||
    (isTechnician && item.roles[USER_TYPE.TECHNICIAN]) ||
    (isCustomer && item.roles[USER_TYPE.CUSTOMER])
  );
};

const SidebarTabs = () => {
  const { sidebarExpand } = useSidebarContext();
  const { isAdmin, isTechnician, isCustomer } = useAuth();
  const sidebarItems = useSidebarItems();

  const filteredItems: SidebarItem[] = useMemo(() => {
    return sidebarItems.filter((item) =>
      hasAccess(item, isAdmin, isTechnician, isCustomer),
    );
  }, [sidebarItems, isAdmin, isTechnician, isCustomer]);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={cn('mt-4 flex flex-col w-44 mx-3', {
        'items-center w-12': !sidebarExpand,
        'w-44': sidebarExpand,
      })}
    >
      {filteredItems.map((item) => {
        const selected = matchPath(location.pathname, item.location);
        return (
          <SidebarOption
            key={item.location}
            selected={selected}
            icon={item.icon}
            name={item.name}
            location={item.location}
            strokeColor={item.strokeColor}
            selectedStrokeColor='text-primary'
          />
        );
      })}
    </div>
  );
};

export default SidebarTabs;
