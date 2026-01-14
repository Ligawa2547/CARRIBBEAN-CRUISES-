"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase-browser"
import type { User, Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signUp: (email: string, password: string) => Promise<{ error: any; success?: boolean; message?: string }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
  updatePassword: (password: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createBrowserClient()

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true)
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()
        if (error) {
          console.error("Error getting session:", error)
        } else {
          setSession(session)
          setUser(session?.user || null)
        }
      } catch (error) {
        console.error("Unexpected error during getSession:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session?.user?.email)
      setSession(session)
      setUser(session?.user || null)
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase.auth])

  const signUp = async (email: string, password: string) => {
    try {
      console.log("Signing up with email:", email)

      // Get the current URL to use as the base for the redirect
      const baseUrl = window.location.origin

      // Try direct signup without email confirmation first
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${baseUrl}/auth/callback?type=signup`,
        },
      })

      console.log("Signup response:", data)

      if (error) {
        console.error("Signup error:", error)
        return { error, success: false }
      }

      // Check if user is created but needs email confirmation
      if (data?.user && data.user.identities?.length === 0) {
        return {
          error: null,
          success: false,
          message: "This email is already registered. Please check your email for verification or try logging in.",
        }
      }

      // Check if email confirmation is required
      if (data?.user && !data.session) {
        return {
          error: null,
          success: true,
          message: "Please check your email to verify your account before logging in.",
        }
      }

      // If we have a session, the user is signed up and logged in
      if (data?.session) {
        return { error: null, success: true }
      }

      // Fallback for unexpected cases
      return {
        error: new Error("Signup failed for an unknown reason"),
        success: false,
      }
    } catch (error) {
      console.error("Error during sign up:", error)
      return { error, success: false }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in with email:", email)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("Signin response:", data?.user?.email)

      if (error) {
        console.error("Signin error:", error)
      }

      return { error, data }
    } catch (error) {
      console.error("Error during sign in:", error)
      return { error }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error during sign out:", error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      // Get the current URL to use as the base for the redirect
      const baseUrl = window.location.origin

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${baseUrl}/auth/callback?type=recovery&source=email`,
      })
      return { error }
    } catch (error) {
      console.error("Error during password reset:", error)
      return { error }
    }
  }

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password })
      return { error }
    } catch (error) {
      console.error("Error updating password:", error)
      return { error }
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
