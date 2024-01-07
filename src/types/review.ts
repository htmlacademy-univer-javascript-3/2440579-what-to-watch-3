export type CreateCommentRequest = {
  filmId: string;
  comment: string;
  rating: number;
}

export type GetCommentsRequest = {
  filmId: string;
}

export type Review = {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
}
