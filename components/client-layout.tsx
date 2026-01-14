"use client"

import type React from "react"
import { AuthProvider } from "@/context/auth-context"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </AuthProvider>
  )
}
