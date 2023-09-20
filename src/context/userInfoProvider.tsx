import { useState } from 'react';
import UserInfoContext from './userInfoContext';
import { UserInfoType } from '../type';

type ThemeProviderProps = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const INITIAL_USER = {
    email: '',
    password: '',
  };

  const [userInfo, setUserInfo] = useState<UserInfoType>(INITIAL_USER);

  const value = {
    userInfo,
  };

  return (
    <UserInfoContext.Provider value={ value }>
      {children}
    </UserInfoContext.Provider>
  );
}
