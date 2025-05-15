import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, CheckCircle, CreditCard, Globe, Heart, Handshake, Ship, Ticket, FileText } from "lucide-react"

// Partner logos
const partnerLogos = [
  { name: "Carnival Cruise Line", logo: "/images/partner-carnival.png" },
  { name: "Celebrity Cruises", logo: "/images/partner-celebrity.png" },
  { name: "Norwegian Cruise Line", logo: "/images/partner-norwegian.png" },
  { name: "MSC Cruises", logo: "/images/partner-msc.png" },
  { name: "Disney Cruise Line", logo: "/images/partner-disney.png" },
  { name: "Royal Caribbean", logo: "/images/partner-royal-caribbean.png" },
]

// Certifications and accreditations
const certifications = [
  {
    name: "International Maritime Organization (IMO)",
    logo: "/images/cert-imo.png",
    description:
      "UN agency responsible for the safety and security of shipping and the prevention of marine and atmospheric pollution by ships",
  },
  {
    name: "Cruise Lines International Association (CLIA)",
    logo: "/images/cert-clia.png",
    description:
      "World's largest cruise industry trade association, providing a unified voice for the global cruise community",
  },
  {
    name: "International Labour Organization (ILO)",
    logo: "/images/cert-ilo.png",
    description:
      "UN agency that brings together governments, employers and workers to set labour standards and promote decent work",
  },
  {
    name: "Maritime and Coastguard Agency (MCA)",
    logo: "/images/cert-mca.png",
    description: "UK government agency working to prevent the loss of lives at sea and maintaining maritime standards",
  },
]

// Timeline events
const timeline = [
  {
    year: "2010",
    title: "Company Founded",
    description: "Caribbean Cruises was established as a specialized recruitment agency for the cruise industry.",
  },
  {
    year: "2012",
    title: "First Major Partnership",
    description: "Secured our first exclusive recruitment partnership with Royal Caribbean International.",
  },
  {
    year: "2015",
    title: "Expanded Services",
    description: "Added cruise ticket sales and booking services to our portfolio.",
  },
  {
    year: "2018",
    title: "International Expansion",
    description: "Opened offices in Miami, London, and Manila to better serve our global clientele.",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description: "Launched our comprehensive online platform for job applications and cruise bookings.",
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description: "Named 'Top Maritime Recruitment Agency' by Cruise Industry Awards for the third consecutive year.",
  },
]

import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-523876470-612x612.jpg-R3vDPL0GdzHEamZw1sP7YywMtCkfin.jpeg"
            alt="Cruise ship sailing through a fjord with mountains"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>

        <div className="container relative z-10 py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-3xl text-white">
            <Badge className="mb-4 bg-white/15 text-white hover:bg-white/20 backdrop-blur-sm border-white/10">
              About Us
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-sm">
              Caribbean Cruises
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8">
              The Official Recruitment Partner and Ticket Provider for the World's Leading Cruise Lines
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Caribbean Cruises is the premier recruitment partner and ticket provider for the world's leading
                  cruise lines. Founded in 2010, we have established ourselves as the industry leader in connecting
                  talented professionals with exciting career opportunities aboard luxury cruise ships around the world.
                </p>
                <p>
                  Our exclusive partnerships with major cruise lines give us unparalleled access to job openings across
                  all departments, from culinary arts and entertainment to engineering and guest services. As the
                  official recruitment partner for these prestigious companies, we offer positions that are not
                  available through any other agency.
                </p>
                <p>
                  In addition to our recruitment services, we are an authorized ticket provider for cruise vacations,
                  offering exclusive deals and packages that cannot be found elsewhere. Our comprehensive approach to
                  the cruise industry allows us to serve both professionals seeking careers at sea and travelers looking
                  for unforgettable vacation experiences.
                </p>
                <p>
                  With offices in Miami, London, and Manila, we have a global presence that allows us to serve clients
                  and candidates from around the world. Our team of industry experts brings decades of combined
                  experience in maritime recruitment and cruise operations.
                </p>
              </div>
            </div>

            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-458115989-612x612.jpg-RplCqufQCEEykO51cHF3tKjHRbSLEN.jpeg"
                alt="Cruise ship sailing on deep blue waters"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-599881398-612x612.jpg-eFmo84tEmWwiTXdIyi3XGSvbZKrDea.jpeg"
                alt="Cruise ship sailing near a tropical island"
                fill
                className="object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Our Services</h2>
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center text-foreground">
                    <Briefcase className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400" />
                    Recruitment Services
                  </h3>
                  <p className="mb-3">
                    As the official recruitment partner for major cruise lines, we provide end-to-end recruitment
                    solutions for all positions aboard cruise ships. Our services include:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400 flex-shrink-0 mt-0.5" />
                      <span>Exclusive job listings from partner cruise lines</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400 flex-shrink-0 mt-0.5" />
                      <span>Personalized career guidance and interview preparation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400 flex-shrink-0 mt-0.5" />
                      <span>Documentation and certification assistance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400 flex-shrink-0 mt-0.5" />
                      <span>Ongoing support throughout your contract</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center text-foreground">
                    <Ticket className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400" />
                    Cruise Ticket Sales
                  </h3>
                  <p className="mb-3">
                    As an authorized ticket provider, we offer exclusive cruise packages with special benefits:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400 flex-shrink-0 mt-0.5" />
                      <span>Discounted rates not available to the general public</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400 flex-shrink-0 mt-0.5" />
                      <span>Flexible booking options and payment plans</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400 flex-shrink-0 mt-0.5" />
                      <span>Complimentary cabin upgrades when available</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400 flex-shrink-0 mt-0.5" />
                      <span>24/7 customer support before and during your cruise</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center text-foreground">
                    <CreditCard className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400" />
                    Marketing & Booking Management
                  </h3>
                  <p className="mb-3">
                    We provide comprehensive marketing and booking management services for our partner cruise lines:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400 flex-shrink-0 mt-0.5" />
                      <span>Strategic marketing campaigns to promote cruise packages</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400 flex-shrink-0 mt-0.5" />
                      <span>Efficient booking management systems</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400 flex-shrink-0 mt-0.5" />
                      <span>Customer relationship management throughout the booking process</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-ocean-600 dark:text-ocean-400 flex-shrink-0 mt-0.5" />
                      <span>Data analytics and reporting on booking trends and customer preferences</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Official Partners Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-ocean-100 text-ocean-700 hover:bg-ocean-200 dark:bg-ocean-900/50 dark:text-ocean-300 dark:hover:bg-ocean-900/70">
                Official Partnerships
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Our Exclusive Cruise Line Partners</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We are proud to be the exclusive recruitment partner and authorized ticket provider for these leading
                cruise lines
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
              {partnerLogos.map((partner) => (
                <div key={partner.name} className="flex flex-col items-center">
                  <div className="relative h-24 w-48 bg-white dark:bg-ocean-950/30 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 mb-3">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <p className="text-sm font-medium text-center">{partner.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-ocean-50 dark:bg-ocean-950/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Exclusive Partnership Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Ship className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Direct Access to Job Openings</p>
                    <p className="text-sm text-muted-foreground">
                      Exclusive positions not available through other agencies
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Ticket className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Special Cruise Packages</p>
                    <p className="text-sm text-muted-foreground">Discounted rates and cabin upgrades for our clients</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Briefcase className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Expedited Application Process</p>
                    <p className="text-sm text-muted-foreground">
                      Faster review and interview scheduling for candidates
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Handshake className="h-5 w-5 text-ocean-600 dark:text-ocean-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Official Partnership Status</p>
                    <p className="text-sm text-muted-foreground">Legally authorized to recruit and sell tickets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-ocean-100 text-ocean-700 hover:bg-ocean-200 dark:bg-ocean-900/50 dark:text-ocean-300 dark:hover:bg-ocean-900/70">
                Accreditations
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Our Certifications & Accreditations
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Caribbean Cruises maintains the highest standards in the industry through official certifications and
                memberships
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center p-4 bg-white dark:bg-ocean-950/30 rounded-lg shadow-sm"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 bg-white rounded-md overflow-hidden">
                    <Image src={cert.logo || "/placeholder.svg"} alt={cert.name} fill className="object-contain p-1" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-ocean-50 dark:bg-ocean-950/20 p-6 rounded-lg">
              <div className="flex items-start">
                <FileText className="h-6 w-6 text-ocean-600 dark:text-ocean-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Official Registration Information</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      <strong>Company Name:</strong> Caribbean Cruises Ltd.
                    </li>
                    <li>
                      <strong>Document Number:</strong> P07000028143
                    </li>
                    <li>
                      <strong>Federal Employer Identification Number (FEI/EIN):</strong> 20-8572085
                    </li>
                    <li>
                      <strong>Recruitment Agency License No:</strong> 20-8572085
                    </li>
                    <li>
                      <strong>Travel Agency License No:</strong> ST-32452
                    </li>
                    <li>
                      <strong>Registered Address:</strong> Port Everglades Terminal, Fort Lauderdale, Florida 33316, USA
                    </li>
                    <li>
                      <strong>Website:</strong>{" "}
                      <a
                        href="https://www.caribbeancruises.site"
                        className="text-ocean-600 dark:text-ocean-400 hover:underline"
                      >
                        www.caribbeancruises.site
                      </a>
                    </li>
                    <li>
                      <strong>Phone:</strong> +1 (216) 777-7288
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Our Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The evolution of Caribbean Cruises from a small recruitment agency to the industry leader
              </p>
            </div>

            <div className="relative border-l border-ocean-200 dark:border-ocean-800 ml-6 md:ml-0 md:mx-auto md:max-w-3xl pl-6 space-y-12">
              {timeline.map((event, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-ocean-100 dark:bg-ocean-900 border-2 border-ocean-600 dark:border-ocean-400 flex items-center justify-center">
                    <span className="text-xs font-bold text-ocean-800 dark:text-ocean-300">
                      {event.year.substring(2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{event.year}</p>
                    <p className="text-sm">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do at Caribbean Cruises
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-md bg-ocean-50 dark:bg-ocean-900/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-ocean-100 dark:bg-ocean-800/50 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Passion</h3>
                  <p className="text-sm text-muted-foreground">
                    We are passionate about connecting people with life-changing career opportunities and unforgettable
                    cruise experiences.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-ocean-50 dark:bg-ocean-900/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-ocean-100 dark:bg-ocean-800/50 flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Global Perspective</h3>
                  <p className="text-sm text-muted-foreground">
                    We embrace diversity and celebrate the international nature of the cruise industry, serving clients
                    from around the world.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-ocean-50 dark:bg-ocean-900/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-ocean-100 dark:bg-ocean-800/50 flex items-center justify-center mx-auto mb-4">
                    <Ship className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Excellence</h3>
                  <p className="text-sm text-muted-foreground">
                    We are committed to excellence in every aspect of our services, from recruitment to customer
                    support.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-ocean-50 dark:bg-ocean-900/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-ocean-100 dark:bg-ocean-800/50 flex items-center justify-center mx-auto mb-4">
                    <Handshake className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Integrity</h3>
                  <p className="text-sm text-muted-foreground">
                    We operate with transparency and honesty in all our interactions with candidates, clients, and
                    cruise lines.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Leadership Team Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Our Leadership Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Meet the experienced professionals who guide our company
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <Image src="/placeholder.svg?height=96&width=96" alt="CEO Portrait" fill className="object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Michael Thompson</h3>
                  <p className="text-sm text-ocean-600 dark:text-ocean-400 mb-3">Chief Executive Officer</p>
                  <p className="text-sm text-muted-foreground">
                    Former Cruise Director with over 20 years of experience in the cruise industry. Founded Caribbean
                    Cruises in 2010.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <Image src="/placeholder.svg?height=96&width=96" alt="COO Portrait" fill className="object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Sophia Martinez</h3>
                  <p className="text-sm text-ocean-600 dark:text-ocean-400 mb-3">Chief Operations Officer</p>
                  <p className="text-sm text-muted-foreground">
                    Former HR Director for a major cruise line with expertise in maritime recruitment and operations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <Image src="/placeholder.svg?height=96&width=96" alt="CMO Portrait" fill className="object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">David Chen</h3>
                  <p className="text-sm text-ocean-600 dark:text-ocean-400 mb-3">Chief Marketing Officer</p>
                  <p className="text-sm text-muted-foreground">
                    Marketing executive with extensive experience in the travel and hospitality industry.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Legal Information Section */}
          <div className="mb-16 bg-ocean-50 dark:bg-ocean-950/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Legal Information</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong>Caribbean Cruises Ltd.</strong> is a registered company (Document No. P07000028143) with
                headquarters in Port Everglades Terminal, Fort Lauderdale, Florida 33316, USA. We are licensed and
                bonded as a recruitment agency (License No. 20-8572085) and travel agency (License No. ST-32452).
              </p>
              <p>
                We are an official recruitment partner for multiple cruise lines, authorized to recruit and place
                candidates in various positions aboard their vessels. Our recruitment practices comply with the Maritime
                Labour Convention (MLC 2006) and all relevant international maritime regulations.
              </p>
              <p>
                As an authorized ticket provider, we are licensed to sell cruise packages on behalf of our partner
                cruise lines. All bookings are subject to the terms and conditions of the respective cruise line, and
                passengers are protected by relevant consumer protection laws.
              </p>
              <p>
                Caribbean Cruises maintains professional liability insurance and adheres to strict data protection
                policies in compliance with relevant privacy laws. For more information about our legal status or to
                verify our credentials, please contact our legal department at{" "}
                <a
                  href="mailto:legal@caribbeancruises.site"
                  className="text-ocean-600 dark:text-ocean-400 hover:underline"
                >
                  legal@caribbeancruises.site
                </a>{" "}
                or by phone at +1 (216) 777-7288.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link href="/privacy-policy" className="text-ocean-600 dark:text-ocean-400 hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="text-ocean-600 dark:text-ocean-400 hover:underline">
                  Terms of Service
                </Link>
                <Link href="/cookies-policy" className="text-ocean-600 dark:text-ocean-400 hover:underline">
                  Cookies Policy
                </Link>
                <Link href="/disclaimer" className="text-ocean-600 dark:text-ocean-400 hover:underline">
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-522033573-612x612.jpg-94FZLoMUwaC4c55oNXaI1g41xABzEw.jpeg"
                alt="Cruise ship deck with lounge chairs"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/90 to-cruise-900/80" />
            </div>

            <div className="relative z-10 px-6 py-12 md:py-16 md:px-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Ready to Start Your Journey?</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-8">
                Whether you're an experienced professional looking for a change of scenery, a newcomer eager to embark
                on an exciting career path, or a traveler planning your next vacation, Caribbean Cruises is your gateway
                to extraordinary opportunities on the high seas.
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
      <Footer />
    </div>
  )
}
