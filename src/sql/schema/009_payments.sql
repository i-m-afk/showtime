-- +goose Up
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(bookingid) ON DELETE CASCADE,
    payment_method VARCHAR(50) NOT NULL, -- credit card, debit card, UPI, etc.
    payment_status VARCHAR(50) NOT NULL, -- success, failed
    payment_time TIMESTAMP NOT NULL DEFAULT NOW(),
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
-- +goose Down
DROP table payments;
