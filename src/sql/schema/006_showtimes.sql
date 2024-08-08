-- +goose Up
CREATE TABLE showtimes (
    id UUID PRIMARY KEY,
    movie_id UUID NOT NULL REFERENCES movies(id)  ON DELETE CASCADE,
    screen_id UUID NOT NULL REFERENCES screens(id) ON DELETE CASCADE,
    show_date DATE NOT NULL,
    show_time TIME NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE showtimes;
