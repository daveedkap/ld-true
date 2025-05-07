import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  const validUsername = process.env.DEV_USERNAME || 'admin'
  const validPassword = process.env.DEV_PASSWORD || 'password123' // fix

  if (username === validUsername && password === validPassword) {
    const res = NextResponse.json({ success: true })
    res.cookies.set('auth', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })
    return res
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
