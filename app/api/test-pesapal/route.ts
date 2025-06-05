import { NextResponse } from "next/server"
import { pesapalService } from "@/lib/pesapal-service"

export async function GET() {
  try {
    console.log("Testing PesaPal connectivity...")

    // Check environment variables
    const hasCredentials = !!(process.env.PESAPAL_CONSUMER_KEY && process.env.PESAPAL_CONSUMER_SECRET)

    if (!hasCredentials) {
      return NextResponse.json({
        success: false,
        error: "PesaPal credentials not found",
        credentials: {
          consumer_key: !!process.env.PESAPAL_CONSUMER_KEY,
          consumer_secret: !!process.env.PESAPAL_CONSUMER_SECRET,
        },
      })
    }

    // Test token request
    const token = await pesapalService.getAccessToken()

    return NextResponse.json({
      success: true,
      message: "PesaPal connection successful",
      token_received: !!token,
      credentials_configured: true,
    })
  } catch (error) {
    console.error("PesaPal test error:", error)

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      credentials_configured: !!(process.env.PESAPAL_CONSUMER_KEY && process.env.PESAPAL_CONSUMER_SECRET),
    })
  }
}
