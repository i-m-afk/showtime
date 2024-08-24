-- name: AddTheater :one
INSERT INTO theaters(name, image, address, city, state, pin_code, latitude)
VALUES ($1, $2, $3, $4, $5, $6, $7)
returning *;

-- name: GetTheaterByID :one
SELECT * FROM theaters
WHERE theaterid = $1;

-- name: GetTheatersByMovieAndLocation :many
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
ORDER BY st.show_date ASC;
