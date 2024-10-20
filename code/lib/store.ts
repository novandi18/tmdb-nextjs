import { configureStore } from '@reduxjs/toolkit';
import favoriteMovieSlice from './features/favorite/favoriteMovieSlice';

export const store = configureStore({
  reducer: {
    favorite: favoriteMovieSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;