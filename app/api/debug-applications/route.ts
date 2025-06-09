import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Create a simple client without cookies for API routes
const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    // Get a sample application to see the actual column structure
    const { data: applications, error } = await supabase.from("applications").select("*").limit(1)

    if (error) {
      console.error("Error fetching applications:", error)
      return NextResponse.json({ error: "Failed to fetch applications", details: error }, { status: 500 })
    }

    // Get total count
    const { count, error: countError } = await supabase.from("applications").select("*", { count: "exact", head: true })

    return NextResponse.json({
      sampleApplication: applications?.[0] || null,
      totalApplications: count || 0,
      availableColumns: applications?.[0] ? Object.keys(applications[0]) : [],
      countError: countError,
    })
  } catch (error) {
    console.error("Error in debug route:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
