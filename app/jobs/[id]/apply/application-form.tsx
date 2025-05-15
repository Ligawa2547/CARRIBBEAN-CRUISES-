"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { submitApplication } from "@/app/actions/applications"
import { useAuth } from "@/context/auth-context"
import { Loader2 } from "lucide-react"
import type { Job } from "@/types"
import Link from "next/link"

// Define the form schema
const formSchema = z.object({
  full_name: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  cover_letter: z.string().min(50, { message: "Cover letter must be at least 50 characters." }),
  resume_url: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function ApplicationForm({ job }: { job: Job }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Initialize the form with default values from user profile if available
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: user?.email || "",
      phone: "",
      cover_letter: "",
      resume_url: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // If user is not logged in, prompt them to create an account
      if (!user) {
        // Store application data in session storage
        sessionStorage.setItem(
          "pendingApplication",
          JSON.stringify({
            jobId: job.id,
            applicationData: data,
          }),
        )

        // Redirect to signup page with return URL
        toast({
          title: "Account required",
          description: "Please create an account or sign in to submit your application.",
        })
        router.push(`/signup?returnUrl=/jobs/${job.id}/apply`)
        return
      }

      // Submit application with user ID if logged in
      const result = await submitApplication({
        job_id: job.id,
        user_id: user.id,
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        cover_letter: data.cover_letter,
        resume_url: data.resume_url || null,
        status: "pending",
        created_at: new Date().toISOString(),
      })

      if (result.success) {
        toast({
          title: "Application submitted",
          description: "Your application has been successfully submitted.",
        })
        router.push(`/jobs/${job.id}/apply/success`)
      } else {
        toast({
          title: "Submission failed",
          description: result.error || "Failed to submit application. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      toast({
        title: "Submission failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cover_letter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us why you're interested in this position and what makes you a good fit..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Explain why you're interested in this position and highlight relevant experience.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resume_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume URL (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/my-resume.pdf" {...field} />
                </FormControl>
                <FormDescription>
                  Provide a link to your resume if it's hosted online (Google Drive, Dropbox, etc.)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button type="submit" className="bg-ocean-600 hover:bg-ocean-700" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href={`/jobs/${job.id}`}>Cancel</Link>
          </Button>
        </div>

        {!user && (
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              You'll need to create an account or sign in to submit your application. Your information will be saved.
            </p>
          </div>
        )}
      </form>
    </Form>
  )
}
