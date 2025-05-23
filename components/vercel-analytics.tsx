"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { track } from "@vercel/analytics"

export function VercelAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views when route changes
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Track page view with the correct Vercel Analytics API
    track("pageview", {
      path: pathname,
      url: url,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      title: typeof document !== "undefined" ? document.title : "",
    })
  }, [pathname, searchParams])

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
