import type { Metadata } from "next"
import { VideoGallery } from "./video-gallery"

export const metadata: Metadata = {
  title: "Videos | Caribbean Cruises Recruitment",
  description: "Watch our latest videos about cruise ship recruitment, job opportunities, and life at sea.",
}

export default function VideosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Videos</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        Watch our latest videos about cruise ship recruitment, job opportunities, and life at sea. Subscribe to our
        YouTube channel for regular updates.
      </p>
      <VideoGallery />
    </div>
  )
}
