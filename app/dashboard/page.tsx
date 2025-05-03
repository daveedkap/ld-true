'use client'

import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
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
