-- name: GetAllMovies :many
SELECT * FROM movies;

-- name: GetMovieById :one
SELECT * FROM movies
WHERE movieid = $1;

-- name: AddMovie :one
INSERT INTO movies (movieid, adult, genre_ids, poster_path, backdrop_path, language, original_title, title, overview, popularity, release_date, video, vote_average, vote_count)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
returning *;

-- name: UpdateMovie :one
UPDATE movies
SET
    title = COALESCE(sqlc.narg('title'), title),
    overview = COALESCE(sqlc.narg('overview'), overview),
    popularity = COALESCE(sqlc.narg('popularity'), popularity),
    poster_path = COALESCE(sqlc.narg('poster_path'), poster_path),
    backdrop_path = COALESCE(sqlc.narg('backdrop_path'), backdrop_path),
    language = COALESCE(sqlc.narg('language'), language),
    release_date = COALESCE(sqlc.narg('release_date'), release_date),
    vote_average = COALESCE(sqlc.narg('vote_average'), vote_average),
    vote_count = COALESCE(sqlc.narg('vote_count'), vote_count),
    adult = COALESCE(sqlc.narg('adult'), adult),
    video = COALESCE(sqlc.narg('video'), video),
    genre_ids = COALESCE(sqlc.narg('genre_ids'), genre_ids),
    updated_at = NOW()
WHERE movieid = sqlc.arg('movieid')
RETURNING movieid, adult, genre_ids, poster_path, backdrop_path, language, original_title, title, overview, popularity, release_date, video, vote_average, vote_count, created_at, updated_at;

-- name: DeleteMovie :one
DELETE FROM movies
WHERE movieid = $1
returning *;

-- name: GetMoviesByTitle :many
SELECT * FROM movies WHERE title ILIKE '%' || @name || '%';

