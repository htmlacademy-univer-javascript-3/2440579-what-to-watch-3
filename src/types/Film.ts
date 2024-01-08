export type uuid = string;
// type hexColor = string;

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

export type DeatailFilm = {
  id: uuid;
  name: string;
  previewImage: string;
  genre: string;
  runTime: number;
  // previewVideoLink: string;
  posterImage: string;
  backgroundImage: string;
  // backgroundColor: hexColor;
  videoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  // runTime: number;
  released: number;
  isFavorite: boolean;
};
