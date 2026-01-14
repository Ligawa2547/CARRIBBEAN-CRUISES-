"use server"

import { supabase } from "@/lib/supabase-server"
import { sendApplicationConfirmationEmail } from "@/lib/resend-email"

interface ApplicationData {
  job_id: number
  user_id?: string
  full_name: string
  email: string
  phone: string
  cover_letter?: string
  resume_url?: string | null
  status?: string
  created_at?: string
}

export async function submitApplication(
  application: ApplicationData,
): Promise<{ success: boolean; error: string | null; data?: any }> {
  try {
    console.log("Submitting application:", application)

    // Prepare the application data with correct field names
    const applicationData = {
      job_id: application.job_id,
      user_id: application.user_id || null,
      full_name: application.full_name,
      email: application.email,
      phone: application.phone,
      cover_letter: application.cover_letter || null,
      resume_url: application.resume_url || null,
      status: application.status || "pending",
      created_at: application.created_at || new Date().toISOString(),
    }

    console.log("Prepared application data:", applicationData)

    // Insert the application into the database
    const { data, error } = await supabase.from("applications").insert([applicationData]).select().single()

    if (error) {
      console.error("Database error submitting application:", error)
      return {
        success: false,
        error: `Database error: ${error.message}. Code: ${error.code}`,
      }
    }

    console.log("Application submitted successfully:", data)

    // Get job details for the email
    const { data: jobData, error: jobError } = await supabase
      .from("jobs")
      .select("title")
      .eq("id", application.job_id)
      .single()

    const jobTitle = jobData?.title || "the position"

    // Send confirmation email using Resend
    try {
      await sendApplicationConfirmationEmail({
        to: application.email,
        name: application.full_name,
        jobTitle: jobTitle,
      })
      console.log(`Confirmation email sent to ${application.email}`)
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError)
      // Don't fail the application if email fails, but log the error
    }

    return { success: true, error: null, data }
  } catch (error) {
    console.error("Unexpected error in submitApplication:", error)
    return {
      success: false,
      error: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

// Function to get application by ID
export async function getApplicationById(id: number) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select(`
        *,
        jobs:job_id (
          id,
          title,
          department,
          location
        )
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching application:", error)
      return { success: false, error: error.message, data: null }
    }

    return { success: true, error: null, data }
  } catch (error) {
    console.error("Unexpected error fetching application:", error)
    return { success: false, error: String(error), data: null }
  }
}

// Function to get applications by user ID
export async function getApplicationsByUserId(userId: string) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select(`
        *,
        jobs:job_id (
          id,
          title,
          department,
          location,
          salary_range
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user applications:", error)
      return { success: false, error: error.message, data: [] }
    }

    return { success: true, error: null, data: data || [] }
  } catch (error) {
    console.error("Unexpected error fetching user applications:", error)
    return { success: false, error: String(error), data: [] }
  }
}
