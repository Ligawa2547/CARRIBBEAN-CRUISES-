import type React from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Shield, LogOut, Plus, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { isAuthenticated, logout } from "../actions/auth"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Check if user is authenticated (for server components)
  const authenticated = await isAuthenticated()
  if (!authenticated && typeof window === "undefined") {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-slate-900/30">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <Link href="/admin/jobs/manage" className="text-lg font-bold text-indigo-950 dark:text-white">
              Ocean Careers Admin
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/admin/jobs"
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add Job</span>
            </Link>
            <Link
              href="/admin/jobs/manage"
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <List className="h-4 w-4" />
              <span>Manage Jobs</span>
            </Link>
            <form action={logout}>
              <Button variant="ghost" size="sm" className="gap-1" type="submit">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </form>
          </nav>
        </div>
      </header>
      <main className="container py-10 px-4 md:px-6">{children}</main>
    </div>
  )
}
