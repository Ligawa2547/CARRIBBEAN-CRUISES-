import { NextResponse } from "next/server"

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || "AIzaSyBUG7G6JVl92DukgL9GhwF5C1WkYUBkfpg"
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UC_YOUR_CHANNEL_ID" // Replace with your actual channel ID

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get("videoId")

  try {
    if (videoId) {
      // Fetch specific video details
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`,
      )
      const data = await response.json()
      return NextResponse.json(data)
    } else {
      // Fetch channel videos
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&order=date&type=video&key=${YOUTUBE_API_KEY}`,
      )
      const data = await response.json()
      return NextResponse.json(data)
    }
  } catch (error) {
    console.error("YouTube API error:", error)
    return NextResponse.json({ error: "Failed to fetch YouTube data" }, { status: 500 })
  }
}
