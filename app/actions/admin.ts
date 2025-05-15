"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

export interface ContactMessage {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: string
  created_at: string
}

export async function getContactMessages(): Promise<{ messages: ContactMessage[]; error: string | null }> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })

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

export async function updateMessageStatus(
  id: number,
  status: string,
): Promise<{ success: boolean; error: string | null }> {
  const supabase = createServerSupabaseClient()

  try {
    const { error } = await supabase.from("contact_messages").update({ status }).eq("id", id)

    if (error) {
      console.error(`Error updating message status for id ${id}:`, error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error(`Error in updateMessageStatus for id ${id}:`, error)
    return { success: false, error: String(error) }
  }
}
