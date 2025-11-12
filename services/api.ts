/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const baseURL = 'https://luicar.mestresdaweb.org/api/';
const imageUrl = 'https://luicar.mestresdaweb.org';

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async config => {
    if (typeof config.data === 'object' && config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    const isLogin =
      (config.url?.includes('auth') ||
        config.url?.includes('createPassenger')) &&
      !config.url?.includes('auth/change-password');

    if (isLogin) {
      return config;
    }

    const accessToken = await SecureStore.getItemAsync('accessToken');
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
      config.headers!.Role = 'passenger';
    }
    return config;
  },
  error => Promise.reject(error),
);

export const getImageUrl = (url?: string) => {
  if (!url) {
    return '';
  }
  return `${imageUrl}${url}`;
};
