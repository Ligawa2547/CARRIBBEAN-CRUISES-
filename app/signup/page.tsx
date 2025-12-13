"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Anchor, Mail, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"
import { createBrowserClient, directSignup } from "@/lib/supabase-browser"
import FallbackSignup from "./fallback"

export default function SignupPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const [showFallback, setShowFallback] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null)
  const { signUp } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setDebugInfo(null)

    // Get returnUrl from query parameters if it exists
    const searchParams = new URLSearchParams(window.location.search)
    const returnUrl = searchParams.get("returnUrl")

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      // Try direct signup first to bypass potential auth context issues
      console.log("Attempting direct signup with email:", email)
      const directResult = await directSignup(email, password)

      if (directResult.error) {
        console.error("Direct signup failed, trying context signup:", directResult.error)
        setDebugInfo(`Direct signup error: ${JSON.stringify(directResult.error)}`)

        // Fall back to context signup
        const { error, success, message } = await signUp(email, password)

        if (error) {
          console.error("Context signup also failed:", error)
          setDebugInfo(`Context signup error: ${JSON.stringify(error)}`)

          toast({
            title: "Signup failed",
            description: error.message || "Please check your information and try again.",
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }

        // Handle context signup: prefer returned message, but handle generic success cases too
        if (message) {
          // Show success/notice inline and redirect to login with message for the login page
          if (success) {
            router.push(
              `/login?message=${encodeURIComponent(
                message,
              )}&email=${encodeURIComponent(email)}`,
            )
            return
          }

          toast({
            title: success ? "Signup successful" : "Signup notice",
            description: message,
            variant: success ? "default" : "destructive",
          })

          setSuccessMessage(message)
          setConfirmationEmail(email)
          setIsLoading(false)
          return
        }
        if (success && !message) {
          const fallbackMessage = "Signup successful. Please check your email to verify your account before logging in."
          router.push(`/login?message=${encodeURIComponent(fallbackMessage)}&email=${encodeURIComponent(email)}`)
          return
        }
      } else {
        // Direct signup succeeded
        console.log("Direct signup successful:", directResult.data)

        // Get the user data
        const userData = directResult.data?.user

        if (!userData) {
          const message = "Verification email sent. Please check your email to verify your account before logging in."
          toast({
            title: "Verification email sent",
            description: message,
          })
          // Do not redirect immediately — show the message inline and provide a go-to-login action.
          setSuccessMessage(message)
          setConfirmationEmail(email)
          setIsLoading(false)
          return
        }

        // Update user profile with full name
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: userData.id,
          full_name: fullName,
          email: email,
          updated_at: new Date().toISOString(),
        })

        if (profileError) {
          console.error("Error updating profile:", profileError)
          setDebugInfo(`Error updating profile: ${profileError.message}`)
          toast({
            title: "Account created",
            description:
              "Your account was created, but we couldn't update your profile. You can update it later in settings.",
          })
          } else {
          console.log("Profile updated successfully")
          toast({
            title: "Signup successful",
            description: "Your account has been created successfully.",
          })
        }

        // Redirect to returnUrl if it exists, otherwise to login with success message
        console.log("Redirecting to:", returnUrl || "/login")
        const successMsg = "Signup successful. You can sign in to your account."
        router.push(
          returnUrl || `/login?message=${encodeURIComponent(successMsg)}&email=${encodeURIComponent(email)}`,
        )
        return
      }
    } catch (error: any) {
      console.error("Unexpected error during signup:", error)
      setDebugInfo(`Unexpected error: ${error?.message || JSON.stringify(error)}`)
      toast({
        title: "Signup failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resendVerification = async () => {
    if (!confirmationEmail) return
    setIsLoading(true)
    try {
      const res = await fetch("/api/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: confirmationEmail }),
      })

      const result = await res.json()
      if (!res.ok || !result.success) {
        toast({ title: "Resend failed", description: result?.message || "Unable to resend verification", variant: "destructive" })
      } else {
        toast({ title: "Verification resent", description: `Verification email resent to ${confirmationEmail}` })
      }
    } catch (error) {
      toast({ title: "Resend failed", description: "Unexpected error while resending verification", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  if (showFallback) {
    return (
      <div className="min-h-screen pt-20 pb-10 flex flex-col items-center justify-center bg-gradient-to-b from-ocean-50 to-cruise-50/30 dark:from-ocean-950 dark:to-cruise-950/30 px-4">
        <FallbackSignup />
        <Button variant="link" className="mt-4" onClick={() => setShowFallback(false)}>
          Back to regular signup
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-10 flex items-center justify-center bg-gradient-to-b from-ocean-50 to-cruise-50/30 dark:from-ocean-950 dark:to-cruise-950/30 px-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Anchor className="h-10 w-10 text-ocean-600 dark:text-ocean-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-ocean-950 dark:text-white">Create an Account</CardTitle>
          <CardDescription>Sign up to apply for jobs and track your applications</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300 flex items-start">
                <div className="flex-1">
                  <p className="font-medium">{successMessage}</p>
                  {confirmationEmail && <p className="text-xs">We sent this to: {confirmationEmail}</p>}
                </div>
                <div className="flex flex-col gap-2 ml-3">
                  <Button variant="outline" size="sm" onClick={() => router.push(`/login?message=${encodeURIComponent(successMessage)}&email=${encodeURIComponent(confirmationEmail || "")}`)}>
                    Go to Login
                  </Button>
                  <Button variant="ghost" size="sm" onClick={resendVerification} disabled={isLoading}>
                    Resend verification
                  </Button>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="pl-9"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Password must be at least 8 characters long</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-ocean-600 hover:bg-ocean-700" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            {debugInfo && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-800">
                <p className="font-semibold">Debug Information:</p>
                <p className="font-mono break-all">{debugInfo}</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => setShowFallback(true)}>
                  Try Fallback Signup
                </Button>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-ocean-600 hover:text-ocean-700 dark:text-ocean-400 dark:hover:text-ocean-300 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
