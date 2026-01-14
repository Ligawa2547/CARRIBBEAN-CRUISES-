"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Mail, Users, Clock, Bug } from "lucide-react"

interface EmailResult {
  email: string
  success: boolean
  error?: string
}

interface BulkEmailResponse {
  message: string
  total: number
  successful: number
  failed: number
  results: EmailResult[]
}

interface DebugInfo {
  sampleApplication: any
  totalApplications: number
  availableColumns: string[]
}

export default function SendEmailsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<BulkEmailResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)

  const handleSendEmails = async () => {
    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      // Try the main route first, fallback to simple route if it fails
      let response = await fetch("/api/send-bulk-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      // If the main route fails, try the simple route
      if (!response.ok) {
        console.log("Main route failed, trying simple route...")
        response = await fetch("/api/send-bulk-emails-simple", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send emails")
      }

      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDebug = async () => {
    try {
      const response = await fetch("/api/debug-applications")
      const data = await response.json()
      setDebugInfo(data)
    } catch (err) {
      console.error("Debug failed:", err)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Send Application Emails</h1>
          <p className="text-gray-600">Send video interview instructions to all job applicants in the database.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Bulk Email Sending
            </CardTitle>
            <CardDescription>
              This will send the application confirmation email with video instructions to all applicants in the
              database. Duplicate emails will be filtered out automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleSendEmails} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Sending Emails...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Emails to All Applicants
                </>
              )}
            </Button>

            <Button onClick={handleDebug} variant="outline" className="w-full sm:w-auto ml-0 sm:ml-4">
              <Bug className="mr-2 h-4 w-4" />
              Debug Database Structure
            </Button>
          </CardContent>
        </Card>

        {debugInfo && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Database Debug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <strong>Total Applications:</strong> {debugInfo.totalApplications}
                </div>
                <div>
                  <strong>Available Columns:</strong> {debugInfo.availableColumns.join(", ")}
                </div>
                {debugInfo.sampleApplication && (
                  <div>
                    <strong>Sample Application:</strong>
                    <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
                      {JSON.stringify(debugInfo.sampleApplication, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Email Sending Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{results.total}</div>
                  <div className="text-sm text-blue-800">Total Recipients</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{results.successful}</div>
                  <div className="text-sm text-green-800">Successful</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{results.failed}</div>
                  <div className="text-sm text-red-800">Failed</div>
                </div>
              </div>

              {results.results.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Detailed Results</h3>
                  <div className="max-h-96 overflow-y-auto">
                    {results.results.map((result, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 border rounded-lg mb-2 ${
                          result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {result.success ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <span className="font-medium">{result.email}</span>
                        </div>
                        {!result.success && result.error && (
                          <span className="text-sm text-red-600">{result.error}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
