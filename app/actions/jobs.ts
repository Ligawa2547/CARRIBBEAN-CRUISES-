"use server"

import { supabase } from "@/lib/supabase-server"
import type { Job } from "@/types"

export async function getJobs(): Promise<{ jobs: Job[]; error: string | null }> {
  try {
    const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching jobs:", error)
      return { jobs: [], error: error.message }
    }

    return { jobs: data as Job[], error: null }
  } catch (error) {
    console.error("Error in getJobs:", error)
    return { jobs: [], error: String(error) }
  }
}

export async function getJobById(id: number): Promise<{ job: Job | null; error: string | null }> {
  try {
    const { data, error } = await supabase.from("jobs").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching job:", error)
      return { job: null, error: error.message }
    }

    return { job: data as Job, error: null }
  } catch (error) {
    console.error("Error in getJobById:", error)
    return { job: null, error: String(error) }
  }
}
