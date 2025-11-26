import { configureStore } from '@reduxjs/toolkit';
import listingsReducer from './listings/listingsSlice';

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
  },
});

// Infer types.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
