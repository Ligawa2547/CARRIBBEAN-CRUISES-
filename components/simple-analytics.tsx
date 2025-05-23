"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function SimpleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Simple page view tracking for development
    if (process.env.NODE_ENV === "development") {
      console.log("Page view tracked:", pathname)
    }

    // You can add additional analytics providers here if needed
    // For example, Google Analytics, Mixpanel, etc.
  }, [pathname])

  return null
}
