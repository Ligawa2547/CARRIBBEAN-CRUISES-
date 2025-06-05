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

    if (!reference || !amount || !email || !phone || !name) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const callbackUrl = `${baseUrl}/payment/callback?type=${type}&ref=${reference}`

    const paymentData = {
      amount: Number.parseFloat(amount),
      description: description || `Payment for ${type}`,
      type: "MERCHANT" as const,
      reference,
      first_name: name.split(" ")[0] || "Customer",
      last_name: name.split(" ").slice(1).join(" ") || "",
      email,
      phone_number: phone,
      country_code: "KE",
      currency: "USD" as const,
      callback_url: callbackUrl,
    }

    const paymentResponse = await pesapalService.submitOrderRequest(paymentData)

    if (paymentResponse.error) {
      console.error("PesaPal payment error:", paymentResponse.error)
      return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 })
    }

    // Update payment record with tracking ID
    const supabase = createClient()
    await supabase
      .from("payments")
      .update({
        order_tracking_id: paymentResponse.order_tracking_id,
        updated_at: new Date().toISOString(),
      })
      .eq("merchant_reference", reference)

    // Redirect to PesaPal payment page
    return NextResponse.redirect(paymentResponse.redirect_url)
  } catch (error) {
    console.error("Payment initiation error:", error)
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 })
  }
}
