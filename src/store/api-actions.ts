import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {
  redirectToRoute
} from './action';
import {APIRoute, AppRoute} from '../const';
import {DeatailFilm, Film, PromoFilm} from '../types/Film';
import {dropToken, saveToken} from '../services/token';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {Review, CreateCommentRequest} from '../types/review';

export const fetchFilms = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Films);

    return data;
  },
);

export const fetchSimilarFilms = createAsyncThunk<Film[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async (filmId, {extra: api}) => {
    const {data} = await api.get<Film[]>(`${APIRoute.Films}/${filmId}/similar`);

    return data;
  },
);

export const fetchPromoFilm = createAsyncThunk<PromoFilm, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PromoFilm>(APIRoute.Promo);

    return data;
  },
);

export const fetchFilm = createAsyncThunk<DeatailFilm, string, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilm',
  async (filmId, {extra: api }) => {
    const {data} = await api.get<DeatailFilm>(`${APIRoute.Films}/${filmId}`);

    return data;
  }
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

// User actions

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
