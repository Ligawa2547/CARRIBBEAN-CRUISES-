"use server"

import { supabase } from "@/lib/supabase-server"
import type { JobApplication } from "@/types"
import { sendApplicationConfirmationEmail } from "@/lib/resend-email"

export async function submitApplication(
  application: JobApplication,
): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase.from("applications").insert([application])

    if (error) {
      console.error("Error submitting application:", error)
      return { success: false, error: error.message }
    }

    // Send confirmation email using Resend
    try {
      await sendApplicationConfirmationEmail({
        to: application.email,
        // Use the correct field name based on the application object structure
        name: application.fullName || application.full_name || "Applicant",
        jobTitle: application.jobTitle || application.job_title || "the position",
      })
      console.log(`Confirmation email sent to ${application.email}`)
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError)
      // Don't fail the application if email fails, but log the error
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Error in submitApplication:", error)
    return { success: false, error: String(error) }
  }
}
