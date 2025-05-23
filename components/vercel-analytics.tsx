"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function VercelAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Simple page tracking without external dependencies
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      console.log("Page view:", pathname)
    }
  }, [pathname])

  return null
}

export function VercelSpeedInsights() {
  return null
}
