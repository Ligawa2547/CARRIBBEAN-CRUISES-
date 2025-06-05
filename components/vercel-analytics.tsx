"use client"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function VercelAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views for debugging
    if (typeof window !== "undefined") {
      console.log("Analytics: Page view tracked", pathname)
    }
  }, [pathname])

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
