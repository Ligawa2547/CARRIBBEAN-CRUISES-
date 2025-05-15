import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SuccessPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-10 md:py-16 px-4 md:px-6">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-4 flex justify-center">
          <CheckCircle className="h-12 w-12 md:h-16 md:w-16 text-green-500" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Application Submitted!</h1>
        <p className="mt-4 text-sm md:text-base text-muted-foreground">
          Thank you for applying. Our recruitment team will review your application and contact you if your
          qualifications match our requirements.
        </p>
        <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
          <Button asChild className="w-full">
            <Link href="/jobs">Browse More Jobs</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
