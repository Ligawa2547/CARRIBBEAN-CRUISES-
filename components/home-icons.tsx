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
            Visit breathtaking destinations across the Caribbean and beyond while earning a competitive salary.
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
            Join a multicultural team and build connections with colleagues from around the world.
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
            Enjoy complimentary accommodations, meals, and access to ship amenities during your contract.
          </p>
        </div>
      </div>
    </>
  )
}
