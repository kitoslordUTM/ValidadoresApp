import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Base as BASE, TIMEOUT} from './utils';
import {
  SolicitudResponse,
  SolicitudResponse2,
  SolicitudRequest,
  SurveyRequest,
  SurveyResponse,
} from './utils';

export const clientApi = createApi({
  reducerPath: 'clientApi',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE,
    timeout: TIMEOUT,
  }),

  endpoints: builder => ({
    solicitud: builder.mutation<SolicitudResponse, SolicitudRequest>({
      // parameters
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

export const {useSolicitudMutation, useCreditByUserIdQuery, useSurveyMutation} = clientApi;
