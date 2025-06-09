import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Server-side Supabase client (only use in Server Components or Server Actions)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create a client without cookies for build-time use
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// Browser client with auth (for client components)
export function createBrowserClient() {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// Server client with cookies for auth (only use in Server Components or Server Actions)
export function createServerSupabaseClient() {
  // This function should only be called in request context
  // Import cookies dynamically to avoid build-time issues
  try {
    const { cookies } = require("next/headers")
    const cookieStore = cookies()

    return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.delete({ name, ...options })
        },
      },
    })
  } catch (error) {
    // Fallback to service role client if cookies are not available
    return supabase
  }
}

// Export the main server client for convenience
export { supabase as serverSupabase }
