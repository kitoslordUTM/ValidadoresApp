import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Base as BASE, TIMEOUT} from './utils';
import {credentials} from '../views/const/LoginConst';
import { User } from '../models/User';

type SignUpResponse = {
  status: boolean;
  datos: User;
  token?: string;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  // Define the base query for the API
  baseQuery: fetchBaseQuery({
    baseUrl: BASE,
    timeout: TIMEOUT,
  }),

  // Define the tag types for the API
  endpoints: builder => ({
    // Define a query endpoint for postLogin
    signIn: builder.mutation<SignUpResponse, credentials>({
      // parameters
      query: user => ({
        url: '/auth/log',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const {useSignInMutation} = authApi;
