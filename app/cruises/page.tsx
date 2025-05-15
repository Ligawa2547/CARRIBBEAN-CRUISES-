"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button" // Fixed import
import { EmailContactModal } from "@/components/email-contact-modal"

const cruises = [
  {
    id: "carnival-paradise",
    title: "Carnival Paradise",
    description: "Experience the ultimate Caribbean adventure with Carnival Cruise Line.",
    image: "/images/partner-carnival.png",
    price: "$599",
    duration: "7 nights",
    destination: "Eastern Caribbean",
  },
  {
    id: "royal-caribbean-oasis",
    title: "Royal Caribbean Oasis of the Seas",
    description: "Discover amazing amenities and entertainment on this spectacular vessel.",
    image: "/images/partner-royal-caribbean.png",
    price: "$799",
    duration: "7 nights",
    destination: "Western Caribbean",
  },
  {
    id: "norwegian-escape",
    title: "Norwegian Escape",
    description: "Feel free to explore the Caribbean with Norwegian Cruise Line.",
    image: "/images/partner-norwegian.png",
    price: "$699",
    duration: "7 nights",
    destination: "Southern Caribbean",
  },
  {
    id: "celebrity-edge",
    title: "Celebrity Edge",
    description: "Experience modern luxury with Celebrity Cruises.",
    image: "/images/partner-celebrity.png",
    price: "$899",
    duration: "7 nights",
    destination: "Bahamas",
  },
  {
    id: "msc-seaside",
    title: "MSC Seaside",
    description: "Discover the MSC Seaside, the ship that follows the sun.",
    image: "/images/partner-msc.png",
    price: "$649",
    duration: "7 nights",
    destination: "Caribbean & Antilles",
  },
  {
    id: "disney-dream",
    title: "Disney Dream",
    description: "Create magical memories with Disney Cruise Line.",
    image: "/images/partner-disney.png",
    price: "$999",
    duration: "5 nights",
    destination: "Bahamas",
  },
]

export default function CruisesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSubject, setModalSubject] = useState("")

  const handleContactRequest = (cruise: string, type: "demo" | "booking") => {
    setModalSubject(`${type === "demo" ? "Demo Request" : "Booking Inquiry"} for ${cruise}`)
    setModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Available Cruises</h1>
      <p className="text-center mb-12 max-w-2xl mx-auto">
        Explore our partner cruise lines and their amazing vessels. Whether you're looking for adventure, relaxation, or
        entertainment, we have the perfect cruise for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cruises.map((cruise) => (
          <Card key={cruise.id} className="flex flex-col h-full">
            <CardHeader>
              <div className="h-40 relative mb-4">
                <Image
                  src={cruise.image || "/placeholder.svg"}
                  alt={cruise.title}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <CardTitle>{cruise.title}</CardTitle>
              <CardDescription>{cruise.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm font-medium">Price from</p>
                  <p className="text-xl font-bold">{cruise.price}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p>{cruise.duration}</p>
                </div>
              </div>
              <p>
                <span className="font-medium">Destination:</span> {cruise.destination}
              </p>
            </CardContent>
            <CardFooter className="mt-auto pt-4">
              <div className="flex flex-col sm:flex-row w-full gap-2">
                <Button variant="outline" className="flex-1" onClick={() => handleContactRequest(cruise.title, "demo")}>
                  Request Demo
                </Button>
                <Button className="flex-1" onClick={() => handleContactRequest(cruise.title, "booking")}>
                  Book Now
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <EmailContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} subject={modalSubject} />
    </div>
  )
}
