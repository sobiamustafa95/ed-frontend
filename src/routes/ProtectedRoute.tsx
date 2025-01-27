import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { USER_TYPE } from '@/constants';
import { cn } from '@/lib/utils';
import { useAuth } from '@/provider/AuthProvider';

import { PUBLIC_ROUTES, ROUTES } from '.';

interface ProtectedRouteProps {
  customerElement?: React.ReactNode;
  technicianElement?: React.ReactNode;
  adminElement?: React.ReactNode;
  requiredRoles?: USER_TYPE[];
  defaultElement?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  customerElement,
  technicianElement,
  adminElement,
  requiredRoles,
  defaultElement,
}) => {
  const { token, isAdmin, isTechnician, isCustomer } = useAuth();
  const location = useLocation();

  const redirectPath = location.pathname;

  const getElementToRender = () => {
    if (isTechnician && technicianElement) return technicianElement;
    if (isCustomer && customerElement) return customerElement;
    if (isAdmin && adminElement) return adminElement;
    if (defaultElement) return defaultElement;
    return null;
  };

  if (!token) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} state={{ from: redirectPath }} />;
  }

  const hasRequiredRole = requiredRoles?.some((role) => {
    switch (role) {
      case USER_TYPE.ADMIN:
        return isAdmin;
      case USER_TYPE.TECHNICIAN:
        return isTechnician;
      case USER_TYPE.CUSTOMER:
        return isCustomer;
      default:
        return false;
    }
  });
  if (!hasRequiredRole) {
    return <Navigate to='/unauthorized' state={{ from: redirectPath }} />;
  }

  const isMinimalLayout =
    (location.pathname.startsWith('/booking/') &&
      !location.pathname.includes(ROUTES.CREATE_BOOKING)) ||
    location.pathname.startsWith(ROUTES.EDIT_PERSONAL_INFO) ||
    location.pathname.startsWith(ROUTES.PREFERENCES) ||
    location.pathname.startsWith(ROUTES.PAYMENT_METHODS) ||
    location.pathname.includes(ROUTES.CHAT);

  return (
    <div
      className={cn('p-3 md:p-6 flex-1 overflow-hidden bg-whiteBackground', {
        'md:p-0': isMinimalLayout,
      })}
    >
      <div
        className={cn('h-full p-6 rounded-xl', {
          'sticky top-0 bg-white border border-greyWhite': !isMinimalLayout,
          'p-0': isMinimalLayout,
        })}
      >
        {getElementToRender()}
      </div>
    </div>
  );
};

export default ProtectedRoute;
