import { createReducer } from '@reduxjs/toolkit';
import {getFilms, setFilmDataLoadingStatus, setFilms, setGenre, setPromoFilm, upFilmSize} from './action';
import {ALL_GENRES, FILMS_BATCH_SIZE} from '../const';
import {Film, PromoFilm} from '../types/Film';

type InitialState = {
  genre: string;
  films: Film[];
  filmsByGenre: Film[];
  filmsSize: number;
  filmDataLoadingStatus: boolean;
  promoFilm: PromoFilm;
}

const initialState : InitialState = {
  genre: ALL_GENRES,
  films: [],
  filmsByGenre: [],
  filmsSize: FILMS_BATCH_SIZE,
  filmDataLoadingStatus: false,
  promoFilm: undefined as unknown as PromoFilm,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilms, (state) => {
      state.filmsByGenre = state.films.filter((f) => state.genre === ALL_GENRES || f.genre === state.genre);
      state.filmsSize = FILMS_BATCH_SIZE;
    })
    .addCase(upFilmSize, (state) => {
      state.filmsSize += FILMS_BATCH_SIZE;
    })
    .addCase(setFilmDataLoadingStatus, (state, action) => {
      state.filmDataLoadingStatus = action.payload;
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    });
});
