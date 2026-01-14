import { type NextRequest, NextResponse } from "next/server"

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get("videoId")

    if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
      console.error("Missing YouTube API credentials")
      return NextResponse.json({ error: "YouTube API not configured" }, { status: 500 })
    }

    if (videoId) {
      // Fetch specific video details
      const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`

      const response = await fetch(videoUrl)

      if (!response.ok) {
        console.error("YouTube API error:", response.status, response.statusText)
        return NextResponse.json({ error: "Failed to fetch video details" }, { status: response.status })
      }

      const data = await response.json()
      return NextResponse.json(data)
    } else {
      // Fetch channel videos
      const channelUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&maxResults=50&order=date&type=video&key=${YOUTUBE_API_KEY}`

      const response = await fetch(channelUrl)

      if (!response.ok) {
        console.error("YouTube API error:", response.status, response.statusText)
        return NextResponse.json({ error: "Failed to fetch channel videos" }, { status: response.status })
      }

      const data = await response.json()
      return NextResponse.json(data)
    }
  } catch (error) {
    console.error("YouTube API route error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
