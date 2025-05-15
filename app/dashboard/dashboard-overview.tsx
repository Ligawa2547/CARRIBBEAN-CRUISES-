"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase-browser"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Briefcase, Heart, Clock, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface DashboardStats {
  totalApplications: number
  savedJobs: number
  pendingApplications: number
  interviewsScheduled: number
  recentActivity: any[]
  profileCompletion: number
}

export default function DashboardOverview({ userId, profile }: { userId: string; profile: any }) {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createBrowserClient()

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setIsLoading(true)
      try {
        // Fetch applications count
        const { count: totalApplications, error: applicationsError } = await supabase
          .from("applications")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)

        if (applicationsError) {
          console.error("Error fetching applications count:", applicationsError)
        }

        // Fetch pending applications count
        const { count: pendingApplications, error: pendingError } = await supabase
          .from("applications")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)
          .eq("status", "pending")

        if (pendingError) {
          console.error("Error fetching pending applications count:", pendingError)
        }

        // Fetch saved jobs count
        const { count: savedJobs, error: savedJobsError } = await supabase
          .from("saved_jobs")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)

        if (savedJobsError) {
          console.error("Error fetching saved jobs count:", savedJobsError)
        }

        // Fetch interviews count (assuming there's a status for interviews)
        const { count: interviewsScheduled, error: interviewsError } = await supabase
          .from("applications")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)
          .eq("status", "interview")

        if (interviewsError) {
          console.error("Error fetching interviews count:", interviewsError)
        }

        // Fetch recent activity (applications and saved jobs)
        const { data: recentApplications, error: recentAppsError } = await supabase
          .from("applications")
          .select(`
            id,
            job_id,
            status,
            created_at,
            jobs:job_id (
              title,
              department
            )
          `)
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(5)

        if (recentAppsError) {
          console.error("Error fetching recent applications:", recentAppsError)
        }

        const { data: recentSavedJobs, error: recentSavedError } = await supabase
          .from("saved_jobs")
          .select(`
            id,
            created_at,
            jobs:job_id (
              id,
              title,
              department
            )
          `)
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(5)

        if (recentSavedError) {
          console.error("Error fetching recent saved jobs:", recentSavedError)
        }

        // Combine and sort recent activity
        const recentActivity = [
          ...(recentApplications || []).map((item) => ({
            ...item,
            type: "application",
          })),
          ...(recentSavedJobs || []).map((item) => ({
            ...item,
            type: "saved",
          })),
        ]
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)

        // Calculate profile completion percentage
        let profileFields = 0
        let completedFields = 0

        if (profile) {
          profileFields = 5 // full_name, email, phone, location, experience
          if (profile?.full_name) completedFields++
          if (profile?.email) completedFields++
          if (profile?.phone) completedFields++
          if (profile?.location) completedFields++
          if (profile?.experience) completedFields++
        }

        const profileCompletion = profileFields > 0 ? Math.round((completedFields / profileFields) * 100) : 0

        setStats({
          totalApplications: totalApplications || 0,
          savedJobs: savedJobs || 0,
          pendingApplications: pendingApplications || 0,
          interviewsScheduled: interviewsScheduled || 0,
          recentActivity,
          profileCompletion,
        })
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardStats()
  }, [userId, profile, supabase])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Applications</p>
                <h3 className="text-2xl font-bold text-ocean-950 dark:text-white mt-1">
                  {stats?.totalApplications || 0}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-ocean-100 dark:bg-ocean-900/30 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Saved Jobs</p>
                <h3 className="text-2xl font-bold text-ocean-950 dark:text-white mt-1">{stats?.savedJobs || 0}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                <Heart className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Applications</p>
                <h3 className="text-2xl font-bold text-ocean-950 dark:text-white mt-1">
                  {stats?.pendingApplications || 0}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Interviews</p>
                <h3 className="text-2xl font-bold text-ocean-950 dark:text-white mt-1">
                  {stats?.interviewsScheduled || 0}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profile Completion</CardTitle>
          <CardDescription>Complete your profile to improve your job application success rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{stats?.profileCompletion || 0}% Complete</span>
              <Link
                href="/dashboard?tab=profile"
                className="text-sm text-ocean-600 hover:text-ocean-700 dark:text-ocean-400 dark:hover:text-ocean-300"
              >
                Complete Profile
              </Link>
            </div>
            <Progress value={stats?.profileCompletion || 0} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>Your latest applications and saved jobs</CardDescription>
        </CardHeader>
        <CardContent>
          {stats?.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div
                  key={`${activity.type}-${activity.id}`}
                  className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.type === "application"
                        ? "bg-ocean-100 dark:bg-ocean-900/30"
                        : "bg-rose-100 dark:bg-rose-900/30"
                    }`}
                  >
                    {activity.type === "application" ? (
                      <Briefcase className="h-4 w-4 text-ocean-600 dark:text-ocean-400" />
                    ) : (
                      <Heart className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {activity.jobs?.title || "Job"}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {activity.jobs?.department || "Department"}
                          </Badge>
                          {activity.type === "application" && activity.status && (
                            <Badge
                              className={`text-xs ${
                                activity.status === "pending"
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300"
                                  : activity.status === "accepted"
                                    ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300"
                                    : activity.status === "rejected"
                                      ? "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300"
                                      : "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-900/30 dark:text-slate-300"
                              }`}
                            >
                              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {activity.type === "application"
                        ? "You applied for this position"
                        : "You saved this job for later"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-slate-500 dark:text-slate-400">No recent activity found</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/jobs">
                  Browse Jobs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
