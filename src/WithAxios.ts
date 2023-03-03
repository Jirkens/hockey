import axios from 'axios'
import { FC, ReactElement, useEffect } from 'react'

import { BASE_API_URL } from './constants';
import { useAuthContext } from './contexts/AuthContext';

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const WithAxios: FC<{children: ReactElement}> = ({ children }) => {
  const { auth } = useAuthContext();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      config => {
        if (config.baseURL === BASE_API_URL && !config.headers.Authorization) {    
          if (auth?.accessToken && auth?.tokenType) {
            config.headers.Authorization = `${auth.tokenType} ${auth.accessToken}`;
          }
        }
    
        return config;
      },
      error => Promise.reject(error)
    );

    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [auth])

  return children;
};
