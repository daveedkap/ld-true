'use client'

import { useState } from 'react'
import PageWrapper from '@/components/PageWrapper'
import { motion } from 'framer-motion'


export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <PageWrapper>
      <main className="min-h-screen bg-gray-100 px-6 py-24 flex flex-col items-center text-center">
        <motion.h1
          className="text-5xl font-bold text-gray-800 mb-6 tracking-wide font-[var(--font-bebas)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h1>

        <motion.p
          className="text-gray-600 max-w-xl text-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have questions or want to get in touch? Reach out and we’ll get back to you soon.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-4 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >

        <div>
        <label className="block text-gray-700 font-medium mb-1">Name</label>
        <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
        </div>
        <div>
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        </div>
        <div>
        <label className="block text-gray-700 font-medium mb-1">Message</label>
        <textarea
            rows={4}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
        />
        </div>
        <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-gray-800 text-white font-semibold px-6 py-2 rounded-full hover:bg-black transition"
        >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 flex items-start space-x-3 bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3 rounded-md shadow-sm"
            >
                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p>Thank you! We'll be in touch shortly.</p>
            </motion.div>
            )}

        {status === 'error' && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 flex items-start space-x-3 bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-md shadow-sm"
            >
                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p>Something went wrong. Please try again.</p>
            </motion.div>
        )}
        </motion.form>
      </main>
    </PageWrapper>
  )
}
