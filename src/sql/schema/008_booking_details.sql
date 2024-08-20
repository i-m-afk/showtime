-- +goose Up
CREATE TABLE booking_details (
    booking_id UUID NOT NULL REFERENCES bookings(bookingid) ON DELETE CASCADE,
    seat_number INT NOT NULL,
    row INT NOT NULL,
    col INT NOT NULL,
    screen_id UUID NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (booking_id, seat_number, row, col, screen_id),
    FOREIGN KEY (seat_number, row, col, screen_id) REFERENCES seats(seat_number, row, col, screen_id) ON DELETE CASCADE
);
-- +goose Down
DROP TABLE booking_details;
