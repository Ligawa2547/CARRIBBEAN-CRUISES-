import Link from "next/link"
import { supabase } from "@/lib/supabase-server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Plus, Edit, Database, Ship } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { Job } from "@/types"
import { DeleteJobButton } from "@/components/admin/delete-job-button"

async function getJobs() {
  try {
    const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching jobs:", error)
      return { jobs: [], error: error.message }
    }

    return { jobs: data || [], error: null }
  } catch (error) {
    console.error("Error in getJobs:", error)
    return { jobs: [], error: String(error) }
  }
}

export default async function ManageJobsPage() {
  const { jobs, error } = await getJobs()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-ocean-950 dark:text-white flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
            Manage Jobs
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300">
            View, edit, and delete job listings
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            variant="outline"
            className="bg-ocean-50 text-ocean-700 border-ocean-200 hover:bg-ocean-100 dark:bg-ocean-900/30 dark:text-ocean-300 dark:border-ocean-800/50 dark:hover:bg-ocean-900/50"
          >
            <Link href="/admin/add-hospitality-jobs">
              <Database className="h-4 w-4 mr-1" />
              Add Hospitality Jobs
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-ocean-50 text-ocean-700 border-ocean-200 hover:bg-ocean-100 dark:bg-ocean-900/30 dark:text-ocean-300 dark:border-ocean-800/50 dark:hover:bg-ocean-900/50"
          >
            <Link href="/admin/add-cruise-ship-jobs">
              <Ship className="h-4 w-4 mr-1" />
              Add Cruise Ship Jobs
            </Link>
          </Button>
          <Button asChild className="bg-ocean-600 hover:bg-ocean-700">
            <Link href="/admin/jobs">
              <Plus className="h-4 w-4 mr-1" />
              Add New Job
            </Link>
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-red-600 dark:text-red-400 mb-6">
          <p>Error loading jobs: {error}</p>
        </div>
      )}

      {!error && jobs.length === 0 && (
        <Card className="border-0 shadow-md bg-white dark:bg-slate-800 text-center p-8">
          <div className="flex justify-center mb-4">
            <Briefcase className="h-12 w-12 text-slate-300 dark:text-slate-600" />
          </div>
          <h2 className="text-xl font-semibold text-ocean-950 dark:text-white mb-2">No Jobs Found</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">You haven't created any job listings yet.</p>
          <Button asChild className="bg-ocean-600 hover:bg-ocean-700">
            <Link href="/admin/jobs">
              <Plus className="h-4 w-4 mr-1" />
              Create Your First Job
            </Link>
          </Button>
        </Card>
      )}

      {jobs.length > 0 && (
        <div className="space-y-4">
          {jobs.map((job: Job) => (
            <Card key={job.id} className="border-0 shadow-md bg-white dark:bg-slate-800">
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-ocean-950 dark:text-white">{job.title}</CardTitle>
                  <Badge className="mt-1 bg-ocean-100 text-ocean-800 hover:bg-ocean-200 dark:bg-ocean-900/30 dark:text-ocean-300 dark:hover:bg-ocean-900/50">
                    {job.department}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                    <Link href={`/admin/jobs/edit/${job.id}`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <DeleteJobButton jobId={job.id} jobTitle={job.title} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 mb-1">Salary Range:</p>
                    <p className="text-ocean-950 dark:text-white">{job.salary_range}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 mb-1">Location:</p>
                    <p className="text-ocean-950 dark:text-white">{job.location}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-slate-500 dark:text-slate-400 mb-1">Description:</p>
                  <p className="text-ocean-950 dark:text-white line-clamp-2">{job.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Posted {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                  </p>
                  <Button asChild variant="link" size="sm" className="text-ocean-600 dark:text-ocean-400">
                    <Link href={`/jobs/${job.id}`} target="_blank">
                      View on Website
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
