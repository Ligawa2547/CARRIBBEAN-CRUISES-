"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Clock } from "lucide-react"
import Link from "next/link"

interface Video {
  id: { videoId: string }
  snippet: {
    title: string
    description: string
    thumbnails: {
      medium: { url: string }
      high: { url: string }
    }
    publishedAt: string
  }
}

export function VideoGallery() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/youtube")

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch videos")
        }

        const data = await response.json()

        if (data.items) {
          setVideos(data.items)
        } else {
          setVideos([])
        }
      } catch (error) {
        console.error("Error fetching videos:", error)
        setError(error instanceof Error ? error.message : "Failed to load videos")
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video bg-gray-200 animate-pulse" />
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Unable to Load Videos</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Videos Available</h2>
          <p className="text-gray-600">Check back later for new content!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id.videoId} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-video">
              <img
                src={video.snippet.thumbnails.medium.url || "/placeholder.svg"}
                alt={video.snippet.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.snippet.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.snippet.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(video.snippet.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <Link href={`/videos/${video.id.videoId}`}>
                <Button className="w-full">Watch Video</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
