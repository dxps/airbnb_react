import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import api from '@/api';
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import type { Listing } from '@/types';

export interface ListingsState {
  listings: Listing[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  favoriteListingIds: number[];
}

const initialState: ListingsState = {
  listings: [],
  error: null,
  status: 'idle',
  favoriteListingIds: [],
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    addFavoriteListing: (state, action: PayloadAction<number>) => {
      state.favoriteListingIds.push(action.payload);
    },
    removeFavoriteListing: (state, action: PayloadAction<number>) => {
      state.favoriteListingIds = state.favoriteListingIds.filter((id) => id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action: PayloadAction<Listing[]>) => {
        state.status = 'succeeded';
        state.error = null;
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        if (axios.isCancel(action.payload)) {
          return;
        }
        state.status = 'failed';
        state.error = (action.payload as AxiosError | undefined)?.message ?? 'unknown error';
      });
  },
});

export const fetchListings = createAsyncThunk<
  Listing[], // return type of the thunk
  AxiosRequestConfig // the `options` type
>('listings/fetchListings', async (options: AxiosRequestConfig) => {
  const response = await api.get<Listing[]>('/api/listings', options);
  return response.data;
});

export const { addFavoriteListing, removeFavoriteListing } = listingsSlice.actions;

export default listingsSlice.reducer;
