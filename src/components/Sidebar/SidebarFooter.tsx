import React from 'react';

import { sidebarOptions } from '@/constants/sidebar';
import { cn } from '@/lib/utils';
import { useSidebarContext } from '@/provider/SidebarProvider';
import { matchPath } from '@/utils/common';

import SidebarOption from './SidebarOption';

const SidebarFooter = () => {
  const { sidebarExpand } = useSidebarContext();

  const options = sidebarOptions();

  return (
    <div
      className={cn('mt-10 flex flex-col my-4 mx-3', {
        'items-center w-12': !sidebarExpand,
        'w-44': sidebarExpand,
      })}
    >
      {options.map((option) => {
        const selected = matchPath(location.pathname, option.location);
        return (
          <SidebarOption
            selected={selected}
            key={option.location}
            name={option.name}
            icon={option.icon}
            location={option.location}
            strokeColor={option.strokeColor}
          />
        );
      })}
    </div>
  );
};

export default SidebarFooter;
