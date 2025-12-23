"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createClient } from "@/lib/supabase-server"

// const ADMIN_EMAIL_DOMAIN = "nclsail.com"

// Define the login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const signupSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>

// function isAdminEmail(email: string): boolean {
//   return email.toLowerCase().endsWith(`@${ADMIN_EMAIL_DOMAIN}`)
// }

export async function login(formData: LoginFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Validate the form data
    const validatedData = loginSchema.parse(formData)

    // if (!isAdminEmail(validatedData.email)) {
    //   return { success: false, message: `Access denied. Only @${ADMIN_EMAIL_DOMAIN} email addresses are authorized.` }
    // }

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

    // if (!data.user.email || !isAdminEmail(data.user.email)) {
    //   await supabase.auth.signOut()
    //   return { success: false, message: `Access denied. Only @${ADMIN_EMAIL_DOMAIN} email addresses are authorized.` }
    // }

    // Set admin authentication cookie
    const cookieStore = await cookies()
    cookieStore.set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    // Store the user email for verification
    cookieStore.set("admin-user", data.user.email || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return { success: true, message: "Login successful" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => `${err.path}: ${err.message}`).join(", ")
      return { success: false, message: `Validation error: ${errorMessage}` }
    }

    console.error("Error in login:", error)
    return { success: false, message: "An unexpected error occurred. Please try again later." }
  }
}

export async function signup(formData: SignupFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Validate the form data
    const validatedData = signupSchema.parse(formData)

    // Create Supabase client
    const supabase = createClient()

    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${process.env.NEXT_PUBLIC_SITE_URL}/admin/login`,
        data: {
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
        },
      },
    })

    if (error) {
      console.error("Supabase signup error:", error)

      // If the failure is an unexpected server error (often due to SMTP/email sending issues),
      // try a secure server-side admin createUser fallback to avoid blocking signups.
      try {
        // Use the server client with service role key to create the user without relying on SMTP
        const adminResult = await supabase.auth.admin.createUser({
          email: validatedData.email,
          password: validatedData.password,
          user_metadata: {
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
          },
          email_confirm: true, // mark as confirmed to bypass email delivery problems
        })

        if (adminResult.error) {
          console.error("Admin createUser fallback failed:", adminResult.error)
          return { success: false, message: error.message || "Registration failed" }
        }

        console.log("Admin createUser fallback succeeded for:", validatedData.email)
        return { success: true, message: "Registration successful! You can sign in to your account." }
      } catch (adminErr) {
        console.error("Error in admin createUser fallback:", adminErr)
        return { success: false, message: error.message || "Registration failed" }
      }
    }

    if (!data.user) {
      return { success: false, message: "Registration failed" }
    }

    return {
      success: true,
      message: "Registration successful! Please check your email to verify your account before logging in.",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => `${err.path}: ${err.message}`).join(", ")
      return { success: false, message: `Validation error: ${errorMessage}` }
    }

    console.error("Error in signup:", error)
    return { success: false, message: "An unexpected error occurred. Please try again later." }
  }
}

export async function logout() {
  try {
    const supabase = createClient()
    await supabase.auth.signOut()
  } catch (error) {
    console.error("Error during logout:", error)
  }

  const cookieStore = await cookies()
  cookieStore.delete("admin-auth")
  cookieStore.delete("admin-user")
  redirect("/admin/login")
}

export async function isAuthenticated() {
  const cookieStore = await cookies()
  const adminAuth = cookieStore.get("admin-auth")?.value
  const adminUser = cookieStore.get("admin-user")?.value

  return adminAuth === "true" && !!adminUser
}

export async function getAdminUser() {
  const cookieStore = await cookies()
  const adminUser = cookieStore.get("admin-user")?.value
  return adminUser || null
}
