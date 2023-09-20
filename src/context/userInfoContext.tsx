import { createContext } from 'react';

type UserInfoContextType = {
  userInfo: {
    email: string;
    password: string;
  }
};

const UserInfoContext = createContext({} as UserInfoContextType);

export default UserInfoContext;
