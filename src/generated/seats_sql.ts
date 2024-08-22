import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const insertSeatsQuery = `-- name: InsertSeats :exec


WITH parsed_json AS (
  SELECT
      (elem ->> 'seat_number')::INT AS seat_number,
      (elem ->> 'screen_id')::UUID AS screen_id,
      (elem ->> 'seat_type')::VARCHAR AS seat_type,
      (elem ->> 'row')::INT AS row,
      (elem ->> 'col')::INT AS col
  FROM
      jsonb_array_elements($1::jsonb) as elem
)
INSERT INTO seats (seat_number, screen_id, seat_type, row, col)
SELECT
    seat_number,
    screen_id,
    seat_type,
    row,
    col
FROM
    parsed_json
ON CONFLICT (seat_number, row, col, screen_id)
  DO UPDATE SET
    seat_type = EXCLUDED.seat_type,
    updated_at = NOW()`;

export interface InsertSeatsArgs {
    parseJson: any;
}

export async function insertSeats(client: Client, args: InsertSeatsArgs): Promise<void> {
    await client.query({
        text: insertSeatsQuery,
        values: [args.parseJson],
        rowMode: "array"
    });
}

export const getSeatsByScreenIDQuery = `-- name: GetSeatsByScreenID :many

SELECT
    seat_number,
    row,
    col,
    seat_type
FROM
    seats
WHERE
    screen_id = $1`;

export interface GetSeatsByScreenIDArgs {
    screenId: string;
}

export interface GetSeatsByScreenIDRow {
    seatNumber: number;
    row: number;
    col: number;
    seatType: string;
}

export async function getSeatsByScreenID(client: Client, args: GetSeatsByScreenIDArgs): Promise<GetSeatsByScreenIDRow[]> {
    const result = await client.query({
        text: getSeatsByScreenIDQuery,
        values: [args.screenId],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            seatNumber: row[0],
            row: row[1],
            col: row[2],
            seatType: row[3]
        };
    });
}

export const deleteAllSeatsByScreenIDQuery = `-- name: DeleteAllSeatsByScreenID :exec
DELETE FROM seats
WHERE screen_id = $1`;

export interface DeleteAllSeatsByScreenIDArgs {
    screenId: string;
}

export async function deleteAllSeatsByScreenID(client: Client, args: DeleteAllSeatsByScreenIDArgs): Promise<void> {
    await client.query({
        text: deleteAllSeatsByScreenIDQuery,
        values: [args.screenId],
        rowMode: "array"
    });
}

