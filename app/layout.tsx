// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import { Montserrat } from "next/font/google"
import PageWrapper from "@/components/PageWrapper"
import { Bebas_Neue } from 'next/font/google'

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "LD True",
  description: "Secondhand store with vintage goods",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${bebas.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}

