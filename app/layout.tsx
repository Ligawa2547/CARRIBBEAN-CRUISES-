import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ClientLayout from "@/components/client-layout"
import { VercelAnalytics } from "@/components/vercel-analytics"
import { Suspense } from "react"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "Norwegian Cruise Line - Book Your Dream Voyage",
    template: "%s | Norwegian Cruise Line",
  },
  description:
    "Explore the best cruises to the Caribbean. Great prices, all-inclusive packages from Caribbean Cruise Ltd.",
  metadataBase: new URL("https://www.nclsail.com/"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nclsail.com/",
    title: "Norwegian Cruise Line - Book Your Dream Voyage",
    description: "Explore the best Caribbean cruise packages. Easy booking and great deals.",
    siteName: "Caribbean Cruises",
    images: [
      {
        url: "https://www.nclsail.com/images/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Norwegian Cruise Line Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Norwegian Cruise Line - Book Your Dream Voyage",
    description: "Explore the best Caribbean cruise packages. Easy booking and great deals.",
    images: ["https://caribbeancruises.site/images/banner.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <ClientLayout>{children}</ClientLayout>
          </Suspense>
        </ThemeProvider>
        <VercelAnalytics />
        {/* Removed ZohoChat component */}
      </body>
    </html>
  )
}
