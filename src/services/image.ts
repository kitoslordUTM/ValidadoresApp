import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Base as BASE, TIMEOUT} from './utils';



type Solicitud = {

  succes: string,
  data: [
    {
      id: number ,
      id_imagen: number,
      id_solicitud_credito: number,
      urlImg: string,
      fecha_registro: string,
      fecha_vencimiento: string,
      bloc: number,
      cambio: number,
      contador: number,
      fecha_actualizacion: string
    }
  ]
}



export const imageApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE,
    timeout: TIMEOUT,
  }),
  endpoints: builder => ({

    uploadImage: builder.mutation<any, FormData>({
      query: formData => ({
        url: '/imagen/upload',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),

    deleteImage: builder.mutation<any, { id: number, id_imagen: number }>({
      query: data => ({
        url: '/imagen/delete',
        method: 'DELETE',
        body: data,
      }),
    }),

    getImageTypes: builder.query<any[], void>({
          query: () => '/imagen/get',
          transformResponse: (response: { data: any[] }) => response.data,
        }),

    imageCreditByUserId: builder.query<Solicitud, number>({
          query: imageId => `/imagen/credit/${imageId}`,
        }),


    putUbication: builder.mutation<
      any,
      {
        id: number;
        usuario: string;
        latitud: string;
        longitud: string;
      }
    >({
      query: data => ({
        url: '/user/Ubication',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {useUploadImageMutation, usePutUbicationMutation, useGetImageTypesQuery, useImageCreditByUserIdQuery, useDeleteImageMutation} = imageApi;
