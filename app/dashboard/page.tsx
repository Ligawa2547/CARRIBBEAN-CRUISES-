"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import { Briefcase, Heart, User, Bell, Settings } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase-browser"
import { Skeleton } from "@/components/ui/skeleton"
import MyApplications from "./my-applications"
import SavedJobs from "./saved-jobs"
import ProfileSettings from "./profile-settings"
import DashboardOverview from "./dashboard-overview"
import NotificationsPanel from "./notifications-panel"

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createBrowserClient()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [authLoading, user, router])

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

          if (error) {
            console.error("Error fetching profile:", error)
          } else {
            setProfile(data)
          }
        } catch (error) {
          console.error("Unexpected error fetching profile:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    if (user) {
      fetchProfile()
    }
  }, [user, supabase])

  if (authLoading || !user) {
    return (
      <div className="min-h-screen pt-20 pb-10 bg-gradient-to-b from-ocean-50 to-cruise-50/30 dark:from-ocean-950 dark:to-cruise-950/30">
        <div className="container px-4 md:px-6 py-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gradient-to-b from-ocean-50 to-cruise-50/30 dark:from-ocean-950 dark:to-cruise-950/30">
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-ocean-950 dark:text-white">
              Welcome, {profile?.full_name || user.email?.split("@")[0]}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">User ID: {user.id.substring(0, 8)}...</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span>Last login: {new Date(user.last_sign_in_at || Date.now()).toLocaleDateString()}</span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-5 md:w-[600px] mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Applications</span>
              <span className="sm:hidden">Apps</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Saved Jobs</span>
              <span className="sm:hidden">Saved</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
              <span className="sm:hidden">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
              <span className="sm:hidden">Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-ocean-950 dark:text-white">
                  <Settings className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                  Dashboard Overview
                </CardTitle>
                <CardDescription>Your application status and recent activity</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardOverview userId={user.id} profile={profile} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-ocean-950 dark:text-white">
                  <Briefcase className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                  My Applications
                </CardTitle>
                <CardDescription>Track the status of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <MyApplications userId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-ocean-950 dark:text-white">
                  <Heart className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                  Saved Jobs
                </CardTitle>
                <CardDescription>Jobs you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <SavedJobs userId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-ocean-950 dark:text-white">
                  <Bell className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                  Notifications
                </CardTitle>
                <CardDescription>Your alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationsPanel userId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-ocean-950 dark:text-white">
                  <User className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                  Profile Settings
                </CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileSettings user={user} profile={profile} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
