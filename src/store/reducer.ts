import { createReducer } from '@reduxjs/toolkit';
import {films} from '../mocks/film';
import {getFilms, setGenre, upFilmSize} from './action';
import {ALL_GENRES, FILMS_BATCH_SIZE} from '../const';

const initialState = {
  genre: ALL_GENRES,
  films: films,
  filmsSize: FILMS_BATCH_SIZE
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilms, (state) => {
      state.films = films.filter((f) => state.genre === ALL_GENRES || f.genre === state.genre);
      state.filmsSize = FILMS_BATCH_SIZE;
    })
    .addCase(upFilmSize, (state) => {
      state.filmsSize += FILMS_BATCH_SIZE;
    });
});
