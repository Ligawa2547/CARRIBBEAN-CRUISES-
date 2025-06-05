import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"
import { pesapalService } from "@/lib/pesapal-service"

export async function POST(request: NextRequest) {
  try {
    const { orderTrackingId, reference, type } = await request.json()

    if (!orderTrackingId || !reference) {
      return NextResponse.json({ success: false, error: "Missing required parameters" }, { status: 400 })
    }

    const supabase = createClient()

    // Get payment status from PesaPal
    const pesapalStatus = await pesapalService.getTransactionStatus(orderTrackingId)

    // Update payment status in database
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .update({
        status: pesapalStatus.status_code === 1 ? "completed" : "failed",
        pesapal_tracking_id: pesapalStatus.tracking_id,
        payment_method: pesapalStatus.payment_method,
        payment_account: pesapalStatus.payment_account,
        updated_at: new Date().toISOString(),
      })
      .eq("order_tracking_id", orderTrackingId)
      .select()
      .single()

    if (paymentError) {
      console.error("Database update error:", paymentError)
      return NextResponse.json({ success: false, error: "Database update failed" }, { status: 500 })
    }

    // Send confirmation email if payment successful
    if (pesapalStatus.status_code === 1) {
      // TODO: Send confirmation email using Resend
      console.log("Payment successful, should send confirmation email")
    }

    return NextResponse.json({
      success: pesapalStatus.status_code === 1,
      payment: payment,
      pesapalStatus: pesapalStatus,
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 })
  }
}
