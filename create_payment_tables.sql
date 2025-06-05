-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  merchant_reference VARCHAR(255) UNIQUE NOT NULL,
  order_tracking_id VARCHAR(255),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  description TEXT,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  payment_type VARCHAR(50) NOT NULL, -- 'cruise', 'meal'
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'cancelled'
  pesapal_tracking_id VARCHAR(255),
  payment_method VARCHAR(100),
  payment_account VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create cruise_bookings table
CREATE TABLE IF NOT EXISTS cruise_bookings (
  id SERIAL PRIMARY KEY,
  reference VARCHAR(255) UNIQUE NOT NULL,
  cruise_id INTEGER,
  cruise_name VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  cabin_type VARCHAR(100) NOT NULL,
  passengers INTEGER DEFAULT 1,
  special_requests TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  departure_date DATE,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create meal_orders table
CREATE TABLE IF NOT EXISTS meal_orders (
  id SERIAL PRIMARY KEY,
  reference VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  delivery_address TEXT,
  items TEXT NOT NULL, -- JSON string of ordered items
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'preparing', 'delivered', 'cancelled'
  delivery_date DATE,
  delivery_time TIME,
  special_instructions TEXT,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(merchant_reference);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_type ON payments(payment_type);
CREATE INDEX IF NOT EXISTS idx_payments_tracking ON payments(order_tracking_id);

CREATE INDEX IF NOT EXISTS idx_cruise_bookings_reference ON cruise_bookings(reference);
CREATE INDEX IF NOT EXISTS idx_cruise_bookings_email ON cruise_bookings(email);
CREATE INDEX IF NOT EXISTS idx_cruise_bookings_status ON cruise_bookings(status);

CREATE INDEX IF NOT EXISTS idx_meal_orders_reference ON meal_orders(reference);
CREATE INDEX IF NOT EXISTS idx_meal_orders_email ON meal_orders(email);
CREATE INDEX IF NOT EXISTS idx_meal_orders_status ON meal_orders(status);

-- Add some sample data for testing
INSERT INTO cruise_bookings (reference, cruise_id, cruise_name, first_name, last_name, email, phone, cabin_type, passengers, amount, status)
VALUES 
  ('CRUISE_TEST_001', 1, 'Caribbean Paradise', 'John', 'Doe', 'john@example.com', '+1234567890', 'Ocean View', 2, 1299.99, 'confirmed'),
  ('CRUISE_TEST_002', 2, 'Tropical Adventure', 'Jane', 'Smith', 'jane@example.com', '+1234567891', 'Balcony Suite', 1, 1899.99, 'pending')
ON CONFLICT (reference) DO NOTHING;

INSERT INTO meal_orders (reference, first_name, last_name, email, phone, delivery_address, items, amount, status)
VALUES 
  ('MEAL_TEST_001', 'Alice', 'Johnson', 'alice@example.com', '+1234567892', '123 Main St, City', '[{"name":"Grilled Salmon","price":25.99,"quantity":1},{"name":"Caesar Salad","price":12.99,"quantity":2}]', 51.97, 'confirmed'),
  ('MEAL_TEST_002', 'Bob', 'Wilson', 'bob@example.com', '+1234567893', '456 Oak Ave, Town', '[{"name":"Beef Steak","price":35.99,"quantity":1},{"name":"Red Wine","price":18.99,"quantity":1}]', 54.98, 'pending')
ON CONFLICT (reference) DO NOTHING;

INSERT INTO payments (merchant_reference, amount, currency, description, customer_email, customer_phone, payment_type, status)
VALUES 
  ('CRUISE_TEST_001', 1299.99, 'USD', 'Cruise Booking - Caribbean Paradise', 'john@example.com', '+1234567890', 'cruise', 'completed'),
  ('CRUISE_TEST_002', 1899.99, 'USD', 'Cruise Booking - Tropical Adventure', 'jane@example.com', '+1234567891', 'cruise', 'pending'),
  ('MEAL_TEST_001', 51.97, 'USD', 'Meal Order - 3 items', 'alice@example.com', '+1234567892', 'meal', 'completed'),
  ('MEAL_TEST_002', 54.98, 'USD', 'Meal Order - 2 items', 'bob@example.com', '+1234567893', 'meal', 'pending')
ON CONFLICT (merchant_reference) DO NOTHING;
