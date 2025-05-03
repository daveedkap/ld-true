// app/api/check-auth/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('auth')?.value
  console.log('[check-auth] Cookie value:', cookie)

  if (cookie === 'true') {
    console.log('[check-auth] ✅ Authenticated')
    return NextResponse.json({ status: 'ok' }, { status: 200 })
  } else {
    console.log('[check-auth] ❌ Not authenticated')
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
}
