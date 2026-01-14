import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
  try {
    // Get a sample application to see the actual column structure
    const { data: applications, error } = await supabase.from("applications").select("*").limit(1)

    if (error) {
      console.error("Error fetching applications:", error)
      return NextResponse.json({ error: "Failed to fetch applications", details: error }, { status: 500 })
    }

    // Also get the table schema information
    const { data: tableInfo, error: tableError } = await supabase.from("applications").select().limit(0)

    return NextResponse.json({
      sampleApplication: applications?.[0] || null,
      totalApplications: applications?.length || 0,
      availableColumns: applications?.[0] ? Object.keys(applications[0]) : [],
      tableError: tableError,
    })
  } catch (error) {
    console.error("Error in debug route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
