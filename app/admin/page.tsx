import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Management</CardTitle>
            <CardDescription>Manage job listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link href="/admin/jobs/manage">Manage Jobs</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/add-hospitality-jobs">Add Hospitality Jobs</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/add-cruise-ship-jobs">Add Cruise Ship Jobs</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/add-electronics-jobs">Add Electronics Jobs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
            <CardDescription>Review job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/applications">View Applications</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Messages</CardTitle>
            <CardDescription>Review contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/contacts">View Messages</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
