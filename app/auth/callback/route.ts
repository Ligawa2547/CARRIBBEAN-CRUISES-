import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const type = requestUrl.searchParams.get("type") || ""

  if (code) {
    // Create the Supabase client inside the request handler
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookies().set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookies().set({ name, value: "", ...options })
        },
      },
    })

    try {
      // For password reset, we need special handling
      if (type === "recovery" || type === "password_reset") {
        // First, exchange the code for a session
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
          console.error("Error exchanging code for session:", error)
          return NextResponse.redirect(
            `${requestUrl.origin}/login?error=${encodeURIComponent("Failed to verify your reset link. Please try again.")}`,
          )
        }

        // Set a special cookie to indicate password reset is required
        // This will be checked by the reset-password page
        cookies().set("password_reset_required", "true", {
          maxAge: 3600, // 1 hour expiry
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        })

        // Redirect to the reset password page
        return NextResponse.redirect(`${requestUrl.origin}/reset-password?source=email`)
      } else {
        // For other auth flows, proceed normally
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
          console.error("Error exchanging code for session:", error)
          return NextResponse.redirect(
            `${requestUrl.origin}/login?error=${encodeURIComponent("Failed to verify your email. Please try again.")}`,
          )
        }

        // Handle different auth flows based on the type parameter
        if (type === "signup" || type === "email_confirmation") {
          // For email verification after signup
          return NextResponse.redirect(
            `${requestUrl.origin}/login?message=${encodeURIComponent("Email verified successfully! You can now log in.")}`,
          )
        } else if (type === "magiclink") {
          // For magic link login
          return NextResponse.redirect(
            `${requestUrl.origin}/dashboard?message=${encodeURIComponent("You have been successfully logged in.")}`,
          )
        } else {
          // Default case - just redirect to login
          return NextResponse.redirect(`${requestUrl.origin}/login`)
        }
      }
    } catch (err) {
      console.error("Error in auth callback:", err)
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${encodeURIComponent("An error occurred during verification. Please try again.")}`,
      )
    }
  }

  // Return the user to an error page if code is invalid
  return NextResponse.redirect(
    `${requestUrl.origin}/login?error=${encodeURIComponent("Invalid verification link. Please try again.")}`,
  )
}
