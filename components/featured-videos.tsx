"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Link from "next/link"

interface Video {
  id: { videoId: string }
  snippet: {
    title: string
    description: string
    thumbnails: {
      medium: { url: string }
    }
    publishedAt: string
  }
}

export default function FeaturedVideos() {
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
          // Don't throw error for featured videos, just log it
          console.warn("Failed to fetch featured videos:", response.status)
          setVideos([])
          return
        }

        const data = await response.json()

        if (data.items && data.items.length > 0) {
          // Get the first 3 videos
          setVideos(data.items.slice(0, 3))
        } else {
          setVideos([])
        }
      } catch (error) {
        console.warn("Error fetching featured videos:", error)
        setVideos([])
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  // Don't render anything if there's an error or no videos
  if (error || videos.length === 0) {
    return null
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Videos</h2>
            <p className="text-gray-600">Discover our latest cruise experiences</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
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
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest Videos</h2>
          <p className="text-gray-600">Discover our latest cruise experiences</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  Video
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{video.snippet.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.snippet.description}</p>
                <Link href={`/videos/${video.id.videoId}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Watch Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/videos">
            <Button>View All Videos</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
