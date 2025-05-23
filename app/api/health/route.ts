import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-server"

export async function GET() {
  try {
    // Check database connection
    const { data, error } = await supabase.from("jobs").select("id").limit(1)

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          message: "Database connection failed",
          error: error.message,
          details: {
            code: error.code,
            hint: error.hint,
          },
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      status: "ok",
      message: "System is healthy",
      environment: process.env.NODE_ENV,
      database: "connected",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Health check error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "System health check failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
