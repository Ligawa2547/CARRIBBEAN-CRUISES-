"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function CanonicalUrl() {
  const pathname = usePathname()

  useEffect(() => {
    // Remove any existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.remove()
    }

    // Create and append the new canonical link
    const link = document.createElement("link")
    link.setAttribute("rel", "canonical")
    link.setAttribute("href", `https://caribbeancruises.site${pathname}`)
    document.head.appendChild(link)
  }, [pathname])

  return null
}
