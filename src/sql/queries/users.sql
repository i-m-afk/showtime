-- name: GetUserById :one
SELECT * FROM users WHERE userid = $1;

-- name: CreateUser :one
INSERT INTO users (username, name, email, role, phone, password)
VALUES ($1, $2, $3, $4, $5, $6)
returning *;
