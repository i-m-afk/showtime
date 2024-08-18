import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fetch, { RequestInit } from "node-fetch";
import { Movie } from "../types/movieTypes";
import { addMovie } from "../generated/movies_sql.js";
import { pool } from "../database/connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const TMDB_API_KEY = process.env.TMDB_API_ACCESS_KEY;

if (!TMDB_API_KEY) {
  throw new Error(
    "TMDB API ACCESS key is not defined in the environment variables",
  );
}

const BASE_URL = "https://api.themoviedb.org/3";

// Fetch all the movies running in India from the TMDB API
const url =
  "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&page=1&sort_by=created_at.asc&region=IN";
const options: RequestInit = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

export const fetchMovies = async (
  url: string,
  options: RequestInit,
): Promise<Movie[] | undefined> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.statusText}`);
    }
    const data = await response.json();
    const movies: Movie[] = data.results.map(mapMovies);
    return movies;
  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err; // error propagation
  } finally {
    console.log("Fetching movies completed");
  }
};

const mapMovies = (data: any): Movie => {
  return {
    movieid: data.id,
    backdropPath: data.backdrop_path || null,
    adult: data.adult,
    genreIds: data.genre_ids || null,
    originalTitle: data.original_title,
    overview: data.overview || null,
    popularity: data.popularity ? data.popularity.toString() : null,
    posterPath: data.poster_path || null,
    releaseDate: data.release_date ? new Date(data.release_date) : null,
    title: data.title,
    video: data.video,
    voteAverage: data.vote_average,
    language: data.original_language || null,
    voteCount: data.vote_count,
  };
};

// Function to save movies to the database
const saveMoviesToDatabase = async (movies: Movie[]) => {
  for (const movie of movies) {
    try {
      const res = await addMovie(pool, movie);
      console.log("Movie added:", res);
    } catch (err: any) {
      if (err.code === "23505") {
        console.log("Movie already in database:", movie.movieid);
      } else {
        console.error("Error adding movie:", err);
      }
    }
  }
};

// Run the script every 24 hours
setInterval(async () => {
  try {
    const movies = await fetchMovies(url, options);
    if (movies) {
      await saveMoviesToDatabase(movies);
    }
  } catch (err) {
    console.error("Error in the scheduled fetch process:", err);
  }
}, 86400000);

// For testing: Comment out the setInterval above and run below
(async () => {
  try {
    const movies = await fetchMovies(url, options);
    if (movies) {
      await saveMoviesToDatabase(movies);
    }
  } catch (err) {
    console.error("Error in the fetch process:", err);
  }
})();
