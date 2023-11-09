export type uuid = string;
// type hexColor = string;

export type Film = {
  id: uuid;
  name: string;
  previewImage: string;
  genre: string;
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
  // isFavorite: boolean;
}
