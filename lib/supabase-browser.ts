import { createBrowserClient as createClient } from "@supabase/ssr"

export function createBrowserClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${name}=`))
          ?.split("=")[1]
      },
      set(name: string, value: string, options: any) {
        document.cookie = `${name}=${value}; path=/; max-age=${options.maxAge}`
      },
      remove(name: string, options: any) {
        document.cookie = `${name}=; path=/; max-age=0`
      },
    },
  })
}

// Direct signup function for testing
export async function directSignup(email: string, password: string) {
  const supabase = createBrowserClient()

  try {
    console.log("Direct signup attempt with:", email)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    console.log("Direct signup response:", data)

    if (error) {
      console.error("Direct signup error:", error)
      return { error, success: false }
    }

    return { data, error: null, success: true }
  } catch (error) {
    console.error("Direct signup exception:", error)
    return { error, success: false }
  }
}
