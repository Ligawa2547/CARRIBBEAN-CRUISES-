import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, Globe } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-ocean-950 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/images/caribbean-cruises-logo.png"
                alt="Caribbean Cruises Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <h3 className="text-xl font-bold">Caribbean Cruises</h3>
            </div>
            <p className="text-ocean-200 mb-4 text-sm">
              The official recruitment partner and ticket provider for the world's leading cruise lines.
            </p>
            <div className="space-y-2">
              <div className="flex items-start text-sm">
                <MapPin className="h-5 w-5 mr-2 text-ocean-400 flex-shrink-0 mt-0.5" />
                <span className="text-ocean-200">
                  Port Everglades Terminal
                  <br />
                  Fort Lauderdale, FL 33316
                  <br />
                  United States
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-5 w-5 mr-2 text-ocean-400" />
                <span className="text-ocean-200">+1 (216) 777-7288</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-5 w-5 mr-2 text-ocean-400" />
                <span className="text-ocean-200">info@caribbeancruises.site</span>
              </div>
              <div className="flex items-center text-sm">
                <Globe className="h-5 w-5 mr-2 text-ocean-400" />
                <span className="text-ocean-200">www.caribbeancruises.site</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-ocean-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ocean-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-ocean-200 hover:text-white transition-colors">
                  Job Opportunities
                </Link>
              </li>
              <li>
                <Link href="/cruises" className="text-ocean-200 hover:text-white transition-colors">
                  Cruise Packages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ocean-200 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-ocean-200 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-ocean-200 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies-policy" className="text-ocean-200 hover:text-white transition-colors">
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-ocean-200 hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-ocean-200 mb-4 text-sm">
              Subscribe to our newsletter to receive updates on job opportunities and cruise packages.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 text-sm rounded-l-md w-full bg-ocean-800 border border-ocean-700 text-white focus:outline-none focus:ring-1 focus:ring-ocean-500"
              />
              <button className="bg-ocean-600 hover:bg-ocean-500 px-4 py-2 rounded-r-md text-white text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-ocean-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-ocean-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Caribbean Cruises. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-ocean-300 hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="text-ocean-300 hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" className="text-ocean-300 hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="text-ocean-300 hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
