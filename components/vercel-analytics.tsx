"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function VercelAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      // Vercel Analytics code (replace with actual Vercel Analytics integration)
      console.log("Vercel Analytics: Page view tracked", pathname)
    }
  }, [pathname])

  return null
}
