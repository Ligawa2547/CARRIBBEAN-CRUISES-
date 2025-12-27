import { type NextRequest, NextResponse } from "next/server"

const AUTHORIZED_ADMIN_EMAIL = "wilsonligawa3@gmail.com"
const AUTHORIZED_ADMIN_DOMAIN = "@caribbeancruises.site"

function isAuthorizedEmail(email: string | undefined): boolean {
  if (!email) return false
  return email === AUTHORIZED_ADMIN_EMAIL || email.endsWith(AUTHORIZED_ADMIN_DOMAIN)
}

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl

    const adminAuth = request.cookies.get("admin-auth")?.value
    const adminUser = request.cookies.get("admin-user")?.value
    const isAuth = adminAuth === "true" && isAuthorizedEmail(adminUser)

    // Check if the path is the login page
    if (pathname === "/admin/login") {
      if (isAuth) {
        return NextResponse.redirect(new URL("/admin/jobs/manage", request.url))
      }
      return NextResponse.next()
    }

    // For all other admin routes, check authentication
    if (!isAuth) {
      // Clear cookies if they were invalid to prevent issues
      const response = NextResponse.redirect(new URL("/admin/login", request.url))
      response.cookies.delete("admin-auth")
      response.cookies.delete("admin-user")
      return response
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Error in admin middleware:", error)
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}
