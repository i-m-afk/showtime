-- +goose Up
CREATE TABLE seats (
    id UUID PRIMARY KEY,
    screen_id UUID NOT NULL REFERENCES screens(id) ON DELETE CASCADE,
    seat_number VARCHAR(10) NOT NULL,
    seat_type VARCHAR(50) NOT NULL, -- vip, premium, regular etc.
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +goose Down
Drop TABLE seats;
