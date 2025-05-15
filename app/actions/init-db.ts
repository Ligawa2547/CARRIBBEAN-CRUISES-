"use server"

import { supabase } from "@/lib/supabase"

export async function initializeDatabase() {
  try {
    // Remove this line:
    // const supabase = createServerSupabaseClient()

    // Check if the jobs table exists
    const { error: tableCheckError } = await supabase.from("jobs").select("id").limit(1)

    // If table doesn't exist, we'll return instructions
    if (tableCheckError && tableCheckError.message.includes("does not exist")) {
      console.log("Jobs table doesn't exist. Database needs to be initialized.")
      return {
        success: false,
        message: "Database tables need to be created. Please run the setup script.",
      }
    }

    return { success: true, message: "Database is initialized." }
  } catch (error) {
    console.error("Error in initializeDatabase:", error)
    return {
      success: false,
      message: "An error occurred while checking database initialization.",
    }
  }
}
