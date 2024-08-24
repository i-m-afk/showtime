import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getShowsByTheaterQuery = `-- name: GetShowsByTheater :many
SELECT
    t.name AS theater_name,
    sc.screenid AS screen_id,
    m.title AS movie_title,
    m.language AS movie_language,
    st.show_date,
    st.show_time,
    st.base_price,
    sc.type AS screen_type,
    sc.seats_left
FROM
    theaters t
JOIN
    screens sc ON t.theaterid = sc.theater_id
JOIN
    showtimes st ON sc.screenid = st.screen_id
JOIN
    movies m ON st.movie_id = m.movieid
WHERE
    t.theaterid = $1
    AND st.show_date >= DATE('now')
ORDER BY
    st.show_date, st.show_time`;

export interface GetShowsByTheaterArgs {
    theaterid: string;
}

export interface GetShowsByTheaterRow {
    theaterName: string;
    screenId: string;
    movieTitle: string;
    movieLanguage: string | null;
    showDate: Date;
    showTime: Date;
    basePrice: string;
    screenType: string | null;
    seatsLeft: number;
}

export async function getShowsByTheater(client: Client, args: GetShowsByTheaterArgs): Promise<GetShowsByTheaterRow[]> {
    const result = await client.query({
        text: getShowsByTheaterQuery,
        values: [args.theaterid],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            theaterName: row[0],
            screenId: row[1],
            movieTitle: row[2],
            movieLanguage: row[3],
            showDate: row[4],
            showTime: row[5],
            basePrice: row[6],
            screenType: row[7],
            seatsLeft: row[8]
        };
    });
}

export const createShowtimeQuery = `-- name: CreateShowtime :one
INSERT into showtimes
  (movie_id, language, screen_id, show_date, base_price, show_time)
VALUES ($1, $2, $3, $4, $5, $6) RETURNING showtimeid, movie_id, language, screen_id, show_date, base_price, show_time, created_at, updated_at`;

export interface CreateShowtimeArgs {
    movieId: number;
    language: string | null;
    screenId: string;
    showDate: Date;
    basePrice: string;
    showTime: Date;
}

export interface CreateShowtimeRow {
    showtimeid: string;
    movieId: number;
    language: string | null;
    screenId: string;
    showDate: Date;
    basePrice: string;
    showTime: Date;
    createdAt: Date;
    updatedAt: Date;
}

export async function createShowtime(client: Client, args: CreateShowtimeArgs): Promise<CreateShowtimeRow | null> {
    const result = await client.query({
        text: createShowtimeQuery,
        values: [args.movieId, args.language, args.screenId, args.showDate, args.basePrice, args.showTime],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        showtimeid: row[0],
        movieId: row[1],
        language: row[2],
        screenId: row[3],
        showDate: row[4],
        basePrice: row[5],
        showTime: row[6],
        createdAt: row[7],
        updatedAt: row[8]
    };
}

