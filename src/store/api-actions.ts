import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {
  redirectToRoute,
  setAuthStatus,
  setCurrentFilm,
  setFilmDataLoadingStatus,
  setFilms,
  setPromoFilm
} from './action';
import {APIRoute, AppRoute, AuthStatus} from '../const';
import {DeatailFilm, Film, PromoFilm} from '../types/Film';
import {dropToken, saveToken} from '../services/token';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {Review, CreateCommentRequest} from '../types/review';

export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmDataLoadingStatus(true));
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(setFilmDataLoadingStatus(false));
    dispatch(setFilms(data));
  },
);

export const fetchSimilarFilms = createAsyncThunk<Film[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchSimilarFilms',
  async (filmId, {dispatch, extra: api}) => {
    dispatch(setFilmDataLoadingStatus(true));
    const response = await api.get<Film[]>(`${APIRoute.Films}/${filmId}/similar`);
    dispatch(setFilmDataLoadingStatus(false));

    return response.data;
  },
);

export const fetchPromoFilm = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmDataLoadingStatus(true));
    const {data} = await api.get<PromoFilm>(APIRoute.Promo);
    dispatch(setFilmDataLoadingStatus(false));
    dispatch(setPromoFilm(data));
  },
);

export const fetchComments = createAsyncThunk<Review[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchComments',
  async (filmId, {extra: api}) => {
    const response = await api.get<Review[]>(`${APIRoute.Comments}/${filmId}`);

    return response.data;
  },
);

export const postComment = createAsyncThunk<Review, CreateCommentRequest, {
  state: State;
  extra: AxiosInstance;
}>(
  'postComment',
  async ({filmId, comment, rating}, {extra: api}) => {
    const response = await api.post<Review>(`${APIRoute.Comments}/${filmId}`, {comment, rating});

    return response.data;
  },
);

export const fetchFilm = createAsyncThunk<void, string, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilm',
  async (filmId, {dispatch, extra: api }) => {
    const response = await api.get<DeatailFilm>(`${APIRoute.Films}/${filmId}`);
    dispatch(setCurrentFilm(response.data));
  }
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setAuthStatus(AuthStatus.Auth));
    } catch {
      dispatch(setAuthStatus(AuthStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({email: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setAuthStatus(AuthStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthStatus(AuthStatus.NoAuth));
  },
);
