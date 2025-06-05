"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestPaymentPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testPesaPalConnection = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-pesapal")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Failed to test connection", details: error })
    } finally {
      setLoading(false)
    }
  }

  const testPaymentInitiation = async () => {
    setLoading(true)
    setResult(null)

    try {
      const testParams = new URLSearchParams({
        reference: `TEST_${Date.now()}`,
        amount: "100",
        email: "test@example.com",
        phone: "+254700000000",
        name: "Test User",
        type: "test",
        description: "Test payment",
      })

      const response = await fetch(`/api/initiate-payment?${testParams.toString()}`)

      if (response.redirected) {
        setResult({
          success: true,
          message: "Payment initiated successfully",
          redirectUrl: response.url,
        })
      } else {
        const data = await response.json()
        setResult(data)
      }
    } catch (error) {
      setResult({ error: "Failed to initiate payment", details: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Payment System Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button onClick={testPesaPalConnection} disabled={loading} className="w-full">
              {loading ? "Testing..." : "Test PesaPal Connection"}
            </Button>

            <Button onClick={testPaymentInitiation} disabled={loading} variant="outline" className="w-full">
              {loading ? "Testing..." : "Test Payment Initiation"}
            </Button>
          </div>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">Test Result:</h3>
              <pre className="text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
