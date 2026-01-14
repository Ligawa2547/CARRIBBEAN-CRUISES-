"use client"

import type React from "react"

import { useState } from "react"
import { createJob, type JobFormData } from "@/app/actions/admin-jobs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, Plus } from "lucide-react"

export default function AdminJobsPage() {
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    department: "",
    description: "",
    requirements: "",
    salary_range: "",
    location: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({})

    try {
      const result = await createJob(formData)

      setFormStatus({
        success: result.success,
        message: result.message,
      })

      if (result.success) {
        // Reset form on success
        setFormData({
          title: "",
          department: "",
          description: "",
          requirements: "",
          salary_range: "",
          location: "",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormStatus({
        success: false,
        message: error instanceof Error ? `Error: ${error.message}` : "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-indigo-950 dark:text-white flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          Post New Job
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300">
          Create a new job listing that will be displayed on the website
        </p>
      </div>

      <Card className="border-0 shadow-md bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-indigo-950 dark:text-white">Job Details</CardTitle>
          <CardDescription>Fill out the form below to create a new job listing</CardDescription>
        </CardHeader>
        <CardContent>
          {formStatus.message && (
            <div
              className={`mb-6 p-4 rounded-md ${
                formStatus.success
                  ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 border border-green-200 dark:border-green-800/30"
                  : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300 border border-red-200 dark:border-red-800/30"
              }`}
            >
              <p className="font-medium">{formStatus.message}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-indigo-950 dark:text-white">
                  Job Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Cruise Ship Chef"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium text-indigo-950 dark:text-white">
                  Department
                </label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. Food & Beverage"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-indigo-950 dark:text-white">
                Job Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the job responsibilities and duties..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="requirements" className="text-sm font-medium text-indigo-950 dark:text-white">
                Requirements
              </label>
              <Textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="List the qualifications and experience required..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="salary_range" className="text-sm font-medium text-indigo-950 dark:text-white">
                  Salary Range
                </label>
                <Input
                  id="salary_range"
                  name="salary_range"
                  value={formData.salary_range}
                  onChange={handleChange}
                  placeholder="e.g. $45,000 - $65,000"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium text-indigo-950 dark:text-white">
                  Location
                </label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Various cruise ships worldwide"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-1">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Job...
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Create Job
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
