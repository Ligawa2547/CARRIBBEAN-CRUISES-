"use server"
import { createClient } from "@/lib/supabase-server"

export async function createCruiseBookingPayment(formData: FormData) {
  try {
    const supabase = createClient()

    // Extract form data
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const amount = Number.parseFloat(formData.get("amount") as string)
    const cruiseId = formData.get("cruiseId") as string
    const cruiseName = formData.get("cruiseName") as string
    const cabinType = formData.get("cabinType") as string
    const passengers = formData.get("passengers") as string
    const specialRequests = formData.get("specialRequests") as string

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !amount) {
      return { error: "Please fill in all required fields" }
    }

    // Generate unique reference
    const reference = `CRUISE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Store booking in database
    const { data: booking, error: bookingError } = await supabase
      .from("cruise_bookings")
      .insert({
        reference,
        cruise_id: Number.parseInt(cruiseId),
        cruise_name: cruiseName,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        cabin_type: cabinType,
        passengers: Number.parseInt(passengers),
        special_requests: specialRequests,
        amount,
        status: "pending",
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (bookingError) {
      console.error("Booking creation error:", bookingError)
      return { error: "Failed to create booking" }
    }

    // Store payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        merchant_reference: reference,
        amount,
        currency: "KES",
        description: `Cruise Booking - ${cruiseName}`,
        customer_email: email,
        customer_phone: phone,
        payment_type: "cruise",
        status: "pending",
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (paymentError) {
      console.error("Payment creation error:", paymentError)
      return { error: "Failed to create payment record" }
    }

    // Return success with payment URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const paymentUrl = `/api/initiate-payment?reference=${reference}&amount=${amount}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&name=${encodeURIComponent(`${firstName} ${lastName}`)}&type=cruise&description=${encodeURIComponent(`Cruise Booking - ${cruiseName}`)}`

    return { success: true, paymentUrl }
  } catch (error) {
    console.error("Payment creation error:", error)
    return { error: "Failed to process payment" }
  }
}

export async function createMealOrderPayment(formData: FormData) {
  try {
    const supabase = createClient()

    // Extract form data
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const deliveryAddress = formData.get("deliveryAddress") as string
    const amount = Number.parseFloat(formData.get("amount") as string)
    const items = JSON.parse(formData.get("items") as string)

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !deliveryAddress || !amount) {
      return { error: "Please fill in all required fields" }
    }

    // Generate unique reference
    const reference = `MEAL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Store meal order in database
    const { data: order, error: orderError } = await supabase
      .from("meal_orders")
      .insert({
        order_reference: reference,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        delivery_address: deliveryAddress,
        items: JSON.stringify(items),
        amount,
        status: "pending",
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (orderError) {
      console.error("Order creation error:", orderError)
      return { error: "Failed to create order" }
    }

    // Store payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        merchant_reference: reference,
        amount,
        currency: "KES",
        description: `Meal Order - ${items.length} items`,
        customer_email: email,
        customer_phone: phone,
        payment_type: "meal",
        status: "pending",
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (paymentError) {
      console.error("Payment creation error:", paymentError)
      return { error: "Failed to create payment record" }
    }

    // Return success with payment URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const paymentUrl = `/api/initiate-payment?reference=${reference}&amount=${amount}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&name=${encodeURIComponent(`${firstName} ${lastName}`)}&type=meal&description=${encodeURIComponent(`Meal Order - ${items.length} items`)}`

    return { success: true, paymentUrl }
  } catch (error) {
    console.error("Payment creation error:", error)
    return { error: "Failed to process payment" }
  }
}
