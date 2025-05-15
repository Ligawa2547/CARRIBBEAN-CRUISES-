import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white dark:from-ocean-950 dark:to-background pt-20">
      {/* Hero Section Skeleton */}
      <section className="relative bg-ocean-800 h-[300px]">
        <div className="container relative z-10 py-16 md:py-20 px-4 md:px-6">
          <div className="max-w-3xl">
            <Skeleton className="h-6 w-24 mb-4 bg-white/20" />
            <Skeleton className="h-12 w-full max-w-lg mb-4 bg-white/20" />
            <Skeleton className="h-6 w-full max-w-md bg-white/20" />
          </div>
        </div>
      </section>

      {/* Search and Filter Section Skeleton */}
      <section className="py-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Skeleton className="h-10 w-full md:w-[60%]" />
            <Skeleton className="h-10 w-full md:w-[220px]" />
          </div>
        </div>
      </section>

      {/* Jobs Listing Section Skeleton */}
      <section className="py-10 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-6 flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="border-0 shadow-md bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-7 w-full max-w-md mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-[80%]" />
                    </div>
                    <div className="flex flex-row md:flex-col gap-4 md:gap-2 md:min-w-[180px] md:items-end">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Skeleton className="h-5 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
