"use server"

import { supabase } from "@/lib/supabase-server"
import type { JobApplication } from "@/types"

export async function submitApplication(
  application: JobApplication,
): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase.from("applications").insert([application])

    if (error) {
      console.error("Error submitting application:", error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Error in submitApplication:", error)
    return { success: false, error: String(error) }
  }
}
