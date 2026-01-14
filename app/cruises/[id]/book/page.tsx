"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button" // Fixed import
import { EmailContactModal } from "@/components/email-contact-modal"

const cruiseData = {
  "carnival-paradise": "Carnival Paradise",
  "royal-caribbean-oasis": "Royal Caribbean Oasis of the Seas",
  "norwegian-escape": "Norwegian Escape",
  "celebrity-edge": "Celebrity Edge",
  "msc-seaside": "MSC Seaside",
  "disney-dream": "Disney Dream",
}

export default function BookingPage() {
  const { id } = useParams()
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(true)

  const cruiseId = Array.isArray(id) ? id[0] : id
  const cruiseName = cruiseData[cruiseId as keyof typeof cruiseData] || "Unknown Cruise"

  const handleCloseModal = () => {
    setModalOpen(false)
    router.push("/cruises")
  }

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Book {cruiseName}</h1>
      <p className="mb-8">Please contact us via email to book this cruise.</p>

      <Button onClick={() => setModalOpen(true)}>Contact for Booking</Button>

      <EmailContactModal isOpen={modalOpen} onClose={handleCloseModal} subject={`Booking Inquiry for ${cruiseName}`} />
    </div>
  )
}
