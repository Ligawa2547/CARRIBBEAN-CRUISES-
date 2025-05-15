"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { z } from "zod"
import { isAuthenticated } from "../actions/auth"
import { redirect } from "next/navigation"

// Define the job form schema
const jobSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  department: z.string().min(2, { message: "Department must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  requirements: z.string().min(10, { message: "Requirements must be at least 10 characters" }),
  salary_range: z.string().min(3, { message: "Salary range must be at least 3 characters" }),
  location: z.string().min(3, { message: "Location must be at least 3 characters" }),
})

export type JobFormData = z.infer<typeof jobSchema>

export async function createJob(formData: JobFormData): Promise<{ success: boolean; message: string }> {
  // Check if user is authenticated
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect("/admin/login")
  }

  const supabase = createServerSupabaseClient()

  try {
    // Validate the form data
    const validatedData = jobSchema.parse(formData)

    console.log("Attempting to insert job:", validatedData)

    // Insert the job into the database
    const { data, error } = await supabase.from("jobs").insert([validatedData]).select()

    if (error) {
      console.error("Error creating job:", error)
      return {
        success: false,
        message: `Failed to create job: ${error.message}`,
      }
    }

    console.log("Job created successfully:", data)
    return {
      success: true,
      message: "Job created successfully!",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const errorMessage = error.errors.map((err) => `${err.path}: ${err.message}`).join(", ")
      console.error("Validation error:", errorMessage)
      return { success: false, message: `Validation error: ${errorMessage}` }
    }

    console.error("Error in createJob:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred. Please try again later.",
    }
  }
}
