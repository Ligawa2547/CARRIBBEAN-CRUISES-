"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, RefreshCw } from "lucide-react"
import { updateApplicationStatusAndEmail } from "@/app/actions/admin-automation"
import { toast } from "sonner"

interface ApplicationAutomationControlsProps {
  applicationId: number
  currentStatus: string
  applicantName: string
}

// Client component for one-click status updates and automated emails
export function ApplicationAutomationControls({
  applicationId,
  currentStatus,
  applicantName,
}: ApplicationAutomationControlsProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  const handleStatusUpdate = async (sendEmail: boolean) => {
    if (selectedStatus === currentStatus && !sendEmail) {
      toast.info("Status is already set to this value")
      return
    }

    if (sendEmail) {
      setIsSendingEmail(true)
    } else {
      setIsUpdating(true)
    }

    try {
      const result = await updateApplicationStatusAndEmail({
        applicationId,
        newStatus: selectedStatus,
        sendEmail,
      })

      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      console.error("[v0] Error updating application:", error)
    } finally {
      setIsUpdating(false)
      setIsSendingEmail(false)
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-indigo-950 dark:text-white">Automation Controls</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="reviewing">Reviewing</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="interview">Interview</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={() => handleStatusUpdate(false)}
          disabled={isUpdating || isSendingEmail || selectedStatus === currentStatus}
          variant="outline"
          size="sm"
        >
          {isUpdating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Update Status
            </>
          )}
        </Button>

        <Button
          onClick={() => handleStatusUpdate(true)}
          disabled={isUpdating || isSendingEmail}
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {isSendingEmail ? (
            <>
              <Mail className="mr-2 h-4 w-4 animate-pulse" />
              Sending...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Update & Send Email
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Emails are sent from talent@caribbeancruises.site to {applicantName}
      </p>
    </div>
  )
}
