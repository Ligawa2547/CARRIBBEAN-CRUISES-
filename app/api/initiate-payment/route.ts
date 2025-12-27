import { type NextRequest, NextResponse } from "next/server"
import { pesapalService } from "@/lib/pesapal-service"
import { createClient } from "@/lib/supabase-server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    console.log("=== Payment Initiation Started ===")

    const { searchParams } = new URL(request.url)
    const reference = searchParams.get("reference")
    const amount = searchParams.get("amount")
    const email = searchParams.get("email")
    const phone = searchParams.get("phone")
    const name = searchParams.get("name")
    const type = searchParams.get("type")
    const description = searchParams.get("description")

    console.log("Received parameters:", {
      reference,
      amount,
      email,
      phone,
      name,
      type,
      description,
    })

    // Validate required parameters
    const missingParams = []
    if (!reference) missingParams.push("reference")
    if (!amount) missingParams.push("amount")
    if (!email) missingParams.push("email")
    if (!phone) missingParams.push("phone")
    if (!name) missingParams.push("name")

    if (missingParams.length > 0) {
      console.error("Missing required parameters:", missingParams)
      return NextResponse.json(
        {
          error: "Missing required parameters",
          missing: missingParams,
          received: { reference, amount, email, phone, name, type, description },
        },
        { status: 400 },
      )
    }

    // Validate environment variables
    if (!process.env.PESAPAL_CONSUMER_KEY || !process.env.PESAPAL_CONSUMER_SECRET) {
      console.error("PesaPal credentials not configured")
      return NextResponse.json(
        {
          error: "Payment gateway not configured",
          details: "PesaPal credentials missing from environment variables",
        },
        { status: 500 },
      )
    }

    // Validate amount
    const numericAmount = Number.parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) {
      console.error("Invalid amount:", amount)
      return NextResponse.json(
        {
          error: "Invalid amount",
          provided: amount,
        },
        { status: 400 },
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const callbackUrl = `${baseUrl}/payment/callback?type=${type || "unknown"}&ref=${reference}`

    // Clean and validate phone number
    let cleanPhone = phone.replace(/[^\d+]/g, "")
    if (!cleanPhone.startsWith("+")) {
      // Assume Kenyan number if no country code
      cleanPhone = cleanPhone.startsWith("0") ? `+254${cleanPhone.slice(1)}` : `+254${cleanPhone}`
    }

    // Split name properly
    const nameParts = name.trim().split(" ")
    const firstName = nameParts[0] || "Customer"
    const lastName = nameParts.slice(1).join(" ") || "User"

    const paymentData = {
      amount: numericAmount,
      description: description || `Payment for ${type || "service"}`,
      type: "MERCHANT" as const,
      reference,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: cleanPhone,
      country_code: "KE",
      currency: "KES" as const,
      callback_url: callbackUrl,
    }

    console.log("Prepared payment data:", {
      ...paymentData,
      phone_number: cleanPhone.substring(0, 4) + "****", // Mask phone for security
    })

    // Submit payment request
    console.log("Submitting payment request to PesaPal...")
    const paymentResponse = await pesapalService.submitOrderRequest(paymentData)

    console.log("PesaPal response received:", {
      hasOrderTrackingId: !!paymentResponse.order_tracking_id,
      hasRedirectUrl: !!paymentResponse.redirect_url,
      status: paymentResponse.status,
      error: paymentResponse.error,
    })

    if (paymentResponse.error || !paymentResponse.redirect_url) {
      console.error("PesaPal payment error:", paymentResponse)
      return NextResponse.json(
        {
          error: "Payment initiation failed",
          details: paymentResponse.error || "No redirect URL received",
          pesapalResponse: paymentResponse,
        },
        { status: 500 },
      )
    }

    // Update payment record with tracking ID
    try {
      console.log("Updating payment record in database...")
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
      } else {
        console.log("Payment record updated successfully")
      }
    } catch (dbError) {
      console.error("Database update error:", dbError)
      // Continue with payment even if DB update fails
    }

    console.log("Payment initiated successfully, redirecting to:", paymentResponse.redirect_url)
    console.log("=== Payment Initiation Completed ===")

    // Redirect to PesaPal payment page
    return NextResponse.redirect(paymentResponse.redirect_url)
  } catch (error) {
    console.error("=== Payment Initiation Error ===")
    console.error("Error details:", error)
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")

    // Return detailed error information for debugging
    const errorDetails = {
      message: error instanceof Error ? error.message : "Unknown error occurred",
      type: error instanceof Error ? error.constructor.name : typeof error,
      timestamp: new Date().toISOString(),
    }

    console.error("Returning error response:", errorDetails)

    return NextResponse.json(
      {
        error: "Payment initiation failed",
        details: errorDetails,
        debug: {
          url: request.url,
          method: request.method,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 },
    )
  }
}

// Add POST method support for testing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("POST request body:", body)

    // Convert POST body to query parameters and redirect to GET
    const params = new URLSearchParams(body)
    const redirectUrl = `/api/initiate-payment?${params.toString()}`

    return NextResponse.redirect(new URL(redirectUrl, request.url))
  } catch (error) {
    console.error("POST method error:", error)
    return NextResponse.json(
      {
        error: "Invalid POST request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    )
  }
}
