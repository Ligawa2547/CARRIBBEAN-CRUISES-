"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

interface JobData {
  title: string
  department: string
  description: string
  requirements: string
  salary_range: string
  location: string
}

export async function addCruiseShipJobs() {
  const supabase = createServerSupabaseClient()

  // Define all cruise ship jobs with detailed information
  const cruiseShipJobs: JobData[] = [
    // MARINE OPERATIONS DEPARTMENT
    {
      title: "Captain",
      department: "Marine Operations",
      description:
        "As Captain, you will have ultimate responsibility for the safety and operation of the vessel, crew, and passengers. You'll command the navigation and operation of the ship, ensure compliance with maritime laws and company policies, make critical decisions regarding ship operations and emergency situations, and represent the cruise line to passengers and authorities.",
      requirements:
        "Master's license with unlimited tonnage endorsement. Minimum 10+ years of experience on passenger vessels with at least 5 years as Staff Captain or equivalent. Extensive knowledge of international maritime laws and regulations.",
      salary_range: "$150,000 - $250,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Staff Captain",
      department: "Marine Operations",
      description:
        "As Staff Captain, you will serve as second-in-command of the vessel, directly supporting the Captain in all aspects of ship operations. You'll oversee safety procedures, emergency response planning, and security operations.",
      requirements:
        "Chief Mate's license with unlimited tonnage endorsement. Minimum 7+ years of experience on passenger vessels with at least 3 years as First Officer or equivalent. Comprehensive knowledge of maritime regulations and safety protocols.",
      salary_range: "$120,000 - $180,000",
      location: "Various cruise ships worldwide",
    },
    // Additional jobs would be here - removed for brevity
  ]

  try {
    // First, check if the jobs table exists
    const { error: tableCheckError } = await supabase.from("jobs").select("id").limit(1)

    // If table doesn't exist, we need to create it
    if (tableCheckError && tableCheckError.message.includes("jobs does not exist")) {
      return {
        success: false,
        error: "Jobs table doesn't exist. Please create it using the Supabase dashboard SQL editor.",
      }
    }

    // Check if jobs already exist to avoid duplicates
    const { data: existingJobs } = await supabase
      .from("jobs")
      .select("title")
      .in(
        "title",
        cruiseShipJobs.map((job) => job.title),
      )

    const existingTitles = existingJobs?.map((job) => job.title) || []

    // Filter out jobs that already exist
    const newJobs = cruiseShipJobs.filter((job) => !existingTitles.includes(job.title))

    if (newJobs.length === 0) {
      return { success: true, message: "All jobs already exist in the database.", added: 0 }
    }

    // Insert new jobs in batches to avoid payload size limitations
    const batchSize = 50
    let addedCount = 0
    let error = null

    for (let i = 0; i < newJobs.length; i += batchSize) {
      const batch = newJobs.slice(i, i + batchSize)
      const { error: batchError } = await supabase.from("jobs").insert(batch)

      if (batchError) {
        console.error(`Error adding batch ${i / batchSize + 1}:`, batchError)
        error = batchError
        break
      }

      addedCount += batch.length
    }

    if (error) {
      return { success: false, error: error.message }
    }

    return {
      success: true,
      message: `Successfully added ${addedCount} new cruise ship jobs to the database.`,
      added: addedCount,
    }
  } catch (error) {
    console.error("Error in addCruiseShipJobs:", error)
    return { success: false, error: String(error) }
  }
}
