import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice';
import filtersReducer from '../features/filterSlice';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [apiSlice.reducerPath]: apiSlice.reducer,
    filters: filtersReducer,
  },
  // Add the generated middleware to the store
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
