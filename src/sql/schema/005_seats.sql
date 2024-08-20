-- +goose Up
CREATE TABLE seats (
    seat_number INT NOT NULL,
    screen_id UUID NOT NULL REFERENCES screens(screenid) ON DELETE CASCADE,
    seat_type VARCHAR(10) NOT NULL DEFAULT '.', -- vip, premium, regular etc. '.' means there is no seat
    row   INT NOT NULL, -- position row and column
    col   INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (seat_number, row, col, screen_id)
);

-- +goose Down
DROP TABLE seats;
