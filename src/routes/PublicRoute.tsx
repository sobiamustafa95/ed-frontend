import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { USER_TYPE } from '@/constants';
import { useAuth } from '@/provider/AuthProvider';

import AuthWrapper from '../pages/Auth/components/AuthWrapper';

import { ROUTES } from '.';

interface PublicRouteProps {
  element: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const { token, user } = useAuth();
  const location = useLocation();

  if (token && user) {
    const { role } = user;

    const redirectTo =
      location.state?.from ||
      (role === USER_TYPE.ADMIN && ROUTES.DASHBOARD) ||
      (role === USER_TYPE.CUSTOMER && ROUTES.BOOKINGS);

    return <Navigate to={redirectTo} />;
  }

  return <AuthWrapper>{element}</AuthWrapper>;
};

export default PublicRoute;
