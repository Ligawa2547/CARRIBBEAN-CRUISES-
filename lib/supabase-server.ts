import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

// Create a function that creates a Supabase client for server components
export function createServerClient() {
  // Only create the cookie store when this function is called
  // This ensures cookies() is only called in a request context
  return createSupabaseClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get(name: string) {
        // Only access cookies when the function is called
        return cookies().get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookies().set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookies().set({ name, value: "", ...options })
      },
    },
  })
}

export const createClient = createServerClient

// For server actions and API routes that need direct access
// Don't initialize with cookies at build time
export const supabase = createSupabaseClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)
