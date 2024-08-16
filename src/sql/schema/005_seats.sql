-- +goose Up
CREATE TABLE seats (
    seat_number INT PRIMARY KEY,
    screen_id UUID NOT NULL REFERENCES screens(id) ON DELETE CASCADE,
    seat_type VARCHAR(10) NOT NULL DEFAULT '.', -- vip, premium, regular etc. '.' means there is no seat
    row   INT NOT NULL, -- position row and column
    col   INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +goose Down
Drop TABLE seats;
