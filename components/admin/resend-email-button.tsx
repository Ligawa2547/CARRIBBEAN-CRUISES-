"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function ResendEmailButton({ applicationId }: { applicationId: number }) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleResend = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/resend-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId }),
      })
      const data = await res.json()

      if (res.ok) {
        toast({ title: "Email resent", description: data.message || "Confirmation email resent." })
      } else {
        toast({ title: "Failed to resend", description: data.message || "Failed to resend confirmation email.", variant: "destructive" })
      }
    } catch (error) {
      console.error("Error resending email:", error)
      toast({ title: "Failed to resend", description: "Unexpected error while resending email.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button size="sm" variant="outline" onClick={handleResend} disabled={isLoading}>
      {isLoading ? "Resending..." : "Resend Email"}
    </Button>
  )
}
