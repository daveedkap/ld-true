import type { Metadata } from "next"
import "./globals.css"
import { Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import ThemeToggle from "@/components/ThemeToggle"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Your Site Title",
  description: "Your site description",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {/* 🌓 Always visible theme toggle button */}
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
