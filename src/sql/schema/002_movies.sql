-- +goose Up
CREATE TABLE movies (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INT NOT NULL, -- duration in minutes
    language VARCHAR(50),
    genre VARCHAR(255),
    release_date DATE,
    rating DECIMAL(2,1), -- average rating
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE movies;

