import { addHospitalityJobs } from "@/app/actions/add-hospitality-jobs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function AddHospitalityJobsPage() {
  // Execute the action to add hospitality jobs
  const result = await addHospitalityJobs()

  return (
    <div className="container py-10 md:py-16 px-4 md:px-6">
      <div className="mx-auto max-w-3xl">
        <Card className="border-0 shadow-md bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-ocean-950 dark:text-white">Add Hospitality Jobs</CardTitle>
            <CardDescription>Adding 29 hospitality department jobs to the database</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`p-4 rounded-md mb-6 ${
                result.success
                  ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 border border-green-200 dark:border-green-800/30"
                  : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300 border border-red-200 dark:border-red-800/30"
              }`}
            >
              <p className="font-medium">{result.success ? result.message : `Error: ${result.error}`}</p>
              {result.success && result.added !== undefined && (
                <p className="mt-2">
                  {result.added > 0
                    ? `Added ${result.added} new hospitality jobs to the database.`
                    : "No new jobs were added as they already exist in the database."}
                </p>
              )}
            </div>

            {!result.success && result.error && result.error.includes("doesn't exist") && (
              <div className="space-y-4 mb-6">
                <h3 className="font-medium text-ocean-950 dark:text-white">Database Setup Required</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  It looks like the necessary database tables don't exist yet. Please follow these steps:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                  <li>Go to your Supabase dashboard</li>
                  <li>Navigate to the SQL Editor</li>
                  <li>Create a new query and paste the following SQL:</li>
                </ol>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto text-sm font-mono">
                  {`-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  salary_range VARCHAR(100),
  location VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  resume_url TEXT,
  cover_letter TEXT,
  experience_years INTEGER,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`}
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  After executing this SQL, return to this page and try again.
                </p>
              </div>
            )}

            {result.success && (
              <div className="space-y-4">
                <h3 className="font-medium text-ocean-950 dark:text-white">Job Categories Added:</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                  <li>Hotel Operations & Guest Services (6 positions)</li>
                  <li>Housekeeping & Laundry Services (6 positions)</li>
                  <li>Food & Beverage Service (12 positions)</li>
                  <li>Entertainment & Guest Experience (5 positions)</li>
                </ul>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <Button asChild className="bg-ocean-600 hover:bg-ocean-700">
                <Link href="/admin/jobs/manage">View All Jobs</Link>
              </Button>
              {!result.success && (
                <Button asChild variant="outline">
                  <Link href="/admin/add-hospitality-jobs">Try Again</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
