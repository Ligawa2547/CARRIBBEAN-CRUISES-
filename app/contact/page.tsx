"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm, type ContactFormData } from "@/app/actions/contact"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({})

    try {
      const result = await submitContactForm(formData)

      setFormStatus({
        success: result.success,
        message: result.message,
      })

      if (result.success) {
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-6 md:py-10 px-4 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-indigo-950 dark:text-white">Contact Us</h1>
          <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300">
            Get in touch with our recruitment team
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          <Card className="border-0 shadow-md bg-white dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-indigo-950 dark:text-white">Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              {formStatus.success && (
                <div className="mb-6 p-4 rounded-md bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 border border-green-200 dark:border-green-800/30">
                  <p className="font-medium">{formStatus.message}</p>
                </div>
              )}

              {formStatus.success === false && (
                <div className="mb-6 p-4 rounded-md bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300 border border-red-200 dark:border-red-800/30">
                  <p className="font-medium">{formStatus.message}</p>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-indigo-950 dark:text-white">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-indigo-950 dark:text-white">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-indigo-950 dark:text-white">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-indigo-950 dark:text-white">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    className="min-h-[120px] md:min-h-[150px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-0 shadow-md bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-indigo-950 dark:text-white">Contact Information</CardTitle>
                <CardDescription>Reach out to us through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h3 className="font-medium text-indigo-950 dark:text-white">Address</h3>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                      7665 Corporate Center Drive
                      <br />
                      Miami, Florida 33126
                      <br />
                      United States
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-3 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h3 className="font-medium text-indigo-950 dark:text-white">Phone</h3>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">+1 (289) 546-8195</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h3 className="font-medium text-indigo-950 dark:text-white">Email</h3>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">info@nclsail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="mr-3 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h3 className="font-medium text-indigo-950 dark:text-white">Website</h3>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">www.nclasail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-indigo-950 dark:text-white">Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="text-indigo-950 dark:text-white">Monday - Friday</span>
                    <span className="text-slate-600 dark:text-slate-300">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-950 dark:text-white">Saturday</span>
                    <span className="text-slate-600 dark:text-slate-300">10:00 AM - 2:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-950 dark:text-white">Sunday</span>
                    <span className="text-slate-600 dark:text-slate-300">Closed</span>
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
