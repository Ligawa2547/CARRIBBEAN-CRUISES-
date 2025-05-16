"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface VideoItem {
  id: { videoId: string }
  snippet: {
    title: string
    description: string
    thumbnails: {
      medium: { url: string; width: number; height: number }
    }
    publishedAt: string
  }
}

export function VideoGallery() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("/api/youtube")
        if (!response.ok) {
          throw new Error("Failed to fetch videos")
        }
        const data = await response.json()
        setVideos(data.items || [])
      } catch (err) {
        setError("Failed to load videos. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-10">
        <p>No videos found. Please check back later.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Link href={`/videos/${video.id.videoId}`} key={video.id.videoId}>
          <Card className="h-full hover:shadow-lg transition-shadow duration-300">
            <div className="relative pt-[56.25%]">
              <Image
                src={video.snippet.thumbnails.medium.url || "/placeholder.svg"}
                alt={video.snippet.title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg line-clamp-2 mb-2">{video.snippet.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-3">{video.snippet.description}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
