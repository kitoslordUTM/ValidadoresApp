import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SolicitudResponse,
  SolicitudResponse2,
  SolicitudRequest,
  SurveyRequest,
  SurveyResponse,
} from './utils';
import {Base as BASE, TIMEOUT} from './utils';

export const clientApi = createApi({
  reducerPath: 'clientApi',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE,
    timeout: TIMEOUT,

    // ⬇️ Aquí recuperamos el token de AsyncStorage antes de cada request
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('TOKEN');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: builder => ({
    solicitud: builder.mutation<SolicitudResponse, SolicitudRequest>({
      query: solicitud => ({
        url: '/request/Solicitud',
        method: 'POST',
        body: solicitud,
      }),
    }),

    creditByUserId: builder.query<SolicitudResponse2, number>({
      query: userId => `/request/Credito/${userId}`,
    }),

    survey: builder.mutation<SurveyResponse, SurveyRequest>({
      query: survey => ({
        url: '/request/Survey',
        method: 'POST',
        body: survey,
      }),
    }),
  }),
});

export const {
  useSolicitudMutation,
  useCreditByUserIdQuery,
  useSurveyMutation,
} = clientApi;
