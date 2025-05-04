'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import PageWrapper from '@/components/PageWrapper'
import { FaChevronDown } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const messages = [
  "We bring the best of secondhand fashion to your fingertips.",
  "Shop unique, vintage, sustainable finds across top marketplaces.",
  "Shop with confidence, knowing you're making a difference.",
]

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [manual, setManual] = useState(false)
  const [resumeTimeout, setResumeTimeout] = useState<NodeJS.Timeout | null>(null)
  const [listings, setListings] = useState<any[]>([])
  const [listingsLoading, setListingsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/check-auth')
      if (res.status !== 200) {
        router.push('/login')
      } else {
        setLoading(false)
        try {
          const listingsRes = await fetch('/api/ebay-listings')
          const data = await listingsRes.json()
          setListings(data)
        } catch (e) {
          console.error('Failed to load listings:', e)
        } finally {
          setListingsLoading(false)
        }
      }
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    if (manual) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [manual])

  const resetManualPause = () => {
    setManual(true)
    if (resumeTimeout) clearTimeout(resumeTimeout)
    const timeout = setTimeout(() => setManual(false), 3000)
    setResumeTimeout(timeout)
  }

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <PageWrapper>
      <main className="flex-1">
        <section className="h-screen w-full bg-gray-100 flex flex-col items-center justify-center px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="text-7xl font-bold text-gray-800 mb-6 tracking-widest font-[var(--font-bebas)]">
              LD TRUE
            </h1>

            <div className="h-20 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-2xl text-lg text-gray-600"
                >
                  {messages[index]}
                </motion.p>
              </AnimatePresence>
            </div>


            <div className="flex justify-center mt-4 space-x-2">
              {messages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIndex(i)
                    resetManualPause()
                  }}
                  className={`w-3 h-3 rounded-full transition ${
                    i === index ? 'bg-gray-800' : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          <div className="absolute bottom-10 flex flex-col items-center space-y-2">
            <button
              onClick={() => {
                const el = document.getElementById('next-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-base font-semibold text-gray-700 tracking-wider uppercase hover:text-black transition focus:outline-none cursor-pointer"
            >
              Shop Now
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('next-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-gray-700 hover:text-black transition hover:scale-110 focus:outline-none cursor-pointer"
            >
              <FaChevronDown className="text-2xl animate-bounce" />
            </button>
          </div>
        </section>
      
        <div className="w-full border-t border-gray-300" />

        <section id="next-section" className="py-20 px-6 bg-gray-100">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Trending Items</h2>

          {listingsLoading ? (
            <p className="text-gray-600">Loading listings...</p>
          ) : listings.length === 0 ? (
            <p className="text-gray-600">No listings found. Try adjusting your queries.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {listings.map((item) => (
                <a
                  key={item.itemId}
                  href={item.itemWebUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
                >
                  <img
                    src={item?.image?.imageUrl || item?.thumbnailImages?.[0]?.imageUrl}
                    alt={item.title}
                    className="w-full h-52 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-md font-semibold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-600 font-medium">
                    ${item?.price?.value} {item?.price?.currency}
                  </p>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
    </PageWrapper>
  )
}
