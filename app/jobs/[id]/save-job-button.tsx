"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"
import { saveJob, unsaveJob } from "@/app/actions/user-jobs"

export default function SaveJobButton({ jobId, initialSaved = false }: { jobId: number; initialSaved?: boolean }) {
  const [isSaved, setIsSaved] = useState(initialSaved)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleToggleSave = async () => {
    if (!user) {
      // Redirect to login if not authenticated
      toast({
        title: "Authentication required",
        description: "Please sign in to save jobs.",
      })
      router.push(`/login?returnUrl=/jobs/${jobId}`)
      return
    }

    setIsLoading(true)

    try {
      if (isSaved) {
        // Unsave the job
        const result = await unsaveJob(user.id, jobId)
        if (result.success) {
          setIsSaved(false)
          toast({
            title: "Job removed",
            description: "This job has been removed from your saved list.",
          })
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to remove job from saved list.",
            variant: "destructive",
          })
        }
      } else {
        // Save the job
        const result = await saveJob(user.id, jobId)
        if (result.success) {
          setIsSaved(true)
          toast({
            title: "Job saved",
            description: "This job has been added to your saved list.",
          })
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to save job.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error toggling job save:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={isSaved ? "default" : "outline"}
      size="sm"
      className={
        isSaved
          ? "gap-1 bg-red-500 hover:bg-red-600 text-white"
          : "gap-1 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
      }
      onClick={handleToggleSave}
      disabled={isLoading}
    >
      <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
      <span className="sr-only md:not-sr-only md:inline-block">{isSaved ? "Saved" : "Save Job"}</span>
    </Button>
  )
}
