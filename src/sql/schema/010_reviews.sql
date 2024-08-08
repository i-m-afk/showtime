-- +goose Up
CREATE TABLE reviews (
    id UUID PRIMARY KEY,
    movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE ,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE reviews;
