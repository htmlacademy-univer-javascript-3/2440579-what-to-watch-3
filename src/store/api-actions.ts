import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {
  clearFavoriteFilms,
  redirectToRoute
} from './action';
import {APIRoute, AppRoute} from '../const';
import {DetailFilm, Film, Films, PromoFilm} from '../types/film';
import {dropToken, saveToken} from '../services/token';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {Comment, CreateCommentRequest} from '../types/comment';

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

export const fetchFilm = createAsyncThunk<DetailFilm, string, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilm',
  async (filmId, {extra: api }) => {
    const {data} = await api.get<DetailFilm>(`${APIRoute.Films}/${filmId}`);

    return data;
  }
);

export const fetchFavoritesFilms = createAsyncThunk<Films, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoritesFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Favorite);

    return data;
  },
);

export const postFavoritesStatus = createAsyncThunk<DetailFilm, { filmId: string; status: number }, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/postFavoriteStatus',
  async ({ filmId, status }, { extra: api }) => {
    const {data} = await api.post<DetailFilm>(`/favorite/${filmId}/${status}`);
    return data;
  },
);

export const fetchComments = createAsyncThunk<Comment[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (filmId, {extra: api}) => {
    const response = await api.get<Comment[]>(`${APIRoute.Comments}/${filmId}`);

    return response.data;
  },
);

export const postComment = createAsyncThunk<Comment, CreateCommentRequest, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async ({filmId, comment, rating}, {extra: api}) => {
    const response = await api.post<Comment>(`${APIRoute.Comments}/${filmId}`, {comment, rating});

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
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(clearFavoriteFilms());
  },
);
