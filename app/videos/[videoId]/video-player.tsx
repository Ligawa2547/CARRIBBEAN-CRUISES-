"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface VideoPlayerProps {
  videoId: string
}

interface VideoDetails {
  snippet: {
    title: string
    description: string
    publishedAt: string
    channelTitle: string
  }
  statistics: {
    viewCount: string
    likeCount: string
  }
}

export function VideoPlayer({ videoId }: VideoPlayerProps) {
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchVideoDetails() {
      try {
        const response = await fetch(`/api/youtube?videoId=${videoId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch video details")
        }
        const data = await response.json()
        if (data.items && data.items.length > 0) {
          setVideoDetails(data.items[0])
        } else {
          setError("Video not found")
        }
      } catch (err) {
        setError("Failed to load video details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchVideoDetails()
  }, [videoId])

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
        <Link href="/videos">
          <Button className="mt-4">Back to Videos</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/videos" className="flex items-center mb-4 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to all videos
      </Link>

      <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden mb-6">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
          title={videoDetails?.snippet.title || "YouTube Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>

      {videoDetails && (
        <div>
          <h1 className="text-2xl font-bold mb-2">{videoDetails.snippet.title}</h1>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <div>
              {videoDetails.snippet.channelTitle} • {new Date(videoDetails.snippet.publishedAt).toLocaleDateString()}
            </div>
            <div>
              {Number.parseInt(videoDetails.statistics.viewCount).toLocaleString()} views •{" "}
              {Number.parseInt(videoDetails.statistics.likeCount).toLocaleString()} likes
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-line">{videoDetails.snippet.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}
