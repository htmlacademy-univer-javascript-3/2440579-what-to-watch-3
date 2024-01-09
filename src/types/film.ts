export type uuid = string;

export type Film = {
  id: uuid;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
};

export type Films = Film[];

export type PromoFilm = {
  id: uuid;
  name: string;
  posterImage: string;
  backgroundImage: string;
  videoLink: string;
  genre: string;
  released: number;
  isFavorite: boolean;
}

export type DetailFilm = {
  id: uuid;
  name: string;
  previewImage: string;
  genre: string;
  runTime: number;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  released: number;
  isFavorite: boolean;
};
