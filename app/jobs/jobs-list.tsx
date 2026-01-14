import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, DollarSign, ArrowRight } from "lucide-react"
import type { Job } from "@/types"
import { formatDistanceToNow } from "date-fns"

export default function JobsList({ jobs }: { jobs: Job[] }) {
  return (
    <div className="grid gap-6">
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.id}`} className="block group">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-ocean-100 text-ocean-800 hover:bg-ocean-200 dark:bg-ocean-900/30 dark:text-ocean-300 dark:hover:bg-ocean-900/50">
                      {job.department}
                    </Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Posted {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-ocean-600 dark:group-hover:text-ocean-400 transition-colors">
                    {job.title}
                  </h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300 line-clamp-2">{job.description}</p>
                </div>
                <div className="flex flex-row md:flex-col gap-4 md:gap-2 md:min-w-[180px] md:items-end">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{job.salary_range}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="inline-flex items-center text-sm font-medium text-ocean-600 dark:text-ocean-400 group-hover:underline">
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
