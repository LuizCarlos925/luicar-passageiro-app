import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';

import { router } from 'expo-router';

import { api } from '@/services/api';
import { handleError } from '@/utils/handleError';

import { IUser } from '@/interfaces/user';
import { ILoginResponse } from '@/interfaces/login';

import {
  LoginForm,
  SignUpAccessForm,
  SignUpProfileForm,
} from '@/validation/Login.validation';
import { useModal } from './useModal';

export type ISignUpData = SignUpProfileForm & SignUpAccessForm;

interface IUserProvider {
  user: IUser;
  isAuthenticated: boolean;
  signUpData: ISignUpData;
  setSignUpData: React.Dispatch<React.SetStateAction<ISignUpData>>;
  logout: (isDelete?: boolean) => Promise<void>;
  login: (form: LoginForm) => void;
  refetchUser: () => Promise<void>;
  isLoading: boolean;
  isUnderConstruction: boolean;
  setIsUnderConstruction: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChildrenProps {
  children: ReactNode;
}

const populateUser = [
  'passenger',
  'passenger.feed_profile',
  'passenger.image',
  'passenger.cards',
  'passenger.reviews',
  'passenger.bank_account',
];

const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: ChildrenProps) => {
  const { setModal } = useModal();

  const [user, setUser] = useState<IUser>({} as IUser);
  const [signUpData, setSignUpData] = useState<ISignUpData>({} as ISignUpData);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnderConstruction, setIsUnderConstruction] = useState(false);
  const [isBlocked, setIsBlocked] = useState('');

  const isAuthenticated = user?.id !== undefined;

  const refetchUser = async () => {
    try {
      const { data } = await api.get<IUser>('/users/me', {
        params: {
          populate: populateUser,
        },
      });

      return setUser(data);
    } catch (err) {
      handleError(err);
    }
  };

  const login = async (formLogin: LoginForm) => {
    setIsLoading(true);
    try {
      const { data } = await api.post<ILoginResponse>('/auth/local', {
        ...formLogin,
        role: 'authenticated',
      });

      if (data?.message === 'Sua conta está bloqueada') {
        setIsBlocked(data.reason || '');
        return false;
      }

      if (data?.user?.role?.id !== 1) {
        throw new Error('Essa conta não tem acesso a este aplicativo');
      }

      await setItemAsync('accessToken', data.jwt);

      if (data?.refreshToken && formLogin?.rememberMe) {
        await setItemAsync('refreshToken', data.refreshToken);
      }

      await refetchUser();

      router.replace('/(main)/Home');
    } catch (err: any) {
      if (err.response?.data?.error?.message?.includes('Senha ou e-mail')) {
        setModal({ name: 'loginError' });
      } else {
        handleError(err);
      }
      deleteItemAsync('accessToken');
      deleteItemAsync('refreshToken');
    }
    setIsLoading(false);
  };

  const logout = async () => {
    try {
      setUser({} as IUser);
      await deleteItemAsync('accessToken');
      await deleteItemAsync('refreshToken');
      router.dismissTo('/(auth)/Welcome');
    } catch (err) {
      handleError(err);
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = await getItemAsync('refreshToken');

    if (refreshToken) {
      try {
        const { data: loginResponse } = await api.post<ILoginResponse>(
          '/auth/refresh-token',
          {
            refreshToken,
          },
        );
        if (loginResponse?.message === 'Sua conta está bloqueada') {
          return setIsBlocked(loginResponse?.reason || '');
        }

        await setItemAsync('accessToken', loginResponse.jwt);
        if (loginResponse.refreshToken) {
          await setItemAsync('refreshToken', loginResponse.refreshToken);
        }

        await refetchUser();

        // const isAccepted = await handleVerifyTerms();
        // if (!isAccepted) {
        //   setIsAcceptedTerms(isAccepted);
        // }

        return loginResponse?.jwt;
      } catch (err) {
        handleError(err);
        deleteItemAsync('accessToken');
        deleteItemAsync('refreshToken');
      }
    }
  };

  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.message === 'Network Error') {
        return Promise.reject(new Error('Sem conexão com a internet!'));
      }
      if (error.code === 'ERR_SECURESTORE_ENCRYPT_FAILURE') {
        await deleteItemAsync('accessToken');
        await deleteItemAsync('refreshToken');
        return logout();
      }
      if (
        error.response?.status === 401 &&
        originalRequest.url !== '/auth/refresh-token' &&
        !originalRequest.retry
      ) {
        originalRequest.retry = true;
        const accessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    refreshAccessToken().finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signUpData,
        setSignUpData,
        logout,
        login,
        refetchUser,
        isLoading,
        isUnderConstruction,
        setIsUnderConstruction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
