import { createAction } from '@reduxjs/toolkit';
import {AppRoute} from '../const';

export const setGenre = createAction('data/setGenre', (genre: string) => ({
  payload: genre,
}));

export const getFilms = createAction('data/getFilms');

export const upFilmSize = createAction('data/upFilmSize');
export const resetFilmSize = createAction('data/resetFilmSize');
export const clearFavoriteFilms = createAction('data/clearFavoriteFilms');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
