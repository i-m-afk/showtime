import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fetch, { RequestInit } from "node-fetch";

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
): Promise<any | undefined> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching movies:", err);
  } finally {
    console.log("Fetching movies completed");
  }
};

// run this script every 24 hours
setInterval(() => {
  fetchMovies(url, options).then((data) => {
    if (data) {
      console.log("Data fetched successfully:", data);
    }
  });
}, 10000); // for testing purposes, change this to 86400000 (24 hours)
