"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading")
  const [paymentDetails, setPaymentDetails] = useState<any>(null)

  const type = searchParams.get("type")
  const reference = searchParams.get("ref")
  const orderTrackingId = searchParams.get("OrderTrackingId")

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderTrackingId || !reference) {
        setStatus("failed")
        return
      }

      try {
        const response = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderTrackingId,
            reference,
            type,
          }),
        })

        const result = await response.json()

        if (result.success) {
          setStatus("success")
          setPaymentDetails(result.payment)
        } else {
          setStatus("failed")
        }
      } catch (error) {
        console.error("Payment verification error:", error)
        setStatus("failed")
      }
    }

    verifyPayment()
  }, [orderTrackingId, reference, type])

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-12 w-12 animate-spin text-ocean-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
            <p className="text-muted-foreground text-center">Please wait while we confirm your payment...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === "success") {
    return (
      <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">Your payment has been processed successfully.</p>

            {paymentDetails && (
              <div className="bg-muted p-4 rounded-lg text-left">
                <h3 className="font-semibold mb-2">Payment Details:</h3>
                <p>
                  <strong>Reference:</strong> {paymentDetails.merchant_reference}
                </p>
                <p>
                  <strong>Amount:</strong> ${paymentDetails.amount}
                </p>
                <p>
                  <strong>Type:</strong> {type === "cruise" ? "Cruise Booking" : "Meal Order"}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">A confirmation email has been sent to your email address.</p>

              <div className="flex gap-2">
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
                <Link href={type === "cruise" ? "/cruises" : "/menu"} className="flex-1">
                  <Button className="w-full bg-ocean-600 hover:bg-ocean-700">
                    {type === "cruise" ? "View Cruises" : "View Menu"}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <CardTitle className="text-2xl text-red-600">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            We couldn't process your payment. Please try again or contact support.
          </p>

          <div className="flex gap-2">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
            <Link href={type === "cruise" ? "/cruises" : "/menu"} className="flex-1">
              <Button className="w-full bg-ocean-600 hover:bg-ocean-700">Try Again</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
