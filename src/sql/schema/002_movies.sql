-- +goose Up
CREATE TABLE movies (
    id  INT PRIMARY KEY,
    adult BOOLEAN NOT NULL,
    genre_ids INT[],
    poster_path VARCHAR(255),
    backdrop_path VARCHAR(255),
    language VARCHAR(50),
    original_title VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    overview TEXT,
    popularity DECIMAL(7,3),
    release_date DATE,
    video BOOLEAN,
    vote_average DECIMAL(2,1), -- average rating
    vote_count INT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE movies;
