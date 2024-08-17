-- name: GetAllMovies :many
SELECT * FROM movies;

-- name: AddMovie :one
INSERT INTO movies (id, adult, genre_ids, poster_path, backdrop_path, language, original_title, title, overview, popularity, release_date, video, vote_average, vote_count)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
returning *;
