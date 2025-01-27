import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { strings } from '@/locales';

interface ISidebarContext {
  sidebarExpand: boolean;
  setSidebarExpand: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarClosing: boolean;
  setSidebarClosing: React.Dispatch<React.SetStateAction<boolean>>;
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  isSmallScreen: boolean | null;
}

const SidebarContext = createContext<ISidebarContext>({
  sidebarExpand: true,
  setSidebarExpand: () => {},
  sidebarClosing: false,
  setSidebarClosing: () => {},
  currentTab: '',
  setCurrentTab: () => {},
  isSmallScreen: null,
});

interface ISidebarProvider {
  children: React.ReactNode;
}

export const SidebarProvider = ({ children }: ISidebarProvider) => {
  const location = useLocation();
  const [, pathSegment] = location.pathname.split('/');
  const isSmallScreen = window.innerWidth < 768;

  const [sidebarClosing, setSidebarClosing] = useState(false);
  const [sidebarExpand, setSidebarExpand] = useState(!isSmallScreen);
  const [currentTab, setCurrentTab] = useState(
    pathSegment || strings.sidebarRoutes.bookings,
  );

  useEffect(() => {
    setCurrentTab(pathSegment || strings.sidebarRoutes.bookings);
  }, [pathSegment]);

  const value = {
    currentTab,
    sidebarExpand,
    sidebarClosing,
    setSidebarClosing,
    setCurrentTab,
    setSidebarExpand,
    isSmallScreen,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
