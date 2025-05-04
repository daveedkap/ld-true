'use client'

import PageWrapper from '@/components/PageWrapper'
import { motion } from 'framer-motion'
import { FaEbay } from 'react-icons/fa'

const marketplaces = [
  {
    name: 'Depop',
    url: 'https://www.depop.com/ld_true/',
    logo: '/depop_svg.png',
    bg: 'bg-red-100',
  },
  {
    name: 'eBay',
    url: 'https://www.ebay.com/str/ldtrue',
    logo: <FaEbay className="w-10 h-10 text-[#0064D2]" />,
    bg: 'bg-blue-50',
  },
  {
    name: 'Mercari',
    url: 'https://www.mercari.com/u/ld_true/',
    logo: '/mercari_svg.png',
    bg: 'bg-indigo-50',
  },
  {
    name: 'Grailed',
    url: 'https://www.grailed.com/ld_true',
    logo: '/grailed_svg.svg',
    bg: 'bg-gray-100',
  },
]

export default function MarketplacesPage() {
  return (
    <PageWrapper>
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="min-h-screen bg-white px-6 py-24 flex flex-col gap-10 items-center"
      >
        <h1 className="text-5xl font-bold text-gray-800 tracking-wide font-[var(--font-bebas)] text-center mb-6">
          Where You Can Find Us
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mb-10">
          LD True is a single sustainable shop curating unique and vintage pieces across top resale platforms. Shop your favorite finds from any of the marketplaces below.
        </p>

        <div className="w-full flex flex-col gap-6">
          {marketplaces.map(({ name, url, logo, bg }) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full ${bg} p-8 rounded-2xl shadow-lg flex items-center justify-between transition duration-300 hover:shadow-xl`}
            >
              <div className="text-2xl font-semibold text-gray-800">{name}</div>
              <div className="flex-shrink-0">
                {typeof logo === 'string' ? (
                  <img src={logo} alt={name} className="h-12 w-auto" />
                ) : (
                  logo
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </motion.main>
    </PageWrapper>
  )
}
