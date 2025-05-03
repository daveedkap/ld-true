// app/api/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ success: true })
  res.cookies.set('auth', '', { maxAge: 0, path: '/' }) // delete cookie
  return res
}
