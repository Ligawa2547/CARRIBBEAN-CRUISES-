"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function AnalyticsScript() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views
    if (typeof window !== "undefined") {
      // Simple page view tracking
      const event = new CustomEvent("pageview", {
        detail: { path: pathname },
      })
      window.dispatchEvent(event)
    }
  }, [pathname])

  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <>
          <Script
            id="vercel-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
              `,
            }}
          />
          <Script src="https://va.vercel-scripts.com/v1/script.js" strategy="afterInteractive" />
        </>
      )}
    </>
  )
}
