"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createCruiseBookingPayment } from "@/app/actions/payments"
import { EmailContactModal } from "@/components/email-contact-modal"

interface Cruise {
  id: number
  title: string
  cruiseLine: string
  ship: string
  departure: string
  date: string
  duration: string
  destinations: string
  cabinTypes: Array<{
    type: string
    description: string
    price: string
    numPrice: number
  }>
}

export default function BookingForm({ cruise }: { cruise: Cruise }) {
  const [amount, setAmount] = useState(cruise.cabinTypes[0].numPrice)

  const handleCabinChange = (cabinType: string) => {
    const cabin = cruise.cabinTypes.find((c) => c.type === cabinType)
    if (cabin) {
      setAmount(cabin.numPrice)
    }
  }

  return (
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
                onChange={() => handleCabinChange(cabin.type)}
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

      <input type="hidden" name="amount" value={amount} />

      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1 bg-ocean-600 hover:bg-ocean-700">
          <CreditCard className="mr-2 h-4 w-4" />
          Pay & Book Now
        </Button>

        <EmailContactModal
          trigger={
            <Button type="button" variant="outline" className="flex-1 bg-transparent">
              <Mail className="mr-2 h-4 w-4" />
              Email Inquiry
            </Button>
          }
          subject={`Cruise Booking Inquiry - ${cruise.title}`}
        />
      </div>
    </form>
  )
}
