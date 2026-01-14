"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const imageList = [
  "/images/cruise-island.jpeg",
  "/images/cruise-deck.jpeg",
  "/images/cruise-caribbean-port.jpeg",
  "/images/cruise-ocean.jpeg",
  "/images/cruise-palm-beach.jpeg",
  "/images/cruise-fjord.jpeg",
  "/images/cruise-distant.jpeg",
  "/images/cruise-closeup.jpeg",
]

export function ImageDebug() {
  const [imageStatus, setImageStatus] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const checkImages = async () => {
      const status: Record<string, boolean> = {}

      for (const path of imageList) {
        try {
          const img = new Image()
          img.src = path
          await new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = reject
          })
          status[path] = true
        } catch (error) {
          status[path] = false
          console.error(`Failed to load image: ${path}`)
        }
      }

      setImageStatus(status)
    }

    checkImages()
  }, [])

  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Image Loading Status</h2>
      <ul className="space-y-2">
        {imageList.map((path) => (
          <li key={path} className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded-full ${imageStatus[path] ? "bg-green-500" : "bg-red-500"}`}></span>
            <span>{path}</span>
            <span>{imageStatus[path] ? "✅ Loaded" : "❌ Failed"}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
