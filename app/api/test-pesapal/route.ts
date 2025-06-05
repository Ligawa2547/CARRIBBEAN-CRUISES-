import { NextResponse } from "next/server"
import { pesapalService } from "@/lib/pesapal-service"

export async function GET() {
  try {
    console.log("Testing PesaPal connection...")

    // Check environment variables
    const consumerKey = process.env.PESAPAL_CONSUMER_KEY
    const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json(
        {
          error: "PesaPal credentials not found",
          details: {
            hasConsumerKey: !!consumerKey,
            hasConsumerSecret: !!consumerSecret,
          },
        },
        { status: 500 },
      )
    }

    // Test token retrieval
    const token = await pesapalService.getAccessToken()

    return NextResponse.json({
      success: true,
      message: "PesaPal connection successful",
      tokenLength: token.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("PesaPal test error:", error)

    return NextResponse.json(
      {
        error: "PesaPal connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
