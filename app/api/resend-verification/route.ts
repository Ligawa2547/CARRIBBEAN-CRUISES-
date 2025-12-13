import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Missing email" }, { status: 400 })
    }

    const baseUrl = request.nextUrl.origin

    // Attempt to generate a sign up/confirmation link via Supabase Admin API
    try {
      // New supabase SDKs use auth.admin.generateLink
      // Fallback: use signUp if the admin API isn't available
      // We wrap this with try/catch to provide helpful error messages
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { data, error } = await supabase.auth.admin.generateLink({
        type: "signup",
        email,
        options: { redirectTo: `${baseUrl}/auth/callback?type=signup` },
      })

      if (error) {
        console.error("Error generating verification link:", error)
        return NextResponse.json({ success: false, message: error.message || "Failed to resend verification" }, { status: 500 })
      }

      return NextResponse.json({ success: true, message: "Verification email sent" })
    } catch (err) {
      // Try fallback: call signUp to trigger an email resend if supported
      try {
        const { email: maybeEmail, password } = await request.json()
        // We can't re-create a password here; instead call reset/change flow
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${baseUrl}/auth/callback?type=recovery&source=email`,
        })
        return NextResponse.json({ success: true, message: "Verification resend attempted via password reset" })
      } catch (fallbackError) {
        console.error("Fallback resend failed:", fallbackError)
        return NextResponse.json({ success: false, message: "Unable to resend verification" }, { status: 500 })
      }
    }
  } catch (error) {
    console.error("Error in resend verification route:", error)
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 })
  }
}
