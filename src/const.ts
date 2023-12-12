export enum AppRoute {
  Main= '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthStatus {
  Auth= 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const ALL_GENRES = 'All genres';

export const GENRES: string[] = [
  'Comedy',
  'Drama',
  'Fantasy',
  'Biographical',
  'Crime',
  'Thriller'
];

export const FILMS_BATCH_SIZE = 8;
