export enum AppRoute {
  Main= '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite'
}

export enum AuthStatus {
  Auth= 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}

export const ALL_GENRES = 'All genres';

export const FILMS_BATCH_SIZE = 8;
export const MAX_MORE_LIKES_THIS_SIZE = 4;
export const MAX_GENRE_LIST_SIZE = 9;
