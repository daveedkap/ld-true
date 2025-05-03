'use client'

import PageWrapper from '@/components/PageWrapper'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const fadeVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
  }

  return (
    <PageWrapper>
      <main className="min-h-screen bg-gray-100 px-6 py-24 flex flex-col items-center text-center">
        <motion.h1
          className="text-5xl font-bold text-gray-800 mb-6 tracking-wide font-[var(--font-bebas)]"
          initial="hidden"
          animate="visible"
          variants={fadeVariant}
          custom={0}
        >
          Contact Us
        </motion.h1>

        <motion.p
          className="text-gray-600 max-w-xl text-lg mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeVariant}
          custom={1}
        >
          Have questions or want to get in touch? Reach out and we’ll get back to you soon.
        </motion.p>

        <motion.form
          className="w-full max-w-md space-y-4 text-left"
          initial="hidden"
          animate="visible"
          variants={fadeVariant}
          custom={2}
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="bg-gray-800 text-white font-semibold px-6 py-2 rounded-full hover:bg-black transition"
          >
            Send Message
          </button>
        </motion.form>
      </main>
    </PageWrapper>
  )
}
