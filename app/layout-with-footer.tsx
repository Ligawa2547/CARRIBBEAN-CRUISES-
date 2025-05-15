"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { AuthProvider } from "@/context/auth-context"
import dynamic from "next/dynamic"
import Footer from "@/components/footer"

// Dynamically import components to reduce initial bundle size
const Header = dynamic(() => import("@/components/header"), {
  ssr: true,
  loading: () => <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"></div>,
})

export default function LayoutWithFooter({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Only render client components after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        {mounted ? (
          <Header />
        ) : (
          <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"></div>
        )}
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
