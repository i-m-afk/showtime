-- +goose Up
CREATE TABLE booking_details (
    booking_id UUID NOT NULL REFERENCES bookings(bookingid) ON DELETE CASCADE,
    seat_id INT NOT NULL REFERENCES seats(seat_number) ON DELETE CASCADE,
    price DECIMAL(5, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE booking_details;
