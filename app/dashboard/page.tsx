'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import PageWrapper from '@/components/PageWrapper'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/check-auth')
        if (!cancelled) {
          if (res.status !== 200) {
            router.push('/login')
          } else {
            setLoading(false)
          }
        }
      } catch {
        if (!cancelled) router.push('/login')
      }
    }

    checkAuth()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <PageWrapper>
      <main className="flex-1 flex flex-col items-center justify-center bg-gray-100 w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Dashboard</h1>
        <p className="text-gray-600 mb-8">You are logged in.</p>
        <button
          onClick={async () => {
            await fetch('/api/logout', { method: 'POST' })
            router.push('/login')
          }}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition font-medium"
        >
          Logout
        </button>
      </main>
    </PageWrapper>
  )
}
