"use client"

import SaveJobButton from "./save-job-button"

export default function SaveJobButtonWrapper({ jobId }: { jobId: number }) {
  return <SaveJobButton jobId={jobId} />
}
