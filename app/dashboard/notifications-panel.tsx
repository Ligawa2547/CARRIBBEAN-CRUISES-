"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase-browser"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { Bell, CheckCircle, AlertCircle, Info, Trash2 } from "lucide-react"

interface Notification {
  id: number
  user_id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  is_read: boolean
  created_at: string
}

export default function NotificationsPanel({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createBrowserClient()

  // For demo purposes, let's create some sample notifications
  const sampleNotifications: Notification[] = [
    {
      id: 1,
      user_id: userId,
      title: "Application Received",
      message: "Your application for Cruise Ship Chef has been received and is under review.",
      type: "info",
      is_read: false,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: 2,
      user_id: userId,
      title: "Interview Invitation",
      message:
        "You've been invited for an interview for the position of Deck Officer. Please check your email for details.",
      type: "success",
      is_read: false,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
      id: 3,
      user_id: userId,
      title: "Profile Update Reminder",
      message: "Please complete your profile to improve your chances of getting hired.",
      type: "warning",
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    },
  ]

  useEffect(() => {
    // In a real app, you would fetch notifications from the database
    // For now, we'll use the sample notifications
    setTimeout(() => {
      setNotifications(sampleNotifications)
      setIsLoading(false)
    }, 1000)
  }, [userId])

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, is_read: true } : notification)),
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, is_read: true })))
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 p-4 border rounded-lg">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Bell className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Notifications</h3>
        <p className="text-slate-500 dark:text-slate-400">You don't have any notifications at the moment.</p>
      </div>
    )
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">All Notifications</h3>
          {unreadCount > 0 && <Badge className="bg-ocean-600">{unreadCount} unread</Badge>}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border rounded-lg transition-colors ${
              !notification.is_read
                ? "bg-ocean-50 dark:bg-ocean-900/10 border-ocean-200 dark:border-ocean-800"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            }`}
          >
            <div className="flex gap-3">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  notification.type === "info"
                    ? "bg-blue-100 dark:bg-blue-900/30"
                    : notification.type === "success"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : notification.type === "warning"
                        ? "bg-amber-100 dark:bg-amber-900/30"
                        : "bg-red-100 dark:bg-red-900/30"
                }`}
              >
                {notification.type === "info" && <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                {notification.type === "success" && (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                )}
                {notification.type === "warning" && (
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                )}
                {notification.type === "error" && <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-slate-900 dark:text-white">{notification.title}</h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{notification.message}</p>
              </div>
            </div>
            <div className="flex justify-end mt-3 gap-2">
              {!notification.is_read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAsRead(notification.id)}
                  className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50 dark:text-ocean-400 dark:hover:text-ocean-300 dark:hover:bg-ocean-900/20"
                >
                  Mark as read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteNotification(notification.id)}
                className="text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-800"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
