'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FiMenu, FiX } from 'react-icons/fi'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
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
        <Link
          href="/marketplaces"
          className="text-gray-700 hover:text-black transition hidden sm:inline"
        >
          Marketplaces
        </Link>
        <Link
          href="/about"
          className="text-gray-700 hover:text-black transition hidden sm:inline"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-gray-700 hover:text-black transition hidden sm:inline"
        >
          Contact
        </Link>
      </div>

      {/* Right side: Hamburger (mobile) */}
      <div className="flex items-center space-x-4">
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
        </div>
      )}
    </nav>
  )
}
