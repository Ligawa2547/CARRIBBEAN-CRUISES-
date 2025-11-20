import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailData {
  to: string
  name: string
  jobTitle: string
}

export async function sendApplicationConfirmationEmail({ to, name, jobTitle }: EmailData) {
  try {
    const deadline = new Date()
    deadline.setDate(deadline.getDate() + 2)
    const deadlineString = deadline.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Confirmation - Caribbean Cruises</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Caribbean Cruises</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Talent Acquisition Team</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #0ea5e9; margin-top: 0;">Dear ${name},</h2>
            
            <p>Thank you for your interest in joining Caribbean Cruises. We truly appreciate the time you took to apply for <strong>${jobTitle}</strong>.</p>
            
            <p>Due to the many applications received, we're unable to conduct one-on-one virtual interviews with every applicant. However, we want to ensure everyone gets a fair opportunity to be heard.</p>
            
            <p>We kindly ask you to record a short video (maximum 5 minutes) introducing yourself and answering a few questions. This will help us learn more about you and your fit for our team.</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0ea5e9; margin-top: 0;">Video Instructions</h3>
              
              <p><strong>Step 1:</strong> Go to <a href="https://www.loom.com" style="color: #0ea5e9;">https://www.loom.com</a></p>
              <p><strong>Step 2:</strong> Sign up for a free Loom account (if you don't already have one).</p>
              <p><strong>Step 3:</strong> Record a video answering the following:</p>
              
              <ul style="margin: 15px 0; padding-left: 20px;">
                <li>Tell us about yourself.</li>
                <li>Why do you want to work with Caribbean Cruises?</li>
                <li>What experience or skills make you a strong candidate?</li>
                <li>What makes you a good fit for a customer-focused cruise team?</li>
              </ul>
              
              <p><strong>Step 4:</strong> Keep your video under 5 minutes.</p>
              <p><strong>Step 5:</strong> Set your video visibility to "Anyone with the link can view."</p>
              <p><strong>Step 6:</strong> Copy the video link and reply to this email with the link.</p>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="color: #92400e; margin-top: 0;">Required Documents</h3>
              <p style="margin-bottom: 10px;">You are also required to send the following documents:</p>
              <ol style="margin: 10px 0; padding-left: 20px;">
                <li>National ID or Passport</li>
                <li>Curriculum Vitae/Resume</li>
                <li>Educational Transcripts/Certificate</li>
              </ol>
            </div>
            
            <div style="background: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
              <h3 style="color: #dc2626; margin-top: 0;">Important Deadline</h3>
              <p style="margin: 0;"><strong>Deadline to submit your video and documents: ${deadlineString}</strong></p>
              <p style="margin: 10px 0 0 0;">Submit your video link to: <a href="mailto:talent@caribbeancruises.site" style="color: #0ea5e9;">talent@caribbeancruises.site</a></p>
            </div>
            
            <p>If you have any questions or face any issues, feel free to reach out.</p>
            
            <p>We look forward to seeing your video!</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0;"><strong>Warm regards,</strong></p>
              <p style="margin: 5px 0;"><strong>Talent Acquisition Team</strong></p>
              <p style="margin: 5px 0;"><strong>Caribbean Cruises</strong></p>
              <p style="margin: 5px 0;">Email: <a href="mailto:talent@caribbeancruises.site" style="color: #0ea5e9;">talent@caribbeancruises.site</a></p>
            </div>
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: "Caribbean Cruises <talent@caribbeancruises.site>",
      to: [to],
      subject: `Application Confirmation - ${jobTitle} Position`,
      html: emailHtml,
    })

    if (error) {
      console.error("Error sending email:", error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log("Email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error in sendApplicationConfirmationEmail:", error)
    throw error
  }
}

export async function sendBulkApplicationEmails(
  applications: Array<{ email: string; fullName: string; jobTitle?: string }>,
) {
  const results = []

  for (const application of applications) {
    try {
      await sendApplicationConfirmationEmail({
        to: application.email,
        name: application.fullName,
        jobTitle: application.jobTitle || "the position",
      })
      results.push({ email: application.email, success: true })

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    } catch (error) {
      console.error(`Failed to send email to ${application.email}:`, error)
      results.push({
        email: application.email,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  return results
}
