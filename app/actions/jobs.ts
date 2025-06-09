"use server"

import { supabase } from "@/lib/supabase"
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

export async function getJobsByDepartment(department: string): Promise<{ jobs: Job[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("department", department)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching jobs by department:", error)
      return { jobs: [], error: error.message }
    }

    return { jobs: data as Job[], error: null }
  } catch (error) {
    console.error("Error in getJobsByDepartment:", error)
    return { jobs: [], error: String(error) }
  }
}

export async function searchJobs(query: string): Promise<{ jobs: Job[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error searching jobs:", error)
      return { jobs: [], error: error.message }
    }

    return { jobs: data as Job[], error: null }
  } catch (error) {
    console.error("Error in searchJobs:", error)
    return { jobs: [], error: String(error) }
  }
}

export async function getFeaturedJobs(): Promise<{ jobs: Job[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(6)

    if (error) {
      console.error("Error fetching featured jobs:", error)
      return { jobs: [], error: error.message }
    }

    return { jobs: data as Job[], error: null }
  } catch (error) {
    console.error("Error in getFeaturedJobs:", error)
    return { jobs: [], error: String(error) }
  }
}

export async function getJobsCount(): Promise<{ count: number; error: string | null }> {
  try {
    const { count, error } = await supabase.from("jobs").select("*", { count: "exact", head: true })

    if (error) {
      console.error("Error getting jobs count:", error)
      return { count: 0, error: error.message }
    }

    return { count: count || 0, error: null }
  } catch (error) {
    console.error("Error in getJobsCount:", error)
    return { count: 0, error: String(error) }
  }
}
