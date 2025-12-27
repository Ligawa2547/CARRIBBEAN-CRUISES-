import { createClient } from "@/lib/supabase-server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow, format, isToday, isYesterday, isThisWeek, isThisMonth } from "date-fns"
import { ContactAutomationControls } from "./contact-automation-controls"

interface ContactMessage {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: string
  created_at: string
}

async function getContactMessages(): Promise<{ messages: ContactMessage[]; error: string | null }> {
  const supabase = createClient()
  try {
    const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching contact messages:", error)
      return { messages: [], error: error.message }
    }

    return { messages: data || [], error: null }
  } catch (error) {
    console.error("Error in getContactMessages:", error)
    return { messages: [], error: String(error) }
  }
}

function groupMessagesByDate(messages: ContactMessage[]) {
  const groups: Record<string, ContactMessage[]> = {
    Today: [],
    Yesterday: [],
    "This Week": [],
    "This Month": [],
    Older: [],
  }

  messages.forEach((msg) => {
    const msgDate = new Date(msg.created_at)

    if (isToday(msgDate)) {
      groups.Today.push(msg)
    } else if (isYesterday(msgDate)) {
      groups.Yesterday.push(msg)
    } else if (isThisWeek(msgDate)) {
      groups["This Week"].push(msg)
    } else if (isThisMonth(msgDate)) {
      groups["This Month"].push(msg)
    } else {
      groups.Older.push(msg)
    }
  })

  return groups
}

export default async function AdminContactsPage() {
  const { messages, error } = await getContactMessages()
  const groupedMessages = groupMessagesByDate(messages)

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
          <div className="space-y-8">
            {Object.entries(groupedMessages).map(
              ([groupName, groupMsgs]) =>
                groupMsgs.length > 0 && (
                  <div key={groupName} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-indigo-950 dark:text-white">{groupName}</h2>
                      <Badge variant="outline" className="text-sm">
                        {groupMsgs.length} {groupMsgs.length === 1 ? "message" : "messages"}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      {groupMsgs.map((message) => (
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
                                  message.status === "responded"
                                    ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                                    : "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
                                }
                              >
                                {message.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              {format(new Date(message.created_at), "PPpp")} (
                              {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })})
                            </p>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{message.message}</p>

                            <div className="mt-4 pt-4 border-t">
                              <ContactAutomationControls
                                contactId={message.id}
                                contactName={message.name}
                                contactSubject={message.subject}
                                isResponded={message.status === "responded"}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ),
            )}
          </div>
        )}
      </div>
    </div>
  )
}
