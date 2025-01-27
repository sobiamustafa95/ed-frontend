import { cn } from '@/lib/utils';
import { useSidebarContext } from '@/provider/SidebarProvider';

import SidebarHeader from './SidebarHeader';

interface ISidebarContainer {
  children: React.ReactNode;
}

const SidebarContainer = ({ children }: ISidebarContainer) => {
  const { sidebarExpand, isSmallScreen, sidebarClosing } = useSidebarContext();

  return (
    <div className='relative z-50'>
      <div
        className={cn(
          'md:relative fixed overflow-hidden scrollbarHidden no-scrollbar transition-all duration-300 ease-in-out w-16',
          {
            'w-full md:w-48': sidebarExpand,
            'slide-in-left': isSmallScreen && sidebarExpand,
            'slide-out-left': isSmallScreen && sidebarClosing,
          },
        )}
      >
        <SidebarHeader />
        <div className='flex flex-col h-[calc(100vh-72px)] border-r border-r-greyWhite bg-white overflow-y-scroll scrollbarHidden no-scrollbar'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarContainer;
