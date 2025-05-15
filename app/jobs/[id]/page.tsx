import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  Anchor,
  ArrowLeft,
  Briefcase,
  DollarSign,
  MapPin,
  Clock,
  Share2,
  Ship,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getJobById } from "@/app/actions/jobs"
import SaveJobButtonWrapper from "./save-job-button-wrapper"

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const jobId = Number.parseInt(params.id)

  if (isNaN(jobId)) {
    return notFound()
  }

  try {
    const { job, error } = await getJobById(jobId)

    if (error || !job) {
      return notFound()
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-cruise-50/30 dark:from-ocean-950 dark:to-cruise-950/30 pt-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-ocean-800 to-cruise-700 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-104241367-612x612.jpg-5jL2o3b1iHARTRrkWgA5CXyRnC9h6b.jpeg')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-800/90 via-ocean-700/85 to-cruise-700/90"></div>
          <div className="relative container py-16 md:py-20 px-4 md:px-6 text-white">
            <div className="max-w-4xl">
              <Link
                href="/jobs"
                className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Link>
              <Badge className="mb-4 bg-white/15 text-white hover:bg-white/20 backdrop-blur-sm border-white/10">
                {job.department}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-sm">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center text-white/80">
                  <MapPin className="mr-2 h-5 w-5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-white/80">
                  <DollarSign className="mr-2 h-5 w-5" />
                  <span>{job.salary_range}</span>
                </div>
                <div className="flex items-center text-white/80">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>Full-time</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-10 md:py-16 px-4 md:px-6">
          <div className="grid gap-8 md:gap-10 md:grid-cols-3">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              <Card className="overflow-hidden border-0 shadow-md glass-card">
                <div className="bg-ocean-50 dark:bg-ocean-900/30 px-6 py-4 border-b">
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="bg-transparent h-9 p-0">
                      <TabsTrigger
                        value="description"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-ocean-600 dark:data-[state=active]:border-ocean-400 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                      >
                        Description
                      </TabsTrigger>
                      <TabsTrigger
                        value="requirements"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-ocean-600 dark:data-[state=active]:border-ocean-400 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                      >
                        Requirements
                      </TabsTrigger>
                      <TabsTrigger
                        value="benefits"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-ocean-600 dark:data-[state=active]:border-ocean-400 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                      >
                        Benefits
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-0">
                      <div className="p-6 md:p-8 bg-white/80 dark:bg-ocean-900/80 backdrop-blur-sm space-y-4">
                        <div>
                          <h2 className="text-xl font-semibold mb-3 text-ocean-950 dark:text-white">Job Description</h2>
                          <p className="text-slate-600 dark:text-slate-300">{job.description}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-ocean-950 dark:text-white">
                            Responsibilities
                          </h3>
                          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                            <li>Perform all duties related to the {job.title} position</li>
                            <li>Ensure compliance with safety and security protocols</li>
                            <li>Provide exceptional service to guests and team members</li>
                            <li>Participate in training and development programs</li>
                            <li>Maintain a clean and organized work environment</li>
                            <li>Collaborate effectively with other departments</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="requirements" className="mt-0">
                      <div className="p-6 md:p-8 bg-white/80 dark:bg-ocean-900/80 backdrop-blur-sm space-y-4">
                        <div>
                          <h2 className="text-xl font-semibold mb-3 text-ocean-950 dark:text-white">Requirements</h2>
                          <p className="text-slate-600 dark:text-slate-300">{job.requirements}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-ocean-950 dark:text-white">Qualifications</h3>
                          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                            <li>Previous experience in a similar role</li>
                            <li>Strong communication and interpersonal skills</li>
                            <li>Ability to work in a fast-paced environment</li>
                            <li>Flexibility to work various shifts and schedules</li>
                            <li>Valid passport with at least 12 months validity</li>
                            <li>Fluent in English (additional languages are a plus)</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="benefits" className="mt-0">
                      <div className="p-6 md:p-8 bg-white/80 dark:bg-ocean-900/80 backdrop-blur-sm space-y-4">
                        <div>
                          <h2 className="text-xl font-semibold mb-3 text-ocean-950 dark:text-white">Benefits</h2>
                          <p className="text-slate-600 dark:text-slate-300">
                            We offer a comprehensive benefits package to all our crew members, making a career at sea
                            both rewarding and enjoyable.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-ocean-50 dark:bg-ocean-900/20 p-4 rounded-lg transition-transform hover:scale-105">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                <CheckCircle className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-ocean-950 dark:text-white">Competitive Salary</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                  Earn a competitive salary with potential for tips and bonuses
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-ocean-50 dark:bg-ocean-900/20 p-4 rounded-lg transition-transform hover:scale-105">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                <CheckCircle className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-ocean-950 dark:text-white">Free Accommodation</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                  Enjoy free room and board during your contract
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-ocean-50 dark:bg-ocean-900/20 p-4 rounded-lg transition-transform hover:scale-105">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                <CheckCircle className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-ocean-950 dark:text-white">Medical Coverage</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                  Comprehensive medical coverage while on board
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-ocean-50 dark:bg-ocean-900/20 p-4 rounded-lg transition-transform hover:scale-105">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                <CheckCircle className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-ocean-950 dark:text-white">Travel Opportunities</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                  Visit multiple destinations around the world
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>

              <Card className="border-0 shadow-md glass-card">
                <CardHeader>
                  <CardTitle className="text-ocean-950 dark:text-white">Life on Board</CardTitle>
                  <CardDescription>Experience the unique lifestyle of working on a cruise ship</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative rounded-lg overflow-hidden mb-6 shadow-md">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-522033573-612x612.jpg-94FZLoMUwaC4c55oNXaI1g41xABzEw.jpeg"
                      alt="Cruise ship deck with lounge chairs"
                      width={800}
                      height={400}
                      className="w-full h-[300px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-sm font-medium">
                        Enjoy access to crew facilities and amenities during your free time
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Working on a cruise ship is a unique experience that combines professional growth with adventure. As
                    a crew member, you'll:
                  </p>

                  <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                    <li>Live and work alongside team members from around the world</li>
                    <li>Enjoy crew-only facilities including dining areas, lounges, and recreation spaces</li>
                    <li>Have opportunities to explore ports of call during your free time</li>
                    <li>Develop strong friendships and professional connections</li>
                    <li>Experience different cultures and destinations while earning a living</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Mobile Apply Button */}
              <div className="md:hidden">
                <Button asChild className="w-full bg-ocean-600 hover:bg-ocean-700">
                  <Link href={`/jobs/${job.id}/apply`}>
                    <Anchor className="mr-2 h-4 w-4" />
                    Apply for this Position
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-md overflow-hidden glass-card">
                <div className="bg-gradient-to-r from-ocean-800 to-cruise-700 text-white p-6">
                  <h2 className="text-xl font-bold mb-2">Ready to Apply?</h2>
                  <p className="text-white/80 text-sm">Submit your application today and start your journey with us</p>
                </div>
                <CardContent className="p-6 md:p-8 bg-white/80 dark:bg-ocean-900/80 backdrop-blur-sm">
                  <Button asChild className="w-full mb-4 bg-ocean-600 hover:bg-ocean-700">
                    <Link href={`/jobs/${job.id}/apply`}>
                      <Anchor className="mr-2 h-4 w-4" />
                      Apply Now
                    </Link>
                  </Button>

                  <div className="flex justify-between">
                    <SaveJobButtonWrapper jobId={job.id} />
                    <Button variant="outline" size="sm" className="gap-1">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:inline-block">Share</span>
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Briefcase className="mr-3 h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                      <div>
                        <p className="text-sm font-medium text-ocean-950 dark:text-white">Department</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{job.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-3 h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                      <div>
                        <p className="text-sm font-medium text-ocean-950 dark:text-white">Location</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{job.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-3 h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                      <div>
                        <p className="text-sm font-medium text-ocean-950 dark:text-white">Salary Range</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{job.salary_range}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-3 h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                      <div>
                        <p className="text-sm font-medium text-ocean-950 dark:text-white">Contract Length</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">4-8 months</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-ocean-950 dark:text-white">
                    <Ship className="mr-2 h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                    Application Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-ocean-600 text-white text-xs font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-ocean-950 dark:text-white">Online Application</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Complete the application form with your details
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-ocean-600 text-white text-xs font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-ocean-950 dark:text-white">Initial Screening</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Our recruitment team will review your application
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-ocean-600 text-white text-xs font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-ocean-950 dark:text-white">Interview</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Selected candidates will be invited for interviews
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-ocean-600 text-white text-xs font-bold">
                        4
                      </div>
                      <div>
                        <p className="font-medium text-ocean-950 dark:text-white">Job Offer</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Successful candidates will receive a job offer
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-ocean-600 text-white text-xs font-bold">
                        5
                      </div>
                      <div>
                        <p className="font-medium text-ocean-950 dark:text-white">Onboarding</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Complete documentation and pre-boarding training
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md glass-card">
                <CardHeader>
                  <CardTitle className="text-ocean-950 dark:text-white">Similar Positions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="group flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-ocean-100 dark:bg-ocean-900/30 flex items-center justify-center flex-shrink-0">
                      <Ship className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href="/jobs/1"
                        className="font-medium hover:text-ocean-600 dark:hover:text-ocean-400 transition-colors text-ocean-950 dark:text-white"
                      >
                        Cruise Ship Chef
                      </Link>
                      <p className="text-xs text-slate-600 dark:text-slate-300 truncate">Food & Beverage</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-ocean-600 dark:group-hover:text-ocean-400 transition-colors" />
                  </div>
                  <Separator />
                  <div className="group flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-ocean-100 dark:bg-ocean-900/30 flex items-center justify-center flex-shrink-0">
                      <Ship className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href="/jobs/2"
                        className="font-medium hover:text-ocean-600 dark:hover:text-ocean-400 transition-colors text-ocean-950 dark:text-white"
                      >
                        Housekeeping Supervisor
                      </Link>
                      <p className="text-xs text-slate-600 dark:text-slate-300 truncate">Housekeeping</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-ocean-600 dark:group-hover:text-ocean-400 transition-colors" />
                  </div>
                  <Separator />
                  <div className="group flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-ocean-100 dark:bg-ocean-900/30 flex items-center justify-center flex-shrink-0">
                      <Ship className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href="/jobs/3"
                        className="font-medium hover:text-ocean-600 dark:hover:text-ocean-400 transition-colors text-ocean-950 dark:text-white"
                      >
                        Entertainment Coordinator
                      </Link>
                      <p className="text-xs text-slate-600 dark:text-slate-300 truncate">Entertainment</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-ocean-600 dark:group-hover:text-ocean-400 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in job details page:", error)
    return notFound()
  }
}
