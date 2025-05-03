'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  // Show logout button on all authenticated pages
  const showLogout = ['/dashboard', '/marketplaces', '/about', '/contact'].includes(pathname)

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left side: Desktop nav */}
      <div className="flex space-x-6 text-xl font-bold">
        <button
          onClick={() => {
            if (pathname !== '/dashboard') router.push('/dashboard')
          }}
          className="text-gray-700 hover:text-black transition cursor-pointer"
        >
          Home
        </button>
        <Link href="/marketplaces" className="text-gray-700 hover:text-black transition hidden sm:inline">
          Marketplaces
        </Link>
        <Link href="/about" className="text-gray-700 hover:text-black transition hidden sm:inline">
          About
        </Link>
        <Link href="/contact" className="text-gray-700 hover:text-black transition hidden sm:inline">
          Contact
        </Link>
      </div>

      {/* Right side: Logout (desktop) + Hamburger (mobile) */}
      <div className="flex items-center space-x-4">
        {showLogout && (
          <button
            onClick={handleLogout}
            className="hidden sm:inline text-sm font-semibold text-white bg-gray-800 px-4 py-2 rounded-full hover:bg-black transition cursor-pointer"
          >
            Logout
          </button>
        )}

        {/* Hamburger menu button */}
        <button
          className="sm:hidden text-2xl text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white shadow-lg border rounded-md px-4 py-3 flex flex-col space-y-2 sm:hidden">
          <button
            onClick={() => {
              router.push('/dashboard')
              setMenuOpen(false)
            }}
            className="text-left text-gray-700 hover:text-black transition"
          >
            Home
          </button>
          <button
            onClick={() => {
              router.push('/marketplaces')
              setMenuOpen(false)
            }}
            className="text-left text-gray-700 hover:text-black transition"
          >
            Marketplaces
          </button>
          <button
            onClick={() => {
              router.push('/about')
              setMenuOpen(false)
            }}
            className="text-left text-gray-700 hover:text-black transition"
          >
            About
          </button>
          <button
            onClick={() => {
              router.push('/contact')
              setMenuOpen(false)
            }}
            className="text-left text-gray-700 hover:text-black transition"
          >
            Contact
          </button>
          {showLogout && (
            <button
              onClick={async () => {
                await handleLogout()
                setMenuOpen(false)
              }}
              className="text-left text-sm font-semibold text-white bg-gray-800 px-4 py-2 rounded-full hover:bg-black transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
