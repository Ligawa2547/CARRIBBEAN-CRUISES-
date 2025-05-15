import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // Check if the path is the login page
  if (request.nextUrl.pathname === "/admin/login") {
    // If already logged in, redirect to admin dashboard
    const adminAuth = request.cookies.get("admin-auth")?.value
    if (adminAuth === "true") {
      return NextResponse.redirect(new URL("/admin/jobs", request.url))
    }
    // Otherwise, allow access to login page
    return NextResponse.next()
  }

  // For all other admin routes, check authentication
  const adminAuth = request.cookies.get("admin-auth")?.value
  if (adminAuth !== "true") {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
