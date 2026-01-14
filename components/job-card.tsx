'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Briefcase } from 'lucide-react'

interface JobCardProps {
  id: number
  title: string
  department: string
  description: string
  location: string
  salary_range: string
}

export function JobCard({
  id,
  title,
  department,
  description,
  location,
  salary_range,
}: JobCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{department}</CardDescription>
          </div>
          <Badge variant="secondary">{salary_range}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          {location}
        </div>
      </CardContent>
      <CardContent className="pt-0">
        <Link href={`/jobs/${id}`} className="w-full">
          <Button className="w-full">View Details & Apply</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
