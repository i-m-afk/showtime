-- inspiration:  https://github.com/spotlightpa/almanack/blob/d48b9e2167754e56b729788fe04d1270f00c38af/sql/queries/gdocs_image.sql#L6


-- name: InsertSeats :exec
WITH parsed_json AS (
  SELECT
      (elem ->> 'seat_number')::INT AS seat_number,
      (elem ->> 'screen_id')::UUID AS screen_id,
      (elem ->> 'seat_type')::VARCHAR AS seat_type,
      (elem ->> 'row')::INT AS row,
      (elem ->> 'col')::INT AS col
  FROM
      jsonb_array_elements(@parse_json::jsonb) as elem
)
INSERT INTO seats (seat_number, screen_id, seat_type, row, col)
SELECT
    seat_number,
    screen_id,
    seat_type,
    row,
    col
FROM
    parsed_json;

-- sqlc was failing to generate correct code for this query, so had to create a CTE to parse the json and then insert the values into the seats table.
-- INSERT INTO seats (seat_number, screen_id, seat_type, row, col)
--       SELECT 
--           (elem ->> 'seat_number')::INT,
--           (elem ->> 'screen_id')::UUID,
--           (elem ->> 'seat_type')::VARCHAR,
--           (elem ->> 'row')::INT,
--           (elem ->> 'col')::INT
--       FROM jsonb_array_elements($1::jsonb) as elem;

