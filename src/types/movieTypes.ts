export interface Movie {
  id: number;
  adult: boolean;
  genreIds: number[] | null;
  posterPath: string | null;
  backdropPath: string | null;
  language: string | null;
  originalTitle: string;
  title: string;
  overview: string | null;
  popularity: string | null;
  releaseDate: Date | null;
  video: boolean | null;
  voteAverage: string | null;
  voteCount: number | null;
}
