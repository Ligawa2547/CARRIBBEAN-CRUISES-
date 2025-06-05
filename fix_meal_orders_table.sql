-- Add the missing order_reference column if it doesn't exist
ALTER TABLE meal_orders 
ADD COLUMN IF NOT EXISTS order_reference VARCHAR(255) UNIQUE;

-- Update existing records to have order_reference based on reference
UPDATE meal_orders 
SET order_reference = reference 
WHERE order_reference IS NULL;

-- Make order_reference NOT NULL after updating existing records
ALTER TABLE meal_orders 
ALTER COLUMN order_reference SET NOT NULL;

-- Add index for order_reference
CREATE INDEX IF NOT EXISTS idx_meal_orders_order_reference ON meal_orders(order_reference);

-- Also ensure cruise_bookings has booking_reference
ALTER TABLE cruise_bookings 
ADD COLUMN IF NOT EXISTS booking_reference VARCHAR(255) UNIQUE;

-- Update existing cruise booking records
UPDATE cruise_bookings 
SET booking_reference = reference 
WHERE booking_reference IS NULL;

-- Add index for booking_reference
CREATE INDEX IF NOT EXISTS idx_cruise_bookings_booking_reference ON cruise_bookings(booking_reference);
