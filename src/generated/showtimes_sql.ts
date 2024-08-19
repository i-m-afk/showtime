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

