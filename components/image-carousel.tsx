"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

// Reduced number of images to improve performance
const carouselImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-104241367-612x612.jpg-5jL2o3b1iHARTRrkWgA5CXyRnC9h6b.jpeg",
    alt: "Luxury cruise ship sailing on calm blue water",
    caption: "Set sail on an exciting career with our modern fleet",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-527091631-612x612.jpg-1UfelPfR6tzmFC6RZpkl1NfmTUFYpM.jpeg",
    alt: "Cruise ship sailing in the distance on blue waters",
    caption: "Explore breathtaking destinations while building your career",
  },
]

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Simple interval for carousel
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2 drop-shadow-md">{image.caption}</h2>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
