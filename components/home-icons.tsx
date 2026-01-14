"use client"

import { Globe, Users, Ship } from "lucide-react"

export function HomeIcons() {
  return (
    <>
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ocean-100 dark:bg-ocean-900/50 flex items-center justify-center">
          <Globe className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Travel the World</h3>
          <p className="text-muted-foreground">
            Explore stunning Caribbean ports and global destinations while building a rewarding career with Norwegian Cruise Line.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ocean-100 dark:bg-ocean-900/50 flex items-center justify-center">
          <Users className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Diverse Community</h3>
          <p className="text-muted-foreground">
            Join a diverse, multicultural team and build meaningful connections with colleagues from around the world aboard Norwegian Cruise Line..
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ocean-100 dark:bg-ocean-900/50 flex items-center justify-center">
          <Ship className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">All-Inclusive Lifestyle</h3>
          <p className="text-muted-foreground">
            Benefit from free housing, meals, and access to designated ship facilities during your time onboard.
          </p>
        </div>
      </div>
    </>
  )
}
