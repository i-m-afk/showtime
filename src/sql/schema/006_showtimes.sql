-- +goose Up
CREATE TABLE showtimes (
    showtimeid UUID PRIMARY KEY,
    movie_id INT NOT NULL REFERENCES movies(movieid)  ON DELETE CASCADE,
    language varchar(50),
    screen_id UUID NOT NULL REFERENCES screens(screenid) ON DELETE CASCADE,
    show_date DATE NOT NULL,
    base_price DECIMAL(5,2) NOT NULL,
    show_time TIME NOT NULL, -- add duration form movies for full information -15 from start and +15 additional for interval
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE showtimes;
