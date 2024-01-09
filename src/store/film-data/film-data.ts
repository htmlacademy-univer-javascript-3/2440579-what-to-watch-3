import {createSlice} from '@reduxjs/toolkit';
import {ALL_GENRES, FILMS_BATCH_SIZE, NameSpace} from '../../const';
import {FilmData} from '../../types/state';
import {clearFavoriteFilms, getFilms, setGenre, upFilmSize} from '../action';
import {fetchFavoritesFilms, fetchFilm, fetchFilms, fetchPromoFilm} from '../api-actions';

const initialState: FilmData = {
  currentGenre: ALL_GENRES,
  promoFilm: null,
  currentFilm: null,
  films: [],
  filmsByGenre: [],
  filmsSize: FILMS_BATCH_SIZE,
  filmDataLoadingStatus: false,
  favoriteFilms: []
};

export const filmData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setGenre, (state, action) => {
        state.currentGenre = action.payload;
        state.filmsSize = FILMS_BATCH_SIZE;
      })
      .addCase(getFilms, (state) => {
        state.filmsByGenre = state.films.filter((f) => state.currentGenre === ALL_GENRES || f.genre === state.currentGenre);
      })
      .addCase(upFilmSize, (state) => {
        state.filmsSize += FILMS_BATCH_SIZE;
      })
      .addCase(clearFavoriteFilms, (state) => {
        state.favoriteFilms = [];
      })
      .addCase(fetchFilms.pending, (state) => {
        state.filmDataLoadingStatus = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.films = action.payload;
        state.filmDataLoadingStatus = false;
      })
      .addCase(fetchFilm.pending, (state) => {
        state.filmDataLoadingStatus = true;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.currentFilm = action.payload;
        state.filmDataLoadingStatus = false;
      })
      .addCase(fetchPromoFilm.pending, (state) => {
        state.filmDataLoadingStatus = true;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.filmDataLoadingStatus = false;
      })
      .addCase(fetchFavoritesFilms.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      });
  }
});
