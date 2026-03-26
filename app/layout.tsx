import type React from "react"
import { GoogleTagManager } from "@next/third-parties/google"
import Script from "next/script"
import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId="GTM-PK6HB293" />
      </head>
      <body>{children}</body>
    </html>
  )
}

export const metadata = {
  generator: "v0.app",
}
