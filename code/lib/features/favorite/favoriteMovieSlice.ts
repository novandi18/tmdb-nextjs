import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
  id: number;
}

const initialState: MovieState = {
  id: 0
};

export const movieSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<MovieState>) => {
      state.id = action.payload.id;
    },
    removeFromFavorites: (state: MovieState) => {
      state.id = 0;
    },
  },
});

export const { addToFavorites, removeFromFavorites } = movieSlice.actions;

export const selectFavorites = (state: MovieState) => state.id;

export default movieSlice.reducer;