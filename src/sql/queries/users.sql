-- name: GetUserById :one
SELECT * FROM users WHERE id = $1;

-- name: CreateUser :one
INSERT INTO users (id, username, name, email, role, phone, order_id, password)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
returning *;
