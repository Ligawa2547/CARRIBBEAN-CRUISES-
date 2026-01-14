import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailParams {
  to: string
  name: string
  jobTitle: string
}

export async function sendApplicationConfirmationEmail({
  to,
  name,
  jobTitle,
}: EmailParams): Promise<void> {
  try {
    await resend.emails.send({
      from: "applications@nclsail.com",
      to: to,
      subject: `Application Confirmation - ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1e40af;">Application Received</h2>
            <p>Dear ${name},</p>
            <p>Thank you for submitting your application for the <strong>${jobTitle}</strong> position with Norwegian Cruise Line Holdings.</p>
            <p>We have successfully received your application and our recruiting team will review it shortly. If your qualifications match our requirements, we will contact you to schedule an interview.</p>
            <p style="margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #666;">
              <strong>Norwegian Cruise Line Holdings</strong><br/>
              careers@nclsail.com
            </p>
          </div>
        </div>
      `,
    })
  } catch (error) {
    console.error("[Resend] Error sending application confirmation email:", error)
    throw error
  }
}
