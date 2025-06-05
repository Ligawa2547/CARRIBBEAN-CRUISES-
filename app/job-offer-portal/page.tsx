"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function JobOfferPortal() {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    startDate: "",
    additionalInfo: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/job-offer-portal")
    }
  }, [user, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitStatus("success")
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-muted-foreground mb-4">Please log in to access the job offer portal.</p>
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 to-cruise-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Offer Document Portal</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to your secure document submission portal. Please upload your signed job offer letter, direct
            deposit authorization form, contract, and any other relevant documents.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Document Upload Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-ocean-600" />
                Document Upload
              </CardTitle>
              <CardDescription>Upload your signed documents securely</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Required Documents List */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Required Documents:</h3>
                <div className="space-y-3">
                  {[
                    "Signed Job Offer Letter",
                    "Direct Deposit Authorization Form",
                    "Employment Contract",
                    "Passport/ID Copy",
                    "Medical Certificate",
                    "STCW Certificate (if applicable)",
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{doc}</span>
                      <Button size="sm" variant="outline" className="ml-auto">
                        Upload
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Please provide your details for document verification</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position Applied For</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Enter the position"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Expected Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Any additional information or comments"
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-ocean-600 to-cruise-600 hover:from-ocean-700 hover:to-cruise-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Documents"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <Card className="mt-8 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Documents submitted successfully!</span>
              </div>
              <p className="text-green-700 mt-2">
                Your documents have been received and are being processed. You will receive a confirmation email
                shortly.
              </p>
            </CardContent>
          </Card>
        )}

        {submitStatus === "error" && (
          <Card className="mt-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="h-5 w-5" />
                <span className="font-semibold">Submission failed</span>
              </div>
              <p className="text-red-700 mt-2">
                There was an error submitting your documents. Please try again or contact support.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-blue-800 mb-4">
              If you encounter any issues uploading your documents or have questions about the process, please don't
              hesitate to contact our HR team.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                Contact HR Support
              </Button>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                Download Forms
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
