-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  order_tracking_id VARCHAR(255) UNIQUE NOT NULL,
  merchant_reference VARCHAR(255) NOT NULL,
  payment_type VARCHAR(50) NOT NULL, -- 'cruise_booking', 'meal_order'
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'cancelled'
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  description TEXT,
  pesapal_tracking_id VARCHAR(255),
  payment_method VARCHAR(100),
  payment_account VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create cruise bookings table
CREATE TABLE IF NOT EXISTS cruise_bookings (
  id SERIAL PRIMARY KEY,
  payment_id INTEGER REFERENCES payments(id),
  cruise_id VARCHAR(100) NOT NULL,
  cruise_name VARCHAR(255) NOT NULL,
  cabin_type VARCHAR(100) NOT NULL,
  passengers INTEGER DEFAULT 1,
  departure_date DATE,
  booking_reference VARCHAR(100) UNIQUE NOT NULL,
  passenger_details JSONB,
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create meal orders table
CREATE TABLE IF NOT EXISTS meal_orders (
  id SERIAL PRIMARY KEY,
  payment_id INTEGER REFERENCES payments(id),
  order_reference VARCHAR(100) UNIQUE NOT NULL,
  items JSONB NOT NULL,
  delivery_address TEXT,
  delivery_date DATE,
  delivery_time TIME,
  special_instructions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_type ON payments(payment_type);
CREATE INDEX IF NOT EXISTS idx_payments_tracking ON payments(order_tracking_id);
CREATE INDEX IF NOT EXISTS idx_cruise_bookings_reference ON cruise_bookings(booking_reference);
CREATE INDEX IF NOT EXISTS idx_meal_orders_reference ON meal_orders(order_reference);
