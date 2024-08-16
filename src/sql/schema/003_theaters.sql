-- +goose Up
CREATE TABLE theaters (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    address TEXT NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    pin_code VARCHAR(6),
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE theaters;
