import { getContactMessages } from "@/app/actions/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export default async function AdminMessagesPage() {
  const { messages, error } = await getContactMessages()

  return (
    <div className="container py-10 md:py-16 px-4 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-indigo-950 dark:text-white">
            Contact Messages
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300">
            View and manage messages from the contact form
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-red-600 dark:text-red-400 mb-6">
            <p>Error loading messages: {error}</p>
          </div>
        )}

        {!error && messages.length === 0 && (
          <div className="rounded-lg border p-8 md:p-10 text-center bg-white dark:bg-slate-800 shadow-md">
            <h2 className="text-lg md:text-xl font-semibold text-indigo-950 dark:text-white">No messages found</h2>
            <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300">
              There are no contact messages in the database yet.
            </p>
          </div>
        )}

        {messages.length > 0 && (
          <div className="space-y-6">
            {messages.map((message) => (
              <Card key={message.id} className="border-0 shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-indigo-950 dark:text-white">{message.subject}</CardTitle>
                      <CardDescription>
                        From: {message.name} ({message.email})
                      </CardDescription>
                    </div>
                    <Badge
                      className={
                        message.status === "read"
                          ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
                      }
                    >
                      {message.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{message.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
