-- name: GetShowsByTheater :many
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
    st.show_date, st.show_time;

-- name: CreateShowtime :one
INSERT into showtimes
  (movie_id, language, screen_id, show_date, base_price, show_time)
VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
