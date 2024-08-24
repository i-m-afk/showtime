import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const addTheaterQuery = `-- name: AddTheater :one
INSERT INTO theaters(name, image, address, city, state, pin_code, latitude)
VALUES ($1, $2, $3, $4, $5, $6, $7)
returning theaterid, name, image, address, city, state, pin_code, latitude, longitude, contact_number, created_at, updated_at`;

export interface AddTheaterArgs {
    name: string;
    image: string | null;
    address: string;
    city: string;
    state: string;
    pinCode: string | null;
    latitude: string;
}

export interface AddTheaterRow {
    theaterid: string;
    name: string;
    image: string | null;
    address: string;
    city: string;
    state: string;
    pinCode: string | null;
    latitude: string;
    longitude: string;
    contactNumber: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export async function addTheater(client: Client, args: AddTheaterArgs): Promise<AddTheaterRow | null> {
    const result = await client.query({
        text: addTheaterQuery,
        values: [args.name, args.image, args.address, args.city, args.state, args.pinCode, args.latitude],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        theaterid: row[0],
        name: row[1],
        image: row[2],
        address: row[3],
        city: row[4],
        state: row[5],
        pinCode: row[6],
        latitude: row[7],
        longitude: row[8],
        contactNumber: row[9],
        createdAt: row[10],
        updatedAt: row[11]
    };
}

export const getTheaterByIDQuery = `-- name: GetTheaterByID :one
SELECT theaterid, name, image, address, city, state, pin_code, latitude, longitude, contact_number, created_at, updated_at FROM theaters
WHERE theaterid = $1`;

export interface GetTheaterByIDArgs {
    theaterid: string;
}

export interface GetTheaterByIDRow {
    theaterid: string;
    name: string;
    image: string | null;
    address: string;
    city: string;
    state: string;
    pinCode: string | null;
    latitude: string;
    longitude: string;
    contactNumber: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export async function getTheaterByID(client: Client, args: GetTheaterByIDArgs): Promise<GetTheaterByIDRow | null> {
    const result = await client.query({
        text: getTheaterByIDQuery,
        values: [args.theaterid],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        theaterid: row[0],
        name: row[1],
        image: row[2],
        address: row[3],
        city: row[4],
        state: row[5],
        pinCode: row[6],
        latitude: row[7],
        longitude: row[8],
        contactNumber: row[9],
        createdAt: row[10],
        updatedAt: row[11]
    };
}

export const getTheatersByMovieAndLocationQuery = `-- name: GetTheatersByMovieAndLocation :many
SELECT DISTINCT
    t.theaterid,
    t.name,
    t.address,
    t.city,
    t.state,
    t.contact_number,
    t.latitude,
    t.longitude,
    s.screenid,
    s.type AS screen_type,
    s.total_seats,
    s.seats_left,
    m.movieid,
    m.title AS movie_title,
    m.language AS movie_language,
    st.show_date,
    st.base_price
FROM theaters t
JOIN screens s ON t.theaterid = s.theater_id
JOIN showtimes st ON s.screenid = st.screen_id
JOIN movies m ON st.movie_id = m.movieid
WHERE m.movieid = $1
  AND LOWER(t.city) = LOWER($2)
  AND st.show_time > CURRENT_TIME
ORDER BY st.show_date ASC`;

export interface GetTheatersByMovieAndLocationArgs {
    movieid: number;
    lower: string;
}

export interface GetTheatersByMovieAndLocationRow {
    theaterid: string;
    name: string;
    address: string;
    city: string;
    state: string;
    contactNumber: string | null;
    latitude: string;
    longitude: string;
    screenid: string;
    screenType: string | null;
    totalSeats: number;
    seatsLeft: number;
    movieid: number;
    movieTitle: string;
    movieLanguage: string | null;
    showDate: Date;
    basePrice: string;
}

export async function getTheatersByMovieAndLocation(client: Client, args: GetTheatersByMovieAndLocationArgs): Promise<GetTheatersByMovieAndLocationRow[]> {
    const result = await client.query({
        text: getTheatersByMovieAndLocationQuery,
        values: [args.movieid, args.lower],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            theaterid: row[0],
            name: row[1],
            address: row[2],
            city: row[3],
            state: row[4],
            contactNumber: row[5],
            latitude: row[6],
            longitude: row[7],
            screenid: row[8],
            screenType: row[9],
            totalSeats: row[10],
            seatsLeft: row[11],
            movieid: row[12],
            movieTitle: row[13],
            movieLanguage: row[14],
            showDate: row[15],
            basePrice: row[16]
        };
    });
}

