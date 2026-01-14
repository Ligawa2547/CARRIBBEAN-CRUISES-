import { type NextRequest, NextResponse } from "next/server"

const ADMIN_EMAIL = "wilsonligawa3@gmail.com"

export async function middleware(request: NextRequest) {
  try {
    console.log("Admin middleware running on path:", request.nextUrl.pathname)

    // Check if the path is the login page
    if (request.nextUrl.pathname === "/admin/login") {
      // If already logged in, redirect to admin dashboard
      const adminAuth = request.cookies.get("admin-auth")?.value
      const adminUser = request.cookies.get("admin-user")?.value

      if (adminAuth === "true" && adminUser === ADMIN_EMAIL) {
        console.log("User is authenticated, redirecting to admin dashboard")
        return NextResponse.redirect(new URL("/admin/jobs", request.url))
      }
      // Otherwise, allow access to login page
      console.log("Allowing access to login page")
      return NextResponse.next()
    }

    // For all other admin routes, check authentication
    const adminAuth = request.cookies.get("admin-auth")?.value
    const adminUser = request.cookies.get("admin-user")?.value

    console.log("Admin auth cookie:", adminAuth)
    console.log("Admin user cookie:", adminUser)

    if (adminAuth !== "true" || adminUser !== ADMIN_EMAIL) {
      console.log("User is not authenticated or not authorized, redirecting to login page")
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    console.log("User is authenticated and authorized, allowing access to admin route")
    return NextResponse.next()
  } catch (error) {
    console.error("Error in admin middleware:", error)
    // Instead of failing, redirect to login page on error
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}
