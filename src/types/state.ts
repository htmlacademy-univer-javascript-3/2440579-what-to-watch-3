import {store} from '../store';
import {AuthStatus} from '../const';
import {DeatailFilm, Films, PromoFilm} from './Film';

export type UserProcess = {
  authStatus: AuthStatus;
};

export type FilmData = {
  promoFilm: PromoFilm | null;
  currentFilm: DeatailFilm | null;
  currentGenre: string;
  films: Films;
  filmsByGenre: Films;
  filmsSize: number;
  filmDataLoadingStatus: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
