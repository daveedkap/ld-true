'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const isDashboard = pathname === '/dashboard'

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left side: Home + Marketplaces */}
      <div className="flex space-x-6 text-xl font-bold">
        <button
          onClick={() => {
            if (!isDashboard) router.push('/dashboard')
          }}
          className="text-gray-700 hover:text-black transition cursor-pointer"
        >
          Home
        </button>
        <Link href="/marketplaces" className="text-gray-700 hover:text-black transition">
          Marketplaces
        </Link>
      </div>

      {/* Right side: Logout */}
      {isDashboard && (
        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-white bg-gray-800 px-4 py-2 rounded-full hover:bg-black transition cursor-pointer"
        >
          Logout
        </button>
      )}
    </nav>
  )
}

