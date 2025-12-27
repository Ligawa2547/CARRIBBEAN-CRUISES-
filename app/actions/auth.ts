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

// Admin email and domain authorization
const AUTHORIZED_ADMIN_EMAIL = "wilsonligawa3@gmail.com"
const AUTHORIZED_ADMIN_DOMAIN = "@caribbeancruises.site"

function isAuthorizedEmail(email: string): boolean {
  return email === AUTHORIZED_ADMIN_EMAIL || email.endsWith(AUTHORIZED_ADMIN_DOMAIN)
}

export async function login(formData: LoginFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Validate the form data
    const validatedData = loginSchema.parse(formData)

    // Check if the email is authorized
    if (!isAuthorizedEmail(validatedData.email)) {
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

    // Verify the user's email is authorized
    if (!isAuthorizedEmail(data.user.email || "")) {
      // Sign out the user if they're not authorized
      await supabase.auth.signOut()
      return { success: false, message: "Access denied. You are not authorized to access the admin dashboard." }
    }

    // Set admin authentication cookie with improved security settings
    const cookieStore = cookies()

    cookieStore.set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    // Also set the user session cookie for additional verification
    cookieStore.set("admin-user", data.user.email || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
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
  const cookieStore = cookies()
  const adminAuth = cookieStore.get("admin-auth")?.value
  const adminUser = cookieStore.get("admin-user")?.value

  // Check both the auth flag and that the user is authorized
  return adminAuth === "true" && adminUser && isAuthorizedEmail(adminUser)
}

export async function getAdminUser() {
  const adminUser = cookies().get("admin-user")?.value
  return adminUser || null
}
