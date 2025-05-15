"use client"
import Script from "next/script"

export default function ZohoChat() {
  return (
    <>
      <Script
        id="zoho-salesiq-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.$zoho=window.$zoho || {};
            $zoho.salesiq = $zoho.salesiq || {ready:function(){}};
          `,
        }}
      />
      <Script
        id="zsiqscript"
        src="https://salesiq.zohopublic.com/widget?wc=siqc427c497241d16d3c0409bf3e5cd4a00ed2e1b6feed47a4d66fe9cee683ca958"
        strategy="afterInteractive"
      />
    </>
  )
}
