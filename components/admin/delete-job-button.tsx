"use client"

import { useState } from "react"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteJob } from "@/app/actions/admin-jobs"
import { useRouter } from "next/navigation"

interface DeleteJobButtonProps {
  jobId: number
  jobTitle: string
}

export function DeleteJobButton({ jobId, jobTitle }: DeleteJobButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      const result = await deleteJob(jobId)

      if (result.success) {
        router.refresh()
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("Failed to delete job. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Job Listing</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{jobTitle}"? This action cannot be undone and will permanently remove the
            job listing.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && (
          <div className="p-3 rounded-md bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300 text-sm">
            {error}
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
