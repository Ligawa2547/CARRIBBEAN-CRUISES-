"use client"
import Script from "next/script"
import { useEffect, useState } from "react"

export default function ZohoChat() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if Zoho SalesIQ is loaded
    const checkZohoLoaded = () => {
      if (typeof window !== "undefined" && window.$zoho && window.$zoho.salesiq) {
        setIsLoaded(true)
        console.log("Zoho SalesIQ loaded successfully")
      }
    }

    const timer = setTimeout(checkZohoLoaded, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Script
        id="zoho-salesiq-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.$zoho = window.$zoho || {};
            $zoho.salesiq = $zoho.salesiq || {ready: function(){}};
          `,
        }}
      />
      <Script
        id="zoho-salesiq-widget"
        src="https://salesiq.zohopublic.com/widget?wc=siqc427c497241d16d3c0409bf3e5cd4a00ed2e1b6feed47a4d66fe9cee683ca958"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Zoho SalesIQ script loaded")
          setIsLoaded(true)
        }}
        onError={() => {
          console.error("Failed to load Zoho SalesIQ script")
        }}
      />
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 bg-black text-white p-2 text-xs rounded z-50">
          Zoho Chat: {isLoaded ? "✅ Loaded" : "⏳ Loading..."}
        </div>
      )}
    </>
  )
}
