/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const baseURL = '';

export const api = axios.create({
  baseURL,
});

const PUBLIC_END_POINTS = [''];

const isPublicRequest = (url?: string) => {
  if (!url) {
    return false;
  }

  const isAuthPublic =
    url.startsWith('/auth') && !url.includes('/auth/change-password');
  const isInPublicList = PUBLIC_END_POINTS.some(endpoint => url === endpoint);

  return isAuthPublic || isInPublicList;
};

api.interceptors.request.use(
  async config => {
    if (typeof config.data === 'object' && config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    if (isPublicRequest(config.url)) {
      return config;
    }

    const accessToken = await SecureStore.getItemAsync('accessToken');
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export const getImageUrl = (url?: string) => {
  if (!url) {
    return '';
  }
  return `${url}`;
};
