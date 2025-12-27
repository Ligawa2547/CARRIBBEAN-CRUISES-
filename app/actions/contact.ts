"use server"

import { createClient } from "@/lib/supabase-server"
import { z } from "zod"

// Define the contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Validate the form data
    const validatedData = contactFormSchema.parse(formData)

    const supabase = createClient()

    // Check if the contacts table exists, create it if it doesn't
    const { error: tableCheckError } = await supabase.from("contacts").select("id").limit(1)

    if (tableCheckError && tableCheckError.message.includes("does not exist")) {
      // Create the contacts table
      const { error: createTableError } = await supabase.query(`
        CREATE TABLE IF NOT EXISTS contacts (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          subject VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `)

      if (createTableError) {
        console.error("Error creating contacts table:", createTableError)
        return { success: false, message: "Failed to set up contact system. Please try again later." }
      }
    }

    // Insert the contact message into the database
    const { error: insertError } = await supabase.from("contacts").insert([
      {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
      },
    ])

    if (insertError) {
      console.error("Error submitting contact message:", insertError)
      return { success: false, message: "Failed to send your message. Please try again later." }
    }

    return {
      success: true,
      message: "Message sent. We will be in touch shortly.",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const errorMessage = error.errors.map((err) => `${err.path}: ${err.message}`).join(", ")
      return { success: false, message: `Validation error: ${errorMessage}` }
    }

    console.error("Error in submitContactForm:", error)
    return { success: false, message: "An unexpected error occurred. Please try again later." }
  }
}
