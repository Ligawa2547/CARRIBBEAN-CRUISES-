import { createServerClient } from "@/lib/supabase-server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { email, role } = await request.json()

    // Check if the user is authorized to send invitations
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real app, you would check if the user has admin privileges
    // For this example, we'll allow any authenticated user to send invitations

    // Generate a unique token for the invitation
    const token = crypto.randomUUID()

    // Store the invitation in the database
    const { error } = await supabase.from("invitations").insert({
      email,
      role: role || "user",
      token,
      invited_by: user.id,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    })

    if (error) {
      console.error("Error creating invitation:", error)
      return NextResponse.json({ error: "Failed to create invitation" }, { status: 500 })
    }

    // In a real app, you would send an email with the invitation link
    // For this example, we'll just return the token
    const inviteUrl = `${request.nextUrl.origin}/invite/${token}`

    return NextResponse.json({
      success: true,
      message: "Invitation sent successfully",
      inviteUrl,
    })
  } catch (error) {
    console.error("Error processing invitation:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
