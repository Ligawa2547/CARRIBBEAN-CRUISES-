"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { sendContactResponse } from "@/app/actions/admin-automation"
import { toast } from "sonner"

interface ContactAutomationControlsProps {
  contactId: number
  contactName: string
  contactSubject: string
  isResponded: boolean
}

export function ContactAutomationControls({
  contactId,
  contactName,
  contactSubject,
  isResponded,
}: ContactAutomationControlsProps) {
  const [isSending, setIsSending] = useState(false)

  const handleSendResponse = async () => {
    setIsSending(true)

    try {
      // In a real scenario, you'd fetch the recipient email and message from the database
      // or pass them as props. For this automation, we'll assume the server action
      // can handle the lookup or we'll pass simplified data.
      const result = await sendContactResponse({
        contactId,
        recipientEmail: "", // The server action should handle lookup by ID
        recipientName: contactName,
        subject: contactSubject,
        originalMessage: "Original message from database", // The server action should handle lookup by ID
      })

      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to send response")
      console.error("[v0] Error sending contact response:", error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium text-indigo-950 dark:text-white text-sm">Automated Response</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Send confirmation from info@caribbeancruises.site
        </p>
      </div>
      <Button
        onClick={handleSendResponse}
        disabled={isSending || isResponded}
        size="sm"
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        {isSending ? (
          <>
            <Mail className="mr-2 h-3.5 w-3.5 animate-pulse" />
            Sending...
          </>
        ) : isResponded ? (
          "Responded"
        ) : (
          <>
            <Mail className="mr-2 h-3.5 w-3.5" />
            Send Response
          </>
        )}
      </Button>
    </div>
  )
}
