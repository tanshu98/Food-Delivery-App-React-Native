import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from '../slices/AuthSlice';
import  HomeSlice  from '../slices/HomeSlice';

export const store = configureStore({
  reducer: {
    AuthSlice,
    HomeSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
