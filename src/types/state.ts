import {store} from '../store';
import {AuthStatus} from '../const';
import {DetailFilm, Films, PromoFilm} from './film';

export type UserProcess = {
  authStatus: AuthStatus;
};

export type FilmData = {
  promoFilm: PromoFilm | null;
  currentFilm: DetailFilm | null;
  currentGenre: string;
  films: Films;
  filmsByGenre: Films;
  filmsSize: number;
  filmDataLoadingStatus: boolean;
  favoriteFilms: Films;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
