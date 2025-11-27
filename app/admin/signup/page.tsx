"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield, Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { signup, type SignupFormData } from "@/app/actions/auth"

export default function AdminSignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const result = await signup(formData)

      if (result.success) {
        setSuccess(result.message)
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-slate-900/30 p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Shield className="h-10 w-10 text-ocean-600 dark:text-ocean-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-ocean-950 dark:text-white">Admin Sign Up</CardTitle>
          <CardDescription>Create an administrator account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 rounded-md bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-200 dark:border-blue-800/30">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <p className="text-sm">
                Registration is restricted to <strong>@nclsail.com</strong> email addresses only.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300 border border-red-200 dark:border-red-800/30">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-md bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 border border-green-200 dark:border-green-800/30">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <p className="text-sm font-medium">{success}</p>
              </div>
              <div className="mt-3">
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href="/admin/login">Go to Login</Link>
                </Button>
              </div>
            </div>
          )}

          {!success && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-ocean-950 dark:text-white">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@nclsail.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-ocean-950 dark:text-white">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-ocean-950 dark:text-white">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-ocean-600 hover:bg-ocean-700" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          )}

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link href="/admin/login" className="text-ocean-600 hover:underline dark:text-ocean-400">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
