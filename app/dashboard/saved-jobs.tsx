"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase-browser"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import { ArrowRight, Heart, Trash2, MapPin, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Job } from "@/types"

interface SavedJob {
  id: number
  user_id: string
  job_id: number
  created_at: string
  jobs: Job
}

export default function SavedJobs({ userId }: { userId: string }) {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createBrowserClient()
  const { toast } = useToast()

  useEffect(() => {
    const fetchSavedJobs = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error } = await supabase
          .from("saved_jobs")
          .select(`
            *,
            jobs:job_id (
              id,
              title,
              department,
              description,
              location,
              salary_range,
              created_at
            )
          `)
          .eq("user_id", userId)
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching saved jobs:", error)
          setError("Failed to load your saved jobs. Please try again.")
        } else {
          setSavedJobs(data as SavedJob[])
        }
      } catch (error) {
        console.error("Unexpected error fetching saved jobs:", error)
        setError("An unexpected error occurred. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSavedJobs()
  }, [userId, supabase])

  const handleRemoveSavedJob = async (savedJobId: number) => {
    try {
      const { error } = await supabase.from("saved_jobs").delete().eq("id", savedJobId)

      if (error) {
        console.error("Error removing saved job:", error)
        toast({
          title: "Error",
          description: "Failed to remove job from saved list. Please try again.",
          variant: "destructive",
        })
      } else {
        setSavedJobs((prev) => prev.filter((job) => job.id !== savedJobId))
        toast({
          title: "Job removed",
          description: "The job has been removed from your saved list.",
        })
      }
    } catch (error) {
      console.error("Unexpected error removing saved job:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
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

  if (savedJobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Heart className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Saved Jobs</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          You haven't saved any jobs yet. Browse our open positions and save jobs you're interested in.
        </p>
        <Button asChild className="bg-ocean-600 hover:bg-ocean-700">
          <Link href="/jobs">Browse Jobs</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {savedJobs.map((savedJob) => (
        <div key={savedJob.id} className="p-4 border rounded-lg bg-white dark:bg-slate-800">
          <div className="flex justify-between items-start gap-2 mb-3">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{savedJob.jobs.title}</h3>
              <Badge className="mt-1 bg-ocean-100 text-ocean-800 hover:bg-ocean-200 dark:bg-ocean-900/30 dark:text-ocean-300 dark:hover:bg-ocean-900/50">
                {savedJob.jobs.department}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={() => handleRemoveSavedJob(savedJob.id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4">{savedJob.jobs.description}</p>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="mr-1 h-3 w-3" />
              <span>{savedJob.jobs.location}</span>
            </div>
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
              <DollarSign className="mr-1 h-3 w-3" />
              <span>{savedJob.jobs.salary_range}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="text-xs text-slate-500 dark:text-slate-400 w-full sm:w-auto">
              Saved {formatDistanceToNow(new Date(savedJob.created_at), { addSuffix: true })}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                <Link href={`/jobs/${savedJob.jobs.id}`}>
                  View Job
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
              <Button asChild size="sm" className="w-full sm:w-auto bg-ocean-600 hover:bg-ocean-700">
                <Link href={`/jobs/${savedJob.jobs.id}/apply`}>Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
