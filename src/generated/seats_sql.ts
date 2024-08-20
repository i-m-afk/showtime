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
    parsed_json`;

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

