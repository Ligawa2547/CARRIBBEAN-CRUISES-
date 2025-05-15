"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createBrowserClient } from "@/lib/supabase-browser"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"
import { User, Mail, Phone, MapPin, Briefcase, Shield, Calendar, Edit, Save, X } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface ProfileData {
  id: string
  full_name: string
  email: string
  phone?: string
  location?: string
  experience?: string
  bio?: string
  avatar_url?: string
  updated_at: string
}

export default function ProfileSettings({
  user,
  profile,
  isLoading,
}: {
  user: SupabaseUser
  profile: ProfileData | null
  isLoading: boolean
}) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    experience: profile?.experience || "",
    bio: profile?.bio || "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createBrowserClient()
  const { toast } = useToast()
  const { signOut } = useAuth()

  // Update form data when profile changes
  React.useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        location: profile.location || "",
        experience: profile.experience || "",
        bio: profile.bio || "",
      })
    }
  }, [profile])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: formData.full_name,
        email: user.email,
        phone: formData.phone,
        location: formData.location,
        experience: formData.experience,
        bio: formData.bio,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error updating profile:", error)
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        })
        setIsEditMode(false)
      }
    } catch (error) {
      console.error("Unexpected error updating profile:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const toggleEditMode = () => {
    if (isEditMode) {
      // Reset form data to profile data if canceling edit
      if (profile) {
        setFormData({
          full_name: profile.full_name || "",
          phone: profile.phone || "",
          location: profile.location || "",
          experience: profile.experience || "",
          bio: profile.bio || "",
        })
      }
    }
    setIsEditMode(!isEditMode)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pb-6 border-b">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile?.avatar_url || ""} alt={profile?.full_name || user.email || ""} />
          <AvatarFallback className="text-lg bg-ocean-100 text-ocean-800 dark:bg-ocean-900 dark:text-ocean-200">
            {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1 flex-1">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            {profile?.full_name || user.email?.split("@")[0]}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
            <Shield className="h-3 w-3" />
            <span>User ID: {user.id.substring(0, 8)}...</span>
            <Calendar className="h-3 w-3 ml-2" />
            <span>Joined: {new Date(user.created_at || Date.now()).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditMode && (
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={toggleEditMode}>
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          )}
          {isEditMode && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={toggleEditMode}
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </Button>
          )}
        </div>
      </div>

      {isEditMode ? (
        // Edit Mode
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="bg-slate-50 dark:bg-slate-800"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">Email cannot be changed</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Miami, FL"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                Years of Experience
              </Label>
              <Input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="5+ years in hospitality"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="flex items-center gap-1">
                <User className="h-3 w-3" />
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself and your experience..."
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="bg-ocean-600 hover:bg-ocean-700" disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={toggleEditMode}
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        // View Mode
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border border-slate-200 dark:border-slate-700">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                  <h3 className="font-medium">Personal Information</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Full Name</p>
                    <p className="font-medium">{profile?.full_name || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Phone</p>
                    <p className="font-medium">{profile?.phone || "Not provided"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-slate-700">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                  <h3 className="font-medium">Professional Information</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Location</p>
                    <p className="font-medium">{profile?.location || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Experience</p>
                    <p className="font-medium">{profile?.experience || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Profile Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={profile ? "default" : "outline"} className="bg-ocean-600">
                        {profile ? "Profile Complete" : "Profile Incomplete"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {profile?.bio && (
            <Card className="border border-slate-200 dark:border-slate-700">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                  <h3 className="font-medium">Bio</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{profile.bio}</p>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end">
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={toggleEditMode}>
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          </div>
        </div>
      )}

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Account Actions</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => signOut()}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
