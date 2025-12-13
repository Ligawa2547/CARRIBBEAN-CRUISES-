"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Anchor, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const { signIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Check for messages or errors in URL params
  useEffect(() => {
    const message = searchParams.get("message")
    const emailParam = searchParams.get("email")
    const error = searchParams.get("error")
    const returnUrl = searchParams.get("returnUrl")

    if (message) {
      const fullMessage = emailParam ? `${message} (sent to ${emailParam})` : message
      setSuccessMessage(fullMessage)
      toast({
        title: "Success",
        description: fullMessage,
      })
    }

    if (error) {
      setError(error)
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }

    // Store returnUrl in session storage if it exists
    if (returnUrl) {
      sessionStorage.setItem("returnUrl", returnUrl)
    }
  }, [searchParams, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await signIn(email, password)

      if (error) {
        console.error("Login error:", error)
        setError(error.message || "Invalid email or password. Please try again.")
        toast({
          title: "Login failed",
          description: error.message || "Invalid email or password. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Get returnUrl from session storage or query parameters
      const returnUrl = sessionStorage.getItem("returnUrl") || searchParams.get("returnUrl") || "/dashboard"

      // Clear the stored returnUrl
      sessionStorage.removeItem("returnUrl")

      // Redirect to the return URL
      router.push(returnUrl)
    } catch (error: any) {
      console.error("Unexpected error during login:", error)
      setError("An unexpected error occurred. Please try again later.")
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
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
          <CardTitle className="text-2xl font-bold text-ocean-950 dark:text-white">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300 flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-ocean-600 hover:text-ocean-700 dark:text-ocean-400 dark:hover:text-ocean-300"
                >
                  Forgot password?
                </Link>
              </div>
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
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-ocean-600 hover:bg-ocean-700" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-ocean-600 hover:text-ocean-700 dark:text-ocean-400 dark:hover:text-ocean-300 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
