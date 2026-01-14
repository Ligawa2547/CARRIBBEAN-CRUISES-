"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateJob, type JobFormData } from "@/app/actions/admin-jobs"
import type { Job } from "@/types"

interface EditJobFormProps {
  job: Job
}

export function EditJobForm({ job }: EditJobFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<JobFormData>({
    title: job.title,
    department: job.department,
    description: job.description,
    requirements: job.requirements,
    salary_range: job.salary_range,
    location: job.location,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const result = await updateJob(job.id, formData)

      if (result.success) {
        setSuccess(result.message)
        setTimeout(() => {
          router.push("/admin/jobs/manage")
        }, 1500)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-ocean-950 dark:text-white">Job Details</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-md bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-ocean-950 dark:text-white">
              Job Title
            </label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <label htmlFor="department" className="text-sm font-medium text-ocean-950 dark:text-white">
              Department
            </label>
            <Input id="department" name="department" value={formData.department} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium text-ocean-950 dark:text-white">
              Location
            </label>
            <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <label htmlFor="salary_range" className="text-sm font-medium text-ocean-950 dark:text-white">
              Salary Range
            </label>
            <Input
              id="salary_range"
              name="salary_range"
              value={formData.salary_range}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-ocean-950 dark:text-white">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="requirements" className="text-sm font-medium text-ocean-950 dark:text-white">
              Requirements
            </label>
            <Textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/jobs/manage")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-ocean-600 hover:bg-ocean-700" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
