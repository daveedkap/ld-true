'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import bunnyAnimation from '@/public/animations/bunny.json'


export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ username, password })
    console.log('Login attempt', { username, password })

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      router.push('/dashboard')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <main className="h-screen w-screen bg-white flex items-center justify-center font-sans">
      <div className="w-full max-w-md flex flex-col items-center gap-6"></div>
        {/* 🐰 Bunny Animation above the login box */}
        <div className="w-100 h-100" >
            <Lottie animationData={bunnyAnimation} loop />
        </div>

        {/* Login Box */}
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6 tracking-tight">
            Developer Login
            </h1>
            <form onSubmit={handleLogin} className="space-y-5">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            />
            <div className="relative">
                <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition pr-12"
                />
                <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                tabIndex={-1}
                >
                {showPassword ? (
                    // Eye-off icon (SVG)
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.168.199-2.29.563-3.337M6.094 6.094A10.052 10.052 0 0112 5c5.523 0 10 4.477 10 10a10.05 10.05 0 01-.555 3.301M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                    </svg>
                ) : (
                    // Eye icon (SVG)
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                )}
                </button>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition font-medium cursor-pointer"
            >
                Login
            </button>
            </form>
        </div>
    </main>
  )
}
