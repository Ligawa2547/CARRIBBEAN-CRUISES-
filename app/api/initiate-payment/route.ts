import { type NextRequest, NextResponse } from "next/server"
import { pesapalService } from "@/lib/pesapal-service"
import { createClient } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reference = searchParams.get("reference")
    const amount = searchParams.get("amount")
    const email = searchParams.get("email")
    const phone = searchParams.get("phone")
    const name = searchParams.get("name")
    const type = searchParams.get("type")
    const description = searchParams.get("description")

    console.log("Payment initiation request:", {
      reference,
      amount,
      email,
      phone,
      name,
      type,
      description,
    })

    if (!reference || !amount || !email || !phone || !name) {
      console.error("Missing required parameters")
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Validate environment variables
    if (!process.env.PESAPAL_CONSUMER_KEY || !process.env.PESAPAL_CONSUMER_SECRET) {
      console.error("PesaPal credentials not configured")
      return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const callbackUrl = `${baseUrl}/payment/callback?type=${type}&ref=${reference}`

    // Clean phone number (remove any non-digits except +)
    const cleanPhone = phone.replace(/[^\d+]/g, "")

    // Split name properly
    const nameParts = name.trim().split(" ")
    const firstName = nameParts[0] || "Customer"
    const lastName = nameParts.slice(1).join(" ") || ""

    const paymentData = {
      amount: Number.parseFloat(amount),
      description: description || `Payment for ${type}`,
      type: "MERCHANT" as const,
      reference,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: cleanPhone,
      country_code: "KE", // Default to Kenya
      currency: "KES" as const, // Changed to KES for better compatibility
      callback_url: callbackUrl,
    }

    console.log("Prepared payment data:", paymentData)

    const paymentResponse = await pesapalService.submitOrderRequest(paymentData)

    if (paymentResponse.error) {
      console.error("PesaPal payment error:", paymentResponse.error)
      return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 })
    }

    // Update payment record with tracking ID
    try {
      const supabase = createClient()
      const { error: updateError } = await supabase
        .from("payments")
        .update({
          order_tracking_id: paymentResponse.order_tracking_id,
          updated_at: new Date().toISOString(),
        })
        .eq("merchant_reference", reference)

      if (updateError) {
        console.error("Failed to update payment record:", updateError)
        // Don't fail the payment for this, just log it
      }
    } catch (dbError) {
      console.error("Database update error:", dbError)
      // Continue with payment even if DB update fails
    }

    console.log("Payment initiated successfully, redirecting to:", paymentResponse.redirect_url)

    // Redirect to PesaPal payment page
    return NextResponse.redirect(paymentResponse.redirect_url)
  } catch (error) {
    console.error("Payment initiation error:", error)

    // Return more specific error information
    const errorMessage = error instanceof Error ? error.message : "Payment initiation failed"
    return NextResponse.json(
      {
        error: "Payment initiation failed",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
