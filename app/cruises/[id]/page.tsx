"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button" // Fixed import
import { EmailContactModal } from "@/components/email-contact-modal"

const cruiseData = {
  "carnival-paradise": {
    title: "Carnival Paradise",
    description: "Experience the ultimate Caribbean adventure with Carnival Cruise Line.",
    longDescription:
      "The Carnival Paradise offers everything you need for a perfect vacation at sea. With multiple dining options, exciting entertainment venues, and activities for all ages, this ship delivers the fun you'd expect from Carnival. Enjoy the waterslides, mini-golf, and numerous pools during the day, and fantastic shows, casinos, and nightclubs in the evening.",
    image: "/images/partner-carnival.png",
    price: "$599",
    duration: "7 nights",
    destination: "Eastern Caribbean",
    departure: "Miami, Florida",
    amenities: ["Multiple Pools", "Waterslides", "Casino", "Spa", "Kids Club", "24-Hour Room Service"],
  },
  "royal-caribbean-oasis": {
    title: "Royal Caribbean Oasis of the Seas",
    description: "Discover amazing amenities and entertainment on this spectacular vessel.",
    longDescription:
      "The Oasis of the Seas is one of Royal Caribbean's most innovative ships, featuring seven distinct neighborhoods, each with its own unique experiences. From the lush Central Park with over 10,000 plants to the exciting Boardwalk with a full-sized carousel, this ship redefines cruising. Experience thrilling activities like zip lining, surfing simulators, and rock climbing walls.",
    image: "/images/partner-royal-caribbean.png",
    price: "$799",
    duration: "7 nights",
    destination: "Western Caribbean",
    departure: "Port Canaveral, Florida",
    amenities: [
      "FlowRider Surf Simulator",
      "Zip Line",
      "Ice Skating Rink",
      "Central Park",
      "AquaTheater",
      "Rock Climbing Wall",
    ],
  },
  "norwegian-escape": {
    title: "Norwegian Escape",
    description: "Feel free to explore the Caribbean with Norwegian Cruise Line.",
    longDescription:
      "The Norwegian Escape embodies the freedom and flexibility that Norwegian Cruise Line is known for. With no fixed dining times or pre-assigned seating, you can enjoy your vacation on your terms. The ship features over 25 dining options, award-winning entertainment including Broadway shows, and the largest ropes course at sea. The exclusive Haven area offers a luxury ship-within-a-ship experience.",
    image: "/images/partner-norwegian.png",
    price: "$699",
    duration: "7 nights",
    destination: "Southern Caribbean",
    departure: "San Juan, Puerto Rico",
    amenities: ["Aqua Park", "Ropes Course", "Broadway Entertainment", "The Haven", "Mandara Spa", "Specialty Dining"],
  },
  "celebrity-edge": {
    title: "Celebrity Edge",
    description: "Experience modern luxury with Celebrity Cruises.",
    longDescription:
      "The Celebrity Edge is a revolutionary ship that leaves the future behind. Its innovative outward-facing design breaks from traditional ship design, connecting you to the sea like never before. The Magic Carpet, a cantilevered floating platform, reaches heights of 13 stories above sea level and transforms into different venues depending on its position. Enjoy globally-inspired cuisine from Michelin-starred chefs and cutting-edge entertainment.",
    image: "/images/partner-celebrity.png",
    price: "$899",
    duration: "7 nights",
    destination: "Bahamas",
    departure: "Fort Lauderdale, Florida",
    amenities: ["Magic Carpet", "Infinite Verandas", "Rooftop Garden", "Eden", "Fine Dining", "The Retreat"],
  },
  "msc-seaside": {
    title: "MSC Seaside",
    description: "Discover the MSC Seaside, the ship that follows the sun.",
    longDescription:
      "The MSC Seaside was specifically designed to bring guests closer to the sea. With its unique waterfront boardwalk circling the ship, panoramic glass elevators, and glass-floored catwalks, you'll enjoy unprecedented ocean views. The ship features one of the largest and most interactive water parks at sea, a full-sized bowling alley, and authentic Mediterranean cuisine. MSC's famous Yacht Club offers exclusive luxury accommodations and services.",
    image: "/images/partner-msc.png",
    price: "$649",
    duration: "7 nights",
    destination: "Caribbean & Antilles",
    departure: "Miami, Florida",
    amenities: [
      "Waterfront Boardwalk",
      "Aqua Park",
      "Zip Line",
      "Formula 1 Simulator",
      "Bowling Alley",
      "MSC Yacht Club",
    ],
  },
  "disney-dream": {
    title: "Disney Dream",
    description: "Create magical memories with Disney Cruise Line.",
    longDescription:
      "The Disney Dream brings Disney magic to life on the high seas. With areas designed for families, kids, and adults, everyone will find their happy place. Meet Disney characters, watch Broadway-quality shows featuring Disney stories, and experience the AquaDuck, a thrilling water coaster that wraps around the ship. Adults can enjoy exclusive pools, dining, and nightlife while kids have supervised activities in age-appropriate clubs.",
    image: "/images/partner-disney.png",
    price: "$999",
    duration: "5 nights",
    destination: "Bahamas",
    departure: "Port Canaveral, Florida",
    amenities: [
      "AquaDuck Water Coaster",
      "Character Experiences",
      "Broadway-Style Shows",
      "Kids Clubs",
      "Adult-Only Areas",
      "Rotational Dining",
    ],
  },
}

export default function CruiseDetailPage() {
  const { id } = useParams()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSubject, setModalSubject] = useState("")

  const cruiseId = Array.isArray(id) ? id[0] : id
  const cruise = cruiseData[cruiseId as keyof typeof cruiseData]

  if (!cruise) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Cruise Not Found</h1>
        <p className="mb-8">Sorry, we couldn't find the cruise you're looking for.</p>
        <Button href="/cruises">Back to Cruises</Button>
      </div>
    )
  }

  const handleContactRequest = (type: "demo" | "booking") => {
    setModalSubject(`${type === "demo" ? "Demo Request" : "Booking Inquiry"} for ${cruise.title}`)
    setModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="h-64 relative mb-6">
              <Image
                src={cruise.image || "/placeholder.svg"}
                alt={cruise.title}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-4">Cruise Details</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Price from:</span> {cruise.price}
                </p>
                <p>
                  <span className="font-medium">Duration:</span> {cruise.duration}
                </p>
                <p>
                  <span className="font-medium">Destination:</span> {cruise.destination}
                </p>
                <p>
                  <span className="font-medium">Departure:</span> {cruise.departure}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button variant="outline" className="w-full" onClick={() => handleContactRequest("demo")}>
                Request Demo
              </Button>
              <Button className="w-full" onClick={() => handleContactRequest("booking")}>
                Book Now
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{cruise.title}</h1>
          <p className="text-lg mb-6">{cruise.description}</p>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="mb-4">{cruise.longDescription}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {cruise.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <EmailContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} subject={modalSubject} />
    </div>
  )
}
