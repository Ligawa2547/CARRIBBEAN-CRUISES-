"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8 md:h-10 md:w-10">
            <Image
              src="/images/caribbean-cruises-logo.png"
              alt="Caribbean Cruises Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-ocean-600 to-cruise-600 bg-clip-text text-transparent">
            Caribbean Cruises
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-ocean-600 dark:hover:text-ocean-400"
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className="text-sm font-medium transition-colors hover:text-ocean-600 dark:hover:text-ocean-400"
          >
            Jobs
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-ocean-600 dark:hover:text-ocean-400"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-ocean-600 dark:hover:text-ocean-400"
          >
            Contact
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <User className="h-4 w-4" />
                  <span>My Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard?tab=applications">My Applications</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard?tab=saved">Saved Jobs</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="gap-1 bg-gradient-to-r from-ocean-600 to-cruise-600 hover:from-ocean-700 hover:to-cruise-700 border-0"
              >
                <Link href="/signup">
                  <LogIn className="h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px]">
            <div className="flex flex-col gap-6 pt-6">
              <Link href="/" className="flex items-center gap-2 text-lg font-bold" onClick={() => setIsOpen(false)}>
                <div className="relative h-8 w-8">
                  <Image
                    src="/images/caribbean-cruises-logo.png"
                    alt="Caribbean Cruises Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="bg-gradient-to-r from-ocean-600 to-cruise-600 bg-clip-text text-transparent">
                  Caribbean Cruises
                </span>
              </Link>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-base font-medium transition-colors hover:text-ocean-600 dark:hover:text-ocean-400"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/jobs"
                  className="text-base font-medium transition-colors hover:text-ocean-600 dark:hover:text-ocean-400"
                  onClick={() => setIsOpen(false)}
                >
                  Jobs
                </Link>
                <Link
                  href="/about"
                  className="text-base font-medium transition-colors hover:text-ocean-600 dark:hover:text-ocean-400"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-base font-medium transition-colors hover:text-ocean-600 dark:hover:text-ocean-400"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>

                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-base font-medium transition-colors hover:text-ocean-600 dark:hover:text-ocean-400"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard?tab=applications"
                      className="text-base font-medium transition-colors hover:text-ocean-600 dark:hover:text-ocean-400"
                      onClick={() => setIsOpen(false)}
                    >
                      My Applications
                    </Link>
                    <Link
                      href="/dashboard?tab=saved"
                      className="text-base font-medium transition-colors hover:text-ocean-600 dark:hover:text-ocean-400"
                      onClick={() => setIsOpen(false)}
                    >
                      Saved Jobs
                    </Link>
                    <Button
                      variant="outline"
                      className="mt-2 justify-start"
                      onClick={() => {
                        signOut()
                        setIsOpen(false)
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 mt-2">
                    <Button asChild variant="outline">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="gap-1 bg-gradient-to-r from-ocean-600 to-cruise-600 hover:from-ocean-700 hover:to-cruise-700 border-0"
                    >
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <LogIn className="h-4 w-4" />
                        <span>Sign Up</span>
                      </Link>
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
