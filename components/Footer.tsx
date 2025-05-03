'use client'

import { FaInstagram, FaEbay } from 'react-icons/fa'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="w-full bg-white shadow-t-md border-t border-gray-200 px-6 py-4">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center space-x-3">
        <span className="text-gray-700 text-sm font-medium">Follow us on: </span>

        {/* Depop */}
        <a href="https://www.depop.com/ld_true/" target="_blank" rel="noopener noreferrer">
          <img
            src="/depop_svg.png"
            alt="Depop"
            className="w-6 h-6 hover:opacity-80 transition"
          />
        </a>

        {/* Grailed */}
        <a href="https://www.grailed.com/ld_true" target="_blank" rel="noopener noreferrer">
          <Image
            src="/grailed_svg.svg"
            alt="Grailed"
            width={24}
            height={24}
            className="hover:opacity-80 transition"
          />
        </a>

        {/* Mercari */}
        <a href="https://www.mercari.com/u/ld_true/" target="_blank" rel="noopener noreferrer">
          <img
            src="/mercari_svg.png"
            alt="Mercari"
            className="w-6 h-6 hover:opacity-80 transition"
          />
        </a>

        {/* eBay */}
        <a href="https://www.ebay.com/str/ldtrue" target="_blank" rel="noopener noreferrer">
          <FaEbay className="w-6 h-6 text-gray-700 hover:text-black transition" />
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/ld_true/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="w-6 h-6 text-gray-700 hover:text-black transition" />
        </a>
      </div>
    </footer>
  )
}
