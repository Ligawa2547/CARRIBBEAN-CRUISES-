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
    thumbnails: {
      medium: { url: string }
    }
  }
}

export function FeaturedVideos() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("/api/youtube")
        if (!response.ok) {
          throw new Error("Failed to fetch videos")
        }
        const data = await response.json()
        setVideos((data.items || []).slice(0, 3)) // Get only the 3 most recent videos
      } catch (err) {
        console.error("Error fetching videos:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  if (loading || videos.length === 0) {
    return null // Don't show anything if loading or no videos
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <h3 className="font-semibold line-clamp-2">{video.snippet.title}</h3>
                </CardContent>
              </Card>
            </Link>
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
