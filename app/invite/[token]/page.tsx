"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Anchor, Mail, Lock, User, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createBrowserClient } from "@/lib/supabase-browser"

export default function InvitePage({ params }: { params: { token: string } }) {
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createBrowserClient()

  useEffect(() => {
    const verifyInviteToken = async () => {
      try {
        // In a real app, you would verify the token with your backend
        // For this example, we'll just simulate token verification
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: params.token,
          type: "invite",
        })

        if (error) {
          setError("Invalid or expired invitation link. Please contact the administrator.")
          return
        }

        // Set the email from the token verification
        if (data?.user?.email) {
          setEmail(data.user.email)
        } else {
          setError("Could not retrieve email from invitation. Please contact the administrator.")
        }
      } catch (err) {
        console.error("Error verifying invite token:", err)
        setError("An error occurred while verifying your invitation. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    verifyInviteToken()
  }, [params.token, supabase.auth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords don't match. Please try again.")
      setIsSubmitting(false)
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      setIsSubmitting(false)
      return
    }

    try {
      // In a real app, you would complete the invitation process
      // For this example, we'll simulate account creation
      const { error } = await supabase.auth.updateUser({
        password,
        data: {
          full_name: fullName,
        },
      })

      if (error) {
        console.error("Error completing invitation:", error)
        setError(error.message || "Failed to complete invitation. Please try again.")
        toast({
          title: "Error",
          description: error.message || "Failed to complete invitation. Please try again.",
          variant: "destructive",
        })
      } else {
        // Update the user profile
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: (await supabase.auth.getUser()).data.user?.id,
          full_name: fullName,
          email: email,
          updated_at: new Date().toISOString(),
        })

        if (profileError) {
          console.error("Error updating profile:", profileError)
        }

        setIsComplete(true)
        toast({
          title: "Invitation complete",
          description: "Your account has been set up successfully.",
        })
      }
    } catch (err) {
      console.error("Unexpected error during invitation completion:", err)
      setError("An unexpected error occurred. Please try again later.")
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-10 flex items-center justify-center bg-gradient-to-b from-ocean-50 to-cruise-50/30 dark:from-ocean-950 dark:to-cruise-950/30 px-4">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Anchor className="h-10 w-10 text-ocean-600 dark:text-ocean-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-ocean-950 dark:text-white">Verifying Invitation</CardTitle>
            <CardDescription>Please wait while we verify your invitation...</CardDescription>
          </CardHeader>
        </Card>
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
          <CardTitle className="text-2xl font-bold text-ocean-950 dark:text-white">
            {isComplete ? "Account Created" : "Complete Your Registration"}
          </CardTitle>
          <CardDescription>
            {isComplete
              ? "Your account has been set up successfully"
              : "Please provide your details to complete the registration process"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          {isComplete ? (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Your account has been set up successfully. You can now log in with your email and password.
              </p>
              <Button asChild className="mt-4 bg-ocean-600 hover:bg-ocean-700">
                <Link href="/login">Proceed to Login</Link>
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
                    value={email}
                    disabled
                    className="pl-9 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">This is the email you were invited with</p>
              </div>
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
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Password must be at least 8 characters long
                </p>
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
              <Button type="submit" className="w-full bg-ocean-600 hover:bg-ocean-700" disabled={isSubmitting}>
                {isSubmitting ? "Creating Account..." : "Complete Registration"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
