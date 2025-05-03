'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const isDashboard = pathname === '/dashboard'

  return (
    <nav className="w-full px-6 py-4 bg-white shadow-md flex justify-between items-center">
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
    </nav>
  )
}
