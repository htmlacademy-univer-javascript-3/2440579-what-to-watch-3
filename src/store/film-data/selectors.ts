import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {DetailFilm, Films, PromoFilm} from '../../types/film';

export const getCurrentFilm = (state: State): DetailFilm => <DetailFilm>state[NameSpace.Data].currentFilm;
export const getPromoFilm = (state: State): PromoFilm => <PromoFilm>state[NameSpace.Data].promoFilm;
export const getCurrentGenre = (state: State): string => state[NameSpace.Data].currentGenre;
export const getAllFilms = (state: State): Films => state[NameSpace.Data].films;
export const getFilmDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].filmDataLoadingStatus;
export const getFilmsByGenre = (state: State): Films => state[NameSpace.Data].filmsByGenre;
export const getFilmsSize = (state: State): number => state[NameSpace.Data].filmsSize;
export const getFavoriteFilms = (state: State): Films => state[NameSpace.Data].favoriteFilms;
