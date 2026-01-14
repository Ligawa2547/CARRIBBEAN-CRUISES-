'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, MapPin, DollarSign, Briefcase } from 'lucide-react'

interface Job {
  id: number
  title: string
  department: string
  description: string
  requirements: string
  location: string
  salary_range: string
  created_at: string
}

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const id = params.id
        const response = await fetch(`/api/jobs/${id}`)
        
        if (!response.ok) {
          throw new Error('Job not found')
        }
        
        const data = await response.json()
        setJob(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load job')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchJob()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-24 mb-8" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link href="/jobs">
            <Button variant="outline" className="mb-8 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-2">Job Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/jobs">
              <Button>Browse All Jobs</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/jobs">
          <Button variant="outline" className="mb-8 bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
                  <Badge variant="secondary">{job.department}</Badge>
                </div>
              </div>
              <p className="text-lg text-muted-foreground">{job.description}</p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Job Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {job.requirements.split('\n').map((req, i) => (
                    <p key={i} className="text-sm text-foreground mb-2">
                      {req}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Position Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Salary
                    </span>
                  </div>
                  <p className="text-lg font-semibold">{job.salary_range}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Location
                    </span>
                  </div>
                  <p className="text-lg font-semibold">{job.location}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Department
                    </span>
                  </div>
                  <p className="text-lg font-semibold">{job.department}</p>
                </div>

                <Link href={`/jobs/${job.id}/apply`} className="w-full">
                  <Button className="w-full" size="lg">
                    Apply Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
