"use server"

import { supabase } from "@/lib/supabase-server"

export async function saveJob(userId: string, jobId: number): Promise<{ success: boolean; error: string | null }> {
  try {
    // Check if job is already saved
    const { data: existingSave, error: checkError } = await supabase
      .from("saved_jobs")
      .select("id")
      .eq("user_id", userId)
      .eq("job_id", jobId)
      .maybeSingle()

    if (checkError) {
      console.error("Error checking saved job:", checkError)
      return { success: false, error: checkError.message }
    }

    // If already saved, return success
    if (existingSave) {
      return { success: true, error: null }
    }

    // Save the job
    const { error } = await supabase.from("saved_jobs").insert([
      {
        user_id: userId,
        job_id: jobId,
      },
    ])

    if (error) {
      console.error("Error saving job:", error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Error in saveJob:", error)
    return { success: false, error: String(error) }
  }
}

export async function unsaveJob(userId: string, jobId: number): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase.from("saved_jobs").delete().eq("user_id", userId).eq("job_id", jobId)

    if (error) {
      console.error("Error removing saved job:", error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Error in unsaveJob:", error)
    return { success: false, error: String(error) }
  }
}

export async function isJobSaved(userId: string, jobId: number): Promise<{ saved: boolean; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("id")
      .eq("user_id", userId)
      .eq("job_id", jobId)
      .maybeSingle()

    if (error) {
      console.error("Error checking saved job:", error)
      return { saved: false, error: error.message }
    }

    return { saved: !!data, error: null }
  } catch (error) {
    console.error("Error in isJobSaved:", error)
    return { saved: false, error: String(error) }
  }
}
