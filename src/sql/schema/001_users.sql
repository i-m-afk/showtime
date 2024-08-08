-- +goose Up
CREATE TABLE users (
    id  UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL CHECK (role IN ('admin', 'user', 'superadmin')) DEFAULT 'user', -- or make a seperate table for admins ??
    phone VARCHAR(13) NOT NULL,
    order_id INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE users;
