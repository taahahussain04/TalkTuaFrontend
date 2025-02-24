import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { Sidebar } from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Patient Dashboard",
  description: "A dashboard for patient-doctor conversations",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>
        <div className="flex h-screen bg-gradient-to-br from-background to-muted">
            <Sidebar />
            <main className="flex-1 overflow-hidden p-4">
              {children}
            </main>
          </div>
        </body>
    </html>
  )
}

