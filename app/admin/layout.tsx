import type React from "react"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import Link from "next/link"
import { Shield, LogOut, Plus, List, Users, Home, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { isAuthenticated, logout, getAdminUser } from "../actions/auth"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers()
  const pathname = headersList.get("x-pathname") || ""

  const isAuthPage = pathname.includes("/admin/login") || pathname.includes("/admin/signup")

  if (isAuthPage) {
    return <>{children}</>
  }

  // Check if user is authenticated (for server components)
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect("/admin/login")
  }

  const adminUser = await getAdminUser()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-slate-900/30">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <Link href="/admin" className="text-lg font-bold text-indigo-950 dark:text-white">
              NCL Admin
            </Link>
          </div>
          <nav className="flex items-center gap-2 md:gap-4">
            <Link
              href="/admin"
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Home className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            <Link
              href="/admin/jobs"
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">Add Job</span>
            </Link>
            <Link
              href="/admin/jobs/manage"
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <List className="h-4 w-4" />
              <span className="hidden md:inline">Jobs</span>
            </Link>
            <Link
              href="/admin/applications"
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Applications</span>
            </Link>
            <Link
              href="/admin/contacts"
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden md:inline">Messages</span>
            </Link>
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-200 dark:border-slate-700">
              {adminUser && (
                <span className="text-xs text-slate-500 dark:text-slate-400 hidden lg:inline">{adminUser}</span>
              )}
              <form action={logout}>
                <Button variant="ghost" size="sm" className="gap-1" type="submit">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </form>
            </div>
          </nav>
        </div>
      </header>
      <main className="container py-10 px-4 md:px-6">{children}</main>
    </div>
  )
}
