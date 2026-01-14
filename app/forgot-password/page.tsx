"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Anchor, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createBrowserClient } from "@/lib/supabase-browser"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()
  const supabase = createBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Get the current URL to use as the base for the redirect
      const baseUrl = window.location.origin

      // Send the password reset email with the correct redirect URL
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${baseUrl}/auth/callback?type=recovery&source=email`,
      })

      if (error) {
        console.error("Password reset error:", error)
        toast({
          title: "Error",
          description: error.message || "Failed to send reset instructions. Please try again.",
          variant: "destructive",
        })
      } else {
        setIsSubmitted(true)
        toast({
          title: "Reset instructions sent",
          description: "If an account exists with that email, you will receive password reset instructions.",
        })
      }
    } catch (error: any) {
      console.error("Unexpected error during password reset:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-10 flex items-center justify-center bg-gradient-to-b from-ocean-50 to-cruise-50/30 dark:from-ocean-950 dark:to-cruise-950/30 px-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Anchor className="h-10 w-10 text-ocean-600 dark:text-ocean-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-ocean-950 dark:text-white">
            {isSubmitted ? "Check Your Email" : "Reset Your Password"}
          </CardTitle>
          <CardDescription>
            {isSubmitted
              ? "We've sent you instructions to reset your password"
              : "Enter your email and we'll send you instructions to reset your password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                If an account exists with the email <span className="font-medium">{email}</span>, you will receive
                password reset instructions shortly.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Please check your inbox and spam folder. The link in the email will expire in 24 hours.
              </p>
              <Button asChild className="mt-4 bg-ocean-600 hover:bg-ocean-700">
                <Link href="/login">Return to Login</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-ocean-600 hover:bg-ocean-700" disabled={isLoading}>
                {isLoading ? "Sending Instructions..." : "Send Reset Instructions"}
              </Button>
              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-ocean-600 hover:text-ocean-700 dark:text-ocean-400 dark:hover:text-ocean-300"
                >
                  <ArrowLeft className="inline-block mr-1 h-3 w-3" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
