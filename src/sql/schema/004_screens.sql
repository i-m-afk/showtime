-- +goose Up
CREATE TABLE screens (
    screenid UUID PRIMARY KEY,
    theater_id UUID NOT NULL REFERENCES theaters(theaterid)  ON DELETE CASCADE,
    type VARCHAR(15), -- 2D, 3D, IMAX etc.
    total_seats INT NOT NULL,
    seats_left INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE screens;
