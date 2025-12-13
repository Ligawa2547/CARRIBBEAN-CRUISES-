"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { AuthProvider } from "@/context/auth-context"
import Toaster from "@/components/toaster"
import dynamic from "next/dynamic"

// Dynamically import components to reduce initial bundle size
const Header = dynamic(() => import("@/components/header"), {
  ssr: true,
  loading: () => <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"></div>,
})

// Remove the Footer import and reference since it's now being included elsewhere
// This prevents the duplicate footer issue

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Only render client components after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Toaster />
        {mounted ? (
          <Header />
        ) : (
          <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"></div>
        )}
        <main className="flex-1">{children}</main>
        {/* Footer is removed from here to prevent duplication */}
      </div>
    </AuthProvider>
  )
}
