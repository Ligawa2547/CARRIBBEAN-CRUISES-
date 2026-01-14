"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Admin error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground">
          We encountered an error while loading the admin dashboard. This could be due to a temporary issue or a
          configuration problem.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/login">Return to login</Link>
          </Button>
        </div>
        <div className="rounded-md bg-muted p-4 text-left text-sm">
          <p className="font-mono text-xs">{error.message}</p>
          {error.digest && <p className="font-mono text-xs">Digest: {error.digest}</p>}
        </div>
      </div>
    </div>
  )
}
