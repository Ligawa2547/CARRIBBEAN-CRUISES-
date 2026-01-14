"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Anchor,
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  Compass,
  Film,
  MapPin,
  Play,
  Ship,
  Star,
  Ticket,
  Users,
} from "lucide-react"
import { ImageCarousel } from "@/components/image-carousel"
import Footer from "@/components/footer"
import Header from "@/components/header"

// Featured jobs data
const featuredJobs = [
  {
    id: 1,
    title: "Senior Chef de Partie",
    department: "Food & Beverage",
    location: "Caribbean Routes",
    salary: "$3,500 - $4,200 monthly",
    description: "Join our culinary team and create exceptional dining experiences for our guests.",
    featured: true,
  },
  {
    id: 2,
    title: "Entertainment Coordinator",
    department: "Entertainment",
    location: "International Routes",
    salary: "$3,200 - $3,800 monthly",
    description: "Organize and coordinate entertainment activities for cruise guests.",
    featured: true,
  },
  {
    id: 3,
    title: "Guest Relations Officer",
    department: "Guest Services",
    location: "Caribbean Routes",
    salary: "$3,000 - $3,600 monthly",
    description: "Provide exceptional service and support to cruise guests.",
    featured: true,
  },
]

// Upcoming cruises data
const upcomingCruises = [
  {
    id: 1,
    title: "Caribbean Paradise Cruise",
    duration: "7 nights",
    departure: "Miami, FL",
    destinations: "Jamaica, Bahamas, Grand Cayman",
    price: "From $899",
    date: "June 15, 2025",
    cruiseLine: "Royal Caribbean",
    ship: "Wonder of the Seas",
    image: "/images/istockphoto-104241367-612x612.jpeg",
  },
  {
    id: 2,
    title: "Tropical Island Explorer",
    duration: "10 nights",
    departure: "San Juan, Puerto Rico",
    destinations: "St. Lucia, Barbados, Antigua, St. Kitts",
    price: "From $1,299",
    date: "July 8, 2025",
    cruiseLine: "Celebrity Cruises",
    ship: "Celebrity Beyond",
    image: "/images/istockphoto-527091631-612x612.jpeg",
  },
  {
    id: 3,
    title: "Mediterranean Splendor",
    duration: "7 nights",
    departure: "Barcelona, Spain",
    destinations: "Naples, Rome, Florence, Cannes",
    price: "From $1,099",
    date: "November 12, 2025",
    cruiseLine: "MSC Cruises",
    ship: "MSC Seashore",
    image: "/images/istockphoto-523876470-612x612.jpeg",
  },
]

// Partner logos
const partnerLogos = [
  { name: "Carnival Cruise Line", logo: "/images/partner-carnival.png" },
  { name: "Celebrity Cruises", logo: "/images/partner-celebrity.png" },
  { name: "Norwegian Cruise Line", logo: "/images/partner-norwegian.png" },
  { name: "MSC Cruises", logo: "/images/partner-msc.png" },
  { name: "Disney Cruise Line", logo: "/images/partner-disney.png" },
  { name: "Royal Caribbean", logo: "/images/partner-royal-caribbean.png" },
]

// Testimonials
const testimonials = [
  {
    id: 1,
    name: "Maria Rodriguez",
    position: "Head Chef, 5 years with Caribbean Cruises",
    quote:
      "Working with Caribbean Cruises has been the best career decision I've made. The recruitment process was smooth, and they found me the perfect position that matched my skills and aspirations.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "James Wilson",
    position: "Entertainment Director, 3 years with Caribbean Cruises",
    quote:
      "Caribbean Cruises not only helped me find a job but also guided me through the entire onboarding process. Their support team is always available to answer questions and provide assistance.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Sofia Chen",
    position: "Guest Relations Manager, 4 years with Caribbean Cruises",
    quote:
      "The opportunities for career advancement are incredible. Caribbean Cruises continues to support my professional development and has helped me progress from an entry-level position to management.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

// Add featured videos data
const featuredVideos = [
  {
    id: "video1",
    title: "Caribbean Cruise Experience",
    thumbnail: "/images/istockphoto-523876470-612x612.jpeg",
    duration: "3:45",
  },
  {
    id: "video2",
    title: "Life Onboard Our Ships",
    thumbnail: "/images/istockphoto-599881398-612x612.jpeg",
    duration: "5:12",
  },
  {
    id: "video3",
    title: "Culinary Delights at Sea",
    thumbnail: "/images/istockphoto-458115989-612x612.jpeg",
    duration: "4:30",
  },
]

export function HomeClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/istockphoto-523876470-612x612.jpeg"
              alt="Cruise ship sailing through a fjord with mountains"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
          </div>

          <div className="container relative z-10 py-20 md:py-32 px-4 md:px-6">
            <div className="max-w-3xl text-white">
              <Badge className="mb-4 bg-white/15 text-white hover:bg-white/20 backdrop-blur-sm border-white/10">
                Official Recruitment Partner
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white drop-shadow-sm">
                Set Sail on Your Dream Career
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-8">
                Join the Caribbean Cruises family and discover exciting job opportunities on the world's most luxurious
                cruise ships. We are the exclusive recruitment partner for leading cruise lines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-ocean-600 hover:bg-ocean-700 text-white font-medium">
                  <Link href="/jobs">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Explore Job Opportunities
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white font-medium"
                >
                  <Link href="/cruises">
                    <Ticket className="mr-2 h-5 w-5" />
                    Browse Cruise Tickets
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-ocean-50 dark:bg-ocean-950/30 py-12 border-y border-ocean-100 dark:border-ocean-800/20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-ocean-600 dark:text-ocean-400">15+</p>
                <p className="text-sm md:text-base text-muted-foreground">Cruise Line Partners</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-ocean-600 dark:text-ocean-400">5,000+</p>
                <p className="text-sm md:text-base text-muted-foreground">Jobs Filled Annually</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-ocean-600 dark:text-ocean-400">50+</p>
                <p className="text-sm md:text-base text-muted-foreground">Destinations Worldwide</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-ocean-600 dark:text-ocean-400">98%</p>
                <p className="text-sm md:text-base text-muted-foreground">Placement Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Your Gateway to Maritime Opportunities
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Caribbean Cruises is the official recruitment partner and ticket provider for the world's leading cruise
                lines. Explore our services below.
              </p>
            </div>

            <Tabs defaultValue="recruitment" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
                <TabsTrigger value="cruises">Cruise Tickets</TabsTrigger>
                <TabsTrigger value="about">About Us</TabsTrigger>
              </TabsList>

              {/* Recruitment Tab */}
              <TabsContent value="recruitment" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Find Your Perfect Position</h3>
                    <p className="text-muted-foreground mb-6">
                      As the official recruitment partner for leading cruise lines, we offer exclusive access to a wide
                      range of positions across various departments. Our expert team will guide you through every step
                      of the application process.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5" />
                        <p className="text-sm">Exclusive access to positions not advertised elsewhere</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5" />
                        <p className="text-sm">Personalized career guidance and interview preparation</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5" />
                        <p className="text-sm">Assistance with documentation and onboarding</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5" />
                        <p className="text-sm">Ongoing support throughout your contract</p>
                      </div>
                    </div>
                    <Button asChild className="mt-6">
                      <Link href="/jobs">
                        View All Job Openings
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="relative h-[400px] rounded-xl overflow-hidden">
                    <Image
                      src="/images/istockphoto-599881398-612x612.jpeg"
                      alt="Cruise ship staff providing service"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mt-12 mb-6">Featured Job Opportunities</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredJobs.map((job) => (
                    <Card key={job.id} className="overflow-hidden border-0 shadow-md bg-white dark:bg-ocean-950/20">
                      <CardContent className="p-6">
                        {job.featured && (
                          <Badge className="mb-3 bg-ocean-100 text-ocean-800 dark:bg-ocean-900/50 dark:text-ocean-300 hover:bg-ocean-200 dark:hover:bg-ocean-800/70">
                            Featured
                          </Badge>
                        )}
                        <h4 className="text-xl font-semibold mb-2">{job.title}</h4>
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.department}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <p className="text-sm mb-4">{job.description}</p>
                        <div className="text-sm font-medium text-ocean-600 dark:text-ocean-400 mb-4">{job.salary}</div>
                        <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                          <Link href={`/jobs/${job.id}`}>View Details</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button asChild variant="outline">
                    <Link href="/jobs">
                      View All Job Openings
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              {/* Cruises Tab */}
              <TabsContent value="cruises" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-bold mb-4">Book Your Dream Cruise</h3>
                    <p className="text-muted-foreground mb-6">
                      As an official ticket provider for major cruise lines, we offer exclusive deals on cruise packages
                      to the most beautiful destinations in the Caribbean and beyond. Book your next adventure with us
                      and enjoy special benefits.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5" />
                        <p className="text-sm">Exclusive discounts not available elsewhere</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5" />
                        <p className="text-sm">Flexible booking options and payment plans</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5" />
                        <p className="text-sm">Complimentary cabin upgrades when available</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5" />
                        <p className="text-sm">24/7 customer support before and during your cruise</p>
                      </div>
                    </div>
                    <Button asChild className="mt-6">
                      <Link href="/cruises">
                        Browse Cruise Packages
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="order-1 md:order-2 relative h-[400px] rounded-xl overflow-hidden">
                    <Image
                      src="/images/istockphoto-522033573-612x612.jpeg"
                      alt="Luxury cruise ship in the Caribbean"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mt-12 mb-6">Upcoming Cruise Packages</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {upcomingCruises.map((cruise) => (
                    <Card key={cruise.id} className="overflow-hidden border-0 shadow-md">
                      <div className="relative h-48">
                        <Image
                          src={cruise.image || "/placeholder.svg"}
                          alt={cruise.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h4 className="text-xl font-semibold mb-2">{cruise.title}</h4>
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Ship className="h-4 w-4 mr-1" />
                          {cruise.cruiseLine} • {cruise.ship}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {cruise.date} • {cruise.duration}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Anchor className="h-4 w-4 mr-1" />
                          {cruise.departure}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <Compass className="h-4 w-4 mr-1" />
                          {cruise.destinations}
                        </div>
                        <div className="text-sm font-medium text-ocean-600 dark:text-ocean-400 mb-4">
                          {cruise.price}
                        </div>
                        <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                          <Link href={`/cruises/${cruise.id}`}>View Details</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button asChild variant="outline">
                    <Link href="/cruises">
                      View All Cruise Packages
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">The Caribbean Cruises Difference</h3>
                    <p className="text-muted-foreground mb-6">
                      Founded in 2010, Caribbean Cruises has grown to become the premier recruitment partner and ticket
                      provider for the world's leading cruise lines. Our expertise in the maritime industry and
                      commitment to excellence set us apart.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5" />
                        <div>
                          <p className="font-medium">Industry Recognition</p>
                          <p className="text-sm text-muted-foreground">
                            Multiple awards for excellence in maritime recruitment
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5" />
                        <div>
                          <p className="font-medium">Expert Team</p>
                          <p className="text-sm text-muted-foreground">
                            Our staff has over 100 years of combined experience in the cruise industry
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Ship className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5" />
                        <div>
                          <p className="font-medium">Exclusive Partnerships</p>
                          <p className="text-sm text-muted-foreground">
                            Official recruitment and ticketing partner for 15+ major cruise lines
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button asChild className="mt-6">
                      <Link href="/about">
                        Learn More About Us
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="relative">
                    <ImageCarousel />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-ocean-50 dark:bg-ocean-950/30 border-y border-ocean-100 dark:border-ocean-800/20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Caribbean Cruises?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer unparalleled opportunities and services in the cruise industry
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Placeholder for HomeIcons component */}
              {/* <Suspense fallback={<div className="h-32 flex items-center justify-center">Loading...</div>}>
                <HomeIcons />
              </Suspense> */}
            </div>
          </div>
        </section>

        {/* Dining Menu Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                <span className="bg-gradient-to-r from-ocean-600 to-cruise-600 bg-clip-text text-transparent">
                  Exquisite Dining Experience
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Indulge in world-class cuisine prepared by our expert chefs using the freshest ingredients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="h-48 relative">
                  <Image src="/images/menu/steak-dish.png" alt="Fine Dining" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Gourmet Cuisine</h3>
                  <p className="text-muted-foreground mb-4">
                    Experience culinary excellence with our internationally inspired menu options.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="h-48 relative">
                  <Image src="/images/menu/noodle-soup.png" alt="Specialty Restaurants" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Specialty Restaurants</h3>
                  <p className="text-muted-foreground mb-4">
                    Choose from multiple dining venues, each offering a unique culinary experience.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="h-48 relative">
                  <Image src="/images/menu/cocktail-trio.png" alt="Beverage Selection" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Premium Beverages</h3>
                  <p className="text-muted-foreground mb-4">
                    Enjoy our extensive selection of fine wines, craft cocktails, and non-alcoholic options.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-md bg-ocean-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
              >
                View Full Menu
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Success Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hear from professionals who found their dream careers through Caribbean Cruises
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-0 shadow-md bg-white dark:bg-ocean-950/20">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.position}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="inline-block h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm italic text-muted-foreground">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 bg-white dark:bg-ocean-950/10 border-y border-ocean-100 dark:border-ocean-800/20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-ocean-100 text-ocean-700 hover:bg-ocean-200 dark:bg-ocean-900/50 dark:text-ocean-300 dark:hover:bg-ocean-900/70">
                Official Partnerships
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Our Exclusive Cruise Line Partners</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We are proud to be the exclusive recruitment and ticketing partner for these leading cruise lines
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {partnerLogos.map((partner) => (
                <div key={partner.name} className="flex justify-center">
                  <div className="relative h-20 w-40 bg-white dark:bg-ocean-950/30 p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                As official partners, we have exclusive access to job openings and special cruise packages that aren't
                available through other agencies.
              </p>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-ocean-100 text-ocean-700 hover:bg-ocean-200 dark:bg-ocean-900/50 dark:text-ocean-300 dark:hover:bg-ocean-900/70">
                Featured Content
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                <span className="bg-gradient-to-r from-ocean-600 to-cruise-600 bg-clip-text text-transparent">
                  Explore Our Video Gallery
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Watch our latest videos showcasing life at sea, destinations, and behind-the-scenes footage
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {featuredVideos.map((video) => (
                <div key={video.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
                  <div className="h-48 relative">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                        <Play className="h-6 w-6 text-ocean-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                    <Link
                      href={`/videos/${video.id}`}
                      className="text-ocean-600 hover:text-ocean-700 text-sm font-medium flex items-center"
                    >
                      Watch Now
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild variant="outline" className="gap-2 bg-transparent">
                <Link href="/videos">
                  <Film className="h-4 w-4" />
                  View All Videos
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0">
                <Image
                  src="/images/istockphoto-458115989-612x612.jpeg"
                  alt="Cruise ship sailing on deep blue waters"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/90 to-cruise-900/80" />
              </div>

              <div className="relative z-10 px-6 py-12 md:py-16 md:px-12 text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Ready to Start Your Journey?</h2>
                <p className="text-white/90 max-w-2xl mx-auto mb-8">
                  Whether you're looking for an exciting career at sea or planning your next vacation, Caribbean Cruises
                  is your trusted partner for all things cruise-related.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild size="lg" className="bg-white text-ocean-800 hover:bg-white/90 font-medium">
                    <Link href="/jobs">
                      <Briefcase className="mr-2 h-5 w-5" />
                      Explore Job Opportunities
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white font-medium"
                  >
                    <Link href="/cruises">
                      <Ticket className="mr-2 h-5 w-5" />
                      Browse Cruise Tickets
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
