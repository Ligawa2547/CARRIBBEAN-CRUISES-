"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookie_consent")
    if (!hasConsented) {
      // Show the banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie_consent", "all")
    setIsVisible(false)
  }

  const acceptEssential = () => {
    localStorage.setItem("cookie_consent", "essential")
    setIsVisible(false)
  }

  const closeConsent = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 pr-8">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold mb-2">Cookie Consent</h3>
              <button
                onClick={closeConsent}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close cookie consent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our
              traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Read our{" "}
              <Link href="/cookies-policy" className="text-ocean-600 dark:text-ocean-400 hover:underline">
                Cookie Policy
              </Link>{" "}
              for more information.
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={acceptEssential} className="whitespace-nowrap">
              Essential Only
            </Button>
            <Button size="sm" onClick={acceptAll} className="bg-ocean-600 hover:bg-ocean-700 whitespace-nowrap">
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
