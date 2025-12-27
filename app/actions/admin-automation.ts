"use server"

import { createClient } from "@/lib/supabase-server"
import { sendStatusUpdateEmail, sendContactResponseEmail } from "@/lib/resend-email"
import { revalidatePath } from "next/cache"

export async function updateApplicationStatusAndEmail({
  applicationId,
  newStatus,
  sendEmail = true,
}: {
  applicationId: number
  newStatus: string
  sendEmail?: boolean
}): Promise<{ success: boolean; message: string }> {
  const supabase = createClient()

  try {
    // Get the application details first
    const { data: application, error: fetchError } = await supabase
      .from("applications")
      .select(
        `
        id,
        full_name,
        email,
        job_id,
        jobs:job_id (
          title
        )
      `,
      )
      .eq("id", applicationId)
      .single()

    if (fetchError || !application) {
      console.error("Error fetching application:", fetchError)
      return { success: false, message: "Application not found" }
    }

    // Update the status
    const { error: updateError } = await supabase
      .from("applications")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", applicationId)

    if (updateError) {
      console.error("Error updating application status:", updateError)
      return { success: false, message: "Failed to update status" }
    }

    // Send email notification if requested
    if (sendEmail) {
      try {
        await sendStatusUpdateEmail({
          to: application.email,
          name: application.full_name,
          jobTitle: application.jobs?.title || "the position",
          newStatus,
        })
        console.log(`[v0] Status update email sent to ${application.email}`)
      } catch (emailError) {
        console.error("[v0] Error sending status update email:", emailError)
        // Don't fail the entire operation if email fails
        return {
          success: true,
          message: `Status updated to ${newStatus}, but email notification failed`,
        }
      }
    }

    revalidatePath("/admin/applications")
    return { success: true, message: `Status updated to ${newStatus} and email sent` }
  } catch (error) {
    console.error("Error in updateApplicationStatusAndEmail:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}

export async function sendContactResponse({
  contactId,
  recipientEmail,
  recipientName,
  subject,
  originalMessage,
}: {
  contactId: number
  recipientEmail?: string
  recipientName?: string
  subject?: string
  originalMessage?: string
}): Promise<{ success: boolean; message: string }> {
  const supabase = createClient()

  try {
    let email = recipientEmail
    let name = recipientName
    let sub = subject
    let msg = originalMessage

    // If details aren't provided, fetch them from the database
    if (!email || !name || !sub || !msg) {
      const { data: contact, error: fetchError } = await supabase
        .from("contacts")
        .select("*")
        .eq("id", contactId)
        .single()

      if (fetchError || !contact) {
        return { success: false, message: "Contact message not found" }
      }

      email = contact.email
      name = contact.name
      sub = contact.subject
      msg = contact.message
    }

    // Send the automated response email
    await sendContactResponseEmail({
      to: email!,
      name: name!,
      subject: sub!,
      originalMessage: msg!,
    })

    // Update the contact status to "responded"
    const { error: updateError } = await supabase.from("contacts").update({ status: "responded" }).eq("id", contactId)

    if (updateError) {
      console.error("Error updating contact status:", updateError)
      return { success: true, message: "Email sent, but status update failed" }
    }

    revalidatePath("/admin/contacts")
    return { success: true, message: "Response email sent successfully" }
  } catch (error) {
    console.error("Error in sendContactResponse:", error)
    return { success: false, message: "Failed to send response email" }
  }
}
