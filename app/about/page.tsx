'use client'

import PageWrapper from '@/components/PageWrapper'
import { motion } from 'framer-motion'

export default function AboutPage() {
  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
  }

  return (
    <PageWrapper>
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="min-h-screen bg-gray-100 px-6 py-24 flex flex-col items-center text-center"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-6 tracking-wide font-[var(--font-bebas)]">
          About Us
        </h1>
        <p className="text-gray-600 max-w-2xl text-lg mb-16">
          We're a sustainable clothing shop committed to curating standout secondhand fashion. We sell exclusively through top resale platforms like Grailed, Depop, Mercari, and eBay—bringing our community stylish, affordable, and eco-conscious options.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl w-full">
          {[
            {
              title: 'Sustainable Style',
              desc: 'We champion fashion that reduces waste and promotes conscious consumption.',
            },
            {
              title: 'Curated Selections',
              desc: 'Every piece we list is handpicked for quality, uniqueness, and character.',
            },
            {
              title: 'Cross-Platform Reach',
              desc: 'Shop our drops wherever you prefer Grailed, eBay, Depop, or Mercari.',
            },
            {
              title: 'Built by Passion',
              desc: 'We started with a personal passion for secondhand finds and grew into a platform for sharing that love.',
            },
          ].map((box, i) => (
            <motion.div
              key={box.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariant}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{box.title}</h3>
              <p className="text-gray-600">{box.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.main>
    </PageWrapper>
  )
}
