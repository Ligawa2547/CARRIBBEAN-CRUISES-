"use client"

import React from "react"
import ResendEmailButton from "./resend-email-button"

export default function ResendEmailWrapper({ applicationId }: { applicationId: number }) {
  return <ResendEmailButton applicationId={applicationId} />
}
