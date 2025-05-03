'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/check-auth')
      if (res.status !== 200) {
        router.push('/login')
      } else {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
  }

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Dashboard</h1>
      <p className="text-gray-600 mb-8">You are logged in.</p>
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition font-medium"
      >
        Logout
      </button>
    </main>
  )
}
