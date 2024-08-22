import { pool } from "../database/connection.js";
import {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getMoviesByTitle,
} from "../generated/movies_sql.js";
import { Movie, UpdateMovie as MovieInput } from "../types/movieTypes";

export class MovieModel {
  static async addMovie(movie: Movie): Promise<Movie | null> {
    const result = await addMovie(pool, movie);
    return result ? result : null;
  }

  static async getAllMovies(): Promise<Movie[]> {
    const result = await getAllMovies(pool);
    return result;
  }

  static async getMovieById(movieid: number): Promise<Movie | null> {
    const movie = await getMovieById(pool, { movieid });
    return movie ? movie : null;
  }

  static async updateMovie(args: MovieInput): Promise<Movie | null> {
    const result = await updateMovie(pool, args);
    return result ? result : null;
  }

  static async deleteMovie(movieid: number): Promise<Movie | null> {
    const deltedMovie = await deleteMovie(pool, { movieid });
    return deltedMovie ? deltedMovie : null;
  }

  static async getMoviesByTitle(name: string): Promise<Movie[] | null> {
    const movie = await getMoviesByTitle(pool, { name });
    return movie ? movie : null;
  }
}
