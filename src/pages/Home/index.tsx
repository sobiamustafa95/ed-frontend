/* eslint-disable max-lines */
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
// import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';

import Breadcrumbs from '@/components/Breadcrumbs';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { USER_TYPE } from '@/constants';
import { getBreadcrumbs } from '@/constants/breadcrumbs';
import { cn } from '@/lib/utils';
import { AuthProvider, useAuth } from '@/provider/AuthProvider';
import { SidebarProvider, useSidebarContext } from '@/provider/SidebarProvider';
import { UploadFileProvider } from '@/provider/UploadFileProvider';
import { PUBLIC_ROUTES, ROUTES } from '@/routes';
import ProtectedRoute from '@/routes/ProtectedRoute';
import PublicRoute from '@/routes/PublicRoute';

import ForgotPassword from '../Auth/ForgotPassword';
import SetNewPassword from '../Auth/SetNewPassword.tsx';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import TechnicianDetails from '../Auth/TechnicianDetails';
import AvailableJobs from '../AvailableJobs';
import Bookings from '../Bookings';
import ChatScreen from '../Chat';
import CreateRequest from '../CreateRequest';
import Dashboard from '../Dashboard';
import EditPersonalInfo from '../EditPersonalProfile';
import HelpCenter from '../HelpCenter';
import DynamicFAQPage from '../HelpCenter/DynamicFaqPage';
import Invoice from '../Invoice';
import InvoicePayment from '../Invoice/InvoicePayment';
import ManagePaymentMethod from '../ManagePaymentMethod';
import Notifications from '../Notifications';
import Preferences from '../Preferences';
import PrivacyPolicy from '../PrivacyPolicy';
import Settings from '../Settings';
import TrackOrder from '../TrackOrder';

import 'src/assets/styles/App.css';

const App = () => {
  const { pathname } = useLocation();
  const { sidebarExpand } = useSidebarContext();
  const { isAdmin, isTechnician } = useAuth();
  // const [cookies] = useCookies(['token']);
  const token = Cookies.get('token');

  console.log('login: ', token);
  const hideLayout = Object.values(PUBLIC_ROUTES).includes(pathname);

  const handleRouteNotFound = () => {
    let redirectTo;
    if (token) {
      console.log('redirect to dashboard', token);
      if (isAdmin) {
        redirectTo = ROUTES.DASHBOARD;
      } else if (isTechnician) {
        redirectTo = ROUTES.AVAILABLE_JOBS;
      } else {
        redirectTo = ROUTES.BOOKINGS;
        console.log('login as customer');
      }
    } else {
      redirectTo = PUBLIC_ROUTES.LOGIN;
      console.log('back to login', redirectTo, token, isAdmin, isTechnician);
    }
    return <Navigate to={redirectTo} />;
  };

  const myCookie = Cookies.get('token');
  console.log('myCookie: ', myCookie);
  // Debugging: Check if the token cookie exists
  useEffect(() => {
    console.log('Cookies: ', Cookies.get('token')); // Check if 'token' is present here
  }, [Cookies]);

  if (!Cookies) {
    console.error('Token cookie not found!');
  }

  return (
    <div className='flex h-screen'>
      <div className={cn({ 'hidden md:block': !sidebarExpand })}>
        {hideLayout ? null : <Sidebar />}
      </div>
      <div className='w-full overflow-scroll scrollbarHidden flex flex-col'>
        <Toaster />
        {hideLayout ? null : <Header />}

        <div
          className={cn(
            (location.pathname.startsWith('/booking/') &&
              !location.pathname.includes('/booking/create-booking')) ||
              location.pathname.includes(ROUTES.CHAT) ||
              Object.values(PUBLIC_ROUTES).includes(location.pathname)
              ? 'hidden'
              : 'block',
          )}
        >
          <div className={cn('px-3 md:px-6 pt-3 md:pt-5 bg-whiteBackground')}>
            <Breadcrumbs data={getBreadcrumbs(location.pathname)} />
          </div>
        </div>

        <Routes>
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute
                adminElement={<Dashboard />}
                requiredRoles={[USER_TYPE.ADMIN]}
              />
            }
          />
          <Route
            path={ROUTES.CREATE_BOOKING}
            element={
              <ProtectedRoute
                customerElement={<CreateRequest />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={ROUTES.BOOKINGS}
            element={
              <ProtectedRoute
                customerElement={<Bookings />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={ROUTES.TRACK_ORDER}
            element={
              <ProtectedRoute
                customerElement={<TrackOrder />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={ROUTES.AVAILABLE_JOBS}
            element={
              <ProtectedRoute
                technicianElement={<AvailableJobs />}
                requiredRoles={[USER_TYPE.TECHNICIAN]}
              />
            }
          />
          <Route
            path={ROUTES.INVOICES}
            element={
              <ProtectedRoute
                customerElement={<Invoice />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={ROUTES.PAYMENT_METHODS}
            element={
              <ProtectedRoute
                customerElement={<InvoicePayment />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={ROUTES.NOTIFICATIONS}
            element={
              <ProtectedRoute
                customerElement={<Notifications />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={ROUTES.HELP_CENTER}
            element={
              <ProtectedRoute
                customerElement={<HelpCenter />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={ROUTES.FAQ_TOPICS}
            element={
              <ProtectedRoute
                customerElement={<DynamicFAQPage />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={ROUTES.SETTINGS}
            element={
              <ProtectedRoute
                customerElement={<Settings />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={ROUTES.EDIT_PERSONAL_INFO}
            element={
              <ProtectedRoute
                customerElement={<EditPersonalInfo />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={ROUTES.MANAGE_PAYMENT_METHOD}
            element={
              <ProtectedRoute
                customerElement={<ManagePaymentMethod />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={ROUTES.MANAGE_PAYMENT_METHOD}
            element={
              <ProtectedRoute
                customerElement={<ManagePaymentMethod />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={ROUTES.PREFERENCES}
            element={
              <ProtectedRoute
                customerElement={<Preferences />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={ROUTES.PRIVACY_POLICY}
            element={
              <ProtectedRoute
                customerElement={<PrivacyPolicy />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={ROUTES.CHAT}
            element={
              <ProtectedRoute
                customerElement={<ChatScreen />}
                requiredRoles={[USER_TYPE.CUSTOMER]}
              />
            }
          />
          <Route
            path={PUBLIC_ROUTES.SIGNUP}
            element={<PublicRoute element={<SignUp />} />}
          />
          <Route
            path={PUBLIC_ROUTES.TECHNICIAN_DETAILS}
            element={<PublicRoute element={<TechnicianDetails />} />}
          />
          <Route
            path={PUBLIC_ROUTES.LOGIN}
            element={<PublicRoute element={<SignIn />} />}
          />
          <Route
            path={PUBLIC_ROUTES.FORGOT_PASSWORD}
            element={<PublicRoute element={<ForgotPassword />} />}
          />
          <Route
            path={PUBLIC_ROUTES.SET_NEW_PASSWORD}
            element={<PublicRoute element={<SetNewPassword />} />}
          />

          <Route path='*' element={handleRouteNotFound()} />
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <UploadFileProvider>
            <App />
          </UploadFileProvider>
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppWrapper;
