import { notFound, redirect } from "next/navigation"
import { getJob } from "@/app/actions/admin-jobs"
import { isAuthenticated } from "@/app/actions/auth"
import { EditJobForm } from "@/components/admin/edit-job-form"

interface EditJobPageProps {
  params: { id: string }
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect("/admin/login")
  }

  const jobId = Number.parseInt(params.id, 10)

  if (isNaN(jobId)) {
    notFound()
  }

  const job = await getJob(jobId)

  if (!job) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-ocean-950 dark:text-white mb-8">
        Edit Job Listing
      </h1>
      <EditJobForm job={job} />
    </div>
  )
}
