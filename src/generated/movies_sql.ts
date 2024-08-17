import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getAllMoviesQuery = `-- name: GetAllMovies :many
SELECT id, adult, genre_ids, poster_path, backdrop_path, language, original_title, title, overview, popularity, release_date, video, vote_average, vote_count, created_at, updated_at FROM movies`;

export interface GetAllMoviesRow {
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
    createdAt: Date;
    updatedAt: Date;
}

export async function getAllMovies(client: Client): Promise<GetAllMoviesRow[]> {
    const result = await client.query({
        text: getAllMoviesQuery,
        values: [],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            adult: row[1],
            genreIds: row[2],
            posterPath: row[3],
            backdropPath: row[4],
            language: row[5],
            originalTitle: row[6],
            title: row[7],
            overview: row[8],
            popularity: row[9],
            releaseDate: row[10],
            video: row[11],
            voteAverage: row[12],
            voteCount: row[13],
            createdAt: row[14],
            updatedAt: row[15]
        };
    });
}

export const addMovieQuery = `-- name: AddMovie :one
INSERT INTO movies (id, adult, genre_ids, poster_path, backdrop_path, language, original_title, title, overview, popularity, release_date, video, vote_average, vote_count)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
returning id, adult, genre_ids, poster_path, backdrop_path, language, original_title, title, overview, popularity, release_date, video, vote_average, vote_count, created_at, updated_at`;

export interface AddMovieArgs {
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

export interface AddMovieRow {
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
    createdAt: Date;
    updatedAt: Date;
}

export async function addMovie(client: Client, args: AddMovieArgs): Promise<AddMovieRow | null> {
    const result = await client.query({
        text: addMovieQuery,
        values: [args.id, args.adult, args.genreIds, args.posterPath, args.backdropPath, args.language, args.originalTitle, args.title, args.overview, args.popularity, args.releaseDate, args.video, args.voteAverage, args.voteCount],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        adult: row[1],
        genreIds: row[2],
        posterPath: row[3],
        backdropPath: row[4],
        language: row[5],
        originalTitle: row[6],
        title: row[7],
        overview: row[8],
        popularity: row[9],
        releaseDate: row[10],
        video: row[11],
        voteAverage: row[12],
        voteCount: row[13],
        createdAt: row[14],
        updatedAt: row[15]
    };
}

