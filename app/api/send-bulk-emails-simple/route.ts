import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"
import { sendBulkApplicationEmails } from "@/lib/resend-email"

export async function POST(request: NextRequest) {
  const supabase = createClient()
  try {
    // First, get all applications with just the basic columns
    const { data: applications, error } = await supabase
      .from("applications")
      .select("email, full_name, job_id")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching applications:", error)
      return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
    }

    if (!applications || applications.length === 0) {
      return NextResponse.json({ message: "No applications found" }, { status: 200 })
    }

    // Get unique job IDs to fetch job titles
    const uniqueJobIds = [...new Set(applications.map((app) => app.job_id))]

    // Fetch job titles
    const { data: jobs, error: jobsError } = await supabase.from("jobs").select("id, title").in("id", uniqueJobIds)

    if (jobsError) {
      console.error("Error fetching jobs:", jobsError)
    }

    // Create a map of job ID to job title
    const jobTitleMap = new Map()
    if (jobs) {
      jobs.forEach((job) => {
        jobTitleMap.set(job.id, job.title)
      })
    }

    // Map the data to the expected format
    const formattedApplications = applications.map((app) => ({
      email: app.email,
      fullName: app.full_name,
      jobTitle: jobTitleMap.get(app.job_id) || "a position",
    }))

    // Remove duplicates based on email
    const uniqueApplications = formattedApplications.filter(
      (app, index, self) => index === self.findIndex((a) => a.email === app.email),
    )

    console.log(`Sending emails to ${uniqueApplications.length} unique applicants`)

    // Send emails in batches
    const results = await sendBulkApplicationEmails(uniqueApplications)

    const successCount = results.filter((r) => r.success).length
    const failureCount = results.filter((r) => !r.success).length

    return NextResponse.json({
      message: `Email sending completed`,
      total: uniqueApplications.length,
      successful: successCount,
      failed: failureCount,
      results: results,
    })
  } catch (error) {
    console.error("Error in bulk email sending:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
