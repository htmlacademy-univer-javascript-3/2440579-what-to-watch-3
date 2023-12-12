import { createReducer } from '@reduxjs/toolkit';
import {films} from '../mocks/film';
import {getFilms, setGenre} from './action';
import {ALL_GENRES} from '../const';

const initialState = {
  genre: ALL_GENRES,
  films: films,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilms, (state) => {
      state.films = films.filter((f) => state.genre === ALL_GENRES || f.genre === state.genre);
    });
});
