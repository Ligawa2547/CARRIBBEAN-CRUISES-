import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"
import { sendApplicationConfirmationEmail } from "@/lib/resend-email"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    // Basic admin guard using cookie set by admin login
    const cookieStore = cookies()
    const adminAuth = cookieStore.get("admin-auth")?.value
    if (adminAuth !== "true") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const applicationId = body?.applicationId
    if (!applicationId) {
      return NextResponse.json({ success: false, message: "applicationId is required" }, { status: 400 })
    }

    const supabase = createClient()
    const { data: application, error } = await supabase.from("applications").select("*").eq("id", applicationId).single()

    if (error || !application) {
      console.error("Error fetching application for resend:", error)
      return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 })
    }

    // Fetch job title for email
    let jobTitle = "the position"
    try {
      const { data: jobData, error: jobError } = await supabase.from("jobs").select("title").eq("id", application.job_id).limit(1).single()
      if (!jobError && jobData && (jobData as any).title) jobTitle = (jobData as any).title
    } catch (err) {
      console.error("Error fetching job for resend:", err)
    }

    try {
      await sendApplicationConfirmationEmail({
        to: application.email,
        name: application.full_name || application.fullName || "Applicant",
        jobTitle,
      })

      return NextResponse.json({ success: true, message: "Email resent" })
    } catch (sendErr: any) {
      console.error("Error resending confirmation email:", sendErr)
      return NextResponse.json({ success: false, message: sendErr?.message || "Failed to send email" }, { status: 500 })
    }
  } catch (error) {
    console.error("Unexpected error in resend-confirmation route:", error)
    return NextResponse.json({ success: false, message: "Unexpected server error" }, { status: 500 })
  }
}
