import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import api from '@/api';
import axios, { AxiosError } from 'axios';
import type { Listing } from '@/types';

export interface ListingsState {
  listings: Listing[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ListingsState = {
  listings: [],
  error: null,
  status: 'idle',
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchListings.fulfilled,
        (state, action: PayloadAction<Listing[]>) => {
          state.status = 'succeeded';
          state.listings = action.payload;
        },
      )
      .addCase(fetchListings.rejected, (state, action) => {
        if (axios.isCancel(action.payload)) {
          return;
        }
        state.status = 'failed';
        state.error =
          (action.payload as AxiosError | undefined)?.message ??
          'unknown error';
      });
  },
});

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (options: any) => {
    const response = await api.get('/api/listings', options);
    return response.data;
  },
);

export default listingsSlice.reducer;
