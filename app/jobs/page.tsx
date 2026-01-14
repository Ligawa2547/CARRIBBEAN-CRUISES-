import { getJobs } from "@/app/actions/jobs"
import JobsList from "./jobs-list"
import JobsFilter from "./jobs-filter"
import { Briefcase, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Footer from "@/components/footer"

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get search and filter parameters
  const search = typeof searchParams.search === "string" ? searchParams.search : ""
  const department = typeof searchParams.department === "string" ? searchParams.department : ""

  // Fetch all jobs
  const { jobs, error } = await getJobs()

  // Filter jobs based on search and department
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = search
      ? job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase())
      : true
    const matchesDepartment = department ? job.department === department : true
    return matchesSearch && matchesDepartment
  })

  // Get unique departments for filter
  const departments = Array.from(new Set(jobs.map((job) => job.department))).sort()

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white dark:from-ocean-950 dark:to-background pt-20">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0 h-[300px]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-458115989-612x612.jpg-RplCqufQCEEykO51cHF3tKjHRbSLEN.jpeg"
            alt="Cruise ship on ocean"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        </div>

        <div className="container relative z-10 py-16 md:py-20 px-4 md:px-6">
          <div className="max-w-3xl text-white">
            <Badge className="mb-4 bg-white/15 text-white hover:bg-white/20 backdrop-blur-sm border-white/10">
              Career Opportunities
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-sm">
              Find Your Dream Job at Sea
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8">
              Explore our current openings and start your journey with Caribbean Cruises
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-auto md:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <form>
                <Input
                  type="search"
                  name="search"
                  placeholder="Search jobs..."
                  className="pl-9 w-full"
                  defaultValue={search}
                />
              </form>
            </div>
            <JobsFilter departments={departments} selectedDepartment={department} />
          </div>
        </div>
      </section>

      {/* Jobs Listing Section */}
      <section className="py-10 md:py-16">
        <div className="container px-4 md:px-6">
          {error ? (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-6 text-red-700 dark:text-red-300">
              <h2 className="text-lg font-semibold mb-2">Error Loading Jobs</h2>
              <p>{error}</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Jobs Available</h2>
              <p className="text-slate-500 dark:text-slate-400">
                There are currently no job listings available. Please check back later.
              </p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Matching Jobs</h2>
              <p className="text-slate-500 dark:text-slate-400">
                No jobs match your current search criteria. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                  {filteredJobs.length} {filteredJobs.length === 1 ? "Position" : "Positions"} Available
                </h2>
              </div>
              <JobsList jobs={filteredJobs} />
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
