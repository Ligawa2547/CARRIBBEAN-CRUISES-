import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-ocean-50 to-cruise-50/30 dark:from-ocean-950 dark:to-cruise-950/30 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-ocean-600 dark:text-ocean-400">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Page Not Found</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-ocean-600 hover:bg-ocean-700">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
