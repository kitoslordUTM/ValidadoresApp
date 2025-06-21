import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";
import { clientApi } from "../services/clients";
import { imageApi } from "../services/image";


import LogSlice from '../slices/LoginSlice'
import FilterSlice from '../slices/filterSlice';
import authSlice from '../slices/authSlice'


export const store = configureStore({
  reducer: {
    // Add your reducers here
    LogIn: LogSlice,
    Filter: FilterSlice,
    Auth: authSlice,
    // Add your API slices here
    [authApi.reducerPath]: authApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer
  },    
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(clientApi.middleware)
        .concat(imageApi.middleware),

});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;