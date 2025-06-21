// services/api.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Base as BASE, TIMEOUT} from './utils';

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const token = await AsyncStorage.getItem('TOKEN');

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: BASE,
    timeout: TIMEOUT,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  return rawBaseQuery(args, api, extraOptions);
};

export default baseQueryWithAuth;
