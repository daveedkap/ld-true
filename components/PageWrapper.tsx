'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showNavbar = pathname !== '/login'

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <Navbar />}
      <div className="flex-1 flex flex-col">{children}</div>
      {showNavbar && <Footer />}
    </div>
  )
}
