import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

// Server-side Supabase client (only use in Server Components or Server Actions)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create a client without cookies for build-time use
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// Browser client with auth (for client components)
export function createBrowserClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// Server client with cookies for auth (only use in Server Components or Server Actions)
export function createServerSupabaseClient() {
  // Only create the cookie handler when this function is called
  // This ensures cookies() is only called in a request context
  try {
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookies().set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookies().delete({ name, ...options })
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
