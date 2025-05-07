'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import PageWrapper from '@/components/PageWrapper'
import { FaChevronDown } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const messages = [
  "One shop. Every platform. Always true to style.",
  "Handpicked vintage and streetwear, curated just for you.",
  "Your favorite vintage finds all in one place.",
]

const categoryKeywords: Record<string, string[]> = {
  'T-Shirt': ['tee', 't-shirt'],
  'Hoodies': ['hoodie'],
  'Jackets': ['jacket'],
  'Jeans': ['jeans'],
  'Pants': ['pants'],
  'Cargo Pants': ['cargo pants'],
  'Sweatpants': ['sweatpants'],
  'Track Pants': ['track pants'],
  'Ski Pants': ['ski pants'],
  'Cargo Shorts': ['cargo shorts'],
  'Jorts': ['jorts'],
  'Beanies': ['beanie'],
}

const categoryGroups = {
  Tops: ['T-Shirt', 'Hoodies', 'Jackets'],
  Bottoms: ['Jeans', 'Pants', 'Cargo Pants', 'Sweatpants', 'Track Pants', 'Ski Pants', 'Cargo Shorts', 'Jorts'],
  Hats: ['Beanies'],
}

export default function DashboardPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [manual, setManual] = useState(false)
  const [resumeTimeout, setResumeTimeout] = useState<NodeJS.Timeout | null>(null)
  const [listings, setListings] = useState<any[]>([])
  const [listingsLoading, setListingsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [pendingCategories, setPendingCategories] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const filterButtonRef = useRef<HTMLButtonElement>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

  useEffect(() => {
    const fetchListings = async () => {
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
    fetchListings()
  }, [])  

  useEffect(() => {
    if (manual) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [manual])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setFiltersOpen(false)
      }
    }

    if (filtersOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [filtersOpen])

  const resetManualPause = () => {
    setManual(true)
    if (resumeTimeout) clearTimeout(resumeTimeout)
    const timeout = setTimeout(() => setManual(false), 3000)
    setResumeTimeout(timeout)
  }

  const handleSwipe = () => {
    if (touchStartX === null || touchEndX === null) return
    const distance = touchStartX - touchEndX
    const threshold = 50 // minimum swipe distance
    if (distance > threshold) {
      // swiped left
      setIndex((prev) => (prev + 1) % messages.length)
      resetManualPause()
    } else if (distance < -threshold) {
      // swiped right
      setIndex((prev) => (prev - 1 + messages.length) % messages.length)
      resetManualPause()
    }
  }  

  const getCategoryCount = (cat: string) =>
    listings.filter((item) => {
      const title = item?.title?.toLowerCase() || ''
      const keywords = categoryKeywords[cat] || [cat.toLowerCase()]
      return keywords.some(keyword => title.includes(keyword))
    }).length  

  const handleCategoryToggle = (cat: string) => {
    setPendingCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const handleApplyFilters = () => {
    setSelectedCategories(pendingCategories)
    setFiltersOpen(false)
  }

  const sortedListings = [...listings]
    .filter((item) => {
      if (selectedCategories.length === 0) return true
      const title = item?.title?.toLowerCase() || ''
      return selectedCategories.some((cat) => {
        const keywords = categoryKeywords[cat] || [cat.toLowerCase()]
        return keywords.some((keyword) => title.includes(keyword))
      })
    })
    .sort((a, b) => {
      const aPrice = parseFloat(a?.price?.value || '0')
      const bPrice = parseFloat(b?.price?.value || '0')
      if (sortOrder === 'asc') return aPrice - bPrice
      if (sortOrder === 'desc') return bPrice - aPrice
      return 0
    })

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    )
  }

  return (
    <PageWrapper>
      <main className="flex-1 bg-white">
        <section className="h-screen w-full bg-white flex flex-col items-center justify-center px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="text-7xl font-bold text-gray-800 mb-6 tracking-widest font-[var(--font-bebas)]">
              LD TRUE
            </h1>

            <div
              className="h-20 flex items-center justify-center sm:touch-none"
              onTouchStart={(e) => setTouchStartX(e.changedTouches[0].clientX)}
              onTouchEnd={(e) => {
                const touchEnd = e.changedTouches[0].clientX
                if (touchStartX === null) return
                const distance = touchStartX - touchEnd
                const threshold = 50

                if (distance > threshold && index < messages.length - 1) {
                  setIndex(index + 1)
                  resetManualPause()
                } else if (distance < -threshold && index > 0) {
                  setIndex(index - 1)
                  resetManualPause()
                }

                setTouchStartX(null)
              }}
            >
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
              className="focus:outline-none"
            >
              <FaChevronDown className="text-2xl animate-bounce cursor-pointer" />
            </button>
          </div>
        </section>

        <div className="w-full border-t border-gray-300" />

        <section id="next-section" className="py-20 px-6 bg-white">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight text-center md:text-left">
              Featured Listings
            </h2>
            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-end">
              <div className="relative" ref={dropdownRef}>
                <button
                  ref={filterButtonRef}
                  onClick={() => {
                    setFiltersOpen(!filtersOpen)
                    setPendingCategories(selectedCategories)
                  }}
                  className="border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-100"
                >
                  Filter
                </button>
                {filtersOpen && (
                  <div className="absolute z-10 bg-white border border-gray-200 shadow-md mt-2 p-4 rounded w-80 
                  sm:-right-10 sm:left-auto sm:translate-x-0 
                  left-[40%] -translate-x-[20%]">
                    <div className="space-y-2">
                      {Object.entries(categoryGroups).map(([group, cats]) => (
                        <div key={group}>
                          <button
                            className="flex items-center justify-between w-full font-bold text-gray-800 px-3 py-1 rounded-full hover:bg-gray-100 transition mb-1"
                            onClick={() => toggleGroup(group)}
                          >
                            <span>{group}</span>
                            <span
                              className={`transform transition-transform duration-200 ${
                                expandedGroups.includes(group) ? 'rotate-90' : ''
                              }`}
                            >
                              ▶
                            </span>
                          </button>
                          {expandedGroups.includes(group) && (
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 ml-2">
                              {cats.map((cat) => (
                                <label key={cat} className="text-sm text-gray-700 flex items-center">
                                  <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={pendingCategories.includes(cat)}
                                    onChange={() => handleCategoryToggle(cat)}
                                  />
                                  {cat} ({getCategoryCount(cat)})
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => {
                          setPendingCategories([])
                          setSelectedCategories([])
                          setFiltersOpen(false)
                        }}                        
                        className="w-1/2 bg-black text-white text-sm py-1.5 rounded hover:bg-gray-900 transition"
                      >
                        Reset
                      </button>
                      <button
                        onClick={handleApplyFilters}
                        className="w-1/2 bg-black text-white text-sm py-1.5 rounded hover:bg-gray-900 transition"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  id="sort"
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  value={sortOrder || ''}
                  onChange={(e) => {
                    const val = e.target.value
                    setSortOrder(val === 'asc' ? 'asc' : val === 'desc' ? 'desc' : null)
                  }}
                >
                  <option value="">Default</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {listingsLoading ? (
            <p className="text-center text-gray-500">Loading listings...</p>
          ) : sortedListings.length === 0 ? (
            <div className="text-center text-gray-500 min-h-[600px] flex items-center justify-center">
              No listings match your filters.
            </div>
          ) : (
            <div className="min-h-[600px]">
              <motion.div
                className="grid gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
              >
                {sortedListings.map((item) => (
                  <motion.a
                    key={item.itemId}
                    href={item.itemWebUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative w-full aspect-[3/4]">
                      <Image
                        src={
                          (
                            item?.image?.imageUrl ||
                            item?.thumbnailImages?.[0]?.imageUrl ||
                            '/fallback.jpg'
                          ).replace(/s-l\d+\.jpg/, 's-l1600.jpg')
                        }
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                    <h3 className="text-xs font-medium text-gray-900 mb-1 line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        ${item?.price?.value} {item?.price?.currency}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          )}
        </section>
      </main>
    </PageWrapper>
  )
}
