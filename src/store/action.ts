import { createAction } from '@reduxjs/toolkit';

export const setGenre = createAction('set-genre', (genre: string) => ({
  payload: genre,
}));

export const getFilms = createAction('get-films');
