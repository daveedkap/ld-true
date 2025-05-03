// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import { Montserrat } from "next/font/google"
import PageWrapper from "@/components/PageWrapper"

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
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans antialiased">
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  )
}
