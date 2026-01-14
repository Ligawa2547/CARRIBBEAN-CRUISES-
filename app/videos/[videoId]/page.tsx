import type { Metadata } from "next"
import { VideoPlayer } from "./video-player"
import { notFound } from "next/navigation"

interface VideoPageProps {
  params: {
    videoId: string
  }
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { videoId } = params

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/youtube?videoId=${videoId}`,
    )
    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      return {
        title: "Video Not Found",
        description: "The requested video could not be found.",
      }
    }

    const video = data.items[0]
    return {
      title: `${video.snippet.title} | Caribbean Cruises Recruitment`,
      description: video.snippet.description.substring(0, 160),
    }
  } catch (error) {
    return {
      title: "Video | Caribbean Cruises Recruitment",
      description: "Watch our cruise ship recruitment videos.",
    }
  }
}

export default function VideoPage({ params }: VideoPageProps) {
  const { videoId } = params

  if (!videoId) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <VideoPlayer videoId={videoId} />
    </div>
  )
}
