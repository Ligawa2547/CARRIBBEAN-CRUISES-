"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

// Define the login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Hardcoded admin credentials
const ADMIN_EMAIL = "admin@example.com"
const ADMIN_PASSWORD = "password123"

export async function login(formData: LoginFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Validate the form data
    const validatedData = loginSchema.parse(formData)

    // Check if credentials match
    if (validatedData.email === ADMIN_EMAIL && validatedData.password === ADMIN_PASSWORD) {
      // Set a cookie to indicate the user is logged in
      cookies().set("admin-auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      })

      return { success: true, message: "Login successful" }
    }

    return { success: false, message: "Invalid email or password" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const errorMessage = error.errors.map((err) => `${err.path}: ${err.message}`).join(", ")
      return { success: false, message: `Validation error: ${errorMessage}` }
    }

    console.error("Error in login:", error)
    return { success: false, message: "An unexpected error occurred. Please try again later." }
  }
}

export async function logout() {
  cookies().delete("admin-auth")
  redirect("/admin/login")
}

export async function isAuthenticated() {
  return cookies().get("admin-auth")?.value === "true"
}
