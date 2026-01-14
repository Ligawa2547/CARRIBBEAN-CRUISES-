import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getJobById } from "@/app/actions/jobs"
import ApplicationForm from "./application-form"

export default async function ApplyPage({ params }: { params: { id: string } }) {
  const jobId = Number.parseInt(params.id)

  if (isNaN(jobId)) {
    notFound()
  }

  const { job, error } = await getJobById(jobId)

  if (error || !job) {
    notFound()
  }

  return (
    <div className="container py-6 md:py-10 px-4 md:px-6">
      <Link
        href={`/jobs/${job.id}`}
        className="mb-6 md:mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Job Details
      </Link>

      <div className="mx-auto max-w-2xl">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Apply for {job.title}</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Complete the form below to apply for this position
          </p>
        </div>

        <ApplicationForm job={job} />
      </div>
    </div>
  )
}
