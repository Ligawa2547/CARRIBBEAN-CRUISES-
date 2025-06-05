"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CreditCard, Mail } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createCruiseBookingPayment } from "@/app/actions/payments"
import { EmailContactModal } from "@/components/email-contact-modal"
import Footer from "@/components/footer"
import { notFound } from "next/navigation"

// Cruise packages data
const cruisePackages = [
  {
    id: 1,
    title: "Caribbean Paradise",
    cruiseLine: "Carnival Cruise Line",
    ship: "Carnival Paradise",
    departure: "Miami, FL",
    date: "March 15, 2024",
    duration: "7 Days",
    destinations: "Cozumel, Jamaica, Grand Cayman",
    cabinTypes: [
      { type: "Interior", description: "Cozy interior cabin", price: "$899", numPrice: 899 },
      { type: "Ocean View", description: "Cabin with ocean view", price: "$1,199", numPrice: 1199 },
      { type: "Balcony", description: "Private balcony cabin", price: "$1,599", numPrice: 1599 },
      { type: "Suite", description: "Luxury suite with amenities", price: "$2,299", numPrice: 2299 },
    ],
  },
  // Add more cruise packages as needed
]

export default function BookingPage({ params }: { params: { id: string } }) {
  const [modalOpen, setModalOpen] = useState(false)
  const cruiseId = Number(params.id)
  const cruise = cruisePackages.find((cruise) => cruise.id === cruiseId)
  const router = useRouter()

  if (!cruise) {
    return notFound()
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    // router.push("/cruises") // Removed as per updates
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-ocean-50 to-cruise-50/30 dark:from-ocean-950 dark:to-cruise-950/30">
      <div className="container py-12 px-4 md:px-6">
        <Link
          href={`/cruises/${cruiseId}`}
          className="inline-flex items-center text-sm font-medium text-ocean-600 dark:text-ocean-400 hover:text-ocean-800 dark:hover:text-ocean-300 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cruise Details
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Book Your Cruise</h1>

            <Card className="mb-8 border-0 shadow-md">
              <CardHeader>
                <CardTitle>Cruise Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">{cruise.title}</h2>
                    <p className="text-muted-foreground">
                      {cruise.cruiseLine} - {cruise.ship}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Departure</p>
                      <p className="text-muted-foreground">{cruise.departure}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Date</p>
                      <p className="text-muted-foreground">{cruise.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-muted-foreground">{cruise.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Destinations</p>
                      <p className="text-muted-foreground">{cruise.destinations}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Booking & Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form action={createCruiseBookingPayment} className="space-y-6">
                  <input type="hidden" name="cruiseId" value={cruise.id} />
                  <input type="hidden" name="cruiseName" value={cruise.title} />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" name="firstName" required placeholder="Enter your first name" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" name="lastName" required placeholder="Enter your last name" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" name="email" type="email" required placeholder="Enter your email" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input id="phone" name="phone" required placeholder="Enter your phone number" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Cabin Selection</h3>

                    <div className="space-y-3">
                      {cruise.cabinTypes.map((cabin) => (
                        <div key={cabin.type} className="flex items-center space-x-3 p-3 border rounded-md">
                          <input
                            type="radio"
                            id={cabin.type}
                            name="cabinType"
                            value={cabin.type}
                            className="h-4 w-4 text-ocean-600"
                            required
                            onChange={(e) => {
                              const amountInput = document.getElementById("amount") as HTMLInputElement
                              if (amountInput) {
                                amountInput.value = cabin.numPrice.toString()
                              }
                            }}
                          />
                          <label htmlFor={cabin.type} className="flex-grow">
                            <div className="font-medium">{cabin.type}</div>
                            <div className="text-sm text-muted-foreground">{cabin.description}</div>
                          </label>
                          <div className="text-ocean-600 dark:text-ocean-400 font-medium">{cabin.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Booking Details</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="passengers">Number of Passengers</Label>
                        <Select name="passengers" defaultValue="1">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Passenger</SelectItem>
                            <SelectItem value="2">2 Passengers</SelectItem>
                            <SelectItem value="3">3 Passengers</SelectItem>
                            <SelectItem value="4">4 Passengers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        name="specialRequests"
                        placeholder="Any special requests or dietary requirements"
                        className="h-24"
                      />
                    </div>
                  </div>

                  <input type="hidden" id="amount" name="amount" value="899" />

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1 bg-ocean-600 hover:bg-ocean-700">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay & Book Now
                    </Button>

                    <EmailContactModal
                      trigger={
                        <Button type="button" variant="outline" className="flex-1">
                          <Mail className="mr-2 h-4 w-4" />
                          Email Inquiry
                        </Button>
                      }
                      subject={`Cruise Booking Inquiry - ${cruise.title}`}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-0 shadow-md sticky top-24">
              <CardHeader className="bg-gradient-to-r from-ocean-800 to-cruise-700 text-white">
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{cruise.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cruise.cruiseLine} - {cruise.ship}
                    </p>
                  </div>

                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Departure:</span>
                      <span className="font-medium">{cruise.departure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">{cruise.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{cruise.duration}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Selected Cabin:</span>
                        <span className="font-medium" id="selectedCabin">
                          Interior
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Passengers:</span>
                        <span className="font-medium">1</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-ocean-600 dark:text-ocean-400" id="totalPrice">
                        $899
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">* Secure payment processed by PesaPal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
