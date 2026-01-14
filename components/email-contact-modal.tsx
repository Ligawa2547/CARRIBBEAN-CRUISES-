"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button" // Fixed import
import { Mail } from "lucide-react"

interface EmailContactModalProps {
  isOpen: boolean
  onClose: () => void
  subject: string
}

export function EmailContactModal({ isOpen, onClose, subject }: EmailContactModalProps) {
  const emailAddress = "info@caribbeancruises.site"
  const encodedSubject = encodeURIComponent(subject)
  const mailtoLink = `mailto:${emailAddress}?subject=${encodedSubject}`

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>Please send an email to the address below for booking or demo requests.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-blue-500" />
            <span className="font-medium">{emailAddress}</span>
          </div>
          <p className="text-sm text-gray-500">
            Click the button below to open your email client with a pre-filled subject line.
          </p>
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => window.open(mailtoLink, "_blank")}>Open Email Client</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
