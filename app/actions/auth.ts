"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createClient } from "@/lib/supabase-server"

// Define the login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Admin email that has access to the dashboard
const ADMIN_EMAIL = "wilsonligawa3@gmail.com"

export async function login(formData: LoginFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Validate the form data
    const validatedData = loginSchema.parse(formData)

    // Check if the email is the authorized admin email
    if (validatedData.email !== ADMIN_EMAIL) {
      return { success: false, message: "Access denied. You are not authorized to access the admin dashboard." }
    }

    // Create Supabase client
    const supabase = createClient()

    // Attempt to sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    })

    if (error) {
      console.error("Supabase auth error:", error)
      return { success: false, message: "Invalid email or password" }
    }

    if (!data.user) {
      return { success: false, message: "Authentication failed" }
    }

    // Verify the user's email matches our admin email
    if (data.user.email !== ADMIN_EMAIL) {
      // Sign out the user if they're not the admin
      await supabase.auth.signOut()
      return { success: false, message: "Access denied. You are not authorized to access the admin dashboard." }
    }

    // Set admin authentication cookie
    cookies().set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    // Also set the user session cookie for additional verification
    cookies().set("admin-user", data.user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return { success: true, message: "Login successful" }
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
  try {
    // Create Supabase client and sign out
    const supabase = createClient()
    await supabase.auth.signOut()
  } catch (error) {
    console.error("Error during logout:", error)
  }

  // Clear admin cookies
  cookies().delete("admin-auth")
  cookies().delete("admin-user")
  redirect("/admin/login")
}

export async function isAuthenticated() {
  const adminAuth = cookies().get("admin-auth")?.value
  const adminUser = cookies().get("admin-user")?.value

  // Check both the auth flag and that the user is the correct admin
  return adminAuth === "true" && adminUser === ADMIN_EMAIL
}

export async function getAdminUser() {
  const adminUser = cookies().get("admin-user")?.value
  return adminUser || null
}
