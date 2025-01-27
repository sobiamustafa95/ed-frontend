import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';

import { IUser } from '@/@types/auth';
import { USER_TYPE } from '@/constants';
import { getUserDetailsFromLS, setUserDetailToLS } from '@/utils/localstorage';

interface IAuthContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isAdmin: boolean;
  isTechnician: boolean;
  isCustomer: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContextType>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  isAdmin: false,
  isTechnician: false,
  isCustomer: false,
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [cookies] = useCookies(['token']);
  const [token, setToken] = useState<string | null>(cookies.token || null);

  console.log('Token =========== ', token);
  useEffect(() => {
    const storedToken = cookies.token || null;
    if (storedToken) {
      setToken(storedToken);
      console.log('Token: ', storedToken);
    } else {
      setUser(null);
    }
  }, [cookies.token]);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    if (!user) {
      const storedUser = getUserDetailsFromLS();
      if (storedUser) {
        setUser(storedUser as IUser);
      }
    } else {
      setUserDetailToLS(user);
    }
  }, [user, token]);

  const handleSetToken = (newToken: SetStateAction<string | null>): void => {
    setToken(newToken);
  };

  const value = {
    user,
    setUser,
    token,
    setToken: handleSetToken,
    isAdmin: user?.role === USER_TYPE.ADMIN,
    isTechnician: user?.role === USER_TYPE.TECHNICIAN,
    isCustomer: user?.role === USER_TYPE.CUSTOMER,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IAuthContextType => useContext(AuthContext);
