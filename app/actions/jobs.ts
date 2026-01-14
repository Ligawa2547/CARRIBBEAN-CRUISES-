"use server"

import { supabase } from "@/lib/supabase-server"

export async function getJobs() {
  try {
    const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching jobs:", error)
      return { success: false, error: error.message, data: [] }
    }

    return { success: true, error: null, data: data || [] }
  } catch (error) {
    console.error("Unexpected error fetching jobs:", error)
    return { success: false, error: String(error), data: [] }
  }
}

export async function getJobById(id: number) {
  try {
    const { data, error } = await supabase.from("jobs").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching job:", error)
      return { success: false, error: error.message, data: null }
    }

    return { success: true, error: null, data }
  } catch (error) {
    console.error("Unexpected error fetching job:", error)
    return { success: false, error: String(error), data: null }
  }
}

export async function getJobsByDepartment(department: string) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("department", department)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching jobs by department:", error)
      return { success: false, error: error.message, data: [] }
    }

    return { success: true, error: null, data: data || [] }
  } catch (error) {
    console.error("Unexpected error fetching jobs by department:", error)
    return { success: false, error: String(error), data: [] }
  }
}

export async function searchJobs(query: string) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error searching jobs:", error)
      return { success: false, error: error.message, data: [] }
    }

    return { success: true, error: null, data: data || [] }
  } catch (error) {
    console.error("Unexpected error searching jobs:", error)
    return { success: false, error: String(error), data: [] }
  }
}

export async function getFeaturedJobs() {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching featured jobs:", error)
      return { success: false, error: error.message, data: [] }
    }

    return { success: true, error: null, data: data || [] }
  } catch (error) {
    console.error("Unexpected error fetching featured jobs:", error)
    return { success: false, error: String(error), data: [] }
  }
}

export async function getJobsCount() {
  try {
    const { count, error } = await supabase.from("jobs").select("*", { count: "exact", head: true })

    if (error) {
      console.error("Error getting jobs count:", error)
      return { success: false, error: error.message, count: 0 }
    }

    return { success: true, error: null, count: count || 0 }
  } catch (error) {
    console.error("Unexpected error getting jobs count:", error)
    return { success: false, error: String(error), count: 0 }
  }
}
