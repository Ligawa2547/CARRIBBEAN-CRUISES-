import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Briefcase, Users, MessageSquare, Plus, List, Ship, Database, Cpu } from "lucide-react"
import { supabase } from "@/lib/supabase-server"

async function getStats() {
  try {
    const [jobsResult, applicationsResult, messagesResult] = await Promise.all([
      supabase.from("jobs").select("id", { count: "exact" }),
      supabase.from("applications").select("id", { count: "exact" }),
      supabase.from("contact_messages").select("id", { count: "exact" }),
    ])

    return {
      jobsCount: jobsResult.count || 0,
      applicationsCount: applicationsResult.count || 0,
      messagesCount: messagesResult.count || 0,
    }
  } catch (error) {
    console.error("Error fetching stats:", error)
    return { jobsCount: 0, applicationsCount: 0, messagesCount: 0 }
  }
}

export default async function AdminDashboard() {
  const { jobsCount, applicationsCount, messagesCount } = await getStats()

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-2 text-ocean-950 dark:text-white">Admin Dashboard</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-8">
        Welcome to the NCL Sail admin panel. Manage jobs, applications, and messages.
      </p>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-md bg-gradient-to-br from-ocean-500 to-ocean-600 text-white">
          <CardHeader className="pb-2">
            <Briefcase className="h-8 w-8 mb-2 opacity-80" />
            <CardTitle className="text-4xl font-bold">{jobsCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-ocean-100">Active Job Listings</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardHeader className="pb-2">
            <Users className="h-8 w-8 mb-2 opacity-80" />
            <CardTitle className="text-4xl font-bold">{applicationsCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-emerald-100">Total Applications</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <CardHeader className="pb-2">
            <MessageSquare className="h-8 w-8 mb-2 opacity-80" />
            <CardTitle className="text-4xl font-bold">{messagesCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-100">Contact Messages</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-ocean-950 dark:text-white">
              <Briefcase className="h-5 w-5 text-ocean-600" />
              Job Management
            </CardTitle>
            <CardDescription>Create and manage job listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Button asChild className="bg-ocean-600 hover:bg-ocean-700">
                <Link href="/admin/jobs">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Job
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/jobs/manage">
                  <List className="h-4 w-4 mr-2" />
                  Manage Jobs
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-ocean-950 dark:text-white">
              <Database className="h-5 w-5 text-ocean-600" />
              Bulk Job Import
            </CardTitle>
            <CardDescription>Import multiple jobs at once</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Button asChild variant="outline">
                <Link href="/admin/add-hospitality-jobs">
                  <Database className="h-4 w-4 mr-2" />
                  Add Hospitality Jobs
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/add-cruise-ship-jobs">
                  <Ship className="h-4 w-4 mr-2" />
                  Add Cruise Ship Jobs
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/add-electronics-jobs">
                  <Cpu className="h-4 w-4 mr-2" />
                  Add Electronics Jobs
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-ocean-950 dark:text-white">
              <Users className="h-5 w-5 text-emerald-600" />
              Applications
            </CardTitle>
            <CardDescription>Review job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Link href="/admin/applications">
                <Users className="h-4 w-4 mr-2" />
                View Applications ({applicationsCount})
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-ocean-950 dark:text-white">
              <MessageSquare className="h-5 w-5 text-amber-600" />
              Contact Messages
            </CardTitle>
            <CardDescription>Review contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 text-white">
              <Link href="/admin/contacts">
                <MessageSquare className="h-4 w-4 mr-2" />
                View Messages ({messagesCount})
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
