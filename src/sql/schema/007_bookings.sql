-- +goose Up
CREATE TABLE bookings (
    bookingid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(userid) ON DELETE CASCADE ,
    showtime_id UUID NOT NULL REFERENCES showtimes(showtimeid) ON DELETE CASCADE ,
    booking_time TIMESTAMP NOT NULL DEFAULT NOW(),
    total_amount DECIMAL(10, 2) NOT NULL, -- (total_seatsbooked)*baseprice + seatprice + 18%gst
    status VARCHAR(50) NOT NULL, -- e.g., booked, cancelled
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +goose Down
DROP TABLE bookings;
