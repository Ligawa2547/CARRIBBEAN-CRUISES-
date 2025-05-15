"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase-browser"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import { ArrowRight, Clock, CheckCircle, XCircle, AlertCircle, Briefcase } from "lucide-react"
import type { Job, JobApplication } from "@/types"

interface ApplicationWithJob extends JobApplication {
  jobs: Job
}

export default function MyApplications({ userId }: { userId: string }) {
  const [applications, setApplications] = useState<ApplicationWithJob[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createBrowserClient()

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error } = await supabase
          .from("applications")
          .select(`
            *,
            jobs:job_id (
              id,
              title,
              department,
              location,
              salary_range
            )
          `)
          .eq("user_id", userId)
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching applications:", error)
          setError("Failed to load your applications. Please try again.")
        } else {
          setApplications(data as ApplicationWithJob[])
        }
      } catch (error) {
        console.error("Unexpected error fetching applications:", error)
        setError("An unexpected error occurred. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [userId, supabase])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50">
            <Clock className="mr-1 h-3 w-3" />
            <span>Pending</span>
          </Badge>
        )
      case "reviewing":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50">
            <Clock className="mr-1 h-3 w-3" />
            <span>Reviewing</span>
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50">
            <CheckCircle className="mr-1 h-3 w-3" />
            <span>Approved</span>
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50">
            <XCircle className="mr-1 h-3 w-3" />
            <span>Rejected</span>
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <AlertCircle className="mr-1 h-3 w-3" />
            <span>{status}</span>
          </Badge>
        )
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-full max-w-md mb-4" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-6 text-red-700 dark:text-red-300">
        <h3 className="text-lg font-semibold mb-2">Error</h3>
        <p>{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Briefcase className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Applications Yet</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          You haven't applied for any jobs yet. Browse our open positions and submit your first application.
        </p>
        <Button asChild className="bg-ocean-600 hover:bg-ocean-700">
          <Link href="/jobs">Browse Jobs</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <div key={application.id} className="p-4 border rounded-lg bg-white dark:bg-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{application.jobs.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{application.jobs.department}</p>
            </div>
            {getStatusBadge(application.status || "pending")}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            Applied {formatDistanceToNow(new Date(application.created_at), { addSuffix: true })}
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="text-xs text-slate-500 dark:text-slate-400 w-full sm:w-auto">
              {application.jobs.location} • {application.jobs.salary_range}
            </div>
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
              <Link href={`/jobs/${application.job_id}`}>
                View Job
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
