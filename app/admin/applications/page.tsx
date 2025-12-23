import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

import ResendEmailWrapper from "@/components/admin/resend-email-wrapper"

interface JobApplication {
  id: number
  job_id: number
  full_name: string
  email: string
  phone: string
  experience_years: number
  cover_letter: string
  status: string
  created_at: string
  jobs: {
    title: string
    department: string
  }
}

async function getApplications() {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select(`
        *,
        jobs:job_id (
          title,
          department
        )
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching applications:", error)
      return { applications: [], error: error.message }
    }

    return { applications: (data as JobApplication[]) || [], error: null }
  } catch (error) {
    console.error("Error in getApplications:", error)
    return { applications: [], error: String(error) }
  }
}

export default async function AdminApplicationsPage() {
  const { applications, error } = await getApplications()

  return (
    <div className="container py-10 md:py-16 px-4 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-indigo-950 dark:text-white">
            Job Applications
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300">
            View and manage applications for cruise ship positions
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-red-600 dark:text-red-400 mb-6">
            <p>Error loading applications: {error}</p>
          </div>
        )}

        {!error && applications.length === 0 && (
          <div className="rounded-lg border p-8 md:p-10 text-center bg-white dark:bg-slate-800 shadow-md">
            <h2 className="text-lg md:text-xl font-semibold text-indigo-950 dark:text-white">No applications found</h2>
            <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300">
              There are no job applications in the database yet.
            </p>
          </div>
        )}

        {applications.length > 0 && (
          <div className="space-y-6">
            {applications.map((application) => (
              <Card key={application.id} className="border-0 shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-indigo-950 dark:text-white">
                        Application for {application.jobs?.title || "Unknown Position"}
                      </CardTitle>
                      <CardDescription>
                        From: {application.full_name} ({application.email})
                      </CardDescription>
                    </div>
                    <Badge
                      className={
                        application.status === "approved"
                          ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                          : application.status === "rejected"
                            ? "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
                      }
                    >
                      {application.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/50"
                    >
                      {application.jobs?.department || "Unknown Department"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/30 dark:text-slate-300 dark:border-slate-800/50"
                    >
                      {application.experience_years} {application.experience_years === 1 ? "year" : "years"} experience
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {formatDistanceToNow(new Date(application.created_at), { addSuffix: true })}
                  </p>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium text-indigo-950 dark:text-white mb-2">Cover Letter</h3>
                  <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{application.cover_letter}</p>

                  <div className="mt-4 pt-4 border-t">
                    <h3 className="font-medium text-indigo-950 dark:text-white mb-2">Contact Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Email: </span>
                        <span className="text-slate-600 dark:text-slate-300">{application.email}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Phone: </span>
                        <span className="text-slate-600 dark:text-slate-300">{application.phone}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <div className="client-resend-button">
                        <ResendEmailWrapper applicationId={application.id} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
