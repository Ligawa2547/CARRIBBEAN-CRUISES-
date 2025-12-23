"use server"

import { supabase } from "@/lib/supabase-server"
import type { JobApplication } from "@/types"
import { sendApplicationConfirmationEmail } from "@/lib/resend-email"

export async function submitApplication(
  application: JobApplication,
): Promise<{ success: boolean; error: string | null; emailSent?: boolean; emailError?: string | null }> {
  try {
    const { error } = await supabase.from("applications").insert([application])

    if (error) {
      console.error("Error submitting application:", error)
      return { success: false, error: error.message }
    }

    // Fetch job title so the email can reference the correct position
    let jobTitle = "the position"
    try {
      const { data: jobData, error: jobError } = await supabase
        .from("jobs")
        .select("title")
        .eq("id", application.job_id)
        .limit(1)
        .single()

      if (jobError) {
        console.error("Error fetching job title for application email:", jobError)
      } else if (jobData && (jobData as any).title) {
        jobTitle = (jobData as any).title
      }
    } catch (fetchErr) {
      console.error("Unexpected error fetching job title:", fetchErr)
    }

    // Send confirmation email using Resend
    try {
      const emailResult = await sendApplicationConfirmationEmail({
        to: application.email,
        // Use the correct field name based on the application object structure
        name: application.full_name || (application as any).fullName || "Applicant",
        jobTitle,
      })

      console.log(`Confirmation email sent to ${application.email}`)

      // Return success and email status
      return { success: true, error: null, emailSent: true }
    } catch (emailError: any) {
      // Log and return the email error so the client or admin can retry
      console.error("Error sending confirmation email:", emailError)
      return { success: true, error: null, emailSent: false, emailError: emailError?.message || String(emailError) }
    }
  } catch (error) {
    console.error("Error in submitApplication:", error)
    return { success: false, error: String(error) }
  }
}
