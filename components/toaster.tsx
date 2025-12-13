"use client"

import React from "react"
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export default function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <ToastProvider>
      <ToastViewport />
      {toasts?.map((t) => (
        <Toast
          key={t.id}
          open={t.open}
          onOpenChange={(open) => {
            if (!open) dismiss(t.id)
          }}
        >
          {t.title && <ToastTitle>{t.title}</ToastTitle>}
          {t.description && <ToastDescription>{t.description}</ToastDescription>}
          <ToastClose />
        </Toast>
      ))}
    </ToastProvider>
  )
}
