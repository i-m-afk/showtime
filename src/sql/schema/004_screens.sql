-- +goose Up
CREATE TABLE screens (
    id UUID PRIMARY KEY,
    theater_id UUID NOT NULL REFERENCES theaters(id)  ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE screens;
