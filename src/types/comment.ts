export type CreateCommentRequest = {
  filmId: string;
  comment: string;
  rating: number;
}

export type Comment = {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
}
