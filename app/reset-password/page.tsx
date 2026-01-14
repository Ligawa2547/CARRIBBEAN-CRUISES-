"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Anchor, Lock, ArrowLeft, CheckCircle, AlertCircle, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createBrowserClient } from "@/lib/supabase-browser"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [hasValidSession, setHasValidSession] = useState(false)
  const [isPasswordResetRequired, setIsPasswordResetRequired] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const supabase = createBrowserClient()

  // Check if we have a valid session for password reset
  useEffect(() => {
    async function checkSession() {
      try {
        setIsCheckingSession(true)

        // Check if this is from an email link
        const source = searchParams.get("source")
        const isFromEmail = source === "email"

        // Get the current session
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Error checking session:", error)
          setError("Unable to verify your session. Please try the reset link again.")
          setHasValidSession(false)
        } else if (data.session) {
          // We have a valid session
          setHasValidSession(true)

          // If coming from email link, force password reset
          if (isFromEmail) {
            setIsPasswordResetRequired(true)
            toast({
              title: "Password reset required",
              description: "Please set a new password to continue.",
            })
          } else {
            toast({
              title: "Ready to reset your password",
              description: "Please enter your new password below.",
            })
          }
        } else {
          // No session found
          setError("No active session found. Please use the reset link from your email.")
          setHasValidSession(false)
        }
      } catch (err) {
        console.error("Error in session check:", err)
        setError("An error occurred while verifying your session. Please try again.")
        setHasValidSession(false)
      } finally {
        setIsCheckingSession(false)
      }
    }

    checkSession()
  }, [searchParams, supabase.auth, toast])

  // Prevent navigation away if password reset is required
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPasswordResetRequired && !isSuccess) {
        e.preventDefault()
        e.returnValue = "You must reset your password before continuing. Are you sure you want to leave?"
        return e.returnValue
      }
    }

    if (isPasswordResetRequired && !isSuccess) {
      window.addEventListener("beforeunload", handleBeforeUnload)
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isPasswordResetRequired, isSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords don't match. Please try again.")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        console.error("Error updating password:", error)
        setError(error.message || "Failed to update password. Please try again.")
        toast({
          title: "Password reset failed",
          description: error.message || "Please try again or request a new reset link.",
          variant: "destructive",
        })
      } else {
        setIsSuccess(true)
        setIsPasswordResetRequired(false)
        toast({
          title: "Password updated successfully",
          description: "Your password has been reset. You can now log in with your new password.",
        })
      }
    } catch (err) {
      console.error("Unexpected error during password reset:", err)
      setError("An unexpected error occurred. Please try again.")
      toast({
        title: "Password reset failed",
        description: "An unexpected error occurred. Please try again.",
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
            {isPasswordResetRequired ? (
              <ShieldAlert className="h-10 w-10 text-amber-500" />
            ) : (
              <Anchor className="h-10 w-10 text-ocean-600 dark:text-ocean-400" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-ocean-950 dark:text-white">
            {isSuccess
              ? "Password Reset Complete"
              : isPasswordResetRequired
                ? "Password Reset Required"
                : "Create New Password"}
          </CardTitle>
          <CardDescription>
            {isSuccess
              ? "Your password has been successfully reset"
              : isPasswordResetRequired
                ? "You must set a new password before continuing"
                : "Enter your new password below to complete the reset process"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </div>
          )}

          {isCheckingSession ? (
            <div className="py-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-ocean-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-slate-600 dark:text-slate-300">Verifying your reset link...</p>
            </div>
          ) : isSuccess ? (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Your password has been successfully reset. You can now log in with your new password.
              </p>
              <Button asChild className="mt-4 bg-ocean-600 hover:bg-ocean-700">
                <Link href="/login">Proceed to Login</Link>
              </Button>
            </div>
          ) : hasValidSession ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {isPasswordResetRequired && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300">
                  <div className="flex items-center">
                    <ShieldAlert className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>For security reasons, you must set a new password before continuing.</span>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
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
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
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
                {isLoading ? "Updating Password..." : "Reset Password"}
              </Button>
              {!isPasswordResetRequired && (
                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-sm text-ocean-600 hover:text-ocean-700 dark:text-ocean-400 dark:hover:text-ocean-300"
                  >
                    <ArrowLeft className="inline-block mr-1 h-3 w-3" />
                    Back to Login
                  </Link>
                </div>
              )}
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <p className="text-slate-600 dark:text-slate-300">
                The password reset link appears to be invalid or expired.
              </p>
              <Button asChild className="mt-2 bg-ocean-600 hover:bg-ocean-700">
                <Link href="/forgot-password">Request New Reset Link</Link>
              </Button>
              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="text-sm text-ocean-600 hover:text-ocean-700 dark:text-ocean-400 dark:hover:text-ocean-300"
                >
                  <ArrowLeft className="inline-block mr-1 h-3 w-3" />
                  Back to Login
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
