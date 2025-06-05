import { createClient } from "@/lib/supabase-server"
import { pesapalService } from "@/lib/pesapal-service"
import { redirect } from "next/navigation"

export async function createCruiseBookingPayment(formData: FormData) {
  try {
    const supabase = createClient()

    // Extract form data
    const cruiseId = formData.get("cruiseId") as string
    const cruiseName = formData.get("cruiseName") as string
    const cabinType = formData.get("cabinType") as string
    const passengers = Number.parseInt(formData.get("passengers") as string) || 1
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const amount = Number.parseFloat(formData.get("amount") as string)

    // Generate unique reference
    const bookingReference = `CRUISE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        merchant_reference: bookingReference,
        payment_type: "cruise_booking",
        amount: amount,
        currency: "USD",
        status: "pending",
        customer_name: `${firstName} ${lastName}`,
        customer_email: email,
        customer_phone: phone,
        description: `Cruise booking for ${cruiseName} - ${cabinType}`,
      })
      .select()
      .single()

    if (paymentError) {
      throw new Error("Failed to create payment record")
    }

    // Create cruise booking record
    const { error: bookingError } = await supabase.from("cruise_bookings").insert({
      payment_id: payment.id,
      cruise_id: cruiseId,
      cruise_name: cruiseName,
      cabin_type: cabinType,
      passengers: passengers,
      booking_reference: bookingReference,
      passenger_details: {
        primary_passenger: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
        },
      },
    })

    if (bookingError) {
      throw new Error("Failed to create booking record")
    }

    // Submit payment to PesaPal
    const paymentRequest = {
      amount: amount,
      description: `Cruise Booking - ${cruiseName}`,
      type: "MERCHANT" as const,
      reference: bookingReference,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phone,
      country_code: "US",
      currency: "USD" as const,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/callback?type=cruise&ref=${bookingReference}`,
    }

    const pesapalResponse = await pesapalService.submitOrderRequest(paymentRequest)

    if (pesapalResponse.error) {
      throw new Error(pesapalResponse.error)
    }

    // Update payment with PesaPal tracking ID
    await supabase
      .from("payments")
      .update({
        order_tracking_id: pesapalResponse.order_tracking_id,
      })
      .eq("id", payment.id)

    // Redirect to PesaPal payment page
    redirect(pesapalResponse.redirect_url)
  } catch (error) {
    console.error("Payment creation error:", error)
    return { error: error instanceof Error ? error.message : "Payment failed" }
  }
}

export async function createMealOrderPayment(formData: FormData) {
  try {
    const supabase = createClient()

    // Extract form data
    const items = JSON.parse(formData.get("items") as string)
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const deliveryAddress = formData.get("deliveryAddress") as string
    const amount = Number.parseFloat(formData.get("amount") as string)

    // Generate unique reference
    const orderReference = `MEAL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        merchant_reference: orderReference,
        payment_type: "meal_order",
        amount: amount,
        currency: "USD",
        status: "pending",
        customer_name: `${firstName} ${lastName}`,
        customer_email: email,
        customer_phone: phone,
        description: `Meal order - ${items.length} items`,
      })
      .select()
      .single()

    if (paymentError) {
      throw new Error("Failed to create payment record")
    }

    // Create meal order record
    const { error: orderError } = await supabase.from("meal_orders").insert({
      payment_id: payment.id,
      order_reference: orderReference,
      items: items,
      delivery_address: deliveryAddress,
    })

    if (orderError) {
      throw new Error("Failed to create order record")
    }

    // Submit payment to PesaPal
    const paymentRequest = {
      amount: amount,
      description: `Meal Order - ${items.length} items`,
      type: "MERCHANT" as const,
      reference: orderReference,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phone,
      country_code: "US",
      currency: "USD" as const,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/callback?type=meal&ref=${orderReference}`,
    }

    const pesapalResponse = await pesapalService.submitOrderRequest(paymentRequest)

    if (pesapalResponse.error) {
      throw new Error(pesapalResponse.error)
    }

    // Update payment with PesaPal tracking ID
    await supabase
      .from("payments")
      .update({
        order_tracking_id: pesapalResponse.order_tracking_id,
      })
      .eq("id", payment.id)

    // Redirect to PesaPal payment page
    redirect(pesapalResponse.redirect_url)
  } catch (error) {
    console.error("Payment creation error:", error)
    return { error: error instanceof Error ? error.message : "Payment failed" }
  }
}
